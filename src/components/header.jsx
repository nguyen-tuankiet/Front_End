import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, Menu, X, Sun, Moon, Bell, User, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { apiService } from "@/services/api";
import {useAuth} from "@/components/Context/AuthContext.jsx";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [expandedCategory, setExpandedCategory] = useState(null);
  const [categoriesWithSubs, setCategoriesWithSubs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });
  const navRef = useRef(null);

  const navigate = useNavigate();
  const context = useAuth();

  // Fetch categories from API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setIsLoading(true);
        const data = await apiService.getCategories();

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
  }, []);

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
      "bg-white font-sans border-b border-gray-100 sticky top-0 z-20 transition-all duration-300",
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
              className="p-1.5 rounded-full transition-colors hover:bg-amber-300"
            >
              {isDarkMode ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
            </button>
            <button className="p-1.5 hover:bg-amber-300 rounded-full transition-colors">
              <Bell className="h-4 w-4" />
            </button>

              {context.isLoggedIn ?
                  <div className={cn("relative cursor-pointer group ")}>
                      <div
                          className="flex items-center gap-1.5  hover:bg-amber-300 p-1.5 rounded-2xl transition-colors ">
                          <span>{context.user.name}</span>
                      </div>

                      <div className={cn("absolute left-0 top-full mt-2 invisible opacity-0 group-hover:visible group-hover:opacity-100 z-50 transition-all ")}>
                          <Link to="/ca-nhan"   >Trang cá nhân</Link>
                      </div>

                  </div>

                  :
                  <Link to="/dang-nhap"
                        className="flex items-center gap-1.5  hover:bg-amber-300 p-1.5 rounded-2xl transition-colors">
                      <User className="h-4 w-4"/>
                      <span>Đăng nhập</span>
                  </Link>
              }


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

      {/* Row 3: Navigation (Desktop) - Hidden when collapsed */}
      <nav className={cn(
        "hidden lg:block border-b border-gray-100 transition-all duration-300",
        isCollapsed ? "max-h-0 opacity-0 overflow-hidden" : "opacity-100"
      )}>
        <div className="container mx-auto px-4">
          {/* Loading skeleton */}
          {isLoading ? (
            <div className="flex items-center justify-center gap-2 py-2">
              {[...Array(7)].map((_, i) => (
                <div key={i} className="h-6 w-20 bg-gray-200 rounded animate-pulse"></div>
              ))}
            </div>
          ) : (
          <>
          {/* All categories in one single row - no wrap */}
          <ul className="flex items-center justify-center gap-0 whitespace-nowrap overflow-x-auto scrollbar-hide" ref={navRef}>
            {/* Home icon */}
            <li className="relative shrink-0">
              <Link
                to="/"
                className="flex items-center px-2 py-2 text-primary hover:text-primary/80 transition-colors"
              >
                <Home className="h-5 w-5" />
              </Link>
            </li>
            {categoriesWithSubs.filter(cat => cat.slug !== "home").map((cat) => (
              <li 
                key={cat.slug} 
                className="relative shrink-0"
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
                  className="flex items-center gap-1 px-2 py-2 text-sm font-medium text-gray-600 hover:text-primary transition-colors"
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
                className="fixed bg-white border border-gray-100 shadow-xl z-[60] w-[400px]"
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
                    <h3 className="text-lg font-bold text-gray-800">{cat.name}</h3>
                  </div>
                  {/* Subcategories Grid - 2 columns */}
                  <div className="grid grid-cols-2 gap-x-12 gap-y-3 mb-4">
                    {cat.subs.map(sub => (
                      <Link
                        key={sub.slug}
                        to={sub.href}
                        className="text-sm text-gray-600 hover:text-primary transition-colors py-1"
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
                <div key={cat.slug}>
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
                    <div className="bg-gray-50 animate-in fade-in slide-in-from-top-2 duration-200">
                      {cat.subs.map(sub => (
                        <Link
                          key={sub.slug}
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
