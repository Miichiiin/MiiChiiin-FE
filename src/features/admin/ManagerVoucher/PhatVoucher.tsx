import React, { useState } from "react";
import { useGetVoucherQuery } from "@/api/admin/voucher";
import { Table, Checkbox, Button, Row, Col, DatePicker, message } from "antd";
import { useAddVoucherMutation } from "@/api/admin/voucher";

const { RangePicker } = DatePicker;

const PhatVoucher = () => {
  const { data: voucherData } = useGetVoucherQuery();
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [isInputVisible, setIsInputVisible] = useState(false);
  const [bookingCount, setBookingCount] = useState("");
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  const [selectedVoucher, setSelectedVoucher] = useState(null);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [phatVoucher] = useAddVoucherMutation();
  const [showInput, setShowInput] = useState(false);

  const [isChecked, setIsChecked] = useState({
    all: false,
    area: false,
    new_customer: false,
    date: false,
    quantity_of_booking: false,
    total_of_amount: false,
  });

  const [valueByTotalAmount, setValueByTotalAmount] = useState("");
  const [isTotalAmount, setIsTotalAmount] = useState(false);
  const [valueArea, setValueArea] = useState("");
  const [isQuantityBooking, setIsQuantityBooking] = useState(false);

  const [dateChoose, setDateChoose] = useState("");

  const handleCheckboxChange = (key: any) => {
    setIsChecked((prev: any) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  console.log(isChecked);

  const handleToggleInput = () => {
    setShowInput(!showInput);
  };

  interface Voucher {
    id: string | number;
  }

  const columns = [
    {
      title: "Tên Voucher",
      dataIndex: "name",
      key: "tenVoucher",
      render: (text: any, record: Voucher) => (
        <span
          style={{
            fontWeight: "bold",
            color: selectedVoucher?.id === record.id ? "#0066cc" : "inherit",
          }}
          onClick={() => onSelectVoucher(record)}
        >
          {text}
        </span>
      ),
    },
  ];

  const rowSelection = {
    selectedRowKeys: selectedUsers,
    onChange: (selectedRowKeys: any, selectedRows: any) => {
      console.log("Selected Row Keys:", selectedRowKeys);
      console.log("Selected Rows:", selectedRows);
      onSelectUser(selectedRowKeys);
    },
    hideSelectAll: true,
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
      setIsQuantityBooking(true);
    } else {
      // Hiển thị alert khi số lượng booking không hợp lệ
      message.error("Số lượng booking phải lớn hơn hoặc bằng 5.");
      setShowErrorMessage(true);
    }
  };
  // Theo khách sạn
  const [showSelect, setShowSelect] = useState(false);

  const handleLabelClick1 = () => {
    setShowSelect(!showSelect);
  };
  // Phát voucher
  const onSelectVoucher = (voucher: any) => {
    setSelectedVoucher(voucher);
  };

  const onSelectUser = (selectedRowKeys: any) => {
    setSelectedUsers(selectedRowKeys.slice(-1));
  };

  const handleGenerateVoucher = async () => {
    // if (!selectedVoucher) {
    //   message.error("Vui lòng chọn voucher trước khi phát.");
    //   return;
    // }

    if (selectedUsers.length === 0) {
      message.error("Vui lòng chọn ít nhất một người dùng để phát voucher.");
      return;
    }
    console.log(dateChoose[0]);

    if (dateChoose[0] === undefined || dateChoose[1] === undefined) {
      message.error("Vui lòng chọn ngày phát.");
      return;
    }

    if (Object.values(isChecked).every((e) => e === false)) {
      message.error("Vui lòng chọn options để phát.");
      return;
    }

    if (isChecked.quantity_of_booking && bookingCount.length < 1) {
      message.error("Vui lòng nhập input Khách Hàng theo số lượng.");
      return;
    }

    if (isChecked.total_of_amount && valueByTotalAmount.length < 1) {
      message.error("Vui lòng nhập input Khách Hàng theo số tiền.");
      return;
    }

    if (isChecked.area && valueArea.length < 1) {
      message.error("Vui lòng nhập input Khu Vực.");
      return;
    }

    let params: any = {
      voucher: selectedUsers[0],
      types: Object.entries(isChecked)
        .filter(([key, value]) => value === true)
        .map(([key]) => key),
      start_date: dateChoose[0],
      end_date: dateChoose[1],
    };

    if (isChecked.area && valueArea) {
      params["area"] = valueArea;
    }
    if (isChecked.total_of_amount && valueByTotalAmount) {
      params["quantity_of_booking"] = valueByTotalAmount;
    }
    if (isChecked.quantity_of_booking && bookingCount) {
      params["quantity_of_booking"] = bookingCount;
    }

    // const [mutate] = voucherMutation;

    console.log(params);

    try {
      phatVoucher(params)
        .unwrap()
        .then(() => {
          message.success("Thêm thành công voucher!");
        });

      message.success("Đã phát voucher thành công!");
    } catch (error) {
      console.error("Mutation error:", error);
      message.error("Có lỗi xảy ra khi phát voucher.");
    }
  };

  const handleSetTotalAmount = () => {
    if (!isChecked.total_of_amount)
      return message.error("Vui long chon Khach Hang Theo Tien.");
    if (!valueByTotalAmount)
      return message.error("Vui long o khong de trong du lieu");

    setIsTotalAmount(true);
  };

  const handleChangeArea = (e: any) => {
    setValueArea(e.target.value);
  };
  console.log(dateChoose);

  //
  return (
    <div>
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
            <RangePicker
              // value={dateChoose as any}
              onChange={(date: any, dateString: any) =>
                setDateChoose(dateString)
              }
              style={{ marginBottom: "16px" }}
            />
          </div>

          {/* Toàn bộ ks */}
          <div className="flex items-center">
            <input
              type="checkbox"
              id="agreeCheckbox"
              checked={isChecked.all}
              onChange={() => handleCheckboxChange("all")}
              className="mr-2 mb-3"
            />
            <div
              className={`flex items-center bg-blue-500 text-white p-4 rounded-md mb-5 w-96 h-10 ${
                isChecked.all && `bg-slate-400`
              }`}
            >
              <label htmlFor="newCustomer">Toàn Bộ Các khách hàng</label>
            </div>
          </div>

          {/* Khách hàng theo thời gian */}
          <div className="flex items-center">
            <input
              type="checkbox"
              id="agreeCheckbox"
              checked={isChecked.date}
              onChange={() => handleCheckboxChange("date")}
              className="mr-2 mb-3"
            />
            <div
              className={`flex items-center bg-blue-500 text-white p-4 rounded-md mb-5 w-96 h-10 ${
                isChecked.date && `bg-slate-400`
              }`}
            >
              <label htmlFor="newCustomer">Khách Theo Thời Gian</label>
            </div>
          </div>

          {/* Khách hàng mới */}
          <div className="flex items-center">
            <input
              type="checkbox"
              id="agreeCheckbox"
              checked={isChecked.new_customer}
              onChange={() => handleCheckboxChange("new_customer")}
              className="mr-2 mb-3"
            />
            <div
              className={`flex items-center bg-blue-500 text-white p-4 rounded-md mb-5 w-96 h-10 ${
                isChecked.new_customer && `bg-slate-400`
              }`}
            >
              <label htmlFor="newCustomer">Khách Hàng Mới</label>
            </div>
          </div>

          {/* Số tiền */}
          <div className="flex items-center">
            {/* Checkbox */}
            <input
              type="checkbox"
              id="agreeCheckbox"
              checked={isChecked.total_of_amount}
              onChange={() => handleCheckboxChange("total_of_amount")}
              className="mr-2 mb-3"
            />

            {/* Div chứa nội dung */}
            <div
              className={`flex items-center bg-blue-500 text-white p-4 rounded-md mb-5 w-96 h-10 ${
                showInput ? "border border-white" : ""
              } ${isChecked.total_of_amount && "bg-slate-400"}`}
              onClick={handleToggleInput}
            >
              <label htmlFor="newCustomer">Khách Hàng Theo Số Tiền</label>
            </div>
          </div>

          {showInput && (
            <div className="flex mb-2">
              <input
                type="number"
                value={valueByTotalAmount}
                onChange={(e) => setValueByTotalAmount(e.target.value)}
                placeholder="Nhập số tiền"
                className="p-2 border ml-5"
              />
              <button
                onClick={handleSetTotalAmount}
                className="bg-blue-500 text-white p-2 rounded-md"
              >
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
                checked={isChecked.quantity_of_booking}
                onChange={() => handleCheckboxChange("quantity_of_booking")}
                className="mr-2 mb-3"
              />
              <label
                htmlFor="newCustomer"
                className={`flex items-center bg-blue-500 text-white p-4 rounded-md mb-5 w-96 h-10 ${
                  isChecked.quantity_of_booking && `bg-slate-400`
                }`}
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
              checked={isChecked.area}
              onChange={() => handleCheckboxChange("area")}
              className="mr-2 mb-3"
            />

            {/* Div chứa nhãn và select */}
            <div
              className={`flex mt-2 items-center bg-blue-500 text-white p-4 rounded-md mb-5 w-96 h-10 relative ${
                isChecked.area && `bg-slate-400`
              }`}
            >
              <label htmlFor="newCustomer" onClick={handleLabelClick1}>
                Theo Khu Vực
              </label>

              {/* Select box */}
              <select
                className={` border mt-5r border-black text-black p-2 rounded-md absolute top-full left-0 ${
                  showSelect ? "block" : "hidden"
                } bg-gray-200`}
                value={valueArea}
                onChange={(e) => handleChangeArea(e as any)}
              >
                {/* Options go here */}
                <option value="hotel1">Hà Nội</option>
                <option value="hotel2">Hồ Chí Minh</option>
                <option value="hotel3">Quảng Ninh</option>
                <option value="hotel3">Lâm Đồng</option>
                <option value="hotel3">Đà Nẵng</option>
              </select>
            </div>
          </div>

          <Button
            className="bg-blue-950 mb-5 hover:bg-slate-400 text-white font-bold ml-72 py-2 px-4 rounded h-10"
            onClick={handleGenerateVoucher}
          >
            Phát Voucher
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default PhatVoucher;
