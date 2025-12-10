import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";

/**

 * @param {Object} props
 * @param {string} props.title - Section title
 * @param {string} props.href - Link for "Xem thêm"
 * @param {string} props.className - Additional CSS classes
 * @param {string} props.variant - Color variant: 'primary' | 'dark'
 */
export function SectionHeader({ title, href, className, variant = "primary" }) {
    return (
        <div className={cn(
            "flex items-center justify-between mb-4 pb-2 border-b-2",
            variant === "primary" ? "border-primary" : "border-gray-800",
            className
        )}>
            <h2 className={cn(
                "text-lg font-bold",
                variant === "primary" ? "text-primary" : "text-foreground"
            )}>
                {title}
            </h2>
            {href && (
                <Link
                    to={href}
                    className="flex items-center gap-1 text-sm text-primary hover:underline font-medium"
                >
                    Xem thêm
                    <ChevronRight className="h-4 w-4" />
                </Link>
            )}
        </div>
    );
}

export default SectionHeader;
