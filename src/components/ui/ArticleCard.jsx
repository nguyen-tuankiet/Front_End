import { Link } from "react-router-dom";
import { Clock } from "lucide-react";
import { cn, decodeHtmlEntities } from "@/lib/utils";
import LazyImage from "./LazyImage";
import { handleArticleClick } from "@/lib/articleNavigation";

/**
 * @param {Object} props
 * @param {Object} props.article - dữ liệu article (title, excerpt, image, category, categorySlug, date)
 * @param {string} props.variant - variant (hero, featured, horizontal, compact)
 * @param {string} props.className - CSS class bổ sung
 */
export function ArticleCard({ article, variant = "featured", className }) {
    if (!article) {
        return null;
    }
    
    const { id, link, url, title, excerpt, description, imageUrl, category, categorySlug, date, pubDate } = article;
    
    const articleUrl = link || url;
    const articleRoute = articleUrl 
        ? `/bai-viet?url=${encodeURIComponent(articleUrl)}`
        : id 
            ? `/bai-viet/${id}` 
            : '#';
    
    // Decode HTML entities
    const decodedTitle = decodeHtmlEntities(title);
    const articleExcerpt = decodeHtmlEntities(excerpt || description);
    const articleDate = pubDate || date;

    const FALLBACK_IMAGE = "https://placehold.co/600x400?text=News";

    // Lưu vào danh sách đã xem khi nhấn vào link
    const handleClick = () => {
        handleArticleClick(article);
    };

    if (variant === "card-lg") {
        return (
            <Link
                to={articleRoute}
                onClick={handleClick}
                className={cn("block group h-full", className)}
            >
                <div className="relative rounded-xl overflow-hidden mb-4 shadow-sm aspect-[16/9]">
                    <LazyImage
                        src={imageUrl || FALLBACK_IMAGE}
                        alt={decodedTitle}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <span className="absolute top-3 left-3 px-3 py-1 bg-primary text-white text-xs font-bold uppercase tracking-wider rounded shadow-sm">
                        {category || "Tin nóng"}
                    </span>
                </div>
                <div>
                    <h2 className="text-2xl md:text-3xl font-bold text-foreground leading-tight mb-3 group-hover:text-primary transition-colors">
                        {decodedTitle}
                    </h2>
                    {articleExcerpt && (
                        <p className="text-muted-foreground text-base leading-relaxed line-clamp-3 mb-3">
                            {articleExcerpt}
                        </p>
                    )}
                    <span className="text-muted-foreground/70 text-xs font-medium">{articleDate}</span>
                </div>
            </Link>
        );
    }

    if (variant === "card-md") {
        return (
            <Link
                to={articleRoute}
                onClick={handleClick}
                className={cn("block group h-full", className)}
            >
                <div className="relative rounded-lg overflow-hidden mb-3 aspect-[3/2]">
                    <LazyImage
                        src={imageUrl || FALLBACK_IMAGE}
                        alt={decodedTitle}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    {category && (
                        <span className="absolute top-2 left-2 px-2 py-0.5 bg-primary text-white text-[10px] font-bold uppercase rounded">
                            {category}
                        </span>
                    )}
                </div>
                <div>
                    <h3 className="text-base font-bold text-foreground leading-snug line-clamp-2 mb-2 group-hover:text-primary transition-colors">
                        {decodedTitle}
                    </h3>
                    <span className="text-muted-foreground/70 text-xs font-medium block">{articleDate}</span>
                </div>
            </Link>
        );
    }

    if (variant === "card-sm") {
        return (
            <Link
                to={articleRoute}
                onClick={handleClick}
                className={cn("block group", className)}
            >
                <div className="relative rounded-lg overflow-hidden mb-2 aspect-[16/10]">
                    <LazyImage
                        src={imageUrl || FALLBACK_IMAGE}
                        alt={decodedTitle}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    {category && (
                        <span className="absolute top-2 left-2 px-2 py-0.5 bg-primary text-white text-[10px] font-bold uppercase rounded">
                            {category}
                        </span>
                    )}
                </div>
                <div>
                    <h3 className="text-sm font-semibold text-foreground leading-snug line-clamp-2 mb-1 group-hover:text-primary transition-colors">
                        {decodedTitle}
                    </h3>
                    <span className="text-muted-foreground/70 text-[11px] font-medium block">{articleDate}</span>
                </div>
            </Link>
        );
    }

    if (variant === "hero-overlay") {
        return (
            <Link
                to={articleRoute}
                onClick={handleClick}
                className={cn(
                    "block relative rounded-xl overflow-hidden group h-full min-h-[400px] md:min-h-[500px] shadow-lg",
                    className
                )}
            >
                <LazyImage
                    src={imageUrl || FALLBACK_IMAGE}
                    alt={decodedTitle}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                    <Link
                        to={`/danh-muc/${categorySlug}`}
                        className="inline-block px-3 py-1 bg-primary text-white text-xs font-bold uppercase tracking-wider rounded-md mb-3 hover:bg-primary/90 transition-colors"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {category || "Tin tức"}
                    </Link>
                    <h2 className="text-white text-2xl md:text-4xl font-bold leading-tight line-clamp-3 mb-3 group-hover:text-primary-foreground transition-colors">
                        {decodedTitle}
                    </h2>
                    {articleExcerpt && (
                        <p className="text-gray-200 text-sm md:text-base line-clamp-2 md:line-clamp-3 mb-3 opacity-90">
                            {articleExcerpt}
                        </p>
                    )}
                    <span className="text-gray-400 text-xs font-medium">{articleDate}</span>
                </div>
            </Link>
        );
    }

    if (variant === "hero") {
        return (
            <Link
                to={articleRoute}
                onClick={handleClick}
                className={cn(
                    "block relative rounded-xl overflow-hidden group h-full min-h-[400px] md:min-h-[500px] shadow-lg",
                    className
                )}
            >
                <LazyImage
                    src={imageUrl || FALLBACK_IMAGE}
                    alt={decodedTitle}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                    <span className="inline-block px-3 py-1 bg-primary text-white text-xs font-bold uppercase tracking-wider rounded-md mb-3">
                        {category || "Tin tức"}
                    </span>
                    <h2 className="text-white text-2xl md:text-4xl font-bold leading-tight line-clamp-3 mb-3 group-hover:text-primary-foreground transition-colors">
                        {decodedTitle}
                    </h2>
                    {articleExcerpt && (
                        <p className="text-gray-200 text-sm md:text-base line-clamp-2 md:line-clamp-3 mb-3 opacity-90">
                            {articleExcerpt}
                        </p>
                    )}
                    <span className="text-gray-400 text-xs font-medium">{articleDate}</span>
                </div>
            </Link>
        );
    }

    if (variant === "featured") {
        return (
            <Link
                to={articleRoute}
                onClick={handleClick}
                className={cn(
                    "block group h-full flex flex-col",
                    className
                )}
            >
                <div className="relative rounded-xl overflow-hidden mb-4 aspect-[16/10] shadow-sm">
                    <LazyImage
                        src={imageUrl || FALLBACK_IMAGE}
                        alt={decodedTitle}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <span className="absolute top-3 left-3 px-2.5 py-1 bg-card/90 backdrop-blur-sm text-foreground text-xs font-bold rounded shadow-sm">
                        {category || "Tin tức"}
                    </span>
                </div>
                <div className="flex-1 flex flex-col">
                    <h3 className="text-lg font-bold text-foreground leading-snug line-clamp-2 mb-2 group-hover:text-primary transition-colors">
                        {decodedTitle}
                    </h3>
                    {articleExcerpt && (
                        <p className="text-muted-foreground text-sm line-clamp-2 mb-3 flex-1">
                            {articleExcerpt}
                        </p>
                    )}
                    <span className="text-muted-foreground/70 text-xs font-medium mt-auto">{articleDate}</span>
                </div>
            </Link>
        );
    }

    if (variant === "horizontal") {
        return (
            <Link
                to={articleRoute}
                onClick={handleClick}
                className={cn(
                    "flex gap-3 group items-start",
                    className
                )}
            >
                <div className="relative rounded-lg overflow-hidden shrink-0 w-28 h-20 bg-muted">
                    <LazyImage
                        src={imageUrl || FALLBACK_IMAGE}
                        alt={decodedTitle}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    {category && (
                        <span className="absolute top-1 left-1 px-1.5 py-0.5 bg-primary text-white text-[9px] font-bold uppercase rounded">
                            {category}
                        </span>
                    )}
                </div>
                <div className="flex-1 min-w-0 py-0.5">
                    <h4 className="font-semibold text-foreground text-sm leading-snug line-clamp-2 group-hover:text-primary transition-colors mb-1">
                        {decodedTitle}
                    </h4>
                    <span className="text-muted-foreground/70 text-[11px] font-medium">{articleDate}</span>
                </div>
            </Link>
        );
    }

    if (variant === "compact") {
        return (
            <Link
                to={articleRoute}
                onClick={handleClick}
                className={cn(
                    "block group py-3 border-b border-border last:border-0 hover:bg-muted/50 px-2 -mx-2 rounded transition-colors",
                    className
                )}
            >
                <h4 className="font-medium text-foreground text-sm leading-snug line-clamp-2 group-hover:text-primary transition-colors mb-1">
                    {decodedTitle}
                </h4>
                <div className="flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-muted-foreground/50"></span>
                    <span className="text-muted-foreground/70 text-xs">{articleDate}</span>
                </div>
            </Link>
        );
    }

    // Search variant - similar to featured but with clock icon for time
    if (variant === "search") {
        return (
            <Link
                to={articleRoute}
                onClick={handleClick}
                className={cn(
                    "block group bg-card rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300",
                    className
                )}
            >
                <div className="relative aspect-[16/10] overflow-hidden">
                    <LazyImage
                        src={imageUrl || FALLBACK_IMAGE}
                        alt={decodedTitle}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    {category && (
                        <span className="absolute top-3 left-3 px-3 py-1 bg-primary text-white text-xs font-bold uppercase rounded shadow-sm">
                            {category}
                        </span>
                    )}
                </div>
                <div className="p-5">
                    <h3 className="text-lg font-bold text-foreground leading-snug line-clamp-2 mb-3 group-hover:text-primary transition-colors">
                        {decodedTitle}
                    </h3>
                    {articleExcerpt && (
                        <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3 mb-4">
                            {articleExcerpt}
                        </p>
                    )}
                    <div className="flex items-center gap-1.5 text-muted-foreground text-xs">
                        <Clock className="w-4 h-4" />
                        <span>{articleDate}</span>
                    </div>
                </div>
            </Link>
        );
    }

    return null;
}

export default ArticleCard;
