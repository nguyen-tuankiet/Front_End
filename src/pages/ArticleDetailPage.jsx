import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Papa from 'papaparse';
import { ArticleDetailView } from '@/components/Category/ArticleDetailView';

// Map category slug to CSV file
const categoryCSVMap = {
    'suc-khoe': '/newsData/health_news.csv',
    // Thêm các category khác ở đây
    // 'the-thao': '/newsData/sport_news.csv',
};

export function ArticleDetailPage() {
    const { category, articleId } = useParams();
    const navigate = useNavigate();
    const [article, setArticle] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        document.title = 'Loading...';

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

                        if (foundArticle) {
                            setArticle(foundArticle);
                            document.title = foundArticle['Tiêu đề'] || 'Chi tiết bài viết';
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

    if (loading) {
        return (
            <div className="max-w-4xl mx-auto py-8 px-4">
                <div className="animate-pulse space-y-6">
                    <div className="h-8 bg-gray-200 rounded w-32" />
                    <div className="h-10 bg-gray-200 rounded w-3/4" />
                    <div className="h-64 bg-gray-200 rounded" />
                    <div className="space-y-3">
                        <div className="h-4 bg-gray-200 rounded" />
                        <div className="h-4 bg-gray-200 rounded" />
                        <div className="h-4 bg-gray-200 rounded w-2/3" />
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto py-8 px-4">
            <ArticleDetailView
                article={article}
                onBack={handleBack}
            />
        </div>
    );
}

export default ArticleDetailPage;
