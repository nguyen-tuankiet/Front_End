import { useEffect, useState, useMemo } from 'react';
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
    const [subCategories, setSubCategories] = useState([]);
    const [categoryName, setCategoryName] = useState('');
    const [subcategoryName, setSubcategoryName] = useState(''); 
    useEffect(() => {
        if (!category) return;

        const fetchArticles = async () => {
            setLoading(true);
            setError(null);

            try {
                // Fetch category để lấy thông tin category và subcategory
                const categories = await apiService.getCategories();
                const currentCategory = categories.find(cat => cat.slug === category);
                
                if (currentCategory) {
                    // Lấy tên category cha
                    setCategoryName(currentCategory.name);
                    
                    // Lấy subcategory
                    if (currentCategory.subCategories) {
                        // Map subcategory với active state
                        const mappedSubs = currentCategory.subCategories.map(sub => ({
                            name: sub.name,
                            slug: sub.slug,
                            active: sub.slug === subcategory
                        }));
                        setSubCategories(mappedSubs);
                        
                        // Lấy tên subcategory
                        if (subcategory) {
                            const currentSub = currentCategory.subCategories.find(sub => sub.slug === subcategory);
                            setSubcategoryName(currentSub?.name || '');
                        } else {
                            setSubcategoryName('');
                        }
                    } else {
                        setSubCategories([]);
                        setSubcategoryName('');
                    }
                } else {
                    setCategoryName(category);
                    setSubCategories([]);
                    setSubcategoryName('');
                }

                let response;
                if (subcategory) {
                    response = await apiService.getSubcategoryArticles(category, subcategory);
                } else {
                    response = await apiService.getCategoryArticles(category);
                }

                setArticles(response.articles || []);
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

    // Tạo tiêu đề
    const pageTitle = useMemo(() => {
        return subcategoryName 
            ? `${categoryName} - ${subcategoryName}`
            : categoryName || category || 'Danh mục';
    }, [subcategoryName, categoryName, category]);

    // Cập nhật document.title khi pageTitle thay đổi
    useEffect(() => {
        if (pageTitle) {
            document.title = pageTitle;
        }
    }, [pageTitle]);

    const handleArticleClick = (article) => {
        const articleUrl = encodeURIComponent(article.link);
        navigate(`/bai-viet?url=${articleUrl}`);
    };

    return (
        <CategoryPageLayout
            title={pageTitle}
            categoryName={categoryName}
            categorySlug={category}
            subCategories={subCategories}
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

