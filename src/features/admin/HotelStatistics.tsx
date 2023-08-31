// Đảm bảo bạn đã import React
import { Card, Row, Col, Table, DatePicker } from "antd";
import {
  PieChart,
  Pie,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Cell,
  Label
} from "recharts";

const colors = ["#8884d8", "#82ca9d", "#ffc658", "#ff7f0e", "#99CCFF"];

const HotelChainStatistics = () => {
  const data = [
    { hotelName: "Hotel A", bookings: 120, revenue: 25000, occupancyRate: 75 },
    { hotelName: "Hotel B", bookings: 90, revenue: 18000, occupancyRate: 60 },
    { hotelName: "Hotel C", bookings: 150, revenue: 32000, occupancyRate: 90 },
    { hotelName: "Hotel D", bookings: 180, revenue: 62000, occupancyRate: 90 },
    { hotelName: "Hotel E", bookings: 80, revenue: 162000, occupancyRate: 90 },
  ];

  // Thêm dữ liệu khách sạn khác theo cấu trúc tương tự

  const columns = [
    { title: "Hotel Name", dataIndex: "hotelName", key: "hotelName" },
    { title: "Bookings", dataIndex: "bookings", key: "bookings" },
    { title: "Revenue", dataIndex: "revenue", key: "revenue" },
    // Thêm các cột khác theo nhu cầu
  ];

  return (
    <div>
      
      <Row gutter={16}>
        <Col span={12}>
          <Card title="Total Bookings" bordered={false}>
            <DatePicker.MonthPicker
              placeholder="Select month"
              className="mb-3"
            />
            <BarChart width={400} height={300} data={data}>
              <XAxis dataKey="hotelName" />
              <YAxis />
              <CartesianGrid stroke="#f5f5f5" />
              <Tooltip />
              <Legend />
              <Bar dataKey="bookings">
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={colors[index % colors.length]}
                  />
                ))}
              </Bar>
            </BarChart>
          </Card>
        </Col>
        <Col span={12}>
          <Card title="Revenue Distribution" bordered={false}>
            <PieChart width={400} height={300}>
              <Pie
                dataKey="revenue"
                isAnimationActive={false}
                data={data}
                cx={200}
                cy={150}
                outerRadius={60}
                label
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={colors[index % colors.length]}
                  />
                ))}
                <Label
                  content={({
                    cx,
                    cy,
                    midAngle,
                    innerRadius,
                    outerRadius,
                    percent,
                    index,
                  }:any) => {
                    const RADIAN = Math.PI / 180;
                    const radius =
                      innerRadius + (outerRadius - innerRadius) * 0.5;
                    const x = cx + radius * Math.cos(-midAngle * RADIAN);
                    const y = cy + radius * Math.sin(-midAngle * RADIAN);

                    return (
                      <text
                        x={x}
                        y={y}
                        fill="#8884d8"
                        textAnchor={x > cx ? "start" : "end"}
                        dominantBaseline="central"
                      >
                        {`${(percent * 100).toFixed(0)}% - ${
                          data[index]?.hotelName || ""
                        }`}
                      </text>
                    );
                  }}
                />
              </Pie>
              <Tooltip />
              <Legend
                align="right"
                verticalAlign="middle"
                layout="vertical"
                iconSize={10}
              />
            </PieChart>
          </Card>
        </Col>
      </Row>
      <Card title="Hotel Statistics" style={{ marginTop: "16px" }}>
        <Table columns={columns} dataSource={data} />
      </Card>
    </div>
  );
};

export default HotelChainStatistics;
