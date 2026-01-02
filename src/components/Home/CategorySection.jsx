import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { cn, decodeHtmlEntities } from "@/lib/utils";
import LazyImage from "@/components/ui/LazyImage";

/**
 * @param {Object} props
 * @param {string} props.title - Section title
 * @param {string} props.href - "Xem thêm"
 * @param {Object} props.featuredArticle - Tin nóng
 * @param {Array} props.articles - Bài viết
 * @param {string} props.className - CSS class bổ sung
 */
export function CategorySection({
    title,
    href,
    featuredArticle,
    articles,
    className
}) {
    const FALLBACK_IMAGE = "https://placehold.co/600x400?text=News";

    if (!featuredArticle) return null;

    return (
        <section className={cn("py-6", className)}>
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                    <span className="w-1 h-6 bg-primary rounded-full"></span>
                    {title}
                </h2>
                <Link to={href}>
                    <button className="text-primary text-sm font-medium flex items-center gap-1 hover:underline">
                        Xem thêm
                        <ArrowRight className="h-4 w-4" />
                    </button>
                </Link>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                <Link
                    to={featuredArticle.link 
                        ? `/bai-viet/${encodeURIComponent(featuredArticle.link)}`
                        : `/bai-viet/${featuredArticle.id || ''}`}
                    className="group bg-card rounded-xl overflow-hidden border border-border transition-shadow hover:shadow-lg"
                    style={{ boxShadow: 'var(--card-shadow)' }}
                >
                    <div className="relative overflow-hidden">
                        <LazyImage
                            src={featuredArticle.imageUrl || FALLBACK_IMAGE}
                            alt={featuredArticle.title}
                            className="w-full h-52 object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        <div className="absolute top-3 left-3">
                            <span className="px-3 py-1 bg-primary text-white text-xs font-bold rounded shadow">
                                {featuredArticle.category || title}
                            </span>
                        </div>
                    </div>
                    <div className="p-5">
                        <h3 className="font-bold text-lg mb-2 line-clamp-2 text-foreground group-hover:text-primary transition-colors">
                            {decodeHtmlEntities(featuredArticle.title)}
                        </h3>
                        {(featuredArticle.excerpt || featuredArticle.description) && (
                            <p className="text-muted-foreground text-sm line-clamp-2 mb-3">
                                {decodeHtmlEntities(featuredArticle.excerpt || featuredArticle.description)}
                            </p>
                        )}
                        <span className="text-xs text-muted-foreground/70">{featuredArticle.pubDate}</span>
                    </div>
                </Link>

                <div className="space-y-4">
                    {articles.slice(0, 4).map((article, index) => {
                        const articleRoute = article.link 
                            ? `/bai-viet/${encodeURIComponent(article.link)}`
                            : `/bai-viet/${article.id || index}`;
                        return (
                        <Link
                            key={article.id || article.link || index}
                            to={articleRoute}
                            className="flex gap-4 group"
                        >
                            <LazyImage
                                src={article.imageUrl || FALLBACK_IMAGE}
                                alt={article.title}
                                className="w-28 h-20 object-cover rounded-lg shrink-0 group-hover:brightness-110 transition-all"
                            />
                            <div className="flex-1 min-w-0 py-2">
                                <h4 className="font-medium text-sm text-foreground line-clamp-2 group-hover:text-primary transition-colors">
                                    {decodeHtmlEntities(article.title)}
                                </h4>
                                <span className="text-xs text-muted-foreground/70 mt-1 block">
                                    {article.pubDate}
                                </span>
                            </div>
                        </Link>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

export default CategorySection;
