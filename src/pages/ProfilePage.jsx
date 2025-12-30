import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User, Lock, MessageSquare, Bookmark, Eye, LogOut, Camera, Check, Facebook, Mail as MailIcon, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useAuth } from "@/components/Context/AuthContext";

const menuItems = [
    { id: "account", label: "Thông tin tài khoản", icon: User },
    { id: "password", label: "Đổi mật khẩu", icon: Lock },
    { id: "comments", label: "Hoạt động bình luận", icon: MessageSquare },
    { id: "saved", label: "Tin đã lưu", icon: Bookmark },
    { id: "viewed", label: "Tin đã xem", icon: Eye },
];

export function ProfilePage() {
    const navigate = useNavigate();
    const { user, logout } = useAuth();
    const [activeTab, setActiveTab] = useState("account");
    const [provinces, setProvinces] = useState([]);
    const [formData, setFormData] = useState({
        displayName: user?.name || "Đỗ Phạm",
        gender: "other",
        day: "",
        month: "",
        year: "",
        email: user?.email || "123@gmail.com",
        phone: "",
        address: "",
    });

    useEffect(() => {
        const fetchProvinces = async () => {
            try {
                const response = await fetch('https://provinces.open-api.vn/api/v1/?depth=1');
                const data = await response.json();
                const provinceNames = data
                    .map(province => province.name)
                    .sort((a, b) => a.localeCompare(b, 'vi'));
                setProvinces(provinceNames);
            } catch (error) {
                console.error('Error fetching provinces:', error);
            }
        };
        fetchProvinces();
    }, []);

    const handleSave = () => {
        // Handle save logic
        alert("Đã lưu thay đổi");
    };

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    const handleImageChange = () => {
        // Handle image upload
        alert("Chức năng đang phát triển");
    };

    const renderContent = () => {
        switch (activeTab) {
            case "account":
                return (
                    <div className="space-y-8">
                        {/* Thông tin tài khoản */}
                        <div>
                            <h2 className="text-2xl font-extrabold text-foreground mb-6">Thông tin tài khoản</h2>
                            <div className="space-y-5">
                                <div>
                                    <label className="text-sm font-semibold text-foreground block mb-2">
                                        Tên hiển thị
                                    </label>
                                    <div className="relative">
                                        <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                        <Input
                                            value={formData.displayName}
                                            onChange={(e) => setFormData({ ...formData, displayName: e.target.value })}
                                            className="pl-10"
                                            placeholder="Nhập tên hiển thị"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="text-sm font-semibold text-foreground block mb-2">
                                        Giới tính
                                    </label>
                                    <div className="flex gap-4">
                                        {["Nam", "Nữ", "Khác"].map((gender) => (
                                            <label key={gender} className="flex items-center gap-2 cursor-pointer">
                                                <input
                                                    type="radio"
                                                    name="gender"
                                                    value={gender.toLowerCase()}
                                                    checked={formData.gender === gender.toLowerCase()}
                                                    onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                                                    className="w-4 h-4 text-primary"
                                                />
                                                <span className="text-sm text-foreground">{gender}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <label className="text-sm font-semibold text-foreground block mb-2">
                                        Ngày sinh
                                    </label>
                                    <div className="flex gap-2">
                                        <select
                                            value={formData.day}
                                            onChange={(e) => setFormData({ ...formData, day: e.target.value })}
                                            className="flex-1 h-10 rounded-md border border-input bg-background px-3 text-sm"
                                        >
                                            <option value="">Ngày</option>
                                            {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
                                                <option key={day} value={day}>
                                                    {day}
                                                </option>
                                            ))}
                                        </select>
                                        <select
                                            value={formData.month}
                                            onChange={(e) => setFormData({ ...formData, month: e.target.value })}
                                            className="flex-1 h-10 rounded-md border border-input bg-background px-3 text-sm"
                                        >
                                            <option value="">Tháng</option>
                                            {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
                                                <option key={month} value={month}>
                                                    {month}
                                                </option>
                                            ))}
                                        </select>
                                        <select
                                            value={formData.year}
                                            onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                                            className="flex-1 h-10 rounded-md border border-input bg-background px-3 text-sm"
                                        >
                                            <option value="">Năm</option>
                                            {Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i).map((year) => (
                                                <option key={year} value={year}>
                                                    {year}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <div>
                                    <label className="text-sm font-semibold text-foreground block mb-2">Email</label>
                                    <div className="relative">
                                        <MailIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                        <Input
                                            value={formData.email}
                                            disabled
                                            className="pl-10 bg-muted"
                                        />
                                    </div>
                                    <p className="text-xs text-muted-foreground mt-1">Email không thể thay đổi</p>
                                </div>

                                <div>
                                    <label className="text-sm font-semibold text-foreground block mb-2">
                                        Điện thoại
                                    </label>
                                    <Input
                                        value={formData.phone}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        placeholder="Nhập số điện thoại"
                                    />
                                </div>

                                <div>
                                    <label className="text-sm font-semibold text-foreground block mb-2">
                                        Địa chỉ
                                    </label>
                                    <select
                                        value={formData.address}
                                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                        className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm"
                                    >
                                        <option value="">Chọn địa chỉ</option>
                                        {provinces.map((province, idx) => (
                                            <option key={idx} value={province}>
                                                {province}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Liên kết tài khoản xã hội */}
                        <div>
                            <h2 className="text-2xl font-extrabold text-foreground mb-6">Liên kết tài khoản xã hội</h2>
                            <div className="space-y-4">
                                {[
                                    { key: "facebook", label: "Tài khoản Facebook", icon: Facebook },
                                    { key: "google", label: "Tài khoản Google", icon: Globe },
                                ].map((social) => (
                                    <div
                                        key={social.key}
                                        className="flex items-center justify-between p-4 rounded-lg border border-border bg-card"
                                    >
                                        <div className="flex items-center gap-3">
                                            <social.icon className="h-5 w-5 text-primary" />
                                            <span className="text-sm font-medium text-foreground">{social.label}</span>
                                        </div>
                                        <button className="text-sm text-primary hover:text-primary/80 hover:underline font-medium">
                                            Liên kết
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Xóa tài khoản */}
                        <div className="flex items-center justify-between">
                            <h2 className="text-2xl font-extrabold text-foreground">Xóa tài khoản</h2>
                            <Button
                                onClick={() => {
                                    if (window.confirm("Bạn có chắc chắn muốn xóa tài khoản? Tất cả dữ liệu sẽ bị xóa vĩnh viễn và không thể khôi phục.")) {
                                        alert("Tài khoản đã được xóa");
                                        logout();
                                        navigate("/");
                                    }
                                }}
                                className="bg-red-500 hover:bg-red-600 text-white"
                            >
                                Xóa
                            </Button>
                        </div>

                        <div className="flex justify-end">
                            <Button onClick={handleSave} size="lg">
                                <Check className="h-4 w-4 mr-2" />
                                Lưu thay đổi
                            </Button>
                        </div>
                    </div>
                );

            case "password":
                return (
                    <div>
                        <h2 className="text-2xl font-extrabold text-foreground mb-6">Đổi mật khẩu</h2>
                        <div className="space-y-5 max-w-md">
                            <div>
                                <label className="text-sm font-semibold text-foreground block mb-2">
                                    Mật khẩu hiện tại
                                </label>
                                <Input type="password" placeholder="Nhập mật khẩu hiện tại" />
                            </div>
                            <div>
                                <label className="text-sm font-semibold text-foreground block mb-2">
                                    Mật khẩu mới
                                </label>
                                <Input type="password" placeholder="Nhập mật khẩu mới" />
                            </div>
                            <div>
                                <label className="text-sm font-semibold text-foreground block mb-2">
                                    Xác nhận mật khẩu mới
                                </label>
                                <Input type="password" placeholder="Xác nhận mật khẩu mới" />
                            </div>
                            <Button onClick={handleSave} size="lg">
                                <Check className="h-4 w-4 mr-2" />
                                Đổi mật khẩu
                            </Button>
                        </div>
                    </div>
                );

            case "comments":
                return (
                    <div>
                        <h2 className="text-2xl font-extrabold text-foreground mb-6">Hoạt động bình luận</h2>
                        <p className="text-muted-foreground">Chức năng đang phát triển</p>
                    </div>
                );

            case "saved":
                return (
                    <div>
                        <h2 className="text-2xl font-extrabold text-foreground mb-6">Tin đã lưu</h2>
                        <p className="text-muted-foreground">Chức năng đang phát triển</p>
                    </div>
                );

            case "viewed":
                return (
                    <div>
                        <h2 className="text-2xl font-extrabold text-foreground mb-6">Tin đã xem</h2>
                        <p className="text-muted-foreground">Chức năng đang phát triển</p>
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen bg-background">
            {/* Hero Section */}
            <section className="relative overflow-hidden border-b border-border">
                <div className="absolute inset-0 opacity-30" style={{ background: "var(--news-gradient)" }} />
                <div className="relative max-w-7xl mx-auto px-4 py-12 lg:py-16">
                    <div className="text-center">
                        <h1 className="mt-4 text-3xl md:text-5xl font-extrabold tracking-tight text-foreground">
                            Hồ sơ{" "}
                            <span className="text-primary">cá nhân</span>
                        </h1>
                    </div>
                </div>
            </section>

            <div className="max-w-7xl mx-auto px-4 py-8 lg:py-12">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Sidebar */}
                    <aside className="lg:col-span-3">
                        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm sticky top-24">
                            {/* Avatar */}
                            <div className="flex flex-col items-center mb-6">
                                <div className="relative mb-4">
                                    <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center border-4 border-primary/20">
                                        <span className="text-3xl font-bold text-primary">
                                            {user?.name?.charAt(0).toUpperCase() || "A"}
                                        </span>
                                    </div>
                                    <button
                                        onClick={handleImageChange}
                                        className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:bg-primary/90 transition-colors"
                                    >
                                        <Camera className="h-4 w-4" />
                                    </button>
                                </div>
                                <p className="text-lg font-semibold text-foreground text-center">
                                    {user?.name || "Người dùng"}
                                </p>
                            </div>

                            {/* Menu */}
                            <nav className="space-y-2">
                                {menuItems.map((item) => {
                                    const Icon = item.icon;
                                    const isActive = activeTab === item.id;
                                    return (
                                        <button
                                            key={item.id}
                                            onClick={() => setActiveTab(item.id)}
                                            className={cn(
                                                "w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors",
                                                isActive
                                                    ? "bg-primary text-primary-foreground"
                                                    : "text-foreground hover:bg-muted"
                                            )}
                                        >
                                            <Icon className="h-5 w-5" />
                                            <span className="text-sm font-medium">{item.label}</span>
                                        </button>
                                    );
                                })}
                                <button
                                    onClick={handleLogout}
                                    className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left text-foreground hover:bg-red-50 dark:hover:bg-red-950/20 hover:text-red-500 transition-colors"
                                >
                                    <LogOut className="h-5 w-5" />
                                    <span className="text-sm font-medium">Đăng xuất</span>
                                </button>
                            </nav>
                        </div>
                    </aside>

                    {/* Main Content */}
                    <main className="lg:col-span-9">
                        <div className="rounded-2xl border border-border bg-card p-6 md:p-8 shadow-sm">
                            {renderContent()}
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
}

export default ProfilePage;
