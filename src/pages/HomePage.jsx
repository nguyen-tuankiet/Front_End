import { useState, useEffect } from "react";
import { HeroSection } from "@/components/Home/HeroSection";
import { CategorySection } from "@/components/Home/CategorySection";
import { HomeSidebar } from "@/components/Home/HomeSidebar";
import { NewsletterSection } from "@/components/ui/NewsletterSection";
import { apiService } from "@/services/api";
import { useLanguage } from "@/contexts/LanguageContext";

export function HomePage() {
    const [homeData, setHomeData] = useState(null);
    const [loading, setLoading] = useState(true);
    const { t, language } = useLanguage();

    useEffect(() => {
        const fetchHomeData = async () => {
            try {
                const data = await apiService.getHomePageData(language);
                setHomeData(data);
            } catch (error) {
                console.error("Failed to fetch home page data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchHomeData();
    }, [language]);

    const featuredArticles = homeData?.featuredArticles || [];
    const heroArticle = featuredArticles[0];
    const sideArticles = featuredArticles.slice(1, 5);
    const trendingArticles = homeData?.trendingArticles || [];
    const mostReadArticles = homeData?.mostReadArticles || [];

    const getSlice = (articles, start, end) => {
        return articles && articles.length > 0 ? articles.slice(start, end) : [];
    };

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center bg-background text-foreground">{t('common.loading')}</div>;
    }

    return (
        <div className="min-h-screen bg-background">
            <HeroSection
                mainArticle={heroArticle}
                sideArticles={sideArticles}
            />

            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-col lg:flex-row gap-8">
                    <div className="flex-1 min-w-0 space-y-8">
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

                    <div className="w-full lg:w-[300px] shrink-0">
                        <HomeSidebar
                            trendingArticles={trendingArticles || []}
                            mostReadArticles={mostReadArticles || []}
                        />
                    </div>
                </div>
            </div>
            <NewsletterSection />
        </div>
    );
}

export default HomePage;
