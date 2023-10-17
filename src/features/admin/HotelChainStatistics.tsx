import { Button, Select, Typography } from "antd";
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
const { Title } = Typography;

const HotelChainStatistic = () => {


  const serviceData = [
    { hotel: 'Khách sạn 1', serviceA: 30, serviceB: 20, serviceC: 15, monthYear: '01-2023' },
    { hotel: 'Khách sạn 2', serviceA: 25, serviceB: 22, serviceC: 18, monthYear: '01-2023' },
    { hotel: 'Khách sạn 3', serviceA: 35, serviceB: 15, serviceC: 10, monthYear: '01-2023' },
    { hotel: 'Khách sạn 4', serviceA: 28, serviceB: 24, serviceC: 12, monthYear: '01-2023' },
    { hotel: 'Khách sạn 5', serviceA: 40, serviceB: 18, serviceC: 14, monthYear: '01-2023' },
    { hotel: 'Khách sạn 1', serviceA: 25, serviceB: 15, serviceC: 20, monthYear: '02-2023' },
    { hotel: 'Khách sạn 2', serviceA: 30, serviceB: 18, serviceC: 12, monthYear: '02-2023' },
    { hotel: 'Khách sạn 3', serviceA: 22, serviceB: 19, serviceC: 16, monthYear: '02-2023' },
    { hotel: 'Khách sạn 4', serviceA: 32, serviceB: 12, serviceC: 14, monthYear: '02-2023' },
    { hotel: 'Khách sạn 5', serviceA: 26, serviceB: 21, serviceC: 13, monthYear: '02-2023' },
  ];

  // Thêm dữ liệu cho các khách sạn và tháng/năm khác theo nhu cầu của bạn
  const { data: HotelChainStatistics } =  useGetHotelChainStatisticsQuery();
  const [selectedMonth, setSelectedMonth] = useState("Tháng 1");
  const [selectedYear, setSelectedYear] = useState("2023");
  const [uniqueMonths, setUniqueMonths] = useState<any>([]);
  const [uniqueYears, setUniqueYears] = useState<any>([]);
  const [filteredData1, setFilteredData1] = useState([]);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const handleTitleClick1 = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  useEffect(() => {
    if (HotelChainStatistics) {
      // Trích xuất danh sách các tháng và năm duy nhất từ dữ liệu
      const uniqueMonths = Array.from(
        new Set(HotelChainStatistics.map((item: any) => item.month))
      );
      const uniqueYears = Array.from(
        new Set(HotelChainStatistics.map((item: any) => item.year))
      );

      setUniqueMonths(uniqueMonths);
      setUniqueYears(uniqueYears);

      // Lọc dữ liệu dựa trên tháng và năm đã chọn
      const filteredData = HotelChainStatistics.filter((item: any) => {
        return item.month === selectedMonth && item.year === selectedYear;
      });

      setFilteredData1(filteredData);
    }
  }, [HotelChainStatistics, selectedMonth, selectedYear]);

  const handleMonthChange = (event: any) => {
    const selectedMonth = event.target.value;
    setSelectedMonth(selectedMonth);
  };

  const handleYearChange = (event: any) => {
    const selectedYear = event.target.value;
    setSelectedYear(selectedYear);
  };


// Select cua service

const { data: HotelChainStatisticsv } = useGetHotelChainStatisticsvQuery();
const [selectedMonthsv, setSelectedMonthsv] = useState("Tháng 3");
const [selectedYearsv, setSelectedYearsv] = useState("2023");
const [uniqueMonthsv, setUniqueMonthsv] = useState<any>([]);
const [uniqueYearsv, setUniqueYearsv] = useState<any>([]);
const [filteredData2, setFilteredData2] = useState<any[]>([]); // Khởi tạo với một mảng rỗng
const [isDropdownVisiblesv, setIsDropdownVisiblesv] = useState(false);
  const handleTitleClick2 = () => {
    setIsDropdownVisiblesv(!isDropdownVisiblesv);
  };

console.log("filteredData2",filteredData2)
useEffect(() => {
  if (HotelChainStatisticsv) {
    // Trích xuất danh sách các tháng và năm duy nhất từ dữ liệu
    const uniqueMonthsSv = Array.from(
      new Set(HotelChainStatisticsv.map((item: any) => item.month))
    );
    const uniqueYearsSv = Array.from(
      new Set(HotelChainStatisticsv.map((item: any) => item.year))
    );

    setUniqueMonthsv(uniqueMonthsSv);
    setUniqueYearsv(uniqueYearsSv);

    // Lọc dữ liệu dựa trên tháng và năm đã chọn
    const filteredData = HotelChainStatisticsv.filter((item: any) => {
      return item.month === selectedMonthsv && item.year === selectedYearsv;
    });

    setFilteredData2(filteredData);
  }
}, [HotelChainStatisticsv, selectedMonthsv, selectedYearsv]);

const handleMonthChangesv = (event: React.ChangeEvent<HTMLSelectElement>) => {
  const selectedMonth = event.target.value;
  setSelectedMonthsv(selectedMonth);
};

const handleYearChangesv = (event: React.ChangeEvent<HTMLSelectElement>) => {
  const selectedYear = event.target.value;
  setSelectedYearsv(selectedYear);
};

  return (
    <div>
        {/* Biểu đồ 1 */}
        <h1
        className="text-2xl font-semibold text-blue-600 mb-4 cursor-pointer"
        onClick={handleTitleClick1}
      >
        Biểu đồ thống kê tổng doanh thu và số booking
      </h1>

        <div className={`relative ${isDropdownVisible ? "block" : "hidden"} flex space-x-4` }>
        <div className="bg-blue-200">
          <label>Chọn tháng: </label>
          <select
            className="border rounded p-2"
            onChange={handleMonthChange}
            value={selectedMonth}
          >
            {uniqueMonths.map((month: any) => (
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
            onChange={handleYearChange}
            value={selectedYear}
          >
            {uniqueYears.map((year: any) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
      </div>
       
      
      <ResponsiveContainer width="100%" height={400}>
        <LineChart
          data={filteredData1}
          margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="hotel" allowDuplicatedCategory={false} />
          <YAxis
            yAxisId="left"
            label={{ value: "Số Booking", angle: -90, position: "insideLeft" }}
          />
          <YAxis
            yAxisId="right"
            orientation="right"
            label={{ value: "Doanh thu", angle: 90, position: "insideRight" }}
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

      {/* Bieu do 2 */}
      <div>
      <h2 className="text-2xl font-semibold text-blue-600 mb-4 cursor-pointer" onClick={handleTitleClick2}>Biểu đồ thống kê dịch vụ chuỗi khách sạn</h2>
      <div className={`relative ${isDropdownVisiblesv ? "block" : "hidden"} flex space-x-4` }>
        <div className="bg-blue-200">
          <label>Chọn tháng: </label>
          <select
            className="border rounded p-2"
            onChange={handleMonthChangesv}
            value={selectedMonthsv}
          >
            {uniqueMonthsv.map((month: any) => (
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
            onChange={handleYearChangesv}
            value={selectedYearsv}
          >
            {uniqueYearsv.map((year: any) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={400}>
  <BarChart
    data={filteredData2}
    margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
  >
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="hotel" allowDuplicatedCategory={false} />
    <YAxis />
    <Tooltip />
    <Legend />
    <Bar dataKey="serviceA" stackId="a" fill="#8884d8">
      <LabelList dataKey="serviceA" position="top" />
    </Bar>
    <Bar dataKey="serviceB" stackId="a" fill="#82ca9d">
      <LabelList dataKey="serviceB" position="top" />
    </Bar>
    <Bar dataKey="serviceC" stackId="a" fill="#ffc658">
      <LabelList dataKey="serviceC" position="top" />
    </Bar>
  </BarChart>
</ResponsiveContainer>



    </div>
    </div>
  );
};

export default HotelChainStatistic;
