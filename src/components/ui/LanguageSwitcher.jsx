import { useState, useRef, useEffect } from 'react';
import { Globe, ChevronDown, Check } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';

/**
 * Language Switcher component with dropdown
 * @param {Object} props
 * @param {string} props.variant - 'dropdown' | 'toggle' | 'minimal' | 'flags'
 * @param {string} props.className - Additional CSS classes
 */
export function LanguageSwitcher({ variant = 'dropdown', className }) {
  const { language, setLanguage, languages, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const currentLanguage = languages.find((l) => l.code === language);

  // Toggle variant - simple button to switch between languages
  if (variant === 'toggle') {
    return (
      <button
        onClick={() => setLanguage(language === 'vi' ? 'en' : 'vi')}
        className={cn(
          'flex items-center gap-1.5 px-2 py-1 rounded-md text-sm',
          'hover:bg-accent transition-colors',
          'text-muted-foreground hover:text-foreground',
          className
        )}
        title={t('language.selectLanguage')}
      >
        <span className="text-base">{currentLanguage?.flag}</span>
        <span className="font-medium">{language.toUpperCase()}</span>
      </button>
    );
  }

  // Minimal variant - just flag
  if (variant === 'minimal') {
    return (
      <button
        onClick={() => setLanguage(language === 'vi' ? 'en' : 'vi')}
        className={cn(
          'flex items-center gap-1.5 p-1.5 rounded-full',
          'hover:bg-accent transition-all duration-200',
          className
        )}
        title={t('language.selectLanguage')}
      >
        <span className="text-lg leading-none">{currentLanguage?.flag}</span>
      </button>
    );
  }

  // Flags variant - shows both flags with active indicator
  if (variant === 'flags') {
    return (
      <div className={cn('flex items-center gap-1 bg-muted rounded-full p-1', className)}>
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => setLanguage(lang.code)}
            className={cn(
              'flex items-center justify-center w-8 h-8 rounded-full transition-all duration-200',
              language === lang.code
                ? 'bg-background shadow-sm scale-110'
                : 'hover:bg-background/50 opacity-60 hover:opacity-100'
            )}
            title={lang.name}
          >
            <span className="text-xl leading-none">{lang.flag}</span>
          </button>
        ))}
      </div>
    );
  }

  // Dropdown variant (default)
  return (
    <div ref={dropdownRef} className={cn('relative', className)}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'flex items-center gap-1.5 px-2 py-1.5 rounded-md text-sm',
          'hover:bg-accent transition-colors',
          'text-muted-foreground hover:text-foreground',
          isOpen && 'bg-accent'
        )}
      >
        <Globe className="h-4 w-4" />
        <span className="hidden sm:inline">{currentLanguage?.name}</span>
        <span className="sm:hidden">{language.toUpperCase()}</span>
        <ChevronDown className={cn(
          'h-3 w-3 transition-transform',
          isOpen && 'rotate-180'
        )} />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-1 w-40 bg-card rounded-lg shadow-lg border border-border py-1 z-50">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => {
                setLanguage(lang.code);
                setIsOpen(false);
              }}
              className={cn(
                'flex items-center gap-2 w-full px-3 py-2 text-sm text-left',
                'hover:bg-muted transition-colors',
                language === lang.code && 'bg-muted/50'
              )}
            >
              <span className="text-base">{lang.flag}</span>
              <span className="flex-1">{lang.name}</span>
              {language === lang.code && (
                <Check className="h-4 w-4 text-primary" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default LanguageSwitcher;
