const STORAGE_KEY = 'savedArticles';

/**
 * Lấy danh sách bài viết đã lưu
 * @returns {Array}
 */
export function getSavedArticles() {
    try {
        const saved = localStorage.getItem(STORAGE_KEY);
        return saved ? JSON.parse(saved) : [];
    } catch (error) {
        console.error('Lỗi đọc saved articles:', error);
        return [];
    }
}

/**
 * Lưu bài viết vào danh sách
 * @param {Object} article - Dữ liệu bài viết
 */
export function saveArticle(article) {
    try {
        const saved = getSavedArticles();
        const articleUrl = article.url || article.link;
        
        // Kiểm tra bài viết đã được lưu chưa
        const existingIndex = saved.findIndex(a => (a.url || a.link) === articleUrl);
        
        if (existingIndex === -1) {
            // Lưu thông tin để hiển thị
            const articleToSave = {
                title: article.title,
                description: article.description || article.excerpt,
                imageUrl: article.imageUrl || article.Thumbnail,
                url: article.url || article.link,
                link: article.link || article.url,
                category: article.category || article['Chuyên mục cha'],
                categorySlug: article.categorySlug,
                pubDate: article.pubDate || article['Ngày đăng'] || article.date,
                date: article.date || article.pubDate || article['Ngày đăng'],
                author: article.author || article['Tác giả'],
                savedAt: new Date().toISOString(),
            };
            
            saved.unshift(articleToSave);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(saved));
  
            window.dispatchEvent(new Event('savedArticlesChanged'));
        }
    } catch (error) {
        console.error('Lỗi lưu article:', error);
    }
}

/**
 * Xóa bài viết khỏi danh sách đã lưu
 * @param {string} articleUrl - URL của bài viết
 */
export function removeSavedArticle(articleUrl) {
    try {
        const saved = getSavedArticles();
        const filtered = saved.filter(a => (a.url || a.link) !== articleUrl);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
 
        window.dispatchEvent(new Event('savedArticlesChanged'));
    } catch (error) {
        console.error('Lỗi xóa saved article:', error);
    }
}

/**
 * Kiểm tra xem bài viết đã được lưu chưa
 * @param {string} articleUrl - URL của bài viết
 * @returns {boolean}
 */
export function isArticleSaved(articleUrl) {
    const saved = getSavedArticles();
    return saved.some(a => (a.url || a.link) === articleUrl);
}

