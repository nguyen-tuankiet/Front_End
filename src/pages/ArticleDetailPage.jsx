import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ArticleDetailView } from '@/components/ui/ArticleDetailView';
import { getCommentsByArticleId, createComment } from '@/data/mockComments';
import { apiService } from '@/services/api';

function decodeHTMLEntities(text) {
    if (!text) return '';
    const textarea = document.createElement('textarea');
    textarea.innerHTML = text;
    return textarea.value;
}

export function ArticleDetailPage() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [article, setArticle] = useState(null);
    const [comments, setComments] = useState([]);
    const [relatedArticles, setRelatedArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const articleUrl = searchParams.get('url');

    useEffect(() => {
        document.title = 'Loading...';

        if (articleUrl) {
            fetchArticleFromAPI(decodeURIComponent(articleUrl));
        } else {
            setLoading(false);
            setError('Không tìm thấy bài viết. Vui lòng cung cấp URL bài viết.');
        }
    }, [articleUrl]);

    // Fetch article từ API mới (web scraping)
    const fetchArticleFromAPI = async (url) => {
        try {
            setLoading(true);
            setError(null);

            const response = await apiService.getArticleDetail(url);

            // Convert API response sang format tương thích với ArticleDetailView
            const formattedArticle = {
                // API format
                ...response,
                // Map sang format cũ để tương thích với ArticleDetailView
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
            };

            setArticle(formattedArticle);
            document.title = formattedArticle['Tiêu đề'] || 'Chi tiết bài viết';

            // Load mock comments
            setComments(getCommentsByArticleId(url));

            // Fetch related articles từ cùng category
            if (response.category) {
                try {
                    const categorySlug = response.category.toLowerCase()
                        .replace(/\s+/g, '-')
                        .normalize('NFD')
                        .replace(/[\u0300-\u036f]/g, '');
                    
                    const categoryResponse = await apiService.getCategoryArticles(categorySlug);
                    const allArticles = categoryResponse.articles || [];
                    
                    // Lọc bỏ bài viết hiện tại và lấy 5 bài đầu tiên
                    const filtered = allArticles
                        .filter(a => a.link !== response.url && a.url !== url)
                        .slice(0, 5);
                    
                    setRelatedArticles(filtered);
                } catch (relatedErr) {
                    console.error('Lỗi fetch related articles:', relatedErr);
                    // Không set error, chỉ log để không ảnh hưởng đến việc hiển thị bài viết chính
                }
            }

        } catch (err) {
            console.error('Lỗi fetch article từ API:', err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleBack = () => {
        // Nếu có history, go back. Nếu không, navigate về trang chủ
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

    const categorySlug = article?.category ? 
        article.category.toLowerCase().replace(/\s+/g, '-').normalize('NFD').replace(/[\u0300-\u036f]/g, '') 
        : null;

    return (
        <div className="py-8 px-4">
            <ArticleDetailView
                article={article}
                onBack={handleBack}
                categorySlug={categorySlug}
                relatedArticles={relatedArticles}
                comments={comments}
                onCommentSubmit={handleCommentSubmit}
                onRelatedArticleClick={handleRelatedArticleClick}
            />
        </div>
    );
}

export default ArticleDetailPage;
