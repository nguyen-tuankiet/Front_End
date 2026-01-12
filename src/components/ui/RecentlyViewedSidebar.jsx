import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { cn, decodeHtmlEntities } from "@/lib/utils";
import LazyImage from "./LazyImage";
import { getViewedArticles } from "@/lib/viewedArticles";
import { handleArticleClick } from "@/lib/articleNavigation";

/**
 * Component hiển thị tin đã xem gần đây trong sidebar
 */
export function RecentlyViewedSidebar({ className, limit = 5 }) {
    const [viewedArticles, setViewedArticles] = useState([]);
    const FALLBACK_IMAGE = "https://placehold.co/100x70?text=News";

    useEffect(() => {
        const loadArticles = () => {
            const articles = getViewedArticles();
            setViewedArticles(articles.slice(0, limit));
        };

        loadArticles();

        const handleViewedArticlesChange = () => {
            loadArticles();
        };

        const handleStorageChange = (e) => {
            if (e.key === 'viewedArticles') {
                loadArticles();
            }
        };

        window.addEventListener('viewedArticlesChanged', handleViewedArticlesChange);
        window.addEventListener('storage', handleStorageChange);

        return () => {
            window.removeEventListener('viewedArticlesChanged', handleViewedArticlesChange);
            window.removeEventListener('storage', handleStorageChange);
        };
    }, [limit]);

    if (viewedArticles.length === 0) {
        return null;
    }

    return (
        <div className={cn("bg-card rounded-lg p-4", className)}>
            <h3 className="text-sm font-bold text-foreground mb-3 pb-2 border-b border-border flex items-center gap-2">
                <span className="w-1 h-4 bg-primary rounded-full"></span>
                Tin đã xem gần đây
            </h3>
            <ul className="space-y-3">
                {viewedArticles.map((article, index) => {
                    const articleUrl = article.url || article.link;
                    const articleRoute = articleUrl 
                        ? `/bai-viet?url=${encodeURIComponent(articleUrl)}`
                        : '#';
                    const decodedTitle = decodeHtmlEntities(article.title || "");

                    const handleClick = () => {
                        handleArticleClick(article);
                    };

                    return (
                        <li key={articleUrl || index}>
                            <Link
                                to={articleRoute}
                                onClick={handleClick}
                                className="flex gap-3 group"
                            >
                                <div className="relative shrink-0 w-16 h-12 rounded overflow-hidden">
                                    <LazyImage
                                        src={article.imageUrl || FALLBACK_IMAGE}
                                        alt={decodedTitle}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <span className="text-xs text-foreground leading-snug line-clamp-2 group-hover:text-primary transition-colors font-medium">
                                        {decodedTitle}
                                    </span>
                                </div>
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}
