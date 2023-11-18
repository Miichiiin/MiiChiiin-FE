import React, { useState } from "react";
import { useGetVoucherQuery } from "@/api/admin/voucher";
import { Table, Checkbox, Button, Row, Col, DatePicker } from "antd";

const { RangePicker } = DatePicker;

const PhatVoucher = () => {
  const { data: voucherData } = useGetVoucherQuery();
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [isInputVisible, setIsInputVisible] = useState(false);
  const [bookingCount, setBookingCount] = useState("");
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  const onSelectChange = (selectedRowKeys: any) => {
    setSelectedRowKeys(selectedRowKeys);
  };

  const [showInput, setShowInput] = useState(false);

  const handleToggleInput = () => {
    setShowInput(!showInput);
  };

  const columns = [
    {
      title: "Tên Voucher",
      dataIndex: "name",
      key: "tenVoucher",
      // Thêm đối tượng style cho tiêu đề
      render: (text: any, record: any) => (
        <span style={{ fontWeight: "bold", color: "#0066cc" }}>{text}</span>
      ),
    },
  ];

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  // Booking count
  const handleLabelClick = () => {
    setIsInputVisible(!isInputVisible);
    setShowErrorMessage(false); // Ẩn thông báo lỗi khi click vào label
  };

  const handleInputChange = (event: any) => {
    setBookingCount(event.target.value);
  };

  const handleSubmit = () => {
    if (parseInt(bookingCount) >= 5) {
      console.log("Booking hợp lệ");
    } else {
      // Hiển thị alert khi số lượng booking không hợp lệ
      window.alert("Số lượng booking phải lớn hơn hoặc bằng 5.");
      setShowErrorMessage(true);
    }
  };
  // Theo khách sạn
  const [showSelect, setShowSelect] = useState(false);

  const handleLabelClick1 = () => {
    setShowSelect(!showSelect);
  };
  // Phát voucher
  const handleGenerateVoucher = () => {
    // Xử lý logic khi nút "Phát Voucher" được nhấn
    console.log("Voucher đã được phát!");
  };
  return (
    <div >
      <h2 className="text-xl font-semibold mb-4 bg-gray-700 text-yellow-100 p-2 rounded-md shadow-md flex items-center justify-center">
        Phát Voucher Cho User
      </h2>
      <Row>
        <Col span={10} style={{ maxHeight: "550px", overflowY: "auto" }}>
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
          {/* Time */}
          <div className="">
            <h3 className="font-semibold mb-3">Chọn thời gian phát:</h3>
            <RangePicker style={{ marginBottom: "16px" }} />
          </div>

          {/* Toàn bộ ks */}
          <div className="flex items-center">
            <input
              type="checkbox"
              id="agreeCheckbox"
              // checked={isChecked}
              // onChange={handleCheckboxChange}
              className="mr-2 mb-3"
            />
            <div className="flex items-center bg-blue-500 text-white p-4 rounded-md mb-5 w-96 h-10">
              <label htmlFor="newCustomer">Toàn Bộ Các Khách Sạn</label>
            </div>
          </div>

          {/* Khách hàng theo thời gian */}
          <div className="flex items-center">
            <input
              type="checkbox"
              id="agreeCheckbox"
              // checked={isChecked}
              // onChange={handleCheckboxChange}
              className="mr-2 mb-3"
            />
            <div className="flex items-center bg-blue-500 text-white p-4 rounded-md mb-5 w-96 h-10">
              <label htmlFor="newCustomer">Khách Theo Thời Gian</label>
            </div>
          </div>

          {/* Khách hàng mới */}
          <div className="flex items-center">
            <input
              type="checkbox"
              id="agreeCheckbox"
              // checked={isChecked}
              // onChange={handleCheckboxChange}
              className="mr-2 mb-3"
            />
            <div className="flex items-center bg-blue-500 text-white p-4 rounded-md mb-5 w-96 h-10">
              <label htmlFor="newCustomer">Khách Hàng Mới</label>
            </div>
          </div>

          {/* Số tiền */}
          <div className="flex items-center">
            {/* Checkbox */}
            <input
              type="checkbox"
              id="agreeCheckbox"
              // checked={isChecked}
              // onChange={handleCheckboxChange}
              className="mr-2 mb-3"
            />

            {/* Div chứa nội dung */}
            <div
              className={`flex items-center bg-blue-500 text-white p-4 rounded-md mb-5 w-96 h-10 ${
                showInput ? "border border-white" : ""
              }`}
              onClick={handleToggleInput}
            >
              <label htmlFor="newCustomer">Khách Hàng Theo Số Tiền</label>
            </div>
          </div>

          {showInput && (
            <div className="flex mb-2">
              <input
                type="number"
                placeholder="Nhập số tiền"
                className="p-2 border ml-5"
              />
              <button className="bg-blue-500 text-white p-2 rounded-md">
                Nhập
              </button>
            </div>
          )}

          {/* Số lượng Booking */}
          <div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="agreeCheckbox"
                // checked={isChecked}
                // onChange={handleCheckboxChange}
                className="mr-2 mb-3"
              />
              <label
                htmlFor="newCustomer"
                className="flex items-center bg-blue-500 text-white p-4 rounded-md mb-5 w-96 h-10"
                onClick={handleLabelClick}
              >
                Khách Hàng Theo Số Lượng Booking
              </label>
            </div>
            {isInputVisible && (
              <div className="flex mt-4">
                <label className="flex-1 text-sm font-semibold mr-2 ml-3">
                  Số Lượng Booking:
                  <input
                    type="number"
                    id="newCustomer"
                    value={bookingCount}
                    onChange={handleInputChange}
                    className="block w-full p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300 ml-3"
                  />
                </label>
                <button
                  onClick={handleSubmit}
                  className="bg-blue-500  text-white px-4 py-2 rounded-md focus:outline-none hover:bg-blue-700 h-10 mt-5 mb-5 mr-2"
                >
                  Submit
                </button>
              </div>
            )}
          </div>

          {/* Theo khách sạn */}
          <div className="flex items-center">
            {/* Checkbox */}
            <input
              type="checkbox"
              id="agreeCheckbox"
              // checked={isChecked}
              // onChange={handleCheckboxChange}
              className="mr-2 mb-3"
            />

            {/* Div chứa nhãn và select */}
            <div
              className={`flex mt-2 items-center bg-blue-500 text-white p-4 rounded-md mb-5 w-96 h-10 relative`}
            >
              <label htmlFor="newCustomer" onClick={handleLabelClick1}>
                Theo Khu Vực
              </label>

              {/* Select box */}
              <select
                className={` border mt-5r border-black text-black p-2 rounded-md absolute top-full left-0 ${
                  showSelect ? "block" : "hidden"
                } bg-gray-200`}
              >
                {/* Options go here */}
                <option value="hotel1">Hà Nội</option>
                <option value="hotel2">Hồ Chí Minh</option>
                <option value="hotel3">Quảng Ninh</option>
                <option value="hotel3">Quảng Ninh</option>
                <option value="hotel3">Quảng Ninh</option>
                
              </select>
            </div>
          </div>
        <Button  className="bg-blue-950 mb-5 hover:bg-slate-400 text-white font-bold ml-72 py-2 px-4 rounded h-10" onClick={handleGenerateVoucher}>Phát Voucher</Button>
        </Col>
      </Row>
    </div>
  );
};

export default PhatVoucher;
