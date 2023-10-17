import { useGetBokingUserQuery } from "@/api/bookingUser";
import { useEffect, useState } from "react";
import { AiOutlineSearch, AiOutlineShoppingCart } from "react-icons/ai";
import { Link } from "react-router-dom";
import Modal from "react-modal";
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
                              width: "800px",
                              height: "500px",
                              margin: "auto",
                              display: "flex",
                              flexDirection: "column",
                              justifyContent: "center",
                              alignItems: "center",
                            },
                          }}
                        >
                          {/* Nội dung màn hình nổi */}
                          <h2>Chi tiết</h2>
                          <p>Đây là nội dung chi tiết trong màn hình nổi.</p>
                          <button onClick={handleCloseModal}>Đóng</button>
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
