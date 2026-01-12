import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Clock9, TrendingUp, TrendingDown } from "lucide-react";

/**
 * Component tóm tắt tỷ giá ngoại tệ cho sidebar
 */
export function ExchangeRateSummary({ className }) {
    const [rate, setRate] = useState(null);

    useEffect(() => {
        const data = {
            "rates": [
                { "currency": "USD", "name": "US DOLLAR", "buy": "26,054.00", "sell": "26,384.00" },
                { "currency": "EUR", "name": "EURO", "buy": "30,166.87", "sell": "31,757.33" },
                { "currency": "GBP", "name": "POUND STERLING", "buy": "34,574.80", "sell": "36,042.55" },
                { "currency": "JPY", "name": "YEN", "buy": "162.06", "sell": "172.35" },
                { "currency": "CNY", "name": "YUAN RENMINBI", "buy": "3,654.61", "sell": "3,809.75" },
            ]
        };
        setRate(data);
    }, []);

    if (!rate) return null;

    return (
        <div className={cn("bg-card rounded-lg p-4 mb-6", className)}>
            <h3 className="text-sm font-bold text-foreground mb-3 pb-2 border-b border-border flex items-center gap-2">
                <span className="w-1 h-4 bg-primary rounded-full"></span>
                Tỷ giá ngoại tệ
            </h3>
            
            <div className="space-y-2 mb-3">
                {rate.rates.slice(0, 5).map((item) => (
                    <div key={item.currency} className="flex items-center justify-between py-2 border-b border-border/50 last:border-0">
                        <div className="flex-1">
                            <div className="flex items-center gap-2">
                                <span className="text-xs font-semibold text-foreground">{item.currency}</span>
                                <span className="text-[10px] text-muted-foreground">{item.name.split(' ')[0]}</span>
                            </div>
                        </div>
                        <div className="text-right">
                            <div className="text-xs font-medium text-foreground">
                                {item.buy !== "-" ? item.buy : item.sell}
                            </div>
                            <div className="text-[10px] text-muted-foreground">
                                Mua
                            </div>
                        </div>
                        <div className="text-right ml-3">
                            <div className="text-xs font-medium text-foreground">
                                {item.sell}
                            </div>
                            <div className="text-[10px] text-muted-foreground">
                                Bán
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex text-[10px] text-muted-foreground pt-2 border-t border-border">
                <a href="/tien-ich/ty-gia" className="text-primary hover:underline text-xs">
                    Xem thêm
                </a>
            </div>
        </div>
    );
}
