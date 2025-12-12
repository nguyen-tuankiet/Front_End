/**
 * API Configuration and Services
 * Base URL: https://backend-laptrinhfrontend.onrender.com
 */

// Base URL - Change this when switching environments
const BASE_URL = "https://backend-laptrinhfrontend.onrender.com";
// const BASE_URL = "http://localhost:8080";

// API Endpoints
export const API_ENDPOINTS = {
  // Get Home Articles
  HOME: `${BASE_URL}/api/rss/home`,

  // Get Home Page Aggregated Data
  HOME_PAGE: `${BASE_URL}/api/rss/home-page`,

  // Get All Categories
  CATEGORIES: `${BASE_URL}/api/rss/categories`,

  // Get Category Articles - use with slug parameter
  // Example: CATEGORY("cong-nghe") => /api/rss/category/cong-nghe
  CATEGORY: (slug) => `${BASE_URL}/api/rss/category/${slug}`,

  // Get Subcategory Articles - use with category and subcategory slugs
  // Example: SUBCATEGORY("cong-nghe", "games") => /api/rss/category/cong-nghe/games
  SUBCATEGORY: (categorySlug, subCategorySlug) =>
    `${BASE_URL}/api/rss/category/${categorySlug}/${subCategorySlug}`,

  // Get Article Detail (Web Scraping)
  // Example: ARTICLE("https://thanhnien.vn/...") => /api/rss/article?url=...
  ARTICLE: (articleUrl) =>
    `${BASE_URL}/api/rss/article?url=${encodeURIComponent(articleUrl)}`,

  // Fetch Custom RSS URL
  // Example: FETCH_RSS("https://thanhnien.vn/rss/doi-song.rss")
  FETCH_RSS: (rssUrl) =>
    `${BASE_URL}/api/rss/fetch?url=${encodeURIComponent(rssUrl)}`,

  // Get All Feeds (Testing only - very slow)
  ALL_FEEDS: `${BASE_URL}/api/rss/all`,
};

// API Service Functions
export const apiService = {
  /**
   * Get home page articles
   * @returns {Promise<{title, description, link, language, articles[]}>}
   */
  getHomeArticles: async () => {
    const response = await fetch(API_ENDPOINTS.HOME);
    if (!response.ok) throw new Error("Failed to fetch home articles");
    return response.json();
  },

  /**
   * Get aggregated home page data
   * @returns {Promise<{featuredArticles[], categorySections[], trendingArticles[], mostReadArticles[]}>}
   */
  getHomePageData: async () => {
    const response = await fetch(API_ENDPOINTS.HOME_PAGE);
    if (!response.ok) throw new Error("Failed to fetch home page data");
    return response.json();
  },

  /**
   * Get all categories with subcategories
   * @returns {Promise<Array<{name, slug, rssUrl, subCategories}>>}
   */
  getCategories: async () => {
    const response = await fetch(API_ENDPOINTS.CATEGORIES);
    if (!response.ok) throw new Error("Failed to fetch categories");
    return response.json();
  },

  /**
   * Get articles by category slug
   * @param {string} slug - Category slug (e.g., "cong-nghe", "the-thao")
   * @returns {Promise<{title, description, link, language, articles[]}>}
   */
  getCategoryArticles: async (slug) => {
    const response = await fetch(API_ENDPOINTS.CATEGORY(slug));
    if (!response.ok) throw new Error(`Failed to fetch category: ${slug}`);
    return response.json();
  },

  /**
   * Get articles by subcategory
   * @param {string} categorySlug - Parent category slug
   * @param {string} subCategorySlug - Subcategory slug
   * @returns {Promise<{title, description, link, language, articles[]}>}
   */
  getSubcategoryArticles: async (categorySlug, subCategorySlug) => {
    const response = await fetch(API_ENDPOINTS.SUBCATEGORY(categorySlug, subCategorySlug));
    if (!response.ok) throw new Error(`Failed to fetch subcategory: ${categorySlug}/${subCategorySlug}`);
    return response.json();
  },

  /**
   * Get article detail by URL (web scraping)
   * @param {string} articleUrl - Full URL of the article
   * @returns {Promise<{title, url, description, content, author, pubDate, category, imageUrl, images[], tags[]}>}
   */
  getArticleDetail: async (articleUrl) => {
    const response = await fetch(API_ENDPOINTS.ARTICLE(articleUrl));
    if (!response.ok) throw new Error("Failed to fetch article detail");
    return response.json();
  },

  /**
   * Fetch custom RSS feed
   * @param {string} rssUrl - RSS feed URL
   * @returns {Promise<Object>}
   */
  fetchRSS: async (rssUrl) => {
    const response = await fetch(API_ENDPOINTS.FETCH_RSS(rssUrl));
    if (!response.ok) throw new Error("Failed to fetch RSS");
    return response.json();
  },

  /**
   * Get all feeds (Testing only - very slow 30-60s)
   * @returns {Promise<Array>}
   */
  getAllFeeds: async () => {
    const response = await fetch(API_ENDPOINTS.ALL_FEEDS);
    if (!response.ok) throw new Error("Failed to fetch all feeds");
    return response.json();
  },
};

export default apiService;
