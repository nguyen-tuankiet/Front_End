import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { translations, defaultLanguage, languages } from '@/locales';

const LanguageContext = createContext(undefined);

const STORAGE_KEY = 'app_language';

export function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState(() => {
    // Get saved language from localStorage or use default
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved && translations[saved]) {
        return saved;
      }
    }
    return defaultLanguage;
  });

  // Save language preference to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, language);
    // Update document lang attribute
    document.documentElement.lang = language;
  }, [language]);

  const setLanguage = useCallback((lang) => {
    if (translations[lang]) {
      setLanguageState(lang);
    } else {
      console.warn(`Language "${lang}" is not supported`);
    }
  }, []);

  const toggleLanguage = useCallback(() => {
    setLanguageState((prev) => (prev === 'vi' ? 'en' : 'vi'));
  }, []);

  // Translation function with nested key support (e.g., "header.login")
  const t = useCallback((key, params = {}) => {
    const keys = key.split('.');
    let value = translations[language];

    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        console.warn(`Translation key "${key}" not found for language "${language}"`);
        return key; // Return key if translation not found
      }
    }

    // Handle string interpolation with params
    if (typeof value === 'string' && Object.keys(params).length > 0) {
      return value.replace(/\{\{(\w+)\}\}/g, (match, paramKey) => {
        return params[paramKey] !== undefined ? params[paramKey] : match;
      });
    }

    return value;
  }, [language]);

  const value = {
    language,
    setLanguage,
    toggleLanguage,
    t,
    languages,
    isVietnamese: language === 'vi',
    isEnglish: language === 'en',
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

// Alias for convenience
export const useTranslation = useLanguage;

export default LanguageContext;
