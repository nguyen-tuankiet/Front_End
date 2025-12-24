import { useState, useEffect } from "react";
import { HeroSection } from "@/components/Home/HeroSection";
import { CategorySection } from "@/components/Home/CategorySection";
import { TrendingSidebar } from "@/components/ui/TrendingSidebar";
import { NewsletterSection } from "@/components/ui/NewsletterSection";
import { apiService } from "@/services/api";

export function HomePage() {
    const [homeData, setHomeData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchHomeData = async () => {
            try {
                const data = await apiService.getHomePageData();
                setHomeData(data);
            } catch (error) {
                console.error("Failed to fetch home page data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchHomeData();
    }, []);

    const featuredArticles = homeData?.featuredArticles || [];
    const heroArticle = featuredArticles[0];
    const sideArticles = featuredArticles.slice(1, 5);
    const trendingArticles = homeData?.trendingArticles || [];
    const mostReadArticles = homeData?.mostReadArticles || [];

    const getSlice = (articles, start, end) => {
        return articles && articles.length > 0 ? articles.slice(start, end) : [];
    };

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center bg-background text-foreground">Loading...</div>;
    }

    return (
        <div className="min-h-screen bg-background">
            <HeroSection
                mainArticle={heroArticle}
                sideArticles={sideArticles}
            />

            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    <div className="lg:col-span-9 space-y-8">
                        {homeData?.categorySections?.map((section) => {
                            const articles = section.articles || [];

                            if (articles.length === 0) return null;

                            return (
                                <CategorySection
                                    key={section.categorySlug}
                                    title={section.categoryName}
                                    href={`/danh-muc/${section.categorySlug}`}
                                    featuredArticle={articles[0]}
                                    articles={getSlice(articles, 1, 5)}
                                />
                            );
                        })}
                    </div>

                    <div className="lg:col-span-3">
                        <div className="sticky top-4">
                            <TrendingSidebar
                                title="Tin nổi bật"
                                articles={trendingArticles || []}
                            />

                            <div className="mt-8">
                                <TrendingSidebar
                                    title="Đọc nhiều"
                                    articles={mostReadArticles || []}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <NewsletterSection />
        </div>
    );
}

export default HomePage;
