import { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Search, Menu, X, Sun, Moon, Bell, User, Home, ChevronDown, Bookmark, Headphones, Megaphone, Newspaper, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { apiService } from "@/services/api";
import {useAuth} from "@/components/Context/AuthContext.jsx";
import { useTheme } from "@/components/ThemeToggle.jsx";
import { useLanguage } from "@/contexts/LanguageContext.jsx";
import { LanguageSwitcher } from "@/components/ui/LanguageSwitcher.jsx";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { isDarkMode, toggleTheme } = useTheme();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [expandedCategory, setExpandedCategory] = useState(null);
  const [categoriesWithSubs, setCategoriesWithSubs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [userMenuPosition, setUserMenuPosition] = useState({ top: 0, right: 0 });
  const [currentDate, setCurrentDate] = useState(new Date());
  const navRef = useRef(null);
  const userMenuRef = useRef(null);
  const userButtonRef = useRef(null);

  const navigate = useNavigate();
  const location = useLocation();
  const context = useAuth();
  const { t, language } = useLanguage();

  // Format date based on current language
  const formatDate = (date) => {
    if (language === 'vi') {
      const days = ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'];
      const dayName = days[date.getDay()];
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = date.getFullYear();
      return `${dayName}, ${day}/${month}/${year}`;
    } else {
      const options = { weekday: 'long', year: 'numeric', month: '2-digit', day: '2-digit' };
      return date.toLocaleDateString('en-US', options);
    }
  };

  // Xác định category hiện tại dựa trên URL
  const getCurrentCategorySlug = () => {
    const path = location.pathname;
    if (path === '/' || path === '/trang-chu') return 'home';
    // Match /danh-muc/category hoặc /danh-muc/category/subcategory
    const match = path.match(/^\/danh-muc\/([^/]+)/);
    return match ? match[1] : null;
  };

  const currentCategorySlug = getCurrentCategorySlug();

  // Fetch categories from API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setIsLoading(true);
        const data = await apiService.getCategories(language);

        // Transform API data to match component format
        const transformedCategories = data.map(cat => ({
          name: cat.name,
          slug: cat.slug,
          href: cat.slug === "home" ? "/" : `/danh-muc/${cat.slug}`,
          subs: cat.subCategories ? cat.subCategories.map(sub => ({
            name: sub.name,
            slug: sub.slug,
            href: `/danh-muc/${cat.slug}/${sub.slug}`,
          })) : [],
        }));

        setCategoriesWithSubs(transformedCategories);
      } catch (error) {
        console.error("Error fetching categories:", error);
        setCategoriesWithSubs([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, [language]);

  // Scroll detection for collapsing header with debounce
  useEffect(() => {
  let ticking = false;
  let lastScrollY = window.scrollY;
  
  const handleScroll = () => {
    const currentScrollY = window.scrollY;
    
    if (!ticking) {
      window.requestAnimationFrame(() => {
        const scrollingDown = currentScrollY > lastScrollY;
        
        if (scrollingDown && currentScrollY > 100) {
          setIsCollapsed(true);
        } else if (!scrollingDown && currentScrollY < 5) {
          setIsCollapsed(false);
        }
        
        lastScrollY = currentScrollY;
        ticking = false;
      });
      ticking = true;
    }
  };

  window.addEventListener("scroll", handleScroll, { passive: true });
  return () => window.removeEventListener("scroll", handleScroll);
}, []);

  // Click outside to close user menu
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/tim-kiem?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
      setSearchQuery("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <header className={cn(
      "bg-background font-sans border-b border-border sticky top-0 z-20",
      "transition-shadow duration-300",
      isCollapsed && "shadow-md"
    )}>
      {/* Row 1: Top Utility Bar - Hidden when collapsed */}
      <div className={cn(
        "border-b border-border overflow-hidden transition-all duration-300 ease-out",
        isCollapsed ? "h-0 opacity-0" : "h-9 opacity-100"
      )}>
        <div className="container mx-auto px-6 h-9 flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span>{formatDate(currentDate)}</span>
            <span className="text-muted-foreground/50">|</span>
            <span>{t('header.cityWeather')}: 29°C</span>
              <span className="text-muted-foreground/50">|</span>
              <a href="/tien-ich/thoi-tiet">{t('header.utilities')}</a>
              <span className="text-muted-foreground/50">|</span>
              <Link to="/lien-he" className="hover:text-primary transition-colors">Liên hệ</Link>
          </div>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <LanguageSwitcher variant="minimal" />
            <button
              onClick={toggleTheme}
              className="p-1.5 rounded-full transition-colors hover:bg-accent"
            >
              {isDarkMode ? <Moon className="h-4 w-4 text-blue-400" /> : <Sun className="h-4 w-4 text-amber-500" />}
            </button>
            <button className="p-1.5 hover:bg-accent rounded-full transition-colors">
              <Bell className="h-4 w-4" />
            </button>

              {context.isLoggedIn ?
                  <div ref={userMenuRef} className="relative">
                      <button
                          ref={userButtonRef}
                          onClick={() => {
                              if (!isUserMenuOpen && userButtonRef.current) {
                                  const rect = userButtonRef.current.getBoundingClientRect();
                                  setUserMenuPosition({
                                      top: rect.bottom + 8,
                                      right: window.innerWidth - rect.right
                                  });
                              }
                              setIsUserMenuOpen(!isUserMenuOpen);
                          }}
                          className="flex items-center gap-1.5 hover:bg-accent p-1.5 rounded-2xl transition-colors">
                          <div className="w-6 h-6 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center text-red-500 text-xs font-semibold">
                              {context.user.name?.charAt(0).toUpperCase() || 'A'}
                          </div>
                          <span>{context.user.name}</span>
                      </button>

                      {/* Dropdown Menu */}
                      {isUserMenuOpen && (
                          <div 
                              className="fixed w-48 bg-card rounded-lg shadow-lg border border-border py-2 z-[9999]"
                              style={{ top: userMenuPosition.top, right: userMenuPosition.right }}>
                              <Link
                                  to="/ho-so"
                                  onClick={() => setIsUserMenuOpen(false)}
                                  className="flex items-center gap-3 px-4 py-2.5 text-foreground hover:bg-muted transition-colors"
                              >
                                  <User className="h-4 w-4 text-muted-foreground" />
                                  <span className="text-sm">{t('header.profile')}</span>
                              </Link>
                              <Link
                                  to="/bai-viet-da-luu"
                                  onClick={() => setIsUserMenuOpen(false)}
                                  className="flex items-center gap-3 px-4 py-2.5 text-foreground hover:bg-muted transition-colors"
                              >
                                  <Bookmark className="h-4 w-4 text-muted-foreground" />
                                  <span className="text-sm">{t('header.savedArticles')}</span>
                              </Link>
                              <Link
                                  to="/podcast"
                                  onClick={() => setIsUserMenuOpen(false)}
                                  className="flex items-center gap-3 px-4 py-2.5 text-foreground hover:bg-muted transition-colors"
                              >
                                  <Headphones className="h-4 w-4 text-muted-foreground" />
                                  <span className="text-sm">{t('header.podcast')}</span>
                              </Link>
                              <Link
                                  to="/quang-cao"
                                  onClick={() => setIsUserMenuOpen(false)}
                                  className="flex items-center gap-3 px-4 py-2.5 text-foreground hover:bg-muted transition-colors"
                              >
                                  <Megaphone className="h-4 w-4 text-muted-foreground" />
                                  <span className="text-sm">{t('header.advertising')}</span>
                              </Link>
                              <Link
                                  to="/dat-bao"
                                  onClick={() => setIsUserMenuOpen(false)}
                                  className="flex items-center gap-3 px-4 py-2.5 text-foreground hover:bg-muted transition-colors"
                              >
                                  <Newspaper className="h-4 w-4 text-muted-foreground" />
                                  <span className="text-sm">{t('header.orderNewspaper')}</span>
                              </Link>
                              <div className="border-t border-border my-1"></div>
                              <button
                                  onClick={() => {
                                      context.logout();
                                      setIsUserMenuOpen(false);
                                  }}
                                  className="flex items-center gap-3 px-4 py-2.5 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors w-full"
                              >
                                  <LogOut className="h-4 w-4" />
                                  <span className="text-sm">{t('header.logout')}</span>
                              </button>
                          </div>
                      )}
                  </div>

                  :
                  <Link to="/dang-nhap"
                        className="flex items-center gap-1.5 hover:bg-accent p-1.5 rounded-2xl transition-colors">
                      <User className="h-4 w-4"/>
                      <span>{t('header.login')}</span>
                  </Link>
              }


          </div>
        </div>
      </div>

      {/* Row 2: Logo & Search */}
      <div className="border-b border-border">
        <div className={cn(
          "container mx-auto px-4 flex items-center justify-between transition-all duration-300",
          isCollapsed ? "py-1.5" : "py-3"
        )}>
          {/* Left side: Menu Button + Logo */}
          <div className="flex items-center gap-2">
            {/* Menu Button - Shows on mobile always, shows on desktop only when collapsed */}
            <button
              className={cn(
                "p-2 -ml-2 text-foreground hover:bg-muted rounded-lg transition-all duration-300",
                isCollapsed ? "block" : "lg:hidden"
              )}
              onClick={() => {
                setIsMenuOpen(!isMenuOpen);
                setExpandedCategory(null); // Reset expanded category when opening menu
              }}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>

            {/* Logo */}
            <Link to="/" className="flex flex-col items-start group">
              <h1 className={cn(
                "font-extrabold tracking-tight leading-none transition-all duration-300",
                isCollapsed ? "text-xl md:text-2xl" : "text-2xl md:text-3xl"
              )}>
                <span className="text-primary">TIN</span>
                <span className="text-secondary"> TỨC</span>
              </h1>
              <span className={cn(
                "text-muted-foreground tracking-[0.15em] uppercase transition-all duration-300",
                isCollapsed ? "text-[7px]" : "text-[9px]"
              )}>
                {t('footer.vietnamNewspaper')}
              </span>
            </Link>
          </div>

          {/* Right side icons (visible when collapsed) + Search */}
          <div className="flex items-center gap-2">
            {/* Show utility icons when collapsed */}
            {isCollapsed && (
              <div className="hidden sm:flex items-center gap-2 mr-2">
                <LanguageSwitcher variant="minimal" />
                <button
                  onClick={toggleTheme}
                  className="p-1.5 hover:bg-muted rounded-full transition-colors text-muted-foreground"
                >
                  {isDarkMode ? <Moon className="h-4 w-4 text-blue-400" /> : <Sun className="h-4 w-4 text-amber-500" />}
                </button>
                <button className="p-1.5 hover:bg-muted rounded-full transition-colors text-muted-foreground">
                  <Bell className="h-4 w-4" />
                </button>
                {context.isLoggedIn ? (
                  <div ref={userMenuRef} className="relative">
                    <button
                      ref={userButtonRef}
                      onClick={() => {
                        if (!isUserMenuOpen && userButtonRef.current) {
                          const rect = userButtonRef.current.getBoundingClientRect();
                          setUserMenuPosition({
                            top: rect.bottom + 8,
                            right: window.innerWidth - rect.right
                          });
                        }
                        setIsUserMenuOpen(!isUserMenuOpen);
                      }}
                      className="flex items-center gap-1.5 hover:bg-muted p-1.5 rounded-full transition-colors"
                    >
                      <div className="w-6 h-6 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center text-red-500 text-xs font-semibold">
                        {context.user.name?.charAt(0).toUpperCase() || 'A'}
                      </div>
                    </button>
                    {isUserMenuOpen && (
                      <div 
                        className="fixed w-48 bg-card rounded-lg shadow-lg border border-border py-2 z-[9999]"
                        style={{ top: userMenuPosition.top, right: userMenuPosition.right }}>
                        <Link
                          to="/ho-so"
                          onClick={() => setIsUserMenuOpen(false)}
                          className="flex items-center gap-3 px-4 py-2.5 text-foreground hover:bg-muted transition-colors"
                        >
                          <User className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{t('header.profile')}</span>
                        </Link>
                        <Link
                          to="/bai-viet-da-luu"
                          onClick={() => setIsUserMenuOpen(false)}
                          className="flex items-center gap-3 px-4 py-2.5 text-foreground hover:bg-muted transition-colors"
                        >
                          <Bookmark className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{t('header.savedArticles')}</span>
                        </Link>
                        <Link
                          to="/podcast"
                          onClick={() => setIsUserMenuOpen(false)}
                          className="flex items-center gap-3 px-4 py-2.5 text-foreground hover:bg-muted transition-colors"
                        >
                          <Headphones className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{t('header.podcast')}</span>
                        </Link>
                        <Link
                          to="/quang-cao"
                          onClick={() => setIsUserMenuOpen(false)}
                          className="flex items-center gap-3 px-4 py-2.5 text-foreground hover:bg-muted transition-colors"
                        >
                          <Megaphone className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{t('header.advertising')}</span>
                        </Link>
                        <Link
                          to="/dat-bao"
                          onClick={() => setIsUserMenuOpen(false)}
                          className="flex items-center gap-3 px-4 py-2.5 text-foreground hover:bg-muted transition-colors"
                        >
                          <Newspaper className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{t('header.orderNewspaper')}</span>
                        </Link>
                        <div className="border-t border-border my-1"></div>
                        <button
                          onClick={() => {
                            context.logout();
                            setIsUserMenuOpen(false);
                          }}
                          className="flex items-center gap-3 px-4 py-2.5 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors w-full"
                        >
                          <LogOut className="h-4 w-4" />
                          <span className="text-sm">{t('header.logout')}</span>
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <Link to="/dang-nhap" className="p-1.5 hover:bg-muted rounded-full transition-colors text-muted-foreground">
                    <User className="h-4 w-4" />
                  </Link>
                )}
              </div>
            )}

            {isSearchOpen && (
              <div className="flex items-center mr-2 animate-in fade-in slide-in-from-right-3 duration-200">
                <Input
                  className="w-48 md:w-64 h-8 text-sm rounded border-border focus-visible:ring-primary"
                  placeholder={t('header.searchPlaceholder')}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={handleKeyPress}
                  autoFocus
                />
              </div>
            )}
            <button
              className="p-2 hover:bg-muted rounded-full transition-colors text-muted-foreground"
              onClick={() => {
                if (isSearchOpen && searchQuery.trim()) {
                  handleSearch();
                } else {
                  setIsSearchOpen(!isSearchOpen);
                }
              }}
            >
              <Search className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Row 3: Navigation (Desktop) - Hidden when collapsed */}
      <nav className={cn(
        "hidden lg:block border-b border-border overflow-hidden transition-all duration-300 ease-out",
        isCollapsed ? "h-0 opacity-0" : "h-auto opacity-100"
      )}>
        <div className="container mx-auto px-4">
          {/* Loading skeleton */}
          {isLoading ? (
            <div className="flex items-center justify-center gap-2 py-2">
              {[...Array(7)].map((_, i) => (
                <div key={i} className="h-6 w-20 bg-muted rounded animate-pulse"></div>
              ))}
            </div>
          ) : (
          <>
          {/* All categories in one single row - no wrap */}
          <ul className="flex items-center justify-center gap-0 whitespace-nowrap overflow-x-auto scrollbar-hide" ref={navRef}>
            {/* Home icon */}
            <li className="shrink-0">
              <Link
                to="/"
                className={cn(
                  "flex items-center px-2 py-2.5 transition-colors",
                  (currentCategorySlug === 'home' || currentCategorySlug === null && location.pathname === '/')
                    ? "text-primary border-b-2 border-primary -mb-[2px]"
                    : "text-muted-foreground hover:text-primary"
                )}
              >
                <Home className="h-5 w-5" />
              </Link>
            </li>
            {categoriesWithSubs.filter(cat => cat.slug !== "home").map((cat) => (
              <li
                key={cat.slug}
                className="shrink-0"
                onMouseEnter={(e) => {
                  if (cat.subs.length > 0) {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const dropdownWidth = 400;
                    const margin = 20; // Khoảng cách với biên
                    let left = rect.left;
                    // Điều chỉnh nếu dropdown tràn ra ngoài viewport bên phải
                    if (left + dropdownWidth > window.innerWidth - margin) {
                      left = window.innerWidth - dropdownWidth - margin;
                    }
                    // Điều chỉnh nếu dropdown tràn ra ngoài viewport bên trái
                    if (left < margin) {
                      left = margin;
                    }
                    setDropdownPosition({
                      top: rect.bottom,
                      left: left
                    });
                    setHoveredCategory(cat.slug);
                  }
                }}
                onMouseLeave={() => setHoveredCategory(null)}
              >
                <Link
                  to={cat.href}
                  className={cn(
                    "flex items-center gap-1 px-2 py-2.5 text-sm font-medium transition-colors",
                    currentCategorySlug === cat.slug
                      ? "text-primary border-b-2 border-primary -mb-[2px]"
                      : "text-muted-foreground hover:text-primary"
                  )}
                >
                  {cat.name}
                </Link>
              </li>
            ))}
          </ul>

          {/* Fixed Dropdown - renders outside the scrollable container */}
          {categoriesWithSubs.filter(cat => cat.slug !== "home" && cat.subs.length > 0).map((cat) => (
            hoveredCategory === cat.slug && (
              <div
                key={`dropdown-${cat.slug}`}
                className="fixed bg-card border border-border shadow-xl z-[60] w-[400px]"
                style={{
                  top: dropdownPosition.top,
                  left: dropdownPosition.left,
                }}
                onMouseEnter={() => setHoveredCategory(cat.slug)}
                onMouseLeave={() => setHoveredCategory(null)}
              >
                <div className="p-6">
                  {/* Category Title with orange bar */}
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-1 h-6 bg-primary rounded"></div>
                    <h3 className="text-lg font-bold text-foreground">{cat.name}</h3>
                  </div>
                  {/* Subcategories Grid - 2 columns */}
                  <div className="grid grid-cols-2 gap-x-12 gap-y-3 mb-4">
                    {cat.subs.map(sub => (
                      <Link
                        key={sub.slug}
                        to={sub.href}
                        className="text-sm text-muted-foreground hover:text-primary transition-colors py-1"
                      >
                        {sub.name}
                      </Link>
                    ))}
                  </div>
                  {/* View all link */}
                  <Link
                    to={cat.href}
                    className="inline-flex items-center text-sm text-primary hover:text-primary/80 font-medium mt-2"
                  >
                    Xem tất cả {cat.name} →
                  </Link>
                </div>
              </div>
            )
          ))}
          </>
          )}
        </div>
      </nav>

      {/* Row 4: Hot News Ticker (Orange Bar) - Hidden when collapsed */}
      <div className={cn(
        "bg-primary text-white overflow-hidden transition-all duration-300 ease-out",
        isCollapsed ? "h-0 opacity-0" : "h-12 opacity-100"
      )}>
        <div className="container mx-auto px-4 py-1.5 flex items-center text-sm">
          <span className="bg-red-700 px-2 py-0.5 rounded text-xs font-bold mr-4 shrink-0 uppercase">
            Tin Nóng
          </span>
          <div className="overflow-hidden relative flex-1">
            <div className="animate-marquee whitespace-nowrap flex items-center gap-4">
              <span>Cầu thủ Lào gặp chấn thương nặng</span>
              <span className="text-white/60">•</span>
              <span>Học sinh Huế hào hứng trải nghiệm 'Hạo khí Cần vương'</span>
              <span className="text-white/60">•</span>
              <span>Khởi nghĩa Hòn Khoai, mốc son lịch sử của tỉnh Cà Mau</span>
              <span className="text-white/60">•</span>
              <span>Đường phố</span>
            </div>
          </div>
        </div>
      </div>

      {/* Sidebar Menu - Works on both mobile and desktop when collapsed */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50">
          <div className="fixed inset-0 bg-black/50" onClick={() => setIsMenuOpen(false)} />
          <div className="fixed inset-y-0 left-0 w-[280px] bg-card shadow-2xl overflow-y-auto animate-in slide-in-from-left duration-300">
            <div className="p-4 border-b border-border flex items-center justify-between">
              <span className="font-bold text-lg text-primary">MENU</span>
              <button onClick={() => setIsMenuOpen(false)} className="p-1 hover:bg-muted rounded">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="py-2">
              {categoriesWithSubs.map((cat) => (
                <div key={cat.slug}>
                  {/* Main category row */}
                  <div className="flex items-center border-b border-border/50">
                    <Link
                      to={cat.href}
                      className={cn(
                        "flex-1 px-4 py-3 font-medium hover:text-primary hover:bg-primary/10",
                        currentCategorySlug === cat.slug
                          ? "text-primary bg-primary/10 border-l-4 border-primary"
                          : "text-foreground"
                      )}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {cat.name}
                    </Link>
                    {/* Expand button for categories with subs */}
                    {cat.subs && cat.subs.length > 0 && (
                      <button
                        className="p-3 text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
                        onClick={() => setExpandedCategory(expandedCategory === cat.slug ? null : cat.slug)}
                      >
                        <ChevronDown className={cn(
                          "h-4 w-4 transition-transform duration-200",
                          expandedCategory === cat.slug && "rotate-180"
                        )} />
                      </button>
                    )}
                  </div>
                  {/* Sub-categories - only show when expanded */}
                  {cat.subs && expandedCategory === cat.slug && (
                    <div className="bg-muted/50 animate-in fade-in slide-in-from-top-2 duration-200">
                      {cat.subs.map(sub => (
                        <Link
                          key={sub.slug}
                          to={sub.href}
                          className="block px-6 py-2.5 text-sm text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          • {sub.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
