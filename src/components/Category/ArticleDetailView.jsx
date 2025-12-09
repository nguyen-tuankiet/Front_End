import { cn } from "@/lib/utils";
import { ArrowLeft, ExternalLink } from "lucide-react";

/**
 * Component hiển thị chi tiết bài báo đầy đủ
 * @param {Object} props
 * @param {Object} props.article - Dữ liệu bài báo
 * @param {Function} props.onBack - Callback khi click nút quay lại
 * @param {string} props.className - CSS classes bổ sung
 */
export function ArticleDetailView({
    article,
    onBack,
    className
}) {
    if (!article) {
        return (
            <div className="text-center py-12 text-gray-500">
                Không tìm thấy bài viết.
            </div>
        );
    }

    // Parse danh sách ảnh
    const listImages = article['Danh sách ảnh']
        ? article['Danh sách ảnh'].split('\n').filter(img => img.trim() !== '')
        : [];

    return (
        <article className={cn(
            "bg-white rounded-2xl shadow-lg overflow-hidden max-w-4xl",
            className
        )}>
            {/* Back button */}
            <div className="p-4 border-b border-gray-100">
                <button
                    onClick={onBack}
                    className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 hover:text-primary hover:bg-primary/5 rounded-lg transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Quay lại danh sách
                </button>
            </div>

            <div className="p-6 md:p-8">
                {/* Breadcrumb */}
                <div className="mb-4">
                    <span className="text-sm font-semibold text-primary uppercase tracking-wide">
                        {article['Chuyên mục lớn']} &gt; {article['Chuyên mục con']}
                    </span>
                </div>

                {/* Title */}
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800 leading-tight mb-6">
                    {article['Tiêu đề']}
                </h1>

                {/* Summary/Sapo */}
                {article['Tóm tắt'] && (
                    <div className="text-lg text-gray-600 italic mb-6 pl-4 border-l-4 border-primary">
                        {article['Tóm tắt']}
                    </div>
                )}

                {/* Hero Image */}
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

                {/* Content */}
                <div className="prose prose-lg max-w-none mb-8">
                    {article['Nội dung'] && article['Nội dung'].split('\n\n').map((paragraph, index) => (
                        <p key={index} className="text-gray-700 leading-relaxed mb-4 text-justify">
                            {paragraph}
                        </p>
                    ))}
                </div>

                {/* Image Gallery */}
                {listImages.length > 0 && (
                    <div className="mt-10 pt-6 border-t-2 border-gray-100">
                        <h3 className="text-lg font-bold text-gray-700 mb-4">
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

                {/* Original article link */}
                {article['URL'] && (
                    <div className="mt-8 pt-6 border-t border-gray-100 text-right">
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
            </div>
        </article>
    );
}

export default ArticleDetailView;
