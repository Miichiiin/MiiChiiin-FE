import { Button } from "antd";
import { AiOutlineHome } from "react-icons/ai";
import { BsCartCheck } from "react-icons/bs";
import { Link } from "react-router-dom";

const BookingSuccess = () => {
  const order = {
    customerName: "Tên khách hàng",
    email: "example@example.com",
    phone: "0123456789",
    checkInDate: "2023-10-25",
    checkOutDate: "2023-10-28",
    guests: 2,
    rooms: [
      {
        roomName: "Tên phòng 1",
        services: [{ serviceName: "Dịch vụ 1" }, { serviceName: "Dịch vụ 2" }],
      },
      {
        roomName: "Tên phòng 2",
        services: [{ serviceName: "Dịch vụ 3" }, { serviceName: "Dịch vụ 4" }],
      },
    ],
  };

  const hotelName = "Tên khách sạn";
  const logoUrl =
    "https://media.istockphoto.com/id/1364917563/vi/anh/doanh-nh%C3%A2n-m%E1%BB%89m-c%C6%B0%E1%BB%9Di-v%E1%BB%9Bi-c%C3%A1nh-tay-khoanh-l%E1%BA%A1i-tr%C3%AAn-n%E1%BB%81n-tr%E1%BA%AFng.jpg?s=1024x1024&w=is&k=20&c=ldkLDyGrvDusqqr3qW_LjXbxIwBlYXV18tOZF5fi-Bs=";

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="max-w-3xl mx-auto py-5 bg-white p-6 shadow-md rounded-md">
        <div className=" flex justify-center text-center bg-white">
          <img
            src="https://hieumobile.com/wp-content/uploads/tich-xanh.png"
            alt=""
            width={50}
            height={50}
            style={{ display: "block" }}
          />
        </div>
        <h2 className="text-center text-xl font-semibold mb-5">
          Đặt phòng thành công 
        </h2>
        <h2 className=" mb-4 text-center">
          Chúng tôi xin gửi lời cảm ơn chân thành đến quý khách vì đã lựa chọn
          đặt phòng khách sạn của chúng tôi. Chúng tôi rất trân trọng sự tin
          tưởng và ủng hộ của quý khách.
        </h2>
        <h3 className=" font-semibold mb-4 text-center">Thông tin đơn hàng:</h3>
        <div className="grid grid-cols-2 pl-10">
          <div className="">
            <h1 className=" font-semibold mb-2">Danh sách phòng và dịch vụ</h1>
            <p className="mb-2">
              <span className="">Tên khách hàng:</span>{" "}
              <span className="text-orange-400">{order.customerName}</span>
            </p>
            <p className="mb-2">
              <span className="">Email:</span>{" "}
              <span className="text-orange-400">{order.email}</span>
            </p>
            <p className="mb-2">
              <span className="">Số điện thoại:</span>{" "}
              <span className="text-orange-400">{order.phone}</span>
            </p>
            <p className="mb-2">
              <span className="">Ngày nhận phòng:</span>{" "}
              <span className="text-orange-400">{order.checkInDate}</span>
            </p>
            <p className="mb-2">
              <span className="">Ngày trả phòng:</span>{" "}
              <span className="text-orange-400">{order.checkOutDate}</span>
            </p>
            <p className="mb-2">
              <span className="">Số người:</span>{" "}
              <span className="text-orange-400">{order.guests}</span>
            </p>
            {/* Thêm thông tin khác của đơn hàng nếu cần */}
          </div>
          <div>
            <h1 className=" font-semibold mb-2">Danh sách phòng và dịch vụ</h1>
            <ul>
              {order.rooms.map((room, index) => (
                <li key={index} className="mb-2">
                  <p className="font-semibold text-blue-800">{room.roomName}</p>
                  <ul className="list-disc ml-6">
                    {room.services.map((service, index) => (
                      <li key={index}>{service.serviceName}</li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="flex space-x-8 justify-center mt-5">
            <Button className="flex space-x-2 items-center bg-orange-400 text-white"><AiOutlineHome/><Link to={"/homepage"}>Quay lại trang chủ</Link></Button>
            <Button className="flex space-x-2 items-center bg-blue-500 text-white"><BsCartCheck/><Link to={"/profileUser/myorder"}>Lịch sử đặt hàng</Link></Button>
        </div>
      </div>
    </div>
  );
};

export default BookingSuccess;
