import { useEffect, useState, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { CategoryPageLayout } from '@/layout/CategoryPageLayout';
import { ArticleList } from '@/components/Category/ArticleList';
import { CategoryPageSidebar } from '@/components/Category/CategoryPageSidebar';
import { Pagination } from '@/components/ui/pagination';
import { apiService } from '@/services/api';
import { useLanguage } from '@/contexts/LanguageContext';
import { handleArticleClick as saveViewedArticle } from '@/lib/articleNavigation';

const ARTICLES_PER_PAGE = 10;

export function CategoryPage() {
    const { category, subcategory } = useParams();
    const navigate = useNavigate();
    const { language, t } = useLanguage();
    const [articles, setArticles] = useState([]);
    const [sidebarArticles, setSidebarArticles] = useState([]); // Bài viết cho sidebar
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [subCategories, setSubCategories] = useState([]);
    const [categoryName, setCategoryName] = useState('');
    const [subcategoryName, setSubcategoryName] = useState(''); 
    const [currentPage, setCurrentPage] = useState(1); 
    useEffect(() => {
        if (!category) return;

        const fetchArticles = async () => {
            setLoading(true);
            setError(null);

            try {
                // Fetch category để lấy thông tin category và subcategory
                const categories = await apiService.getCategories(language);
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
                    response = await apiService.getSubcategoryArticles(category, subcategory, language);
                    // Khi đang xem subcategory, fetch thêm bài viết của category cha cho sidebar
                    const categoryResponse = await apiService.getCategoryArticles(category, language);
                    setSidebarArticles(categoryResponse.articles || []);
                } else {
                    response = await apiService.getCategoryArticles(category, language);
                    // Khi xem category chính, sidebar dùng luôn danh sách này
                    setSidebarArticles(response.articles || []);
                }

                setArticles(response.articles || []);
                setCurrentPage(1); // Reset về trang 1 khi đổi category/subcategory
            } catch (err) {
                console.error('Lỗi fetch articles:', err);
                setError(err.message);
                setArticles([]);
                setSidebarArticles([]);
            } finally {
                setLoading(false);
            }
        };

        fetchArticles();
    }, [category, subcategory, language]);

    // Tính toán phân trang
    const totalPages = useMemo(() => {
        return Math.ceil(articles.length / ARTICLES_PER_PAGE);
    }, [articles.length]);

    const paginatedArticles = useMemo(() => {
        const startIndex = (currentPage - 1) * ARTICLES_PER_PAGE;
        const endIndex = startIndex + ARTICLES_PER_PAGE;
        return articles.slice(startIndex, endIndex);
    }, [articles, currentPage]);

    const handlePageChange = (page) => {
        setCurrentPage(page);
        // Scroll lên đầu danh sách bài viết
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

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
        // Lưu bài viết vào danh sách xem gần đây
        saveViewedArticle(article);
        
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
                <CategoryPageSidebar
                    articles={sidebarArticles}
                    categoryName={categoryName}
                    subCategories={subCategories}
                    onArticleClick={handleArticleClick}
                />
            }
            pagination={
                !loading && articles.length > 0 && (
                    <>
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={handlePageChange}
                        />
                        <p className="text-center text-sm text-muted-foreground mt-3">
                            {t('category.showing')} {((currentPage - 1) * ARTICLES_PER_PAGE) + 1} - {Math.min(currentPage * ARTICLES_PER_PAGE, articles.length)} {t('category.of')} {articles.length} {t('category.articles')}
                        </p>
                    </>
                )
            }
        >
            <ArticleList
                articles={paginatedArticles}
                onArticleClick={handleArticleClick}
                loading={loading}
            />
        </CategoryPageLayout>
    );
}

export default CategoryPage;

