import React, { useState } from "react";
import { useGetVoucherQuery } from "@/api/admin/voucher";
import { Table, Checkbox, Button, Row, Col, DatePicker } from "antd";

const { RangePicker } = DatePicker;

const PhatVoucher = () => {
  const { data: voucherData } = useGetVoucherQuery();
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [dateRange, setDateRange] = useState([]);

  const onSelectChange = (selectedRowKeys: any) => {
    setSelectedRowKeys(selectedRowKeys);
  };

  const handleImport = () => {
    // Xử lý logic khi nhấn nút Import
    console.log("Importing selected vouchers:", selectedRowKeys);
    console.log("Selected date range:", dateRange);
  };

  const handleDateChange = (dates: any) => {
    setDateRange(dates);
  };

  const columns = [
    {
      title: "Tên Voucher",
      dataIndex: "name",
      key: "tenVoucher",
    },
    // Thêm các cột khác tương ứng với dữ liệu voucher
  ];

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  return (
    <div>
      <Row>
        <Col span={10}>
          <h2 className="text-xl font-semibold mb-4 bg-blue-500 text-white p-2 rounded-md shadow-md">
            Danh sách Voucher:
          </h2>
          <Table
            rowKey="id"
            dataSource={voucherData}
            columns={columns}
            rowSelection={rowSelection}
          />
        </Col>
        <Col span={10} className="ml-10">
          <h2 className="text-xl font-semibold mb-4 bg-yellow-300 text-white p-2 rounded-md shadow-md">
            Danh sách User:
          </h2>
          <div>
            <h3 className="font-bold ">Chọn thời gian phát</h3>
            <RangePicker
              style={{ marginBottom: "16px" }}
              onChange={handleDateChange}
            />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default PhatVoucher;
