import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Papa from 'papaparse';
import { CategoryPageLayout } from '@/components/Category/CategoryPageLayout';
import { ArticleList } from '@/components/Category/ArticleList';
import { CategorySidebar } from '@/components/Category/CategorySidebar';

// Sub-categories cho Sức khỏe
const HEALTH_SUB_CATEGORIES = [
    { name: 'Khỏe đẹp mỗi ngày', slug: 'khoe-dep-moi-ngay' },
    { name: 'Làm đẹp', slug: 'lam-dep' },
    { name: 'Giới tính', slug: 'gioi-tinh' },
    { name: 'Y tế thông minh', slug: 'y-te-thong-minh' },
];

const HealthPage = () => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const { category = 'suc-khoe', subcategory } = useParams();

    useEffect(() => {
        document.title = 'Sức Khoẻ';
    }, []);

    useEffect(() => {
        setLoading(true);
        fetch('/newsData/health_news.csv')
            .then((response) => response.text())
            .then((csvText) => {
                Papa.parse(csvText, {
                    header: true,
                    skipEmptyLines: true,
                    complete: (results) => {
                        setArticles(results.data);
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
    }, []);

    const handleArticleClick = (article, index) => {
        // Navigate to detail page với index làm ID
        navigate(`/danh-muc/${category}/bai-viet/${index}`);
    };

    // Đánh dấu sub-category đang active
    const subCategoriesWithActive = HEALTH_SUB_CATEGORIES.map(sub => ({
        ...sub,
        active: subcategory === sub.slug
    }));

    return (
        <CategoryPageLayout
            title="Sức khỏe"
            categorySlug={category}
            subCategories={subCategoriesWithActive}
            totalArticles={articles.length}
            currentPage={0}
            pageSize={9}
            sidebar={
                <CategorySidebar
                    articles={articles}
                    title="Bài mới nhất"
                    onArticleClick={handleArticleClick}
                    limit={5}
                />
            }
        >
            <ArticleList
                articles={articles}
                onArticleClick={handleArticleClick}
                loading={loading}
            />
        </CategoryPageLayout>
    );
};

export default HealthPage;