import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

/**
 * Component hiển thị danh sách bài báo dạng grid
 * @param {Object} props
 * @param {Array} props.articles - Danh sách bài báo
 * @param {Function} props.onArticleClick - Callback khi click vào bài báo
 * @param {boolean} props.loading - Trạng thái loading
 * @param {string} props.className - CSS classes bổ sung
 */
export function ArticleList({
    articles = [],
    onArticleClick,
    loading = false,
    className
}) {
    if (loading) {
        return (
            <div className="space-y-6">
                {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="flex gap-4 animate-pulse">
                        <div className="w-64 h-40 bg-muted rounded-lg shrink-0" />
                        <div className="flex-1 space-y-3">
                            <div className="h-3 bg-muted rounded w-24" />
                            <div className="h-5 bg-muted rounded w-full" />
                            <div className="h-4 bg-muted rounded w-3/4" />
                            <div className="h-8 bg-muted rounded w-20 mt-4" />
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    if (articles.length === 0) {
        return (
            <div className="text-center py-12 text-muted-foreground">
                Không có bài viết nào trong danh mục này.
            </div>
        );
    }

    return (
        <div className={cn("space-y-6", className)}>
            {articles.map((article, index) => (
                <article
                    key={article.id || index}
                    className="flex flex-col sm:flex-row gap-4 bg-card rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5 group"
                >
                    {/* Thumbnail */}
                    {article['Thumbnail'] && (
                        <div
                            className="w-full sm:w-64 h-48 sm:h-40 shrink-0 overflow-hidden cursor-pointer"
                            onClick={() => onArticleClick?.(article, index)}
                        >
                            <img
                                src={article['Thumbnail']}
                                alt={article['Tiêu đề']}
                                loading="lazy"
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                onError={(e) => e.target.style.display = 'none'}
                            />
                        </div>
                    )}

                    {/* Content */}
                    <div className="flex-1 p-4 sm:py-3 sm:pr-4 sm:pl-0 flex flex-col">
                        {/* Category badge */}
                        <span className="text-xs text-muted-foreground uppercase tracking-wide mb-2">
                            {article['Chuyên mục lớn']} / {article['Chuyên mục con']}
                        </span>

                        {/* Title */}
                        <h3
                            className="text-lg font-bold text-foreground leading-snug mb-2 line-clamp-2 cursor-pointer hover:text-primary transition-colors"
                            onClick={() => onArticleClick?.(article, index)}
                        >
                            {article['Tiêu đề']}
                        </h3>

                        {/* Excerpt */}
                        <p className="text-sm text-muted-foreground line-clamp-2 mb-auto">
                            {article['Tóm tắt'] ? article['Tóm tắt'].substring(0, 150) + '...' : ''}
                        </p>

                        {/* Read more button */}
                        <Button
                            variant="outline"
                            size="sm"
                            className="self-start mt-3"
                            onClick={() => onArticleClick?.(article, index)}
                        >
                            Đọc tiếp
                        </Button>
                    </div>
                </article>
            ))}
        </div>
    );
}

export default ArticleList;
