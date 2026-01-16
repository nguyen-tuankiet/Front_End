import { cn } from "@/lib/utils";
import { ArrowLeft, Bookmark, BookmarkCheck, MessageSquare, Volume2, Printer, Facebook, Link2, Eye, Share2, Pause, Pencil, Calendar, Minus, Plus, RotateCcw } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { CommentsSection } from "@/components/ui/CommentsSection";
import { RelatedArticles } from "@/components/ui/RelatedArticles";
import { RecentlyViewedSidebar } from "@/components/ui/RecentlyViewedSidebar";
import LazyImage from "./LazyImage";
import { useFontSize, FONT_SIZES } from "@/contexts/FontSizeContext";
import { addViewedArticle } from "@/lib/viewedArticles";
import { saveArticle, removeSavedArticle, isArticleSaved } from "@/lib/savedArticles";

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
 * @param {Function} props.onRelatedArticleClick - Callback khi click bài viết liên quan
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
    const { fontSize, increaseFontSize, decreaseFontSize, resetFontSize } = useFontSize();
    const fontSizeClass = FONT_SIZES[fontSize]?.class || 'text-base';
    const currentSizeLabel = FONT_SIZES[fontSize]?.label || 'Mặc định';
    
    // State cho các chức năng
    const [isSaved, setIsSaved] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [utterance, setUtterance] = useState(null);

    // Kiểm tra trạng thái lưu bài viết
    useEffect(() => {
        if (article?.url) {
            setIsSaved(isArticleSaved(article.url));
        }
    }, [article?.url]);

    // Setup text-to-speech
    useEffect(() => {
        if (!article?.content) return;
        
        const synth = window.speechSynthesis;
        const u = new SpeechSynthesisUtterance(article.content);
        u.lang = 'vi-VN';
        u.rate = 1.25;
        u.onend = () => {
            setIsPaused(false);
            setIsPlaying(false);
        };
        setUtterance(u);

        return () => {
            synth.cancel();
        };
    }, [article?.content]);

    // Lưu bài viết vào danh sách xem gần đây
    useEffect(() => {
        if (article) {
            addViewedArticle(article);
        }
    }, [article]);

    // Handlers cho các chức năng
    const handleSaveArticle = () => {
        const newSavedState = !isSaved;
        setIsSaved(newSavedState);
        if (article?.url) {
            if (newSavedState) {
                saveArticle(article);
            } else {
                removeSavedArticle(article.url);
            }
        }
    };

    const handleListen = () => {
        const synth = window.speechSynthesis;
        if (isPlaying && !isPaused) {
            synth.pause();
            setIsPaused(true);
        } else if (isPaused) {
            synth.resume();
            setIsPaused(false);
        } else {
            synth.cancel();
            synth.speak(utterance);
            setIsPlaying(true);
            setIsPaused(false);
        }
    };

    const handlePrint = () => {
        window.print();
    };

    const handleCopyLink = async () => {
        try {
            await navigator.clipboard.writeText(article.url || window.location.href);
            alert("Đã sao chép liên kết!");
        } catch (err) {
            console.error("Failed to copy link:", err);
        }
    };

    const shareToFacebook = () => {
        const url = encodeURIComponent(article.url || window.location.href);
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
    };

    const shareToZalo = () => {
        const url = encodeURIComponent(article.url || window.location.href);
        window.open(`https://zalo.me/share/?u=${url}`, '_blank');
    };

    if (!article) {
        return (
            <div className="text-center py-12 text-muted-foreground">
                Không tìm thấy bài viết.
            </div>
        );
    }

    const listImages = article.images || [];
    const publishTime = article.pubDate || "1 phút trước";
    const viewCount = article.viewCount || 700;
    const shareCount = article.shareCount || 300;
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

                        {/* Meta info - Author, Date, Views, Shares */}
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground mb-4">
                            <span className="flex items-center gap-1">
                                <Pencil className="w-4 h-4" />
                                <span className="font-medium">{author}</span>
                            </span>
                            <span className="flex items-center gap-1">
                                <Calendar className="w-4 h-4" />
                                <span>{publishTime}</span>
                            </span>
                            <span className="flex items-center gap-1">
                                <Eye className="w-4 h-4" />
                                <span>{viewCount.toLocaleString()} lượt xem</span>
                            </span>
                            <span className="flex items-center gap-1">
                                <Share2 className="w-4 h-4" />
                                <span>{shareCount.toLocaleString()} lượt chia sẻ</span>
                            </span>
                        </div>

                        {/* Action buttons row: Lưu bài viết, Góp ý, Nghe bài viết, In bài + Font size controls */}
                        <div className="flex flex-wrap items-center gap-2 mb-4">
                            <button
                                onClick={handleSaveArticle}
                                className={cn(
                                    "inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg border transition-colors",
                                    isSaved 
                                        ? "bg-primary text-white border-primary" 
                                        : "bg-card text-foreground border-border hover:bg-accent"
                                )}
                            >
                                {isSaved ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
                                {isSaved ? "Đã lưu" : "Lưu bài viết"}
                            </button>
                            
                            <button
                                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg border border-border bg-card text-foreground hover:bg-accent transition-colors"
                            >
                                <MessageSquare className="w-4 h-4" />
                                Góp ý
                            </button>
                            
                            <button
                                onClick={handleListen}
                                className={cn(
                                    "inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg border transition-colors",
                                    isPlaying 
                                        ? "bg-primary text-white border-primary" 
                                        : "bg-card text-foreground border-border hover:bg-accent"
                                )}
                            >
                                {isPlaying && !isPaused ? (
                                    <>
                                        <Pause className="w-4 h-4" />
                                        Tạm dừng
                                    </>
                                ) : (
                                    <>
                                        <Volume2 className="w-4 h-4" />
                                        {isPaused ? "Tiếp tục" : "Nghe bài viết"}
                                    </>
                                )}
                            </button>
                            
                            <button
                                onClick={handlePrint}
                                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg border border-border bg-card text-foreground hover:bg-accent transition-colors"
                            >
                                <Printer className="w-4 h-4" />
                                In bài
                            </button>

                            {/* Font size controls */}
                            <div className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-border bg-card">
                                <span className="text-sm text-muted-foreground mr-1">Cỡ chữ:</span>
                                <button
                                    onClick={decreaseFontSize}
                                    className="p-1 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded transition-colors"
                                    title="Giảm cỡ chữ"
                                >
                                    <Minus className="w-4 h-4" />
                                </button>
                                <span className="text-sm font-medium text-foreground min-w-[70px] text-center">
                                    {currentSizeLabel}
                                </span>
                                <button
                                    onClick={increaseFontSize}
                                    className="p-1 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded transition-colors"
                                    title="Tăng cỡ chữ"
                                >
                                    <Plus className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={resetFontSize}
                                    className="p-1 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded transition-colors ml-1"
                                    title="Đặt lại mặc định"
                                >
                                    <RotateCcw className="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                        {/* Share buttons row */}
                        <div className="flex flex-wrap items-center gap-2 mb-6 pb-4 border-b border-border">
                            <span className="text-sm text-muted-foreground">Chia sẻ:</span>
                            <button
                                onClick={shareToFacebook}
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium bg-[#1877f2] text-white rounded hover:bg-[#166fe5] transition-colors"
                            >
                                <Facebook className="w-4 h-4" />
                                Facebook
                            </button>
                            <button
                                onClick={shareToZalo}
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded bg-[#0068ff] text-white hover:bg-[#0055d4] transition-colors"
                            >
                                <svg className="w-4 h-4" viewBox="0 0 48 48" fill="currentColor">
                                    <path d="M24 0C10.745 0 0 10.745 0 24s10.745 24 24 24 24-10.745 24-24S37.255 0 24 0zm5.424 34.667H11.52a.854.854 0 01-.427-1.6l11.2-6.4a.853.853 0 00-.427-1.6H11.52a.854.854 0 010-1.707h17.904a.854.854 0 01.427 1.6l-11.2 6.4a.853.853 0 00.427 1.6h10.346a.854.854 0 010 1.707zm5.696-12.8H12.88a.854.854 0 010-1.707h22.24a.854.854 0 010 1.707zm0-4.267H12.88a.854.854 0 010-1.707h22.24a.854.854 0 010 1.707z"/>
                                </svg>
                                Zalo
                            </button>
                            <button
                                onClick={handleCopyLink}
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded border border-border bg-card text-foreground hover:bg-accent transition-colors"
                            >
                                <Link2 className="w-4 h-4" />
                                Copy
                            </button>
                        </div>

                        {/* Tóm tắt bài báo */}
                        {article.description && (
                            <div className={cn(
                                "text-muted-foreground italic mb-6 pl-4 border-l-4 border-primary",
                                fontSize === 'sm' ? 'text-base' : fontSize === 'base' ? 'text-lg' : 
                                fontSize === 'lg' ? 'text-xl' : fontSize === 'xl' ? 'text-2xl' : 'text-3xl'
                            )}>
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
                                        <p key={index} className={cn(
                                            "text-foreground leading-relaxed mb-4 text-justify",
                                            fontSizeClass
                                        )}>
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

                {/* Sidebar bên phải */}
                <aside className="w-full lg:w-80 shrink-0">
                    <div className="sticky top-4 space-y-6">
                        {/* Tin đã xem gần đây */}
                        <RecentlyViewedSidebar />

                        {/* Quảng cáo */}
                        <div className="bg-card rounded-xl overflow-hidden shadow-sm">
                            <iframe 
                                src="https://cdnstoremedia.com/adt/banners/nam2015/4043/min_html5/2025-11-03/huyenntt/300x600alpha11/300x600alpha11/300x600alpha11.html?url=%2F%2Flg1.logging.admicro.vn%2Fadn%3Fdmn%3Dhttps%253A%252F%252Fthanhnien.vn%252F%26rid%3D0118gjpvnla700g%26sspb%3D7350%26sspr%3D7350%26lsn%3D1768128946081%26ce%3D1%26lc%3D5%26cr%3D%26ui%3D%26dg%3D6a9716013b04dba4d4d4dd83ab38dcb9%26uuid%3D%26profileID%3D%26bi%3D0%26cmpg%3D98719%26items%3D447977%26zid%3D522701%26pr%3D44857131313%26cid%3D-1%26tp%3D11%26tpn%3D4%26alg%3D1102%26dg%3D6a9716013b04dba4d4d4dd83ab38dcb9%26pgl%3D1%26xtr%3DeyJhc2lkIjoxNDU3OSwicHJvZmlsZWlkIjoiIn0%253D%26sspz%3D2028505%26adc_cpa%3D1%26cov%3D1%26re%3Dhttps%253A%252F%252Fconcung.com%252F1423-thuong-hieu-alphagen.html%253Futm_source%253DAdmicro_AdX%2526utm_campaign%253DAdX%2526utm_content%253Dthanhnien.vn&temp=0&loc=5&weath=&autoplay=0"
                                title="Quảng cáo Alphagen"
                                className="w-full border-0 block"
                                style={{ height: '600px', maxWidth: '100%' }}
                                scrolling="no"
                                allowFullScreen
                            />
                        </div>
                    </div>
                </aside>
            </div>

            {/* Danh sách bài viết cùng chuyên mục */}
            {relatedArticles.length > 0 && (
                <div className="mt-8">
                    <RelatedArticles 
                        articles={relatedArticles}
                        title={`Tin cùng chuyên mục: ${categoryData?.name || article.category || 'Tin tức'}`}
                        categorySlug={categorySlug}
                        onArticleClick={onRelatedArticleClick}
                    />
                </div>
            )}
        </div>
    );
}

export default ArticleDetailView;
