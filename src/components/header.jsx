import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, Menu, X, ChevronDown, Sun, Moon, Bell, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { categories } from "@/data/categories";

// Build categoriesWithSubs from RSS data
const categoriesWithSubs = [
  { name: "Trang chủ", href: "/", subs: [] },
  ...categories.map(cat => ({
    name: cat.name,
    href: `/danh-muc/${cat.slug}`,
    subs: cat.subs ? cat.subs.map(sub => ({
      name: sub.name,
      href: `/danh-muc/${cat.slug}/${sub.slug}`,
    })) : [],
  })),
];

// Split categories for two-row nav
const navRow1 = categoriesWithSubs.slice(0, 13);
const navRow2 = categoriesWithSubs.slice(13);

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [expandedCategory, setExpandedCategory] = useState(null);

  const navigate = useNavigate();

  // Scroll detection for collapsing header
  useEffect(() => {
    const handleScroll = () => {
      setIsCollapsed(window.scrollY > 80);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
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

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <header className={cn(
      "bg-white font-sans border-b border-gray-100 sticky top-0 z-50 transition-all duration-300",
      isCollapsed && "shadow-md"
    )}>
      {/* Row 1: Top Utility Bar - Hidden when collapsed */}
      <div className={cn(
        "border-b border-gray-100 overflow-hidden transition-all duration-300",
        isCollapsed ? "max-h-0 opacity-0" : "max-h-12 opacity-100"
      )}>
        <div className="container mx-auto px-6 h-9 flex items-center justify-between text-xs text-gray-500">
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span>Thứ Hai, 01/12/2025</span>
            <span className="text-gray-300">|</span>
            <span>TP. Hồ Chí Minh: 29°C</span>
          </div>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <button
              onClick={toggleDarkMode}
              className="p-1.5 hover:bg-gray-100 rounded-full transition-colors"
            >
              {isDarkMode ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
            </button>
            <button className="p-1.5 hover:bg-gray-100 rounded-full transition-colors">
              <Bell className="h-4 w-4" />
            </button>
            <Link to="/dang-nhap" className="flex items-center gap-1.5 hover:text-primary transition-colors">
              <User className="h-4 w-4" />
              <span>Đăng nhập</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Row 2: Logo & Search */}
      <div className="border-b border-gray-100">
        <div className={cn(
          "container mx-auto px-4 flex items-center justify-between transition-all duration-300",
          isCollapsed ? "py-1.5" : "py-3"
        )}>
          {/* Left side: Menu Button + Logo */}
          <div className="flex items-center gap-2">
            {/* Menu Button - Shows on mobile always, shows on desktop only when collapsed */}
            <button
              className={cn(
                "p-2 -ml-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-all duration-300",
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
                "text-gray-400 tracking-[0.15em] uppercase transition-all duration-300",
                isCollapsed ? "text-[7px]" : "text-[9px]"
              )}>
                Báo điện tử Việt Nam
              </span>
            </Link>
          </div>

          {/* Right side icons (visible when collapsed) + Search */}
          <div className="flex items-center gap-2">
            {/* Show utility icons when collapsed */}
            {isCollapsed && (
              <div className="hidden sm:flex items-center gap-2 mr-2">
                <button
                  onClick={toggleDarkMode}
                  className="p-1.5 hover:bg-gray-100 rounded-full transition-colors text-gray-500"
                >
                  {isDarkMode ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
                </button>
                <button className="p-1.5 hover:bg-gray-100 rounded-full transition-colors text-gray-500">
                  <Bell className="h-4 w-4" />
                </button>
              </div>
            )}

            {isSearchOpen && (
              <div className="flex items-center mr-2 animate-in fade-in slide-in-from-right-3 duration-200">
                <Input
                  className="w-48 md:w-64 h-8 text-sm rounded border-gray-200 focus-visible:ring-primary"
                  placeholder="Tìm kiếm..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={handleKeyPress}
                  autoFocus
                />
              </div>
            )}
            <button
              className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-600"
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

      {/* Row 3: Navigation (Desktop - 2 rows) - Hidden when collapsed */}
      <nav className={cn(
        "hidden lg:block border-b border-gray-100 overflow-hidden transition-all duration-300",
        isCollapsed ? "max-h-0 opacity-0" : "max-h-32 opacity-100"
      )}>
        <div className="container mx-auto px-4">
          {/* Nav Row 1 */}
          <ul className="flex items-center justify-center gap-0 border-b border-gray-50">
            {navRow1.map((cat, index) => (
              <li key={cat.name} className="relative group">
                <Link
                  to={cat.href}
                  className={cn(
                    "flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-600 hover:text-primary transition-colors",
                    index === 0 && "text-primary"
                  )}
                >
                  {cat.name}
                  {cat.subs.length > 0 && (
                    <ChevronDown className="h-3 w-3 text-gray-400 group-hover:text-primary transition-colors" />
                  )}
                </Link>

                {/* Dropdown */}
                {cat.subs.length > 0 && (
                  <div className="absolute left-0 top-full hidden group-hover:block bg-white border border-gray-100 shadow-lg rounded-b min-w-[180px] py-1 z-50">
                    {cat.subs.map(sub => (
                      <Link
                        key={sub.name}
                        to={sub.href}
                        className="block px-4 py-2 text-sm text-gray-600 hover:text-primary hover:bg-orange-50 transition-colors"
                      >
                        {sub.name}
                      </Link>
                    ))}
                  </div>
                )}
              </li>
            ))}
          </ul>

          {/* Nav Row 2 */}
          {navRow2.length > 0 && (
            <ul className="flex items-center justify-center gap-0">
              {navRow2.map((cat) => (
                <li key={cat.name} className="relative group">
                  <Link
                    to={cat.href}
                    className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-600 hover:text-primary transition-colors"
                  >
                    {cat.name}
                    {cat.subs.length > 0 && (
                      <ChevronDown className="h-3 w-3 text-gray-400 group-hover:text-primary transition-colors" />
                    )}
                  </Link>

                  {/* Dropdown */}
                  {cat.subs.length > 0 && (
                    <div className="absolute left-0 top-full hidden group-hover:block bg-white border border-gray-100 shadow-lg rounded-b min-w-[180px] py-1 z-50">
                      {cat.subs.map(sub => (
                        <Link
                          key={sub.name}
                          to={sub.href}
                          className="block px-4 py-2 text-sm text-gray-600 hover:text-primary hover:bg-orange-50 transition-colors"
                        >
                          {sub.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </nav>

      {/* Row 4: Hot News Ticker (Orange Bar) - Hidden when collapsed */}
      <div className={cn(
        "bg-primary text-white overflow-hidden transition-all duration-300",
        isCollapsed ? "max-h-0 opacity-0" : "max-h-12 opacity-100"
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
          <div className="fixed inset-y-0 left-0 w-[280px] bg-white shadow-2xl overflow-y-auto animate-in slide-in-from-left duration-300">
            <div className="p-4 border-b flex items-center justify-between">
              <span className="font-bold text-lg text-primary">MENU</span>
              <button onClick={() => setIsMenuOpen(false)} className="p-1 hover:bg-gray-100 rounded">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="py-2">
              {categoriesWithSubs.map((cat) => (
                <div key={cat.name}>
                  {/* Main category row */}
                  <div className="flex items-center border-b border-gray-50">
                    <Link
                      to={cat.href}
                      className="flex-1 px-4 py-3 font-medium text-gray-700 hover:text-primary hover:bg-orange-50"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {cat.name}
                    </Link>
                    {/* Expand button for categories with subs */}
                    {cat.subs && cat.subs.length > 0 && (
                      <button
                        className="p-3 text-gray-400 hover:text-primary hover:bg-orange-50 transition-colors"
                        onClick={() => setExpandedCategory(expandedCategory === cat.name ? null : cat.name)}
                      >
                        <ChevronDown className={cn(
                          "h-4 w-4 transition-transform duration-200",
                          expandedCategory === cat.name && "rotate-180"
                        )} />
                      </button>
                    )}
                  </div>
                  {/* Sub-categories - only show when expanded */}
                  {cat.subs && expandedCategory === cat.name && (
                    <div className="bg-gray-50 animate-in fade-in slide-in-from-top-2 duration-200">
                      {cat.subs.map(sub => (
                        <Link
                          key={sub.name}
                          to={sub.href}
                          className="block px-6 py-2.5 text-sm text-gray-500 hover:text-primary hover:bg-orange-50 transition-colors"
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
