import { Link } from "react-router-dom";
import { cn, decodeHtmlEntities } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import LazyImage from "./LazyImage";
import { handleArticleClick } from "@/lib/articleNavigation";

/**
 * Component sidebar hiển thị tin cùng chuyên mục
 * @param {Object} props
 * @param {Array} props.articles - Danh sách bài viết cùng chuyên mục
 * @param {string} props.title - Tiêu đề section
 * @param {string} props.categorySlug - Slug của category
 * @param {Function} props.onArticleClick - Callback khi click vào bài viết
 * @param {string} props.className - CSS class bổ sung
 */
export function CategoryRelatedSidebar({ 
    articles = [], 
    title = "Tin cùng chuyên mục",
    categorySlug,
    onArticleClick,
    className 
}) {
    if (!articles || articles.length === 0) {
        return null;
    }

    return (
        <div className={cn("bg-card rounded-lg p-4", className)}>
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-border">
                <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
                    <span className="w-1 h-4 bg-primary rounded-full"></span>
                    {title}
                </h3>
                {categorySlug && (
                    <Link
                        to={`/danh-muc/${categorySlug}`}
                        className="text-primary hover:text-primary/80 text-xs transition-colors"
                        title="Xem thêm"
                    >
                        <ChevronRight className="w-4 h-4" />
                    </Link>
                )}
            </div>

            <ul className="space-y-3">
                {articles.slice(0, 5).map((article, index) => {
                    const articleUrl = article.link || article.url;
                    const routeUrl = articleUrl ? `/bai-viet?url=${encodeURIComponent(articleUrl)}` : "#";
                    const decodedTitle = decodeHtmlEntities(article.title || "");

                    const handleClick = () => {
                        handleArticleClick(article);
                        if (onArticleClick) onArticleClick(article, index);
                    };

                    return (
                        <li key={articleUrl || index}>
                            <Link
                                to={routeUrl}
                                onClick={handleClick}
                                className="flex gap-3 group"
                            >
                                {article.imageUrl ? (
                                    <div className="relative shrink-0 w-20 h-14 rounded overflow-hidden bg-muted">
                                        <LazyImage
                                            src={article.imageUrl}
                                            alt={decodedTitle}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                        />
                                    </div>
                                ) : (
                                    <div className="shrink-0 w-20 h-14 rounded bg-muted flex items-center justify-center">
                                        <span className="text-[8px] text-muted-foreground">No Image</span>
                                    </div>
                                )}
                                <div className="flex-1 min-w-0">
                                    <span className="text-xs text-foreground leading-snug line-clamp-2 group-hover:text-primary transition-colors font-medium block">
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

export default CategoryRelatedSidebar;
