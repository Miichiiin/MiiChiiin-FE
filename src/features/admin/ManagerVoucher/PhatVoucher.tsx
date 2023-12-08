import { useState } from "react";
import { useGetVoucherQuery } from "@/api/admin/voucher";
import { Table, Button, Row, Col, DatePicker, message } from "antd";
// import { useAddVoucherMutation } from "@/api/admin/voucher";
import { usePhatVoucherMutation } from "@/api/admin/voucher";
import moment from "moment";
import "../../../components/Css/index.css";
const { RangePicker } = DatePicker;

const PhatVoucher = () => {
  const { data: voucherData } = useGetVoucherQuery();
  const [isInputVisible, setIsInputVisible] = useState(false);
  const [bookingCount, setBookingCount] = useState("");
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  console.log("showErrorMessage", showErrorMessage);

  const [selectedVoucher, setSelectedVoucher] = useState<any>(null);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [phatVoucher] = usePhatVoucherMutation();
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
  console.log("isTotalAmount", isTotalAmount);

  const [valueArea, setValueArea] = useState("");
  const [isQuantityBooking, setIsQuantityBooking] = useState(false);
  console.log("isQuantityBooking", isQuantityBooking);

  const [dateChoose, setDateChoose] = useState("");

  const handleCheckboxChange = (key: any) => {
    setIsChecked((prev: any) => ({
      all: false,
      area: false,
      new_customer: false,
      date: false,
      quantity_of_booking: false,
      total_of_amount: false,
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

  // Phát voucher
  const onSelectVoucher = (voucher: any) => {
    setSelectedVoucher(voucher);
  };

  const onSelectUser = (selectedRowKeys: any) => {
    setSelectedUsers(selectedRowKeys.slice(-1));
  };

  function getCurrentDateFormatted() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0"); // months are 0-indexed
    const day = String(now.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  }

  const handleGenerateVouchers = async () => {
    // if (!selectedVoucher) {
    //   message.error("Vui lòng chọn voucher trước khi phát.");
    //   return;
    // }

    if (selectedUsers.length === 0) {
      message.error("Vui lòng chọn ít nhất một người dùng để phát voucher.");
      return;
    }
    console.log(dateChoose[0]);

    // if (dateChoose[0] === undefined || dateChoose[1] === undefined) {
    //   message.error("Vui lòng chọn ngày phát.");
    //   return;
    // }

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

    if (isChecked.date && (!dateChoose[0] || !dateChoose[1])) {
      message.error("Vui lòng nhập date.");
      return;
    }

    let params: any = {
      voucher: selectedUsers[0],
      types: Object.entries(isChecked)
        .filter(([, value]) => value === true)
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

    if (isChecked.new_customer) {
      params["start_date"] = getCurrentDateFormatted();
      params["end_date"] = getCurrentDateFormatted();
    } else {
      delete params["start_date"];
      delete params["end_date"];
    }
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

  function disableDate(current: any) {
    // Can not select days before today
    return current && current < moment().startOf("day");
  }

  console.log(isChecked);

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

          {/* Toàn bộ ks */}
          <div className="flex items-center">
            <input
              type="radio"
              name="option_voucher"
              id="agreeCheckbox"
              checked={isChecked.all}
              onChange={() => handleCheckboxChange("all")}
              className="mr-2 mb-3"
            />
            <div
              className={`flex items-center bg-gray-500 text-white p-4 rounded-md mb-5 w-96 h-10 ${
                isChecked.all && `bg-gradient-to-r from-cyan-500 to-blue-500 `
              }`}
            >
              <label htmlFor="newCustomer">Toàn Bộ Các khách hàng</label>
            </div>
          </div>

          {/* Khách hàng theo thời gian */}
          <div className="flex items-center">
            <input
              type="radio"
              name="option_voucher"
              id="agreeCheckbox"
              checked={isChecked.date}
              onChange={() => handleCheckboxChange("date")}
              className="mr-2 mb-3"
            />
            <div
              className={`flex items-center bg-gray-500 text-white p-4 rounded-md mb-5 w-96 h-10 ${
                isChecked.date && `bg-gradient-to-r from-cyan-500 to-blue-500`
              }`}
            >
              <label htmlFor="newCustomer">Khách Theo Thời Gian</label>
            </div>
          </div>

          {isChecked.date && (
            <div className="">
              <h3 className="font-semibold mb-3 ml-5">Chọn thời gian phát:</h3>
              <RangePicker
                // value={dateChoose as any}
                onChange={(_, dateString: any) =>
                  setDateChoose(dateString)
                  
                }
                disabledDate={disableDate}
                className="ml-5"
                style={{ marginBottom: "16px" }}
              />
            </div>
          )}

          {/* Khách hàng mới */}
          <div className="flex items-center">
            <input
              type="radio"
              name="option_voucher"
              id="agreeCheckbox"
              checked={isChecked.new_customer}
              onChange={() => handleCheckboxChange("new_customer")}
              className="mr-2 mb-3"
            />
            <div
              className={`flex items-center bg-gray-500 text-white p-4 rounded-md mb-5 w-96 h-10 ${
                isChecked.new_customer &&
                ` bg-gradient-to-r from-cyan-500 to-blue-500`
              }`}
            >
              <label htmlFor="newCustomer">Khách Hàng Mới</label>
            </div>
          </div>

          {/* Số tiền */}
          <div className="flex items-center">
            {/* Checkbox */}
            <input
              type="radio"
              name="option_voucher"
              id="agreeCheckbox"
              checked={isChecked.total_of_amount}
              onChange={() => handleCheckboxChange("total_of_amount")}
              className="mr-2 mb-3"
            />

            {/* Div chứa nội dung */}
            <div
              className={`flex items-center bg-gray-500 text-white p-4 rounded-md mb-5 w-96 h-10 ${
                showInput ? "border border-white" : ""
              } ${
                isChecked.total_of_amount &&
                "bg-gradient-to-r from-cyan-500 to-blue-500"
              }`}
              onClick={handleToggleInput}
            >
              <label htmlFor="newCustomer">Khách Hàng Theo Số Tiền</label>
            </div>
          </div>

          {isChecked.total_of_amount && (
            <div className="flex mb-2">
              <input
                type="number"
                value={valueByTotalAmount}
                onChange={(e) => setValueByTotalAmount(e.target.value)}
                placeholder="Nhập số tiền"
                className="p-2 border ml-5 rounded-md  outline-none"
              />
              <button
                onClick={handleSetTotalAmount}
                className="bg-slate-600 text-white p-2 rounded-md ml-2"
              >
                Nhập
              </button>
            </div>
          )}

          {/* Số lượng Booking */}
          <div>
            <div className="flex items-center">
              <input
                type="radio"
                name="option_voucher"
                id="agreeCheckbox"
                checked={isChecked.quantity_of_booking}
                onChange={() => handleCheckboxChange("quantity_of_booking")}
                className="mr-2 mb-3 border rounded-md"
              />
              <label
                htmlFor="newCustomer"
                className={`flex items-center bg-gray-500 text-white p-4 rounded-md mb-5 w-96 h-10 ${
                  isChecked.quantity_of_booking &&
                  `bg-gradient-to-r from-cyan-500 to-blue-500`
                }`}
                onClick={handleLabelClick}
              >
                Khách Hàng Theo Số Lượng Booking
              </label>
            </div>
            {isChecked.quantity_of_booking && (
              <div className="flex mt-4">
                <label className="flex-1 text-sm font-semibold mr-2 ml-5 ">
                  Số Lượng Booking:
                  <input
                    type="number"
                    id="newCustomer"
                    value={bookingCount}
                    onChange={handleInputChange}
                    className="block w-full p-2 border rounded-md focus:outline-none ml-1"
                  />
                </label>
                <button
                  onClick={handleSubmit}
                  className="bg-gray-500  text-white px-4 py-2 rounded-md focus:outline-none  h-10 mt-5 mb-5 mr-2"
                >
                  Nhập
                </button>
              </div>
            )}
          </div>

          {/* Theo khách sạn */}
          <div className="flex items-center">
            {/* Checkbox */}
            <input
              type="radio"
              name="option_voucher"
              id="agreeCheckbox"
              checked={isChecked.area}
              onChange={() => handleCheckboxChange("area")}
              className="mr-2 mb-3"
            />

            {/* Div chứa nhãn và select */}
            <div
              className={`flex mt-2 items-center bg-gray-500 text-white p-4 rounded-md mb-5 w-96 h-10 relative ${
                isChecked.area && `bg-gradient-to-r from-cyan-500 to-blue-500`
              }`}
            >
              <label htmlFor="newCustomer">Theo Khu Vực</label>

              {isChecked.area && (
                <select
                  className={` border mt-5 border-black text-black p-2 rounded-md absolute top-full left-0 block bg-gray-200`}
                  value={valueArea}
                  onChange={(e) => handleChangeArea(e as any)}
                >
                  {/* Options go here */}
                  <option value="Đà Nẵng">Đà Nẵng</option>
                  <option value="Hà Nội">Hà Nội</option>
                  <option value="Hồ Chí Minh">Hồ Chí Minh</option>
                  <option value="Quang Ninh">Quảng Ninh</option>
                  <option value="Lâm Đồng">Lâm Đồng</option>
                </select>
              )}
            </div>
          </div>

          <Button
            className="bg-blue-700 mb-5 hover:bg-blue-950 text-white font-bold ml-72 py-2 px-4 rounded h-10"
            onClick={handleGenerateVouchers}
          >
            Phát Voucher
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default PhatVoucher;
