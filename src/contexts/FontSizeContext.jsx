import { createContext, useContext, useState, useEffect } from 'react';

const FontSizeContext = createContext({
    fontSize: 'base',
    setFontSize: () => {},
    increaseFontSize: () => {},
    decreaseFontSize: () => {},
    resetFontSize: () => {},
});

const STORAGE_KEY = 'article_font_size';

export const FONT_SIZES = {
    sm: { label: 'Nhỏ', value: 'sm', class: 'text-sm' },
    base: { label: 'Mặc định', value: 'base', class: 'text-base' },
    lg: { label: 'Lớn', value: 'lg', class: 'text-lg' },
    xl: { label: 'Rất lớn', value: 'xl', class: 'text-xl' },
    '2xl': { label: 'Cực lớn', value: '2xl', class: 'text-2xl' },
};

const FONT_SIZE_ORDER = ['sm', 'base', 'lg', 'xl', '2xl'];

export function FontSizeProvider({ children }) {
    const [fontSize, setFontSizeState] = useState(() => {
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            if (saved && FONT_SIZES[saved]) {
                return saved;
            }
            return 'base';
        } catch {
            return 'base';
        }
    });

    useEffect(() => {
        try {
            localStorage.setItem(STORAGE_KEY, fontSize);
        } catch (e) {
            console.error('Error saving font size:', e);
        }
    }, [fontSize]);

    const setFontSize = (size) => {
        if (FONT_SIZES[size]) {
            setFontSizeState(size);
        }
    };

    const increaseFontSize = () => {
        setFontSizeState((current) => {
            const currentIndex = FONT_SIZE_ORDER.indexOf(current);
            if (currentIndex < FONT_SIZE_ORDER.length - 1) {
                return FONT_SIZE_ORDER[currentIndex + 1];
            }
            return current;
        });
    };

    const decreaseFontSize = () => {
        setFontSizeState((current) => {
            const currentIndex = FONT_SIZE_ORDER.indexOf(current);
            if (currentIndex > 0) {
                return FONT_SIZE_ORDER[currentIndex - 1];
            }
            return current;
        });
    };

    const resetFontSize = () => {
        setFontSizeState('base');
    };

    return (
        <FontSizeContext.Provider
            value={{
                fontSize,
                setFontSize,
                increaseFontSize,
                decreaseFontSize,
                resetFontSize,
            }}
        >
            {children}
        </FontSizeContext.Provider>
    );
}

export function useFontSize() {
    const context = useContext(FontSizeContext);
    if (!context) {
        throw new Error('useFontSize must be used within FontSizeProvider');
    }
    return context;
}
