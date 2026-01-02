import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

/**
 * Component tab đổi mật khẩu
 */
export function PasswordTab({ onSave }) {
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
                <Button onClick={onSave} size="lg">
                    <Check className="h-4 w-4 mr-2" />
                    Đổi mật khẩu
                </Button>
            </div>
        </div>
    );
}
