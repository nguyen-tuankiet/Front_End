import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
            { key: "pr", label: "PR Online", icon: FileText },
            { key: "display", label: "Quảng cáo hiển thị", icon: Eye },
            { key: "online", label: "Trực tuyến", icon: Globe },
            { key: "video", label: "Video", icon: Clapperboard },
            { key: "social", label: "Mạng xã hội", icon: Megaphone },
            { key: "tech", label: "Công nghệ - Game", icon: Gamepad2 },
            { key: "fashion", label: "Thời trang trẻ", icon: Building2 },
            { key: "promo", label: "Ưu đãi", icon: Percent },
            { key: "surcharge", label: "Phí phụ thu", icon: DollarSign },
            { key: "video-prod", label: "Sản xuất Video", icon: Clapperboard },
            { key: "classifieds", label: "Rao vặt - Nhà đất", icon: Building2 },
            { key: "criteria", label: "Tiêu chí PR", icon: ListChecks },
        ],
        []
    );

    const printNewspaperGrids = useMemo(
        () => [
            { key: "bao-xuan", label: "Báo xuân 2026", icon: Calendar },
            { key: "bao-ngay", label: "Báo ngày - toàn quốc", icon: Newspaper },
            { key: "rao-vat", label: "Rao vặt toàn quốc", icon: Megaphone },
            { key: "trang-dia-phuong", label: "Trang địa phương", icon: MapPin },
            { key: "phi-bai-viet", label: "Phí bài viết", icon: DollarSign },
        ],
        []
    );

    const onSubmit = (e) => {
        e.preventDefault();
        alert("Đã gửi yêu cầu");
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
                                Quảng cáo trên{" "}
                                <span className="text-primary">TIN</span>
                                <span className="text-secondary"> TỨC</span>
                            </h1>
                            <p className="mt-4 text-base md:text-lg text-muted-foreground max-w-2xl">
                                Trải nghiệm hiện đại, tiếp cận hàng triệu khách hàng tiềm năng với mức chi phi tối ưu.
                            </p>
                            <div className="mt-6 flex flex-col sm:flex-row gap-3">
                                <Button onClick={scrollToContact} className="shadow-sm">
                                    Nhận báo giá nhanh <ArrowRight className="h-4 w-4" />
                                </Button>
                                <Link to="/trang-chu">
                                    <Button variant="outline" className="w-full sm:w-auto">
                                        Về trang chủ
                                    </Button>
                                </Link>
                            </div>
                        </div>
                        <div className="lg:col-span-5">
                            <div className="grid grid-cols-2 gap-4">
                                <Stat label="Lượt xem trang / năm" value="1,3 Tỷ+" />
                                <Stat label="Chiến dịch thành công" value="1 Tr+" />
                                <Stat label="Hạng mục quảng cáo" value="18+" />
                                <Stat label="Kinh nghiệm vận hành" value="10+ năm" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="max-w-7xl mx-auto px-4 pb-12 pt-12">
                <div className="flex items-end justify-between gap-4 flex-wrap">
                    <div>
                        <h2 className="text-2xl md:text-3xl font-extrabold text-foreground">Báo online</h2>
                        <p className="mt-2 text-muted-foreground">
                            Chọn hạng mục phù hợp. Báo giá chi tiết sẽ tùy theo vị trí, chuyên mục và thời lượng.
                        </p>
                    </div>
                    <a
                        href="#lien-he"
                        className="text-sm font-semibold text-primary hover:underline underline-offset-4"
                    >
                        Liên hệ tư vấn →
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
                                            Xem chi tiết
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
                        <h2 className="text-2xl md:text-3xl font-extrabold text-foreground">Báo in</h2>
                        <p className="mt-2 text-muted-foreground">
                            Chọn hạng mục phù hợp. Báo giá chi tiết sẽ tùy theo vị trí, chuyên mục và thời lượng.

                        </p>
                    </div>
                    <a
                        href="#lien-he"
                        className="text-sm font-semibold text-secondary hover:underline underline-offset-4"
                    >
                        Liên hệ tư vấn →
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
                                            Xem chi tiết
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
                        <h2 className="text-2xl md:text-3xl font-extrabold text-foreground">Liên hệ nhận báo giá</h2>
                        <p className="mt-2 text-muted-foreground">
                            Gửi thông tin cơ bản, đội ngũ kinh doanh sẽ phản hồi kèm proposal phù hợp.
                        </p>

                        <div className="mt-6 space-y-3">
                            <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
                                <div className="flex items-center gap-3">
                                    <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary">
                                        <Phone className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <div className="text-sm font-semibold text-foreground">Hotline</div>
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
                                        <div className="text-sm font-semibold text-foreground">Email</div>
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
                                        <div className="text-sm font-semibold text-foreground">Cam kết</div>
                                        <div className="text-sm text-muted-foreground">
                                            Tư vấn nhanh • minh bạch • tối ưu hiệu quả theo mục tiêu.
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-7">
                        <form onSubmit={onSubmit} className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                            <div className="text-xl font-extrabold text-primary mb-5">
                                Nhận tư vấn & báo giá
                            </div>

                            <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="text-sm font-semibold text-foreground">Họ tên</label>
                                    <Input
                                        value={form.name}
                                        onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                                        placeholder="Nguyễn Văn A"
                                        className="mt-2"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="text-sm font-semibold text-foreground">Công ty</label>
                                    <Input
                                        value={form.company}
                                        onChange={(e) => setForm((f) => ({ ...f, company: e.target.value }))}
                                        placeholder="Tên doanh nghiệp"
                                        className="mt-2"
                                    />
                                </div>
                                <div>
                                    <label className="text-sm font-semibold text-foreground">Số điện thoại</label>
                                    <Input
                                        value={form.phone}
                                        onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                                        placeholder="090xxxxxxx"
                                        className="mt-2"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="text-sm font-semibold text-foreground">Email</label>
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
                                <label className="text-sm font-semibold text-foreground">Nhu cầu</label>
                                <textarea
                                    value={form.message}
                                    onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                                    rows={5}
                                    placeholder="Mục tiêu quảng cáo, ngân sách tham khảo, chuyên mục ưu tiên..."
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
                                    Gửi yêu cầu <ArrowRight className="h-4 w-4" />
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="max-w-7xl mx-auto px-4 pb-16">
                <h2 className="text-2xl md:text-3xl font-extrabold text-foreground">Câu hỏi thường gặp</h2>
                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FaqItem
                        q="Báo giá được tính theo tiêu chí nào?"
                        a="Thường phụ thuộc vị trí hiển thị, kích thước, chuyên mục, thời lượng, tần suất và mục tiêu chiến dịch. Với PR/Native sẽ thêm yêu cầu biên tập, phân phối và tracking."
                    />
                    <FaqItem
                        q="Có hỗ trợ thiết kế banner và biên tập nội dung không?"
                        a="Có. Bạn có thể gửi banner sẵn hoặc brief để đội ngũ hỗ trợ thiết kế/biên tập theo guideline."
                    />
                    <FaqItem
                        q="Có xuất báo cáo sau chiến dịch không?"
                        a="Có báo cáo cơ bản theo chiến dịch. Nếu cần tracking nâng cao (UTM/Pixel/GA4), có thể triển khai theo yêu cầu."
                    />
                    <FaqItem
                        q="Thời gian triển khai trung bình?"
                        a="Display có thể lên nhanh sau khi chốt booking & vật liệu. PR/Native và multimedia tùy theo khối lượng sản xuất, thường từ 2–7 ngày."
                    />
                </div>
            </section>
        </div>
    );
}

export default AdvertisingPage;

