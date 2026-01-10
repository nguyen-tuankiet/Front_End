const STORAGE_KEY = 'viewedArticles';
const MAX_VIEWED_ARTICLES = 50;

/**
 * Lấy danh sách bài viết đã xem
 * @returns {Array}
 */
export function getViewedArticles() {
    try {
        const saved = localStorage.getItem(STORAGE_KEY);
        return saved ? JSON.parse(saved) : [];
    } catch (error) {
        console.error('Lỗi đọc viewed articles:', error);
        return [];
    }
}

/**
 * Thêm bài viết vào danh sách xem gần đây
 * @param {Object} article - Dữ liệu bài viết
 */
export function addViewedArticle(article) {
    try {
        const viewed = getViewedArticles();
        const articleUrl = article.url || article.link;
        
        if (!articleUrl) {
            console.warn('Không thể lưu bài viết: thiếu URL');
            return;
        }
        
        // Tìm bài viết đã tồn tại
        const existingIndex = viewed.findIndex(a => (a.url || a.link) === articleUrl);
        
        // Chuẩn bị dữ liệu bài viết
        const articleToSave = {
            title: article.title,
            description: article.description || article.excerpt || article['Tóm tắt'],
            imageUrl: article.imageUrl || article.Thumbnail || article.thumbnail,
            url: article.url || article.link,
            link: article.link || article.url,
            category: article.category || article['Chuyên mục lớn'] || article['Chuyên mục cha'],
            categorySlug: article.categorySlug,
            pubDate: article.pubDate || article['Ngày đăng'] || article.date,
            date: article.date || article.pubDate || article['Ngày đăng'],
            author: article.author || article['Tác giả'],
            viewedAt: new Date().toISOString(), // Thời gian xem
        };
        
        if (existingIndex !== -1) {
            // Nếu bài viết đã tồn tại, di chuyển lên đầu
            viewed.splice(existingIndex, 1);
        }
        
        // Thêm vào đầu danh sách
        viewed.unshift(articleToSave);
        
        // Giới hạn số lượng, xóa bài viết đã xem cũ nhất
        if (viewed.length > MAX_VIEWED_ARTICLES) {
            viewed.splice(MAX_VIEWED_ARTICLES);
        }
        
        localStorage.setItem(STORAGE_KEY, JSON.stringify(viewed));
        window.dispatchEvent(new Event('viewedArticlesChanged'));
    } catch (error) {
        console.error('Lỗi lưu viewed article:', error);
    }
}

/**
 * Xóa bài viết khỏi danh sách xem gần đây
 * @param {string} articleUrl - URL của bài viết
 */
export function removeViewedArticle(articleUrl) {
    try {
        const viewed = getViewedArticles();
        const filtered = viewed.filter(a => (a.url || a.link) !== articleUrl);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
        window.dispatchEvent(new Event('viewedArticlesChanged'));
    } catch (error) {
        console.error('Lỗi xóa viewed article:', error);
    }
}

/**
 * Xóa tất cả bài viết đã xem
 */
export function clearViewedArticles() {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
        window.dispatchEvent(new Event('viewedArticlesChanged'));
    } catch (error) {
        console.error('Lỗi xóa tất cả viewed articles:', error);
    }
}

/**
 * Kiểm tra xem bài viết đã được xem chưa
 * @param {string} articleUrl - URL của bài viết
 * @returns {boolean}
 */
export function isArticleViewed(articleUrl) {
    const viewed = getViewedArticles();
    return viewed.some(a => (a.url || a.link) === articleUrl);
}
