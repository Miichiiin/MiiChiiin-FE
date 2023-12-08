import {
  useGetBokingUserQuery,
  useGetBookingDetailUserQuery,
} from "@/api/bookingUser";
import { useEffect, useState } from "react";
import { AiOutlineCalendar, AiOutlineInsertRowLeft, AiOutlineShoppingCart } from "react-icons/ai";
import { Link } from "react-router-dom";
import Modal from "react-modal";
import dayjs from "dayjs";
import { useGetStatusBookingsMutation } from "@/api/bookingUser";
import { FaTimesCircle } from "react-icons/fa";
import "react-toastify/dist/ReactToastify.css";
import { BsCalculatorFill, BsPeople } from "react-icons/bs";
const MyOrder = () => {
  const [user, setUser] = useState({
    id: "",
    email: "",
    phone: "",
    date: "",
    gender: "",
    cccd: "",
    nationality: "",
    address: "",
  });
  const [idBoking, setIdBooking] = useState<any>("");
  const { data: booking } = useGetBokingUserQuery(user?.id);
  const [isSearch, setIsSearch] = useState({
    time: "",
    status: "0",
  });

  let { data: bookingDetail } = useGetBookingDetailUserQuery({
    id_user: user?.id,
    id_booking: idBoking, // Assuming this is the correct variable name
  });


  const searchFunction: any = (listBooking: any) => {
    if (listBooking && Array.isArray(listBooking) && (isSearch.time || isSearch.status)) {
      console.log(isSearch);
  
      let filteredBookingDetail = [...listBooking]; 
  
      if (isSearch.status) {
        filteredBookingDetail = filteredBookingDetail.filter(
          (item: any) => item.status == isSearch.status
        );
      }
  
      return filteredBookingDetail;
    }
  
    // Trả về một giá trị mặc định hoặc xử lý khác nếu listBooking không hợp lệ.
    return [];
  };
  

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleBookingDetail = (id_booking: any) => {
    setIdBooking(id_booking);
  };

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleOpenModal = () => {
    setModalIsOpen(true);
  };

  const handleCloseModal = () => {
    setModalIsOpen(false);
  };

  const filterByItem = async (time: string, status: string) => {
    if (time) {
      setIsSearch({
        ...isSearch,
        time: time,
      });
    }
    if (status) {
      setIsSearch({
        ...isSearch,
        status: status,
      });
    }
  };

  // Trạng thái
  const getStatusText = (status: any) => {
    switch (status) {
      case 0:
        return { text: "Đang Chờ", colorClass: "text-yellow-500" };
      case 1:
        return { text: "Đã Hủy", colorClass: "text-red-500" };
      case 2:
        return { text: "Đã check in", colorClass: "text-green-500" };
      case 3:
        return { text: "Đang thanh toán", colorClass: "text-blue-500" };
      case 4:
        return { text: "Đã hoàn thành", colorClass: "text-gray-500" };
      default:
        return {
          text: "Trạng thái không xác định",
          colorClass: "text-gray-500",
        };
    }
  };

  const [changeStatus] = useGetStatusBookingsMutation();

  const handleStatusChange = async (id:any) => {
    const confirmed = window.confirm("Bạn có muốn xóa không?");
  
    if (confirmed) {
      const status = booking.find((item:any) => item.id === id);
  
      if (status) {
        await changeStatus({
          status: status.status,
          id: status.id,
        });
      }
    }
  };

  return (
    <div className="container mx-auto py-8">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h2 className="font-bold text-[20px]">Đơn hàng của tôi</h2>
        <hr className="mt-5 text-gray-400" />

        <div>
          <div className="flex items-center mt-3 space-x-5 mb-10">
            <select
              onChange={(e) => filterByItem("", e.target?.value)}
              className="border py-1 px-3 rounded-md outline-none text-[#a5a3af]"
            >
              <option>
                Trạng thái đơn
              </option>
              <option value="0">Đang Chờ</option>
              <option value="1">Đã Hủy</option>
              <option value="2">Đã check in</option>
              <option value="3">Đang thanh toán</option>
              <option value="4">Đã hoàn thành</option>
            </select>
          </div>
          <div className="overflow-y-auto h-[360px]">
            {searchFunction(booking) ? (
              searchFunction(booking)?.map((item: any, index: number) => {
                const statusInfo = getStatusText(item?.status);
                return (
                  <div
                    key={index}
                    className="border flex px-3 py-3 space-x-4 rounded-md mt-2 h-[180px]"
                  >
                    <img
                      className=" rounded"
                      src="https://booking-static.vinpearl.com/room_types/216b0990ea2a44079494e7a994a24d61_Hinh-anh-VinHolidays-1-Phu-Quoc-Phong-Standard-Twin-3x2-so-2.png"
                      alt=""
                      width={240}
                      height={120}
                    />
                    <div className="leading-10">
                      <div className="grid grid-cols-2 font-medium space-x-10">
                        <h3 className="font-medium">
                          Tên khách sạn : {item?.hotel?.name}
                        </h3>
                        <h3>Tổng số phòng: {item?.total_room}</h3>
                      </div>
                      <div className="grid grid-cols-1 font-medium">
                        <span>
                          Giá tiền:{" "}
                          <span className="text-red-500">
                            {item?.total_amount.toLocaleString("vi-VN")} đ
                          </span>
                        </span>
                      </div>
                      <div className="grid grid-cols-1 font-medium items-center">
                        <span className="flex items-center">
                          <span>
                            Trạng thái:{" "}
                            <span className={statusInfo.colorClass}>
                              {statusInfo.text}
                            </span>
                          </span>

                          <button
                            className="text-red-300 ml-2 flex items-center hover:text-red-500 hover:no-underline"
                            onClick={() => handleStatusChange(item?.id)}
                          >
                            <FaTimesCircle className="mr-1" /> Hủy Phòng{" "}
                          </button>
                        </span>
                      </div>

                      <div className=" space-x-8 font-medium">
                        <span>
                          Đặt ngày:{" "}
                          <span>
                            {new Date(item?.check_in).toLocaleDateString(
                              "vi-VN"
                            )}{" "}
                            -{" "}
                            {new Date(item?.check_out).toLocaleDateString(
                              "vi-VN"
                            )}
                          </span>
                        </span>
                        <button
                          className="text-blue-500 text-sm hover:underline"
                          onClick={() => {
                            handleBookingDetail(item.id);
                            handleOpenModal();
                          }}
                        >
                          Xem chi tiết
                        </button>

                        <Modal
                            isOpen={modalIsOpen}
                            onRequestClose={handleCloseModal}
                            contentLabel="Chi tiết"
                            style={{
                              overlay: {
                                backgroundColor: "rgba(0, 0, 0, 0.1)",
                              },
                              content: {
                                width: "1100px",
                                maxHeight: "auto",
                                overflowY: "auto",
                                margin: "auto",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                alignItems: "center",
                              },
                            }}
                          >
                            <div className="w-[100%] mx-auto">
                              <section className="grid grid-cols-2 h-[350px]">
                                <div key={bookingDetail?.id} className="border">
                                  <h1 className="font-semibold text-lg mb-2 bg-gray-400 py-2 px-3">
                                    Thông tin khách hàng
                                  </h1>
                                  <div className="flex flex-col rounded-lg px-2 mb-4 py-3 leading-[35px] ">
                                    <div className="grid grid-cols- gap-6">
                                      <p className="text-base ">
                                        <span className="text-gray-500 font-medium">Tên khách hàng:{" "}</span>
                                        <span className="text-[15px] ">
                                          {bookingDetail?.name}
                                        </span>
                                      </p>
                                      <p className="text-base">
                                        <span className="text-gray-500 font-medium">Căn cước công dân:{" "}</span>
                                        <span className="text-[15px]">
                                          {bookingDetail?.cccd}
                                        </span>
                                      </p>
                                      <p className="text-base">
                                        <span className="text-gray-500 font-medium"> Số điện thoại:{" "}</span>
                                        <span className="text-[15px]">
                                          {bookingDetail?.phone}
                                        </span>
                                      </p>
                                      <p className="text-base">
                                        <span className="text-gray-500 font-medium">Email:{" "}</span>
                                        <span className="text-[15px]">
                                          {bookingDetail?.email}
                                        </span>
                                      </p>
                                      <p className="text-base">
                                        <span className="text-gray-500 font-medium">Quốc tịch:{" "}</span>
                                        <span className="text-[15px]">
                                          {bookingDetail?.nationality}
                                        </span>
                                      </p>
                                    </div>
                                  </div>
                                </div>
                                <div className="border">
                                  <h2 className="font-medium text-lg mb-2 bg-gray-400 py-2 px-3">Thông tin đặt phòng</h2>
                                  <div className="px-2">
                                      <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center">
                                          <AiOutlineCalendar className="text-xl text-gray-500"/>
                                          <span className="flex items-center ml-2">
                                            <p className="">
                                            {" "}
                                              <span className="text-base ">
                                                {dayjs(bookingDetail?.check_in).format(
                                                  "YYYY-MM-DD "
                                                )}
                                              </span>
                                            </p>
                                            <span className="px-2">-</span>
                                            <p className="">
                                              {" "}
                                              <span className="text-base ">
                                                {dayjs(bookingDetail?.check_out).format(
                                                  "YYYY-MM-DD"
                                                )}
                                              </span>
                                            </p>
                                          
                                          </span>
                                        </div>
                                      </div>
                                     <div className="flex items-center gap-10 mb-4">
                                      <p className=" mr-4 flex items-center">
                                          <BsCalculatorFill className="text-gray-500 mr-2"/>{" "}
                                          <span className="text-base ">
                                            {bookingDetail?.total_amount?.toLocaleString("vi-VN")}đ
                                          </span>
                                        </p>
                                      <p className=" flex items-center">
                                          <BsPeople className="mr-2 text-lg text-gray-500"/>{" "}
                                              <span className="text-base ">
                                                {bookingDetail?.people_quantity} người
                                              </span>
                                            </p>
                                        <p className=" mr-4 text-left flex items-center">
                                         <AiOutlineInsertRowLeft className="mr-2 text-lg text-gray-500"/>{" "}
                                          <span className="text-base ">
                                            {bookingDetail?.total_room} phòng
                                          </span>
                                        </p>
                                     </div>
                                  </div>
                               
                                    <h2 className="text-base font-medium mb-2 ml-4">
                                      Danh sách phòng và dịch vụ đã đặt
                                    </h2>
                                  <div className="overflow-y-auto h-[190px]">
                                    <ul className="">
                                      {bookingDetail?.rooms?.map((item: any, index: any) => {
                                        return (
                                          <li key={index} className="ml-3 ">
                                            <div className=" flex justify-between px-2 ">
                                              <div className="">
                                                {item && (
                                                  <>
                                                    <div className="border grid grid-cols-4 px-3 py-3 space-x-2 rounded-md mt-2">
                                                      <img
                                                        src={item?.category_image}
                                                        alt=""
                                                        className="col-span-1 w-[90%] h-[80px] object-cover"
                                                      />
                                                      <span className=" text-md col-span-3">
                                                       <span className="text-gray-500 font-medium"> Phòng:{" "}</span>
                                                        <span className="text-sm">
                                                          {item?.name} -{" "}
                                                          {item?.category_name}
                                                        </span>
                                                        <span>
                                                      <div className="flex space-x-2">
                                                      <h4 className="text-gray-500 font-medium text-sm"> Dịch vụ:{" "}</h4>
                                                          <ul className="text-sm">
                                                            {item?.services.map(
                                                              (
                                                                service: any,
                                                                index: any
                                                              ) => {
                                                                return (
                                                                  <>
                                                                    <li key={index}>{service.name}</li>
                                                                  </>
                                                                );
                                                              }
                                                            )}
                                                          </ul>
                                                      </div>
                                                        </span>
                                                      </span>
                                                    </div>
                                                  </>
                                                )}
                                              </div>
                                            </div>
                                          </li>
                                        );
                                      })}
                                    </ul>
                                 </div>
                                </div>
                              </section>
                            </div>
                            <button
                              className="text-white bg-blue-500 px-3 py-1 rounded mt-3"
                              onClick={handleCloseModal}
                            >
                              Đóng
                            </button>
                          </Modal>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-center leading-[80px]">
                <div className="ml-[420px]">
                  <span className="text-[30px] ">
                    <AiOutlineShoppingCart />
                  </span>
                </div>
                <p className="text-[20px]">
                  Hiện tại chưa có sản phẩm nào trong giỏ hàng!
                </p>
                <Link
                  className="rounded-2xl bg-blue-500 transform transition-transfrom hover:scale-105 duration-300 text-white px-5 py-2 font-medium"
                  to="/homepage"
                >
                  Đặt hàng ngay
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyOrder;
