import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLanguage } from "@/contexts/LanguageContext";
import {
    ArrowRight,
    Building2,
    Calendar,
    ChevronDown,
    Clapperboard,
    DollarSign,
    Eye,
    FileText,
    Gamepad2,
    Globe,
    ListChecks,
    Mail,
    MapPin,
    Megaphone,
    Newspaper,
    Percent,
    Phone,
    ShieldCheck,
} from "lucide-react";

function Stat({ label, value }) {
    return (
        <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
            <div className="text-2xl font-extrabold text-foreground">{value}</div>
            <div className="mt-1 text-sm text-muted-foreground">{label}</div>
        </div>
    );
}

function FaqItem({ q, a }) {
    return (
        <details className="group rounded-2xl border border-border bg-card p-5 shadow-sm">
            <summary className="cursor-pointer list-none font-semibold text-foreground">
                <div className="flex items-center justify-between gap-4">
                    <span>{q}</span>
                    <ChevronDown className="h-5 w-5 shrink-0 text-muted-foreground transition-transform group-open:rotate-180" />
                </div>
            </summary>
            <div className="mt-3 text-sm leading-relaxed text-muted-foreground">{a}</div>
        </details>
    );
}

const PRICING_URL_MAP = {
    // Báo Online
    pr: "pr-online-4",
    display: "qc-hien-thi-5",
    online: "truc-tuyen-6",
    video: "video-7",
    social: "mang-xa-hoi-8",
    tech: "cong-nghe-game-9",
    fashion: "thoi-trang-tre-10",
    promo: "uu-dai-28",
    surcharge: "phi-phu-thu-11",
    "video-prod": "san-xuat-video-27",
    classifieds: "rao-vat-nha-dat-25",
    criteria: "tieu-chi-pr-30",
    
    // Báo in
    "bao-xuan": "bao-xuan-2026-17",
    "bao-ngay": "bao-ngay-toan-quoc-12",
    "rao-vat": "rao-vat-toan-quoc-13",
    "trang-dia-phuong": "trang-dia-phuong-14",
    "phi-bai-viet": "phi-bai-viet-15",
};


