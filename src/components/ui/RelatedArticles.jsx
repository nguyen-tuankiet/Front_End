import { cn, decodeHtmlEntities } from "@/lib/utils";
import { Link } from "react-router-dom";
import { Clock, ChevronRight } from "lucide-react";
import LazyImage from "./LazyImage";
import { handleArticleClick } from "@/lib/articleNavigation";

/**
 * Component hiển thị danh sách bài viết liên quan
 * @param {Object} props
 * @param {Array} props.articles - Danh sách bài viết liên quan
 * @param {string} props.title - Tiêu đề section
 * @param {string} props.categorySlug - Slug của category
 * @param {Function} props.onArticleClick - Callback khi click vào bài viết
 * @param {string} props.className - CSS class bổ sung
 */
export function RelatedArticles({ 
    articles = [], 
    title = "Bài viết liên quan",
    categorySlug,
    onArticleClick,
    className 
}) {
    if (!articles || articles.length === 0) {
        return null;
    }

    return (
        <div className={cn("bg-card rounded-xl shadow-sm p-6", className)}>
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-foreground">
                    {title}
                </h2>
                {categorySlug && (
                    <Link
                        to={`/danh-muc/${categorySlug}`}
                        className="flex items-center gap-1 text-primary hover:text-primary/80 font-medium text-sm transition-colors"
                    >
                        Xem thêm
                        <ChevronRight className="w-4 h-4" />
                    </Link>
                )}
            </div>

            <div className="space-y-0">
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
    const decodedDescription = decodeHtmlEntities(article.description || article.excerpt || "");

    const handleClick = () => {
        handleArticleClick(article);
        if (onClick) onClick();
    };

    return (
        <Link
            to={routeUrl}
            onClick={handleClick}
            className="flex gap-4 group py-4 border-b border-border last:border-0 hover:bg-muted/30 transition-colors rounded-lg px-2 -mx-2"
        >
            {article.imageUrl ? (
                <div className="shrink-0 w-48 h-32 rounded-lg overflow-hidden bg-muted">
                    <LazyImage
                        src={article.imageUrl}
                        alt={decodedTitle}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                </div>
            ) : (
                <div className="shrink-0 w-48 h-32 rounded-lg bg-muted flex items-center justify-center">
                    <span className="text-xs text-muted-foreground">No Image</span>
                </div>
            )}

            <div className="flex-1 min-w-0 flex flex-col justify-center">
                <h3 className="text-base font-semibold text-foreground leading-snug line-clamp-2 group-hover:text-primary transition-colors mb-2">
                    {decodedTitle}
                </h3>
                {decodedDescription && (
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-2 leading-relaxed">
                        {decodedDescription}
                    </p>
                )}
                {article.pubDate || article.date ? (
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground mt-auto">
                        <Clock className="w-4 h-4" />
                        <span>{article.pubDate || article.date}</span>
                    </div>
                ) : null}
            </div>
        </Link>
    );
}

export default RelatedArticles;

