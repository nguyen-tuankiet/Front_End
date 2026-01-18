import React, {useState, useEffect} from 'react';
import {ExtensionHeader} from "@/components/extensions/ExtensionHeader.jsx";
import {cn} from "@/lib/utils.js";

const FootballSchedule = () => {
    // CẤU HÌNH API
    const API_KEY = '123';

    // Danh sách các giải đấu hỗ trợ
    const LEAGUES = [
        {id: '4328', name: 'Ngoại Hạng Anh'}, // Premier League
        {id: '4335', name: 'La Liga'},        // Tây Ban Nha
        {id: '4331', name: 'Bundesliga'},     // Đức
        {id: '4332', name: 'Serie A'},        // Ý
        {id: '4480', name: 'Champions League'}, // Cúp C1
        {id: '4443', name: 'V-League'}        // Việt Nam (nếu API có dữ liệu)
    ];

    // State quản lý giải đấu đang chọn (Mặc định là Ngoại Hạng Anh)
    const [selectedLeagueId, setSelectedLeagueId] = useState(LEAGUES[0].id);

    const [matches, setMatches] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSchedule = async () => {
            // Reset state mỗi khi đổi giải
            setLoading(true);
            setError(null);
            setMatches([]);

            try {
                const URL = `https://www.thesportsdb.com/api/v1/json/${API_KEY}/eventsnextleague.php?id=${selectedLeagueId}`;
                const response = await fetch(URL);

                if (!response.ok) throw new Error('Lỗi kết nối API');

                const data = await response.json();
                const events = data.events;

                if (events) {
                    const formattedEvents = events.map(event => ({
                        id: event.idEvent,
                        name: event.strEvent,
                        homeTeam: event.strHomeTeam,
                        awayTeam: event.strAwayTeam,
                        league: event.strLeague,
                        timeRaw: event.strTimestamp || `${event.dateEvent}T${event.strTime}`,
                    }));
                    setMatches(formattedEvents);
                } else {
                    // API trả về null nếu không có trận nào sắp tới
                    setMatches([]);
                }

            } catch (err) {
                console.error(err);
                setError('Không thể tải dữ liệu.');
            } finally {
                setLoading(false);
            }
        };

        fetchSchedule();
    }, [selectedLeagueId]); // Chạy lại khi selectedLeagueId thay đổi

    // Hàm format thời gian (giữ nguyên)
    const formatDateTime = (isoString) => {
        try {
            const date = new Date(isoString);
            const time = date.toLocaleTimeString('vi-VN', {hour: '2-digit', minute: '2-digit', hour12: false});
            const day = date.toLocaleDateString('vi-VN', {day: '2-digit', month: '2-digit'});
            return {time, day};
        } catch (e) {
            return {time: '--:--', day: '--/--'};
        }
    };

    return (
        <div>
            <ExtensionHeader/>
            <div className={cn("w-full flex justify-center py-8")}>
                <div className="w-3/4 bg-white font-sans text-gray-800 p-5 rounded-lg">

                    <div className="mb-6">
                        <h2 className="text-xl font-bold text-[#b42e2e] uppercase mb-4">Lịch Thi Đấu Bóng Đá</h2>

                        <div className="flex flex-wrap gap-2 border-b border-gray-200 pb-4">
                            {LEAGUES.map((league) => (
                                <button
                                    key={league.id}
                                    onClick={() => setSelectedLeagueId(league.id)}
                                    className={`
                px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 whitespace-nowrap
                ${selectedLeagueId === league.id
                                        ? 'bg-[#b42e2e] text-white shadow-md hover:bg-[#962323]' // Active Style
                                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-900'} // Inactive Style
              `}
                                >
                                    {league.name}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Loading & Error */}
                    {loading &&
                        <div className="py-12 text-center text-gray-500 italic">Đang tải dữ liệu lịch thi đấu...</div>}
                    {error && <div className="py-8 text-center text-red-500 bg-red-50 rounded-lg">{error}</div>}

                    {/* Table Hiển thị */}
                    {!loading && !error && (
                        <div className="overflow-x-auto rounded-lg border border-gray-100 shadow-sm">
                            <table className="w-full text-left border-collapse">
                                <thead className="bg-gray-50">
                                <tr className="text-sm font-bold text-gray-700 border-b border-gray-200">
                                    <th className="py-4 px-4 w-[20%] uppercase text-xs tracking-wider">Thời gian</th>
                                    <th className="py-4 px-4 w-[50%] uppercase text-xs tracking-wider">Cặp đấu</th>
                                    <th className="py-4 px-4 w-[30%] uppercase text-xs tracking-wider text-right sm:text-left">Giải
                                        đấu
                                    </th>
                                </tr>
                                </thead>
                                <tbody className="bg-white">
                                {matches.length > 0 ? (
                                    matches.map((match) => {
                                        const {time, day} = formatDateTime(match.timeRaw);
                                        return (
                                            <tr key={match.id}
                                                className="border-b border-gray-50 hover:bg-red-50 transition-colors cursor-default">
                                                <td className="py-4 px-4 align-top">
                                                    <div className="font-bold text-lg text-gray-800">{time}</div>
                                                    <div className="text-xs text-gray-500 font-medium">{day}</div>
                                                </td>
                                                <td className="py-4 px-4 align-middle">
                                                    <div
                                                        className="flex items-center gap-2 text-base font-medium text-gray-900">
                                                        <span>{match.homeTeam}</span>
                                                        <span className="text-xs text-gray-400 px-2">VS</span>
                                                        <span>{match.awayTeam}</span>
                                                    </div>
                                                </td>
                                                <td className="py-4 px-4 align-middle text-right sm:text-left">
                         <span className="text-xs font-semibold text-gray-500 bg-gray-100 px-2 py-1 rounded">
                           {match.league}
                         </span>
                                                </td>
                                            </tr>
                                        );
                                    })
                                ) : (
                                    <tr>
                                        <td colSpan="3" className="py-12 text-center text-gray-400">
                                            Hiện chưa có lịch thi đấu sắp tới cho giải này.
                                        </td>
                                    </tr>
                                )}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default FootballSchedule;