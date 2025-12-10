import { cn } from "@/lib/utils";
import { Facebook, Twitter, Link2 } from "lucide-react";

/**
 * Component hiển thị các nút chia sẻ bài viết
 * @param {Object} props
 * @param {string} props.url - URL của bài viết
 * @param {string} props.title - Tiêu đề bài viết
 * @param {string} props.className - CSS classes bổ sung
 */
export function ShareButtons({ url, title, className }) {
    const encodedUrl = encodeURIComponent(url || window.location.href);
    const encodedTitle = encodeURIComponent(title || "");

    const shareLinks = {
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
        twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    };

    const handleCopyLink = async () => {
        try {
            await navigator.clipboard.writeText(url || window.location.href);
            alert("Đã sao chép liên kết!");
        } catch (err) {
            console.error("Failed to copy link:", err);
        }
    };

    return (
        <div className={cn("flex items-center gap-2", className)}>
            <a
                href={shareLinks.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full hover:bg-primary/10 text-muted-foreground hover:text-primary transition-colors"
                aria-label="Chia sẻ lên Facebook"
            >
                <Facebook className="w-5 h-5" />
            </a>
            <a
                href={shareLinks.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full hover:bg-primary/10 text-muted-foreground hover:text-primary transition-colors"
                aria-label="Chia sẻ lên Twitter"
            >
                <Twitter className="w-5 h-5" />
            </a>
            <button
                onClick={handleCopyLink}
                className="p-2 rounded-full hover:bg-primary/10 text-muted-foreground hover:text-primary transition-colors"
                aria-label="Sao chép liên kết"
            >
                <Link2 className="w-5 h-5" />
            </button>
        </div>
    );
}

export default ShareButtons;

