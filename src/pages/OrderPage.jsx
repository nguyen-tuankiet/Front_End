import { useState, useMemo, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Newspaper, Calendar, Building2, Home, Banknote, Smartphone} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const PROMOTION_TABLE = [
    { period: "months3", price: 5500, quantity: 92, discount: 5, total: 480700 },
    { period: "months6", price: 5500, quantity: 180, discount: 10, total: 891000 },
    { period: "months12", price: 5500, quantity: 345, discount: 15, total: 1612875 },
];

const getPaymentMethods = (t) => [
    {
        id: "office",
        label: t("orderPage.atOffice"),
        icon: Building2,
        note: "268-270 Nguyễn Đình Chiểu, Phường Võ Thị Sáu, Quận 3, TP. Hồ Chí Minh\nĐiện thoại: 028.39309243 - 0903035758"
    },
    {
        id: "home",
        label: t("orderPage.atHome"),
        icon: Home,
        note: "Thanh toán tại nhà: Vui lòng gọi hotline 0903035758. email : phathanh@thanhnien.vn"
    },
    {
        id: "bank",
        label: t("orderPage.bankTransfer"),
        icon: Banknote,
        note: "Tên đơn vị: Báo Thanh niên\nSố tài khoản: 115000005982\nTại: Ngân hàng TMCP Công thương Việt Nam (Vietinbank) Chi nhánh 3, TP.HCM\n(Khi chuyển khoản vui lòng ghi chú : Địa chỉ đặt báo, số điện thoại)"
    },
    {
        id: "momo",
        label: t("orderPage.momoWallet"),
        icon: Smartphone,
        note: "Thanh toán bằng hình thức quét mã từ ứng dụng ví Momo"
    },
];

const calculateDaysBetween = (startDate, endDate) => {
    if (!startDate || !endDate) return 0;
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffDays = Math.ceil(Math.abs(end - start) / (1000 * 60 * 60 * 24));
    return diffDays + 1;
};

// Hàm tính khuyến mãi
const calculateDiscount = (numberOfIssues, quantityPerIssue) => {
    const totalQuantity = numberOfIssues * quantityPerIssue;
    if (totalQuantity >= 345) return 15; // 12 tháng (345 số lượng)
    if (totalQuantity >= 180) return 10; // 6 tháng (180 số lượng)
    if (totalQuantity >= 92) return 5;   // 3 tháng (92 số lượng)
    return 0;
};

