import React, { useState } from "react";

const DAYS_OF_WEEK = [
    "THỨ HAI", "THỨ BA", "THỨ TƯ", "THỨ NĂM", "THỨ SÁU", "THỨ BẢY", "CHỦ NHẬT"
];

export  function Calendar() {
    const [month, setMonth] = useState(0); // Tháng 1 (index 0)
    const [year, setYear] = useState(2026);
    const [selectedDate, setSelectedDate] = useState(11); // Giả lập ngày đang chọn

    // --- Logic giả lập Âm lịch (Giữ nguyên như trước) ---
    const getMockLunarDate = (d, m, y) => {
        if (m === 0 && y === 2026) {
            if (d === 1) return "13";
            if (d === 19) return "1/12";
            let lunarDay = 13 + (d - 1);
            if (d >= 19) return `${d - 18}`;
            return `${lunarDay}`;
        }
        return "1";
    };

    const getDaysInMonth = (m, y) => new Date(y, m + 1, 0).getDate();

    const getFirstDayOfMonth = (m, y) => {
        const day = new Date(y, m, 1).getDay();
        return day === 0 ? 6 : day - 1; // Chuyển CN (0) thành index 6
    };


    const days = renderDays();

    return (
        <div className="max-w-4xl mx-auto mt-10 p-6 bg-white border border-gray-200 rounded-xl shadow-sm font-sans">

            {/* Header Title */}
            <h2 className="text-lg font-bold text-gray-800 uppercase border-l-4 border-green-500 pl-3 mb-6">
                Lịch Tháng
            </h2>

            {/* Controls */}
            <div className="flex justify-between items-center mb-6">
                <div className="flex gap-3">
                    <select
                        value={month}
                        onChange={(e) => setMonth(parseInt(e.target.value))}
                        className="px-4 py-2 border border-gray-300 rounded-md text-sm outline-none focus:border-green-500 cursor-pointer min-w-[120px]"
                    >
                        {Array.from({ length: 12 }, (_, i) => (
                            <option key={i} value={i}>Tháng {i + 1}</option>
                        ))}
                    </select>

                    <select
                        value={year}
                        onChange={(e) => setYear(parseInt(e.target.value))}
                        className="px-4 py-2 border border-gray-300 rounded-md text-sm outline-none focus:border-green-500 cursor-pointer min-w-[120px]"
                    >
                        <option value={2025}>Năm 2025</option>
                        <option value={2026}>Năm 2026</option>
                        <option value={2027}>Năm 2027</option>
                    </select>
                </div>

                <button
                    onClick={() => { setMonth(0); setYear(2026); setSelectedDate(11); }}
                    className="px-6 py-2 border border-green-500 text-green-600 font-bold rounded-md hover:bg-green-600 hover:text-white transition-colors uppercase text-sm"
                >
                    Hôm nay
                </button>
            </div>

            {/* Calendar Grid */}
            {/* Border top và left cho container cha */}
            <div className="grid grid-cols-7 border-t border-l border-gray-200">

                {/* Render Thứ (Header Row) */}
                {DAYS_OF_WEEK.map((dayName, index) => (
                    <div
                        key={dayName}
                        className={`
              py-4 text-center font-bold text-[13px] border-r border-b border-gray-200 uppercase
              ${index === 6 ? "text-red-500" : "text-gray-600"}
            `}
                    >
                        {dayName}
                    </div>
                ))}

                {/* Render Ngày (Cells) */}
                {days.map((item, index) => {
                    const isSunday = index % 7 === 6;
                    const isCurrentMonth = item.type === "current";
                    const isToday = isCurrentMonth && item.day === selectedDate && month === 0 && year === 2026;

                    return (
                        <div
                            key={index}
                            onClick={() => isCurrentMonth && setSelectedDate(item.day)}
                            className={`
                relative h-24 border-r border-b border-gray-200 p-2 flex flex-col justify-between cursor-pointer transition-colors
                ${!isCurrentMonth ? "bg-gray-50" : "bg-white"}
                ${isToday ? "!bg-[#00a651]" : "hover:bg-gray-50"} 
              `}
                        >
                            {/* Ngày Dương */}
                            <span className={`
                text-lg font-bold ml-1 mt-1
                ${isToday ? "text-white" : isSunday ? "text-red-500" : "text-gray-800"}
                ${!isCurrentMonth && "text-gray-400"}
              `}>
                {item.day}
              </span>

                            {/* Ngày Âm */}
                            <span className={`
                text-xs self-end mr-1 mb-1
                ${isToday ? "text-white" : "text-gray-500"}
                ${!isCurrentMonth && "!text-gray-300"}
              `}>
                {item.lunar}
              </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}