import { Minus, Plus, RotateCcw } from "lucide-react";
import { useFontSize, FONT_SIZES } from "@/contexts/FontSizeContext";
import { cn } from "@/lib/utils";

/**
 * Component chỉnh cỡ chữ cho bài viết
 */
export function FontSizeControls({ className }) {
    const { fontSize, increaseFontSize, decreaseFontSize, resetFontSize } = useFontSize();
    const currentSize = FONT_SIZES[fontSize];
    const isMinSize = fontSize === 'sm';
    const isMaxSize = fontSize === '2xl';

    return (
        <div className={cn(
            "flex items-center gap-2 bg-card rounded-lg border border-border p-2 shadow-sm",
            className
        )}>
            <span className="text-xs text-muted-foreground font-medium px-2">
                Cỡ chữ:
            </span>
            
            <div className="flex items-center gap-1">
                <button
                    onClick={decreaseFontSize}
                    disabled={isMinSize}
                    aria-label="Giảm cỡ chữ"
                    className={cn(
                        "p-1.5 rounded-md transition-colors",
                        "hover:bg-primary/10 hover:text-primary",
                        "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-inherit",
                        "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                    )}
                    title="Giảm cỡ chữ"
                >
                    <Minus className="w-4 h-4" />
                </button>

                <span className="text-sm font-medium text-foreground min-w-[80px] text-center px-2">
                    {currentSize.label}
                </span>

                <button
                    onClick={increaseFontSize}
                    disabled={isMaxSize}
                    aria-label="Tăng cỡ chữ"
                    className={cn(
                        "p-1.5 rounded-md transition-colors",
                        "hover:bg-primary/10 hover:text-primary",
                        "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-inherit",
                        "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                    )}
                    title="Tăng cỡ chữ"
                >
                    <Plus className="w-4 h-4" />
                </button>

                <button
                    onClick={resetFontSize}
                    disabled={fontSize === 'base'}
                    aria-label="Đặt lại cỡ chữ mặc định"
                    className={cn(
                        "p-1.5 rounded-md transition-colors ml-1",
                        "hover:bg-primary/10 hover:text-primary",
                        "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-inherit",
                        "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                    )}
                    title="Đặt lại cỡ chữ mặc định"
                >
                    <RotateCcw className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
}

export default FontSizeControls;
