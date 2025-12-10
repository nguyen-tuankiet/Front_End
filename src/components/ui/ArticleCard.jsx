import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

/**
 * @param {Object} props
 * @param {Object} props.article - Article data (title, excerpt, image, category, categorySlug, date)
 * @param {string} props.variant - Card variant: 'hero' | 'featured' | 'horizontal' | 'compact'
 * @param {string} props.className - Additional CSS classes
 */
export function ArticleCard({ article, variant = "featured", className }) {
    const { id, title, excerpt, image, category, categorySlug, date } = article;

    // Hero variant - Large card with overlay text
    if (variant === "hero") {
        return (
            <Link
                to={`/bai-viet/${id}`}
                className={cn(
                    "block relative rounded-lg overflow-hidden group h-full min-h-[300px] md:min-h-[400px]",
                    className
                )}
            >
                <img
                    src={image}
                    alt={title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
                    <Link
                        to={`/danh-muc/${categorySlug}`}
                        className="inline-block px-2 py-1 bg-primary text-white text-xs font-semibold rounded mb-2 hover:bg-primary/90"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {category}
                    </Link>
                    <h2 className="text-white text-lg md:text-2xl font-bold leading-tight line-clamp-3 group-hover:text-primary-foreground transition-colors">
                        {title}
                    </h2>
                    {excerpt && (
                        <p className="text-white/80 text-sm mt-2 line-clamp-2 hidden md:block">
                            {excerpt}
                        </p>
                    )}
                    <span className="text-white/60 text-xs mt-2 block">{date}</span>
                </div>
            </Link>
        );
    }

    // Featured variant - Medium card with image on top
    if (variant === "featured") {
        return (
            <Link
                to={`/bai-viet/${id}`}
                className={cn(
                    "block group",
                    className
                )}
            >
                <div className="relative rounded-lg overflow-hidden mb-3">
                    <img
                        src={image}
                        alt={title}
                        className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <Link
                        to={`/danh-muc/${categorySlug}`}
                        className="absolute top-2 left-2 px-2 py-1 bg-primary text-white text-xs font-semibold rounded hover:bg-primary/90"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {category}
                    </Link>
                </div>
                <h3 className="font-semibold text-foreground leading-snug line-clamp-2 group-hover:text-primary transition-colors">
                    {title}
                </h3>
                {excerpt && (
                    <p className="text-muted-foreground text-sm mt-1 line-clamp-2">
                        {excerpt}
                    </p>
                )}
                <span className="text-muted-foreground text-xs mt-2 block">{date}</span>
            </Link>
        );
    }

    // Horizontal variant - Image left, text right
    if (variant === "horizontal") {
        return (
            <Link
                to={`/bai-viet/${id}`}
                className={cn(
                    "flex gap-3 group",
                    className
                )}
            >
                <div className="relative rounded overflow-hidden shrink-0 w-24 h-24 md:w-32 md:h-24">
                    <img
                        src={image}
                        alt={title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                </div>
                <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-foreground text-sm leading-snug line-clamp-2 group-hover:text-primary transition-colors">
                        {title}
                    </h4>
                    <span className="text-muted-foreground text-xs mt-1 block">{date}</span>
                </div>
            </Link>
        );
    }

    // Compact variant - Text only with number
    if (variant === "compact") {
        return (
            <Link
                to={`/bai-viet/${id}`}
                className={cn(
                    "block group py-2 border-b border-gray-100 last:border-0",
                    className
                )}
            >
                <h4 className="font-medium text-gray-700 text-sm leading-snug line-clamp-2 group-hover:text-primary transition-colors">
                    {title}
                </h4>
                <span className="text-gray-400 text-xs mt-1 block">{date}</span>
            </Link>
        );
    }

    return null;
}

export default ArticleCard;
