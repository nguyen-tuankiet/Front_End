import {cn} from "@/lib/utils.js";

export function ExtensionHeader() {

    return (
        <div className={cn("container mx-auto ")}>
            <h1 className={cn("text-4xl mt-5 mb-2")}>Tiện ích</h1>
            <div className={cn("border border-blue-500 ")}></div>
            <div className={cn("flex gap-4 text-muted-foreground font-medium text-sm my-2")}>
                <a className={cn("hover:text-primary")} href="#">Thời tiết</a>
                <a className={cn("hover:text-primary")} href="#">Tỷ giá ngoại tệ</a>
                <a className={cn("hover:text-primary")} href="#">Giá vàng</a>
                <a className={cn("hover:text-primary")} href="#">Kết quả sổ số</a>
                <a className={cn("hover:text-primary")} href="#">Chứng Khoán</a>
                <a className={cn("hover:text-primary")} href="#">Lịch truyền hình</a>
                <a className={cn("hover:text-primary")} href="#">Lịch chiếu phim</a>
                <a className={cn("hover:text-primary")} href="#">Giá xăng dầu</a>
                <a className={cn("hover:text-primary")} href="#">AQI</a>
            </div>
            <div className={cn("border border-gray-400")}></div>

        </div>

    )
}

