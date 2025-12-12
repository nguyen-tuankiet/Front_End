import { ArticleCard } from "@/components/ui/ArticleCard";
import { cn } from "@/lib/utils";

/**
 * @param {Object} props
 * @param {Object} props.mainArticle
 * @param {Array} props.sideArticles 
 */
export function HeroSection({ mainArticle, sideArticles, className }) {
    return (
        <section className={cn("py-6", className)}>
            <div className="container mx-auto px-4">
                <div className="">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
                        <div className="lg:col-span-8 ">
                            <ArticleCard
                                article={mainArticle}
                                variant="card-lg"
                                className="h-full"
                            />
                        </div>

                        <div className="lg:col-span-4 flex flex-col gap-5">
                            {sideArticles.slice(0, 2).map(article => (
                                <ArticleCard
                                    key={article.id}
                                    article={article}
                                    variant="card-sm"
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default HeroSection;
