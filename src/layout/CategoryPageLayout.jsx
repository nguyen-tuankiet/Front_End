import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

/**
 * Layout chung cho trang danh mục tin tức
 * @param {Object} props
 * @param {string} props.title - Tiêu đề category chính
 * @param {Array} props.subCategories - Danh sách subcategory
 * @param {string} props.categorySlug - Slug của category hiện tại
 * @param {number} props.totalArticles - Tổng số bài viết
 * @param {number} props.currentPage - Trang hiện tại (0-indexed)
 * @param {number} props.pageSize - Số bài mỗi trang
 * @param {React.ReactNode} props.children - Nội dung chính
 * @param {React.ReactNode} props.sidebar - Sidebar
 * @param {string} props.className - CSS class bổ sung
 */
export function CategoryPageLayout({
    title,
    subCategories = [],
    categorySlug = "",
    totalArticles = 0,
    currentPage = 0,
    pageSize = 9,
    children,
    sidebar,
    className
}) {
    const startArticle = currentPage * pageSize + 1;
    const endArticle = Math.min((currentPage + 1) * pageSize, totalArticles);

    return (
        <div className={cn("max-w-7xl mx-auto py-6 px-4", className)}>
            {/* Header */}
            <header className="mb-6">
                {/* Breadcrumb */}
                <div className="flex items-center gap-2 text-sm mb-3">
                    <Link
                        to="/"
                        className="flex items-center gap-1 text-primary hover:underline"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Trang chủ
                    </Link>
                    <span className="text-muted-foreground">/</span>
                    <span className="text-muted-foreground">{title}</span>
                </div>

                {/* Title */}
                <div className="flex items-center justify-between mb-4">
                    <h1 className="text-3xl font-bold text-foreground">
                        {title}
                    </h1>
                </div>

                {/* Sub-categories */}
                {subCategories.length > 0 && (
                    <div className="flex flex-wrap gap-3 pt-4 border-t border-border">
                        {subCategories.map((sub, idx) => (
                            <Link
                                key={idx}
                                to={`/danh-muc/${categorySlug}/${sub.slug}`}
                                className={cn(
                                    "px-4 py-2 rounded-full text-sm font-medium transition-colors border",
                                    sub.active
                                        ? "bg-primary text-primary-foreground border-primary"
                                        : "bg-card text-foreground border-border hover:border-primary hover:text-primary"
                                )}
                            >
                                {sub.name}
                            </Link>
                        ))}
                    </div>
                )}
            </header>

            {/* Main Content + Sidebar */}
            <div className="flex flex-col lg:flex-row gap-8">
                {/* Main Content */}
                <main className="flex-1 min-w-0">
                    {children}
                </main>

                {/* Sidebar */}
                {sidebar && (
                    <aside className="w-full lg:w-80 shrink-0">
                        {sidebar}
                    </aside>
                )}
            </div>
        </div>
    );
}

export default CategoryPageLayout;
