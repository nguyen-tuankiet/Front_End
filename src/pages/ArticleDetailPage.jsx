import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Papa from 'papaparse';
import { ArticleDetailView } from '@/components/ui/ArticleDetailView';
import { getCategoryBySlug } from '@/data/categories';
import { getCommentsByArticleId, createComment } from '@/data/mockComments';

const categoryCSVMap = {
    'suc-khoe': '/newsData/health_news.csv',
    // Đổi sang API sau
};

export function ArticleDetailPage() {
    const { category, articleId } = useParams();
    const navigate = useNavigate();
    const [article, setArticle] = useState(null);
    const [subcategorySlug, setSubcategorySlug] = useState(null);
    const [relatedArticles, setRelatedArticles] = useState([]);
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        document.title = 'Loading...';

        // Đang lấy từ file csv
        const csvPath = categoryCSVMap[category] || '/newsData/health_news.csv';

        fetch(csvPath)
            .then((response) => response.text())
            .then((csvText) => {
                Papa.parse(csvText, {
                    header: true,
                    skipEmptyLines: true,
                    complete: (results) => {
                        const articleIndex = parseInt(articleId, 10);
                        const foundArticle = results.data[articleIndex];
                        const allArticles = results.data.filter(a => a['Tiêu đề']);

                        if (foundArticle) {
                            setArticle(foundArticle);
                            document.title = foundArticle['Tiêu đề'] || 'Chi tiết bài viết';

                            // Lấy comments cho article này
                            const articleComments = getCommentsByArticleId(articleIndex);
                            setComments(articleComments);

                            // Lấy subcategory slug từ article data
                            if (foundArticle['Chuyên mục con'] && category) {
                                const categoryData = getCategoryBySlug(category);
                                if (categoryData?.subs) {
                                    const subcategory = categoryData.subs.find(
                                        sub => sub.name === foundArticle['Chuyên mục con']
                                    );
                                    if (subcategory) {
                                        setSubcategorySlug(subcategory.slug);
                                    }
                                }
                            }

                            // Lấy related articles (cùng category, trừ bài hiện tại)
                            const related = allArticles
                                .filter((a, idx) => 
                                    idx !== articleIndex && 
                                    (a['Chuyên mục lớn'] === foundArticle['Chuyên mục lớn'] ||
                                     a['Chuyên mục con'] === foundArticle['Chuyên mục con'])
                                )
                                .slice(0, 4)
                                .map((a, idx) => {
                                    const relatedIdx = allArticles.findIndex(art => art === a);
                                    return {
                                        id: relatedIdx,
                                        title: a['Tiêu đề'],
                                        'Tiêu đề': a['Tiêu đề'],
                                        Thumbnail: a['Thumbnail'],
                                        image: a['Thumbnail'],
                                        time: '1 phút trước',
                                        date: a['Ngày đăng'] || '1 phút trước',
                                        category: category,
                                        originalUrl: a['URL']
                                    };
                                });
                            setRelatedArticles(related);
                        }
                        setLoading(false);
                    },
                    error: (error) => {
                        console.error('Lỗi đọc CSV:', error);
                        setLoading(false);
                    }
                });
            })
            .catch((err) => {
                console.error("Không tìm thấy file CSV:", err);
                setLoading(false);
            });
    }, [category, articleId]);

    const handleBack = () => {
        navigate(`/danh-muc/${category}`);
    };

    const handleCommentSubmit = (name, comment) => {
        // Tạo comment mới bằng helper function
        const newComment = createComment(name, comment, articleId);
        setComments([newComment, ...comments]);
        // gọi API để lưu comment ở đây
    };

    const handleRelatedArticleClick = (article) => {
        // Chuyển hướng đến bài viết liên quan
        if (article.id !== undefined && article.category) {
            navigate(`/danh-muc/${article.category}/bai-viet/${article.id}`);
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
                categorySlug={category}
                subcategorySlug={subcategorySlug}
                relatedArticles={relatedArticles}
                comments={comments}
                onCommentSubmit={handleCommentSubmit}
            />
        </div>
    );
}

export default ArticleDetailPage;
