import { useState, useEffect } from "react";
import { ExtensionHeader } from "@/components/extensions/ExtensionHeader.jsx";
import {cn} from "@/lib/utils.js";

export function GoldPrice() {
    const [goldData, setGoldData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [lastUpdated, setLastUpdated] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                // URL API bạn cung cấp
                const response = await fetch('https://eth2.cnnd.vn/Handlers/RateGoldUsdHandler.ashx?c=gold&type=%22SJC_Ha_Noi%22%2C%22SJC_HCM%22%2C%22DOJI_AVPL_%2F_HN%22%2C%22DOJI_AVPL_%2F_HCM%22%2C%22VIETINBANK_GOLD%22%2C%22MARITIME_BANK%22%2C%22PNJ_SJC%22%2C%22EXIMBANK%22%2C%22PHU_QUY_SJC%22%2C%22SJC_Da_Nang%22&date=2%2F1%2F2026');
                const result = await response.json();

                if (result.success && result.data) {
                    setGoldData(result.data);

                    // Lấy thời gian cập nhật từ item đầu tiên hoặc thời gian hiện tại
                    // API trả về time_spin (timestamp), ta convert sang format ngày giờ
                    if (result.data.length > 0 && result.data[0].time_spin) {
                        const date = new Date(result.data[0].time_spin);
                        // Format: 2/1/2026 22:37
                        const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')}`;
                        setLastUpdated(formattedDate);
                    }
                }
            } catch (error) {
                console.error("Lỗi khi lấy giá vàng:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="">
            {/* Header extension của bạn */}
            <ExtensionHeader />

            {/* Dòng hiển thị ngày cập nhật */}
            <div className={cn("mx-32")}>
                <div className="text-sm text-gray-500 mb-4 mt-2">
                    Giá vàng cập nhật ngày {lastUpdated || "..."}
                </div>

                {loading ? (
                    <div className="text-center py-4 text-gray-400">Đang tải dữ liệu...</div>
                ) : (
                    <div className="">
                        <table className="w-3/4 text-sm text-left">
                            <thead className="text-gray-700 font-bold border-b border-gray-200">
                            <tr>
                                <th className="py-3 pr-4">Loại vàng</th>
                                <th className="py-3 px-2 text-right">Giá mua</th>
                                <th className="py-3 pl-4 text-right">Bán</th>
                            </tr>
                            </thead>
                            <tbody>
                            {goldData.map((item, index) => (
                                <tr key={item.key || index} className="border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors">
                                    <td className="py-4 pr-4 font-medium text-gray-900">
                                        {/* Hiển thị tên loại vàng (Ví dụ: DOJI AVPL / HN) */}
                                        {item.name}
                                    </td>
                                    <td className="py-4 px-2 text-right text-gray-700">
                                        {/* Giá mua vào */}
                                        {item.buy_gold}
                                    </td>
                                    <td className="py-4 pl-4 text-right text-gray-700">
                                        {/* Giá bán ra (API trả về price_gold thường là giá bán) */}
                                        {item.price_gold}
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}