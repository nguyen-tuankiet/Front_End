import { useState, useEffect } from "react";
import { Eye, Trash2, X } from "lucide-react";
import { ArticleCard } from "@/components/ui/ArticleCard";
import { getViewedArticles, removeViewedArticle, clearViewedArticles } from "@/lib/viewedArticles";

/**
 * Component danh sách bài viết đã xem
 */
export function ViewedArticlesTab() {
    const [viewedArticles, setViewedArticles] = useState([]);

    const loadViewedArticles = () => {
        const articles = getViewedArticles();
        setViewedArticles(articles);
    };

    useEffect(() => {
        // Load viewed articles từ local
        // eslint-disable-next-line react-hooks/set-state-in-effect
        loadViewedArticles();

        // Tự động cập nhật khi có thay đổi từ tab khác
        const handleStorageChange = (e) => {
            if (e.key === 'viewedArticles') {
                loadViewedArticles();
            }
        };

        const handleViewedArticlesChange = () => {
            loadViewedArticles();
        };

        window.addEventListener('storage', handleStorageChange);
        window.addEventListener('viewedArticlesChanged', handleViewedArticlesChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
            window.removeEventListener('viewedArticlesChanged', handleViewedArticlesChange);
        };
    }, []);

    const handleRemoveArticle = (articleUrl) => {
        removeViewedArticle(articleUrl);
        loadViewedArticles();
    };

    const handleClearAll = () => {
        if (window.confirm("Bạn có chắc chắn muốn xóa tất cả bài viết đã xem?")) {
            clearViewedArticles();
            loadViewedArticles();
        }
    };

    if (viewedArticles.length === 0) {
        return (
            <div>
                <h2 className="text-2xl font-extrabold text-foreground mb-6">Tin đã xem</h2>
                <div className="text-center py-12">
                    <Eye className="w-16 h-16 mx-auto text-muted-foreground/50 mb-4" />
                    <p className="text-muted-foreground text-lg">Bạn chưa xem bài viết nào</p>
                    <p className="text-muted-foreground/70 text-sm mt-2">Các bài viết bạn xem sẽ được lưu tại đây</p>
                </div>
            </div>
        );
    }

    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-extrabold text-foreground">Tin đã xem ({viewedArticles.length})</h2>
                <button
                    onClick={handleClearAll}
                    className="flex items-center gap-2 px-4 py-2 text-sm text-muted-foreground hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-lg transition-colors"
                    title="Xóa tất cả bài viết đã xem"
                >
                    <X className="w-4 h-4" />
                    <span>Xóa tất cả</span>
                </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {viewedArticles.map((article, index) => {
                    const articleUrl = article.url || article.link;
                    return (
                        <div key={articleUrl || index} className="relative group">
                            <ArticleCard article={article} variant="featured" />
                            <button
                                onClick={() => handleRemoveArticle(articleUrl)}
                                className="absolute top-3 right-3 p-2 bg-background/90 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500 hover:text-white z-10"
                                title="Xóa khỏi danh sách đã xem"
                            >
                                <Trash2 className="w-4 h-4" />
                            </button>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
