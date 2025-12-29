import { MapPin, Phone, Mail, Globe } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const contactOffices = [
    {
        title: "TP. Hồ Chí Minh",
        type: "Tòa soạn - Trị sự - Quảng cáo - Phát hành",
        address: "268 - 270 Nguyễn Đình Chiểu, phường Xuân Hòa, thành phố Hồ Chí Minh",
        phone: "(028) 39302302",
        fax: "(028) 39309939",
        email: "toasoan@thanhnien.vn",
        website: "",
        departments: [
            {
                name: "Quảng cáo",
                phone: "(028) 39339988 - 0908.780.404",
                email: "quangcao@thanhnien.vn",
            },
            {
                name: "Phát hành",
                phone: "(028) 39309243 – 0903.035.758",
                email: "phathanh@thanhnien.vn",
            },
        ],
    },
    {
        title: "Hà Nội",
        type: "Văn phòng đại diện",
        address: "218 Tây Sơn, phường Đống Đa, thành phố Hà Nội",
        phone: "(024) 38570897 - 38570981",
        fax: "(024) 38570948",
        email: "tshanoi@thanhnien.vn",
    },
    {
        title: "Thanh Hóa",
        type: "Văn phòng liên lạc",
        address: "Số 1 Nhà Thờ, phường Hạc Thành, tỉnh Thanh Hóa",
        phone: "(0237) 3855748",
        fax: "(0237) 3855748",
        email: "vpthanhhoa@thanhnien.vn",
    },
    {
        title: "Đà Nẵng",
        type: "Văn phòng đại diện khu vực duyên hải miền Trung",
        address: "144 Bạch Đằng, phường Hải Châu, thành phố Đà Nẵng",
        phone: "(0236) 3824231 - 3810332",
        fax: "(0236) 3871345",
        email: "vpdanang@thanhnien.vn",
    },
    {
        title: "Gia Lai",
        type: "Văn phòng đại diện khu vực Trung Trung Bộ và Bắc Tây Nguyên",
        address: "133 Lê Lợi, phường Quy Nhơn, tỉnh Gia Lai",
        phone: "(0256) 3824142",
        fax: "(0256) 3815559",
        email: "vpbinhdinh@thanhnien.vn",
    },
    {
        title: "Khánh Hòa",
        type: "Văn phòng đại diện khu vực Nam Trung Bộ và Nam Tây Nguyên",
        address: "120 Thống Nhất, phường Nha Trang, tỉnh Khánh Hòa",
        phone: "(0258) 3819306 - 3819307",
        fax: "(0258) 3819307",
        email: "vpnhatrang@thanhnien.vn",
    },
    {
        title: "Đồng Nai",
        type: "Văn phòng đại diện khu vực Đông Nam Bộ",
        address: "Số 15A Võ Thị Sáu, phường Trấn Biên, tỉnh Đồng Nai",
        phone: "(0251) 3940818 - 3940819",
        fax: "(0251) 3940817",
        email: "vpdongnambo@thanhnien.vn",
    },
    {
        title: "Cần Thơ",
        type: "Văn phòng đại diện khu vực Tây Nam Bộ",
        address: "99 Trần Văn Hoài, phường Ninh Kiều, thành phố Cần Thơ",
        phone: "(0292) 3825244",
        fax: "(0292) 3825245",
        email: "vpcantho@thanhnien.vn",
    },
];

const subscriptionPackages = [
    {
        period: "Quý 1",
        issues: "81 số báo",
        price: 423225,
        discount: 5,
        originalPrice: 445500,
    },
    {
        period: "Quý 1 & 2",
        issues: "172 số báo",
        price: 851400,
        discount: 10,
        originalPrice: 946000,
    },
    {
        period: "1 năm",
        issues: "356 số báo",
        price: 1566400,
        discount: 20,
        originalPrice: 1958000,
    },
];

function formatCurrency(amount) {
    return new Intl.NumberFormat('vi-VN').format(amount) + " đ";
}

