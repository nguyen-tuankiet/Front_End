import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, Menu, X, Bell, User, ChevronDown, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

import placeholderImg from "@/assets/react.svg";

const categoriesWithSubs = [
  { name: "Trang chủ", href: "/", subs: [], featured: null },
  {
    name: "Chính trị",
    href: "/danh-muc/chinh-tri",
    subs: [
      { name: "Đảng - Nhà nước", href: "/danh-muc/chinh-tri/dang-nha-nuoc" },
      { name: "Quốc hội", href: "/danh-muc/chinh-tri/quoc-hoi" },
      { name: "Chính sách", href: "/danh-muc/chinh-tri/chinh-sach" },
      { name: "Đối ngoại", href: "/danh-muc/chinh-tri/doi-ngoai" },
    ],
    featured: {
      title: "Thủ tướng chỉ đạo đẩy mạnh cải cách hành chính",
      image: placeholderImg,
      category: "Chính trị",
    },
  },
  {
    name: "Thời sự",
    href: "/danh-muc/thoi-su",
    subs: [
      { name: "Phóng sự", href: "/danh-muc/thoi-su/phong-su" },
      { name: "Điều tra", href: "/danh-muc/thoi-su/dieu-tra" },
      { name: "Góc nhìn", href: "/danh-muc/thoi-su/goc-nhin" },
      { name: "An ninh trật tự", href: "/danh-muc/thoi-su/an-ninh-trat-tu" },
    ],
    featured: {
      title: "TP.HCM triển khai kế hoạch phát triển kinh tế 2025",
      image: placeholderImg,
      category: "Thời sự",
    },
  },
  {
    name: "Thế giới",
    href: "/danh-muc/the-gioi",
    subs: [
      { name: "Châu Á", href: "/danh-muc/the-gioi/chau-a" },
      { name: "Châu Âu", href: "/danh-muc/the-gioi/chau-au" },
      { name: "Châu Mỹ", href: "/danh-muc/the-gioi/chau-my" },
      { name: "Quân sự", href: "/danh-muc/the-gioi/quan-su" },
      { name: "Hồ sơ", href: "/danh-muc/the-gioi/ho-so" },
    ],
    featured: {
      title: "Hội nghị thượng đỉnh G20 thảo luận vấn đề khí hậu",
      image: placeholderImg,
      category: "Thế giới",
    },
  },
  {
    name: "Kinh tế",
    href: "/danh-muc/kinh-te",
    subs: [
      { name: "Tài chính", href: "/danh-muc/kinh-te/tai-chinh" },
      { name: "Chứng khoán", href: "/danh-muc/kinh-te/chung-khoan" },
      { name: "Bất động sản", href: "/danh-muc/kinh-te/bat-dong-san" },
      { name: "Doanh nghiệp", href: "/danh-muc/kinh-te/doanh-nghiep" },
      { name: "Khởi nghiệp", href: "/danh-muc/kinh-te/khoi-nghiep" },
    ],
    featured: {
      title: "Thị trường chứng khoán tăng điểm mạnh nhất năm",
      image: placeholderImg,
      category: "Kinh tế",
    },
  },
  {
    name: "Đời sống",
    href: "/danh-muc/doi-song",
    subs: [
      { name: "Gia đình", href: "/danh-muc/doi-song/gia-dinh" },
      { name: "Tình yêu", href: "/danh-muc/doi-song/tinh-yeu" },
      { name: "Làm đẹp", href: "/danh-muc/doi-song/lam-dep" },
      { name: "Ẩm thực", href: "/danh-muc/doi-song/am-thuc" },
    ],
    featured: null,
  },
  {
    name: "Sức khỏe",
    href: "/danh-muc/suc-khoe",
    subs: [
      { name: "Y tế", href: "/danh-muc/suc-khoe/y-te" },
      { name: "Dinh dưỡng", href: "/danh-muc/suc-khoe/dinh-duong" },
      { name: "Làm đẹp", href: "/danh-muc/suc-khoe/lam-dep" },
      { name: "Giới tính", href: "/danh-muc/suc-khoe/gioi-tinh" },
    ],
    featured: null,
  },
  {
    name: "Giới trẻ",
    href: "/danh-muc/gioi-tre",
    subs: [
      { name: "Sống trẻ", href: "/danh-muc/gioi-tre/song-tre" },
      { name: "Học đường", href: "/danh-muc/gioi-tre/hoc-duong" },
      { name: "Tình cảm", href: "/danh-muc/gioi-tre/tinh-cam" },
      { name: "Nghề nghiệp", href: "/danh-muc/gioi-tre/nghe-nghiep" },
    ],
    featured: null,
  },
  {
    name: "Giáo dục",
    href: "/danh-muc/giao-duc",
    subs: [
      { name: "Tuyển sinh", href: "/danh-muc/giao-duc/tuyen-sinh" },
      { name: "Du học", href: "/danh-muc/giao-duc/du-hoc" },
      { name: "Học bổng", href: "/danh-muc/giao-duc/hoc-bong" },
      { name: "Tin tức", href: "/danh-muc/giao-duc/tin-tuc" },
    ],
    featured: null,
  },
  {
    name: "Du lịch",
    href: "/danh-muc/du-lich",
    subs: [
      { name: "Điểm đến", href: "/danh-muc/du-lich/diem-den" },
      { name: "Ẩm thực", href: "/danh-muc/du-lich/am-thuc" },
      { name: "Khách sạn", href: "/danh-muc/du-lich/khach-san" },
      { name: "Kinh nghiệm", href: "/danh-muc/du-lich/kinh-nghiem" },
    ],
    featured: {
      title: "Top 10 điểm đến hot nhất mùa đông 2025",
      image: placeholderImg,
      category: "Du lịch",
    },
  },
  {
    name: "Văn hóa",
    href: "/danh-muc/van-hoa",
    subs: [
      { name: "Nghệ thuật", href: "/danh-muc/van-hoa/nghe-thuat" },
      { name: "Sách", href: "/danh-muc/van-hoa/sach" },
      { name: "Di sản", href: "/danh-muc/van-hoa/di-san" },
      { name: "Lễ hội", href: "/danh-muc/van-hoa/le-hoi" },
    ],
    featured: null,
  },
  {
    name: "Giải trí",
    href: "/danh-muc/giai-tri",
    subs: [
      { name: "Sao Việt", href: "/danh-muc/giai-tri/sao-viet" },
      { name: "Sao Quốc tế", href: "/danh-muc/giai-tri/sao-quoc-te" },
      { name: "Phim ảnh", href: "/danh-muc/giai-tri/phim-anh" },
      { name: "Âm nhạc", href: "/danh-muc/giai-tri/am-nhac" },
      { name: "Thời trang", href: "/danh-muc/giai-tri/thoi-trang" },
    ],
    featured: null,
  },
  {
    name: "Thể thao",
    href: "/danh-muc/the-thao",
    subs: [
      { name: "Bóng đá Việt Nam", href: "/danh-muc/the-thao/bong-da-viet-nam" },
      { name: "Bóng đá Quốc tế", href: "/danh-muc/the-thao/bong-da-quoc-te" },
      { name: "Tennis", href: "/danh-muc/the-thao/tennis" },
      { name: "Võ thuật", href: "/danh-muc/the-thao/vo-thuat" },
      { name: "Esports", href: "/danh-muc/the-thao/esports" },
    ],
    featured: {
      title: "Đội tuyển Việt Nam giành chiến thắng ấn tượng",
      image: placeholderImg,
      category: "Thể thao",
    },
  },
  {
    name: "Công nghệ",
    href: "/danh-muc/cong-nghe",
    subs: [
      { name: "Sản phẩm", href: "/danh-muc/cong-nghe/san-pham" },
      { name: "Di động", href: "/danh-muc/cong-nghe/di-dong" },
      { name: "Máy tính", href: "/danh-muc/cong-nghe/may-tinh" },
      { name: "Internet", href: "/danh-muc/cong-nghe/internet" },
      { name: "Game", href: "/danh-muc/cong-nghe/game" },
    ],
    featured: {
      title: "Apple ra mắt iPhone 17 với công nghệ AI đột phá",
      image: placeholderImg,
      category: "Công nghệ",
    },
  },
  {
    name: "Xe",
    href: "/danh-muc/xe",
    subs: [
      { name: "Ô tô", href: "/danh-muc/xe/o-to" },
      { name: "Xe máy", href: "/danh-muc/xe/xe-may" },
      { name: "Thị trường", href: "/danh-muc/xe/thi-truong" },
      { name: "Đánh giá", href: "/danh-muc/xe/danh-gia" },
    ],
    featured: null,
  },
  { name: "Video", href: "/danh-muc/video", subs: [], featured: null },
  {
    name: "Tiêu dùng",
    href: "/danh-muc/tieu-dung",
    subs: [
      { name: "Khuyến mãi", href: "/danh-muc/tieu-dung/khuyen-mai" },
      { name: "Đánh giá", href: "/danh-muc/tieu-dung/danh-gia" },
      { name: "Mua sắm", href: "/danh-muc/tieu-dung/mua-sam" },
    ],
    featured: null,
  },
  {
    name: "Thời trang",
    href: "/danh-muc/thoi-trang-tre",
    subs: [
      { name: "Xu hướng", href: "/danh-muc/thoi-trang-tre/xu-huong" },
      { name: "Làm đẹp", href: "/danh-muc/thoi-trang-tre/lam-dep" },
      { name: "Street style", href: "/danh-muc/thoi-trang-tre/street-style" },
    ],
    featured: null,
  },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedMobile, setExpandedMobile] = useState(null);
  const navigate = useNavigate();

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
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      {/* Top bar */}
      <div className="border-b border-gray-100">
        <div className="container mx-auto px-4 flex items-center justify-between py-2">
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <span>Thứ Hai, 01/12/2025</span>
            <span className="hidden sm:inline">|</span>
            <span className="hidden sm:inline">TP. Hồ Chí Minh: 29°C</span>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 hover:bg-gray-100 rounded-md transition-colors">
              <Sun className="h-4 w-4 text-gray-600" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-md transition-colors">
              <Bell className="h-4 w-4 text-gray-600" />
            </button>
            <Link to="/dang-nhap">
              <button className="hidden sm:flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded-md transition-colors">
                <User className="h-4 w-4 text-gray-600" />
                <span className="text-sm text-gray-700">Đăng nhập</span>
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="flex flex-col items-start">
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
                <span className="text-orange-600">TIN</span>
                <span className="text-gray-900"> TỨC</span>
              </h1>
              <span className="text-[10px] text-gray-500 tracking-widest uppercase">
                Báo điện tử Việt Nam
              </span>
            </div>
          </Link>

          {/* Search */}
          <div className="flex items-center gap-2">
            {isSearchOpen && (
              <Input
                placeholder="Tìm kiếm..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={handleKeyPress}
                className="w-48 md:w-64 animate-fade-in"
              />
            )}
            <button
              className="p-2 hover:bg-gray-100 rounded-md transition-colors"
              onClick={() => {
                if (isSearchOpen && searchQuery.trim()) {
                  handleSearch();
                } else {
                  setIsSearchOpen(!isSearchOpen);
                }
              }}
            >
              <Search className="h-5 w-5 text-gray-600" />
            </button>
          </div>
        </div>
      </div>


      {/* Navigation */}
      <nav className="border-t border-gray-100">
        <div className="container mx-auto px-4">
          {/* Desktop nav */}
          <ul className="hidden lg:flex items-center gap-1 py-0 flex-wrap justify-center">
            {categoriesWithSubs.map((cat, index) => (
              <li
                key={cat.name}
                className="relative group"
              >
                <Link
                  to={cat.href}
                  className={cn(
                    "flex items-center gap-1 px-3 py-3 text-sm hover:text-orange-600 transition-colors",
                    index === 0 ? "text-orange-600 font-medium" : "text-gray-700"
                  )}
                >
                  {cat.name}
                  {cat.subs.length > 0 && (
                    <ChevronDown className="h-3 w-3" />
                  )}
                </Link>

                {/* Simple Dropdown */}
                {cat.subs.length > 0 && (
                  <div className="absolute left-0 top-full hidden group-hover:block bg-white border border-gray-200 rounded-md shadow-lg py-2 min-w-[200px] z-50">
                    {cat.subs.map((sub) => (
                      <Link
                        key={sub.name}
                        to={sub.href}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-orange-600 transition-colors"
                      >
                        {sub.name}
                      </Link>
                    ))}
                  </div>
                )}
              </li>
            ))}
          </ul>

          {/* Mobile nav toggle */}
          <div className="lg:hidden py-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="w-full justify-between"
            >
              <span>Menu</span>
              {isMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </Button>
          </div>


          {/* Mobile nav with expandable submenus */}
          {isMenuOpen && (
            <ul className="lg:hidden pb-4 space-y-1 animate-fade-in max-h-[60vh] overflow-y-auto">
              {categoriesWithSubs.map((cat, index) => (
                <li key={cat.name}>
                  {cat.subs.length > 0 ? (
                    <div>
                      <button
                        onClick={() =>
                          setExpandedMobile(expandedMobile === cat.name ? null : cat.name)
                        }
                        className={cn(
                          "w-full flex items-center justify-between px-4 py-2 rounded-lg transition-colors text-sm",
                          index === 0
                            ? "bg-orange-50 text-orange-600 font-medium"
                            : "hover:bg-gray-50 text-gray-700"
                        )}
                      >
                        <Link
                          to={cat.href}
                          onClick={(e) => {
                            e.stopPropagation();
                            setIsMenuOpen(false);
                          }}
                        >
                          {cat.name}
                        </Link>
                        <ChevronDown
                          className={cn(
                            "h-4 w-4 transition-transform",
                            expandedMobile === cat.name && "rotate-180"
                          )}
                        />
                      </button>
                      {expandedMobile === cat.name && (
                        <ul className="ml-4 mt-1 space-y-1 border-l-2 border-orange-200 pl-4 animate-fade-in">
                          {cat.subs.map((sub) => (
                            <li key={sub.name}>
                              <Link
                                to={sub.href}
                                onClick={() => setIsMenuOpen(false)}
                                className="block px-2 py-1.5 text-sm text-gray-600 hover:text-orange-600 transition-colors"
                              >
                                {sub.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ) : (
                    <Link
                      to={cat.href}
                      onClick={() => setIsMenuOpen(false)}
                      className={cn(
                        "block px-4 py-2 rounded-lg transition-colors text-sm",
                        index === 0
                          ? "bg-orange-50 text-orange-600 font-medium"
                          : "hover:bg-gray-50 text-gray-700"
                      )}
                    >
                      {cat.name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </nav>
    </header>
  );
}
