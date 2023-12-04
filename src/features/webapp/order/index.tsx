import { useGetBookingDetailUserQuery } from "@/api/bookingUser";
import { AiOutlineHome } from "react-icons/ai";
import { BsCartCheck } from "react-icons/bs";
import { Link, useParams } from "react-router-dom";
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import 'dayjs/locale/vi';
dayjs.extend(utc);
dayjs.extend(timezone);
const BookingSuccess = () => {
  const { id, status } = useParams<{ id: string; status: string }>();

  const userPromise = localStorage.getItem("user");
  const user = userPromise && JSON.parse(userPromise).id;
  const { data: order } = useGetBookingDetailUserQuery(
    { id_user: user, id_booking: id }
  );

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
          {status === 'success' ? 'Đặt phòng thành công' : 'Đặt phòng thất bại'}
        </h2>
        <h2 className="mb-4 text-center">
          Chúng tôi xin gửi lời cảm ơn chân thành đến quý khách vì đã lựa
          chọn đặt phòng khách sạn của chúng tôi. Chúng tôi rất trân trọng
          sự tin tưởng và ủng hộ của quý khách.
        </h2>
        <h3 className=" font-semibold mb-4 text-center text-lg">
          Thông tin đơn hàng:
        </h3>
        <div className="grid grid-cols-2 pl-10">
          <div className="">
            <h1 className=" font-semibold mb-2 text-xl">
              Danh sách phòng và dịch vụ
            </h1>
            <p className="mb-2">
              <span className="">Tên khách hàng:</span>{" "}
              <span className=" text-blue-800 font-semibold text-lg">
                {order && order?.name}
              </span>
            </p>
            <p className="mb-2">
              <span className="">Email:</span>{" "}
              <span className=" text-blue-800 font-semibold text-lg">
                {order && order?.email}
              </span>
            </p>
            <p className="mb-2">
              <span className="">Số điện thoại:</span>{" "}
              <span className=" text-blue-800 font-semibold text-lg">
                {order && order?.phone}
              </span>
            </p>
            <p className="mb-2">
              <span className="">Ngày nhận phòng:</span>{" "}
              <span className=" text-blue-800 font-semibold text-lg">
                {order && dayjs(order?.check_in).format('DD-MM-YYYY')}
              </span>
            </p>
            <p className="mb-2">
              <span className="">Ngày trả phòng:</span>{" "}
              <span className=" text-blue-800 font-semibold text-lg">
                {" "}
                {order && dayjs(order?.check_out).format('DD-MM-YYYY')}
              </span>
            </p>
            <p className="mb-2">
              <span className="">Số người:</span>{" "}
              <span className=" text-blue-800 font-semibold text-lg">
                {order && order?.people_quantity}
              </span>
            </p>
            <p className="mb-2">
              <span className="">CCCD: </span>{" "}
              <span className=" text-blue-800 font-semibold text-lg">
                {order && order?.cccd}
              </span>
            </p>
            <p className="mb-2">
              <span className="">Quốc tịch: </span>{" "}
              <span className=" text-blue-800 font-semibold text-lg">
                {order && order?.nationality}
              </span>
            </p>
            <p className="mb-2">
              <span className="">Tổng số tiền:</span>{" "}
              <span className="text-blue-800 font-semibold text-lg">
                {order && order?.total_amount?.toLocaleString("vi-VN")}đ
              </span>
            </p>
            {/* Thêm thông tin khác của đơn hàng nếu cần */}
          </div>
          <div>
            <h1 className=" text-xl font-semibold mb-2">
              Danh sách phòng và dịch vụ
            </h1>
            <ul>
              {order?.rooms?.map((room: any, index: any) => (
                <li key={index} className="mb-2">
                  <p className="font-semibold text-blue-800">
                    Phòng: {room?.name}
                  </p>
                  <ul className="list-disc ml-6">
                    {room?.services?.map((service: any, index: any) => (
                      <li key={index}>{service?.name}</li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="flex space-x-8 justify-center mt-5 ">
          <button className="flex space-x-2 items-center text-white text-base bg-[#e8952f] px-3 py-1 rounded-md hover:scale-105 duration-300 hover:shadow-xl">
            <AiOutlineHome />
            <Link to={"/homepage"}>Quay lại trang chủ</Link>
          </button>
          {user ? (
            <button className="flex space-x-2 items-center text-white text-base bg-blue-500 px-3 py-1 rounded-md hover:scale-105 duration-300 hover:shadow-xl">
              <BsCartCheck />
              <Link to={"/profileUser/myorder"}>Lịch sử đặt hàng</Link>
            </button>
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </div>

  );
};

export default BookingSuccess;
