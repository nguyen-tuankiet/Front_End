import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Papa from 'papaparse';
import { CategoryPageLayout } from '@/layout/CategoryPageLayout';
import { ArticleList } from '@/components/Category/ArticleList';
import { CategorySidebar } from '@/components/Category/CategorySidebar';
import { getCategoryBySlug } from '@/data/categories';

// Map category slug to CSV file (sẽ thay bằng API sau)
const categoryCSVMap = {
    'suc-khoe': '/newsData/health_news.csv',
    'thoi-su': '/newsData/thoi_su_news.csv',
    // Thêm các category khác ở đây khi có data
    // 'the-thao': '/newsData/sport_news.csv',
    // 'kinh-te': '/newsData/economy_news.csv',
};

/**
 * Component trang danh mục - có thể reuse cho tất cả categories
 */
export function CategoryPage() {
    const { category, subcategory } = useParams();
    const navigate = useNavigate();
    const [articles, setArticles] = useState([]);
    const [filteredArticles, setFilteredArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [categoryData, setCategoryData] = useState(null);

    // Lấy thông tin category từ categories.js
    useEffect(() => {
        if (category) {
            const cat = getCategoryBySlug(category);
            setCategoryData(cat);
            if (cat) {
                document.title = cat.name;
            }
        }
    }, [category]);

    // Load articles từ CSV
    useEffect(() => {
        if (!category) return;

        setLoading(true);
        const csvPath = categoryCSVMap[category];

        if (!csvPath) {
            console.warn(`Không tìm thấy CSV file cho category: ${category}`);
            setLoading(false);
            return;
        }

        fetch(csvPath)
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
    }, [category]);

    // Filter articles theo subcategory nếu có
    useEffect(() => {
        if (!subcategory) {
            // Nếu không có subcategory, hiển thị tất cả articles của category
            setFilteredArticles(articles);
        } else {
            // Filter theo subcategory name
            const filtered = articles.filter(article => {
                const articleSubcategory = article['Chuyên mục con'];
                // Tìm subcategory trong categoryData để so sánh name
                if (categoryData?.subs) {
                    const subcategoryData = categoryData.subs.find(sub => sub.slug === subcategory);
                    if (subcategoryData) {
                        return articleSubcategory === subcategoryData.name;
                    }
                }
                // Fallback: so sánh trực tiếp với slug nếu không tìm thấy
                return articleSubcategory?.toLowerCase().includes(subcategory.toLowerCase());
            });
            setFilteredArticles(filtered);
        }
    }, [articles, subcategory, categoryData]);

    const handleArticleClick = (article, index) => {
        // Tìm index thực tế của article trong danh sách gốc
        const actualIndex = articles.findIndex(a => a === article);
        navigate(`/danh-muc/${category}/bai-viet/${actualIndex >= 0 ? actualIndex : index}`);
    };

    // Tạo subcategories với active state
    const subCategoriesWithActive = categoryData?.subs?.map(sub => ({
        name: sub.name,
        slug: sub.slug,
        active: subcategory === sub.slug
    })) || [];

    // Title: dùng category name từ categories.js hoặc fallback
    const pageTitle = categoryData?.name || category || 'Danh mục';

    return (
        <CategoryPageLayout
            title={pageTitle}
            categorySlug={category}
            subCategories={subCategoriesWithActive}
            totalArticles={filteredArticles.length}
            currentPage={0}
            pageSize={9}
            sidebar={
                <CategorySidebar
                    articles={filteredArticles}
                    title="Bài mới nhất"
                    onArticleClick={handleArticleClick}
                    limit={5}
                />
            }
        >
            <ArticleList
                articles={filteredArticles}
                onArticleClick={handleArticleClick}
                loading={loading}
            />
        </CategoryPageLayout>
    );
}

export default CategoryPage;

