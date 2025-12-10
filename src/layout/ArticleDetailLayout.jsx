import { cn } from "@/lib/utils";
import { ArrowLeft, Share2, Bookmark } from "lucide-react";
import ArticleMeta from "../components/ArticleDetail/ArticleMeta";
import ArticleContent from "../components/ArticleDetail/ArticleContent";

/**
 * Layout tổng quát cho trang chi tiết bài viết
 * Có thể tái sử dụng cho các chuyên mục khác bằng cách truyền props
 */
export function ArticleDetailLayout({
  title,
  summary,
  content,
  category,
  author,
  date,
  source,
  tags = [],
  heroImage,
  gallery = [],
  onBack,
  sidebar,
  className,
}) {
  return (
    <div className={cn("max-w-6xl mx-auto py-6 px-4 lg:px-6", className)}>
      {/* Breadcrumb + Back */}
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-primary hover:text-orange-600 font-medium"
        >
          <ArrowLeft className="h-4 w-4" />
          Quay lại
        </button>
        <span className="text-gray-300">/</span>
        <span className="text-gray-600 truncate">{title}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 space-y-6">
          {/* Header */}
          <header className="space-y-3">
            <ArticleMeta
              author={author}
              date={date}
              category={category}
              source={source}
            />
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
              {title}
            </h1>
            {summary && (
              <p className="text-lg text-gray-700 italic border-l-4 border-primary pl-4">
                {summary}
              </p>
            )}

            <div className="flex items-center gap-3">
              <button className="inline-flex items-center gap-2 px-3 py-2 bg-orange-50 text-primary rounded-lg text-sm font-semibold hover:bg-orange-100">
                <Share2 className="h-4 w-4" /> Chia sẻ
              </button>
              <button className="inline-flex items-center gap-2 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-semibold hover:bg-gray-200">
                <Bookmark className="h-4 w-4" /> Lưu bài viết
              </button>
            </div>
          </header>

          {/* Hero image */}
          {heroImage && (
            <div className="overflow-hidden rounded-2xl shadow-sm">
              <img
                src={heroImage}
                alt={title}
                className="w-full h-auto"
                loading="lazy"
                onError={(e) => (e.target.style.display = "none")}
              />
            </div>
          )}

          {/* Content */}
          <ArticleContent content={content} />

          {/* Gallery */}
          {gallery.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-gray-800">
                Hình ảnh liên quan
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {gallery.map((img, idx) => (
                  <div
                    key={idx}
                    className="rounded-xl overflow-hidden shadow-sm bg-white"
                  >
                    <img
                      src={img}
                      alt={`Liên quan ${idx + 1}`}
                      className="w-full h-auto"
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tags */}
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2 border-t border-gray-100 pt-4">
              {tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-full"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Sidebar */}
        <aside className="lg:col-span-4 space-y-4">{sidebar}</aside>
      </div>
    </div>
  );
}

export default ArticleDetailLayout;

