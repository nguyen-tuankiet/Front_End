import { User, Mail as MailIcon, Facebook, Globe, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLanguage } from "@/contexts/LanguageContext";

/**
 * Component tab thông tin tài khoản
 */
export function AccountInfoTab({ formData, setFormData, onSave, onDeleteAccount, provinces }) {
    const { t } = useLanguage();

    const genderOptions = [
        { value: "nam", label: t("profile.male") },
        { value: "nữ", label: t("profile.female") },
        { value: "khác", label: t("profile.other") },
    ];

    return (
        <div className="space-y-8">
            {/* Thông tin tài khoản */}
            <div>
                <h2 className="text-2xl font-extrabold text-foreground mb-6">{t("profile.accountInfo")}</h2>
                <div className="space-y-5">
                    <div>
                        <label className="text-sm font-semibold text-foreground block mb-2">
                            {t("profile.displayName")}
                        </label>
                        <div className="relative">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                            <Input
                                value={formData.displayName}
                                onChange={(e) => setFormData({ ...formData, displayName: e.target.value })}
                                className="pl-10"
                                placeholder={t("profile.displayNamePlaceholder")}
                            />
                        </div>
                    </div>

                    <div>
                        <label className="text-sm font-semibold text-foreground block mb-2">
                            {t("profile.gender")}
                        </label>
                        <div className="flex gap-4">
                            {genderOptions.map((gender) => (
                                <label key={gender.value} className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="radio"
                                        name="gender"
                                        value={gender.value}
                                        checked={formData.gender === gender.value}
                                        onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                                        className="w-4 h-4 text-primary"
                                    />
                                    <span className="text-sm text-foreground">{gender.label}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    <div>
                        <label className="text-sm font-semibold text-foreground block mb-2">
                            {t("profile.birthDate")}
                        </label>
                        <div className="flex gap-2">
                            <select
                                value={formData.day}
                                onChange={(e) => setFormData({ ...formData, day: e.target.value })}
                                className="flex-1 h-10 rounded-md border border-input bg-background px-3 text-sm"
                            >
                                <option value="">{t("profile.day")}</option>
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
                                <option value="">{t("profile.month")}</option>
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
                                <option value="">{t("profile.year")}</option>
                                {Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i).map((year) => (
                                    <option key={year} value={year}>
                                        {year}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="text-sm font-semibold text-foreground block mb-2">{t("profile.email")}</label>
                        <div className="relative">
                            <MailIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                            <Input
                                value={formData.email}
                                disabled
                                className="pl-10 bg-muted"
                            />
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">{t("profile.emailCannotChange")}</p>
                    </div>

                    <div>
                        <label className="text-sm font-semibold text-foreground block mb-2">
                            {t("profile.phone")}
                        </label>
                        <Input
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            placeholder={t("profile.phonePlaceholder")}
                        />
                    </div>

                    <div>
                        <label className="text-sm font-semibold text-foreground block mb-2">
                            {t("profile.address")}
                        </label>
                        <select
                            value={formData.address}
                            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                            className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm"
                        >
                            <option value="">{t("profile.selectAddress")}</option>
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
                <h2 className="text-2xl font-extrabold text-foreground mb-6">{t("profile.socialAccounts")}</h2>
                <div className="space-y-4">
                    {[
                        { key: "facebook", label: t("profile.facebookAccount"), icon: Facebook },
                        { key: "google", label: t("profile.googleAccount"), icon: Globe },
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
                                {t("profile.link")}
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Xóa tài khoản */}
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-extrabold text-foreground">{t("profile.deleteAccount")}</h2>
                <Button
                    onClick={onDeleteAccount}
                    className="bg-red-500 hover:bg-red-600 text-white"
                >
                    {t("profile.delete")}
                </Button>
            </div>

            <div className="flex justify-end">
                <Button onClick={onSave} size="lg">
                    <Check className="h-4 w-4 mr-2" />
                    {t("profile.saveChanges")}
                </Button>
            </div>
        </div>
    );
}
