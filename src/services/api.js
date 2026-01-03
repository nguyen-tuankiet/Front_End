/**
 * API Configuration and Services
 * Base URL: https://backend-laptrinhfrontend.onrender.com
 */

// Base URL - Change this when switching environments
// const BASE_URL = "https://backend-laptrinhfrontend.onrender.com";
const BASE_URL = "http://localhost:8080";

// Default language
const DEFAULT_LANG = "vi";

// Helper function to add lang param
const withLang = (url, lang = DEFAULT_LANG) => {
  const separator = url.includes('?') ? '&' : '?';
  return `${url}${separator}lang=${lang}`;
};

// API Endpoints
export const API_ENDPOINTS = {
  // Get Home Articles
  HOME: (lang = DEFAULT_LANG) => withLang(`${BASE_URL}/api/rss/home`, lang),

  // Get Home Page Aggregated Data
  HOME_PAGE: (lang = DEFAULT_LANG) => withLang(`${BASE_URL}/api/rss/home-page`, lang),

  // Get All Categories
  CATEGORIES: (lang = DEFAULT_LANG) => withLang(`${BASE_URL}/api/rss/categories`, lang),

  // Get Category Articles - use with slug parameter
  // Example: CATEGORY("cong-nghe") => /api/rss/category/cong-nghe
  CATEGORY: (slug, lang = DEFAULT_LANG) => withLang(`${BASE_URL}/api/rss/category/${slug}`, lang),

  // Get Subcategory Articles - use with category and subcategory slugs
  // Example: SUBCATEGORY("cong-nghe", "games") => /api/rss/category/cong-nghe/games
  SUBCATEGORY: (categorySlug, subCategorySlug, lang = DEFAULT_LANG) =>
    withLang(`${BASE_URL}/api/rss/category/${categorySlug}/${subCategorySlug}`, lang),

  // Get Article Detail (Web Scraping)
  // Example: ARTICLE("https://thanhnien.vn/...") => /api/rss/article?url=...
  ARTICLE: (articleUrl, lang = DEFAULT_LANG) =>
    withLang(`${BASE_URL}/api/rss/article?url=${encodeURIComponent(articleUrl)}`, lang),

  // Fetch Custom RSS URL
  // Example: FETCH_RSS("https://thanhnien.vn/rss/doi-song.rss")
  FETCH_RSS: (rssUrl, lang = DEFAULT_LANG) =>
    withLang(`${BASE_URL}/api/rss/fetch?url=${encodeURIComponent(rssUrl)}`, lang),

  // Get All Feeds (Testing only - very slow)
  ALL_FEEDS: (lang = DEFAULT_LANG) => withLang(`${BASE_URL}/api/rss/all`, lang),

  // Chatbot API
  CHATBOT: `${BASE_URL}/api/chatbot/chat`,
};

// API Service Functions
export const apiService = {
  /**
   * Get home page articles
   * @param {string} lang - Language code ('vi' or 'en')
   * @returns {Promise<{title, description, link, language, articles[]}>}
   */
  getHomeArticles: async (lang = DEFAULT_LANG) => {
    const response = await fetch(API_ENDPOINTS.HOME(lang));
    if (!response.ok) throw new Error("Failed to fetch home articles");
    return response.json();
  },

  /**
   * Get aggregated home page data
   * @param {string} lang - Language code ('vi' or 'en')
   * @returns {Promise<{featuredArticles[], categorySections[], trendingArticles[], mostReadArticles[]}>}
   */
  getHomePageData: async (lang = DEFAULT_LANG) => {
    const response = await fetch(API_ENDPOINTS.HOME_PAGE(lang));
    if (!response.ok) throw new Error("Failed to fetch home page data");
    return response.json();
  },

  /**
   * Get all categories with subcategories
   * @param {string} lang - Language code ('vi' or 'en')
   * @returns {Promise<Array<{name, slug, rssUrl, subCategories}>>}
   */
  getCategories: async (lang = DEFAULT_LANG) => {
    const response = await fetch(API_ENDPOINTS.CATEGORIES(lang));
    if (!response.ok) throw new Error("Failed to fetch categories");
    return response.json();
  },

  /**
   * Get articles by category slug
   * @param {string} slug - Category slug (e.g., "cong-nghe", "the-thao")
   * @param {string} lang - Language code ('vi' or 'en')
   * @returns {Promise<{title, description, link, language, articles[]}>}
   */
  getCategoryArticles: async (slug, lang = DEFAULT_LANG) => {
    const response = await fetch(API_ENDPOINTS.CATEGORY(slug, lang));
    if (!response.ok) throw new Error(`Failed to fetch category: ${slug}`);
    return response.json();
  },

  /**
   * Get articles by subcategory
   * @param {string} categorySlug - Parent category slug
   * @param {string} subCategorySlug - Subcategory slug
   * @param {string} lang - Language code ('vi' or 'en')
   * @returns {Promise<{title, description, link, language, articles[]}>}
   */
  getSubcategoryArticles: async (categorySlug, subCategorySlug, lang = DEFAULT_LANG) => {
    const response = await fetch(API_ENDPOINTS.SUBCATEGORY(categorySlug, subCategorySlug, lang));
    if (!response.ok) throw new Error(`Failed to fetch subcategory: ${categorySlug}/${subCategorySlug}`);
    return response.json();
  },

  /**
   * Get article detail by URL (web scraping)
   * @param {string} articleUrl - Full URL of the article
   * @param {string} lang - Language code ('vi' or 'en')
   * @returns {Promise<{title, url, description, content, author, pubDate, category, imageUrl, images[], tags[]}>}
   */
  getArticleDetail: async (articleUrl, lang = DEFAULT_LANG) => {
    const response = await fetch(API_ENDPOINTS.ARTICLE(articleUrl, lang));
    if (!response.ok) throw new Error("Failed to fetch article detail");
    return response.json();
  },

  /**
   * Fetch custom RSS feed
   * @param {string} rssUrl - RSS feed URL
   * @param {string} lang - Language code ('vi' or 'en')
   * @returns {Promise<Object>}
   */
  fetchRSS: async (rssUrl, lang = DEFAULT_LANG) => {
    const response = await fetch(API_ENDPOINTS.FETCH_RSS(rssUrl, lang));
    if (!response.ok) throw new Error("Failed to fetch RSS");
    return response.json();
  },

  /**
   * Get all feeds (Testing only - very slow 30-60s)
   * @param {string} lang - Language code ('vi' or 'en')
   * @returns {Promise<Array>}
   */
  getAllFeeds: async (lang = DEFAULT_LANG) => {
    const response = await fetch(API_ENDPOINTS.ALL_FEEDS(lang));
    if (!response.ok) throw new Error("Failed to fetch all feeds");
    return response.json();
  },

  /**
   * Send message to chatbot
   * @param {string} message - User message (e.g., "hôm nay bản tin thời sự có gì?", "tin về iPhone 16 hôm nay")
   * @returns {Promise<{message: string, category?: string, articleCount?: number, articles?: Array}>}
   * @example
   * // Ask by category
   * chatbot.sendMessage("hôm nay bản tin thời sự có gì?")
   * // Ask about specific topic
   * chatbot.sendMessage("tin về iPhone 16 hôm nay")
   * chatbot.sendMessage("có tin gì về World Cup không?")
   */
  sendChatMessage: async (message) => {
    const response = await fetch(API_ENDPOINTS.CHATBOT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message }),
    });
    if (!response.ok) throw new Error("Failed to send chat message");
    return response.json();
  },
};

export default apiService;
