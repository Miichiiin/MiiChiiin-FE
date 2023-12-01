import { useGetBokingUserQuery, useGetBookingDetailUserQuery } from "@/api/bookingUser";
import { CSSProperties, useEffect, useState } from "react";
import { AiOutlineSearch, AiOutlineShoppingCart ,AiOutlineCalendar,AiOutlineInsertRowLeft} from "react-icons/ai";
import { BsCalculatorFill ,BsPeople} from "react-icons/bs";
import { Link } from "react-router-dom";
import Modal from "react-modal";
import dayjs from "dayjs";
import FadeLoader from "react-spinners/HashLoader";
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
  //loading trang
  const [loading,setLoading] = useState(false);
  useEffect(() =>{
      setLoading(true)
      setTimeout(() =>{
        if (booking && booking.length > 0) {
            setLoading(false);
        }
      })
  },[booking]);  
  const override: CSSProperties = {
      display: "flex",
      position:"fixed",
      top: "60%",
      left: "59%",
      transform: "translate(-50%, -50%)",
  };
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

  }, []);

  const handleBookingDetail = (id_booking:any) => {
    setIdBooking(id_booking)
  }
  
  const { data: bookingDetail } = useGetBookingDetailUserQuery({id_user: user?.id, id_booking: idBoking});
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleOpenModal = () => {
    setModalIsOpen(true);
  };

  const handleCloseModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div>
    
      <div className="container mx-auto py-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="font-bold text-[20px]">Đơn hàng của tôi</h2>
          <hr className="mt-5 text-gray-400" />

          <div>
            <div className="flex items-center mt-3 space-x-5 mb-10">
              <div className="relative">
                <span className="absolute top-3 start-1 text-[#a5a3af]">
                  <AiOutlineSearch />
                </span>
                <input
                  className="border rounded-md py-2 text-[13px] pl-6"
                  type="text"
                  placeholder="Nhập đơn hàng..."
                />
              </div>
              <select className="border py-1 px-3 rounded-md outline-none text-[#a5a3af]">
                <option selected>Thời gian đặt</option>
                <option>1 tuần trước</option>
                <option>1 tháng trước</option>
              </select>
              <select className="border py-1 px-3 rounded-md outline-none text-[#a5a3af]">
                <option selected>Trạng thái đơn</option>
                <option>1 tuần trước</option>
                <option>1 tháng trước</option>
              </select>
            </div>
           
            <div className="h-[350px] overflow-y-auto">
              {
                loading ?
                <div className="relative">
                  <FadeLoader 
                  color="#d7ba37"
                  loading={loading}
                  cssOverride={override}
                  // size={40}
                  // aria-label="Loading Spinner"
                  // data-testid="loader"
                  className="animate-pulse absolute z-10"
                  />
              </div>
              :
             <div>
               {booking ? (
                booking?.map((item: any, index: number) => {
                  return (
                    <div
                      key={index}
                      className="border flex px-3 py-3 space-x-4 rounded-md mt-2 "
                    >
                      <img
                        className=" rounded object-cover h-[140px]"
                        src="https://booking-static.vinpearl.com/room_types/216b0990ea2a44079494e7a994a24d61_Hinh-anh-VinHolidays-1-Phu-Quoc-Phong-Standard-Twin-3x2-so-2.png"
                        alt=""
                        width={240}
                        height={140}
                      />
                      <div className="leading-10 ">
                        <div className="grid grid-cols-2 font-medium space-x-10">
                          <h3 className="font-medium ">
                            Tên khách sạn: <span className="">{item?.hotel?.name}</span>
                          </h3>
                          <h3>Tổng số phòng: {item?.total_room}</h3>
                        </div>
                        <div className="grid grid-cols-1 font-medium">
                          <span>
                            Giá tiền:{" "}
                            <span className="text-blue-500 font-medium">
                              {item?.total_amount.toLocaleString("vi-VN")} đ
                            </span>
                          </span>
                        </div>
                        <div className=" space-x-8 font-medium">
                          <span>
                            Đặt ngày:{" "}
                            <span>
                              {new Date(item?.check_in).toLocaleDateString()} -{" "}
                              {new Date(item?.check_out).toLocaleDateString()}
                            </span>
                          </span>
                          <button
                            className="text-blue-500 hover:underline"
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
                                width: "1000px",
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
                                  <div className="flex flex-col rounded-lg px-2 mb-4 py-3 leading-[25px] ">
                                    <div className="grid grid-cols- gap-4">
                                      <p className="font-semibold">
                                        Tên khách hàng:{" "}
                                        <span className="text-base font-medium text-blue-800">
                                          {bookingDetail?.name}
                                        </span>
                                      </p>
                                      <p className="font-semibold">
                                        Căn cước công dân:{" "}
                                        <span className="text-base font-medium text-blue-800">
                                          {bookingDetail?.cccd}
                                        </span>
                                      </p>
                                      <p className="font-semibold">
                                        Số điện thoại:{" "}
                                        <span className="text-base font-medium text-blue-800">
                                          {bookingDetail?.phone}
                                        </span>
                                      </p>
                                      <p className="font-semibold">
                                        Email:{" "}
                                        <span className="text-base font-medium text-blue-800">
                                          {bookingDetail?.email}
                                        </span>
                                      </p>
                                      <p className="font-semibold">
                                        Quốc tịch:{" "}
                                        <span className="text-base font-medium text-blue-800">
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
                                            <p className="font-semibold">
                                            {" "}
                                              <span className="text-base font-medium text-blue-800">
                                                {dayjs(bookingDetail?.check_in).format(
                                                  "YYYY-MM-DD "
                                                )}
                                              </span>
                                            </p>
                                            <span className="px-2">-</span>
                                            <p className="font-semibold">
                                              {" "}
                                              <span className="text-base font-medium text-blue-800">
                                                {dayjs(bookingDetail?.check_out).format(
                                                  "YYYY-MM-DD"
                                                )}
                                              </span>
                                            </p>
                                          
                                          </span>
                                        </div>
                                      </div>
                                     <div className="flex items-center gap-10 mb-4">
                                      <p className="font-semibold mr-4 flex items-center">
                                          <BsCalculatorFill className="text-gray-500 mr-2"/>{" "}
                                          <span className="text-base font-medium text-blue-800">
                                            {bookingDetail?.total_amount}đ
                                          </span>
                                        </p>
                                      <p className="font-semibold flex items-center">
                                          <BsPeople className="mr-2 text-lg text-gray-500"/>{" "}
                                              <span className="text-base font-medium text-blue-800">
                                                {bookingDetail?.people_quantity} người
                                              </span>
                                            </p>
                                        <p className="font-semibold mr-4 text-left flex items-center">
                                         <AiOutlineInsertRowLeft className="mr-2 text-lg text-gray-500"/>{" "}
                                          <span className="text-base font-medium text-blue-800">
                                            {bookingDetail?.total_room} phòng
                                          </span>
                                        </p>
                                     </div>
                                  </div>
                               
                                    <h2 className="text-lg font-medium mb-2 ml-4">
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
                                                        width={"80px"}
                                                        height={"80px"}
                                                        className="col-span-1"
                                                      />
                                                      <span className="font-bold text-md col-span-3">
                                                        Phòng:{" "}
                                                        <span className="text-blue-800 font-semibold">
                                                          {item?.name} -{" "}
                                                          {item?.category_name}
                                                        </span>
                                                        <span>
                                                      <div className="flex space-x-2">
                                                      <h4> Dịch vụ:{" "}</h4>
                                                          <ul className="">
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
                  <div className="text-center leading-[80px] ">
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
            }
            </div>
           
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default MyOrder;
