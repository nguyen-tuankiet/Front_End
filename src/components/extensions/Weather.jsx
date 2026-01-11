import {ExtensionHeader} from "@/components/extensions/ExtensionHeader.jsx";
import React, {useEffect, useState} from "react";
import {cn} from "@/lib/utils.js";
import {Droplet, Wind} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export function Weather() {
    const { t } = useLanguage();

    const provinces = {
        "Ho Chi Minh": "Hồ Chí Minh",
        "Ha Noi": "Hà Nội",
        "Hai Phong": "Hải Phòng",
        "Da Nang": "Đà Nẵng",
        "Can Tho": "Cần Thơ",

        "An Giang": "An Giang",
        "Ba Ria - Vung Tau": "Bà Rịa - Vũng Tàu",
        "Bac Giang": "Bắc Giang",
        "Bac Kan": "Bắc Kạn",
        "Bac Lieu": "Bạc Liêu",
        "Bac Ninh": "Bắc Ninh",

        "Ben Tre": "Bến Tre",
        "Binh Dinh": "Bình Định",
        "Binh Duong": "Bình Dương",
        "Binh Phuoc": "Bình Phước",
        "Binh Thuan": "Bình Thuận",

        "Ca Mau": "Cà Mau",
        "Cao Bang": "Cao Bằng",

        "Dak Lak": "Đắk Lắk",
        "Dak Nong": "Đắk Nông",
        "Dien Bien": "Điện Biên",
        "Dong Nai": "Đồng Nai",
        "Dong Thap": "Đồng Tháp",

        "Gia Lai": "Gia Lai",
        "Ha Giang": "Hà Giang",
        "Ha Nam": "Hà Nam",
        "Ha Tinh": "Hà Tĩnh",
        "Hai Duong": "Hải Dương",
        "Hau Giang": "Hậu Giang",
        "Hoa Binh": "Hòa Bình",

        "Hung Yen": "Hưng Yên",
        "Khanh Hoa": "Khánh Hòa",
        "Kien Giang": "Kiên Giang",
        "Kon Tum": "Kon Tum",

        "Lai Chau": "Lai Châu",
        "Lam Dong": "Lâm Đồng",
        "Lang Son": "Lạng Sơn",
        "Lao Cai": "Lào Cai",
        "Long An": "Long An",

        "Nam Dinh": "Nam Định",
        "Nghe An": "Nghệ An",
        "Ninh Binh": "Ninh Bình",
        "Ninh Thuan": "Ninh Thuận",

        "Phu Tho": "Phú Thọ",
        "Phu Yen": "Phú Yên",

        "Quang Binh": "Quảng Bình",
        "Quang Nam": "Quảng Nam",
        "Quang Ngai": "Quảng Ngãi",
        "Quang Ninh": "Quảng Ninh",
        "Quang Tri": "Quảng Trị",

        "Soc Trang": "Sóc Trăng",
        "Son La": "Sơn La",

        "Tay Ninh": "Tây Ninh",
        "Thai Binh": "Thái Bình",
        "Thai Nguyen": "Thái Nguyên",
        "Thanh Hoa": "Thanh Hóa",
        "Thua Thien Hue": "Thừa Thiên Huế",

        "Tien Giang": "Tiền Giang",
        "Tra Vinh": "Trà Vinh",

        "Tuyen Quang": "Tuyên Quang",
        "Vinh Long": "Vĩnh Long",
        "Vinh Phuc": "Vĩnh Phúc",
        "Yen Bai": "Yên Bái"
    }
    const API_KEY = "6eddc250e49e47eaaae153300252512";

    const provinceKeys = Object.keys(provinces);
    const [selected, setSelected] = useState(provinceKeys[0]);
    const [weather, setWeather] = useState(null);

    const handleSelectChange = (e) => {
        setSelected(e.target.value)
    }

    useEffect(() => {
        const getWeather = async () => {
            try {
                const res = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${selected}&days=7&aqi=no&alerts=no`);
                const data = await res.json();
                setWeather(data);
            } catch (err) {
                console.error(err);
            }
        };

        getWeather();
    }, [selected]);


    const formatDate = (dateStr) => new Date(dateStr).toLocaleDateString("vi-VN", {
        day: "2-digit", month: "2-digit",
    });

    const getGreeting = () => {
        const hour = new Date().getHours();

        if (hour >= 5 && hour < 12) return t("extensions.weather.goodMorning");
        if (hour >= 12 && hour < 17) return t("extensions.weather.goodAfternoon");
        if (hour >= 17 && hour < 21) return t("extensions.weather.goodEvening");
        return t("extensions.weather.goodNight");
    }

    const hours = weather?.forecast?.forecastday?.[0]?.hour;

    const currentHour = new Date().getHours();

    const startIndex = hours?.findIndex(h => {
        const hHour = new Date(h.time).getHours();
        return hHour >= currentHour;
    });

    const next6Hours = startIndex !== -1
        ? hours?.slice(startIndex, startIndex + 6)
        : hours?.slice(0, 6);

    return (

        <div>
            <ExtensionHeader/>
            <div className={cn("container mx-auto my-5 bg-white rounded-3xl overflow-hidden flex flex-row", {})}>

                <div className={cn("w-3/4")}>
                    <div className={cn("px-10 py-5 flex justify-evenly ")}>
                        <select
                            className={cn("text-xl bg-gray-50 p-2 border border-gray-200 rounded-lg shadow-sm")}
                            name="province" id="province" onChange={handleSelectChange} value={selected}>
                            {Object.entries(provinces).map(([en, vi]) => (
                                <option key={en} value={en}>
                                    {vi}
                                </option>))}
                        </select>

                        <div><span className={cn("")}>{t("extensions.weather.lastUpdated")}:</span>
                            <span className={cn("font-bold pl-2")}>{weather?.current.last_updated}</span>
                        </div>
                    </div>

                    <div className={cn("flex flex-col items-center py-20")}>
                        <div className={cn("flex flex-row")}>
                            <span className={cn("text-9xl font-extrabold")}>{weather?.current.temp_c} °</span>

                            <div className={cn("flex flex-col pt-10 pl-5")}>
                                <div className={cn("flex flex-row py-1")}>
                                    <Wind/>
                                    <p className={cn("pl-2")}>{weather?.current?.wind_kph} km/h</p>
                                </div>

                                <div className={cn("flex flex-row ")}>
                                    <Droplet/>
                                    <p className={cn("pl-2")}>{weather?.current?.humidity} %</p>
                                </div>

                            </div>
                        </div>
                        <span className={cn("text-2xl font-extrabold flex flex-row items-center")}>
                            {weather?.current.condition.text ?? ""}
                            <img
                                src={`https:${weather?.current?.condition?.icon ?? ""}`}
                                alt={weather?.current?.condition?.text ?? ""}
                                className="w-12 h-12"
                            />
                        </span>
                    </div>

                    <div className={cn("mb-5 flex flex-row justify-center")}>
                        {weather?.forecast?.forecastday?.map((item) => (
                            <div
                                className={cn("flex flex-col border-gray-400 border rounded-3xl w-28 p-5 items-center justify-center mx-1")}>
                                <span className={cn("font-medium")}>{formatDate(item.date)}</span>
                                <span className={cn("text-3xl font-bold my-2")}> {item.day.avgtemp_c}°</span>
                                <span className={cn("text-muted-foreground text-xs")}>{item.day.condition?.text}</span>
                            </div>))}
                    </div>


                </div>


                <div className={cn("w-1/4 bg-gray-100 px-5 py-5 flex flex-col items-center ")}>
                    <span className={cn("text-3xl font-medium")}>{getGreeting()}</span>
                    <span className={cn("text-3xl font-bold py-5")}>
                          {new Date().toLocaleTimeString("en-US", {
                              hour: "2-digit",
                              minute: "2-digit",
                              hour12: true
                          })}
                    </span>

                    <div className={cn("flex flex-row items-center justify-center mt-5")}>
                        <span className={cn("text-3xl font-extrabold mr-4")}>{weather?.current.temp_c} °</span>

                        <div className={cn("flex flex-col text-xs ")}>
                            <div className={cn("flex flex-row py-1")}>
                                <Wind/>
                                <p className={cn("pl-2")}>{weather?.current?.wind_kph} km/h</p>
                            </div>

                            <div className={cn("flex flex-row ")}>
                                <Droplet/>
                                <p className={cn("pl-2")}>{weather?.current?.humidity} %</p>
                            </div>

                        </div>
                    </div>
                    <span className={cn("text-xs pt-2")}>{t("extensions.weather.feelsLike")}: {weather?.current?.feelslike_c} °"</span>


                    <div className={cn("flex flex-col items-center justify-center mt-5")}>
                        <span className={cn("text-2xl font-medium mb-5")}>{t("extensions.weather.nextHours")}</span>
                        <div className={cn("grid grid-cols-3 gap-3")}>
                            {next6Hours?.map((item) => (
                                <div
                                    className={cn("flex flex-col border-gray-400 border rounded-3xl w-20 p-5 items-center justify-center mx-1")}>
                                    <span className={cn("text-xs font-medium ")}>
                                        {new Date(item.time).toLocaleTimeString("en-US", {
                                            hour: "2-digit",
                                            hour12: true
                                        })}
                                    </span>
                                    <span className={cn("text-xl font-bold my-2")}> {item.temp_c}°</span>
                                    <span className={cn("text-xs text-muted-foreground ")}>{item.condition?.text}</span>
                                </div>))}
                        </div>
                    </div>
                </div>
            </div>


        </div>)
}