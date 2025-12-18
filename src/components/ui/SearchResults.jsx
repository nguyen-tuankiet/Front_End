import { ArticleCard } from "./ArticleCard";
import { Pagination } from "./pagination";
import { cn } from "@/lib/utils";

/**
 * Component hiển thị kết quả tìm kiếm
 * @param {Object} props
 * @param {Array} props.articles - Danh sách bài viết
 * @param {string} props.query - Search query
 * @param {number} props.totalResults - Tổng số kết quả
 * @param {boolean} props.loading - Trạng thái load
 * @param {number} props.currentPage - Trang hiện tại
 * @param {number} props.totalPages - Tổng số trang
 * @param {Function} props.onPageChange - Callback khi đổi trang
 * @param {string} props.className - CSS class bổ sung
 */
export function SearchResults({ 
    articles = [], 
    query = '', 
    totalResults, 
    loading = false,
    currentPage = 1,
    totalPages = 1,
    onPageChange,
    className 
}) {
    if (loading) {
        return (
            <div className={cn("grid grid-cols-1 md:grid-cols-3 gap-6", className)}>
                {[1, 2, 3].map((i) => (
                    <div key={i} className="animate-pulse">
                        <div className="bg-gray-200 rounded-lg h-48 w-full mb-4" />
                        <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
                        <div className="h-4 bg-gray-200 rounded w-full mb-2" />
                        <div className="h-4 bg-gray-200 rounded w-2/3" />
                    </div>
                ))}
            </div>
        );
    }

    if (articles.length === 0) {
        return (
            <div className={cn("text-center py-12", className)}>
                <p className="text-gray-500 text-lg">
                    {query ? `Không tìm thấy kết quả cho "${query}"` : 'Nhập từ khóa để tìm kiếm'}
                </p>
            </div>
        );
    }

    return (
        <div className={cn("space-y-6", className)}>
            {/* Số lượgn kết quả */}
            {query && (
                <p className="text-gray-600 text-sm mb-4">
                    Tìm thấy {totalResults !== undefined ? totalResults : articles.length} kết quả cho "{query}"
                </p>
            )}

            {/* Grid kết quả */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {articles.map((article, index) => (
                    <ArticleCard
                        key={article.id || article.link || index}
                        article={{
                            ...article,
                            date: article.date || article.pubDate || 'Vừa xong'
                        }}
                        variant="search"
                    />
                ))}
            </div>

            {/* Phân trang */}
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={onPageChange}
                className="mt-8"
            />
        </div>
    );
}

export default SearchResults;

