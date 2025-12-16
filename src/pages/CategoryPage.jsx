import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { CategoryPageLayout } from '@/layout/CategoryPageLayout';
import { ArticleList } from '@/components/Category/ArticleList';
import { CategorySidebar } from '@/components/Category/CategorySidebar';
import { apiService } from '@/services/api';
import { decodeHtmlEntities } from '@/lib/utils';

const decodeArticle = (article, categoryData) => {
    return {
        ...article,
        title: decodeHtmlEntities(article.title || ''),
        description: decodeHtmlEntities(article.description || article.excerpt || ''),
        category: categoryData?.name || article.category || '',
        subCategory: article.subCategory || '',
    };
};

export function CategoryPage() {
    const { category, subcategory } = useParams();
    const navigate = useNavigate();
    const [articles, setArticles] = useState([]);
    const [filteredArticles, setFilteredArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [categoryData, setCategoryData] = useState(null);

    useEffect(() => {
        if (!category) return;

        setLoading(true);

        const fetchData = async () => {
            try {
                // Lấy category từ API
                const allCategories = await apiService.getCategories();
                const cat = allCategories.find(c => c.slug === category);
                
                setCategoryData(cat);
                if (cat) {
                    document.title = cat.name;
                }

                let response;
                
                if (subcategory) {
                    response = await apiService.getSubcategoryArticles(category, subcategory);
                } else {
                    response = await apiService.getCategoryArticles(category);
                }

                if (response && response.articles) {
                    const decodedArticles = response.articles.map(article => 
                        decodeArticle(article, cat)
                    );
                    setArticles(decodedArticles);
                } else {
                    console.warn(`Không có dữ liệu cho category ${category}`);
                    setArticles([]);
                }
            } catch (error) {
                console.error('Lỗi khi lấy articles từ API', error);
                setArticles([]);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [category, subcategory]);

    useEffect(() => {
        if (!subcategory) {
            setFilteredArticles(articles);
        } else {
            setFilteredArticles(articles);
        }
    }, [articles, subcategory]);

    const handleArticleClick = (article) => {
        const articleUrl = article.link;
        if (articleUrl) {
            // Encode URL để truyền qua route
            const encodedUrl = encodeURIComponent(articleUrl);
            navigate(`/danh-muc/${category}/bai-viet/${encodedUrl}`);
        } else {
            console.error('Không tìm thấy URL của article');
        }
    };

    const subCategoriesList = categoryData?.subCategories || categoryData?.subs || [];
    const subCategoriesWithActive = [
        {
            name: "Tất cả",
            slug: "",
            active: !subcategory
        },
        ...subCategoriesList.map(sub => ({
            name: sub.name,
            slug: sub.slug,
            active: subcategory === sub.slug
        }))
    ];

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

