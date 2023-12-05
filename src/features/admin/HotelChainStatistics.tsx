import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Bar,
  BarChart,
  LabelList,
} from "recharts";
import { useGetHotelChainStatisticsQuery } from "@/api/admin/HotelChainStatistics";
import { useGetHotelChainStatisticsvQuery } from "@/api/admin/HotelChainStatisticsSv";
import { useGetHotelChainStatisticRtQuery } from "@/api/admin/HotelChainStatistics_Roomtype";
import { useGetCategory_hotelQuery } from "@/api/webapp/category_hotel";

const HotelChainStatistic = () => {
  // Thêm dữ liệu cho các khách sạn và tháng/năm khác theo nhu cầu của bạn
  const [selectedMonth, setSelectedMonth] = useState(12);
  const [selectedYear, setSelectedYear] = useState(2023);

  const { data: HotelChainStatistics } = useGetHotelChainStatisticsQuery({
    month: selectedMonth,
    year: selectedYear,
  });

  const dataLogin = localStorage.getItem("userAdmin");
  console.log("dataLogin", dataLogin);

  const [filteredData1, setFilteredData1] = useState<any>([]);

  const [chartMode, setChartMode] = useState("revenue");

  const handleRevenueChartModeChange = () => {
    setChartMode("revenue");
  };

  const handleServiceChartModeChange = () => {
    setChartMode("service");
  };

  const handleRoomTypeChartModeChange = () => {
    setChartMode("roomtype");
  };

  const handleMonthChange = (event: any) => {
    const selectedMonth = parseInt(event.target.value);
    setSelectedMonth(selectedMonth);
  };

  const handleYearChange = (event: any) => {
    const selectedYear = parseInt(event.target.value);
    setSelectedYear(selectedYear);
  };

  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const handleTitleClick1 = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };
  // Bieu do cua service
  const [selectedMonthsv, setSelectedMonthsv] = useState(12);
  const [selectedYearsv, setSelectedYearsv] = useState(2023);

  const { data: HotelChainStatisticsv } = useGetHotelChainStatisticsvQuery({
    month: selectedMonthsv,
    year: selectedYearsv,
  });

  const [isDropdownVisiblesv, setIsDropdownVisiblesv] = useState(false);
  const colors = [
    "#8884d8",
    "#82ca9d",
    "#ffc658",
    "#FF5733",
    "#34A853",
    "#FF3333",
    "#3366FF",
  ];

  const handleTitleClick2 = () => {
    setIsDropdownVisiblesv(!isDropdownVisiblesv);
  };

  const handleMonthChangesv = (event: any) => {
    const selectedMonth = parseInt(event.target.value);
    setSelectedMonthsv(selectedMonth);
  };

  const handleYearChangesv = (event: any) => {
    const selectedYear = parseInt(event.target.value);
    setSelectedYearsv(selectedYear);
  };

  // Biểu đồ của RoomType
  const [selectedMonthRt, setSelectedMonthRt] = useState(12);
  const [selectedYearRt, setSelectedYearRt] = useState(2023);
  const [selectedRoomType, setSelectedRoomType] = useState<any>();
  const [selectedRoomId, setSelectedRoomId] = useState("");
  const { data: HotelChainStatisticRt } = useGetHotelChainStatisticRtQuery({
    month: selectedMonthRt,
    year: selectedYearRt,
    roomType: selectedRoomId,
  });

  const { data: cateRooms } = useGetCategory_hotelQuery({});

  let statisticalChainRoomtype: any;

  if (HotelChainStatistics) {
    statisticalChainRoomtype = HotelChainStatistics.rating_comment_booking;
  } else {
  }

  let statisticalRoom: any[] = [];

  if (HotelChainStatisticRt) {
    statisticalRoom = HotelChainStatisticRt.rating_comment_booking.flatMap(
      (hotel: any) =>
        hotel.roomAverages.map((roomAverage: any) => ({
          hotelName: hotel.hotelName, // Lấy tên khách sạn từ mức độ cao hơn
          roomType: roomAverage.roomType,
          bookingCount: roomAverage.bookingCount,
          rating: roomAverage.rating,
        })) || []
    );
  } else {
  }

  const handleMonthChangeRt = (event: any) => {
    const selectedMonth = event.target.value;
    setSelectedMonthRt(selectedMonth);
  };

  const handleYearChangeRt = (event: any) => {
    const selectedYear = event.target.value;
    setSelectedYearRt(selectedYear);
  };

  const handleRoomTypeChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedRoom = cateRooms?.find(
      (room: any) => room.name === event.target.value
    );
    if (selectedRoom) {
      setSelectedRoomId(selectedRoom.id);
    } else {
      setSelectedRoomId("");
    }
  };

  return (
    <div>
      <div className="flex items-center mb-4">
        <button
          className={`mr-2 py-2 px-4 rounded ${
            chartMode === "revenue"
              ? "bg-orange-500 text-white"
              : "bg-gray-300 text-gray-700"
          } hover:bg-orange-600 hover:text-white transition duration-300 ease-in-out`}
          onClick={handleRevenueChartModeChange}
        >
          Thống kê Doanh Thu
        </button>

        <button
          className={`py-2 px-4 rounded mr-2 ${
            chartMode === "service"
              ? "bg-orange-500 text-white"
              : "bg-gray-300 text-gray-700"
          } hover:bg-orange-600 hover:text-white transition duration-300 ease-in-out`}
          onClick={handleServiceChartModeChange}
        >
          Thống Kê Dịch Vụ
        </button>

        <button
          className={`py-2 px-4 rounded ${
            chartMode === "roomtype"
              ? "bg-orange-500 text-white"
              : "bg-gray-300 text-gray-700"
          } hover:bg-orange-600 hover:text-white transition duration-300 ease-in-out`}
          onClick={handleRoomTypeChartModeChange}
        >
          Thống Kê Loại Phòng
        </button>
      </div>
      {/* Biểu đồ 1 */}

      <div>
        {chartMode === "revenue" && (
          <div>
            <h1
              className="text-2xl font-semibold text-orange-600 mb-4"
              onClick={handleTitleClick1}
            >
              Biểu đồ thống kê tổng doanh thu và số booking
            </h1>

            <div
              className={`relative ${
                isDropdownVisible ? "block" : "hidden"
              } flex space-x-4`}
            >
              <div className="bg-blue-200">
                <label>Chọn tháng: </label>
                <select
                  className="border rounded p-2"
                  onChange={handleMonthChange}
                  value={selectedMonth}
                >
                  {Array.from({ length: 12 }, (_, index) => {
                    const month = index + 1; // Vì tháng bắt đầu từ 1
                    return (
                      <option key={month} value={month}>
                        {month}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="bg-green-200">
                <label>Chọn năm: </label>
                <select
                  className="border rounded p-2"
                  onChange={handleYearChange}
                  value={selectedYear}
                >
                  {Array.from({ length: 4 }, (_, index) => {
                    const year = 2020 + index;
                    return (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>

            <ResponsiveContainer width="100%" height={400}>
              <LineChart
                data={HotelChainStatistics}
                margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="hotel" allowDuplicatedCategory={false} />
                <YAxis
                  yAxisId="left"
                  label={{
                    value: "Số Booking",
                    angle: -90,
                    position: "insideLeft",
                  }}
                />
                <YAxis
                  yAxisId="right"
                  orientation="right"
                  label={{
                    value: "Doanh thu",
                    angle: 90,
                    position: "insideRight",
                  }}
                />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="booking"
                  yAxisId="left"
                  stroke="#8884d8"
                  activeDot={{ r: 8 }}
                />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  yAxisId="right"
                  stroke="#82ca9d"
                />
                
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>

      {/* Bieu do 2 */}
      <div>
        {chartMode === "service" && (
          <div>
            <h2
              className="text-2xl font-semibold text-orange-600 mb-4"
              onClick={handleTitleClick2}
            >
              Biểu đồ thống kê dịch vụ chuỗi khách sạn
            </h2>
            <div
              className={`relative ${
                isDropdownVisiblesv ? "block" : "hidden"
              } flex space-x-4`}
            >
              <div className="bg-blue-200">
                <label>Chọn tháng: </label>
                <select
                  className="border rounded p-2"
                  onChange={handleMonthChangesv}
                  value={selectedMonthsv}
                >
                  {Array.from({ length: 12 }, (_, index) => {
                    const month = index + 1;
                    return (
                      <option key={month} value={month}>
                        {month}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="bg-green-200">
                <label>Chọn năm: </label>
                <select
                  className="border rounded p-2"
                  onChange={handleYearChangesv}
                  value={selectedYearsv}
                >
                  {Array.from({ length: 4 }, (_, index) => {
                    const year = 2020 + index;
                    return (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={400}>
              {HotelChainStatisticsv?.length > 0 ? (
                <BarChart
                  data={HotelChainStatisticsv}
                  margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
                >
                  <CartesianGrid />
                  <XAxis dataKey="hotel" />
                  <YAxis
                    label={{
                      value: "Số lượng Service",
                      angle: -90,
                      position: "insideLeft",
                    }}
                  />
                  <Tooltip />
                  {HotelChainStatisticsv[0]?.services?.map(
                    (subService: any, subIndex: number) => (
                      <Bar
                        key={`sub-service-${subIndex}`}
                        dataKey={`services[${subIndex}].count`}
                        name={subService?.servicename}
                        stackId="a"
                        fill={colors[subIndex % colors.length]}
                      />
                    )
                  )}
                </BarChart>
              ) : (
                <p>Không có dữ liệu</p>
              )}
            </ResponsiveContainer>
          </div>
        )}
      </div>

      {/* Biểu đồ 3 */}
      <div>
        {chartMode === "roomtype" && (
          <div>
            <h1
              className="text-2xl font-semibold text-orange-600 mb-4"
              onClick={handleTitleClick1}
            >
              Biểu đồ thống kê loại phòng và số lượt đánh giá
            </h1>

            <div
              className={`relative ${
                isDropdownVisible ? "block" : "hidden"
              } flex space-x-4`}
            >
              <div className="bg-blue-200">
                <label>Chọn tháng: </label>
                <select
                  className="border rounded p-2"
                  onChange={handleMonthChangeRt}
                  value={selectedMonthRt}
                >
                  {Array.from({ length: 12 }, (_, index) => {
                    const month = index + 1;
                    return (
                      <option key={month} value={month}>
                        {month}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="bg-green-200">
                <label>Chọn năm: </label>
                <select
                  className="border rounded p-2"
                  onChange={handleYearChangeRt}
                  value={selectedYearRt}
                >
                  {Array.from({ length: 4 }, (_, index) => {
                    const year = 2020 + index;
                    return (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="bg-yellow-200">
                <label>Chọn loại phòng: </label>
                <select
                  className="border rounded p-2"
                  onChange={handleRoomTypeChange}
                  value={selectedRoomType}
                >
                  {cateRooms?.length > 0 ? (
                    cateRooms?.map((room: any) => (
                      <option key={room?.id} value={room?.name}>
                        {room?.name}
                      </option>
                    ))
                  ) : (
                    <option value="">Không có dữ liệu loại phòng</option>
                  )}
                </select>
              </div>
            </div>

            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={statisticalRoom}>
                <defs>
                  <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="hotelName" />
                <YAxis
                  yAxisId="left"
                  label={{
                    value: "Số Booking",
                    angle: -90,
                    position: "insideLeft",
                  }}
                />
                <YAxis
                  yAxisId="right"
                  orientation="right"
                  label={{
                    value: "Số Sao",
                    angle: 90,
                    position: "insideRight",
                  }}
                />
                <Tooltip />
                <Legend />
                <Bar dataKey="bookingCount" fill="url(#colorPv)" yAxisId="left">
                  <LabelList dataKey="bookingCount" position="top" />
                </Bar>
                <Bar dataKey="rating" fill="url(#colorUv)" yAxisId="right">
                  <LabelList dataKey="rating" position="top" />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </div>
  );
};

export default HotelChainStatistic;
