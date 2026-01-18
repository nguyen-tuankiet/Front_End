import { useState, useEffect } from "react";
import { ExtensionHeader } from "@/components/extensions/ExtensionHeader.jsx";
import { cn } from "@/lib/utils.js";
import { useLanguage } from "@/contexts/LanguageContext";

export function GoldPrice() {
    const { t } = useLanguage();
    const [goldData, setGoldData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [lastUpdated, setLastUpdated] = useState("");

    // Cấu hình danh sách các loại kim loại muốn lấy
    const METALS = [
        { symbol: 'XAU', name: 'Vàng Thế Giới (XAU)' },
        { symbol: 'XAG', name: 'Bạc (XAG)' },
        { symbol: 'XPT', name: 'Bạch Kim (XPT)' },
        { symbol: 'XPD', name: 'Palladium (XPD)' }
    ];

    const API_KEY = 'goldapi-ji5smkjd9e98-io';

    useEffect(() => {
        const fetchData = async () => {
            try {
                const promises = METALS.map(async (metal) => {
                    const response = await fetch(`https://www.goldapi.io/api/${metal.symbol}/`, {
                        method: 'GET',
                        headers: {
                            'x-access-token': API_KEY,
                            'Content-Type': 'application/json'
                        }
                    });

                    if (!response.ok) return null;
                    const data = await response.json();
                    return {
                        ...data,
                        name: metal.name,
                        symbol: metal.symbol
                    };
                });

                const results = await Promise.all(promises);
                const validData = results.filter(item => item !== null);

                if (validData.length > 0) {
                    setGoldData(validData);

                    // Lấy timestamp từ item đầu tiên để hiển thị giờ cập nhật
                    // GoldAPI trả về timestamp (seconds), nhân 1000 để ra milliseconds
                    const timestamp = validData[0].timestamp;
                    const date = new Date(timestamp * 1000);

                    const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')}`;
                    setLastUpdated(formattedDate);
                }
            } catch (error) {
                console.error("Lỗi khi lấy giá vàng từ GoldAPI:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // Hàm format tiền tệ VND
    const formatCurrency = (amount) => {
        if (!amount) return "...";
        // Làm tròn số và thêm dấu phẩy
        return new Intl.NumberFormat('vi-VN', {
            style: 'decimal',
            maximumFractionDigits: 0
        }).format(amount);
    };

    return (
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 space-y-4 mx-auto my-5 w-3/4">
            <ExtensionHeader />

            {/* Dòng hiển thị ngày cập nhật */}
            <div className={cn("mx-4 sm:mx-10 md:mx-32")}> {/* Adjusted margin responsive */}
                <div className="flex justify-between items-end mb-4 mt-2">
                    <div className="text-sm text-gray-500">
                        {t("extensions.goldPrice.lastUpdated") || "Cập nhật lúc:"} {lastUpdated || "..."}
                    </div>
                    <div className="text-xs text-gray-400 italic">
                        Đơn vị: USD / Ounce
                    </div>
                </div>

                {loading ? (
                    <div className="text-center py-8 text-gray-400 animate-pulse">
                        {t("extensions.goldPrice.loading") || "Đang tải dữ liệu..."}
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="text-gray-700 font-bold border-b border-gray-200 bg-gray-50/50">
                            <tr>
                                <th className="py-3 px-4">{t("extensions.goldPrice.type") || "Loại"}</th>
                                <th className="py-3 px-2 text-right text-green-600">{t("extensions.goldPrice.buy") || "Giá Mua (Bid)"}</th>
                                <th className="py-3 px-4 text-right text-red-600">{t("extensions.goldPrice.sell") || "Giá Bán (Ask)"}</th>
                            </tr>
                            </thead>
                            <tbody>
                            {goldData.map((item, index) => (
                                <tr key={item.symbol || index} className="border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors">
                                    <td className="py-4 px-4 font-medium text-gray-900">
                                        <div className="flex flex-col">
                                            <span>{item.name}</span>
                                            {/* Hiển thị % thay đổi nếu có */}
                                            <span className={`text-xs ${item.chp > 0 ? 'text-green-500' : 'text-red-500'}`}>
                                                    {item.chp > 0 ? '+' : ''}{item.chp}%
                                                </span>
                                        </div>
                                    </td>
                                    <td className="py-4 px-2 text-right text-gray-700 font-semibold">
                                        {formatCurrency(item.bid)}
                                    </td>
                                    <td className="py-4 px-4 text-right text-gray-700 font-semibold">
                                        {formatCurrency(item.ask)}
                                    </td>
                                </tr>
                            ))}
                            {goldData.length === 0 && !loading && (
                                <tr>
                                    <td colSpan="3" className="text-center py-4 text-red-500">
                                        Không thể tải dữ liệu API.
                                    </td>
                                </tr>
                            )}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}