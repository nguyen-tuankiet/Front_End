import {cn} from "@/lib/utils.js";
import { useLanguage } from "@/contexts/LanguageContext";

export function ExtensionHeader() {
    const { t } = useLanguage();

    return (
        <div className={cn("container mx-auto ")}>
            <h1 className={cn("text-4xl mt-5 mb-2")}>{t("extensions.header.title")}</h1>
            <div className={cn("border border-blue-500 ")}></div>
            <div className={cn("flex gap-4 text-muted-foreground font-medium text-sm my-2")}>
                <a className={cn("hover:text-primary")} href="/tien-ich/thoi-tiet">{t("extensions.header.weather")}</a>
                <a className={cn("hover:text-primary")} href="/tien-ich/ty-gia">{t("extensions.header.exchangeRate")}</a>
                <a className={cn("hover:text-primary")} href="/tien-ich/gia-vang">{t("extensions.header.goldPrice")}</a>
                <a className={cn("hover:text-primary")} href="/tien-ich/kqsx">{t("extensions.header.lottery")}</a>
                <a className={cn("hover:text-primary")} href="/tien-ich/chung-khoan">{t("extensions.header.stock")}</a>
                <a className={cn("hover:text-primary")} href="/tien-ich/bong-da">{t("extensions.header.footballSchedule")}</a>
                <a className={cn("hover:text-primary")} href="#">{t("extensions.header.movieSchedule")}</a>
                <a className={cn("hover:text-primary")} href="#">{t("extensions.header.gasPrice")}</a>
                <a className={cn("hover:text-primary")} href="#">{t("extensions.header.aqi")}</a>
            </div>
            <div className={cn("border border-gray-400")}></div>

        </div>

    )
}

