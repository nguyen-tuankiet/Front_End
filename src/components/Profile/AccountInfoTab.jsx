import { User, Mail as MailIcon, Facebook, Globe, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

/**
 * Component tab thông tin tài khoản
 */
export function AccountInfoTab({ formData, setFormData, onSave, onDeleteAccount, provinces }) {
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
                    onClick={onDeleteAccount}
                    className="bg-red-500 hover:bg-red-600 text-white"
                >
                    Xóa
                </Button>
            </div>

            <div className="flex justify-end">
                <Button onClick={onSave} size="lg">
                    <Check className="h-4 w-4 mr-2" />
                    Lưu thay đổi
                </Button>
            </div>
        </div>
    );
}
