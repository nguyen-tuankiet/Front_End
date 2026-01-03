import { useState, useEffect } from "react";
import { ExtensionHeader } from "@/components/extensions/ExtensionHeader.jsx";

// Danh sách tỉnh thành từ thẻ select bạn cung cấp
const PROVINCES = [
    { value: "Miền Bắc", label: "Miền Bắc" },
    { value: "Bình Định", label: "Bình Định" },
    { value: "Đà Nẵng", label: "Đà Nẵng" },
    { value: "Đắk Lắk", label: "Đắc Lắc" },
    { value: "Đắk Nông", label: "Đắc Nông" },
    { value: "Gia Lai", label: "Gia Lai" },
    { value: "Khánh Hòa", label: "Khánh Hoà" },
    { value: "Kon Tum", label: "Kon Tum" },
    { value: "Ninh Thuận", label: "Ninh Thuận" },
    { value: "Phú Yên", label: "Phú Yên" },
    { value: "Quảng Bình", label: "Quảng Bình" },
    { value: "Quảng Nam", label: "Quảng Nam" },
    { value: "Quảng Ngãi", label: "Quảng Ngãi" },
    { value: "Quảng Trị", label: "Quảng Trị" },
    { value: "Huế", label: "Thừa Thiên Huế" },
    { value: "An Giang", label: "An Giang" },
    { value: "Bạc Liêu", label: "Bạc Liêu" },
    { value: "Bến Tre", label: "Bến Tre" },
    { value: "Bình Dương", label: "Bình Dương" },
    { value: "Bình Phước", label: "Bình Phước" },
    { value: "Bình Thuận", label: "Bình Thuận" },
    { value: "Cà Mau", label: "Cà Mau" },
    { value: "Cần Thơ", label: "Cần Thơ" },
    { value: "Đà Lạt", label: "Đà Lạt" },
    { value: "Đồng Nai", label: "Đồng Nai" },
    { value: "Đồng Tháp", label: "Đồng Tháp" },
    { value: "Hậu Giang", label: "Hậu Giang" },
    { value: "TPHCM", label: "Hồ Chí Minh" },
    { value: "Kiên Giang", label: "Kiên Giang" },
    { value: "Long An", label: "Long An" },
    { value: "Sóc Trăng", label: "Sóc Trăng" },
    { value: "Tây Ninh", label: "Tây Ninh" },
    { value: "Tiền Giang", label: "Tiền Giang" },
    { value: "Trà Vinh", label: "Trà Vinh" },
    { value: "Vĩnh Long", label: "Vĩnh Long" },
    { value: "Vũng Tàu", label: "Vũng Tàu" },
];

export function LotteryResult() {
    const [location, setLocation] = useState("Miền Bắc");
    const [lotteryData, setLotteryData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLottery = async () => {
            setLoading(true);
            try {
                // Encode location để đưa vào URL (ví dụ: Miền Bắc -> Mi%C3%AA%CC%80n%20B%C4%83%CC%81c)
                const encodedLoc = encodeURIComponent(location);
                const response = await fetch(`https://eth2.cnnd.vn/get-kqxs?sdate=null&lc=${encodedLoc}`);
                const result = await response.json();

                if (result.items && result.items.length > 0) {
                    setLotteryData(result.items[0]);
                } else {
                    setLotteryData(null);
                }
            } catch (error) {
                console.error("Lỗi lấy kết quả xổ số:", error);
                setLotteryData(null);
            } finally {
                setLoading(false);
            }
        };

        fetchLottery();
    }, [location]);

    // Hàm helper để render một dòng giải thưởng
    const renderRow = (prizeName, prizeData, isSpecial = false) => {
        if (!prizeData || prizeData.length === 0) return null;

        // Nối các số trúng thưởng bằng dấu " - "
        const numbers = prizeData.map(item => item.value).join(" - ");

        return (
            <tr className="border-b border-gray-100 last:border-0 hover:bg-gray-50">
                <td className={`py-4 pl-4 font-bold text-gray-700 w-1/4 align-top ${isSpecial ? 'text-red-600' : ''}`}>
                    {prizeName}
                </td>
                <td className={`py-4 pr-4 text-right text-gray-900 font-medium tracking-wide ${isSpecial ? 'text-red-600 text-lg font-bold' : ''}`}>
                    {numbers}
                </td>
            </tr>
        );
    };

    return (
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
            <ExtensionHeader />

            {/* Control & Header */}
            <div className="flex flex-col sm:flex-row justify-between items-center mb-6 mx-auto w-3/4 gap-4 mt-5">
                {/* Select Dropdown */}
                <div className="relative w-3/4 sm:w-48">
                    <select
                        id="selectKqxs"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
                        focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500
                        disabled:bg-gray-50 disabled:text-gray-500 disabled:border-gray-200 disabled:shadow-none"
                    >
                        {PROVINCES.map((prov) => (
                            <option key={prov.value} value={prov.value}>
                                {prov.label}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Text thông báo ngày */}
                <div className="text-sm text-gray-600 text-right">
                    Kết quả xổ số <span className="font-bold text-gray-900">{location}</span> ngày <span className="font-bold text-gray-900">{lotteryData?.time_spin_string || "..."}</span>
                </div>
            </div>

            {/* Table Display */}
            {loading ? (
                <div className="py-8 text-center text-gray-400">Đang quay số...</div>
            ) : !lotteryData ? (
                <div className="py-8 text-center text-gray-400">Chưa có dữ liệu cho ngày này</div>
            ) : (
                <div className="overflow-hidden border border-gray-200 rounded-lg w-3/4 mx-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-gray-50 text-gray-700 font-bold border-b border-gray-200">
                        <tr>
                            <th className="py-3 pl-4">Tên giải</th>
                            <th className="py-3 pr-4 text-right">Số Trúng thưởng</th>
                        </tr>
                        </thead>
                        <tbody>
                        {/* Giải Đặc Biệt */}
                        {renderRow("ĐB", lotteryData.prize_special, true)}

                        {/* Giải 1 */}
                        {renderRow("1", lotteryData.prize_1)}

                        {/* Giải 2 */}
                        {renderRow("2", lotteryData.prize_2)}

                        {/* Giải 3 */}
                        {renderRow("3", lotteryData.prize_3)}

                        {/* Giải 4 */}
                        {renderRow("4", lotteryData.prize_4)}

                        {/* Giải 5 */}
                        {renderRow("5", lotteryData.prize_5)}

                        {/* Giải 6 */}
                        {renderRow("6", lotteryData.prize_6)}

                        {/* Giải 7 */}
                        {renderRow("7", lotteryData.prize_7)}

                        {/* Giải 8 (Chỉ hiện nếu có data - thường là miền Nam/Trung) */}
                        {lotteryData.prize_8 && renderRow("8", lotteryData.prize_8)}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}