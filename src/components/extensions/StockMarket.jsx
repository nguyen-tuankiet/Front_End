import { useState, useEffect } from "react";
import { ExtensionHeader } from "@/components/extensions/ExtensionHeader.jsx";
import { useLanguage } from "@/contexts/LanguageContext";

export function StockMarket() {
    const { t } = useLanguage();
    const [stockData, setStockData] = useState([]);
    const [selectedId, setSelectedId] = useState(null); // ID của sàn đang chọn
    const [loading, setLoading] = useState(true);
    const [currentDate, setCurrentDate] = useState("");

    useEffect(() => {
        // Lấy ngày hiện tại format d/m/yyyy
        const date = new Date();
        setCurrentDate(`${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`);

        const fetchData = async () => {
            try {
                // Sử dụng proxy để tránh CORS - trên Vercel sẽ đi qua /api/stock
                const baseUrl = import.meta.env.PROD ? '/api/stock' : 'https://eth2.cnnd.vn';
                const response = await fetch(`${baseUrl}/api-stockdata.htm?m=index`);
                const rawResult = await response.json();

                // API trả về field Data là một chuỗi JSON, cần parse lần nữa
                if (rawResult.Success && rawResult.Data) {
                    const parsedData = JSON.parse(rawResult.Data);

                    if (parsedData.data && parsedData.data.index) {
                        const indices = parsedData.data.index;

                        // Lọc bỏ các item không có tên (trong data mẫu có id 21 bị rỗng tên)
                        const validIndices = indices.filter(item => item.name && item.name.trim() !== "");

                        setStockData(validIndices);

                        // Mặc định chọn item đầu tiên (thường là VNIndex)
                        if (validIndices.length > 0) {
                            setSelectedId(validIndices[0].id);
                        }
                    }
                }
            } catch (error) {
                console.error("Lỗi lấy dữ liệu chứng khoán:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // Tìm item đang được chọn để hiển thị
    const currentItem = stockData.find(item => item.id == selectedId);

    return (
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 space-y-4 mx-auto w-3/4">
            <ExtensionHeader />
            {/* Select Box */}
            <div className=" sm:w-64">
                <select
                    value={selectedId || ""}
                    onChange={(e) => setSelectedId(Number(e.target.value))}
                    disabled={loading}
                    className="block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm
                    focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500
                    disabled:bg-gray-100"
                >
                    {stockData.map((item) => (
                        <option key={item.id} value={item.id}>
                            {item.name}
                        </option>
                    ))}
                </select>
            </div>

            {loading ? (
                <div className="h-32 flex items-center justify-center text-gray-400 text-sm">
                    {t("extensions.stock.loading")}
                </div>
            ) : currentItem ? (
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                    {/* Blue Header */}
                    <div className="bg-[#4299e1] text-white px-4 py-3 font-semibold text-sm sm:text-base">
                        {t("extensions.stock.info").replace("{name}", currentItem.name).replace("{date}", currentDate)}
                    </div>

                    {/* Data Grid */}
                    <div className="p-4 grid grid-cols-1 sm:grid-cols-3 gap-y-6 gap-x-4 bg-white">

                        {/* Cột 1: Index Name & Value */}
                        <div className="border-b sm:border-b-0 sm:border-r border-gray-100 pb-4 sm:pb-0 sm:pr-4 last:border-0">
                            <div className="text-gray-900 font-bold mb-1">{currentItem.name}</div>
                            <div className="text-gray-600">{currentItem.indexValue}</div>
                        </div>

                        {/* Cột 2: Thay đổi */}
                        <div className="border-b sm:border-b-0 sm:border-r border-gray-100 pb-4 sm:pb-0 sm:pr-4 last:border-0">
                            <div className="text-gray-900 font-bold mb-1">{t("extensions.stock.change")}:</div>
                            <div className={`${currentItem.change.includes('-') ? 'text-red-500' : 'text-green-600'}`}>
                                {currentItem.change}
                            </div>
                        </div>

                        {/* Cột 3: Thay đổi % */}
                        <div>
                            <div className="text-gray-900 font-bold mb-1">{t("extensions.stock.changePercent")}:</div>
                            <div className={`${currentItem.percent.includes('-') ? 'text-red-500' : 'text-green-600'}`}>
                                {currentItem.percent}
                            </div>
                        </div>

                        {/* Hàng 2 - Cột 1: KLGD */}
                        <div className="border-b sm:border-b-0 sm:border-r border-gray-100 pb-4 sm:pb-0 sm:pr-4 last:border-0 pt-2 sm:pt-0">
                            <div className="text-gray-900 font-bold mb-1">{t("extensions.stock.volume")}</div>
                            <div className="text-gray-600">{currentItem.volume}</div>
                        </div>

                        {/* Hàng 2 - Cột 2: NN Mua */}
                        <div className="border-b sm:border-b-0 sm:border-r border-gray-100 pb-4 sm:pb-0 sm:pr-4 last:border-0 pt-2 sm:pt-0">
                            <div className="text-gray-900 font-bold mb-1">{t("extensions.stock.foreignBuy")}:</div>
                            <div className="text-gray-600">{currentItem.foreignBuyFormat} ({t("extensions.stock.billion")})</div>
                        </div>

                        {/* Hàng 2 - Cột 3: NN Bán */}
                        <div className="pt-2 sm:pt-0">
                            <div className="text-gray-900 font-bold mb-1">{t("extensions.stock.foreignSell")}:</div>
                            <div className="text-gray-600">{currentItem.foreignSellFormat} ({t("extensions.stock.billion")})</div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="p-4 text-center text-gray-500">{t("extensions.stock.noData")}</div>
            )}
        </div>
    );
}