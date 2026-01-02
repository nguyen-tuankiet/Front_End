import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Bookmark, BookmarkCheck } from "lucide-react";
import { Button } from "./button";
import { saveArticle, removeSavedArticle, isArticleSaved } from "@/lib/savedArticles";

/**
 * Component nút lưu bài viết
 * @param {Object} props
 * @param {string|number} props.articleId - ID bài viết
 * @param {Object} props.article - Dữ liệu bài viết
 * @param {string} props.className - CSS class bổ sung
 * @param {Function} props.onSave - Callback khi lưu/xóa lưu
 */
export function SaveButton({ articleId, article, className, onSave }) {
    const articleUrl = article?.url || article?.link || articleId;
    const [isSaved, setIsSaved] = useState(false);

    // Kiểm tra trạng thái lưu
    const checkSavedStatus = () => {
        if (articleUrl) {
            setIsSaved(isArticleSaved(articleUrl));
        }
    };

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        checkSavedStatus();

        // Nghe event khi có thay đổi từ component khác
        const handleSavedArticlesChange = () => {
            checkSavedStatus();
        };

        window.addEventListener('savedArticlesChanged', handleSavedArticlesChange);
        window.addEventListener('storage', handleSavedArticlesChange); // Cho trường hợp multi-tab

        return () => {
            window.removeEventListener('savedArticlesChanged', handleSavedArticlesChange);
            window.removeEventListener('storage', handleSavedArticlesChange);
        };
    }, [articleUrl]);

    const handleSave = () => {
        const newSavedState = !isSaved;
        setIsSaved(newSavedState);

        if (articleUrl) {
            if (newSavedState && article) {
                saveArticle(article);
            } else {
                removeSavedArticle(articleUrl);
            }
        }

        if (onSave) {
            onSave(articleId || articleUrl, newSavedState);
        }
    };

    return (
        <Button
            variant={isSaved ? "default" : "outline"}
            size="sm"
            onClick={handleSave}
            className={cn("gap-2", className)}
        >
            {isSaved ? (
                <>
                    <BookmarkCheck className="w-4 h-4" />
                    Đã lưu
                </>
            ) : (
                <>
                    <Bookmark className="w-4 h-4" />
                    Lưu bài viết
                </>
            )}
        </Button>
    );
}

export default SaveButton;

