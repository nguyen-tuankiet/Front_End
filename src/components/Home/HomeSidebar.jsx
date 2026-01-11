import { useState } from "react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";
import { TrendingSidebar } from "@/components/ui/TrendingSidebar";
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";

/**
 * Sidebar tổng hợp cho trang Home
 * Bao gồm: Tin nổi bật, Đọc nhiều, Newsletter, Quảng cáo
 */
export function HomeSidebar({
    trendingArticles = [],
    mostReadArticles = [],
    className
}) {
    const { t } = useLanguage();
    const [email, setEmail] = useState("");
    const [subscribed, setSubscribed] = useState(false);

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
            {/* Section 1: Tin nổi bật */}
            <TrendingSidebar
                title={t('home.featuredNews')}
                articles={trendingArticles}
            />

            {/* Section 2: Quảng cáo Alphagen */}
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

            {/* Section 3: Đọc nhiều */}
            <TrendingSidebar
                title={t('home.mostRead')}
                articles={mostReadArticles}
            />

            
            {/* Section 5: Quảng cáo TTC City Millennia */}
            <div className="bg-card rounded-xl overflow-hidden shadow-sm">
                <iframe 
                    src="https://cdnstoremedia.com/adt/banners/nam2015/4043/min_html5/2025-12-01/manhnguyentien/300x250-2/300x250/300x250.html?url=%2F%2Flg1.logging.admicro.vn%2Fadn%3Fdmn%3Dhttps%253A%252F%252Fthanhnien.vn%252F%26rid%3D0118gjpvnla7000%26sspb%3D3750%26sspr%3D3750%26lsn%3D1768128946081%26ce%3D1%26lc%3D5%26cr%3D%26ui%3D%26dg%3D6a9716013b04dba4d4d4dd83ab38dcb9%26uuid%3D%26profileID%3D%26bi%3D0%26cmpg%3D99557%26items%3D452739%26zid%3D520745%26pr%3D45335942403%26cid%3D-1%26tp%3D11%26tpn%3D4%26alg%3D1102%26dg%3D6a9716013b04dba4d4d4dd83ab38dcb9%26pgl%3D1%26xtr%3DeyJhc2lkIjoxMzc2NSwicHJvZmlsZWlkIjoiIn0%253D%26sspz%3D2027971%26adc_cpa%3D1%26cov%3D1%26re%3Dhttps%253A%252F%252Fttcitymillennia.net.vn%252F%253Futm_source%253DADXdispay%2526utm_medium%253Dcpc%2526utm_campaign%253DTTCityMillennia&temp=0&loc=5&weath=&autoplay=0"
                    title="Quảng cáo TTC City Millennia"
                    className="w-full border-0 block"
                    style={{ height: '250px', maxWidth: '100%' }}
                    scrolling="no"
                    allowFullScreen
                />
            </div>

            <div className="bg-card rounded-xl overflow-hidden shadow-sm">
                <iframe 
                    src="https://cdnstoremedia.com/adt/banners/nam2015/4043/min_html5/2025-12-17/thuongphamthuy/300x600_t12-44-1/300x600_t12-44/300x600_t12-44.html?url=%2F%2Flg1.logging.admicro.vn%2Fadn%3Fdmn%3Dhttps%253A%252F%252Fthanhnien.vn%252Fvu-nhap-tich-lau-malaysia-canh-sat-tam-giu-8-nguoi-sep-lon-fam-bi-trieu-tap-185260110225243996.htm%26rid%3D0118gjtoqcd0g04%26sspb%3D12800%26sspr%3D12800%26lsn%3D1768129938459%26ce%3D1%26lc%3D5%26cr%3D1768128946%26ui%3D8748017233224489503%26dg%3D6a9716013b04dba4d4d4dd83ab38dcb9%26uuid%3D%26profileID%3D%26bi%3D0%26cmpg%3D99068%26items%3D449977%26zid%3D520962%26pr%3D45086454914%26cid%3D-1%26tp%3D11%26tpn%3D4%26alg%3D1102%26dg%3D6a9716013b04dba4d4d4dd83ab38dcb9%26xtr%3DeyJhc2lkIjoxNDE3MiwicHJvZmlsZWlkIjoiIn0%253D%26sspz%3D2028113%26adc_cpa%3D1%26cov%3D1%26re%3Dhttps%253A%252F%252Fdiamondboulevard.com.vn%252F%253Futm_source%253DAdmicro_AdX%2526utm_campaign%253DAdX%2526utm_content%253Dthanhnien.vn&temp=0&loc=5&weath=&autoplay=0&admid=adnzone_520962_0_449977&vast=https%3A%2F%2Fbrandingdatavast.cdnstoremedia.com%2Finfo%3Fu%3Dthanhnien.vn%252Fvu-nhap-tich-lau-malaysia-canh-sat-tam-giu-8-nguoi-sep-lon-fam-bi-trieu-tap-185260110225243996.htm%26z%3D520962%26p%3D1%26w%3D650%26h%3D300%26%26lsn%3D1768129938459%26dgid%3D6a9716013b04dba4d4d4dd83ab38dcb9%26l%3D5%26loc%3D5%26i%3D8748017233224489503%26isdetail%3D1%26pid%3D%26tags%3D5%26bannerid%3D449977%26encodebid%3D45086454914%26typead%3D%26id%3D0118gjtoqcd0g04%26ua%3DMozilla%252F5.0%2520(Windows%2520NT%252010.0%253B%2520Win64%253B%2520x64)%2520AppleWebKit%252F537.36%2520(KHTML%252C%2520like%2520Gecko)%2520Chrome%252F143.0.0.0%2520Safari%252F537.36"
                    title="Quảng cáo TTC City Millennia"
                    className="w-full border-0 block"
                    style={{ height: '600px', maxWidth: '100%' }}
                    scrolling="no"
                    allowFullScreen
                />
            </div>


             <div className="bg-card rounded-xl overflow-hidden shadow-sm">
                <iframe 
                    src="https://static-cmsads.admicro.vn/cmsads/2026/01/BDSV-1767927475062.x-zip-compre/index.html"
                    title="Quảng cáo TTC City Millennia"
                    className="w-full border-0 block"
                    style={{ height: '250px', maxWidth: '100%' }}
                    scrolling="no"
                    allowFullScreen
                />
            </div>
             <div className="bg-card rounded-xl overflow-hidden shadow-sm">
                <iframe 
                    src="https://cdnstoremedia.com/adt/banners/nam2015/4043/min_html5/2025-12-19/thuongphamthuy/300x600_t12-49/300x600_t12-49/300x600_t12-49.html?url=%2F%2Flg1.logging.admicro.vn%2Fadn%3Fdmn%3Dhttps%253A%252F%252Fthanhnien.vn%252Fkinh-te.htm%26rid%3D0118gk2dbiq6g0a%26sspb%3D21000%26sspr%3D22050%26lsn%3D1768131154910%26ce%3D1%26lc%3D5%26cr%3D1768128946%26ui%3D8748017233224489503%26uuid%3D%26profileID%3D%26bi%3D0%26cmpg%3D98175%26items%3D445040%26zid%3D520754%26pr%3D44581995046%26cid%3D-1%26tp%3D11%26tpn%3D4%26alg%3D1102%26dg%3D6a9716013b04dba4d4d4dd83ab38dcb9%26xtr%3DeyJhc2lkIjoxNDA0MCwicHJvZmlsZWlkIjoiIn0%253D%26sspz%3D2027979%26adc_cpa%3D1%26cov%3D1%26re%3Dhttps%253A%252F%252Fmasterisehomes.com%252Fthe-global-city%252Fsola%253Futm_source%253Dbatdongsan%2526utm_medium%253Dclick%2526utm_campaign%253DCP_0000527_SOLA_launch_TGC-SOLA--Nov25_adm_batdongsan_click_adx-display_3-cities_-_HENRY%252B%2526master_campaign%253D371761823599&temp=0&loc=5&weath=&autoplay=0&admid=adnzone_520754_0_445040&vast=https%3A%2F%2Fbrandingdatavast.cdnstoremedia.com%2Finfo%3Fu%3Dthanhnien.vn%252Fkinh-te.htm%26z%3D520754%26p%3D1%26w%3D650%26h%3D300%26%26lsn%3D1768131154910%26dgid%3D6a9716013b04dba4d4d4dd83ab38dcb9%26l%3D5%26loc%3D5%26i%3D8748017233224489503%26isdetail%3D0%26pid%3D%26tags%3D5%26bannerid%3D445040%26encodebid%3D44581995046%26typead%3D%26id%3D0118gk2dbiq6g0a%26ua%3DMozilla%252F5.0%2520(Windows%2520NT%252010.0%253B%2520Win64%253B%2520x64)%2520AppleWebKit%252F537.36%2520(KHTML%252C%2520like%2520Gecko)%2520Chrome%252F143.0.0.0%2520Safari%252F537.36"
                    title="Quảng cáo TTC City Millennia"
                    className="w-full border-0 block"
                    style={{ height: '600px', maxWidth: '100%' }}
                    scrolling="no"
                    allowFullScreen
                />
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

        </div>
    );
}

export default HomeSidebar;
