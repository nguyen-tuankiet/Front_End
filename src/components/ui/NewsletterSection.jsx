import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "./button";

/**
 * Newsletter subscription section
 */
export function NewsletterSection({ className }) {
    const [email, setEmail] = useState("");
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (email.trim()) {
            setSubmitted(true);
            setEmail("");
            setTimeout(() => setSubmitted(false), 3000);
        }
    };

    return (
        <div className={cn("bg-primary py-4", className)}>
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="text-white">
                        <h3 className="font-bold text-lg">Đăng ký nhận tin hàng ngày</h3>
                        <p className="text-white/80 text-sm">Cập nhật tin tức mới nhất mỗi ngày</p>
                    </div>
                    <form onSubmit={handleSubmit} className="flex gap-2 w-full md:w-auto">
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Nhập email của bạn"
                            className="flex-1 md:w-64 px-4 py-2 rounded text-sm border-0 focus:ring-2 focus:ring-white/50 outline-none"
                            required
                        />
                        <Button
                            type="submit"
                            variant="outline"
                            size="sm"
                            className="bg-card text-primary hover:bg-muted"
                        >
                            {submitted ? "Đã đăng ký!" : "Đăng ký"}
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default NewsletterSection;
