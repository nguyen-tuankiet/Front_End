import { useState, useEffect, useRef, useCallback } from "react";
import { Play, Pause, Headphones, ChevronLeft, ChevronRight, Volume2, SkipBack, SkipForward, ExternalLink, Loader2 } from "lucide-react";
import { cn, decodeHtmlEntities } from "@/lib/utils";
import LazyImage from "@/components/ui/LazyImage";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

const PODCAST_RSS_URL = "https://thanhnien.vn/rss/podcast.rss";

// Parse RSS XML to JSON
const parseRSS = (xmlText) => {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlText, "text/xml");
    
    const channel = xmlDoc.querySelector("channel");
    const items = xmlDoc.querySelectorAll("item");
    
    const podcasts = Array.from(items).map((item, index) => {
        const title = item.querySelector("title")?.textContent || "";
        const link = item.querySelector("link")?.textContent || "";
        const description = item.querySelector("description")?.textContent || "";
        const pubDate = item.querySelector("pubDate")?.textContent || "";
        const guid = item.querySelector("guid")?.textContent || "";
        
        // Extract image from description
        const imgMatch = description.match(/src="([^"]+)"/);
        const imageUrl = imgMatch ? imgMatch[1] : null;
        
        // Clean description
        const cleanDescription = description
            .replace(/<[^>]*>/g, "")
            .replace(/&nbsp;/g, " ")
            .replace(/&[a-z]+;/gi, " ")
            .trim();
        
        return {
            id: index,
            title: decodeHtmlEntities(title),
            link,
            description: decodeHtmlEntities(cleanDescription),
            pubDate: formatDate(pubDate),
            rawDate: pubDate,
            imageUrl,
            guid
        };
    });
    
    return {
        title: channel?.querySelector("title")?.textContent || "Podcast",
        description: channel?.querySelector("description")?.textContent || "",
        podcasts
    };
};

// Format date
const formatDate = (dateStr) => {
    if (!dateStr) return "";
    try {
        const date = new Date(dateStr);
        return date.toLocaleDateString("vi-VN", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric"
        });
    } catch {
        return dateStr;
    }
};

// Text-to-Speech Hook
const useSpeechSynthesis = () => {
    const [speaking, setSpeaking] = useState(false);
    const [paused, setPaused] = useState(false);
    const [supported, setSupported] = useState(false);
    const utteranceRef = useRef(null);
    
    useEffect(() => {
        setSupported('speechSynthesis' in window);
    }, []);
    
    const speak = useCallback((text, options = {}) => {
        if (!supported) return;
        
        window.speechSynthesis.cancel();
        
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = options.lang || 'vi-VN';
        utterance.rate = options.rate || 1;
        utterance.pitch = options.pitch || 1;
        utterance.volume = options.volume || 1;
        
        const voices = window.speechSynthesis.getVoices();
        const vietnameseVoice = voices.find(v => v.lang.includes('vi')) || voices.find(v => v.lang.includes('en'));
        if (vietnameseVoice) {
            utterance.voice = vietnameseVoice;
        }
        
        utterance.onstart = () => setSpeaking(true);
        utterance.onend = () => {
            setSpeaking(false);
            setPaused(false);
        };
        utterance.onerror = () => {
            setSpeaking(false);
            setPaused(false);
        };
        
        utteranceRef.current = utterance;
        window.speechSynthesis.speak(utterance);
    }, [supported]);
    
    const pause = useCallback(() => {
        if (supported && speaking) {
            window.speechSynthesis.pause();
            setPaused(true);
        }
    }, [supported, speaking]);
    
    const resume = useCallback(() => {
        if (supported && paused) {
            window.speechSynthesis.resume();
            setPaused(false);
        }
    }, [supported, paused]);
    
    const stop = useCallback(() => {
        if (supported) {
            window.speechSynthesis.cancel();
            setSpeaking(false);
            setPaused(false);
        }
    }, [supported]);
    
    return { speak, pause, resume, stop, speaking, paused, supported };
};

