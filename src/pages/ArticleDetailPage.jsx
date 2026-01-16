import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams, useParams } from 'react-router-dom';
import { ArticleDetailView } from '@/components/ui/ArticleDetailView';
import { getCommentsByArticleId, createComment } from '@/data/mockComments';
import { apiService } from '@/services/api';
import { useLanguage } from '@/contexts/LanguageContext';
import { useCategories } from '@/contexts/CategoryContext';

function decodeHTMLEntities(text) {
    if (!text) return '';
    const textarea = document.createElement('textarea');
    textarea.innerHTML = text;
    return textarea.value;
}

/**
 * Tìm category và subcategory từ category string
 * @param {string} categoryString - Category string từ API
 * @param {Array} categories - Danh sách category từ API
 * @returns {{category: Object, subcategory: Object|null}} - Category và subcategory tìm được
 */
function findCategoryAndSubcategory(categoryString, categories) {
    if (!categoryString || !categories) {
        return { category: null, subcategory: null };
    }

    const sortedCategories = [...categories].sort((a, b) => b.name.length - a.name.length);

    // 1. Tìm category cha trước
    let category = sortedCategories.find(cat => 
        cat.name === categoryString || 
        cat.slug === categoryString.toLowerCase()
            .replace(/\s+/g, '-')
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
    );

    if (category) {
        return { category, subcategory: null };
    }

    // 2. Tìm trong subcategory
    for (const cat of sortedCategories) {
        if (!cat.subCategories) continue;

        let subcategory = cat.subCategories.find(sub =>
            sub.name === categoryString ||
            sub.slug === categoryString.toLowerCase()
                .replace(/\s+/g, '-')
                .normalize('NFD')
                .replace(/[\u0300-\u036f]/g, '')
        );

        if (subcategory) {
            return { category: cat, subcategory };
        }

        // 3. Tách chuỗi "Category Subcategory"
        const categoryNameWithSpace = cat.name + ' ';
        if (categoryString === cat.name || categoryString.startsWith(categoryNameWithSpace)) {
            const remainingPart = categoryString.substring(cat.name.length).trim();
            if (remainingPart) {
                // Tìm subcategory trong phần còn lại
                subcategory = cat.subCategories.find(sub => sub.name === remainingPart);
                if (subcategory) {
                    return { category: cat, subcategory };
                }
            }
        }
    }

    return { category: null, subcategory: null };
}

