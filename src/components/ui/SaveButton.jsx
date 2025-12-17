import { useState } from "react";
import { cn } from "@/lib/utils";
import { Bookmark, BookmarkCheck } from "lucide-react";
import { Button } from "./button";

/**
 * Component nút lưu bài viết
 * @param {Object} props
 * @param {string|number} props.articleId - ID bài viết
 * @param {string} props.className - CSS class bổ sung
 * @param {Function} props.onSave - Callback khi lưu
 */
export function SaveButton({ articleId, className, onSave }) {
    const [isSaved, setIsSaved] = useState(false);

    const handleSave = () => {
        setIsSaved(!isSaved);
        if (onSave) {
            onSave(articleId, !isSaved);
        }
        // Xử lý lưu
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

