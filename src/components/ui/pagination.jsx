import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Component phân trang
 * @param {Object} props
 * @param {number} props.currentPage - Trang hiện tại
 * @param {number} props.totalPages - Tổng số trang
 * @param {Function} props.onPageChange - Callback khi đổi trang
 * @param {string} props.className - CSS class bổ sung
 */
export function Pagination({ currentPage = 1, totalPages = 1, onPageChange, className }) {
    const getPageNumbers = () => {
        const pages = [];
        const maxVisible = 5;
        
        if (totalPages <= maxVisible) {
            // Hiển thị tất cả trang nếu số trang <= 5
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            // Logic hiển thị trang
            if (currentPage <= 3) {
                // (1, 2, 3, 4, ..., n)
                for (let i = 1; i <= 4; i++) {
                    pages.push(i);
                }
                pages.push('ellipsis');
                pages.push(totalPages);
            } else if (currentPage >= totalPages - 2) {
                // (1, ..., n-3, n-2, n-1, n)
                pages.push(1);
                pages.push('ellipsis');
                for (let i = totalPages - 3; i <= totalPages; i++) {
                    pages.push(i);
                }
            } else {
                // (1, ..., page-1, page, page+1, ..., n)
                pages.push(1);
                pages.push('ellipsis');
                for (let i = currentPage - 1; i <= currentPage + 1; i++) {
                    pages.push(i);
                }
                pages.push('ellipsis');
                pages.push(totalPages);
            }
        }
        
        return pages;
    };

    const pageNumbers = getPageNumbers();

    if (totalPages <= 1) {
        return null;
    }

    return (
        <div className={cn("flex items-center justify-center gap-2", className)}>
            {/* Nút lùi trang */}
            <button
                onClick={() => onPageChange?.(currentPage - 1)}
                disabled={currentPage === 1}
                className={cn(
                    "flex items-center gap-1 px-4 py-2 rounded-lg border transition-colors",
                    currentPage === 1
                        ? "border-gray-200 text-gray-400 cursor-not-allowed"
                        : "border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-primary"
                )}
            >
                <ChevronLeft className="w-4 h-4" />
                <span className="text-sm font-medium">Trước</span>
            </button>

            {/* Số trang */}
            <div className="flex items-center gap-1">
                {pageNumbers.map((page, index) => {
                    if (page === 'ellipsis') {
                        return (
                            <span key={`ellipsis-${index}`} className="px-2 text-gray-400">
                                ...
                            </span>
                        );
                    }
                    
                    return (
                        <button
                            key={page}
                            onClick={() => onPageChange?.(page)}
                            className={cn(
                                "min-w-[40px] px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                                currentPage === page
                                    ? "bg-primary text-white"
                                    : "text-gray-700 hover:bg-gray-100 border border-gray-200"
                            )}
                        >
                            {page}
                        </button>
                    );
                })}
            </div>

            {/* Nút next trang */}
            <button
                onClick={() => onPageChange?.(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={cn(
                    "flex items-center gap-1 px-4 py-2 rounded-lg border transition-colors",
                    currentPage === totalPages
                        ? "border-gray-200 text-gray-400 cursor-not-allowed"
                        : "border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-primary"
                )}
            >
                <span className="text-sm font-medium">Sau</span>
                <ChevronRight className="w-4 h-4" />
            </button>
        </div>
    );
}

export default Pagination;