import { cn } from "@/lib/utils";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { ArticleMeta } from "@/components/ui/ArticleMeta";
import { ShareButtons } from "@/components/ui/ShareButtons";
import { SaveButton } from "@/components/ui/SaveButton";
import { CommentsSection } from "@/components/ui/CommentsSection";
import { RelatedArticles } from "@/components/ui/RelatedArticles";
import ListenButton from "@/components/ui/ListenButton.jsx";
import LazyImage from "./LazyImage";

/**
 * Component hiển thị chi tiết bài báo
 * @param {Object} props
 * @param {Object} props.article - Dữ liệu bài báo
 * @param {Function} props.onBack - Callback khi click nút quay lại
 * @param {string} props.categorySlug - Slug của category
 * @param {string} props.subcategorySlug - Slug của subcategory
 * @param {string} props.subcategoryName - Tên của subcategory
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
    subcategoryName,
    categoryData = null,
    relatedArticles = [],
    comments = [],
    onCommentSubmit,
    onRelatedArticleClick,
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
    const publishTime = article.pubDate || "1 phút trước";
    const author = article.author || "Trang Châu";

    console.log(article)
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
                <article className="flex-1 min-w-0 bg-card rounded-2xl shadow-lg overflow-hidden">
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
                            
                            {(subcategorySlug || subcategoryName || article.subCategory) && categorySlug && (() => {
                                let subcategory = null;
                                let displaySubcategoryName = null;
                                
                                if (subcategoryName) {
                                    displaySubcategoryName = subcategoryName;
                                    // Tìm subcategory object để lấy slug
                                    if (subcategorySlug && categoryData?.subCategories) {
                                        subcategory = categoryData.subCategories.find(sub => sub.slug === subcategorySlug);
                                    } else if (categoryData?.subCategories) {
                                        subcategory = categoryData.subCategories.find(sub => sub.name === subcategoryName);
                                    }
                                }
                                
                                if (displaySubcategoryName) {
                                    const finalSlug = subcategory?.slug || subcategorySlug;
                                    return (
                                        <>
                                            <span className="text-muted-foreground">/</span>
                                            {finalSlug ? (
                                                <Link
                                                    to={`/danh-muc/${categorySlug}/${finalSlug}`}
                                                    className="text-muted-foreground hover:text-primary transition-colors"
                                                >
                                                    {displaySubcategoryName}
                                                </Link>
                                            ) : (
                                                <span className="text-muted-foreground">
                                                    {displaySubcategoryName}
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
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 pb-4">
                            <ArticleMeta author={author} publishTime={publishTime} />
                            <div className="flex items-center gap-3">
                                <ShareButtons 
                                    url={article.url || window.location.href} 
                                    title={article.title} 
                                />
                                <SaveButton articleId={article.id || article.url} article={article} />
                            </div>
                        </div>

                        {/* Chức năng nghe bài viết */}
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 pb-4 border-b border-border">
                            < ListenButton article={article} />
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
                                <LazyImage
                                    src={article.imageUrl}
                                    alt={article.title}
                                    className="w-full h-auto"
                                />
                            </div>
                        )}

                        {/* Nội dung bài viết với hình ảnh xen kẽ */}
                        <div className="prose prose-lg max-w-none mb-8">
                            {(() => {
                                if (!article.content) return null;
                                
                                const paragraphs = article.content.split('\n\n');
                                const contentImages = listImages.filter(img => img && img.trim() !== article.imageUrl?.trim());
                                let imageIndex = 0;
                                
                                return paragraphs.map((paragraph, index) => {
                                    const trimmedParagraph = paragraph.trim();
                                    
                                    // Kiểm tra nếu đây là caption ảnh (bắt đầu bằng "ẢNH:" hoặc chỉ chứa "ẢNH:")
                                    const isCaptionOnly = /^ẢNH\s*:/i.test(trimmedParagraph);
                                    const hasCaption = trimmedParagraph.includes('ẢNH:');
                                    
                                    if (isCaptionOnly) {
                                        // Đây là dòng caption riêng, hiển thị ảnh với caption
                                        const currentImage = contentImages[imageIndex];
                                        imageIndex++;
                                        
                                        if (currentImage) {
                                            return (
                                                <figure key={index} className="my-6">
                                                    <div className="rounded-xl overflow-hidden shadow-md">
                                                        <LazyImage
                                                            src={currentImage}
                                                            alt={`Hình minh họa`}
                                                            className="w-full h-auto"
                                                        />
                                                    </div>
                                                    <figcaption className="mt-2 text-center text-sm text-muted-foreground italic">
                                                        {trimmedParagraph}
                                                    </figcaption>
                                                </figure>
                                            );
                                        }
                                        return null;
                                    }
                                    
                                    // Kiểm tra nếu paragraph có caption ở cuối (mô tả ảnh + caption)
                                    if (hasCaption && !isCaptionOnly) {
                                        const captionMatch = trimmedParagraph.match(/^(.+?)\s*(ẢNH\s*:.+)$/i);
                                        if (captionMatch) {
                                            const imageDescription = captionMatch[1].trim();
                                            const captionText = captionMatch[2].trim();
                                            const currentImage = contentImages[imageIndex];
                                            imageIndex++;
                                            
                                            if (currentImage) {
                                                return (
                                                    <figure key={index} className="my-6">
                                                        <div className="rounded-xl overflow-hidden shadow-md">
                                                            <LazyImage
                                                                src={currentImage}
                                                                alt={imageDescription}
                                                                className="w-full h-auto"
                                                            />
                                                        </div>
                                                        <figcaption className="mt-2 text-center text-sm text-muted-foreground italic">
                                                            {imageDescription}
                                                            <span className="block text-xs mt-1 text-muted-foreground/70">{captionText}</span>
                                                        </figcaption>
                                                    </figure>
                                                );
                                            }
                                        }
                                    }
                                    
                                    // Paragraph thông thường
                                    return (
                                        <p key={index} className="text-foreground leading-relaxed mb-4 text-justify text-base">
                                            {trimmedParagraph}
                                        </p>
                                    );
                                });
                            })()}
                        </div>

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
                            onArticleClick={onRelatedArticleClick}
                        />
                    </aside>
                )}
            </div>
        </div>
    );
}

export default ArticleDetailView;
