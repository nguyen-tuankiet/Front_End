import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SearchFilterBar } from '@/components/ui/SearchFilterBar';
import { SearchResults } from '@/components/ui/SearchResults';
import { NewsletterSection } from '@/components/ui/NewsletterSection';
import { apiService } from '@/services/api';
import { decodeHtmlEntities } from '@/lib/utils';

/**
 * Search page component
 */
export function SearchPage() {
    const [searchParams, setSearchParams] = useSearchParams();
    
    const query = searchParams.get('q') || '';
    const category = searchParams.get('category') || 'all';
    const timeRange = searchParams.get('time') || 'all';
    
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [allArticles, setAllArticles] = useState([]);

    useEffect(() => {
        document.title = query ? `Tìm kiếm: ${query}` : 'Tìm kiếm';
        
        // Load toàn bộ bài báo
        const loadAllArticles = async () => {
            try {
                setLoading(true);
                const categories = await apiService.getCategories();

                // Lấy toàn bộ bài báo từ toàn bộ danh mục (có thể giới hạn ít lại để tránh load lâu)
                const categoryPromises = categories.slice(0, 10).map(async (cat) => {
                    try {
                        const response = await apiService.getCategoryArticles(cat.slug);
                        if (response && response.articles) {
                            return response.articles.map(article => ({
                                ...article,
                                category: cat.name,
                                categorySlug: cat.slug,
                                title: decodeHtmlEntities(article.title || ''),
                                description: decodeHtmlEntities(article.description || article.excerpt || ''),
                            }));
                        }
                    } catch (error) {
                        console.error(`Lỗi fetch bài báo từ danh mục ${cat.slug}:`, error);
                    }
                    return [];
                });

                const results = await Promise.all(categoryPromises);
                const flattened = results.flat();
                setAllArticles(flattened);
                
                if (query) {
                    performSearch(query, category, timeRange, flattened);
                }
            } catch (error) {
                console.error('Error loading articles:', error);
            } finally {
                setLoading(false);
            }
        };

        loadAllArticles();
    }, []);

    useEffect(() => {
        if (query && allArticles.length > 0) {
            performSearch(query, category, timeRange, allArticles);
        } else if (!query) {
            setArticles([]);
        }
    }, [query, category, timeRange, allArticles]);

    const performSearch = (searchQuery, categoryFilter, timeFilter, articlesList) => {
        if (!searchQuery.trim()) {
            setArticles([]);
            return;
        }

        const queryLower = searchQuery.toLowerCase().trim();
        
        let filtered = articlesList.filter(article => {
            const titleMatch = article.title?.toLowerCase().includes(queryLower);
            let tagMatch = false;
            if (article.tags && Array.isArray(article.tags)) {
                tagMatch = article.tags.some(tag => 
                    tag?.toLowerCase().includes(queryLower)
                );
            }
            
            const categoryMatch = article.category?.toLowerCase().includes(queryLower);
            
            return titleMatch || tagMatch || categoryMatch;
        });

        // Category filter
        if (categoryFilter !== 'all') {
            filtered = filtered.filter(article => article.categorySlug === categoryFilter);
        }

        // Time filter
        if (timeFilter !== 'all') {
            const now = new Date();
            const timeFilters = {
                today: 1,
                week: 7,
                month: 30,
                year: 365,
            };
            const daysBack = timeFilters[timeFilter] || 365;
            const cutoffDate = new Date(now.getTime() - daysBack * 24 * 60 * 60 * 1000);

            filtered = filtered.filter(article => {
                if (!article.pubDate) return true;
                const articleDate = new Date(article.pubDate);
                return articleDate >= cutoffDate;
            });
        }

        setArticles(filtered);
    };

    const handleSearch = (newQuery, newCategory, newTimeRange) => {
        const params = new URLSearchParams();
        if (newQuery) params.set('q', newQuery);
        if (newCategory !== 'all') params.set('category', newCategory);
        if (newTimeRange !== 'all') params.set('time', newTimeRange);
        
        setSearchParams(params);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 py-8">
                {/* Thanh tìm kiếm */}
                <SearchFilterBar
                    initialQuery={query}
                    initialCategory={category}
                    initialTimeRange={timeRange}
                    onSearch={handleSearch}
                    className="mb-6"
                />

                {/* Kết quả */}
                <SearchResults
                    articles={articles}
                    query={query}
                    totalResults={articles.length}
                    loading={loading}
                />
            </div>

            <NewsletterSection className="mt-12" />
        </div>
    );
}

export default SearchPage;

