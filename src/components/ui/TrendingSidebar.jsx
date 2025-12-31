import { Link } from "react-router-dom";
import { cn, decodeHtmlEntities } from "@/lib/utils";
import LazyImage from "./LazyImage";

/**

 * @param {Object} props
 * @param {string} props.title - Tiêu đề sidebar
 * @param {Array} props.articles - Bài viết
 * @param {string} props.className - CSS class bổ sung
 */
export function TrendingSidebar({ title = "Tin nổi bật", articles, className }) {
    const FALLBACK_IMAGE = "https://placehold.co/100x70?text=News";

    const decodedTitle = decodeHtmlEntities(title);
    return (
        <div className={cn("bg-card rounded-lg p-4", className)}>
            <h3 className="text-sm font-bold text-foreground mb-3 pb-2 border-b border-border flex items-center gap-2">
                <span className="w-1 h-4 bg-primary rounded-full"></span>
                {decodedTitle}
            </h3>
            <ul className="space-y-3">
                {articles.slice(0, 5).map((article, index) => {
                    const articleIdentifier = article.link || article.id;
                    const articleRoute = articleIdentifier 
                        ? `/bai-viet/${encodeURIComponent(articleIdentifier)}`
                        : '#';
                    
                    return (
                    <li key={article.id || index}>
                        <Link
                            to={articleRoute}
                            className="flex gap-3 group"
                        >
                            <div className="relative shrink-0 w-16 h-12 rounded overflow-hidden">
                                <LazyImage
                                    src={article.imageUrl || FALLBACK_IMAGE}
                                    alt={article.title}
                                    className="w-full h-full object-cover"
                                />
                                <span className={cn(
                                    "absolute top-0 left-0 w-5 h-5 flex items-center justify-center text-[10px] font-bold",
                                    index < 3
                                        ? "bg-primary text-white"
                                        : "bg-muted text-muted-foreground"
                                )}>
                                    {index + 1}
                                </span>
                            </div>
                            <div className="flex-1 min-w-0">
                                {article.category && (
                                    <span className="text-[10px] text-muted-foreground font-medium block mb-0.5">
                                        {article.category}
                                    </span>
                                )}
                                <span className="text-xs text-foreground leading-snug line-clamp-2 group-hover:text-primary transition-colors font-medium">
                                    {decodeHtmlEntities(article.title)}
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

export default TrendingSidebar;
