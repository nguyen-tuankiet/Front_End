import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "@/components/Context/AuthContext";
import { SavedArticlesTab, AccountInfoTab, PasswordTab, ProfileSidebar } from "@/components/Profile";
import { useLanguage } from "@/contexts/LanguageContext";

export function ProfilePage() {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const { user, logout } = useAuth();
    const { t } = useLanguage();
    const tabParam = searchParams.get('tab');
    const [activeTab, setActiveTab] = useState(tabParam || "account");
    const [provinces, setProvinces] = useState([]);
    const [formData, setFormData] = useState({
        displayName: user?.name || "Đô Phạm",
        gender: "other",
        day: "",
        month: "",
        year: "",
        email: "",
        phone: "",
        address: "",
    });

    const menuItems = [
        { id: "account", label: t("profile.accountInfo") },
        { id: "password", label: t("profile.changePassword") },
        { id: "comments", label: t("profile.comments") },
        { id: "saved", label: t("profile.savedArticles") },
        { id: "viewed", label: t("profile.viewedArticles") },
    ];

    // Cập nhật activeTab khi tab param thay đổi
    useEffect(() => {
        if (tabParam && menuItems.some(item => item.id === tabParam)) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setActiveTab(tabParam);
        }
    }, [tabParam]);

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
                console.error('Lỗi lấy api tỉnh thành', error);
            }
        };
        fetchProvinces();
    }, []);

    const handleSave = () => {
        // Handle save logic
        alert(t("profile.savedChanges"));
    };

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    const handleImageChange = () => {
        // Handle image upload
        alert(t("profile.featureInDevelopment"));
    };

    const handleDeleteAccount = () => {
        if (window.confirm(t("profile.deleteAccountConfirm"))) {
            alert(t("profile.accountDeleted"));
            logout();
            navigate("/");
        }
    };

    const handleTabChange = (tabId) => {
        setActiveTab(tabId);
        setSearchParams({ tab: tabId });
    };

    const renderContent = () => {
        switch (activeTab) {
            case "account":
                return (
                    <AccountInfoTab
                        formData={formData}
                        setFormData={setFormData}
                        onSave={handleSave}
                        onDeleteAccount={handleDeleteAccount}
                        provinces={provinces}
                    />
                );

            case "password":
                return <PasswordTab onSave={handleSave} />;

            case "comments":
                return (
                    <div>
                        <h2 className="text-2xl font-extrabold text-foreground mb-6">{t("profile.commentActivity")}</h2>
                        <p className="text-muted-foreground">{t("profile.featureInDevelopment")}</p>
                    </div>
                );

            case "saved":
                return <SavedArticlesTab />;

            case "viewed":
                return (
                    <div>
                        <h2 className="text-2xl font-extrabold text-foreground mb-6">{t("profile.viewedArticles")}</h2>
                        <p className="text-muted-foreground">{t("profile.featureInDevelopment")}</p>
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
                            {t("profile.title")}{" "}
                            <span className="text-primary">{t("profile.personalProfile")}</span>
                        </h1>
                    </div>
                </div>
            </section>

            <div className="max-w-7xl mx-auto px-4 py-8 lg:py-12">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    <ProfileSidebar
                        user={user}
                        activeTab={activeTab}
                        onTabChange={handleTabChange}
                        onImageChange={handleImageChange}
                        onLogout={handleLogout}
                    />

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
