import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLanguage } from "@/contexts/LanguageContext";

/**
 * Component tab đổi mật khẩu
 */
export function PasswordTab({ onSave }) {
    const { t } = useLanguage();

    return (
        <div>
            <h2 className="text-2xl font-extrabold text-foreground mb-6">{t("profile.changePassword")}</h2>
            <div className="space-y-5 max-w-md">
                <div>
                    <label className="text-sm font-semibold text-foreground block mb-2">
                        {t("profile.currentPassword")}
                    </label>
                    <Input type="password" placeholder={t("profile.currentPasswordPlaceholder")} />
                </div>
                <div>
                    <label className="text-sm font-semibold text-foreground block mb-2">
                        {t("profile.newPassword")}
                    </label>
                    <Input type="password" placeholder={t("profile.newPasswordPlaceholder")} />
                </div>
                <div>
                    <label className="text-sm font-semibold text-foreground block mb-2">
                        {t("profile.confirmNewPassword")}
                    </label>
                    <Input type="password" placeholder={t("profile.confirmNewPasswordPlaceholder")} />
                </div>
                <Button onClick={onSave} size="lg">
                    <Check className="h-4 w-4 mr-2" />
                    {t("profile.changePassword")}
                </Button>
            </div>
        </div>
    );
}
