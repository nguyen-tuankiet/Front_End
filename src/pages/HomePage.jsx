import { HeroSection } from "@/components/Home/HeroSection";
import { CategorySection } from "@/components/Home/CategorySection";
import { NewsletterSection } from "@/components/ui/NewsletterSection";
import { mockArticles, getTrendingArticles } from "@/data/mockArticles";

export function HomePage() {
    // Get articles for different sections
    const heroArticle = mockArticles[0];
    const sideArticles = mockArticles.slice(1, 5);
    const trendingArticles = getTrendingArticles(5);

    // Category sections data
    const dulichArticles = mockArticles.filter(a => a.categorySlug === "du-lich" || a.category === "Du lịch");
    const congnheArticles = mockArticles.filter(a => a.categorySlug === "cong-nghe" || a.category === "Công nghệ");
    const thethaoArticles = mockArticles.filter(a => a.categorySlug === "the-thao" || a.category === "Thể thao");
    const kinhteArticles = mockArticles.filter(a => a.categorySlug === "kinh-te" || a.category === "Kinh tế");
    const giaitriArticles = mockArticles.filter(a => a.categorySlug === "giai-tri" || a.category === "Giải trí");

    // Fallback: if no articles in category, use general articles
    const getArticlesOrFallback = (categoryArticles, fallbackStart, fallbackEnd) => {
        return categoryArticles.length > 0 ? categoryArticles : mockArticles.slice(fallbackStart, fallbackEnd);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <HeroSection
                mainArticle={heroArticle}
                sideArticles={sideArticles}
                trendingArticles={trendingArticles}
            />

            {/* Du lịch Section */}
            <CategorySection
                title="Du lịch"
                href="/danh-muc/du-lich"
                featuredArticle={getArticlesOrFallback(dulichArticles, 3, 4)[0] || mockArticles[3]}
                articles={getArticlesOrFallback(dulichArticles, 4, 8)}
                trendingArticles={getTrendingArticles(5)}
                sidebarTitle="Tin nổi bật"
            />

            {/* Công nghệ Section */}
            <div className="bg-white border-y border-gray-100">
                <CategorySection
                    title="Công nghệ"
                    href="/danh-muc/cong-nghe"
                    featuredArticle={getArticlesOrFallback(congnheArticles, 4, 5)[0] || mockArticles[4]}
                    articles={getArticlesOrFallback(congnheArticles, 5, 9)}
                    trendingArticles={getTrendingArticles(5)}
                    sidebarTitle="Được quan tâm"
                    className="bg-white"
                />
            </div>

            {/* Thể thao Section (Dark variant) */}
            <div className="bg-gray-800">
                <CategorySection
                    title="Thể thao"
                    href="/danh-muc/the-thao"
                    featuredArticle={getArticlesOrFallback(thethaoArticles, 0, 1)[0] || mockArticles[0]}
                    articles={getArticlesOrFallback(thethaoArticles, 6, 10)}
                    variant="white"
                />
            </div>

            {/* Kinh tế Section */}
            <CategorySection
                title="Kinh tế"
                href="/danh-muc/kinh-te"
                featuredArticle={getArticlesOrFallback(kinhteArticles, 2, 3)[0] || mockArticles[2]}
                articles={getArticlesOrFallback(kinhteArticles, 7, 11)}
                trendingArticles={getTrendingArticles(5)}
                sidebarTitle="Xem nhiều"
                className="bg-white"
            />

            {/* Giải trí Section */}
            <CategorySection
                title="Giải trí"
                href="/danh-muc/giai-tri"
                featuredArticle={getArticlesOrFallback(giaitriArticles, 5, 6)[0] || mockArticles[5]}
                articles={getArticlesOrFallback(giaitriArticles, 8, 12)}
                trendingArticles={getTrendingArticles(5)}
                sidebarTitle="Đọc nhiều"
            />

            {/* Newsletter Section */}
            <NewsletterSection />
        </div>
    );
}

export default HomePage;
