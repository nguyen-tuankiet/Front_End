// Trong JavaScript, chúng ta không cần khai báo interface.
// Tuy nhiên, cấu trúc dữ liệu vẫn giữ nguyên.

export const categories = [
  {
    name: "Thời sự",
    slug: "thoi-su",
    rssUrl: "https://thanhnien.vn/rss/thoi-su.rss",
    subs: [
      { name: "Pháp luật", slug: "phap-luat", rssUrl: "https://thanhnien.vn/rss/thoi-su/phap-luat.rss" },
      { name: "Dân sinh", slug: "dan-sinh", rssUrl: "https://thanhnien.vn/rss/thoi-su/dan-sinh.rss" },
      { name: "Lao động - Việc làm", slug: "lao-dong-viec-lam", rssUrl: "https://thanhnien.vn/rss/thoi-su/lao-dong-viec-lam.rss" },
      { name: "Quyền được biết", slug: "quyen-duoc-biet", rssUrl: "https://thanhnien.vn/rss/thoi-su/quyen-duoc-biet.rss" },
      { name: "Phóng sự / Điều tra", slug: "phong-su-dieu-tra", rssUrl: "https://thanhnien.vn/rss/thoi-su/phong-su--dieu-tra.rss" },
      { name: "Quốc phòng", slug: "quoc-phong", rssUrl: "https://thanhnien.vn/rss/thoi-su/quoc-phong.rss" },
    ]
  },
  {
    name: "Chính trị",
    slug: "chinh-tri",
    rssUrl: "https://thanhnien.vn/rss/chinh-tri.rss",
    subs: [
      { name: "Sự kiện", slug: "su-kien", rssUrl: "https://thanhnien.vn/rss/chinh-tri/su-kien.rss" },
      { name: "Vươn mình trong kỷ nguyên mới", slug: "vuon-minh-trong-ky-nguyen-moi", rssUrl: "https://thanhnien.vn/rss/chinh-tri/vuon-minh-trong-ky-nguyen-moi.rss" },
      { name: "Thời luận", slug: "thoi-luan", rssUrl: "https://thanhnien.vn/rss/chinh-tri/thoi-luan.rss" },
      { name: "Thi đua yêu nước", slug: "thi-dua-yeu-nuoc", rssUrl: "https://thanhnien.vn/rss/chinh-tri/thi-dua-yeu-nuoc.rss" },
    ]
  },
  {
    name: "Thế giới",
    slug: "the-gioi",
    rssUrl: "https://thanhnien.vn/rss/the-gioi.rss",
    subs: [
      { name: "Kinh tế thế giới", slug: "kinh-te-the-gioi", rssUrl: "https://thanhnien.vn/rss/the-gioi/kinh-te-the-gioi.rss" },
      { name: "Quân sự", slug: "quan-su", rssUrl: "https://thanhnien.vn/rss/the-gioi/quan-su.rss" },
      { name: "Góc nhìn", slug: "goc-nhin", rssUrl: "https://thanhnien.vn/rss/the-gioi/goc-nhin.rss" },
      { name: "Hồ sơ", slug: "ho-so", rssUrl: "https://thanhnien.vn/rss/the-gioi/ho-so.rss" },
      { name: "Người Việt năm châu", slug: "nguoi-viet-nam-chau", rssUrl: "https://thanhnien.vn/rss/the-gioi/nguoi-viet-nam-chau.rss" },
      { name: "Chuyện lạ", slug: "chuyen-la", rssUrl: "https://thanhnien.vn/rss/the-gioi/chuyen-la.rss" },
    ]
  },
  {
    name: "Kinh tế",
    slug: "kinh-te",
    rssUrl: "https://thanhnien.vn/rss/kinh-te.rss",
    subs: [
      { name: "Kinh tế xanh", slug: "kinh-te-xanh", rssUrl: "https://thanhnien.vn/rss/kinh-te/kinh-te-xanh.rss" },
      { name: "Chính sách - Phát triển", slug: "chinh-sach-phat-trien", rssUrl: "https://thanhnien.vn/rss/kinh-te/chinh-sach-phat-trien.rss" },
      { name: "Ngân hàng", slug: "ngan-hang", rssUrl: "https://thanhnien.vn/rss/kinh-te/ngan-hang.rss" },
      { name: "Chứng khoán", slug: "chung-khoan", rssUrl: "https://thanhnien.vn/rss/kinh-te/chung-khoan.rss" },
      { name: "Doanh nghiệp", slug: "doanh-nghiep", rssUrl: "https://thanhnien.vn/rss/kinh-te/doanh-nghiep.rss" },
      { name: "Địa ốc", slug: "dia-oc", rssUrl: "https://thanhnien.vn/rss/kinh-te/dia-oc.rss" },
    ]
  },
  {
    name: "Đời sống",
    slug: "doi-song",
    rssUrl: "https://thanhnien.vn/rss/doi-song.rss",
    subs: [
      { name: "Người sống quanh ta", slug: "nguoi-song-quanh-ta", rssUrl: "https://thanhnien.vn/rss/doi-song/nguoi-song-quanh-ta.rss" },
      { name: "Gia đình", slug: "gia-dinh", rssUrl: "https://thanhnien.vn/rss/doi-song/gia-dinh.rss" },
      { name: "Ẩm thực", slug: "am-thuc", rssUrl: "https://thanhnien.vn/rss/doi-song/am-thuc.rss" },
      { name: "Cộng đồng", slug: "cong-dong", rssUrl: "https://thanhnien.vn/rss/doi-song/cong-dong.rss" },
    ]
  },
  {
    name: "Sức khỏe",
    slug: "suc-khoe",
    rssUrl: "https://thanhnien.vn/rss/suc-khoe.rss",
    subs: [
      { name: "Khỏe đẹp mỗi ngày", slug: "khoe-dep-moi-ngay", rssUrl: "https://thanhnien.vn/rss/suc-khoe/khoe-dep-moi-ngay.rss" },
      { name: "Làm đẹp", slug: "lam-dep", rssUrl: "https://thanhnien.vn/rss/suc-khoe/lam-dep.rss" },
      { name: "Giới tính", slug: "gioi-tinh", rssUrl: "https://thanhnien.vn/rss/suc-khoe/gioi-tinh.rss" },
      { name: "Y tế thông minh", slug: "y-te-thong-minh", rssUrl: "https://thanhnien.vn/rss/suc-khoe/y-te-thong-minh.rss" },
      { name: "Thẩm mỹ an toàn", slug: "tham-my-an-toan", rssUrl: "https://thanhnien.vn/rss/suc-khoe/tham-my-an-toan.rss" },
      { name: "Tin hay y tế", slug: "tin-hay-y-te", rssUrl: "https://thanhnien.vn/rss/suc-khoe/tin-hay-y-te.rss" },
    ]
  },
  {
    name: "Giới trẻ",
    slug: "gioi-tre",
    rssUrl: "https://thanhnien.vn/rss/gioi-tre.rss",
    subs: [
      { name: "Sống - Yêu - Ăn - Chơi", slug: "song-yeu-an-choi", rssUrl: "https://thanhnien.vn/rss/gioi-tre/song-yeu-an-choi.rss" },
      { name: "Cơ hội nghề nghiệp", slug: "co-hoi-nghe-nghiep", rssUrl: "https://thanhnien.vn/rss/gioi-tre/co-hoi-nghe-nghiep.rss" },
      { name: "Đoàn - Hội", slug: "doan-hoi", rssUrl: "https://thanhnien.vn/rss/gioi-tre/doan-hoi.rss" },
      { name: "Kết nối", slug: "ket-noi", rssUrl: "https://thanhnien.vn/rss/gioi-tre/ket-noi.rss" },
      { name: "Khởi nghiệp", slug: "khoi-nghiep", rssUrl: "https://thanhnien.vn/rss/gioi-tre/khoi-nghiep.rss" },
    ]
  },
  {
    name: "Giáo dục",
    slug: "giao-duc",
    rssUrl: "https://thanhnien.vn/rss/giao-duc.rss",
    subs: [
      { name: "Tuyển sinh", slug: "tuyen-sinh", rssUrl: "https://thanhnien.vn/rss/giao-duc/tuyen-sinh.rss" },
      { name: "Chọn nghề - Chọn trường", slug: "chon-nghe-chon-truong", rssUrl: "https://thanhnien.vn/rss/giao-duc/chon-nghe-chon-truong.rss" },
      { name: "Du học", slug: "du-hoc", rssUrl: "https://thanhnien.vn/rss/giao-duc/du-hoc.rss" },
      { name: "Nhà trường", slug: "nha-truong", rssUrl: "https://thanhnien.vn/rss/giao-duc/nha-truong.rss" },
      { name: "Phụ huynh", slug: "phu-huynh", rssUrl: "https://thanhnien.vn/rss/giao-duc/phu-huynh.rss" },
    ]
  },
  {
    name: "Du lịch",
    slug: "du-lich",
    rssUrl: "https://thanhnien.vn/rss/du-lich.rss",
    subs: [
      { name: "Tin tức - Sự kiện", slug: "tin-tuc-su-kien", rssUrl: "https://thanhnien.vn/rss/du-lich/tin-tuc-su-kien.rss" },
      { name: "Chơi gì, ăn đâu, đi thế nào?", slug: "choi-gi-an-dau-di-the-nao", rssUrl: "https://thanhnien.vn/rss/du-lich/choi-gi-an-dau-di-the-nao.rss" },
      { name: "Câu chuyện du lịch", slug: "cau-chuyen-du-lich", rssUrl: "https://thanhnien.vn/rss/du-lich/cau-chuyen-du-lich.rss" },
      { name: "Khám phá", slug: "kham-pha", rssUrl: "https://thanhnien.vn/rss/du-lich/kham-pha.rss" },
    ]
  },
  {
    name: "Văn hóa",
    slug: "van-hoa",
    rssUrl: "https://thanhnien.vn/rss/van-hoa.rss",
    subs: [
      { name: "Sống đẹp", slug: "song-dep", rssUrl: "https://thanhnien.vn/rss/van-hoa/song-dep.rss" },
      { name: "Câu chuyện văn hóa", slug: "cau-chuyen-van-hoa", rssUrl: "https://thanhnien.vn/rss/van-hoa/cau-chuyen-van-hoa.rss" },
      { name: "Khảo cứu", slug: "khao-cuu", rssUrl: "https://thanhnien.vn/rss/van-hoa/khao-cuu.rss" },
      { name: "Xem - Nghe", slug: "xem-nghe", rssUrl: "https://thanhnien.vn/rss/van-hoa/xem-nghe.rss" },
      { name: "Sách hay", slug: "sach-hay", rssUrl: "https://thanhnien.vn/rss/van-hoa/sach-hay.rss" },
    ]
  },
  {
    name: "Giải trí",
    slug: "giai-tri",
    rssUrl: "https://thanhnien.vn/rss/giai-tri.rss",
    subs: [
      { name: "Phim", slug: "phim", rssUrl: "https://thanhnien.vn/rss/giai-tri/phim.rss" },
      { name: "Truyền hình", slug: "truyen-hinh", rssUrl: "https://thanhnien.vn/rss/giai-tri/truyen-hinh.rss" },
      { name: "Đời nghệ sĩ", slug: "doi-nghe-si", rssUrl: "https://thanhnien.vn/rss/giai-tri/doi-nghe-si.rss" },
    ]
  },
  {
    name: "Thể thao",
    slug: "the-thao",
    rssUrl: "https://thanhnien.vn/rss/the-thao.rss",
    subs: [
      { name: "Bóng đá Việt Nam", slug: "bong-da-viet-nam", rssUrl: "https://thanhnien.vn/rss/the-thao/bong-da-viet-nam.rss" },
      { name: "Bóng đá Quốc tế", slug: "bong-da-quoc-te", rssUrl: "https://thanhnien.vn/rss/the-thao/bong-da-quoc-te.rss" },
      { name: "Thể thao & Cộng đồng", slug: "the-thao-cong-dong", rssUrl: "https://thanhnien.vn/rss/the-thao/the-thao-cong-dong.rss" },
      { name: "Các môn khác", slug: "cac-mon-khac", rssUrl: "https://thanhnien.vn/rss/the-thao/cac-mon-khac.rss" },
    ]
  },
  {
    name: "Công nghệ",
    slug: "cong-nghe",
    rssUrl: "https://thanhnien.vn/rss/cong-nghe.rss",
    subs: [
      { name: "Tin tức công nghệ", slug: "tin-tuc-cong-nghe", rssUrl: "https://thanhnien.vn/rss/cong-nghe/tin-tuc-cong-nghe.rss" },
      { name: "Blockchain", slug: "blockchain", rssUrl: "https://thanhnien.vn/rss/cong-nghe/blockchain.rss" },
      { name: "Sản phẩm", slug: "san-pham", rssUrl: "https://thanhnien.vn/rss/cong-nghe/san-pham.rss" },
      { name: "Xu hướng - Chuyển đổi số", slug: "xu-huong-chuyen-doi-so", rssUrl: "https://thanhnien.vn/rss/cong-nghe/xu-huong-chuyen-doi-so.rss" },
      { name: "Thủ thuật", slug: "thu-thuat", rssUrl: "https://thanhnien.vn/rss/cong-nghe/thu-thuat.rss" },
      { name: "Game", slug: "game", rssUrl: "https://thanhnien.vn/rss/cong-nghe/game.rss" },
    ]
  },
  {
    name: "Xe",
    slug: "xe",
    rssUrl: "https://thanhnien.vn/rss/xe.rss",
    subs: [
      { name: "Thị trường", slug: "thi-truong", rssUrl: "https://thanhnien.vn/rss/xe/thi-truong.rss" },
      { name: "Xe điện", slug: "xe-dien", rssUrl: "https://thanhnien.vn/rss/xe/xe-dien.rss" },
      { name: "Đánh giá xe", slug: "danh-gia-xe", rssUrl: "https://thanhnien.vn/rss/xe/danh-gia-xe.rss" },
      { name: "Tư vấn", slug: "tu-van", rssUrl: "https://thanhnien.vn/rss/xe/tu-van.rss" },
    ]
  },
  {
    name: "Tiêu dùng",
    slug: "tieu-dung-thong-minh",
    rssUrl: "https://thanhnien.vn/rss/tieu-dung-thong-minh.rss",
    subs: [
      { name: "Mới- Mới- Mới", slug: "moi-moi-moi", rssUrl: "https://thanhnien.vn/rss/tieu-dung-thong-minh/moi-moi-moi.rss" },
      { name: "Mua một chạm", slug: "mua-mot-cham", rssUrl: "https://thanhnien.vn/rss/tieu-dung-thong-minh/mua-mot-cham.rss" },
      { name: "Ở đâu rẻ?", slug: "o-dau-re", rssUrl: "https://thanhnien.vn/rss/tieu-dung-thong-minh/o-dau-re.rss" },
    ]
  },
  {
    name: "Thời trang trẻ",
    slug: "thoi-trang-tre",
    rssUrl: "https://thanhnien.vn/rss/thoi-trang-tre.rss",
    subs: [
      { name: "Thời trang 24/7", slug: "thoi-trang-247", rssUrl: "https://thanhnien.vn/rss/thoi-trang-tre/thoi-trang-247.rss" },
      { name: "Làm đẹp", slug: "lam-dep", rssUrl: "https://thanhnien.vn/rss/thoi-trang-tre/lam-dep.rss" },
      { name: "Mua sắm", slug: "mua-sam", rssUrl: "https://thanhnien.vn/rss/thoi-trang-tre/mua-sam.rss" },
    ]
  },
];

export const getCategoryBySlug = (slug) => {
  return categories.find(cat => cat.slug === slug);
};

export const getSubCategoryBySlug = (categorySlug, subSlug) => {
  const category = getCategoryBySlug(categorySlug);
  // Sử dụng optional chaining (?.) để tránh lỗi nếu không tìm thấy category
  return category?.subs.find(sub => sub.slug === subSlug);
};