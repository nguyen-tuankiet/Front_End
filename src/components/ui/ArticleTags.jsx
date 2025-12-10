import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

/**
 * Component hiển thị tags của bài viết
 * @param {Object} props
 * @param {Array<string>} props.tags - Danh sách tags
 * @param {string} props.className - CSS class bổ sung
 * @param {Function} props.onTagClick - Callback khi click tag
 */
export function ArticleTags({ tags = [], className, onTagClick }) {
    if (!tags || tags.length === 0) {
        return null;
    }

    return (
        <div className={cn("flex flex-wrap items-center gap-2", className)}>
            <span className="text-sm font-semibold text-foreground mr-2">Tags:</span>
            {tags.map((tag, index) => (
                <button
                    key={index}
                    onClick={() => onTagClick?.(tag)}
                    className={cn(
                        "px-3 py-1 text-sm font-medium rounded-full",
                        "bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground",
                        "transition-colors duration-200"
                    )}
                >
                    {tag}
                </button>
            ))}
        </div>
    );
}

export default ArticleTags;

