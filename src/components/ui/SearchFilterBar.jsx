import { useState, useEffect } from "react";
import { Search, ChevronDown, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";
import { useCategories } from "@/contexts/CategoryContext";

/**
 * Search và Filter bar component
 * @param {Object} props
 * @param {string} props.initialQuery - Query ban đầu từ URL
 * @param {string} props.initialCategory - Category filter ban đầu
 * @param {string} props.initialTimeRange - Time range filter ban đầu
 * @param {Function} props.onSearch - Callback khi search (query, category, timeRange)
 * @param {string} props.className - CSS class bổ sung
 */
export function SearchFilterBar({
    initialQuery = '',
    initialCategory = 'all',
    initialTimeRange = 'all',
    onSearch,
    className
}) {
    const { language } = useLanguage();
    const { categories: allCategories } = useCategories();
    const [query, setQuery] = useState(initialQuery);
    const [category, setCategory] = useState(initialCategory);
    const [timeRange, setTimeRange] = useState(initialTimeRange);
    const [isCategoryOpen, setIsCategoryOpen] = useState(false);
    const [isTimeOpen, setIsTimeOpen] = useState(false);

    // Lấy categories từ context (filter bỏ home)
    const categories = (allCategories || []).filter(cat => cat.slug !== "home");

    const categoryOptions = [
        { value: 'all', label: 'Tất cả' },
        ...(categories.map(cat => ({
            value: cat.slug,
            label: cat.name
        })))
    ];

    const timeOptions = [
        { value: 'all', label: 'Toàn bộ' },
        { value: 'today', label: 'Hôm nay' },
        { value: 'week', label: 'Tuần này' },
        { value: 'month', label: 'Tháng này' },
        { value: 'year', label: 'Năm nay' },
    ];

    const handleSearch = () => {
        if (onSearch) {
            onSearch(query.trim(), category, timeRange);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    const selectedCategoryLabel = categoryOptions.find(opt => opt.value === category)?.label || 'Tất cả';
    const selectedTimeLabel = timeOptions.find(opt => opt.value === timeRange)?.label || 'Toàn bộ';

    return (
        <div className={cn("bg-muted rounded-lg p-4", className)}>
            <div className="flex flex-col md:flex-row gap-3">
                {/* Input */}
                <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Tìm kiếm..."
                        className="w-full pl-10 pr-4 py-2.5 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none bg-background text-foreground placeholder:text-muted-foreground"
                    />
                </div>

                {/* Category filter */}
                <div className="relative">
                    <button
                        type="button"
                        onClick={() => {
                            setIsCategoryOpen(!isCategoryOpen);
                            setIsTimeOpen(false);
                        }}
                        className="flex items-center gap-2 px-4 py-2.5 bg-background border border-border rounded-lg hover:border-primary transition-colors min-w-[120px] justify-between"
                    >
                        <span className="text-sm font-medium text-foreground">{selectedCategoryLabel}</span>
                        <ChevronDown className={cn(
                            "w-4 h-4 text-gray-400 transition-transform",
                            isCategoryOpen && "rotate-180"
                        )} />
                    </button>
                    {isCategoryOpen && (
                        <>
                            <div
                                className="fixed inset-0 z-10"
                                onClick={() => setIsCategoryOpen(false)}
                            />
                            <div className="absolute top-full left-0 mt-1 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-20 max-h-60 overflow-y-auto">
                                {categoryOptions.map((option) => (
                                    <button
                                        key={option.value}
                                        type="button"
                                        onClick={() => {
                                            setCategory(option.value);
                                            setIsCategoryOpen(false);
                                        }}
                                        className={cn(
                                            "w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors",
                                            category === option.value && "bg-primary/10 text-primary font-medium"
                                        )}
                                    >
                                        {option.label}
                                    </button>
                                ))}
                            </div>
                        </>
                    )}
                </div>

                {/* Time filter */}
                <div className="relative">
                    <button
                        type="button"
                        onClick={() => {
                            setIsTimeOpen(!isTimeOpen);
                            setIsCategoryOpen(false);
                        }}
                        className="flex items-center gap-2 px-4 py-2.5 bg-background border border-border rounded-lg hover:border-primary transition-colors min-w-[150px] justify-between"
                    >
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm font-medium text-foreground">{selectedTimeLabel}</span>
                        <ChevronDown className={cn(
                            "w-4 h-4 text-muted-foreground transition-transform",
                            isTimeOpen && "rotate-180"
                        )} />
                    </button>
                    {isTimeOpen && (
                        <>
                            <div
                                className="fixed inset-0 z-10"
                                onClick={() => setIsTimeOpen(false)}
                            />
                            <div className="absolute top-full right-0 mt-1 w-48 bg-card border border-border rounded-lg shadow-lg z-20">
                                {timeOptions.map((option) => (
                                    <button
                                        key={option.value}
                                        type="button"
                                        onClick={() => {
                                            setTimeRange(option.value);
                                            setIsTimeOpen(false);
                                        }}
                                        className={cn(
                                            "w-full text-left px-4 py-2 text-sm text-foreground hover:bg-muted transition-colors",
                                            timeRange === option.value && "bg-primary/10 text-primary font-medium"
                                        )}
                                    >
                                        {option.label}
                                    </button>
                                ))}
                            </div>
                        </>
                    )}
                </div>

                {/* Search btn */}
                <button
                    onClick={handleSearch}
                    className="px-6 py-2.5 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition-colors whitespace-nowrap"
                >
                    Tìm kiếm
                </button>
            </div>
        </div>
    );
}

export default SearchFilterBar;

