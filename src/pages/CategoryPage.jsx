import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { CategoryPageLayout } from '@/layout/CategoryPageLayout';
import { ArticleList } from '@/components/Category/ArticleList';
import { CategorySidebar } from '@/components/Category/CategorySidebar';
import { apiService } from '@/services/api';

export function CategoryPage() {
    const { category, subcategory } = useParams();
    const navigate = useNavigate();
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [categoryInfo, setCategoryInfo] = useState(null); 
    useEffect(() => {
        if (!category) return;

        const fetchArticles = async () => {
            setLoading(true);
            setError(null);

            try {
                let response;
                if (subcategory) {
                    response = await apiService.getSubcategoryArticles(category, subcategory);
                } else {
                    response = await apiService.getCategoryArticles(category);
                }


                setCategoryInfo({
                    title: response.title,
                    description: response.description,
                    link: response.link,
                    language: response.language
                });
                setArticles(response.articles || []);
                if (response.title) {
                    document.title = response.title;
                }
            } catch (err) {
                console.error('Lỗi fetch articles:', err);
                setError(err.message);
                setArticles([]);
            } finally {
                setLoading(false);
            }
        };

        fetchArticles();
    }, [category, subcategory]);

    const handleArticleClick = (article) => {
        const articleUrl = encodeURIComponent(article.link);
        navigate(`/bai-viet?url=${articleUrl}`);
    };

    const pageTitle = categoryInfo?.title?.split('|')[0]?.trim() || category || 'Danh mục';

    return (
        <CategoryPageLayout
            title={pageTitle}
            categorySlug={category}
            totalArticles={articles.length}
            currentPage={0}
            pageSize={9}
            error={error}
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
}

export default CategoryPage;

