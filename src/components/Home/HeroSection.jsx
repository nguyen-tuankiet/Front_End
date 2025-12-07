import { ArticleCard } from "@/components/ui/ArticleCard";
import { TrendingSidebar } from "@/components/ui/TrendingSidebar";
import { cn } from "@/lib/utils";

/**
 * @param {Object} props
 * @param {Object} props.mainArticle
 * @param {Array} props.sideArticles 
 * @param {Array} props.trendingArticles 
 */
export function HeroSection({ mainArticle, sideArticles, trendingArticles, className }) {
    return (
        <section className={cn("py-6", className)}>
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                    <div className="lg:col-span-6">
                        <ArticleCard article={mainArticle} variant="hero" />
                    </div>

                    <div className="lg:col-span-3 space-y-4">
                        {sideArticles.slice(0, 2).map(article => (
                            <ArticleCard
                                key={article.id}
                                article={article}
                                variant="horizontal"
                            />
                        ))}
                    </div>

                    <div className="lg:col-span-3">
                        <TrendingSidebar
                            title="Tin nổi bật"
                            articles={trendingArticles}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}

export default HeroSection;