export function ArticleDetailPage() {
    const [searchParams] = useSearchParams();
    const { articleId } = useParams();
    const navigate = useNavigate();
    const { language } = useLanguage();
    const { categories } = useCategories();
    const [article, setArticle] = useState(null);
    const [comments, setComments] = useState([]);
    const [relatedArticles, setRelatedArticles] = useState([]);
    const [categoryData, setCategoryData] = useState(null);
    const [subcategoryName, setSubcategoryName] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const articleUrl = searchParams.get('url') || (articleId ? decodeURIComponent(articleId) : null);

    // Fetch article khi có URL
    useEffect(() => {
        document.title = 'Loading...';

        if (articleUrl) {
            fetchArticleFromAPI(articleUrl);
        } else {
            setLoading(false);
            setError('Không tìm thấy bài viết. Vui lòng cung cấp URL bài viết.');
        }
    }, [articleUrl, language]);

    // Fetch related articles khi categories đã sẵn sàng
    useEffect(() => {
        const fetchRelatedArticles = async () => {
            if (!article?.category || !categories || categories.length === 0) return;

            try {
                const { category: currentCategory, subcategory: foundSubcategory } = 
                    findCategoryAndSubcategory(article.category, categories);
                
                if (currentCategory) {
                    setCategoryData({
                        name: currentCategory.name,
                        slug: currentCategory.slug,
                        subCategories: currentCategory.subCategories || []
                    });
                    
                    if (foundSubcategory) {
                        setSubcategoryName(foundSubcategory.name);
                    } else if (article.subCategory) {
                        setSubcategoryName(article.subCategory);
                    }
                    
                    // Fetch bài báo liên quan từ category chính
                    const categoryResponse = await apiService.getCategoryArticles(currentCategory.slug, language);
                    const allArticles = categoryResponse.articles || [];
                    
                    // Lọc bỏ bài viết hiện tại và lấy 5 bài
                    const filtered = allArticles
                        .filter(a => a.link !== article.url && a.url !== articleUrl)
                        .slice(0, 5);
                    
                    setRelatedArticles(filtered);
                }
            } catch (err) {
                console.error('Lỗi fetch related articles:', err);
            }
        };

        fetchRelatedArticles();
    }, [article, categories, language, articleUrl]);

    // Fetch article từ API
    const fetchArticleFromAPI = async (url) => {
        try {
            setLoading(true);
            setError(null);

            const response = await apiService.getArticleDetail(url, language);

            // Convert API response sang format ArticleDetailView
            const formattedArticle = {
                // API format
                ...response,
                'Tiêu đề': decodeHTMLEntities(response.title),
                'Tóm tắt': decodeHTMLEntities(response.description),
                'Nội dung': response.content,
                'Thumbnail': response.imageUrl,
                'Danh sách ảnh': response.images?.join('\n') || '',
                'Tags': response.tags?.join(', ') || '',
                'Chuyên mục lớn': response.category,
                'URL': response.url || url,
                'Ngày đăng': response.pubDate,
                'Tác giả': response.author,
                subCategory: response.subCategory || null,
                category: response.category,
            };

            setArticle(formattedArticle);
            document.title = formattedArticle['Tiêu đề'] || 'Chi tiết bài viết';

            // Load mock comments
            setComments(getCommentsByArticleId(url));

        } catch (err) {
            console.error('Lỗi fetch article từ API:', err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleBack = () => {
        if (window.history.length > 1) {
            navigate(-1);
        } else {
            navigate('/');
        }
    };

    const handleCommentSubmit = (name, comment) => {
        // Tạo comment mới bằng helper function
        const newComment = createComment(name, comment, articleUrl);
        setComments([newComment, ...comments]);
    };

    const handleRelatedArticleClick = (relatedArticle) => {
        const url = relatedArticle.link || relatedArticle.url;
        if (url) {
            navigate(`/bai-viet?url=${encodeURIComponent(url)}`);
        }
    };

    if (loading) {
        return (
            <div className="max-w-7xl mx-auto py-8 px-4">
                <div className="animate-pulse space-y-6">
                    <div className="h-8 bg-muted rounded w-32" />
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2 space-y-6">
                            <div className="h-10 bg-muted rounded w-3/4" />
                            <div className="h-64 bg-muted rounded" />
                            <div className="space-y-3">
                                <div className="h-4 bg-muted rounded" />
                                <div className="h-4 bg-muted rounded" />
                                <div className="h-4 bg-muted rounded w-2/3" />
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div className="h-48 bg-muted rounded" />
                            <div className="h-48 bg-muted rounded" />
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="max-w-7xl mx-auto py-8 px-4">
                <div className="text-center py-16">
                    <p className="text-red-500 mb-4">Có lỗi xảy ra: {error}</p>
                    <button 
                        onClick={handleBack}
                        className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
                    >
                        Quay lại
                    </button>
                </div>
            </div>
        );
    }

    // Lấy category slug từ categoryData
    const categorySlug = categoryData?.slug || (article?.category ? 
        article.category.toLowerCase().replace(/\s+/g, '-').normalize('NFD').replace(/[\u0300-\u036f]/g, '') 
        : null);

    return (
        <div className="py-8 px-4 bg-background min-h-screen">
            <ArticleDetailView
                article={article}
                onBack={handleBack}
                categorySlug={categorySlug}
                subcategoryName={subcategoryName}
                categoryData={categoryData}
                relatedArticles={relatedArticles}
                comments={comments}
                onCommentSubmit={handleCommentSubmit}
                onRelatedArticleClick={handleRelatedArticleClick}
            />
        </div>
    );
}

export default ArticleDetailPage;
