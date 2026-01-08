import { useState, useEffect } from "react";
import { Bookmark, Trash2 } from "lucide-react";
import { ArticleCard } from "@/components/ui/ArticleCard";
import { getSavedArticles, removeSavedArticle } from "@/lib/savedArticles";
import { useLanguage } from "@/contexts/LanguageContext";

/**
 * Component danh sách tin đã lưu
 */
export function SavedArticlesTab() {
    const [savedArticles, setSavedArticles] = useState([]);
    const { t } = useLanguage();

    const loadSavedArticles = () => {
        const articles = getSavedArticles();
        setSavedArticles(articles);
    };

    useEffect(() => {
        // Load saved article từ local
        // eslint-disable-next-line react-hooks/set-state-in-effect
        loadSavedArticles();

        // Nghe storage event để tự động cập nhật khi có thay đổi từ tab khác
        const handleStorageChange = (e) => {
            if (e.key === 'savedArticles') {
                loadSavedArticles();
            }
        };

        const handleSavedArticlesChange = () => {
            loadSavedArticles();
        };

        window.addEventListener('storage', handleStorageChange);
        window.addEventListener('savedArticlesChanged', handleSavedArticlesChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
            window.removeEventListener('savedArticlesChanged', handleSavedArticlesChange);
        };
    }, []);

    const handleRemoveArticle = (articleUrl) => {
        removeSavedArticle(articleUrl);
        loadSavedArticles();
    };

    if (savedArticles.length === 0) {
        return (
            <div>
                <h2 className="text-2xl font-extrabold text-foreground mb-6">{t("profile.savedArticles")}</h2>
                <div className="text-center py-12">
                    <Bookmark className="w-16 h-16 mx-auto text-muted-foreground/50 mb-4" />
                    <p className="text-muted-foreground text-lg">{t("profile.noSavedArticles")}</p>
                    <p className="text-muted-foreground/70 text-sm mt-2">{t("profile.saveArticlesHint")}</p>
                </div>
            </div>
        );
    }

    return (
        <div>
            <h2 className="text-2xl font-extrabold text-foreground mb-6">{t("profile.savedArticles")} ({savedArticles.length})</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {savedArticles.map((article, index) => {
                    const articleUrl = article.url || article.link;
                    return (
                        <div key={articleUrl || index} className="relative group">
                            <ArticleCard article={article} variant="featured" />
                            <button
                                onClick={() => handleRemoveArticle(articleUrl)}
                                className="absolute top-3 right-3 p-2 bg-background/90 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500 hover:text-white"
                                title={t("profile.removeFromSaved")}
                            >
                                <Trash2 className="w-4 h-4" />
                            </button>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
