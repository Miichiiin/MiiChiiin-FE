import { useGetorderBookingsQuery } from "@/api/bookingUser";
import { AiFillCalendar, AiOutlineHome, AiOutlineLine, AiOutlineTeam } from "react-icons/ai";
import { BsCalculator, BsCartCheck } from "react-icons/bs";
import { Link, useParams } from "react-router-dom";
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import 'dayjs/locale/vi';
dayjs.extend(utc);
dayjs.extend(timezone);
const BookingSuccess = () => {
  const { slug, status } = useParams<{ slug: string; status: string }>();

  const userPromise = localStorage.getItem("user");
  const user = userPromise && JSON.parse(userPromise).id;

  const { data: order } = useGetorderBookingsQuery(slug)

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="max-w-3xl mx-auto py-5 bg-white p-6 shadow-md rounded-md">
        <div className=" flex justify-center text-center bg-white">
          {status === 'success' ? <img
            src="https://hieumobile.com/wp-content/uploads/tich-xanh.png"
            alt=""
            width={50}
            height={50}
            style={{ display: "block" }}
          /> : <img
            src="https://media.istockphoto.com/id/1188413565/vi/vec-to/bi%E1%BB%83u-t%C6%B0%E1%BB%A3ng-d%E1%BA%A5u-x-tr%C3%B2n-m%C3%A0u-%C4%91%E1%BB%8F-n%C3%BAt-bi%E1%BB%83u-t%C6%B0%E1%BB%A3ng-ch%C3%A9o-tr%C3%AAn-n%E1%BB%81n-tr%E1%BA%AFng.jpg?s=612x612&w=0&k=20&c=KaiB7huyv3jfZGSm67ue-niDsbslPwPTyFlrhvMH3r8="
            alt=""
            width={50}
            height={50}
            style={{ display: "block" }} />
          }
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
          <div className="leading-8">
            <h1 className=" font-semibold mb-2 text-xl">
              Danh sách phòng và dịch vụ
            </h1>
            <p className="mb-2">
              <span className="font-medium text-gray-600 text-[17px]">Tên khách hàng:</span>{" "}
              <span className=" ">
                {order && order?.name}
              </span>
            </p>
            <p className="mb-2">
              <span className="font-medium text-gray-600 text-[17px]">Email:</span>{" "}
              <span className=" ">
                {order && order?.email}
              </span>
            </p>
            <p className="mb-2">
              <span className="font-medium text-gray-600 text-[17px]">Số điện thoại:</span>{" "}
              <span className=" ">
                {order && order?.phone}
              </span>
            </p>
           
            <p className="mb-2">
              <span className="font-medium text-gray-600 text-[17px]">CCCD: </span>{" "}
              <span className=" ">
                {order && order?.cccd}
              </span>
            </p>
            <p className="mb-2">
              <span className="font-medium text-gray-600 text-[17px]">Quốc tịch: </span>{" "}
              <span className=" ">
                {order && order?.nationality}
              </span>
            </p>
            <p className="mb-2">
              <span className="font-medium text-gray-600 text-[17px]">Trạng thái:</span>{" "}
              <span className="text-blue-500 font-medium">
                {order && order?.status === 2 ? 'Đã check in' : order?.status === 3 ? 'Đã thanh toán' : order?.status === 4 ? 'Đã check out' : order?.status === 1 ? 'Đã huỷ' : order?.status === 0 ? 'Đang chờ' : ''}
              </span>
            </p>
            {/* Thêm thông tin khác của đơn hàng nếu cần */}
          </div>
          <div>
            <h1 className=" text-xl font-semibold mb-2">
              Danh sách phòng và dịch vụ
            </h1>
            <div className="flex items-center">
              <AiFillCalendar className="mb-2 text-lg text-gray-500 mr-2"/>
              <p className="mb-2">
                <span className=""></span>{" "}
                <span className=" ">
                  {order && dayjs(order?.check_in).format('DD-MM-YYYY')}
                </span>
              </p>
              <span className="mb-2 mx-2"> - </span>
              <p className="mb-2">
                <span className=""></span>{" "}
                <span className=" ">
                  {" "}
                  {order && dayjs(order?.check_out).format('DD-MM-YYYY')}
                </span>
              </p>
            </div>
            <div className="flex items-center space-x-10">
              <p className="mb-2 flex items-center">
                <span className="font-medium text-gray-600 text-[17px]"><BsCalculator className="text-gray-500 mr-2" /></span>{" "}
                <span className="">
                  {order && order?.total_amount?.toLocaleString("vi-VN")}đ
                </span>
              </p>
              <p className="mb-2 flex items-center">
                <span className=""><AiOutlineTeam className="text-lg mr-2 text-gray-500"/></span>{" "}
                <span className=" ">
                  {order && order?.people_quantity} người
                </span>
              </p>
            </div>
            <ul>
              {order?.room?.map((room: any, index: any) => (
                <li key={index} className="mb-2">
                  <p className="font-medium">
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
