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
    const FALLBACK_IMAGE = "https://placehold.co/600x400?text=News";

    const handleImageError = (e) => {
        e.target.src = FALLBACK_IMAGE;
        e.target.onerror = null;
    };

    if (loading) {
        return (
            <div className="space-y-6">
                {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="flex gap-4 animate-pulse">
                        <div className="w-64 h-40 bg-muted/50 rounded-xl shrink-0" />
                        <div className="flex-1 space-y-3">
                            <div className="h-3 bg-muted/50 rounded w-24" />
                            <div className="h-5 bg-muted/50 rounded w-full" />
                            <div className="h-4 bg-muted/50 rounded w-3/4" />
                            <div className="h-8 bg-muted/50 rounded w-20 mt-4" />
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    if (articles.length === 0) {
        return (
            <div className="text-center py-16 text-muted-foreground bg-gray-50 rounded-xl border border-dashed">
                <p>Không có bài viết nào trong danh mục này.</p>
            </div>
        );
    }

    return (
        <div className={cn("space-y-6", className)}>
            {articles.map((article, index) => (
                <article
                    key={article.id || index}
                    className="flex flex-col sm:flex-row gap-5 group items-start pb-6 border-b border-gray-100 last:border-0 last:pb-0"
                >
                    {/* Thumbnail */}
                    <div
                        className="w-full sm:w-64 aspect-[16/10] sm:aspect-[4/3] max-h-48 sm:max-h-full bg-gray-100 rounded-xl overflow-hidden cursor-pointer shadow-sm hover:shadow-md transition-all shrink-0"
                        onClick={() => onArticleClick?.(article, index)}
                    >
                        <img
                            src={article['Thumbnail'] || FALLBACK_IMAGE}
                            alt={article['Tiêu đề']}
                            loading="lazy"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            onError={handleImageError}
                        />
                    </div>

                    {/* Content */}
                    <div className="flex-1 flex flex-col h-full min-w-0">
                        {/* Category badge */}
                        <div className="flex items-center gap-2 mb-2">
                            <span className="inline-flex px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-primary/5 text-primary">
                                {article['Chuyên mục lớn']}
                            </span>
                            {article['Chuyên mục con'] && (
                                <>
                                    <span className="text-gray-300 text-[10px]">•</span>
                                    <span className="text-[10px] font-medium text-gray-500 uppercase">
                                        {article['Chuyên mục con']}
                                    </span>
                                </>
                            )}
                        </div>

                        {/* Title */}
                        <h3
                            className="text-lg md:text-xl font-bold text-gray-900 leading-snug mb-2 line-clamp-2 cursor-pointer group-hover:text-primary transition-colors"
                            onClick={() => onArticleClick?.(article, index)}
                        >
                            {article['Tiêu đề']}
                        </h3>

                        {/* Excerpt */}
                        <p className="text-sm text-gray-500 line-clamp-2 mb-3 leading-relaxed">
                            {article['Tóm tắt'] ? article['Tóm tắt'].substring(0, 160) + '...' : ''}
                        </p>

                        {/* Footer/Action */}
                        <div className="mt-auto pt-2">
                            <Button
                                variant="outline"
                                size="sm"
                                className="h-8 text-xs font-medium hover:bg-primary hover:text-white transition-colors"
                                onClick={() => onArticleClick?.(article, index)}
                            >
                                Đọc tiếp
                            </Button>
                        </div>
                    </div>
                </article>
            ))}
        </div>
    );
}

export default ArticleList;
