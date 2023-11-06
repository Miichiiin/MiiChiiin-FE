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

const HotelChainStatistic = () => {
  // Thêm dữ liệu cho các khách sạn và tháng/năm khác theo nhu cầu của bạn
  const [selectedMonth, setSelectedMonth] = useState(10);
  const [selectedYear, setSelectedYear] = useState(2023);

  const { data: HotelChainStatistics } = useGetHotelChainStatisticsQuery({
    month: selectedMonth,
    year: selectedYear,
  });

  console.log("HotelChainStatistics", HotelChainStatistics);

  // const [uniqueMonths, setUniqueMonths] = useState<number[]>([]);
  // const [uniqueYears, setUniqueYears] = useState<number[]>([]);
  const [filteredData1, setFilteredData1] = useState<any>([]);
  console.log("filteredData1", filteredData1);

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

  useEffect(() => {
    if (HotelChainStatistics && Array.isArray(HotelChainStatistics)) {
      // const uniqueMonths = Array.from(
      //   new Set(HotelChainStatistics.map((item) => item.month))
      // ).map(Number); // Chuyển đổi chuỗi thành số

      // const uniqueYears = Array.from(
      //   new Set(HotelChainStatistics.map((item) => item.year))
      // ).map(Number); // Chuyển đổi chuỗi thành số

      // setUniqueMonths(uniqueMonths);
      // setUniqueYears(uniqueYears);

      const filteredData = HotelChainStatistics.filter((item) => {
        return item.month === selectedMonth && item.year === selectedYear;
      });

      setFilteredData1(filteredData);
    }
  }, [HotelChainStatistics, selectedMonth, selectedYear]);

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

  const { data: HotelChainStatisticsv } = useGetHotelChainStatisticsvQuery();
  const [selectedMonthsv, setSelectedMonthsv] = useState("Tháng 3");
  const [selectedYearsv, setSelectedYearsv] = useState("2023");
  const [uniqueMonthsv, setUniqueMonthsv] = useState<string[]>([]);
  const [uniqueYearsv, setUniqueYearsv] = useState<string[]>([]);
  const [filteredData2, setFilteredData2] = useState<any[]>([]);
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

  useEffect(() => {
    if (HotelChainStatisticsv && Array.isArray(HotelChainStatisticsv)) {
      const uniqueMonthsSv = Array.from(
        new Set(
          HotelChainStatisticsv.map((item: any) => item.services[0].month)
        )
      );
      const uniqueYearsSv = Array.from(
        new Set(HotelChainStatisticsv.map((item: any) => item.services[0].year))
      );

      setUniqueMonthsv(uniqueMonthsSv);
      setUniqueYearsv(uniqueYearsSv);

      // Lọc dữ liệu dựa trên tháng và năm đã chọn
      const filteredData = HotelChainStatisticsv.filter((item: any) => {
        return (
          item.services[0].month === selectedMonthsv &&
          item.services[0].year === selectedYearsv
        );
      });

      setFilteredData2(filteredData);
    }
  }, [HotelChainStatisticsv, selectedMonthsv, selectedYearsv]);

  console.log("filteredData2",);
  

  const handleMonthChangesv = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedMonth = event.target.value;
    setSelectedMonthsv(selectedMonth);
  };

  const handleYearChangesv = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedYear = event.target.value;
    setSelectedYearsv(selectedYear);
  };



  // Biểu đồ của RoomType
  const { data: HotelChainStatisticRt } = useGetHotelChainStatisticRtQuery();
  const [selectedMonthRt, setSelectedMonthRt] = useState("tháng 1");
  const [selectedYearRt, setSelectedYearRt] = useState("2023");
  const [uniqueMonthRt, setUniqueMonthRt] = useState<any>([]);
  const [uniqueYearRt, setUniqueYearRt] = useState<any>([]);
  const [uniqueRoomTypes, setUniqueRoomTypes] = useState<any>([]);
  const [selectedRoomType, setSelectedRoomType] = useState<any>("Single");
  const [filteredData3, setFilteredData3] = useState<any>([]);

  useEffect(() => {
    if (HotelChainStatisticRt) {
      // Extract unique months, years, and room types from the data
      const uniqueMonthsRt = Array.from(
        new Set(HotelChainStatisticRt.map((item: any) => item.month))
      );
      const uniqueYearsRt = Array.from(
        new Set(HotelChainStatisticRt.map((item: any) => item.year))
      );
      const uniqueRoomTypes = Array.from(
        new Set(HotelChainStatisticRt.map((item: any) => item.roomType))
      );

      setUniqueMonthRt(uniqueMonthsRt);
      setUniqueYearRt(uniqueYearsRt);
      setUniqueRoomTypes(uniqueRoomTypes);

      // Filter data based on selected month, year, and room type
      const filteredData = HotelChainStatisticRt.filter((item: any) => {
        return (
          item.month === selectedMonthRt &&
          item.year === selectedYearRt &&
          item.roomType === selectedRoomType
        );
      });

      setFilteredData3(filteredData);
    }
  }, [
    HotelChainStatisticRt,
    selectedMonthRt,
    selectedYearRt,
    selectedRoomType,
  ]);

  const handleMonthChangeRt = (event: any) => {
    const selectedMonth = event.target.value;
    setSelectedMonthRt(selectedMonth);
  };

  const handleYearChangeRt = (event: any) => {
    const selectedYear = event.target.value;
    setSelectedYearRt(selectedYear);
  };

  const handleRoomTypeChange = (event: any) => {
    const selectedRoomType = event.target.value;
    setSelectedRoomType(selectedRoomType);
  };
  return (
    <div>
      <div className="flex items-center mb-4">
        <button
          className={`mr-2 py-2 px-4 rounded ${
            chartMode === "revenue"
              ? "bg-blue-500 text-white"
              : "bg-gray-300 text-gray-700"
          } hover:bg-blue-600 hover:text-white transition duration-300 ease-in-out`}
          onClick={handleRevenueChartModeChange}
        >
          Revenue Distribution
        </button>

        <button
          className={`py-2 px-4 rounded mr-2 ${
            chartMode === "service"
              ? "bg-blue-500 text-white"
              : "bg-gray-300 text-gray-700"
          } hover:bg-blue-600 hover:text-white transition duration-300 ease-in-out`}
          onClick={handleServiceChartModeChange}
        >
          Service statistics
        </button>

        <button
          className={`py-2 px-4 rounded ${
            chartMode === "roomtype"
              ? "bg-blue-500 text-white"
              : "bg-gray-300 text-gray-700"
          } hover:bg-blue-600 hover:text-white transition duration-300 ease-in-out`}
          onClick={handleRoomTypeChartModeChange}
        >
          RoomType Statistics
        </button>
      </div>
      {/* Biểu đồ 1 */}

      <div>
        {chartMode === "revenue" && (
          <div>
            <h1
              className="text-2xl font-semibold text-blue-600 mb-4"
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
                  {Array.from({ length: 5 }, (_, index) => {
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
                <Line
                  type="monotone"
                  dataKey="cancelroom"
                  yAxisId="left"
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
      <h2 className="text-2xl font-semibold text-blue-600 mb-4" onClick={handleTitleClick2}>
        Biểu đồ thống kê dịch vụ chuỗi khách sạn
      </h2>
      <div className={`relative ${isDropdownVisiblesv ? "block" : "hidden"} flex space-x-4`}>
        <div className="bg-blue-200">
          <label>Chọn tháng: </label>
          <select className="border rounded p-2" onChange={handleMonthChangesv} value={selectedMonthsv}>
            {uniqueMonthsv.map((month: string) => (
              <option key={month} value={month}>
                {month}
              </option>
            ))}
          </select>
        </div>
        <div className="bg-green-200">
          <label>Chọn năm: </label>
          <select className="border rounded p-2" onChange={handleYearChangesv} value={selectedYearsv}>
            {uniqueYearsv.map((year: string) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={400}>
        {filteredData2.length > 0 ? (
          <BarChart data={filteredData2} margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
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
            {filteredData2[1].services?.map((service: any, index: number) => (
              <Bar
                key={`services[${index}].servicename`}
                dataKey={`services[${index}].count`}
                name={service.servicename}
                stackId="a"
                fill={colors[index % colors.length]}
              >
                <LabelList dataKey={`services[${index}].count`} position="top" />
              </Bar>
            ))}
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
              className="text-2xl font-semibold text-blue-600 mb-4"
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
                  {uniqueMonthRt.map((month: any) => (
                    <option key={month} value={month}>
                      {month}
                    </option>
                  ))}
                </select>
              </div>
              <div className="bg-green-200">
                <label>Chọn năm: </label>
                <select
                  className="border rounded p-2"
                  onChange={handleYearChangeRt}
                  value={selectedYearRt}
                >
                  {uniqueYearRt.map((year: any) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>
              <div className="bg-yellow-200">
                <label>Chọn loại phòng: </label>
                <select
                  className="border rounded p-2"
                  onChange={handleRoomTypeChange}
                  value={selectedRoomType}
                >
                  {uniqueRoomTypes.map((roomType: any) => (
                    <option key={roomType} value={roomType}>
                      {roomType}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={filteredData3}>
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
                <XAxis dataKey="hotel" />
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
                <Bar dataKey="bookings" fill="url(#colorPv)" yAxisId="left">
                  <LabelList dataKey="bookings" position="top" />
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
