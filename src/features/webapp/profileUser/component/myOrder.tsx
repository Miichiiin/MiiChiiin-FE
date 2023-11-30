import { useGetBokingUserQuery, useGetBookingDetailUserQuery } from "@/api/bookingUser";
import { CSSProperties, useEffect, useState } from "react";
import { AiOutlineSearch, AiOutlineShoppingCart } from "react-icons/ai";
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
      // if (booking && booking.length > 0) {
      //     setLoading(false);
      // }else {
      //   setLoading(false);
      // }
      setLoading(false)
      },1000)
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
                              <section className="grid grid-cols-2 gap-8">
                                <div key={bookingDetail?.id} className="">
                                  <h1 className="font-semibold text-lg mb-2">
                                    Thông tin Đặt phòng
                                  </h1>
                                  <div className="flex flex-col border rounded-lg px-2 mb-4 py-3 leading-[25px] ">
                                    <div className="grid grid-cols-2 gap-4">
                                      <p className="font-semibold">
                                        Tên khách hàng:{" "}
                                        <span className="text-lg font-medium text-blue-900">
                                          {bookingDetail?.name}
                                        </span>
                                      </p>
                                      <p className="font-semibold">
                                        Căn cước công dân:{" "}
                                        <span className="text-lg font-medium text-blue-900">
                                          {bookingDetail?.cccd}
                                        </span>
                                      </p>
                                      <p className="font-semibold">
                                        Số điện thoại:{" "}
                                        <span className="text-lg font-medium text-blue-900">
                                          {bookingDetail?.phone}
                                        </span>
                                      </p>
                                      <p className="font-semibold">
                                        Email:{" "}
                                        <span className="text-lg font-medium text-blue-900">
                                          {bookingDetail?.email}
                                        </span>
                                      </p>
                                      <p className="font-semibold">
                                        Check in:{" "}
                                        <span className="text-lg font-medium text-blue-900">
                                          {dayjs(bookingDetail?.check_in).format(
                                            "YYYY-MM-DD "
                                          )}
                                        </span>
                                      </p>
                                      <p className="font-semibold">
                                        Check out:{" "}
                                        <span className="text-lg font-medium text-blue-900">
                                          {dayjs(bookingDetail?.check_out).format(
                                            "YYYY-MM-DD"
                                          )}
                                        </span>
                                      </p>
                                      <p className="font-semibold">
                                        Quốc tịch:{" "}
                                        <span className="text-lg font-medium text-blue-900">
                                          {bookingDetail?.nationality}
                                        </span>
                                      </p>
                                      <p className="font-semibold">
                                        Tổng số người:{" "}
                                        <span className="text-lg font-medium text-blue-900">
                                          {bookingDetail?.people_quantity}
                                        </span>
                                      </p>
                                      <p className="font-semibold">
                                        Số phòng:{" "}
                                        <span className="text-lg font-medium text-blue-900">
                                          {bookingDetail?.total_room}
                                        </span>
                                      </p>
                                      {/* <p className="font-semibold">
                                        Số đêm:{" "}
                                        {differenceInDays(
                                          parseISO(
                                            item.check_out.toISOString().slice(0, 10)
                                          ),
                                          parseISO(
                                            item.check_in.toISOString().slice(0, 10)
                                          )
                                        )}{" "}
                                      </p> */}
                                      <p className="font-semibold">
                                        Tổng tiền:{" "}
                                        <span className="text-lg font-medium text-blue-900">
                                          {bookingDetail?.total_amount}
                                        </span>
                                      </p>
                                    </div>
                                  </div>
                                </div>
                                <div className="">
                                  <h1 className="text-lg font-semibold mb-2 ml-4">
                                    Danh sách phòng và dịch vụ đã đặt
                                  </h1>
                                  <ul>
                                    {bookingDetail?.rooms?.map((item: any, index: any) => {
                                      return (
                                        <li key={index} className="ml-3 my-2">
                                          <div className="border flex justify-between px-2 py-3">
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
