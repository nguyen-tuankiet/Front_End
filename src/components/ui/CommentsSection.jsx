import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "./button";
import { Input } from "./input";
import { Heart, MessageCircle, Reply } from "lucide-react";

/**
 * Component hiển thị phần bình luận
 * @param {Object} props
 * @param {Array} props.comments - Danh sách comments
 * @param {Function} props.onSubmit - Callback khi submit comment
 * @param {string} props.className - CSS classes bổ sung
 */
export function CommentsSection({ comments = [], onSubmit, className }) {
    const [name, setName] = useState("");
    const [comment, setComment] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (name.trim() && comment.trim()) {
            onSubmit?.(name, comment);
            setName("");
            setComment("");
        }
    };

    return (
        <div className={cn("mt-8 pt-8 border-t border-border", className)}>
            {/* Header */}
            <h3 className="text-xl font-bold text-foreground mb-6">
                Bình luận ({comments.length})
            </h3>

            {/* Comment Form */}
            <div className="mb-8 p-6 bg-muted rounded-lg">
                <h4 className="text-lg font-semibold text-foreground mb-4">
                    Để lại bình luận của bạn
                </h4>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <Input
                            type="text"
                            placeholder="Tên của bạn *"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="w-full"
                        />
                    </div>
                    <div>
                        <textarea
                            placeholder="Viết bình luận...*"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            required
                            rows={4}
                            className={cn(
                                "flex w-full rounded-md border border-input bg-background px-3 py-2",
                                "text-base ring-offset-background placeholder:text-muted-foreground",
                                "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
                                "disabled:cursor-not-allowed disabled:opacity-50 md:text-sm resize-none"
                            )}
                        />
                    </div>
                    <div className="flex justify-end">
                        <Button type="submit" variant="destructive">
                            Gửi bình luận
                        </Button>
                    </div>
                </form>
            </div>

            {/* Comments List */}
            <div className="space-y-6">
                {comments.length === 0 ? (
                    <p className="text-center text-muted-foreground py-8">
                        Chưa có bình luận nào. Hãy là người đầu tiên bình luận!
                    </p>
                ) : (
                    comments.map((comment, index) => (
                        <CommentItem key={comment.id || index} comment={comment} />
                    ))
                )}
            </div>
        </div>
    );
}

/**
 * Component hiển thị một comment item
 */
function CommentItem({ comment }) {
    const [liked, setLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(comment.likes || 0);

    const handleLike = () => {
        setLiked(!liked);
        setLikeCount(prev => liked ? prev - 1 : prev + 1);
    };

    // Generate avatar initials
    const getInitials = (name) => {
        return name
            .split(" ")
            .map(n => n[0])
            .join("")
            .toUpperCase()
            .slice(0, 2);
    };

    return (
        <div className="flex gap-4">
            {/* Avatar */}
            <div className="shrink-0 w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-semibold text-sm">
                {getInitials(comment.author || "U")}
            </div>

            {/* Content */}
            <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-foreground">{comment.author}</span>
                    <span className="text-sm text-muted-foreground">{comment.time}</span>
                </div>
                <p className="text-foreground mb-3 leading-relaxed">{comment.content}</p>
                
                {/* Actions */}
                <div className="flex items-center gap-4">
                    <button
                        onClick={handleLike}
                        className={cn(
                            "flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors",
                            liked && "text-primary"
                        )}
                    >
                        <Heart className={cn("w-4 h-4", liked && "fill-current")} />
                        <span>{likeCount}</span>
                    </button>
                    <button className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors">
                        <Reply className="w-4 h-4" />
                        <span>Trả lời</span>
                    </button>
                </div>

                {/* Replies */}
                {comment.replies && comment.replies.length > 0 && (
                    <div className="mt-4 ml-4 pl-4 border-l-2 border-border space-y-4">
                        {comment.replies.map((reply, idx) => (
                            <CommentItem key={idx} comment={reply} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default CommentsSection;

