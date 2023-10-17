import { useGetBokingUserQuery } from "@/api/bookingUser";
import { useEffect, useState } from "react";
import { AiOutlineSearch, AiOutlineShoppingCart } from "react-icons/ai";
import { Link } from "react-router-dom";
import Modal from "react-modal";
import dayjs from "dayjs";
const MyOrder = () => {
  const [isProductInCart, setIsProductInCart] = useState();
  console.log("isProductInCart", isProductInCart);

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

  const { data: booking } = useGetBokingUserQuery(user?.id);

  console.log("booking2333", booking);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    console.log("storedUser", storedUser);
  }, []);

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleOpenModal = () => {
    setModalIsOpen(true);
  };

  const handleCloseModal = () => {
    setModalIsOpen(false);
  };

  return (
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
          <div>
            {booking ? (
              booking.map((item: any, index: number) => {
                return (
                  <div
                    key={index}
                    className="border flex px-3 py-3 space-x-4 rounded-md mt-2"
                  >
                    <img
                      className="w-[240px] h-[140px] rounded"
                      src="https://booking-static.vinpearl.com/room_types/216b0990ea2a44079494e7a994a24d61_Hinh-anh-VinHolidays-1-Phu-Quoc-Phong-Standard-Twin-3x2-so-2.png"
                      alt=""
                    />
                    <div className="leading-10">
                      <div className="grid grid-cols-2 font-medium space-x-10">
                        <h3 className="font-medium">
                          Tên khách sạn: {item?.hotel?.name}
                        </h3>
                        <h3>Tổng số phòng: {item?.total_room}</h3>
                      </div>
                      <div className="grid grid-cols-1 font-medium">
                        <span>
                          Giá tiền:{" "}
                          <span className="text-red-500">
                            {item?.total_amount}
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
                          className="text-red-300"
                          onClick={handleOpenModal}
                        >
                          Xem chi tiết
                        </button>

                        <Modal
                          isOpen={modalIsOpen}
                          onRequestClose={handleCloseModal}
                          contentLabel="Chi tiết"
                          style={{
                            overlay: {
                              backgroundColor: "rgba(0, 0, 0, 0.5)",
                            },
                            content: {
                              width: "1100px",
                              height: "450px",
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
                              <div key={item?.id} className="">
                                <h1 className="font-semibold text-lg mb-2">
                                  Thông tin Đặt phòng
                                </h1>
                                <div className="flex flex-col border rounded-lg px-2 mb-4 py-3 leading-[25px] ">
                                  <div className="grid grid-cols-2 gap-4">
                                    <p className="font-semibold">
                                      Tên khách hàng:{" "}
                                      <span className="text-lg font-medium text-blue-900">
                                        {item?.name}
                                      </span>
                                    </p>
                                    <p className="font-semibold">
                                      Căn cước công dân:{" "}
                                      <span className="text-lg font-medium text-blue-900">
                                        {item?.cccd}
                                      </span>
                                    </p>
                                    <p className="font-semibold">
                                      Số điện thoại:{" "}
                                      <span className="text-lg font-medium text-blue-900">
                                        {item?.phone}
                                      </span>
                                    </p>
                                    <p className="font-semibold">
                                      Email:{" "}
                                      <span className="text-lg font-medium text-blue-900">
                                        {item?.email}
                                      </span>
                                    </p>
                                    <p className="font-semibold">
                                      Check in:{" "}
                                      <span className="text-lg font-medium text-blue-900">
                                        {dayjs(item?.check_in).format(
                                          "YYYY-MM-DD "
                                        )}
                                      </span>
                                    </p>
                                    <p className="font-semibold">
                                      Check out:{" "}
                                      <span className="text-lg font-medium text-blue-900">
                                        {dayjs(item?.check_out).format(
                                          "YYYY-MM-DD"
                                        )}
                                      </span>
                                    </p>
                                    <p className="font-semibold">
                                      Quốc tịch:{" "}
                                      <span className="text-lg font-medium text-blue-900">
                                        {item?.nationality}
                                      </span>
                                    </p>
                                    <p className="font-semibold">
                                      Tổng số người:{" "}
                                      <span className="text-lg font-medium text-blue-900">
                                        {item?.people_quantity}
                                      </span>
                                    </p>
                                    <p className="font-semibold">
                                      Số phòng:{" "}
                                      <span className="text-lg font-medium text-blue-900">
                                        {item?.total_rooms}
                                      </span>
                                    </p>
                                    <p className="font-semibold">
                                      Số đêm:{" "}
                                      {/* <span className="text-lg font-medium text-blue-900">
                                        {numberOfNights}
                                      </span> */}
                                    </p>
                                    <p className="font-semibold">
                                      Tổng tiền:{" "}
                                      <span className="text-lg font-medium text-blue-900">
                                        {item?.total_amount}
                                      </span>
                                    </p>
                                  </div>
                                </div>
                              </div>
                              <div className="">
                                <h1 className="text-lg font-semibold mb-2 ml-4">
                                  Danh sách phòng và dịch vụ đã đặt
                                </h1>
                                {/* <ul>
                                  {booking?.cart?.map(
                                    (item: any, index: any) => {
                                      const room = categories?.find(
                                        (category: any) =>
                                          category.id === item.id_cate
                                      );
                                      return (
                                        <li key={index} className="ml-3 my-2">
                                          <div className="border flex justify-between px-2 py-3">
                                            <div className="">
                                              {room && (
                                                <>
                                                  <span className="font-bold text-md">
                                                    Phòng:{" "}
                                                  </span>
                                                  <span className="text-blue-800 font-semibold">
                                                    {room.name}
                                                  </span>
                                                </>
                                              )}
                                            </div>
                                            <button
                                              onClick={() =>
                                                toggleServicesVisibility(index)
                                              }
                                              type="button"
                                            >
                                              {isServicesVisible[index] ? (
                                                <span className="flex items-center">
                                                  Ẩn dịch vụ <AiOutlineUp />
                                                </span>
                                              ) : (
                                                <span className="flex items-center">
                                                  Hiện dịch vụ <AiOutlineDown />
                                                </span>
                                              )}
                                            </button>
                                          </div>
                                          {isServicesVisible[index] && (
                                            <ul className="border-b border-x">
                                              {item.services.map(
                                                (
                                                  serviceId: any,
                                                  serviceIndex: any
                                                ) => (
                                                  <li
                                                    key={serviceIndex}
                                                    className="pt-1"
                                                  >
                                                    <span className="text-md  font-bold px-2">
                                                      Dịch vụ {serviceIndex + 1}
                                                      :{" "}
                                                    </span>{" "}
                                                    {getServiceName(serviceId)}
                                                  </li>
                                                )
                                              )}
                                            </ul>
                                          )}
                                        </li>
                                      );
                                    }
                                  )}
                                </ul> */}
                              </div>
                            </section>
                          </div>
                          <button className="text-red-500" onClick={handleCloseModal}>Đóng</button>
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
                  className="rounded-2xl bg-red-500 text-white px-5 py-2 font-medium"
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
