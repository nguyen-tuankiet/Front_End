import { cn } from "@/lib/utils";
import { Settings, Volume2} from "lucide-react";
import { Button } from "./button";
import {useEffect, useState} from "react";

export function ListenButton({ article}) {
    const content = "Một bữa tiệc ẩm thực 3 miền hội tụ các đặc sản hiếm có cùng những hương vị thân quen \"gây thương nhớ\" trong lòng người Việt là câu chuyện tiếp nối mùa thứ 11 của chuỗi sự kiện Hương vị quê nhà với chủ đề Mùi - vị.\n\nNhững câu chuyện về các gia vị và nguyên liệu Việt ở từng vùng thổ nhưỡng được kể thật bình dị nhưng cũng đầy đam mê bởi các nghệ nhân, chuyên gia ẩm thực và các đầu bếp, nơi sự khám phá và kết hợp tinh tế, hài hòa, thổi hồn vào từng món ăn, làm nên phong vị riêng được chia sẻ một cách sống động ngay tại các quầy ẩm thực.\n\nĐặc sản tinh túy của miền Bắc góp mặt trong Mùi - vị quê nhà\n\nMón khai vị mới nghe tên thôi đã thấy rất tò mò, bánh gật gù Tiên Yên (Quảng Ninh) ăn kèm cùng thịt băm, nước mắm Bắc và hành phi giòn thơm\n\nẢNH: NHÀ HÀNG MẶN MÒI\n\nMón thịt heo (lợn) đen Lăng Can nướng muối kiến, là đặc sản nổi tiếng của vùng núi Tuyên Quang. Giống lợn bản địa này được nuôi thả rông, ăn rau rừng, nên có thịt thơm săn chắc, ít mỡ, bì giòn\n\nẢNH: NHÀ HÀNG MẶN MÒI\n\nMón bún ốc nguội trứ danh của người Hà Nội\n\nẢNH: GIANG VŨ\n\nMiền núi Sơn La có món cá nướng Pa Pỉnh Tộp với cách chế biến tẩm ướp kỳ công, đậm đà gia vị, rồi được kẹp trên những thanh tre và nướng trên than hồng\n\nẢNH: NHÀ HÀNG MẶN MÒI\n\nĐặc sản tinh túy của miền Bắc với nhiều món ngon đáng trải nghiệm. Từ bánh gật gù Tiên Yên (Quảng Ninh) đến món thịt lợn đen Lăng Can nướng muối kiến, đặc sản nổi tiếng của vùng núi Tuyên Quang, cá nướng Pa Pỉnh Tộp. Cả hai món nướng này đều ăn cùng xốt chẩm chéo, một trong những gia vị trứ danh của miền Tây Bắc. Cùng với đó, thực khách có dịp thưởng vị những thức quà quen của Hà Nội với bún ốc nguội hay bún cá Quỳnh Côi đặc sắc của vùng đất Thái Bình cũ.\n\nẨm thực miền Trung thêm vào bữa tiệc bởi nét dân dã \"khó tìm\" giữa nhịp sống hiện đại\n\nBánh sắn đập Hội An\n\nẢNH: GIANG VŨ\n\nCháo cá khoai Nghệ An\n\nẢNH: GIANG VŨ\n\nNhút mít Hương Sơn\n\nẢNH: GIANG VŨ\n\nẨm thực miền Trung thêm vào bữa tiệc bởi nét dân dã \"khó tìm\" giữa nhịp sống hiện đại với món bánh sắn đập Hội An ăn cùng mắm nêm tỏi ớt hay mắm tôm chua Huế, gỏi cá Nam Ô (Đà Nẵng) nức tiếng với cách chế biến đậm chất địa phương từ làng chài Nam Ô lâu đời nằm dưới chân đèo Hải Vân, hay cháo cá khoai Nghệ An, một món ăn theo mùa độc đáo được người dân địa phương xem là món quà ngọt lành của biển cả vào mùa đông dành cho xứ Nghệ.\n\nXuôi về phương Nam, những hương vị hấp dẫn mang dấu ấn của miền sông nước\n\nChuối nếp nướng\n\nẢNH: GIANG VŨ\n\nGỏi tôm sông nướng miền Cù Lao\n\nẢNH: GIANG VŨ\n\nMón xôi chiên đẹp mắt ngon miệng\n\nẢNH: GIANG VŨ\n\nCác món gỏi trứ danh của miền Tây sông nước\n\nẢNH: GIANG VŨ\n\nXuôi về phương Nam là những hương vị hấp dẫn mang dấu ấn của miền sông nước miệt vườn như gỏi tôm sông miền Cù Lao, gà hấp bưởi Tân Triều ăn kèm muối tiêu sả hay vịt biển Cần Giờ nướng lu với xốt tiêu thơm lừng. Đặc biệt, có quầy xôi chiên phồng với đầu bếp biểu diễn điêu luyện, với kỹ thuật chiên những quả bóng xôi tròn to, thơm và giòn rụm.\n\nTại quầy tráng miệng, bên cạnh những đặc sản ngọt ngào được chọn lọc từ các vùng miền như kẹo dồi trà xanh, vỏ bưởi non sấy, bánh hồng Bình Định, sẽ có thêm những sáng tạo như mía ghim hấp hoa bưởi, chuối nếp nướng, chè bưởi hay kem mắm cá linh (An Giang), kem mắm tôm chua (Gò Công), thêm phần trải nghiệm khác lạ và thú vị cho thực khách.\n\nBiểu diễn múa dĩa trong nghệ thuật \"Múa bóng rỗi\"\n\nẢNH: GIANG VŨ\n\nSự kiện lần này còn giới thiệu \"Múa bóng rỗi\", một loại hình nghệ thuật diễn xướng có lịch sử hơn 300 năm ở vùng đất Nam bộ, được UNESCO công nhận là Di sản văn hóa phi vật thể của Việt Nam từ năm 2016. Xuất hiện như một phần nghi lễ xưa trong một số dịp lễ hội tại các đền miếu, múa bóng rỗi được các nhà nghiên cứu văn hóa xem là một phần của những điệu múa thiêng, \"điệu múa dâng Bà\", gắn với tín ngưỡng thờ Mẫu trong nền văn hóa nông nghiệp. Các nghệ sĩ, nghệ nhân thường xuất hiện trong phục trang rực rỡ, trình diễn những bài hát rỗi ngợi ca vẻ đẹp quê hương, lòng thành kính ơn trên... kết hợp với những điệu múa vừa khổ luyện vừa ngẫu hứng, từ dâng bông, múa trống, múa mâm vàng cùng những kỹ thuật đặc biệt khác."

    const [isPaused, setIsPaused] = useState(false);
    const [utterance, setUtterance] = useState(null);


    useEffect(() => {
        const synth = window.speechSynthesis;
        const u = new SpeechSynthesisUtterance(content);
        u.lang = 'vi-VN';
        u.rate = 1;
        setUtterance(u);

        return () => {
            synth.cancel();
        }
    }, [content]);

    const handlePlay = () => {
        const synth = window.speechSynthesis;
        if (isPaused) {
            synth.resume()
        }
        else {
            synth.speak(utterance)
        }
        setIsPaused(false);
    }

    const handlePause = () => {
        const synth = window.speechSynthesis;
        synth.pause()
        setIsPaused(true);
    }

    const handleStop = () => {
        const synth = window.speechSynthesis;
        synth.cancel();
        setIsPaused(false);
    }

    return (
        <div className={cn("flex flex-row items-center")}>
            <Button
            variant="outline"
            onclick ={handlePlay}
            size="sm"
            className={cn("gap-2",)}
        >
            <Volume2 className="w-4 h-4"/>
            Nghe bài viết
        </Button>

        <Settings
            className={cn("ml-2 cursor-pointer hover:bg-accent p-1 w-8 h-8 rounded-xl",)}

        ></Settings>


        </div>
    );
}

export default ListenButton;