// Sidebar Player Component - Fixed on right side
function SidebarPlayer({ podcast, onPrev, onNext, hasPrev, hasNext }) {
    const { speak, pause, resume, stop, speaking, paused, supported } = useSpeechSynthesis();
    const [rate, setRate] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [articleContent, setArticleContent] = useState("");
    
    useEffect(() => {
        const prepareContent = async () => {
            if (!podcast) return;
            
            setIsLoading(true);
            try {
                const textToRead = `${podcast.title}. ${podcast.description}`;
                setArticleContent(textToRead);
            } catch (error) {
                console.error("Error preparing content:", error);
                setArticleContent(`${podcast.title}. ${podcast.description}`);
            } finally {
                setIsLoading(false);
            }
        };
        
        prepareContent();
        
        return () => {
            stop();
        };
    }, [podcast, stop]);
    
    const handlePlayPause = () => {
        if (speaking && !paused) {
            pause();
        } else if (paused) {
            resume();
        } else if (articleContent) {
            speak(articleContent, { rate });
        }
    };
    
    const handleRateChange = (newRate) => {
        setRate(newRate);
        if (speaking) {
            stop();
            setTimeout(() => {
                speak(articleContent, { rate: newRate });
            }, 100);
        }
    };
    
    const handlePrev = () => {
        stop();
        onPrev();
    };
    
    const handleNext = () => {
        stop();
        onNext();
    };
    
    if (!podcast) {
        return (
            <div className="bg-gradient-to-b from-orange-100 to-orange-50 dark:from-orange-900/20 dark:to-orange-800/10 rounded-2xl p-6">
                <div className="aspect-square rounded-xl bg-muted/50 flex items-center justify-center mb-4">
                    <Headphones className="w-16 h-16 text-muted-foreground/30" />
                </div>
                <p className="text-center text-muted-foreground text-sm">
                    Chọn một podcast để nghe
                </p>
            </div>
        );
    }
    
    return (
        <div className="bg-gradient-to-b from-orange-100 to-orange-50 dark:from-orange-900/20 dark:to-orange-800/10 rounded-2xl p-5">
            {/* Label */}
            <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full mb-4">
                Podcast
            </span>
            
            {/* Podcast Title */}
            <h3 className="font-bold text-foreground text-sm leading-tight mb-4 line-clamp-3">
                {podcast.title}
            </h3>
            
            {/* Thumbnail */}
            <div className="relative aspect-[4/3] rounded-xl overflow-hidden mb-4 shadow-lg">
                {podcast.imageUrl ? (
                    <LazyImage 
                        src={podcast.imageUrl} 
                        alt={podcast.title}
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <div className="w-full h-full bg-gradient-to-br from-primary to-orange-500 flex items-center justify-center">
                        <Headphones className="w-12 h-12 text-white" />
                    </div>
                )}
                {/* Playing animation overlay */}
                {speaking && !paused && (
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                        <div className="flex items-end gap-1 h-8">
                            {[1, 2, 3, 4, 5].map((i) => (
                                <div 
                                    key={i}
                                    className="w-1.5 bg-white rounded-full animate-pulse"
                                    style={{ 
                                        height: `${Math.random() * 100}%`,
                                        animationDelay: `${i * 0.1}s`
                                    }}
                                />
                            ))}
                        </div>
                    </div>
                )}
            </div>
            
            {/* Progress Bar */}
            <div className="mb-4">
                <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                    <span>0%</span>
                    <span className={cn(
                        "font-medium",
                        speaking && !paused ? "text-green-600" : "text-muted-foreground"
                    )}>
                        {speaking ? (paused ? "Tạm dừng" : "Đang phát...") : "Sẵn sàng"}
                    </span>
                </div>
                <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                    <div 
                        className={cn(
                            "h-full rounded-full transition-all duration-300",
                            speaking && !paused ? "bg-primary animate-pulse w-1/2" : "bg-primary/30 w-0"
                        )}
                    />
                </div>
            </div>
            
            {/* Player Controls */}
            <div className="flex items-center justify-center gap-3 mb-5">
                <button 
                    onClick={handlePrev}
                    disabled={!hasPrev}
                    className="p-2 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                    <SkipBack className="w-5 h-5" />
                </button>
                
                <button 
                    onClick={handlePlayPause}
                    disabled={isLoading || !supported}
                    className="w-14 h-14 rounded-full bg-primary text-white flex items-center justify-center hover:bg-primary/90 transition-all hover:scale-105 disabled:opacity-50 shadow-lg"
                >
                    {isLoading ? (
                        <Loader2 className="w-6 h-6 animate-spin" />
                    ) : speaking && !paused ? (
                        <Pause className="w-6 h-6" />
                    ) : (
                        <Play className="w-6 h-6 ml-0.5" />
                    )}
                </button>
                
                <button 
                    onClick={handleNext}
                    disabled={!hasNext}
                    className="p-2 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                    <SkipForward className="w-5 h-5" />
                </button>
            </div>
            
            {/* Speed Control */}
            <div className="mb-5">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-muted-foreground">Tốc độ đọc</span>
                    <span className="text-xs font-medium text-primary">{rate}x</span>
                </div>
                <div className="flex items-center gap-1">
                    {[0.5, 1, 1.5, 2].map((r) => (
                        <button
                            key={r}
                            onClick={() => handleRateChange(r)}
                            className={cn(
                                "flex-1 py-2 rounded-lg text-xs font-medium transition-colors",
                                rate === r 
                                    ? "bg-primary text-white" 
                                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                            )}
                        >
                            {r}x
                        </button>
                    ))}
                </div>
            </div>
        
            
            {!supported && (
                <p className="text-center text-muted-foreground text-xs mt-3">
                    Trình duyệt không hỗ trợ Text-to-Speech
                </p>
            )}
        </div>
    );
}

