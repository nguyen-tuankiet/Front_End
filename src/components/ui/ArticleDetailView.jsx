import { cn } from "@/lib/utils";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import { ArticleMeta } from "@/components/ui/ArticleMeta";
import { ShareButtons } from "@/components/ui/ShareButtons";
import { SaveButton } from "@/components/ui/SaveButton";
import { ArticleTags } from "@/components/ui/ArticleTags";
import { CommentsSection } from "@/components/ui/CommentsSection";
import { RelatedArticles } from "@/components/ui/RelatedArticles";

/**
 * Component hiển thị chi tiết bài báo
 * @param {Object} props
 * @param {Object} props.article - Dữ liệu bài báo
 * @param {Function} props.onBack - Callback khi click nút quay lại
 * @param {string} props.categorySlug - Slug của category
 * @param {string} props.subcategorySlug - Slug của subcategory
 * @param {Object} props.categoryData - Dữ liệu category từ API
 * @param {Array} props.relatedArticles - Danh sách bài viết liên quan
 * @param {Array} props.comments - Danh sách comments
 * @param {Function} props.onCommentSubmit - Callback khi submit comment
 * @param {string} props.className - CSS class bổ sung
 */
export function ArticleDetailView({
    article,
    onBack,
    categorySlug,
    subcategorySlug,
    categoryData = null,
    relatedArticles = [],
    comments = [],
    onCommentSubmit,
    className
}) {
    if (!article) {
        return (
            <div className="text-center py-12 text-muted-foreground">
                Không tìm thấy bài viết.
            </div>
        );
    }

    const listImages = article.images || [];
    const tags = article.tags && article.tags.length > 0 
        ? article.tags 
        : article.category 
        ? [article.category, article.subCategory].filter(Boolean)
        : [];

    const publishTime = article.pubDate || "1 phút trước";
    const author = article.author || "Trang Châu";

    return (
        <div className={cn("max-w-7xl mx-auto", className)}>
            <div className="mb-4">
                <button
                    onClick={onBack}
                    className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-muted-foreground hover:text-primary hover:bg-primary/5 rounded-lg transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Quay lại danh sách
                </button>
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
                <article className="flex-1 min-w-0 bg-white rounded-2xl shadow-lg overflow-hidden">
                    <div className="p-6 md:p-8">
                        <nav className="mb-4 flex items-center gap-2 text-sm flex-wrap">
                            <Link
                                to="/"
                                className="text-muted-foreground hover:text-primary transition-colors"
                            >
                                Trang chủ
                            </Link>
                            
                            {categorySlug && (() => {
                                const categoryName = categoryData?.name || article.category || categorySlug;
                                return (
                                    <>
                                        <span className="text-muted-foreground">/</span>
                                        <Link
                                            to={`/danh-muc/${categorySlug}`}
                                            className="text-muted-foreground hover:text-primary transition-colors"
                                        >
                                            {categoryName}
                                        </Link>
                                    </>
                                );
                            })()}
                            
                            {(subcategorySlug || article.subCategory) && categorySlug && (() => {
                                let subcategory = null;
                                let subcategoryName = null;
                                
                                if (subcategorySlug && categoryData?.subCategories) {
                                    subcategory = categoryData.subCategories.find(sub => sub.slug === subcategorySlug);
                                    subcategoryName = subcategory?.name || article.subCategory || subcategorySlug;
                                } else if (article.subCategory && categoryData?.subCategories) {
                                    subcategory = categoryData.subCategories.find(sub => sub.name === article.subCategory);
                                    subcategoryName = article.subCategory;
                                } else if (article.subCategory) {
                                    subcategoryName = article.subCategory;
                                }
                                
                                if (subcategoryName) {
                                    return (
                                        <>
                                            <span className="text-muted-foreground">/</span>
                                            {subcategory?.slug ? (
                                                <Link
                                                    to={`/danh-muc/${categorySlug}/${subcategory.slug}`}
                                                    className="text-muted-foreground hover:text-primary transition-colors"
                                                >
                                                    {subcategoryName}
                                                </Link>
                                            ) : (
                                                <span className="text-muted-foreground">
                                                    {subcategoryName}
                                                </span>
                                            )}
                                        </>
                                    );
                                }
                                return null;
                            })()}
                        </nav>

                        {/* Title */}
                        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground leading-tight mb-4">
                            {article.title}
                        </h1>

                        {/* Meta & nút chức năng */}
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 pb-4 border-b border-border">
                            <ArticleMeta author={author} publishTime={publishTime} />
                            <div className="flex items-center gap-3">
                                <ShareButtons 
                                    url={article.url || window.location.href} 
                                    title={article.title} 
                                />
                                <SaveButton articleId={article.id || article.url} />
                            </div>
                        </div>

                        {/* Tóm tắt bài báo */}
                        {article.description && (
                            <div className="text-lg text-muted-foreground italic mb-6 pl-4 border-l-4 border-primary">
                                {article.description}
                            </div>
                        )}

                        {/* Ảnh tiêu đề */}
                        {article.imageUrl && (
                            <div className="mb-8 rounded-xl overflow-hidden">
                                <img
                                    src={article.imageUrl}
                                    alt={article.title}
                                    className="w-full h-auto"
                                    onError={(e) => e.target.style.display = 'none'}
                                />
                            </div>
                        )}

                        {/* Nội dung bài viết */}
                        <div className="prose prose-lg max-w-none mb-8">
                            {article.content && article.content.split('\n\n').map((paragraph, index) => (
                                <p key={index} className="text-foreground leading-relaxed mb-4 text-justify text-base">
                                    {paragraph}
                                </p>
                            ))}
                        </div>

                        {/* Ảnh */}
                        {listImages.length > 0 && (
                            <div className="mt-10 pt-6 border-t-2 border-border">
                                <h3 className="text-lg font-bold text-foreground mb-4">
                                    Hình ảnh trong bài viết
                                </h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {listImages.map((imgUrl, idx) => (
                                        imgUrl && imgUrl.trim() !== article.imageUrl?.trim() && (
                                            <div key={idx} className="rounded-lg overflow-hidden shadow-sm">
                                                <img
                                                    src={imgUrl}
                                                    alt={`Ảnh chi tiết ${idx + 1}`}
                                                    loading="lazy"
                                                    className="w-full h-auto"
                                                />
                                            </div>
                                        )
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Tag */}
                        {tags.length > 0 && (
                            <div className="mt-8 pt-6 border-t border-border">
                                <ArticleTags tags={tags} />
                            </div>
                        )}

                        {/* Link trang gốc */}
                        {article.url && (
                            <div className="mt-8 pt-6 border-t border-border text-right">
                                <a
                                    href={article.url}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="inline-flex items-center gap-2 text-primary font-semibold hover:underline"
                                >
                                    Xem bài gốc trên Thanh Niên
                                    <ExternalLink className="w-4 h-4" />
                                </a>
                            </div>
                        )}

                        {/* Comment */}
                        <CommentsSection 
                            comments={comments} 
                            onSubmit={onCommentSubmit}
                        />
                    </div>
                </article>

                {/* Danh sách bài viết liên quan */}
                {relatedArticles.length > 0 && (
                    <aside className="w-full lg:w-80 shrink-0">
                        <RelatedArticles 
                            articles={relatedArticles}
                            title="Bài viết liên quan"
                        />
                    </aside>
                )}
            </div>
        </div>
    );
}

export default ArticleDetailView;
