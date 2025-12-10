import { cn } from "@/lib/utils";
import { Clock } from "lucide-react";

/**
 * Component hiển thị meta thông tin bài viết (tác giả, thời gian đăng)
 * @param {Object} props
 * @param {string} props.author - Tên tác giả
 * @param {string} props.publishTime - Thời gian đăng
 * @param {string} props.className - CSS class bổ sung
 */
export function ArticleMeta({ author, publishTime, className }) {
    return (
        <div className={cn("flex items-center gap-4 text-sm text-muted-foreground", className)}>
            {author && (
                <span className="font-medium text-foreground">{author}</span>
            )}
            {publishTime && (
                <div className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4" />
                    <span>{publishTime}</span>
                </div>
            )}
        </div>
    );
}

export default ArticleMeta;