// Podcast List Item - Compact with number
function PodcastListItem({ podcast, index, onClick, isActive }) {
    return (
        <div 
            className={cn(
                "flex gap-4 p-4 cursor-pointer transition-all duration-200 hover:bg-muted/50 group border-b border-border last:border-b-0",
                isActive && "bg-primary/5"
            )}
            onClick={() => onClick(podcast)}
        >
            {/* Number */}
            <span className="text-2xl font-bold text-blue-900 dark:text-blue-400 w-8 flex-shrink-0 pt-1">
                {String(index + 1).padStart(2, '0')}
            </span>
            
            {/* Thumbnail */}
            <div className="relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden">
                {podcast.imageUrl ? (
                    <LazyImage
                        src={podcast.imageUrl}
                        alt={podcast.title}
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <div className="w-full h-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center">
                        <Headphones className="w-6 h-6 text-white" />
                    </div>
                )}
                {/* Play overlay on hover */}
                <div className={cn(
                    "absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity",
                    isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                )}>
                    <div className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center">
                        {isActive ? (
                            <Pause className="w-4 h-4 text-primary" />
                        ) : (
                            <Play className="w-4 h-4 text-primary ml-0.5" />
                        )}
                    </div>
                </div>
            </div>
            
            {/* Content */}
            <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs text-muted-foreground">Podcast</span>
                    <span className="text-xs text-muted-foreground">•</span>
                    <span className="text-xs text-muted-foreground">{podcast.pubDate}</span>
                </div>
                <h3 className="text-sm font-semibold text-foreground line-clamp-2 mb-1 group-hover:text-primary transition-colors">
                    {podcast.title}
                </h3>
                <p className="text-xs text-muted-foreground line-clamp-2">
                    {podcast.description}
                </p>
            </div>
            
            {/* Play button */}
            <button 
                className="self-center p-2 rounded-full text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
                onClick={(e) => {
                    e.stopPropagation();
                    onClick(podcast);
                }}
            >
                <Play className="w-5 h-5" />
            </button>
        </div>
    );
}

