import {
  AiOutlineLeft,
  AiOutlineCheck,
  AiOutlineArrowRight,
  AiOutlineHome,
} from "react-icons/ai";
import Modal from "react-modal";
import HeaderHotelType from "../HotelType/HeaderHotelType";
import { Link, useNavigate, useParams } from "react-router-dom";
import { differenceInDays, parseISO } from "date-fns";
import { useGetService_hotelQuery } from "@/api/webapp/service_hotel";
import { useForm } from "react-hook-form";
import localStorage from "redux-persist/es/storage";
import { useAddBookingUserMutation } from "@/api/bookingUser";
import { useState } from "react";
import { Button } from "antd";
import { BsCartCheck } from "react-icons/bs";
const BookingInformation = () => {
  const dataParam = useParams();
  const [order, setOrder] = useState<any>([]);
  const { data: serviceData } = useGetService_hotelQuery();
  console.log("serviceData chooservice", serviceData);

  console.log("dataParam11", dataParam);
  const [modalIsOpen, setModalIsOpen] = useState(false);


  const handleCloseModal = () => {
    setModalIsOpen(false);
  };
  let hotel: string[] = [];
  if (dataParam && dataParam.hotel) {
    hotel = dataParam.hotel.split(",");
  }
  console.log("hotel", hotel);

  let date: Date[] = [];
  if (dataParam && dataParam.date) {
    const timeArray = dataParam.date.split(",");
    date = timeArray?.map((time) => new Date(time));
  }
  console.log("date111", date);

  let roomNumber: any[] = [];
  if (dataParam && dataParam.roomNumber) {
    roomNumber = JSON.parse(dataParam.roomNumber);
  }
  console.log("RoomNumberParam", roomNumber);

  let selectedServices: any[] = [];
  if (dataParam && dataParam.selectedServices) {
    selectedServices = JSON.parse(dataParam.selectedServices);
  }
  console.log("selectedServicesParam", selectedServices);
  //Tính số người
  // Tách chuỗi thành các phần tử riêng biệt
  const individuals:any = dataParam.people && dataParam.people.split("&");

  let totalAdults = 0;
  let totalChildren = 0;

  // Lặp qua từng phần tử và tính tổng số người lớn và trẻ em
  individuals?.forEach((individual: any) => {
    // Tách thông tin về người lớn và trẻ em
    const info = individual.split(",");

    // Lặp qua từng thông tin và tìm số lượng người lớn và trẻ em
    info.forEach((item: any) => {
      if (item.includes("adults")) {
        const count = parseInt(item.split(":")[1]);
        totalAdults += count;
      } else if (item.includes("children")) {
        const count = parseInt(item.split(":")[1]);
        totalChildren += count;
      }
    });
  });

  // In kết quả
  console.log("Total adults:", totalAdults);
  console.log("Total children:", totalChildren);

  //Tính tiền
  const serviceTotalPrice = selectedServices.reduce(
    (accumulator: any, selectedService: any) => {
      const { id } = selectedService;
      const selectedServiceData =
        serviceData && serviceData.find((item: any) => item.id === id);
      if (selectedServiceData) {
        return accumulator + selectedServiceData.price;
      }
      return accumulator;
    },
    0
  );
  console.log("tien dịch vụ", serviceTotalPrice);
  let totalPrice1 = 0;

  roomNumber?.map((item: any) => {
    const startDate = new Date(date[0]); // Lấy ngày bắt đầu thuê phòng từ date[0]
    const endDate = new Date(date[1]); // Lấy ngày kết thúc thuê phòng từ date[1]
    const numberOfDays = Math.ceil(
      (endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24)
    ); // Tính số ngày thuê phòng

    totalPrice1 += item.price * numberOfDays * item.count;
  });

  // Hiển thị tổng tiền
  console.log("Tổng tiền: ", totalPrice1);

  const sumprice = totalPrice1 + serviceTotalPrice;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  //Add mảng cart

  // Lặp qua mảng roomNumber để tạo dữ liệu cho cart
  const cart = roomNumber?.map((item, index) => {
    const selectedServicesInRoom = selectedServices.filter(
      (service) => service.roomIndex === index
    );

    const services = selectedServicesInRoom?.map((selectedService) => ({
      id_service: selectedService.id,
      quantity: 1,
      // quantity: selectedService.quantity
    }));

    return {
      id_cate: item.id_cate,
      services: services,
    };
  });

  console.log("cart", cart);

  const [addBookingUser] = useAddBookingUserMutation();
  console.log("id_user", hotel[0]);

  let userData: any = null; // Biến bên ngoài

  const userPromise = localStorage.getItem("user");
  userPromise.then((user: any) => {
    userData = JSON.parse(user);
    console.log("userData", userData);
  });

  console.log("userData bên ngoài", userData);

  const onSubmit = (data: any) => {
    const dataBooking = {
      check_in: date[0].toISOString().slice(0, 10),
      check_out: date[1].toISOString().slice(0, 10),
      email: data.email,
      name: data.firstName + data.lastName,
      message: "...",
      people_quantity: totalChildren + totalAdults,
      total_amount: sumprice,
      cccd: data.id,
      nationality: data.country,
      id_user: userData?.id || null,
      phone: data.phone,
      cart: cart,
      id_hotel: Number(hotel[0]),
      promotion: 1,
    };
    addBookingUser(dataBooking)
      .unwrap()
      .then((res) => {
        console.log("respon", res);
        if (res) {
          const {detail} = res
          setOrder(detail)
          setModalIsOpen(true);
        }

      });

    console.log("data form", data);
    console.log("newDataBooking", dataBooking);
  };
  return (
    <div>
      <HeaderHotelType />
      <div className="">
        <div className="flex items-center w-[1280px] mx-auto mt-[60px] ">
          <span className="flex items-center mr-[300px] space-x-3 text-[#6181bb]">
            <AiOutlineLeft />
            <a href="">Chọn phòng</a>
          </span>
          <div className="flex items-center space-x-8">
            <a className="flex items-center space-x-3 text-[#e8952f]" href="">
              <span className="bg-[#e8952f] px-2 py-2 text-white rounded-full">
                <AiOutlineCheck />
              </span>
              <span className="font-medium text-[14px]">Chọn phòng</span>
            </a>
            <a className="flex items-center space-x-3 text-[#e8952f]" href="">
              <span className="bg-[#f5f6fa] px-4  font-medium py-2 text-[#6a6971] rounded-full">
                2
              </span>
              <span className="text-[#6a6971] text-[14px] font-medium">
                Dịch vụ mua thêm
              </span>
            </a>
            <a className="flex items-center space-x-3 text-[#e8952f]" href="">
              <span className="bg-[#f5f6fa] px-4 py-2 font-medium text-[#6a6971] rounded-full">
                3
              </span>
              <span className="text-[#6a6971] text-[14px] font-medium">
                Thanh toán
              </span>
            </a>
          </div>
        </div>
        <div className="w-[1280px] mx-auto mt-10 flex space-x-4">
          <div>
            <div className="border border-b-[#bg-[#f9f9f9]] px-4 py-4 bg-[#f5f6fa]">
              <span className="font-medium text-[18px]">
                Thông tin người đặt chỗ{" "}
              </span>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="border boder-black  rounded-md w-[800px] pb-10 ">
                <div className="mt-5 mb-5 flex items-center px-5 py-5">
                  <span className="mr-6">
                    Danh xưng <span className="text-red-500">*</span>
                  </span>
                  <div className="space-x-2">
                    <span className="items-center">
                      <label>
                        <input
                          type="radio"
                          value="Ông"
                          {...register("gender", { required: true })}
                        />{" "}
                        Ông
                      </label>
                    </span>
                    <span className="items-center">
                      <label>
                        <input
                          type="radio"
                          value="Bà"
                          {...register("gender", { required: true })}
                        />{" "}
                        Bà
                      </label>
                    </span>
                    <span className="items-center">
                      <label>
                        <input
                          type="radio"
                          value="Khác"
                          {...register("gender", { required: true })}
                        />{" "}
                        Khác
                      </label>
                    </span>
                  </div>
                  {errors.gender && (
                    <span className="text-red-500">
                      Vui lòng chọn danh xưng
                    </span>
                  )}
                </div>

                <div className="flex items-center space-x-8 px-5 py-5">
                  <div>
                    <label htmlFor="last-name">
                      Họ <span className="text-red-500">*</span>
                    </label>
                    <br />
                    <input
                      id="last-name"
                      className="border mt-2 w-[360px] h-[45px] rounded-md px-3 text-[12px] outline-none"
                      type="text"
                      placeholder="Ex: Nguyen"
                      {...register("lastName", { required: true })}
                    />
                    {errors.lastName && (
                      <span className="text-red-500">Vui lòng điền họ</span>
                    )}
                  </div>
                  <div>
                    <label htmlFor="first-name">
                      Tên đêm và tên <span className="text-red-500">*</span>
                    </label>
                    <br />
                    <input
                      id="first-name"
                      className="border mt-2 w-[360px] h-[45px] rounded-md px-3 text-[12px] outline-none"
                      type="text"
                      placeholder="Ex: Anh Duy"
                      {...register("firstName", { required: true })}
                    />
                    {errors.firstName && (
                      <span className="text-red-500">
                        Vui lòng điền tên đệm và tên
                      </span>
                    )}
                  </div>
                </div>

                <div className="px-5 py-3 flex items-center space-x-8">
                  <div>
                    <label htmlFor="email">
                      Email nhận thông tin đơn hàng{" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <br />
                    <input
                      id="email"
                      className="border mt-2 w-[360px] h-[45px] rounded-md px-3 text-[12px] outline-none"
                      type="email"
                      placeholder="Ex: abc@gmail.com"
                      {...register("email", { required: true })}
                    />
                    {errors.email && (
                      <span className="text-red-500">Vui lòng điền email</span>
                    )}
                  </div>
                  <div>
                    <label htmlFor="phone">
                      Điện thoại <span className="text-red-500">*</span>
                    </label>
                    <br />
                    <input
                      id="phone"
                      className="border mt-2 w-[360px] h-[45px] rounded-md px-3 text-[12px] outline-none"
                      type="tel"
                      placeholder="Ex: Anh Duy"
                      {...register("phone", { required: true })}
                    />
                    {errors.phone && (
                      <span className="text-red-500">
                        Vui lòng điền số điện thoại
                      </span>
                    )}
                  </div>
                </div>

                <div className="px-5 flex items-center space-x-9">
                  <div>
                    <label htmlFor="country">
                      Vùng quốc gia<span className="text-red-500">*</span>
                    </label>
                    <br />
                    <select
                      id="country"
                      className="border w-[360px] h-[45px] mt-4 rounded-md px-3"
                      {...register("country", { required: true })}
                    >
                      <option value="vietnam">Việt Nam</option>
                      <option value="trungquoc">Trung Quốc</option>
                      <option value="anh">Anh</option>
                    </select>
                    {errors.country && (
                      <span className="text-red-500">
                        Vui lòng chọn vùng quốc gia
                      </span>
                    )}
                  </div>
                  <div className="mt-2">
                    <label htmlFor="id">
                      Căn cước công dân <span className="text-red-500">*</span>
                    </label>
                    <br />
                    <input
                      id="id"
                      className="border mt-2 w-[360px] h-[45px] rounded-md px-3 text-[12px] outline-none"
                      type="tel"
                      placeholder="Ex: Anh Duy"
                      {...register("id", { required: true })}
                    />
                    {errors.id && (
                      <span className="text-red-500">
                        Vui lòng điền căn cước công dân
                      </span>
                    )}
                  </div>
                </div>
                <span className="flex mt-4 items-center space-x-3 px-5">
                  <span className="bg-[#e8952f] px-1 py-1 rounded-full text-white text-[10px]">
                    <AiOutlineCheck />
                  </span>
                  <a className="text-[15px] text-[#e8952f]" href="">
                    Tôi là khách lưu trú
                  </a>
                </span>
              </div>

              <div className="border boder-black  rounded-md w-[800px] pb-10 mt-4">
                <div className="border border-b-[#bg-[#f9f9f9]]  bg-[#f5f6fa] px-5 py-5">
                  <span className="font-medium text-[18px]">
                    Phương thức thanh toán
                  </span>
                </div>
                <a href="" className="text-[15px] px-5 text-left">
                  Khi nhấp vào "Thanh toán", bạn đồng ý cung cấp các thông tin
                  trên và đồng ý với các
                  <span className="text-[#80c3fa] underline-offset-1 underline">
                    điều khoản,điều kiện{" "}
                  </span>{" "}
                  và
                  <span className="text-[#80c3fa] underline-offset-1 underline">
                    {" "}
                    chính sách và quyền riêng
                  </span>{" "}
                  tư của Vinpearl.
                </a>
                <div>
                  <button
                    type="submit"
                    className="bg-[#e8952f] text-white rounded-full px-[50px] pt-3 pb-3 text-[20px] font-medium ml-[500px] "
                  >
                    Thanh toán
                  </button>
                </div>
              </div>
            </form>

            {/* endForm */}
          </div>
          <div className="border boder-black  rounded-md w-[460px] pb-10 h-[400px]">
            <div className="border border-b-[#bg-[#f9f9f9]]  bg-[#f5f6fa] px-5 py-5">
              <span className="font-medium text-[18px]">Chuyến đi</span>
            </div>
            <div className="px-5">
              <div className=" mt-4">
                <div className="flex items-center justify-between ">
                  <h2 className="text-[18px] font-medium">{hotel[1]}</h2>
                  <a className="text-[12px]" href="">
                    Chỉnh sửa
                  </a>
                </div>
                <div className="text-[13px] mt-2">
                  <p className="text-sm pt-3 items-center flex">
                    {date[0].toISOString().slice(0, 10)}
                    <AiOutlineArrowRight className="inline-block mx-1" />
                    {date[1].toISOString().slice(0, 10)}
                  </p>
                  <p className="text-sm pb-3">
                    {differenceInDays(
                      parseISO(date[1].toISOString().slice(0, 10)),
                      parseISO(date[0].toISOString().slice(0, 10))
                    )}{" "}
                    Đêm
                  </p>
                </div>
              </div>
              {/* Thông tin phòng đặt */}
              {roomNumber?.map((item: any, index: number) => {
                const roomNumber = `Phòng ${index + 1}`;
                const selectedServicesInRoom = selectedServices.filter(
                  (service) => service.roomIndex === index
                );

                return (
                  <div key={index}>
                    <div className="flex items-center justify-between">
                      <h1 className="font-semibold">{roomNumber}</h1>
                      <button className="text-lg font-semibold italic">
                        {item?.price}
                      </button>
                    </div>
                    <p className="text-sm pt-3 items-center flex">
                      <span className="pr-1">x{item?.count}</span>
                      {item?.name}
                    </p>
                    <p className="text-sm pb-3">2 Người lớn, 2 Trẻ em</p>
                    {/* Dịch vụ đã chọn */}
                    {selectedServicesInRoom.length > 0 && (
                      <div className="border-gray-100 bg-gray-100 px-2 rounded">
                        <p className="text-sm pb-3 font-semibold">
                          Dịch vụ mua thêm
                        </p>
                        <ul className="list-disc px-3">
                          {selectedServicesInRoom?.map((selectedService) => {
                            const { id, price, roomIndex } = selectedService;
                            const selectedRoom = roomIndex + 1;
                            const selectedServiceData =
                              serviceData &&
                              serviceData?.find((item: any) => item?.id === id);
                            if (selectedServiceData) {
                              return (
                                <li className="text-sm pb-2" key={id}>
                                  <div className="flex justify-between items-center">
                                    <p>
                                      {" "}
                                      Phòng {selectedRoom}:{" "}
                                      {selectedServiceData?.name}
                                    </p>
                                    <p>{selectedServiceData?.price} vnđ</p>
                                  </div>
                                </li>
                              );
                            }
                            return null;
                          })}
                        </ul>
                      </div>
                    )}
                  </div>
                );
              })}
              <div className=" mt-4 border-t-2 pt-4">
                <div className="flex items-center justify-between ">
                  <h2 className="text-[18px] font-medium">Tổng cộng:</h2>
                  <a className="text-[18px] font-medium text-[#e8952f]" href="">
                    {sumprice}
                  </a>
                </div>
                <div className="text-[13px] mt-2">
                  <a className="" href="">
                    Bao gồm cả thuế
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal
        isOpen={modalIsOpen}
        // onRequestClose={handleCloseModal}
        contentLabel="Chi tiết"
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          },
          content: {
            width: "1100px",
            maxHeight: "auto",
            overflowY: "auto",
            margin: "auto",
            paddingTop: "250px",
            paddingBlockStart: "250px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          },
        }}
      >
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
              Chúng tôi xin gửi lời cảm ơn chân thành đến quý khách vì đã lựa
              chọn đặt phòng khách sạn của chúng tôi. Chúng tôi rất trân trọng
              sự tin tưởng và ủng hộ của quý khách.
            </h2>
            <h3 className=" font-semibold mb-4 text-center">
              Thông tin đơn hàng:
            </h3>
            <div className="grid grid-cols-2 pl-10">
              <div className="">
                <h1 className=" font-semibold mb-2">
                  Danh sách phòng và dịch vụ
                </h1>
                <p className="mb-2">
                  <span className="">Tên khách hàng:</span>{" "}
                  <span className="text-orange-400">{order && order?.name}</span>
                </p>
                <p className="mb-2">
                  <span className="">Email:</span>{" "}
                  <span className="text-orange-400">{order && order?.email}</span>
                </p>
                <p className="mb-2">
                  <span className="">Số điện thoại:</span>{" "}
                  <span className="text-orange-400">{order && order?.phone}</span>
                </p>
                <p className="mb-2">
                  <span className="">Ngày nhận phòng:</span>{" "}
                  <span className="text-orange-400">{order && order?.check_in}</span>
                </p>
                <p className="mb-2">
                  <span className="">Ngày trả phòng:</span>{" "}
                  <span className="text-orange-400"> { order && order?.check_out}</span>
                </p>
                <p className="mb-2">
                  <span className="">Số người:</span>{" "}
                  <span className="text-orange-400">{order && order?.people_quantity}</span>
                </p>
                <p className="mb-2">
                  <span className="">CCCD</span>{" "}
                  <span className="text-orange-400">{order && order?.cccd}</span>
                </p>
                <p className="mb-2">
                  <span className="">Quốc tịch</span>{" "}
                  <span className="text-orange-400">{order && order?.nationality}</span>
                </p>
                <p className="mb-2">
                  <span className="">Tổng số tiền:</span>{" "}
                  <span className="text-orange-400 font-semibold">{order && order?.total_amount}</span>
                </p>
                {/* Thêm thông tin khác của đơn hàng nếu cần */}
              </div>
              <div>
                <h1 className=" font-semibold mb-2">
                  Danh sách phòng và dịch vụ
                </h1>
                <ul>
                  {order?.room?.map((room: any, index: any) => (
                    <li key={index} className="mb-2">
                      <p className="font-semibold text-blue-800">
                        Phòng: {room?.name}
                      </p>
                      <ul className="list-disc ml-6">
                        {room?.services?.map((service:any, index: any) => (
                          <li key={index}>{service?.name}</li>
                        ))}
                      </ul>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="flex space-x-8 justify-center mt-5 ">
              <button className="flex space-x-2 items-center bg-orange-400 px-3 py-1 rounded-md hover:bg-orange-600 hover:text-white">
                <AiOutlineHome />
                <Link to={"/homepage"}>Quay lại trang chủ</Link>
              </button>
              <button className="flex space-x-2 items-center bg-blue-500 px-3 py-1 rounded-md hover:bg-blue-600 hover:text-white">
                <BsCartCheck />
                <Link to={"/profileUser/myorder"}>Lịch sử đặt hàng</Link>
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default BookingInformation;
