import { cn } from "@/lib/utils";


function decodeHTMLEntities(text) {
    if (!text) return '';
    const textarea = document.createElement('textarea');
    textarea.innerHTML = text;
    return textarea.value;
}

/**
 * @param {Object} props
 * @param {Array} props.articles - Danh sách bài báo
 * @param {string} props.title - Tiêu đề sidebar
 * @param {Function} props.onArticleClick - Callback khi click vào bài báo
 * @param {number} props.limit - Số bài hiển thị tối đa
 * @param {string} props.className - CSS class bổ sung
 */
export function CategorySidebar({
    articles = [],
    title = "Bài mới nhất",
    onArticleClick,
    limit = 5,
    className
}) {
    const displayedArticles = articles.slice(0, limit);

    // Helper để lấy title (hỗ trợ cả API và CSV format)
    const getTitle = (article) => decodeHTMLEntities(article.title || article['Tiêu đề'] || '');

    return (
        <div className={cn(
            "bg-card rounded-xl shadow-sm p-5",
            className
        )}>
            {/* Title */}
            <h2 className="text-base font-bold text-foreground mb-4 pb-3 border-b-2 border-border flex items-center gap-2">
                <span className="w-1 h-5 bg-primary rounded-full" />
                {title}
            </h2>

            {/* Danh sách bài viết */}
            <ul className="space-y-4">
                {displayedArticles.map((article, index) => (
                    <li
                        key={article.link || article.id || index}
                        className="group"
                    >
                        <button
                            onClick={() => onArticleClick?.(article, index)}
                            className="w-full text-left flex gap-3 items-start"
                        >
                            {/* Số thứ tự */}
                            <span className={cn(
                                "shrink-0 w-6 h-6 rounded flex items-center justify-center text-xs font-bold",
                                index < 3
                                    ? "bg-primary text-primary-foreground"
                                    : "bg-muted text-muted-foreground"
                            )}>
                                {index + 1}
                            </span>

                            {/* Title */}
                            <span className="text-sm text-foreground leading-snug line-clamp-2 group-hover:text-primary transition-colors">
                                {getTitle(article)}
                            </span>
                        </button>
                    </li>
                ))}
            </ul>

            {articles.length === 0 && (
                <p className="text-sm text-muted-foreground text-center py-4">
                    Chưa có bài viết
                </p>
            )}
        </div>
    );
}

export default CategorySidebar;