export function ContactPage() {
    return (
        <div className="min-h-screen bg-background">
            {/* Hero Section */}
            <section className="relative overflow-hidden border-b border-border">
                <div className="absolute inset-0 opacity-30" style={{ background: "var(--news-gradient)" }} />
                <div className="relative max-w-7xl mx-auto px-4 py-12 lg:py-16">
                    <div className="text-center">
                        <h1 className="mt-4 text-3xl md:text-5xl font-extrabold tracking-tight text-foreground">
                            Liên hệ{" "}
                            <span className="text-primary">TIN</span>
                            <span className="text-secondary"> TỨC</span>
                        </h1>
                        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                            Thông tin liên hệ tòa soạn, quảng cáo, phát hành và các văn phòng đại diện
                        </p>
                    </div>
                </div>
            </section>

            <section className="max-w-7xl mx-auto px-4 py-8">
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link to="/dat-bao">
                        <Button size="lg" className="w-full sm:w-auto">
                            Đặt báo
                        </Button>
                    </Link>
                    <Link to="/quang-cao">
                        <Button size="lg" className="w-full sm:w-auto">
                            Quảng cáo
                        </Button>
                    </Link>
                </div>
            </section>

            <div className="max-w-7xl mx-auto px-4 py-8 lg:py-12">
                {/* Đặt báo */}
                <section className="mb-12">
                    <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                        <div className="text-center mb-6">
                            <h2 className="text-2xl font-extrabold text-foreground">Nhật báo Thanh Niên</h2>
                            <p className="text-sm text-muted-foreground mt-1">5.500đ/số</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {subscriptionPackages.map((pkg, idx) => (
                                <div
                                    key={idx}
                                    className="rounded-xl border border-border bg-muted/40 p-4 hover:bg-muted/60 transition-colors"
                                >
                                    <div className="text-sm font-semibold text-foreground mb-2">{pkg.period}</div>
                                    <div className="text-xs text-muted-foreground mb-3">{pkg.issues}</div>
                                    <div className="flex items-baseline gap-2">
                                        <span className="text-lg font-extrabold text-primary">
                                            {formatCurrency(pkg.price)}
                                        </span>
                                        <span className="text-xs text-muted-foreground line-through">
                                            {formatCurrency(pkg.originalPrice)}
                                        </span>
                                        <span className="text-xs font-semibold text-primary">(-{pkg.discount}%)</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Văn phòng */}
                <section>
                    <h2 className="text-2xl md:text-3xl font-extrabold text-foreground mb-6">
                        Tòa soạn và các văn phòng đại diện
                    </h2>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {contactOffices.map((office, idx) => (
                            <div
                                key={idx}
                                className="rounded-2xl border border-border bg-card p-6 shadow-sm hover:shadow-md transition-shadow"
                            >
                                <div className="mb-4">
                                    <h3 className="text-xl font-extrabold text-foreground">{office.title}</h3>
                                    {office.type && (
                                        <p className="text-sm text-muted-foreground mt-1">{office.type}</p>
                                    )}
                                </div>

                                <div className="space-y-3">
                                    {office.address && (
                                        <div className="flex items-start gap-3">
                                            <MapPin className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                                            <span className="text-sm text-foreground">{office.address}</span>
                                        </div>
                                    )}

                                    {office.phone && (
                                        <div className="flex items-center gap-3">
                                            <Phone className="h-5 w-5 text-primary shrink-0" />
                                            <a
                                                href={`tel:${office.phone.replace(/[() -]/g, '')}`}
                                                className="text-sm text-foreground hover:text-primary transition-colors"
                                            >
                                                {office.phone}
                                            </a>
                                        </div>
                                    )}

                                    {office.fax && (
                                        <div className="flex items-center gap-3">
                                            <Phone className="h-5 w-5 text-muted-foreground shrink-0" />
                                            <span className="text-sm text-muted-foreground">Fax: {office.fax}</span>
                                        </div>
                                    )}

                                    {office.email && (
                                        <div className="flex items-center gap-3">
                                            <Mail className="h-5 w-5 text-primary shrink-0" />
                                            <a
                                                href={`mailto:${office.email}`}
                                                className="text-sm text-foreground hover:text-primary transition-colors break-all"
                                            >
                                                {office.email}
                                            </a>
                                        </div>
                                    )}

                                    {office.website && (
                                        <div className="flex items-center gap-3">
                                            <Globe className="h-5 w-5 text-primary shrink-0" />
                                            <a
                                                href={office.website}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-sm text-primary hover:underline break-all"
                                            >
                                                {office.website}
                                            </a>
                                        </div>
                                    )}

                                    {office.departments && (
                                        <div className="pt-3 mt-3 border-t border-border space-y-2">
                                            {office.departments.map((dept, deptIdx) => (
                                                <div key={deptIdx} className="pl-8">
                                                    <div className="text-sm font-semibold text-foreground mb-1">
                                                        {dept.name}:
                                                    </div>
                                                    {dept.phone && (
                                                        <div className="flex items-center gap-2 text-sm text-foreground mb-1">
                                                            <Phone className="h-4 w-4 text-primary shrink-0" />
                                                            <a
                                                                href={`tel:${dept.phone.replace(/[() -]/g, '')}`}
                                                                className="hover:text-primary transition-colors"
                                                            >
                                                                {dept.phone}
                                                            </a>
                                                        </div>
                                                    )}
                                                    {dept.email && (
                                                        <div className="flex items-center gap-2 text-sm text-foreground">
                                                            <Mail className="h-4 w-4 text-primary shrink-0" />
                                                            <a
                                                                href={`mailto:${dept.email}`}
                                                                className="hover:text-primary transition-colors break-all"
                                                            >
                                                                {dept.email}
                                                            </a>
                                                        </div>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
}

export default ContactPage;
