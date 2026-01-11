import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

/**
 * Layout chung cho trang danh mục
 * @param {Object} props
 * @param {string} props.title - Tiêu đề trang
 * @param {string} props.categoryName - Tên category cha
 * @param {Array} props.subCategories - Danh sách subcategory
 * @param {string} props.categorySlug - Slug của category hiện tại
 * @param {React.ReactNode} props.children - Nội dung chính
 * @param {React.ReactNode} props.sidebar - Sidebar
 * @param {string} props.className - CSS class bổ sung
 */
export function CategoryPageLayout({
    title,
    categoryName = "",
    subCategories = [],
    categorySlug = "",
    children,
    sidebar,
    pagination,
    className
}) {
    const { t } = useLanguage();

    return (
        <div className={cn("max-w-7xl mx-auto py-6 px-4", className)}>
            <header className="mb-6">
                <div className="flex items-center gap-2 text-sm mb-3">
                    <Link
                        to="/"
                        className="flex items-center gap-1 text-primary hover:underline"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        {t('category.home')}
                    </Link>
                    {categoryName && (
                        <>
                            <span className="text-muted-foreground">/</span>
                            <Link
                                to={`/danh-muc/${categorySlug}`}
                                className="text-muted-foreground hover:text-primary transition-colors"
                            >
                                {categoryName}
                            </Link>
                        </>
                    )}
                </div>

                <div className="flex items-center justify-between mb-4">
                    <h1 className="text-3xl font-bold text-foreground">
                        {title}
                    </h1>
                </div>

                {subCategories.length > 0 && (
                    <div className="mt-4">
                        <div className="flex flex-wrap gap-2 sm:gap-3">
                            {subCategories.map((sub) => {
                                const subLink = sub.slug 
                                    ? `/danh-muc/${categorySlug}/${sub.slug}`
                                    : `/danh-muc/${categorySlug}`;
                                
                                return (
                                    <Link
                                        key={sub.slug || 'all'}
                                        to={subLink}
                                        className={cn(
                                            "px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-colors border whitespace-nowrap",
                                            sub.active
                                                ? "bg-primary text-primary-foreground border-primary shadow-sm"
                                                : "bg-card text-foreground border-border hover:border-primary hover:text-primary hover:bg-primary/5"
                                        )}
                                    >
                                        {sub.name}
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                )}
            </header>

            <div className="flex flex-col lg:flex-row gap-8">
                {/* Main Content */}
                <main className="flex-1 min-w-0">
                    {children}
                </main>

                {/* Sidebar */}
                {sidebar && (
                    <aside className="w-full lg:w-[300px] shrink-0">
                        {sidebar}
                    </aside>
                )}
            </div>

            {/* Pagination - nằm ngoài layout 2 cột, ở giữa trang */}
            {pagination && (
                <div className="mt-12 flex flex-col items-center justify-center">
                    {pagination}
                </div>
            )}
        </div>
    );
}

export default CategoryPageLayout;
