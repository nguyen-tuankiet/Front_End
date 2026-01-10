import { User, Lock, MessageSquare, Bookmark, Eye, LogOut, Camera } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";

/**
 * Component sidebar của trang profile
 */
export function ProfileSidebar({ user, activeTab, onTabChange, onImageChange, onLogout }) {
    const { t } = useLanguage();

    const menuItems = [
        { id: "account", label: t("profile.accountInfo"), icon: User },
        { id: "password", label: t("profile.changePassword"), icon: Lock },
        { id: "comments", label: t("profile.comments"), icon: MessageSquare },
        { id: "saved", label: t("profile.savedArticles"), icon: Bookmark },
        { id: "viewed", label: t("profile.viewedArticles"), icon: Eye },
    ];

    return (
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
                            onClick={onImageChange}
                            className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:bg-primary/90 transition-colors"
                        >
                            <Camera className="h-4 w-4" />
                        </button>
                    </div>
                    <p className="text-lg font-semibold text-foreground text-center">
                        {user?.name || t("profile.user")}
                    </p>
                </div>

                <nav className="space-y-2">
                    {menuItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = activeTab === item.id;
                        return (
                            <button
                                key={item.id}
                                onClick={() => onTabChange(item.id)}
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
                        onClick={onLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left text-foreground hover:bg-red-50 dark:hover:bg-red-950/20 hover:text-red-500 transition-colors"
                    >
                        <LogOut className="h-5 w-5" />
                        <span className="text-sm font-medium">{t("profile.logout")}</span>
                    </button>
                </nav>
            </div>
        </aside>
    );
}
