import { cn, decodeHtmlEntities } from "@/lib/utils";
import { Link } from "react-router-dom";
import { Clock } from "lucide-react";
import LazyImage from "./LazyImage";
import { handleArticleClick } from "@/lib/articleNavigation";

/**
 * Component hiển thị danh sách bài viết liên quan
 * @param {Object} props
 * @param {Array} props.articles - Danh sách bài viết liên quan
 * @param {string} props.title - Tiêu đề section
 * @param {Function} props.onArticleClick - Callback khi click vào bài viết
 * @param {string} props.className - CSS class bổ sung
 */
export function RelatedArticles({ 
    articles = [], 
    title = "Bài viết liên quan",
    onArticleClick,
    className 
}) {
    if (!articles || articles.length === 0) {
        return null;
    }

    return (
        <div className={cn("bg-card rounded-xl shadow-sm p-5", className)}>
            <h2 className="text-base font-bold text-foreground mb-4 pb-3 border-b-2 border-border flex items-center gap-2">
                <span className="w-1 h-5 bg-primary rounded-full" />
                {title}
            </h2>

            <div className="space-y-4">
                {articles.map((article, index) => (
                    <RelatedArticleItem
                        key={article.id || index}
                        article={article}
                        onClick={() => onArticleClick?.(article, index)}
                    />
                ))}
            </div>
        </div>
    );
}

function RelatedArticleItem({ article, onClick }) {
    const articleUrl = article.link || article.url || article.originalUrl;
    const routeUrl = articleUrl ? `/bai-viet?url=${encodeURIComponent(articleUrl)}` : "#";
    const decodedTitle = decodeHtmlEntities(article.title || "");

    const handleClick = () => {
        handleArticleClick(article);
        if (onClick) onClick();
    };

    return (
        <Link
            to={routeUrl}
            onClick={handleClick}
            className="flex gap-3 group"
        >
            {article.imageUrl ? (
                <div className="shrink-0 w-24 h-16 rounded overflow-hidden">
                    <LazyImage
                        src={article.imageUrl}
                        alt={decodedTitle}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                </div>
            ) : (
                <div className="shrink-0 w-24 h-16 rounded bg-muted flex items-center justify-center">
                    <span className="text-xs text-muted-foreground">No Image</span>
                </div>
            )}

            <div className="flex-1 min-w-0">
                <h3 className="text-sm font-medium text-foreground leading-snug line-clamp-2 group-hover:text-primary transition-colors mb-1">
                    {decodedTitle}
                </h3>
                {article.pubDate || article.date ? (
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <Clock className="w-3 h-3" />
                        <span>{article.pubDate || article.date}</span>
                    </div>
                ) : null}
            </div>
        </Link>
    );
}

export default RelatedArticles;