export function OrderPage() {
    const { t } = useLanguage();
    // Format date
    const today = new Date().toISOString().split('T')[0];
    const tomorrow = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0];

    const PAYMENT_METHODS = getPaymentMethods(t);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        province: "",
        address: "",
        paymentMethod: "office",
        hasInvoice: false,
        companyName: "",
        taxCode: "",
    });

    const [startDate, setStartDate] = useState(today);
    const [endDate, setEndDate] = useState(tomorrow);
    const [quantityPerIssue, setQuantityPerIssue] = useState(1);
    const [provinces, setProvinces] = useState([]);
    const [loadingProvinces, setLoadingProvinces] = useState(true);
    const [dateError, setDateError] = useState("");

    // Lấy năm từ date string
    const getYear = (dateString) => {
        if (!dateString) return null;
        return new Date(dateString).getFullYear();
    };

    const handleStartDateChange = (e) => {
        const newStartDate = e.target.value;
        
        // Kiểm tra không cho chọn ngày đã qua
        if (newStartDate < today) {
            setDateError(t("orderPage.cannotSelectPastDate"));
            return;
        }

        setStartDate(newStartDate);
        setDateError("");
    };

    // Handler cho endDate
    const handleEndDateChange = (e) => {
        const newEndDate = e.target.value;
        const startYear = getYear(startDate);
        const endYear = getYear(newEndDate);

        // Kiểm tra cùng năm
        if (startDate && startYear !== endYear) {
            setDateError(t("orderPage.datesInSameYear"));
            return;
        }

        // Kiểm tra endDate không được trước startDate
        if (startDate && newEndDate < startDate) {
            setDateError(t("orderPage.endDateAfterStart"));
            return;
        }

        setEndDate(newEndDate);
        setDateError("");
    };

    const startYear = getYear(startDate) || new Date().getFullYear();
    const maxDate = `${startYear}-12-31`;

    useEffect(() => {
        const fetchProvinces = async () => {
            const response = await fetch('https://provinces.open-api.vn/api/v1/?depth=1');
            const data = await response.json();
            // Sắp xếp theo tên
            const provinceNames = data
                .map(province => province.name)
                .sort((a, b) => a.localeCompare(b, 'vi'));
            setProvinces(provinceNames);
            setLoadingProvinces(false);
        };
        fetchProvinces();
    }, []);

    // Tính giá dựa trên ngày và số lượng
    const calculation = useMemo(() => {
        const UNIT_PRICE = 5500;
        const numberOfIssues = calculateDaysBetween(startDate, endDate);
        const totalQuantity = numberOfIssues * quantityPerIssue;
        const discountPercent = calculateDiscount(numberOfIssues, quantityPerIssue);
        
        // Giá trước khuyến mãi
        const subtotalBeforeDiscount = UNIT_PRICE * totalQuantity;
        
        // Tính khuyến mãi
        const discountAmount = Math.floor(subtotalBeforeDiscount * discountPercent / 100);
        
        // Giá sau khuyến mãi
        const dailyTotal = subtotalBeforeDiscount - discountAmount;

        return {
            numberOfIssues,
            unitPrice: UNIT_PRICE,
            quantityPerIssue,
            totalQuantity,
            subtotalBeforeDiscount,
            discountPercent,
            discountAmount,
            dailyTotal,
            finalTotal: dailyTotal,
        };
    }, [startDate, endDate, quantityPerIssue]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!startDate || !endDate || calculation.numberOfIssues === 0) {
            alert(t("orderPage.pleaseSelectTime"));
            return;
        }
        // Kiểm tra không cho chọn ngày đã qua
        if (startDate < today || endDate < today) {
            alert(t("orderPage.cannotSelectPastDate"));
            return;
        }
        // Kiểm tra điều kiện ngày
        const startYear = getYear(startDate);
        const endYear = getYear(endDate);
        if (startYear !== endYear) {
            alert(t("orderPage.datesInSameYear"));
            return;
        }
        if (endDate < startDate) {
            alert(t("orderPage.endDateAfterStart"));
            return;
        }
        if (!formData.name || !formData.phone || !formData.province) {
            alert(t("orderPage.pleaseEnterRequired"));
            return;
        }
        alert(t("orderPage.orderSuccess"));
        console.log({ formData, startDate, endDate, quantityPerIssue, calculation });
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('vi-VN').format(amount) + " đ";
    };

    return (
        <div className="min-h-screen bg-background">
            {/* Hero Section */}
            <section className="relative overflow-hidden border-b border-border">
                <div className="absolute inset-0 opacity-30" style={{ background: "var(--news-gradient)" }} />
                <div className="relative max-w-7xl mx-auto px-4 py-12 lg:py-16">
                    <div className="text-center">
                        <h1 className="mt-4 text-3xl md:text-5xl font-extrabold tracking-tight text-foreground">
                            {t("orderPage.title")}{" "}
                            <span className="text-primary">TIN</span>
                            <span className="text-secondary"> TỨC</span>
                        </h1>
                        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                            {t("orderPage.heroSubtitle")}
                        </p>
                    </div>
                </div>
            </section>

            <div className="max-w-7xl mx-auto px-4 py-8 lg:py-12">
                <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Form */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Nhật báo Thanh Niên */}
                        <section className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="grid h-12 w-12 place-items-center rounded-xl bg-primary/10 text-primary">
                                    <Newspaper className="h-6 w-6" />
                                </div>
                                <div>
                                    <h2 className="text-xl font-extrabold text-foreground">{t("orderPage.dailyNews")}</h2>
                                    <p className="text-sm text-muted-foreground">{t("orderPage.selectTime")}</p>
                                </div>
                            </div>

                            {/* Chọn ngày */}
                            <div className="mb-6 flex items-center gap-4 flex-wrap">
                                <div className="flex-1 min-w-[200px]">
                                    <label className="text-sm font-semibold text-foreground mb-2 block">{t("orderPage.time")}</label>
                                    <div className="flex items-center gap-3">
                                        <div className="relative flex-1">
                                            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                            <Input
                                                type="date"
                                                value={startDate}
                                                onChange={handleStartDateChange}
                                                min={today}
                                                max={maxDate}
                                                className="pl-10"
                                                required
                                            />
                                        </div>
                                        <span className="text-sm text-muted-foreground">{t("orderPage.to")}</span>
                                        <div className="relative flex-1">
                                            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                            <Input
                                                type="date"
                                                value={endDate}
                                                onChange={handleEndDateChange}
                                                min={startDate || today}
                                                max={maxDate}
                                                className="pl-10"
                                                required
                                            />
                                        </div>
                                    </div>
                                    {dateError && (
                                        <p className="mt-2 text-sm text-red-500">{dateError}</p>
                                    )}
                                </div>
                            </div>

                            {/* Bảng giá */}
                            <div className="overflow-x-auto mb-6">
                                <table className="w-full border-collapse">
                                    <thead>
                                        <tr className="bg-primary/10 border-b-2 border-primary">
                                            <th className="text-left py-3 px-4 text-sm font-semibold text-foreground">{t("orderPage.newspaperType")}</th>
                                            <th className="text-right py-3 px-4 text-sm font-semibold text-foreground">{t("orderPage.price")}</th>
                                            <th className="text-right py-3 px-4 text-sm font-semibold text-foreground">{t("orderPage.issues")}</th>
                                            <th className="text-right py-3 px-4 text-sm font-semibold text-foreground">{t("orderPage.quantityPerIssue")}</th>
                                            <th className="text-right py-3 px-4 text-sm font-semibold text-foreground">{t("orderPage.promotion")}</th>
                                            <th className="text-right py-3 px-4 text-sm font-semibold text-foreground">{t("orderPage.subtotal")}</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className="border-b border-border">
                                            <td className="py-3 px-4 text-sm text-foreground">{t("orderPage.dailyNews")}</td>
                                            <td className="py-3 px-4 text-sm text-foreground text-right">{formatCurrency(calculation.unitPrice)}</td>
                                            <td className="py-3 px-4 text-sm text-foreground text-right">{calculation.numberOfIssues}</td>
                                            <td className="py-3 px-4 text-sm text-foreground text-right">
                                                <Input
                                                    type="number"
                                                    min="1"
                                                    value={quantityPerIssue}
                                                    onChange={(e) => setQuantityPerIssue(Math.max(1, parseInt(e.target.value) || 1))}
                                                    className="w-20 text-center inline-block"
                                                />
                                            </td>
                                            <td className="py-3 px-4 text-sm text-right">
                                                {calculation.discountPercent > 0 ? (
                                                    <span className="font-semibold text-primary">{calculation.discountPercent}%</span>
                                                ) : (
                                                    <span className="text-muted-foreground">0%</span>
                                                )}
                                            </td>
                                            <td className="py-3 px-4 text-sm text-foreground text-right font-semibold">
                                                {formatCurrency(calculation.dailyTotal)}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            {/* Bảng khuyến mãi */}
                            <div className="mt-6">
                                <h3 className="text-sm font-semibold text-foreground mb-3">{t("orderPage.promotionInfo")}</h3>
                                <div className="overflow-x-auto">
                                    <table className="w-full border-collapse text-sm">
                                        <thead>
                                            <tr className="bg-muted border-b border-border">
                                                <th className="text-left py-2 px-3 font-semibold text-foreground">{t("orderPage.period")}</th>
                                                <th className="text-right py-2 px-3 font-semibold text-foreground">{t("orderPage.price")}</th>
                                                <th className="text-right py-2 px-3 font-semibold text-foreground">{t("orderPage.quantity")}</th>
                                                <th className="text-right py-2 px-3 font-semibold text-foreground">{t("orderPage.promotion")}</th>
                                                <th className="text-right py-2 px-3 font-semibold text-foreground">{t("orderPage.total")}</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {PROMOTION_TABLE.map((item, idx) => (
                                                <tr key={idx} className="border-b border-border hover:bg-muted/30 transition-colors">
                                                    <td className="py-2 px-3 text-foreground">{t(`orderPage.${item.period}`)}</td>
                                                    <td className="py-2 px-3 text-foreground text-right">{formatCurrency(item.price)}</td>
                                                    <td className="py-2 px-3 text-foreground text-right">{item.quantity}</td>
                                                    <td className="py-2 px-3 text-primary text-right font-semibold">{item.discount}%</td>
                                                    <td className="py-2 px-3 text-foreground text-right">{formatCurrency(item.total)}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </section>

                        {/* Thông tin khách hàng */}
                        <section className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                            <h2 className="text-xl font-extrabold text-foreground mb-6">{t("orderPage.customerInfo")}</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="md:col-span-2">
                                    <label className="text-sm font-semibold text-foreground">
                                        {t("orderPage.fullName")} <span className="text-primary">*</span>
                                    </label>
                                    <Input
                                        value={formData.name}
                                        onChange={(e) => setFormData(f => ({ ...f, name: e.target.value }))}
                                        placeholder="Nguyễn Văn A"
                                        className="mt-2"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="text-sm font-semibold text-foreground">{t("orderPage.email")}</label>
                                    <Input
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => setFormData(f => ({ ...f, email: e.target.value }))}
                                        placeholder="email@example.com"
                                        className="mt-2"
                                    />
                                </div>
                                <div>
                                    <label className="text-sm font-semibold text-foreground">
                                        {t("orderPage.phone")} <span className="text-primary">*</span>
                                    </label>
                                    <Input
                                        value={formData.phone}
                                        onChange={(e) => setFormData(f => ({ ...f, phone: e.target.value }))}
                                        placeholder="090xxxxxxx"
                                        className="mt-2"
                                        required
                                    />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="text-sm font-semibold text-foreground">
                                        {t("orderPage.selectProvince")} <span className="text-primary">*</span>
                                    </label>
                                    <select
                                        value={formData.province}
                                        onChange={(e) => setFormData(f => ({ ...f, province: e.target.value }))}
                                        className={cn(
                                            "mt-2 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm",
                                            "ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
                                            "disabled:cursor-not-allowed disabled:opacity-50"
                                        )}
                                        required
                                        disabled={loadingProvinces}
                                    >
                                        <option value="">{t("orderPage.selectProvinceOption")}</option>
                                        {provinces.map((province, idx) => (
                                            <option key={idx} value={province}>{province}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="md:col-span-2">
                                    <label className="text-sm font-semibold text-foreground">{t("orderPage.detailedAddress")}</label>
                                    <Input
                                        value={formData.address}
                                        onChange={(e) => setFormData(f => ({ ...f, address: e.target.value }))}
                                        placeholder={t("orderPage.addressPlaceholder")}
                                        className="mt-2"
                                    />
                                </div>
                            </div>
                        </section>

                        {/* Phương thức thanh toán */}
                        <section className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                            <h2 className="text-xl font-extrabold text-foreground mb-6">{t("orderPage.payment")}</h2>
                            <div className="space-y-4">
                                {PAYMENT_METHODS.map((method) => {
                                    const Icon = method.icon;
                                    return (
                                        <label
                                            key={method.id}
                                            className={cn(
                                                "flex items-start gap-4 p-4 rounded-lg border-2 cursor-pointer transition-all",
                                                formData.paymentMethod === method.id
                                                    ? "border-primary bg-primary/5"
                                                    : "border-border hover:border-primary/50 hover:bg-muted/30"
                                            )}
                                        >
                                            <input
                                                type="radio"
                                                name="paymentMethod"
                                                value={method.id}
                                                checked={formData.paymentMethod === method.id}
                                                onChange={(e) => setFormData(f => ({ ...f, paymentMethod: e.target.value }))}
                                                className="mt-1"
                                            />
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <Icon className="h-5 w-5 text-primary" />
                                                    <span className="font-semibold text-foreground">{method.label}</span>
                                                </div>
                                                <p className="text-xs text-muted-foreground whitespace-pre-line">{method.note}</p>
                                            </div>
                                        </label>
                                    );
                                })}
                            </div>
                        </section>

                        {/* Thông tin đơn đặt */}
                        <section className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                            <h2 className="text-xl font-extrabold text-foreground mb-6">{t("orderPage.invoiceInfo")}</h2>
                            <div className="space-y-4">
                                <div className="flex items-center gap-4">
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="radio"
                                            name="invoice"
                                            checked={!formData.hasInvoice}
                                            onChange={() => setFormData(f => ({ ...f, hasInvoice: false }))}
                                        />
                                        <span className="text-sm font-medium text-foreground">{t("orderPage.noInvoice")}</span>
                                    </label>
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="radio"
                                            name="invoice"
                                            checked={formData.hasInvoice}
                                            onChange={() => setFormData(f => ({ ...f, hasInvoice: true }))}
                                        />
                                        <span className="text-sm font-medium text-foreground">{t("orderPage.hasInvoice")}</span>
                                    </label>
                                </div>
                                {formData.hasInvoice && (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-border">
                                        <div>
                                            <label className="text-sm font-semibold text-foreground">
                                                {t("orderPage.companyName")} <span className="text-primary">*</span>
                                            </label>
                                            <Input
                                                value={formData.companyName}
                                                onChange={(e) => setFormData(f => ({ ...f, companyName: e.target.value }))}
                                                placeholder={t("orderPage.companyPlaceholder")}
                                                className="mt-2"
                                                required={formData.hasInvoice}
                                            />
                                        </div>
                                        <div>
                                            <label className="text-sm font-semibold text-foreground">
                                                Mã số thuế <span className="text-primary">*</span>
                                            </label>
                                            <Input
                                                value={formData.taxCode}
                                                onChange={(e) => setFormData(f => ({ ...f, taxCode: e.target.value }))}
                                                placeholder={t("orderPage.taxCode")}
                                                className="mt-2"
                                                required={formData.hasInvoice}
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>
                        </section>
                    </div>

                    {/* Hóa đơn tổng */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-8">
                            <section className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                                <h2 className="text-xl font-extrabold text-foreground mb-6">{t("orderPage.summary")}</h2>
                                <div className="space-y-4">
                                    {calculation.dailyTotal > 0 && (
                                        <div className="flex items-center justify-between py-2 border-b border-border">
                                            <span className="text-sm text-muted-foreground">{t("orderPage.dailyNews")}</span>
                                            <span className="text-sm font-semibold text-foreground">{formatCurrency(calculation.dailyTotal)}</span>
                                        </div>
                                    )}
                                    <div className="flex items-center justify-between py-4 border-t-2 border-border">
                                        <span className="text-base font-extrabold text-foreground">{t("orderPage.totalPayment")}</span>
                                        <span className="text-lg font-extrabold text-primary">{formatCurrency(calculation.finalTotal)}</span>
                                    </div>
                                </div>

                                <Button
                                    type="submit"
                                    className="w-full mt-6"
                                    size="lg"
                                    disabled={calculation.finalTotal === 0}
                                >
                                    {t("orderPage.orderNewspaper")}
                                </Button>

                                <p className="mt-4 text-xs text-muted-foreground text-center">
                                    {t("orderPage.hotlineNote")}{" "}
                                    <a href="tel:0903035758" className="text-primary hover:underline">
                                        0903 035 758
                                    </a>
                                </p>
                            </section>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default OrderPage;