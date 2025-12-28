import {ExtensionHeader} from "@/components/extensions/ExtensionHeader.jsx";
import React, {useEffect, useState} from "react";
import {cn} from "@/lib/utils.js";
import {Clock9} from "lucide-react";

export function ExchangeRate() {

    const data = {
        "date": "12/28/2025 9:36:19 PM",
        "source": "Joint Stock Commercial Bank for Foreign Trade of Vietnam - Vietcombank",
        "rates": [
            { "currency": "AUD", "name": "AUSTRALIAN DOLLAR", "buy": "17,168.37", "transfer": "17,341.79", "sell": "17,897.19" },
            { "currency": "CAD", "name": "CANADIAN DOLLAR", "buy": "18,729.66", "transfer": "18,918.85", "sell": "19,524.77" },
            { "currency": "CHF", "name": "SWISS FRANC", "buy": "32,491.69", "transfer": "32,819.88", "sell": "33,871.01" },
            { "currency": "CNY", "name": "YUAN RENMINBI", "buy": "3,654.61", "transfer": "3,691.52", "sell": "3,809.75" },
            { "currency": "DKK", "name": "DANISH KRONE", "buy": "-", "transfer": "4,068.84", "sell": "4,224.43" },
            { "currency": "EUR", "name": "EURO", "buy": "30,166.87", "transfer": "30,471.59", "sell": "31,757.33" },
            { "currency": "GBP", "name": "POUND STERLING", "buy": "34,574.80", "transfer": "34,924.04", "sell": "36,042.55" },
            { "currency": "HKD", "name": "HONGKONG DOLLAR", "buy": "3,283.09", "transfer": "3,316.25", "sell": "3,443.06" },
            { "currency": "INR", "name": "INDIAN RUPEE", "buy": "-", "transfer": "291.34", "sell": "303.88" },
            { "currency": "JPY", "name": "YEN", "buy": "162.06", "transfer": "163.69", "sell": "172.35" },
            { "currency": "KRW", "name": "KOREAN WON", "buy": "15.65", "transfer": "17.38", "sell": "18.86" },
            { "currency": "KWD", "name": "KUWAITI DINAR", "buy": "-", "transfer": "85,051.78", "sell": "89,174.26" },
            { "currency": "MYR", "name": "MALAYSIAN RINGGIT", "buy": "-", "transfer": "6,441.16", "sell": "6,581.30" },
            { "currency": "NOK", "name": "NORWEGIAN KRONER", "buy": "-", "transfer": "2,574.07", "sell": "2,683.22" },
            { "currency": "RUB", "name": "RUSSIAN RUBLE", "buy": "-", "transfer": "320.51", "sell": "354.79" },
            { "currency": "SAR", "name": "SAUDI RIAL", "buy": "-", "transfer": "6,964.25", "sell": "7,263.97" },
            { "currency": "SEK", "name": "SWEDISH KRONA", "buy": "2,806.71", "transfer": "2,925.72", "sell": "2,925.72" },
            { "currency": "SGD", "name": "SINGAPORE DOLLAR", "buy": "19,919.20", "transfer": "20,120.41", "sell": "20,806.39" },
            { "currency": "THB", "name": "THAILAND BAHT", "buy": "746.43", "transfer": "829.37", "sell": "864.54" },
            { "currency": "USD", "name": "US DOLLAR", "buy": "26,054.00", "transfer": "26,084.00", "sell": "26,384.00" }
        ]
    }


    const [rate, setRate] = useState(data);


    return ( <div>
            <ExtensionHeader/>

            <div className={cn("container mx-auto my-5 ")}>
                <div className={cn("flex flex-col items-center justify-center ")}>
                    <span className={cn("text-3xl font-bold")}>Tỷ giá ngoại tệ</span>
                    <span className={cn("text-muted-foreground m-2")}>Tỷ giá quy đổi sang Đồng Việt Nam (VND)</span>
                </div>
            </div>

            <div className={cn("flex flex-col items-center justify-center mb-10")}>

                <div className={cn("text-xs text-muted-foreground flex flex-row items-center justify-center m-5")}>
                    <Clock9/>
                    <span className={cn("pl-2 ")}>Cập nhật lúc: {rate?.date}</span>
                </div>

                <div className={cn("w-4/5 rounded-xl overflow-hidden border border-gray-400")}>
                    <table className={cn("w-full ")}>
                        <thead className={cn("bg-gray-100 h-12 border-b border-gray-200")}>
                        <tr>
                            <th className={cn("text-left p-4")}>Tên</th>
                            <th className={cn("text-center p-4")}>Mã</th>
                            <th className={cn("text-right p-4")}>Mua</th>
                            <th className={cn("text-right p-4")}>Chuyển khoản</th>
                            <th className={cn("text-right p-4")}>Bán</th>
                        </tr>
                        </thead>

                        <tbody>
                        {rate?.rates?.map((item) => (
                            <tr className={cn("h-12 border-b border-gray-200 odd:bg-gray-100 hover:bg-gray-300")}>
                                <td className={cn("text-left p-4")}>{item.name}</td>
                                <td className={cn("text-center p-4")}>{item.currency}</td>
                                <td className={cn("text-right p-4")}>{item.buy}</td>
                                <td className={cn("text-right p-4")}>{item.transfer}</td>
                                <td className={cn("text-right p-4")}>{item.sell}</td>
                            </tr>
                        ))}
                        </tbody>

                    </table>
                </div>


            </div>
        </div>
    )
}