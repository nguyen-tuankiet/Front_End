import { useState } from "react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";
import { CategorySidebar } from "./CategorySidebar";
import { Button } from "@/components/ui/button";
import { Mail, TrendingUp, Tag, Clock } from "lucide-react";

/**
 * Sidebar tổng hợp cho trang Category
 * Bao gồm: Bài mới nhất, Tags phổ biến, Newsletter, Thống kê
 */
export function CategoryPageSidebar({
    articles = [],
    categoryName = "",
    subCategories = [],
    onArticleClick,
    className
}) {
    const { t } = useLanguage();
    const [email, setEmail] = useState("");
    const [subscribed, setSubscribed] = useState(false);

    // Lấy tags phổ biến từ subcategories hoặc tạo mặc định
    const popularTags = subCategories.length > 0 
        ? subCategories.slice(0, 8).map(sub => sub.name)
        : ["Pháp luật", "Dân sinh", "Lao động", "Quốc phòng", "Chống tin giả"];

    const handleSubscribe = (e) => {
        e.preventDefault();
        if (email.trim()) {
            setSubscribed(true);
            setEmail("");
            setTimeout(() => setSubscribed(false), 3000);
        }
    };

    return (
        <div className={cn("space-y-6", className)}>
            {/* Section 1: Bài mới nhất */}
            <CategorySidebar
                articles={articles}
                title={t('category.latestSidebar')}
                onArticleClick={onArticleClick}
                limit={5}
            />

            {/* Section 2: Tags phổ biến */}
            <div className="bg-card rounded-xl shadow-sm p-5">
                <h2 className="text-base font-bold text-foreground mb-4 pb-3 border-b-2 border-border flex items-center gap-2">
                    <Tag className="w-4 h-4 text-primary" />
                    {t('category.popularTags') || "Chủ đề phổ biến"}
                </h2>
                <div className="flex flex-wrap gap-2">
                    {popularTags.map((tag, index) => (
                        <span
                            key={index}
                            className="px-3 py-1.5 text-xs font-medium bg-muted hover:bg-primary hover:text-white rounded-full cursor-pointer transition-colors"
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            </div>

            {/* Section 3: Thống kê Category */}
            <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl p-5 border border-primary/20">
                <h2 className="text-base font-bold text-foreground mb-4 flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-primary" />
                    {categoryName || t('category.statistics') || "Thống kê"}
                </h2>
                <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-card rounded-lg">
                        <div className="text-2xl font-bold text-primary">{articles.length}</div>
                        <div className="text-xs text-muted-foreground mt-1">
                            {t('category.totalArticles') || "Bài viết"}
                        </div>
                    </div>
                    <div className="text-center p-3 bg-card rounded-lg">
                        <div className="text-2xl font-bold text-primary">{subCategories.length}</div>
                        <div className="text-xs text-muted-foreground mt-1">
                            {t('category.subCategories') || "Chuyên mục con"}
                        </div>
                    </div>
                </div>
                <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
                    <Clock className="w-3 h-3" />
                    <span>{t('category.updatedRecently') || "Cập nhật liên tục"}</span>
                </div>
            </div>

            {/* Section 4: Newsletter đăng ký */}
            <div className="bg-primary rounded-xl p-5 text-white">
                <div className="flex items-center gap-2 mb-3">
                    <Mail className="w-5 h-5" />
                    <h2 className="text-base font-bold">
                        {t('newsletter.title') || "Đăng ký nhận tin"}
                    </h2>
                </div>
                <p className="text-sm text-white/80 mb-4">
                    {t('newsletter.subtitle') || "Nhận tin tức mới nhất qua email"}
                </p>
                <form onSubmit={handleSubscribe} className="space-y-3">
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder={t('newsletter.placeholder') || "Email của bạn"}
                        className="w-full px-4 py-2.5 rounded-lg text-sm text-foreground bg-white border-0 focus:ring-2 focus:ring-white/50 outline-none"
                        required
                    />
                    <Button
                        type="submit"
                        variant="outline"
                        className="w-full bg-white text-primary hover:bg-white/90 border-0"
                    >
                        {subscribed 
                            ? (t('newsletter.subscribed') || "Đã đăng ký!") 
                            : (t('newsletter.subscribe') || "Đăng ký")}
                    </Button>
                </form>
            </div>

            {/* Section 5: Quảng cáo Alphagen - HTML5 Banner */}
            <div className="bg-card rounded-xl overflow-hidden shadow-sm">
                <iframe 
                    src="https://cdnstoremedia.com/adt/banners/nam2015/4043/min_html5/2025-11-03/huyenntt/300x600alpha11/300x600alpha11/300x600alpha11.html?url=%2F%2Flg1.logging.admicro.vn%2Fadn%3Fdmn%3Dhttps%253A%252F%252Fthanhnien.vn%252F%26rid%3D0118gjpvnla700g%26sspb%3D7350%26sspr%3D7350%26lsn%3D1768128946081%26ce%3D1%26lc%3D5%26cr%3D%26ui%3D%26dg%3D6a9716013b04dba4d4d4dd83ab38dcb9%26uuid%3D%26profileID%3D%26bi%3D0%26cmpg%3D98719%26items%3D447977%26zid%3D522701%26pr%3D44857131313%26cid%3D-1%26tp%3D11%26tpn%3D4%26alg%3D1102%26dg%3D6a9716013b04dba4d4d4dd83ab38dcb9%26pgl%3D1%26xtr%3DeyJhc2lkIjoxNDU3OSwicHJvZmlsZWlkIjoiIn0%253D%26sspz%3D2028505%26adc_cpa%3D1%26cov%3D1%26re%3Dhttps%253A%252F%252Fconcung.com%252F1423-thuong-hieu-alphagen.html%253Futm_source%253DAdmicro_AdX%2526utm_campaign%253DAdX%2526utm_content%253Dthanhnien.vn&temp=0&loc=5&weath=&autoplay=0"
                    title="Quảng cáo Alphagen"
                    className="w-full border-0 block"
                    style={{ height: '600px', maxWidth: '100%' }}
                    scrolling="no"
                    allowFullScreen
                />
            </div>

            {/* Section 6: Quảng cáo TTC City Millennia - HTML5 Banner */}
            <div className="bg-card rounded-xl overflow-hidden shadow-sm">
                <iframe 
                    src="https://cdnstoremedia.com/adt/banners/nam2015/4043/min_html5/2025-12-01/manhnguyentien/300x250-2/300x250/300x250.html?url=%2F%2Flg1.logging.admicro.vn%2Fadn%3Fdmn%3Dhttps%253A%252F%252Fthanhnien.vn%252F%26rid%3D0118gjpvnla7000%26sspb%3D3750%26sspr%3D3750%26lsn%3D1768128946081%26ce%3D1%26lc%3D5%26cr%3D%26ui%3D%26dg%3D6a9716013b04dba4d4d4dd83ab38dcb9%26uuid%3D%26profileID%3D%26bi%3D0%26cmpg%3D99557%26items%3D452739%26zid%3D520745%26pr%3D45335942403%26cid%3D-1%26tp%3D11%26tpn%3D4%26alg%3D1102%26dg%3D6a9716013b04dba4d4d4dd83ab38dcb9%26pgl%3D1%26xtr%3DeyJhc2lkIjoxMzc2NSwicHJvZmlsZWlkIjoiIn0%253D%26sspz%3D2027971%26adc_cpa%3D1%26cov%3D1%26re%3Dhttps%253A%252F%252Fttcitymillennia.net.vn%252F%253Futm_source%253DADXdispay%2526utm_medium%253Dcpc%2526utm_campaign%253DTTCityMillennia&temp=0&loc=5&weath=&autoplay=0"
                    title="Quảng cáo TTC City Millennia"
                    className="w-full border-0 block"
                    style={{ height: '280px', maxWidth: '100%' }}
                    scrolling="no"
                    allowFullScreen
                />
            </div>
        </div>
    );
}

export default CategoryPageSidebar;