// Sidebar Most Listened List
function MostListenedList({ podcasts, onSelect, currentPodcast }) {
    return (
        <div className="bg-card rounded-xl shadow-sm overflow-hidden">
            <div className="p-4 border-b border-border">
                <h3 className="font-bold text-foreground flex items-center gap-2">
                    <Headphones className="w-5 h-5 text-primary" />
                    Nghe nhiều nhất
                </h3>
            </div>
            <div className="divide-y divide-border">
                {podcasts.slice(0, 5).map((podcast, index) => (
                    <div 
                        key={podcast.id}
                        className={cn(
                            "flex gap-3 p-3 cursor-pointer hover:bg-muted/50 transition-colors",
                            currentPodcast?.id === podcast.id && "bg-primary/5"
                        )}
                        onClick={() => onSelect(podcast)}
                    >
                        <span className="text-xl font-bold text-primary/30 w-6 flex-shrink-0">
                            {String(index + 1).padStart(2, '0')}
                        </span>
                        <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-medium text-foreground line-clamp-2 hover:text-primary transition-colors">
                                {podcast.title}
                            </h4>
                            <span className="text-xs text-muted-foreground">{podcast.pubDate}</span>
                        </div>
                        {currentPodcast?.id === podcast.id && (
                            <div className="flex items-center">
                                <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

// Thanh Nien Podcast Info Card
function PodcastInfoCard() {
    return (
        <div className="bg-gradient-to-br from-blue-900 to-blue-700 rounded-xl p-5 text-white">
            <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                    <Headphones className="w-5 h-5" />
                </div>
                <div>
                    <h3 className="font-bold text-sm">Thanh Niên Podcast</h3>
                    <p className="text-xs text-white/70">Tin tức bằng giọng nói</p>
                </div>
            </div>
            <p className="text-xs text-white/80 leading-relaxed">
                Lắng nghe tin tức mới nhất được đọc tự động. Tiện lợi khi lái xe, tập thể dục hoặc làm việc.
            </p>
        </div>
    );
}

// Pagination Component
function Pagination({ currentPage, totalPages, onPageChange }) {
    const pages = [];
    const maxVisiblePages = 5;
    
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    
    if (endPage - startPage + 1 < maxVisiblePages) {
        startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }
    
    for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
    }
    
    return (
        <div className="flex items-center justify-center gap-2 mt-6">
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="p-2 rounded-lg border border-border hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
                <ChevronLeft className="w-4 h-4" />
            </button>
            
            {startPage > 1 && (
                <>
                    <button
                        onClick={() => onPageChange(1)}
                        className="w-8 h-8 rounded-lg border border-border hover:bg-muted transition-colors text-sm"
                    >
                        1
                    </button>
                    {startPage > 2 && <span className="px-1 text-muted-foreground">...</span>}
                </>
            )}
            
            {pages.map(page => (
                <button
                    key={page}
                    onClick={() => onPageChange(page)}
                    className={cn(
                        "w-8 h-8 rounded-lg border transition-colors text-sm font-medium",
                        page === currentPage 
                            ? "bg-primary text-white border-primary" 
                            : "border-border hover:bg-muted"
                    )}
                >
                    {page}
                </button>
            ))}
            
            {endPage < totalPages && (
                <>
                    {endPage < totalPages - 1 && <span className="px-1 text-muted-foreground">...</span>}
                    <button
                        onClick={() => onPageChange(totalPages)}
                        className="w-8 h-8 rounded-lg border border-border hover:bg-muted transition-colors text-sm"
                    >
                        {totalPages}
                    </button>
                </>
            )}
            
            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="p-2 rounded-lg border border-border hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
                <ChevronRight className="w-4 h-4" />
            </button>
        </div>
    );
}

// Main Podcast Page Component
export function PodcastPage() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [podcastData, setPodcastData] = useState(null);
    const [selectedPodcast, setSelectedPodcast] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    
    useEffect(() => {
        const fetchPodcasts = async () => {
            try {
                setLoading(true);
                
                // Check cache first
                const cacheKey = 'podcast_data_cache';
                const cacheTimeKey = 'podcast_data_cache_time';
                const cachedData = localStorage.getItem(cacheKey);
                const cachedTime = localStorage.getItem(cacheTimeKey);
                const cacheExpiry = 5 * 60 * 1000; // 5 minutes
                
                if (cachedData && cachedTime && (Date.now() - parseInt(cachedTime)) < cacheExpiry) {
                    const data = JSON.parse(cachedData);
                    setPodcastData(data);
                    if (data.podcasts.length > 0) {
                        setSelectedPodcast(data.podcasts[0]);
                    }
                    setLoading(false);
                    return;
                }
                
                // Try multiple CORS proxies for faster response
                const corsProxies = [
                    "https://api.codetabs.com/v1/proxy?quest=",
                    "https://thingproxy.freeboard.io/fetch/",
                    "https://api.allorigins.win/get?url="
                ];
                
                let response = null;
                let xmlText = null;
                
                for (const proxy of corsProxies) {
                    try {
                        const controller = new AbortController();
                        const timeoutId = setTimeout(() => controller.abort(), 10000); // 10s timeout
                        
                        const url = proxy.includes('allorigins') 
                            ? `${proxy}${encodeURIComponent(PODCAST_RSS_URL)}`
                            : `${proxy}${PODCAST_RSS_URL}`;
                            
                        response = await fetch(url, {
                            signal: controller.signal
                        });
                        
                        clearTimeout(timeoutId);
                        
                        if (response.ok) {
                            const result = await response.text();
                            // allorigins returns JSON with contents field
                            if (proxy.includes('allorigins')) {
                                const json = JSON.parse(result);
                                xmlText = json.contents;
                            } else {
                                xmlText = result;
                            }
                            if (xmlText && xmlText.includes('<rss')) {
                                break;
                            }
                        }
                    } catch (proxyError) {
                        console.log(`Proxy ${proxy} failed, trying next...`);
                        continue;
                    }
                }
                
                if (!xmlText) {
                    throw new Error("Failed to fetch podcasts from all proxies");
                }
                
                const data = parseRSS(xmlText);
                
                // Cache the data
                localStorage.setItem(cacheKey, JSON.stringify(data));
                localStorage.setItem(cacheTimeKey, Date.now().toString());
                
                setPodcastData(data);
                
                // Auto-select first podcast
                if (data.podcasts.length > 0) {
                    setSelectedPodcast(data.podcasts[0]);
                }
            } catch (err) {
                console.error("Error fetching podcasts:", err);
                setError("Không thể tải danh sách podcast. Vui lòng thử lại sau.");
            } finally {
                setLoading(false);
            }
        };
        
        fetchPodcasts();
    }, []);
    
    const handlePodcastClick = (podcast) => {
        setSelectedPodcast(podcast);
    };
    
    const handlePrevPodcast = () => {
        if (!selectedPodcast || !podcastData) return;
        const currentIndex = podcastData.podcasts.findIndex(p => p.id === selectedPodcast.id);
        if (currentIndex > 0) {
            setSelectedPodcast(podcastData.podcasts[currentIndex - 1]);
        }
    };
    
    const handleNextPodcast = () => {
        if (!selectedPodcast || !podcastData) return;
        const currentIndex = podcastData.podcasts.findIndex(p => p.id === selectedPodcast.id);
        if (currentIndex < podcastData.podcasts.length - 1) {
            setSelectedPodcast(podcastData.podcasts[currentIndex + 1]);
        }
    };
    
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <LoadingSpinner />
            </div>
        );
    }
    
    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <div className="text-center">
                    <Headphones className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                    <p className="text-lg text-muted-foreground">{error}</p>
                    <button 
                        onClick={() => window.location.reload()}
                        className="mt-4 px-6 py-2 bg-primary text-white rounded-full hover:bg-primary/90 transition-colors"
                    >
                        Thử lại
                    </button>
                </div>
            </div>
        );
    }
    
    const podcasts = podcastData?.podcasts || [];
    const totalPages = Math.ceil(podcasts.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedPodcasts = podcasts.slice(startIndex, startIndex + itemsPerPage);
    
    const selectedIndex = selectedPodcast ? podcasts.findIndex(p => p.id === selectedPodcast.id) : -1;
    
    return (
        <div className="min-h-screen bg-background">
            {/* Main Content */}
            <div className="container mx-auto px-4 py-6">
                <div className="flex flex-col lg:flex-row gap-6">
                    {/* Left - Podcast List */}
                    <div className="flex-1">
                        {/* Header */}
                        <div className="flex items-center justify-between mb-4">
                            <h1 className="text-xl font-bold text-foreground">
                                Danh sách Podcast
                            </h1>
                            <span className="text-sm text-muted-foreground">
                                Trang {currentPage} / {totalPages || 1}
                            </span>
                        </div>
                        
                        {/* Podcast List */}
                        <div className="bg-card rounded-xl shadow-sm overflow-hidden">
                            {paginatedPodcasts.map((podcast, index) => (
                                <PodcastListItem 
                                    key={podcast.id}
                                    podcast={podcast}
                                    index={startIndex + index}
                                    onClick={handlePodcastClick}
                                    isActive={selectedPodcast?.id === podcast.id}
                                />
                            ))}
                        </div>
                        
                        {/* Pagination */}
                        {totalPages > 1 && (
                            <Pagination 
                                currentPage={currentPage}
                                totalPages={totalPages}
                                onPageChange={setCurrentPage}
                            />
                        )}
                    </div>
                    
                    {/* Right Sidebar - Player + Most Listened */}
                    <div className="w-full lg:w-80 shrink-0">
                        <div className="lg:sticky lg:top-4 space-y-6">
                        {/* Player */}
                        <SidebarPlayer 
                            podcast={selectedPodcast}
                            onPrev={handlePrevPodcast}
                            onNext={handleNextPodcast}
                            hasPrev={selectedIndex > 0}
                            hasNext={selectedIndex < podcasts.length - 1}
                        />
                        
                        {/* Thanh Nien Podcast Info */}
                        <PodcastInfoCard />
                        
                        {/* Most Listened */}
                        <MostListenedList 
                            podcasts={podcasts}
                            onSelect={handlePodcastClick}
                            currentPodcast={selectedPodcast}
                        />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PodcastPage;
