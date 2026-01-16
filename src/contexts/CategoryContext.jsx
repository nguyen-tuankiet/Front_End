import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { apiService } from '@/services/api';
import { useLanguage } from '@/contexts/LanguageContext';

const CategoryContext = createContext(undefined);

export function CategoryProvider({ children }) {
    const { language } = useLanguage();
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [lastFetchedLang, setLastFetchedLang] = useState(null);

    // Fetch categories khi language thay đổi
    const fetchCategories = useCallback(async () => {
        // Không fetch lại nếu đã có data với cùng language
        if (lastFetchedLang === language && categories.length > 0) {
            return;
        }

        try {
            setLoading(true);
            setError(null);
            const data = await apiService.getCategories(language);
            setCategories(data || []);
            setLastFetchedLang(language);
        } catch (err) {
            console.error('Lỗi fetch categories:', err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, [language, lastFetchedLang, categories.length]);

    // Auto fetch khi language thay đổi
    useEffect(() => {
        fetchCategories();
    }, [language]); // eslint-disable-line react-hooks/exhaustive-deps

    // Hàm tìm category theo slug
    const getCategoryBySlug = useCallback((slug) => {
        return categories.find(cat => cat.slug === slug);
    }, [categories]);

    // Hàm tìm subcategory theo slug
    const getSubcategoryBySlug = useCallback((categorySlug, subcategorySlug) => {
        const category = getCategoryBySlug(categorySlug);
        if (!category?.subCategories) return null;
        return category.subCategories.find(sub => sub.slug === subcategorySlug);
    }, [getCategoryBySlug]);

    // Hàm refresh categories (force fetch)
    const refreshCategories = useCallback(async () => {
        setLastFetchedLang(null);
        await fetchCategories();
    }, [fetchCategories]);

    const value = {
        categories,
        loading,
        error,
        getCategoryBySlug,
        getSubcategoryBySlug,
        refreshCategories,
    };

    return (
        <CategoryContext.Provider value={value}>
            {children}
        </CategoryContext.Provider>
    );
}

export function useCategories() {
    const context = useContext(CategoryContext);
    if (context === undefined) {
        throw new Error('useCategories must be used within a CategoryProvider');
    }
    return context;
}

export default CategoryContext;
