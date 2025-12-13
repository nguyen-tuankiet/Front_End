import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArticleDetailView } from '@/components/ui/ArticleDetailView';
import { getCommentsByArticleId, createComment } from '@/data/mockComments';
import { apiService } from '@/services/api';
import { decodeHtmlEntities } from '@/lib/utils';

/**
 * Decode HTML entities
 */
const decodeArticleDetail = (articleDetail, categoryData) => {
    return {
        ...articleDetail,
        title: decodeHtmlEntities(articleDetail.title || ''),
        description: decodeHtmlEntities(articleDetail.description || ''),
        content: decodeHtmlEntities(articleDetail.content || ''),
        author: decodeHtmlEntities(articleDetail.author || ''),
        tags: articleDetail.tags ? articleDetail.tags.map(tag => decodeHtmlEntities(tag)) : [],
        category: categoryData?.name || articleDetail.category || '',
        subCategory: articleDetail.subCategory || '',
    };
};

export function ArticleDetailPage() {
    const { category, articleId } = useParams();
    const navigate = useNavigate();
    const [article, setArticle] = useState(null);
    const [subcategorySlug, setSubcategorySlug] = useState(null);
    const [relatedArticles, setRelatedArticles] = useState([]);
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [detectedCategory, setDetectedCategory] = useState(category);
    const [categoryData, setCategoryData] = useState(null);

    useEffect(() => {
        document.title = 'Loading...';

        // Decode articleId (là URL được encode)
        const articleUrl = decodeURIComponent(articleId || '');

        if (!articleUrl) {
            console.error('Không tìm thấy URL của article');
            setLoading(false);
            return;
        }

        const fetchArticleDetail = async () => {
            try {
                // Lấy chi tiết article từ API
                const articleDetail = await apiService.getArticleDetail(articleUrl);
                
                if (articleDetail) {
                    // Nếu không có category từ route, detect từ article data
                    let finalCategory = category;
                    if (!finalCategory && articleDetail.category) {
                        // Tìm category slug từ category name
                        const allCategories = await apiService.getCategories();
                        const foundCategory = allCategories.find(cat => 
                            cat.name === articleDetail.category || 
                            cat.slug === articleDetail.category?.toLowerCase().replace(/\s+/g, '-')
                        );
                        if (foundCategory) {
                            finalCategory = foundCategory.slug;
                            setDetectedCategory(finalCategory);
                        }
                    }

                    // Lấy category data từ API
                    let catData = null;
                    if (finalCategory) {
                        try {
                            const allCategories = await apiService.getCategories();
                            catData = allCategories.find(c => c.slug === finalCategory);
                            setCategoryData(catData);
                        } catch (error) {
                            console.warn('Không lấy được category data từ API', error);
                        }
                    }
                    
                    // Decode HTML entities
                    const decodedArticle = decodeArticleDetail(articleDetail, catData);
                    setArticle(decodedArticle);
                    document.title = decodedArticle.title || 'Chi tiết bài viết';

                    const articleComments = getCommentsByArticleId(articleUrl);
                    setComments(articleComments);

                    if (articleDetail.subCategory && finalCategory) {
                        try {
                            const allCategories = await apiService.getCategories();
                            const foundCategory = allCategories.find(cat => cat.slug === finalCategory);
                            if (foundCategory?.subCategories) {
                                const subcategory = foundCategory.subCategories.find(
                                    sub => sub.name === articleDetail.subCategory
                                );
                                if (subcategory) {
                                    setSubcategorySlug(subcategory.slug);
                                }
                            }
                        } catch (error) {
                            console.warn('Không lấy được subcategory từ API', error);
                        }
                    }

                    // Lấy related articles
                    if (finalCategory) {
                        try {
                            const categoryResponse = await apiService.getCategoryArticles(finalCategory);
                            if (categoryResponse && categoryResponse.articles) {
                                // lấy 4 bài liên quan
                                const related = categoryResponse.articles
                                    .filter(a => a.link !== articleUrl)
                                    .slice(0, 4)
                                    .map(a => ({
                                        ...a,
                                        title: decodeHtmlEntities(a.title || ''),
                                        description: decodeHtmlEntities(a.description || a.excerpt || ''),
                                        category: finalCategory,
                                        originalUrl: a.link
                                    }));
                                setRelatedArticles(related);
                            }
                        } catch (error) {
                            try {
                                const homeData = await apiService.getHomePageData();
                                if (homeData?.featuredArticles || homeData?.trendingArticles) {
                                    const allHomeArticles = [
                                        ...(homeData.featuredArticles || []),
                                        ...(homeData.trendingArticles || [])
                                    ];
                                    const related = allHomeArticles
                                        .filter(a => a.link && a.link !== articleUrl)
                                        .slice(0, 4)
                                        .map(a => ({
                                            ...a,
                                            title: decodeHtmlEntities(a.title || ''),
                                            description: decodeHtmlEntities(a.description || a.excerpt || ''),
                                            category: a.categorySlug || a.category || '',
                                            originalUrl: a.link
                                        }));
                                    setRelatedArticles(related);
                                }
                            } catch (homeError) {
                                setRelatedArticles([]);
                            }
                        }
                    } else {
                        try {
                            const homeData = await apiService.getHomePageData();
                            if (homeData?.featuredArticles || homeData?.trendingArticles) {
                                const allHomeArticles = [
                                    ...(homeData.featuredArticles || []),
                                    ...(homeData.trendingArticles || [])
                                ];
                                const related = allHomeArticles
                                    .filter(a => a.link && a.link !== articleUrl)
                                    .slice(0, 4)
                                    .map(a => ({
                                        ...a,
                                        title: decodeHtmlEntities(a.title || ''),
                                        description: decodeHtmlEntities(a.description || a.excerpt || ''),
                                        category: a.categorySlug || a.category || '',
                                        originalUrl: a.link
                                    }));
                                setRelatedArticles(related);
                            }
                        } catch (error) {
                            setRelatedArticles([]);
                        }
                    }
                } else {
                    console.error('Không tìm thấy chi tiết bài viết');
                }
            } catch (error) {
                console.error('Lỗi khi lấy chi tiết bài viết', error);
            } finally {
                setLoading(false);
            }
        };

        fetchArticleDetail();
    }, [category, articleId]);

    const handleBack = () => {
        // Nếu có category, quay lại trang category, nếu không quay về trang chủ
        if (detectedCategory || category) {
            navigate(`/danh-muc/${detectedCategory || category}`);
        } else {
            navigate('/');
        }
    };

    const handleCommentSubmit = (name, comment) => {
        // Tạo comment mới bằng helper function
        const newComment = createComment(name, comment, articleId);
        setComments([newComment, ...comments]);
    };

    const handleRelatedArticleClick = (article) => {
        // Chuyển hướng đến bài viết liên quan
        const articleUrl = article.originalUrl || article.id;
        if (articleUrl && article.category) {
            const encodedUrl = encodeURIComponent(articleUrl);
            navigate(`/danh-muc/${article.category}/bai-viet/${encodedUrl}`);
        }
    };

    if (loading) {
        return (
            <div className="max-w-7xl mx-auto py-8 px-4">
                <div className="animate-pulse space-y-6">
                    <div className="h-8 bg-gray-200 rounded w-32" />
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2 space-y-6">
                            <div className="h-10 bg-gray-200 rounded w-3/4" />
                            <div className="h-64 bg-gray-200 rounded" />
                            <div className="space-y-3">
                                <div className="h-4 bg-gray-200 rounded" />
                                <div className="h-4 bg-gray-200 rounded" />
                                <div className="h-4 bg-gray-200 rounded w-2/3" />
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div className="h-48 bg-gray-200 rounded" />
                            <div className="h-48 bg-gray-200 rounded" />
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="py-8 px-4">
            <ArticleDetailView
                article={article}
                onBack={handleBack}
                categorySlug={detectedCategory || category}
                subcategorySlug={subcategorySlug}
                categoryData={categoryData}
                relatedArticles={relatedArticles}
                comments={comments}
                onCommentSubmit={handleCommentSubmit}
            />
        </div>
    );
}

export default ArticleDetailPage;
