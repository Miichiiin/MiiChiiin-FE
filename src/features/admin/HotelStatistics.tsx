import { useEffect, useState } from "react";
import { Card, Row, Col} from "antd";
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
import { useGetStatisticalRoomtypeQuery } from "@/api/admin/statistical_RoomType";

const colors = ["#8884d8", "#82ca9d", "#ffc658", "#ff7f0e", "#99CCFF"];

const HotelChainStatistics = () => {
  const userAdminLocal = localStorage.getItem("userAdmin");

  let dataLogin;
  if (userAdminLocal !== null) {
    if (
      userAdminLocal[0] === "{" &&
      userAdminLocal[userAdminLocal.length - 1] === "}"
    ) {
      // Dữ liệu trong localStorage có dấu ngoặc nhọn ở đầu và cuối, có thể là đối tượng JSON.
      dataLogin = JSON.parse(userAdminLocal);
    } else {
      // Dữ liệu trong localStorage không phải là đối tượng JSON, sử dụng nó trực tiếp.
      dataLogin = userAdminLocal;
    }
  }

  // Biểu đồ 1

  const [selectedYear, setSelectedYear] = useState(2023);

  const { data: statisticalData1, refetch } = useGetStatisticalQuery({
    id: dataLogin?.id_hotel,
    year: selectedYear,
  });
  let statisticalData: any;

  if (statisticalData1) {
    statisticalData = statisticalData1.booking_data_by_month;
  } else {
  }

  const [filteredData1, setFilteredData1] = useState<any>([]);

  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const handleTitleClick = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  const dataofYear = Array.isArray(statisticalData)
    ? statisticalData.filter((item: any) => item.Year == selectedYear)
    : [];

  // Nếu trùng năm thì không hiện
  const uniqueYears = [
    ...new Set(
      statisticalData && statisticalData.map((item: any) => item.Year)
    ),
  ];

  useEffect(() => {
    // Gọi lại API khi selectedYear thay đổi
    refetch();
  }, [selectedYear, refetch]);

  useEffect(() => {
    if (statisticalData) {
      // Lọc dữ liệu dựa trên năm được chọn
      const filtered = statisticalData.filter(
        (item: any) => item.Year === selectedYear
      );
      setFilteredData1(filtered);
    }
  }, [statisticalData, selectedYear]);

  const handleYearChange1 = (event: any) => {
    const newYear = parseInt(event.target.value);
    setSelectedYear(newYear);
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
  const handleRoomTypeChartModeChange = () => {
    setChartMode("roomtype");
  };
  // Biểu đồ 2

  const [selectedMonthSv, setSelectedMonthSv] = useState(12);
  const [selectedYearSv, setSelectedYearSv] = useState(2023);
  const [filteredData2, setFilteredData2] = useState<any>([]); // State để lưu trữ dữ liệu từ API
  const { data: statisticalServiceData } = useGetStatisticalServiceQuery({
    id: dataLogin?.id_hotel,
    month: selectedMonthSv,
    year: selectedYearSv,
  });

  useEffect(() => {
    if (statisticalServiceData && Array.isArray(statisticalServiceData)) {
      // Lọc dữ liệu dựa trên tháng và năm đã chọn
      const filteredData = statisticalServiceData.filter((item) => {
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

  // Biểu đồ 3
  const [selectedYearRt, setSelectedYearRt] = useState(2023);
  const [selectedMonthRt, setSelectedMonthRt] = useState(12);
  const [filteredRoomTypeData, setFilteredRoomTypeData] = useState<any>([]);
  const { data: statisticalroomtype1 } = useGetStatisticalRoomtypeQuery({
    id: dataLogin?.id_hotel,
    month: selectedMonthRt,
    year: selectedYearRt,
  });

  const handleYearChangeRt = (event: any) => {
    setSelectedYearRt(parseInt(event.target.value));
  };

  const handleMonthChangeRt = (event: any) => {
    setSelectedMonthRt(parseInt(event.target.value));
  };

  // Sử dụng kiểu dữ liệu đã định nghĩa

  let statisticalroomtype: any;

  if (statisticalroomtype1) {
    statisticalroomtype = statisticalroomtype1.rating_comment_booking;
  } else {
  }

  const statisticalRoom =
    statisticalroomtype &&
    statisticalroomtype.map((item: any) => ({
      roomType: item.roomType,
      bookingCount: item.bookingCount,
      rating: item.rating,
    }));

  useEffect(() => {
    if (statisticalroomtype && Array.isArray(statisticalroomtype)) {
      // Cập nhật dữ liệu dựa trên kết quả từ API
      const FilteredRoomTypeData = statisticalroomtype.filter((item) => {
        return item.month === selectedMonthRt && item.year === selectedYearRt;
      });
      setFilteredRoomTypeData(FilteredRoomTypeData);
    }
  }, [statisticalroomtype, selectedMonthRt, selectedYearRt]);
  const [isDropdownVisibleRt, setIsDropdownVisibleRt] = useState(false);

  const handleh3Click = () => {
    setIsDropdownVisibleRt(!isDropdownVisibleRt);
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
          Thống Kê Doanh Thu
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
                  <h1 className="text-2xl font-semibold text-orange-600 mb-4 ">
                    Biểu đồ thống kê doanh thu và số lượng booking
                  </h1>
                </div>
              }
              bordered={false}
            >
              <div
                className={`relative ${
                  isDropdownVisible ? "block" : "hidden"
                } mb-2`}
              >
                <label>
                  <span className="bg-blue-200 p-2 ">Chọn năm:</span>
                </label>
                <select
                  className="border rounded p-2"
                  onChange={handleYearChange1}
                  value={selectedYear}
                >
                  {Array.from({ length: 4 }, (_, index) => {
                    const Year = 2020 + index;
                    return (
                      <option key={Year} value={Year}>
                        {Year}
                      </option>
                    );
                  })}
                </select>
                <h2 className="mt-2">Dữ liệu cho năm {selectedYear}:</h2>
              </div>

              <ResponsiveContainer width={1200} height={400}>
                <LineChart data={statisticalData}>
                  <XAxis dataKey="Month" allowDuplicatedCategory={false} />
                  <YAxis
                    yAxisId="left"
                    label={{
                      value: "Số bookings",
                      angle: -90,
                      position: "insideLeft",
                    }}
                  />
                  <YAxis
                    yAxisId="right"
                    orientation="right"
                    label={{
                      value: "Tổng tiền",
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
                    name="Số Bookings"
                  />

                  <Line
                    type="monotone"
                    dataKey="revenue"
                    yAxisId="right"
                    stroke={colors[1]}
                    name="Tổng tiền"
                  />
                </LineChart>
              </ResponsiveContainer>
            </Card>
          )}
        </Col>
      </Row>
      {/* bieu do 2 */}
      {chartMode === "service" && (
        <div>
          <h1
            className="text-2xl font-semibold text-orange-600 mb-4 cursor-pointer"
            onClick={handleh1Click}
          >
            Thống kê số lượng dịch vụ của khách sạn
          </h1>
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
                  {Array.from({ length: 12 }, (_, index) => {
                    const monthNumber = index + 1;
                    return (
                      <option key={monthNumber} value={monthNumber}>
                        {monthNumber}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="bg-green-200">
                <label>Chọn năm: </label>
                <select
                  className="border rounded p-2"
                  onChange={handleYearChangeSv}
                  value={selectedYearSv}
                >
                  {Array.from({ length: 4 }, (_, i) => {
                    const yearNumber = 2020 + i;
                    return (
                      <option key={yearNumber} value={yearNumber}>
                        {yearNumber}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
          </div>

          {statisticalServiceData && statisticalServiceData.length > 0 ? ( // Thêm kiểm tra 'statisticalServiceData' không phải là undefined
            <div>
              <h2 className="mb-2 mt-2">
                Dữ liệu cho tháng {selectedMonthSv} năm {selectedYearSv}:
              </h2>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={statisticalServiceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="serviceName" />
                  <YAxis
                    label={{
                      value: "Dịch vụ",
                      angle: -90,
                      position: "insideLeft",
                    }}
                  />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="count" name="Số lượng dịch vụ" fill="#8884d8" />
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

      {/* Biểu đồ 3 */}
      <div>
        {chartMode === "roomtype" && (
          <div>
            <h1
              className="text-2xl font-semibold text-orange-600 mb-4 cursor-pointer"
              onClick={handleh3Click}
            >
              Thống kê lượt đặt phòng và đánh giá
            </h1>
            <div
              className={`relative ${
                isDropdownVisibleRt ? "block" : "hidden"
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
            </div>
            <h2 className="mt-3">
              Dữ liệu cho tháng {selectedMonthRt} năm {selectedYearRt}:
            </h2>
            {statisticalRoom ? (
              statisticalRoom.length === 0 ? (
                <p className="font-bold">
                  Không có dữ liệu cho tháng và năm đã chọn.
                </p>
              ) : (
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={statisticalRoom}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="roomType" />
                    <YAxis
                      label={{
                        value: "Bookings & Đánh giá",
                        angle: -90,
                        position: "insideLeft",
                      }}
                    />
                    <Tooltip />
                    <Legend />
                    <Bar
                      dataKey="bookingCount"
                      fill="steelblue"
                      name="Số lượng bookings"
                    />
                    <Bar dataKey="rating" fill="orange" name="Đánh giá" />
                  </BarChart>
                </ResponsiveContainer>
              )
            ) : (
              <p>Loading...</p>
            )}
          </div>
        )}
      </div>

      {/* Biểu đồ 4 */}
      {/* <Card title="Hotel Statistics" style={{ marginTop: "16px" }}>
        <Table columns={columns} dataSource={statisticalData} />
      </Card> */}
    </div>
  );
};

export default HotelChainStatistics;
