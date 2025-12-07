import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

/**

 * @param {Object} props
 * @param {string} props.title - Sidebar title
 * @param {Array} props.articles - Array of article objects
 * @param {string} props.className - Additional CSS classes
 */
export function TrendingSidebar({ title = "Tin nổi bật", articles, className }) {
    return (
        <div className={cn("bg-gray-50 rounded-lg p-4", className)}>
            <h3 className="text-sm font-bold text-gray-800 mb-3 pb-2 border-b border-gray-200 flex items-center gap-2">
                <span className="w-1 h-4 bg-primary rounded-full"></span>
                {title}
            </h3>
            <ul className="space-y-3">
                {articles.map((article, index) => (
                    <li key={article.id}>
                        <Link
                            to={`/bai-viet/${article.id}`}
                            className="flex gap-3 group"
                        >
                            <span className={cn(
                                "shrink-0 w-6 h-6 rounded flex items-center justify-center text-xs font-bold",
                                index < 3
                                    ? "bg-primary text-white"
                                    : "bg-gray-200 text-gray-600"
                            )}>
                                {index + 1}
                            </span>
                            <span className="text-sm text-gray-700 leading-snug line-clamp-2 group-hover:text-primary transition-colors">
                                {article.title}
                            </span>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default TrendingSidebar;