export function AdvertisingPage() {
    const { t } = useLanguage();
    const [form, setForm] = useState({ name: "", company: "", phone: "", email: "", message: "" });

    const scrollToContact = () => {
        const el = document.getElementById("lien-he");
        el?.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    const handleCategoryClick = (key) => {
        const urlSlug = PRICING_URL_MAP[key];
        if (urlSlug) {
            window.open(`https://banggia.thanhnien.vn/bao-dien-tu/${urlSlug}.html`, '_blank');
        }
    };

    const categoryGrids = useMemo(
        () => [
            { key: "pr", label: t("advertisingPage.prOnline"), icon: FileText },
            { key: "display", label: t("advertisingPage.displayAds"), icon: Eye },
            { key: "online", label: t("advertisingPage.online"), icon: Globe },
            { key: "video", label: t("advertisingPage.video"), icon: Clapperboard },
            { key: "social", label: t("advertisingPage.socialMedia"), icon: Megaphone },
            { key: "tech", label: t("advertisingPage.techGame"), icon: Gamepad2 },
            { key: "fashion", label: t("advertisingPage.youngFashion"), icon: Building2 },
            { key: "promo", label: t("advertisingPage.offers"), icon: Percent },
            { key: "surcharge", label: t("advertisingPage.surcharge"), icon: DollarSign },
            { key: "video-prod", label: t("advertisingPage.videoProduction"), icon: Clapperboard },
            { key: "classifieds", label: t("advertisingPage.classifiedsRealEstate"), icon: Building2 },
            { key: "criteria", label: t("advertisingPage.prCriteria"), icon: ListChecks },
        ],
        [t]
    );

    const printNewspaperGrids = useMemo(
        () => [
            { key: "bao-xuan", label: t("advertisingPage.springNewspaper"), icon: Calendar },
            { key: "bao-ngay", label: t("advertisingPage.dailyNational"), icon: Newspaper },
            { key: "rao-vat", label: t("advertisingPage.classifiedsNational"), icon: Megaphone },
            { key: "trang-dia-phuong", label: t("advertisingPage.localPages"), icon: MapPin },
            { key: "phi-bai-viet", label: t("advertisingPage.articleFee"), icon: DollarSign },
        ],
        [t]
    );

    const onSubmit = (e) => {
        e.preventDefault();
        alert(t("advertisingPage.requestSent"));
        setForm({ name: "", company: "", phone: "", email: "", message: "" });
    };

    return (
        <div className="min-h-screen bg-background">
            {/* Hero */}
            <section className="relative overflow-hidden">
                <div className="absolute inset-0 opacity-30" style={{ background: "var(--news-gradient)" }} />
                <div className="relative max-w-7xl mx-auto px-4 py-12 lg:py-16">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                        <div className="lg:col-span-7">
                            <h1 className="mt-4 text-3xl md:text-5xl font-extrabold tracking-tight text-foreground">
                                {t("advertisingPage.title")}{" "}
                                <span className="text-primary">TIN</span>
                                <span className="text-secondary"> TỨC</span>
                            </h1>
                            <p className="mt-4 text-base md:text-lg text-muted-foreground max-w-2xl">
                                {t("advertisingPage.subtitle")}
                            </p>
                            <div className="mt-6 flex flex-col sm:flex-row gap-3">
                                <Button onClick={scrollToContact} className="shadow-sm">
                                    {t("advertisingPage.getQuote")} <ArrowRight className="h-4 w-4" />
                                </Button>
                                <Link to="/trang-chu">
                                    <Button variant="outline" className="w-full sm:w-auto">
                                        {t("advertisingPage.backToHome")}
                                    </Button>
                                </Link>
                            </div>
                        </div>
                        <div className="lg:col-span-5">
                            <div className="grid grid-cols-2 gap-4">
                                <Stat label={t("advertisingPage.pageViewsYear")} value="1,3 Tỷ+" />
                                <Stat label={t("advertisingPage.successfulCampaigns")} value="1 Tr+" />
                                <Stat label={t("advertisingPage.adCategories")} value="18+" />
                                <Stat label={t("advertisingPage.yearsExperience")} value="10+ năm" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="max-w-7xl mx-auto px-4 pb-12 pt-12">
                <div className="flex items-end justify-between gap-4 flex-wrap">
                    <div>
                        <h2 className="text-2xl md:text-3xl font-extrabold text-foreground">{t("advertisingPage.onlineNews")}</h2>
                        <p className="mt-2 text-muted-foreground">
                            {t("advertisingPage.selectCategory")}
                        </p>
                    </div>
                    <a
                        href="#lien-he"
                        className="text-sm font-semibold text-primary hover:underline underline-offset-4"
                    >
                        {t("advertisingPage.contactConsult")}
                    </a>
                </div>

                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {categoryGrids.map((item) => {
                        const Icon = item.icon;
                        return (
                            <button
                                key={item.key}
                                type="button"
                                onClick={() => handleCategoryClick(item.key)}
                                className={cn(
                                    "group w-full rounded-xl bg-muted/40 p-6 text-left shadow-sm transition-all",
                                    "hover:bg-muted/60 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                                )}
                            >
                                <div className="flex items-start gap-5">
                                    <div className="shrink-0">
                                        <div className="grid h-14 w-14 place-items-center rounded-full bg-primary">
                                            <Icon className="h-7 w-7 text-primary-foreground" />
                                        </div>
                                    </div>

                                    <div className="min-w-0 flex-1">
                                        <div className="text-sm font-bold tracking-wide text-foreground uppercase">
                                            {item.label}
                                        </div>
                                        <div className="mt-3 h-0.5 w-24 bg-primary" />
                                        <div className="mt-3 text-sm text-muted-foreground">
                                            {t("advertisingPage.viewDetails")}
                                        </div>
                                    </div>
                                </div>
                            </button>
                        );
                    })}
                </div>
            </section>

            <section className="max-w-7xl mx-auto px-4 pb-12">
                <div className="flex items-end justify-between gap-4 flex-wrap">
                    <div>
                        <h2 className="text-2xl md:text-3xl font-extrabold text-foreground">{t("advertisingPage.printNews")}</h2>
                        <p className="mt-2 text-muted-foreground">
                            {t("advertisingPage.selectCategory")}

                        </p>
                    </div>
                    <a
                        href="#lien-he"
                        className="text-sm font-semibold text-secondary hover:underline underline-offset-4"
                    >
                        {t("advertisingPage.contactConsult")}
                    </a>
                </div>

                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {printNewspaperGrids.map((item) => {
                        const Icon = item.icon;
                        return (
                            <button
                                key={item.key}
                                type="button"
                                onClick={() => handleCategoryClick(item.key)}
                                className={cn(
                                    "group w-full rounded-xl bg-muted/40 p-6 text-left shadow-sm transition-all",
                                    "hover:bg-muted/60 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                                )}
                            >
                                <div className="flex items-start gap-5">
                                    <div className="shrink-0">
                                        <div className="grid h-14 w-14 place-items-center rounded-full bg-secondary">
                                            <Icon className="h-7 w-7 text-secondary-foreground" />
                                        </div>
                                    </div>

                                    <div className="min-w-0 flex-1">
                                        <div className="text-sm font-bold tracking-wide text-foreground uppercase">
                                            {item.label}
                                        </div>
                                        <div className="mt-3 h-0.5 w-24 bg-secondary" />
                                        <div className="mt-3 text-sm text-muted-foreground">
                                            {t("advertisingPage.viewDetails")}
                                        </div>
                                    </div>
                                </div>
                            </button>
                        );
                    })}
                </div>
            </section>

            {/* Contact */}
            <section id="lien-he" className="max-w-7xl mx-auto px-4 pb-14 scroll-mt-24">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    <div className="lg:col-span-5">
                        <h2 className="text-2xl md:text-3xl font-extrabold text-foreground">{t("advertisingPage.contactQuote")}</h2>
                        <p className="mt-2 text-muted-foreground">
                            {t("advertisingPage.contactQuoteDesc")}
                        </p>

                        <div className="mt-6 space-y-3">
                            <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
                                <div className="flex items-center gap-3">
                                    <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary">
                                        <Phone className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <div className="text-sm font-semibold text-foreground">{t("advertisingPage.hotline")}</div>
                                        <div className="text-sm text-muted-foreground">098 765 4321</div>
                                    </div>
                                </div>
                            </div>
                            <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
                                <div className="flex items-center gap-3">
                                    <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary">
                                        <Mail className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <div className="text-sm font-semibold text-foreground">{t("advertisingPage.email")}</div>
                                        <div className="text-sm text-muted-foreground">quangcao@tintuc.vn</div>
                                    </div>
                                </div>
                            </div>
                            <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
                                <div className="flex items-center gap-3">
                                    <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary">
                                        <ShieldCheck className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <div className="text-sm font-semibold text-foreground">{t("advertisingPage.commitment")}</div>
                                        <div className="text-sm text-muted-foreground">
                                            {t("advertisingPage.commitmentDesc")}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-7">
                        <form onSubmit={onSubmit} className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                            <div className="text-xl font-extrabold text-primary mb-5">
                                {t("advertisingPage.getConsultQuote")}
                            </div>

                            <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="text-sm font-semibold text-foreground">{t("advertisingPage.yourName")}</label>
                                    <Input
                                        value={form.name}
                                        onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                                        placeholder="Nguyễn Văn A"
                                        className="mt-2"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="text-sm font-semibold text-foreground">{t("advertisingPage.company")}</label>
                                    <Input
                                        value={form.company}
                                        onChange={(e) => setForm((f) => ({ ...f, company: e.target.value }))}
                                        placeholder={t("advertisingPage.companyPlaceholder")}
                                        className="mt-2"
                                    />
                                </div>
                                <div>
                                    <label className="text-sm font-semibold text-foreground">{t("advertisingPage.phoneNumber")}</label>
                                    <Input
                                        value={form.phone}
                                        onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                                        placeholder="090xxxxxxx"
                                        className="mt-2"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="text-sm font-semibold text-foreground">{t("advertisingPage.email")}</label>
                                    <Input
                                        type="email"
                                        value={form.email}
                                        onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                                        placeholder="name@company.com"
                                        className="mt-2"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="mt-4">
                                <label className="text-sm font-semibold text-foreground">{t("advertisingPage.needs")}</label>
                                <textarea
                                    value={form.message}
                                    onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                                    rows={5}
                                    placeholder={t("advertisingPage.needsPlaceholder")}
                                    className={cn(
                                        "mt-2 flex w-full rounded-md border border-input bg-background px-3 py-2",
                                        "text-base ring-offset-background placeholder:text-muted-foreground",
                                        "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
                                        "disabled:cursor-not-allowed disabled:opacity-50 md:text-sm resize-none"
                                    )}
                                    required
                                />
                            </div>

                            <div className="mt-5 sm:flex-row sm:items-center sm:justify-between">
                                <Button type="submit">
                                    {t("advertisingPage.sendRequest")} <ArrowRight className="h-4 w-4" />
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="max-w-7xl mx-auto px-4 pb-16">
                <h2 className="text-2xl md:text-3xl font-extrabold text-foreground">{t("advertisingPage.faq")}</h2>
                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FaqItem
                        q={t("advertisingPage.faqPricing")}
                        a={t("advertisingPage.faqPricingAnswer")}
                    />
                    <FaqItem
                        q={t("advertisingPage.faqDesign")}
                        a={t("advertisingPage.faqDesignAnswer")}
                    />
                    <FaqItem
                        q={t("advertisingPage.faqReport")}
                        a={t("advertisingPage.faqReportAnswer")}
                    />
                    <FaqItem
                        q={t("advertisingPage.faqTime")}
                        a={t("advertisingPage.faqTimeAnswer")}
                    />
                </div>
            </section>
        </div>
    );
}

export default AdvertisingPage;

