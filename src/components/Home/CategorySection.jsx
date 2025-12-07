import { ArticleCard } from "@/components/ui/ArticleCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { TrendingSidebar } from "@/components/ui/TrendingSidebar";
import { cn } from "@/lib/utils";

/**
 * @param {Object} props
 * @param {string} props.title - Section title
 * @param {string} props.href - Link for "Xem thêm"
 * @param {Object} props.featuredArticle - Main featured article
 * @param {Array} props.articles - List of articles
 * @param {Array} props.trendingArticles - Optional trending articles for sidebar
 * @param {string} props.sidebarTitle - Title for trending sidebar
 * @param {string} props.variant - Section variant: 'default' | 'dark'
 */
export function CategorySection({
    title,
    href,
    featuredArticle,
    articles,
    trendingArticles,
    sidebarTitle = "Được quan tâm",
    variant = "default",
    className
}) {
    const isDark = variant === "dark";

    return (
        <section className={cn(
            "py-6",
            isDark ? "bg-gray-800" : "bg-white",
            className
        )}>
            <div className="container mx-auto px-4">
                <SectionHeader
                    title={title}
                    href={href}
                    variant={isDark ? "dark" : "primary"}
                />

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                    <div className="lg:col-span-4">
                        <ArticleCard
                            article={featuredArticle}
                            variant="featured"
                        />
                    </div>

                    <div className="lg:col-span-5">
                        <div className="space-y-4">
                            {articles.slice(0, 4).map(article => (
                                <ArticleCard
                                    key={article.id}
                                    article={article}
                                    variant="horizontal"
                                />
                            ))}
                        </div>
                    </div>

                    {trendingArticles && (
                        <div className="lg:col-span-3">
                            <TrendingSidebar
                                title={sidebarTitle}
                                articles={trendingArticles}
                            />
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}

export default CategorySection;
