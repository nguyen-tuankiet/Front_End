import {cn} from "@/lib/utils";
import {Pause, Settings, Volume2} from "lucide-react";
import {Button} from "./button";
import {useEffect, useState} from "react";

export function ListenButton({article}) {

    const [isPaused, setIsPaused] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [utterance, setUtterance] = useState(null);


    useEffect(() => {
        const synth = window.speechSynthesis;
        const u = new SpeechSynthesisUtterance(article.content);
        u.lang = 'vi-VN';
        u.rate = 1.25;
        u.onend = ()=> {
            setIsPaused(false);
            setIsPlaying(false);
        }

        setUtterance(u);

        return () => {
            synth.cancel();
        }
    }, [article.content]);



    const toggleListen = () => {
        const synth = window.speechSynthesis;
        if (isPlaying && !isPaused) {
            synth.pause();
            setIsPaused(true);
        } else if (isPaused) {
            synth.resume();
            setIsPaused(false);
        } else {
            synth.cancel();
            synth.speak(utterance);
            setIsPlaying(true);
            setIsPaused(false);
        }
    }

    return (
        <div className={cn("flex flex-row items-center")}>
            <Button
                variant= {isPlaying ? "default" : "outline"}
                onClick={toggleListen}
                size="sm"
                className={cn("gap-2 min-w-40",)}
            >
                {isPlaying && !isPaused ? (
                    <>
                        <Pause className="w-4 h-4" />
                        Tạm dừng
                    </>
                ) : (
                    <>
                        <Volume2 className="w-4 h-4" />
                        {isPaused ? "Tiếp tục nghe" : "Nghe bài viết"}
                    </>
                )}


            </Button>

            <Settings
                className={cn("ml-2 cursor-pointer hover:bg-accent p-1 w-8 h-8 rounded-xl",)}

            ></Settings>


        </div>
    );
}

export default ListenButton;

