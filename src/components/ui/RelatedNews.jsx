import { Link } from "react-router-dom";
import { cn, decodeHtmlEntities } from "@/lib/utils";
import { Circle } from "lucide-react";
import LazyImage from "./LazyImage";
import { handleArticleClick } from "@/lib/articleNavigation";

/**
 * Component hiển thị tin liên quan
 * @param {Object} props
 * @param {Array} props.articles - Danh sách tin liên quan
 * @param {string} props.title - Tiêu đề
 * @param {Function} props.onArticleClick - Callback khi click vào bài viết
 * @param {string} props.className - CSS class bổ sung
 */
export function RelatedNews({ 
    articles = [], 
    title = "Tin liên quan",
    onArticleClick,
    className 
}) {
    if (!articles || articles.length === 0) {
        return null;
    }

    const articlesWithImage = articles.filter(article => {
        const imageUrl = article.imageUrl;
        return imageUrl && imageUrl.trim() !== '';
    });

    const articlesWithoutImage = articles.filter(article => {
        const imageUrl = article.imageUrl;
        return !imageUrl || imageUrl.trim() === '';
    });

    return (
        <div className={cn("bg-card rounded-xl shadow-sm p-6", className)}>
            <h2 className="text-xl font-bold text-foreground mb-6">
                {title}
            </h2>

            <div className="space-y-0">
                {/* Bài viết có ảnh */}
                {articlesWithImage.map((article, index) => {
                    const articleUrl = article.link || article.url;
                    const routeUrl = articleUrl ? `/bai-viet?url=${encodeURIComponent(articleUrl)}` : "#";
                    const decodedTitle = decodeHtmlEntities(article.title || "");
                    const decodedDescription = decodeHtmlEntities(article.description || "");

                    const handleClick = () => {
                        handleArticleClick(article);
                        if (onArticleClick) onArticleClick(article, index);
                    };

                    return (
                        <div key={articleUrl || index} className="border-b border-border last:border-0">
                            <Link
                                to={routeUrl}
                                onClick={handleClick}
                                className="flex gap-4 group py-4 hover:bg-muted/30 transition-colors rounded-lg px-2 -mx-2"
                            >
                                {/* Ảnh */}
                                <div className="shrink-0 w-48 h-32 rounded-lg overflow-hidden bg-muted">
                                    <LazyImage
                                        src={article.imageUrl}
                                        alt={decodedTitle}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                </div>

                                {/* Tiêu đề */}
                                <div className="flex-1 min-w-0 flex flex-col justify-center">
                                    <h3 className="text-base font-semibold text-foreground leading-snug line-clamp-2 group-hover:text-primary transition-colors mb-2">
                                        {decodedTitle}
                                    </h3>
                                    {decodedDescription && (
                                        <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                                            {decodedDescription}
                                        </p>
                                    )}
                                </div>
                            </Link>
                        </div>
                    );
                })}

                {/* Bài viết không có ảnh*/}
                {articlesWithoutImage.map((article, index) => {
                    const articleUrl = article.link || article.url;
                    const routeUrl = articleUrl ? `/bai-viet?url=${encodeURIComponent(articleUrl)}` : "#";
                    const decodedTitle = decodeHtmlEntities(article.title || "");

                    const handleClick = () => {
                        handleArticleClick(article);
                        if (onArticleClick) onArticleClick(article, articlesWithImage.length + index);
                    };

                    return (
                        <div key={articleUrl || index} className="border-b border-border last:border-0">
                            <Link
                                to={routeUrl}
                                onClick={handleClick}
                                className="flex gap-4 group py-3 hover:bg-muted/30 transition-colors rounded-lg px-2 -mx-2"
                            >
                                <div className="shrink-0 w-48 flex items-start justify-end pr-4">
                                    <Circle className="w-2.5 h-2.5 text-muted-foreground fill-none stroke-2 mt-1.5" />
                                </div>
                                
                                {/* Tiêu đề */}
                                <div className="flex-1 min-w-0">
                                    <h3 className="text-sm font-medium text-foreground leading-snug line-clamp-2 group-hover:text-primary transition-colors">
                                        {decodedTitle}
                                    </h3>
                                </div>
                            </Link>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default RelatedNews;
