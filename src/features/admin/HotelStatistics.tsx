import { useEffect, useState } from "react";
import {
  Card,
  Row,
  Col,
  Table,
  Statistic,
  Progress,
  Select,
  Button,
} from "antd";
import { UserOutlined, RiseOutlined, DollarOutlined } from "@ant-design/icons";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LineChart,
  Line,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import { useGetStatisticalQuery } from "../../api/admin/statistical";
import { useGetStatisticalServiceQuery } from "@/api/admin/statistical_Service";

const colors = ["#8884d8", "#82ca9d", "#ffc658", "#ff7f0e", "#99CCFF"];

const HotelChainStatistics = () => {
  const dataHotel = [
    {
      hotelName: "Hotel A",
      totalBookings: 120,
      totalRevenue: 25000,
      kpi: 0.85,
      // Thêm các thuộc tính khác theo nhu cầu
    },
    {
      hotelName: "Hotel B",
      totalBookings: 90,
      totalRevenue: 18000,
      kpi: 0.75,
      // Thêm các thuộc tính khác theo nhu cầu
    },
    {
      hotelName: "Hotel C",
      totalBookings: 150,
      totalRevenue: 32000,
      kpi: 0.95,
      // Thêm các thuộc tính khác theo nhu cầu
    },
    // Thêm dữ liệu cho các khách sạn khác
  ];

  const columns = [
    {
      title: "Tên khách sạn",
      dataIndex: "hotelName",
      key: "hotelName",
    },
    {
      title: "Tổng booking",
      dataIndex: "totalBookings",
      key: "totalBookings",
    },
    {
      title: "Tổng tiền",
      dataIndex: "totalRevenue",
      key: "totalRevenue",
    },
    {
      title: "KPI đang làm được",
      dataIndex: "kpi",
      key: "kpi",
      render: (kpi: any) => (
        <Progress
          percent={Number((kpi * 100).toFixed(2))}
          status="active"
          format={() => `${(kpi * 100).toFixed(2)}%`}
          strokeColor="#52c41a" // Màu xanh lá cây
        />
      ),
    },
  ];

  const [onlineVisitors, setOnlineVisitors] = useState(0);
  const [revenueGrowth, setRevenueGrowth] = useState(0);
  const [todaysRevenue, setTodaysRevenue] = useState(0);

  useEffect(() => {
    // Simulate data for online visitors, revenue growth, and today's revenue
    const timer = setInterval(() => {
      setOnlineVisitors(Math.floor(Math.random() * 1000));
      setRevenueGrowth(Math.random() * 10);
      setTodaysRevenue(Math.floor(Math.random() * 100000));
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const { Option } = Select;
  const [selectedYear, setSelectedYear] = useState("2023");
  const { data: statisticalData } = useGetStatisticalQuery<any>();
  const [filteredData1, setFilteredData1] = useState([]);

  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const handleTitleClick = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  const dataofYear =
    statisticalData &&
    statisticalData.filter((item: any) => item.year == selectedYear);
  console.log("thang", dataofYear);

  // Nếu trùng năm thì không hiện
  const uniqueYears = [
    ...new Set(
      statisticalData && statisticalData.map((item: any) => item.year)
    ),
  ];

  useEffect(() => {
    if (statisticalData) {
      // Lọc dữ liệu dựa trên năm được chọn
      const filtered = statisticalData.filter(
        (item: any) => item.year === selectedYear
      );
      setFilteredData1(filtered);
    }
  }, [statisticalData, selectedYear]);

  const handleYearChange1 = (event: any) => {
    const selectedYear = event.target.value;
    setSelectedYear(selectedYear);
  };
  // Ẩn hiện biểu đồ theo select
  const [chartMode, setChartMode] = useState("revenue");
  // hiện ra biểu đồ revenue
  const handleRevenueChartModeChange = () => {
    setChartMode("revenue");
  };
  // Hiện ra hiểu đồ service
  const handleServiceChartModeChange = () => {
    setChartMode("service");
  };
  // Biểu đồ 2
  const [filteredData2, setFilteredData2] = useState([]); // State để lưu trữ dữ liệu từ API
  const { data: statisticalServiceData } = useGetStatisticalServiceQuery();

  const [selectedMonthSv, setSelectedMonthSv] = useState("Tháng 1");
  const [selectedYearSv, setSelectedYearSv] = useState("2023");
  const [uniqueMonthsSv, setUniqueMonthsSv] = useState<any>([]);
  const [uniqueYearsSv, setUniqueYearsSv] = useState<any>([]);

  useEffect(() => {
    if (statisticalServiceData) {
      // Trích xuất danh sách các tháng và năm duy nhất từ dữ liệu
      const uniqueMonthsSv = Array.from(
        new Set(statisticalServiceData.map((item: any) => item.month))
      );
      const uniqueYearsSv = Array.from(
        new Set(statisticalServiceData.map((item: any) => item.year))
      );

      setUniqueMonthsSv(uniqueMonthsSv);
      setUniqueYearsSv(uniqueYearsSv);

      // Lọc dữ liệu dựa trên tháng và năm đã chọn
      const filteredData = statisticalServiceData.filter((item: any) => {
        return item.month === selectedMonthSv && item.year === selectedYearSv;
      });

      setFilteredData2(filteredData);
    }
  }, [statisticalServiceData, selectedMonthSv, selectedYearSv]);
  const handleMonthChangeSv = (event: any) => {
    const selectedMonth = event.target.value;
    setSelectedMonthSv(selectedMonth);
  };

  const handleYearChangeSv = (event: any) => {
    const selectedYear = event.target.value;
    setSelectedYearSv(selectedYear);
  };

  const [isDropdownVisibleSv, setIsDropdownVisibleSv] = useState(false);
  const handleh1Click = () => {
    setIsDropdownVisibleSv(!isDropdownVisibleSv);
  };
  console.log("click", handleh1Click);

  return (
    <div>
      <Row gutter={16} className="mb-5">
        <Col span={7} className="border border-green-600 m-3.5">
          <Card
            title={
              <div className="text-black p-2 border-2 border-green-600 flex items-center justify-center">
                <span>Visitors Online</span>
              </div>
            }
            bordered={false}
          >
            <Statistic
              valueStyle={{ color: "#3f8600" }}
              prefix={<UserOutlined />}
              value={onlineVisitors}
              className="flex items-center justify-center"
            />
          </Card>
        </Col>
        <Col span={7} className="border border-red-700 m-3.5">
          <Card
            title={
              <div className="text-black p-2 border-2 border-red-700 flex items-center justify-center">
                <span>Revenue Growth</span>
              </div>
            }
            bordered={false}
          >
            <Statistic
              valueStyle={{ color: "#cf1322" }}
              prefix={<RiseOutlined />}
              value={revenueGrowth}
              precision={2}
              className="flex items-center justify-center"
            />
          </Card>
        </Col>
        <Col span={7} className="border border-yellow-500 m-3.5">
          <Card
            title={
              <div className="text-black p-2 border-2 border-yellow-500 flex items-center justify-center">
                <span>Today's Revenue</span>
              </div>
            }
            bordered={false}
          >
            <Statistic
              valueStyle={{ color: "#FFD700" }}
              prefix={<DollarOutlined />}
              value={todaysRevenue}
              className="flex items-center justify-center"
            />
          </Card>
        </Col>
      </Row>

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
          className={`py-2 px-4 rounded ${
            chartMode === "service"
              ? "bg-blue-500 text-white"
              : "bg-gray-300 text-gray-700"
          } hover:bg-blue-600 hover:text-white transition duration-300 ease-in-out`}
          onClick={handleServiceChartModeChange}
        >
          Service statistics
        </button>
      </div>
      {/* Bieu do 1 */}
      <Row gutter={16}>
        <Col>
          {chartMode === "revenue" && (
            <Card
              title={
                <div
                  className="flex items-center justify-between cursor-pointer "
                  onClick={handleTitleClick}
                >
                  <h1 className="text-2xl font-semibold text-blue-600 mb-4 ">
                    Biểu đồ thống kê doanh thu và số lượng booking
                  </h1>
                </div>
              }
              bordered={false}
            >
              <div
                className={`relative ${isDropdownVisible ? "block" : "hidden"}`}
              >
                <label>
                  <span className="bg-blue-200 p-2 ">Chọn năm:</span>
                </label>
                <select
                  className="border rounded p-2"
                  onChange={handleYearChange1}
                  value={selectedYear}
                >
                  {uniqueYears.map((year: any) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>

              <ResponsiveContainer width={1200} height={400}>
                <LineChart data={dataofYear}>
                  <XAxis dataKey="month" />
                  <YAxis
                    yAxisId="left"
                    label={{
                      value: "Bookings",
                      angle: -90,
                      position: "insideLeft",
                    }}
                  />
                  <YAxis
                    yAxisId="right"
                    orientation="right"
                    label={{
                      value: "Revenue",
                      angle: -90,
                      position: "insideRight",
                    }}
                  />
                  <CartesianGrid stroke="#f5f5f5" />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="bookings"
                    yAxisId="left"
                    stroke={colors[0]}
                    name="Bookings"
                  />
                  <Line
                    type="monotone"
                    dataKey="revenue"
                    yAxisId="right"
                    stroke={colors[1]}
                    name="Revenue"
                  />
                </LineChart>
              </ResponsiveContainer>
            </Card>
          )}
        </Col>
      </Row>
      {/* bieu do 2 */}
      <h1
        className="text-2xl font-semibold text-blue-600 mb-4 "
        onClick={handleh1Click}
      >
        Thống kê số lượng dịch vụ của khách sạn
      </h1>
      {chartMode === "service" && (
        <div>
          <div
            className={`relative ${isDropdownVisibleSv ? "block" : "hidden"}`}
          >
            <div className="flex space-x-4">
              <div className="bg-blue-200">
                <label>Chọn tháng: </label>
                <select
                  className="border rounded p-2"
                  onChange={handleMonthChangeSv}
                  value={selectedMonthSv}
                >
                  {uniqueMonthsSv.map((month: any) => (
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
                  onChange={handleYearChangeSv}
                  value={selectedYearSv}
                >
                  {uniqueYearsSv.map((year: any) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {filteredData2.length > 0 ? (
            <div>
              <h2>
                Dữ liệu cho tháng {selectedMonthSv} năm {selectedYearSv}:
              </h2>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={filteredData2}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="serviceName" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="count" name="Số lượng" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div>
              <p>Không có dữ liệu cho tháng và năm đã chọn.</p>
            </div>
          )}
        </div>
      )}

      <Card title="Hotel Statistics" style={{ marginTop: "16px" }}>
        <Table columns={columns} dataSource={dataHotel} />
      </Card>
    </div>
  );
};

export default HotelChainStatistics;