import { cn } from "@/lib/utils";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import { ArticleMeta } from "@/components/ui/ArticleMeta";
import { ShareButtons } from "@/components/ui/ShareButtons";
import { SaveButton } from "@/components/ui/SaveButton";
import { ArticleTags } from "@/components/ui/ArticleTags";
import { CommentsSection } from "@/components/ui/CommentsSection";
import { RelatedArticles } from "@/components/ui/RelatedArticles";
import { getCategoryBySlug, getSubCategoryBySlug } from "@/data/categories";

/**
 * Component hiển thị chi tiết bài báo
 * @param {Object} props
 * @param {Object} props.article - Dữ liệu bài báo
 * @param {Function} props.onBack - Callback khi click nút quay lại
 * @param {string} props.categorySlug - Slug của category
 * @param {string} props.subcategorySlug - Slug của subcategory
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

    // Parse ảnh
    const listImages = article['Danh sách ảnh']
        ? article['Danh sách ảnh'].split('\n').filter(img => img.trim() !== '')
        : [];

    // Parse tags
    const tags = article['Tags']
        ? article['Tags'].split(',').map(t => t.trim()).filter(t => t)
        : article['Chuyên mục lớn']
        ? [article['Chuyên mục lớn'], article['Chuyên mục con']].filter(Boolean)
        : [];

    // Thời gian đăng và tác giả (đang hardcode)
    const publishTime = "1 phút trước";
    const author = "Trang Châu";

    return (
        <div className={cn("max-w-7xl mx-auto", className)}>
            {/* Nút back */}
            <div className="mb-4">
                <button
                    onClick={onBack}
                    className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-muted-foreground hover:text-primary hover:bg-primary/5 rounded-lg transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Quay lại danh sách
                </button>
            </div>

            {/* Layout 2 cột */}
            <div className="flex flex-col lg:flex-row gap-8">
                {/* Nội dung */}
                <article className="flex-1 min-w-0 bg-white rounded-2xl shadow-lg overflow-hidden">
                    <div className="p-6 md:p-8">
                        {/* Breadcrumb: Trang chủ > Category > Subcategory > Title */}
                        <nav className="mb-4 flex items-center gap-2 text-sm flex-wrap">
                            <Link
                                to="/"
                                className="text-muted-foreground hover:text-primary transition-colors"
                            >
                                Trang chủ
                            </Link>
                            
                            {categorySlug && (() => {
                                const category = getCategoryBySlug(categorySlug);
                                const categoryName = category?.name || article['Chuyên mục lớn'] || categorySlug;
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
                            
                            {(subcategorySlug || article['Chuyên mục con']) && categorySlug && (() => {
                                // Lấy từ subcategorySlug, nếu không có thì lấy từ data
                                let subcategory = null;
                                let subcategoryName = null;
                                
                                if (subcategorySlug) {
                                    subcategory = getSubCategoryBySlug(categorySlug, subcategorySlug);
                                    subcategoryName = subcategory?.name || article['Chuyên mục con'] || subcategorySlug;
                                } else if (article['Chuyên mục con']) {
                                    const category = getCategoryBySlug(categorySlug);
                                    subcategory = category?.subs?.find(sub => sub.name === article['Chuyên mục con']);
                                    subcategoryName = article['Chuyên mục con'];
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
                            
                            {/* Title bài báo */}
                            <span className="text-muted-foreground">/</span>
                            <span className="text-foreground font-semibold line-clamp-1">
                                {article['Tiêu đề']}
                            </span>
                        </nav>

                        {/* Title */}
                        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground leading-tight mb-4">
                            {article['Tiêu đề']}
                        </h1>

                        {/* Meta & nút chức năng */}
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 pb-4 border-b border-border">
                            <ArticleMeta author={author} publishTime={publishTime} />
                            <div className="flex items-center gap-3">
                                <ShareButtons 
                                    url={article['URL'] || window.location.href} 
                                    title={article['Tiêu đề']} 
                                />
                                <SaveButton articleId={article.id || article['URL']} />
                            </div>
                        </div>

                        {/* Tóm tắt bài báo */}
                        {article['Tóm tắt'] && (
                            <div className="text-lg text-muted-foreground italic mb-6 pl-4 border-l-4 border-primary">
                                {article['Tóm tắt']}
                            </div>
                        )}

                        {/* Ảnh tiêu đề */}
                        {article['Thumbnail'] && (
                            <div className="mb-8 rounded-xl overflow-hidden">
                                <img
                                    src={article['Thumbnail']}
                                    alt={article['Tiêu đề']}
                                    className="w-full h-auto"
                                    onError={(e) => e.target.style.display = 'none'}
                                />
                            </div>
                        )}

                        {/* Nội dung bài viết */}
                        <div className="prose prose-lg max-w-none mb-8">
                            {article['Nội dung'] && article['Nội dung'].split('\n\n').map((paragraph, index) => (
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
                                        imgUrl.trim() !== article['Thumbnail']?.trim() && (
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
                        {article['URL'] && (
                            <div className="mt-8 pt-6 border-t border-border text-right">
                                <a
                                    href={article['URL']}
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
