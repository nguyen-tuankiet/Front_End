import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Bot, User, Loader2, ExternalLink, ChevronDown, ChevronUp } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { apiService } from "@/services/api";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";

export function ChatBot() {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isShifted, setIsShifted] = useState(false); // State to track position shift
  const [expandedMessages, setExpandedMessages] = useState({}); // Track which messages have expanded article lists
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  // Initialize greeting message with translation
  useEffect(() => {
    setMessages([
      {
        id: 1,
        type: "bot",
        content: t("chatbot.greeting"),
        timestamp: new Date(),
      },
    ]);
  }, [t]);

  // Toggle expanded state for a message's article list
  const toggleExpanded = (messageId) => {
    setExpandedMessages((prev) => ({
      ...prev,
      [messageId]: !prev[messageId],
    }));
  };

  // Auto scroll to bottom when new message arrives
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Focus input when chat opens
  useEffect(() => {
    console.log("ChatBot mounted"); 
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Handle scroll to shift ChatBot
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setIsShifted(true);
      } else {
        setIsShifted(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage = {
      id: Date.now(),
      type: "user",
      content: inputValue.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    try {
      const response = await apiService.sendChatMessage(userMessage.content);

      // Handle navigation URL - redirect to article detail page
      if (response.navigationUrl) {
        const botMessage = {
          id: Date.now() + 1,
          type: "bot",
          content: response.message,
          navigationUrl: response.navigationUrl,
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, botMessage]);
        
        // Navigate to article detail page
        const articleUrl = encodeURIComponent(response.navigationUrl);
        navigate(`/bai-viet?url=${articleUrl}`);
        return;
      }

      const botMessage = {
        id: Date.now() + 1,
        type: "bot",
        content: response.message,
        category: response.category,
        articleCount: response.articleCount,
        articles: response.articles,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      const errorMessage = {
        id: Date.now() + 1,
        type: "bot",
        content: t("chatbot.error"),
        isError: true,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString("vi-VN", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Handle clicking on an article link
  const handleArticleClick = (articleUrl) => {
    const encodedUrl = encodeURIComponent(articleUrl);
    navigate(`/bai-viet?url=${encodedUrl}`);
    setIsOpen(false); // Close chat popup after navigation
  };


  const renderMessageContent = (content, hasArticles = false) => {
    let processedContent = content.replace(/^📰\s*/, '');
    
    let lines = processedContent.split("\n");
    if (hasArticles) {
      lines = lines.filter(line => !line.match(/^\.\.\.và \d+ tin khác$/));
    }
    
    return lines.map((line, index) => {
      // Bold text: **text**
      const formattedLine = line.replace(
        /\*\*(.*?)\*\*/g,
        '<strong class="font-semibold">$1</strong>'
      );
      return (
        <span key={index}>
          <span dangerouslySetInnerHTML={{ __html: formattedLine }} />
          {index < lines.length - 1 && <br />}
        </span>
      );
    });
  };

  // Render articles list with clickable links
  const renderArticles = (articles, messageId) => {
    if (!articles || articles.length === 0) return null;
    
    const isExpanded = expandedMessages[messageId];
    const displayedArticles = isExpanded ? articles : articles.slice(0, 5);
    const hasMore = articles.length > 5;
    
    return (
      <div className="mt-3 space-y-2">
        <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-2">
           {t("chatbot.clickToView")}
        </p>
        {displayedArticles.map((article, index) => (
          <button
            key={index}
            onClick={() => handleArticleClick(article.link)}
            className={cn(
              "w-full text-left p-2 rounded-lg transition-all duration-200",
              "bg-gray-100 dark:bg-gray-700/50 hover:bg-primary/10 dark:hover:bg-primary/20",
              "border border-transparent hover:border-primary/30",
              "group flex items-start gap-2"
            )}
          >
            <span className="flex-shrink-0 w-5 h-5 rounded-full bg-primary/20 text-primary text-xs flex items-center justify-center font-medium">
              {index + 1}
            </span>
            <span className="flex-1 text-xs text-gray-700 dark:text-gray-300 group-hover:text-primary line-clamp-2">
              {article.title}
            </span>
            <ExternalLink className="flex-shrink-0 w-3 h-3 text-gray-400 group-hover:text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>
        ))}
        {hasMore && (
          <button
            onClick={() => toggleExpanded(messageId)}
            className={cn(
              "w-full flex items-center justify-center gap-1 py-2 text-xs",
              "text-primary hover:text-orange-600 transition-colors",
              "hover:bg-primary/5 rounded-lg"
            )}
          >
            {isExpanded ? (
              <>
                <ChevronUp className="w-4 h-4" />
                <span>{t("chatbot.collapse")}</span>
              </>
            ) : (
              <>
                <ChevronDown className="w-4 h-4" />
                <span>{t("chatbot.showMore").replace("{count}", articles.length - 5)}</span>
              </>
            )}
          </button>
        )}
      </div>
    );
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "fixed right-6 z-[9999] p-3 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110",
          isShifted ? "bottom-24" : "bottom-6", 
          "bg-gradient-to-r from-primary to-orange-600 hover:from-orange-600 hover:to-orange-700",
          "text-white focus:outline-none focus:ring-4 focus:ring-primary/30",
          isOpen && "rotate-90"
        )}
        aria-label={isOpen ? "Đóng chat" : "Mở chat"}
      >
        {isOpen ? (
          <X className="w-5 h-5" />
        ) : (
          <MessageCircle className="w-5 h-5" />
        )}
      </button>

      {/* Chat Popup */}
      <div
        className={cn(
          "fixed right-6 z-[9999] w-[380px] max-w-[calc(100vw-48px)] rounded-2xl shadow-2xl transition-all duration-300 transform",
          isShifted ? "bottom-44" : "bottom-24", 
          "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700",
          isOpen
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 translate-y-4 pointer-events-none"
        )}
      >
        {/* Header */}
        <div className="flex items-center gap-3 p-4 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-primary to-orange-600 rounded-t-2xl">
          <div className="p-2 bg-white/20 rounded-full">
            <Bot className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-white">{t("chatbot.title")}</h3>
            <p className="text-xs text-white/90">{t("chatbot.subtitle")}</p>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="p-1 hover:bg-white/20 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Messages Container */}
        <div className="h-[400px] overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-gray-900">
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                "flex gap-2",
                message.type === "user" ? "justify-end" : "justify-start"
              )}
            >
              {message.type === "bot" && (
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                  <Bot className="w-5 h-5 text-white" />
                </div>
              )}
              <div
                className={cn(
                  "max-w-[80%] rounded-2xl px-4 py-2 text-sm",
                  message.type === "user"
                    ? "bg-primary text-white rounded-br-md"
                    : message.isError
                      ? "bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-bl-md"
                      : "bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 shadow-sm rounded-bl-md"
                )}
              >
                <div className="whitespace-pre-wrap break-words">
                  {renderMessageContent(message.content, message.articles && message.articles.length > 0)}
                </div>
                {/* Render clickable article links for bot messages */}
                {message.type === "bot" && message.articles && message.articles.length > 0 && (
                  renderArticles(message.articles, message.id)
                )}
                <span
                  className={cn(
                    "text-xs mt-1 block",
                    message.type === "user"
                      ? "text-white/80"
                      : "text-gray-400 dark:text-gray-500"
                  )}
                >
                  {formatTime(message.timestamp)}
                </span>
              </div>
              {message.type === "user" && (
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center">
                  <User className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                </div>
              )}
            </div>
          ))}

          {/* Loading indicator */}
          {isLoading && (
            <div className="flex gap-2 justify-start">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-2xl rounded-bl-md px-4 py-3 shadow-sm">
                <div className="flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin text-primary" />
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {t("chatbot.searching")}
                  </span>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-b-2xl">
          <div className="flex items-center gap-2">
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={t("chatbot.placeholder")}
              disabled={isLoading}
              className={cn(
                "flex-1 px-4 py-2 rounded-full border border-gray-300 dark:border-gray-600",
                "bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200",
                "focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent",
                "placeholder-gray-400 dark:placeholder-gray-500",
                "disabled:opacity-50 disabled:cursor-not-allowed",
                "text-sm"
              )}
            />
            <button
              onClick={handleSendMessage}
              disabled={!inputValue.trim() || isLoading}
              className={cn(
                "p-2 rounded-full transition-all duration-200",
                "bg-primary hover:bg-orange-600 text-white",
                "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-primary",
                "focus:outline-none focus:ring-2 focus:ring-primary/50"
              )}
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-2 text-center">
            {t("chatbot.hint")}
          </p>
        </div>
      </div>
    </>
  );
}

export default ChatBot;
