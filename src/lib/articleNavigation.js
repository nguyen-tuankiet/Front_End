import { addViewedArticle } from "./viewedArticles";

/**
 * @param {Object} article - Dữ liệu bài viết
 */
export function handleArticleClick(article) {
    if (!article) return;
    addViewedArticle(article);
}
