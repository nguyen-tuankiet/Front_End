import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { Clock } from "lucide-react";

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
            {/* Header */}
            <h2 className="text-base font-bold text-foreground mb-4 pb-3 border-b-2 border-border flex items-center gap-2">
                <span className="w-1 h-5 bg-primary rounded-full" />
                {title}
            </h2>

            {/* Danh sách bài báo liên quan */}
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

/**
 * Component hiển thị một bài viết liên quan
 */
function RelatedArticleItem({ article, onClick }) {
    const articleUrl = article.category && article.id !== undefined
        ? `/danh-muc/${article.category}/bai-viet/${article.id}`
        : article.url || "#";

    return (
        <Link
            to={articleUrl}
            onClick={onClick}
            className="flex gap-3 group"
        >
            {/* Thumbnail */}
            {article.image || article.Thumbnail ? (
                <div className="shrink-0 w-24 h-16 rounded overflow-hidden">
                    <img
                        src={article.image || article.Thumbnail}
                        alt={article.title || article['Tiêu đề'] || ""}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => e.target.style.display = 'none'}
                    />
                </div>
            ) : (
                <div className="shrink-0 w-24 h-16 rounded bg-muted flex items-center justify-center">
                    <span className="text-xs text-muted-foreground">No Image</span>
                </div>
            )}

            {/* Content */}
            <div className="flex-1 min-w-0">
                <h3 className="text-sm font-medium text-foreground leading-snug line-clamp-2 group-hover:text-primary transition-colors mb-1">
                    {article.title || article['Tiêu đề'] || ""}
                </h3>
                {article.time || article.date ? (
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <Clock className="w-3 h-3" />
                        <span>{article.time || article.date}</span>
                    </div>
                ) : null}
            </div>
        </Link>
    );
}

export default RelatedArticles;

