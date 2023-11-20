import {
  AiOutlineLeft,
  AiOutlineCheck,
  AiOutlineArrowRight,
  AiOutlineHome,AiOutlineCalendar,AiOutlineSchedule,AiOutlineTeam,AiOutlineForm,AiOutlineGift
} from "react-icons/ai";
import Modal from "react-modal";
import HeaderHotelType from "../HotelType/HeaderHotelType";
import { Link, useParams } from "react-router-dom";
import { differenceInDays, parseISO } from "date-fns";
import { useGetService_hotelQuery } from "@/api/webapp/service_hotel";
import { useForm } from "react-hook-form";
import localStorage from "redux-persist/es/storage";
import { useAddBookingUserMutation } from "@/api/bookingUser";
import { useEffect, useState } from "react";
import { BsCartCheck } from "react-icons/bs";
import { useGetVoucher_hotelIdQuery } from "@/api/webapp/voucher_home";

const BookingInformation = () => {
  const dataParam = useParams();
  const [order, setOrder] = useState<any>([]);
  const { data: serviceData } = useGetService_hotelQuery();
  const [addBookingUser] = useAddBookingUserMutation();
  const [userData, setUserData] = useState<any | null>(null);

  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    const userPromise = localStorage.getItem("user");
    userPromise.then((user: any) => {
      setUserData(JSON.parse(user));
    });
  }, []);

  const user_id = userData?.id;

  let hotel: string[] = [];
  if (dataParam && dataParam.hotel) {
    hotel = dataParam.hotel.split(",");
  }

  let date: Date[] = [];
  if (dataParam && dataParam.date) {
    const timeArray = dataParam.date.split(",");
    date = timeArray?.map((time) => new Date(time));
  }

  let roomNumber: any[] = [];
  if (dataParam && dataParam.roomNumber) {
    roomNumber = JSON.parse(dataParam.roomNumber);
  }

  let selectedServices: any[] = [];
  if (dataParam && dataParam.selectedServices) {
    selectedServices = JSON.parse(dataParam.selectedServices);
  }

  let roomDetailsString:any = []
  if(dataParam && dataParam?.people){
    roomDetailsString = JSON.stringify(dataParam?.people).split("&").map((item:any )=> item.replace(/^"|"$/g, ''))
  }
  const NumberPeople: { [key: string]: number }[] = [];

  roomDetailsString.forEach((item:any) => {
    const obj: { [key: string]: number } = {};
    const keyValuePairs: string[] = item.split(',');
  
    keyValuePairs.forEach(pair => {
      const [key, value]: string[] = pair.split(':');
      obj[key] = parseInt(value);
    });
  
    NumberPeople.push(obj);
  });
  console.log(" dataParam?.people", dataParam?.people);
  
  //Tính số người
  // Tách chuỗi thành các phần tử riêng biệt
  const individuals: any = dataParam?.people && dataParam.people.split("&");

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
  let totalPrice1 = 0;

  roomNumber?.map((item: any) => {
    const startDate = new Date(date[0]); // Lấy ngày bắt đầu thuê phòng từ date[0]
    const endDate = new Date(date[1]); // Lấy ngày kết thúc thuê phòng từ date[1]
    const numberOfDays = Math.ceil(
      (endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24)
    ); // Tính số ngày thuê phòng

    totalPrice1 += item.price * numberOfDays * item.count;
  });

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

  const onSubmit = (data: any) => {
    const dataBooking = {
      check_in: date[0].toISOString().slice(0, 10),
      check_out: date[1].toISOString().slice(0, 10),
      id_user: userData?.id || null,
      email: data.email,
      name: data.firstName + data.lastName,
      message: "...",
      people_quantity: totalChildren + totalAdults,
      total_amount: priceAfterVoucher,      
      cccd: data.id,
      nationality: data.country,
      phone: data.phone,
      cart: cart,
      id_hotel: Number(hotel[0]),
      // promotion: 1,
    };
    addBookingUser(dataBooking)
      .unwrap()
      .then((res) => {
        if (res) {
          // const {detail} = res
          setOrder(res);
          setModalIsOpen(true);
        }
      });
  };

  // add voucher
  const [showVoucherModal, setShowVoucherModal] = useState(false);
  const [selectedVoucher, setSelectedVoucher] = useState(null);
  const [isScrollLocked, setIsScrollLocked] = useState(false);

  const { data: myvoucher } = useGetVoucher_hotelIdQuery({
    id: user_id || undefined,
  });

  /* Khóa cuộn trang */
  useEffect(() => {
    if (isScrollLocked) {
      document.documentElement.style.overflow = "hidden"; // Khóa cuộn trang
    } else {
      document.documentElement.style.overflow = "auto"; // Cho phép cuộn trang
    }

    return () => {
      document.documentElement.style.overflow = "auto";
    };
  }, [isScrollLocked]);

  useEffect(() => {
    // Lưu selectedVoucher vào local storage khi thay đổi
    localStorage.setItem("selectedVoucher", selectedVoucher || "");
  }, [selectedVoucher]);

  // Lắng nghe sự thay đổi trong selectedVoucher và cập nhật state appliedVoucher
  useEffect(() => {
    setAppliedVoucher(selectedVoucher);
  }, [selectedVoucher]);

  const openVoucherModal = () => {
    setIsScrollLocked(true);
    setShowVoucherModal(true);
  };

  const closeVoucherModal = () => {
    setIsScrollLocked(false);
    setShowVoucherModal(false);
  };

  // Chặn sự kiện lan bấm tự đóng modal
  const handleModalClick = (e: any) => {
    e.stopPropagation();
  };

  const handleVoucherSelect = (voucher: any) => {
    // Kiểm tra nếu voucher không phải là null trước khi gọi setSelectedVoucher
    setSelectedVoucher(voucher);
  };

  const handleUseVoucher = () => {
    // Kiểm tra nếu có voucher được chọn
    if (selectedVoucher !== null && selectedVoucher !== undefined) {
      // Lưu trạng thái đã sử dụng voucher vào local storage hoặc thực hiện các hành động khác
      localStorage.setItem("isVoucherUsed", "true");

      // Lưu thông tin voucher được chọn vào local storage
      const { id, name, expire_at, discount } = selectedVoucher;
      const selectedVoucherDetails = { id, name, expire_at, discount };

      localStorage.setItem(
        "selectedVoucherDetails",
        JSON.stringify(selectedVoucherDetails)
      );

      // Đóng modal hoặc thực hiện các hành động khác cần thiết
      closeVoucherModal();
    }
  };

  const [appliedVoucher, setAppliedVoucher] = useState<any | null>(null);

  useEffect(() => {
    const storedVoucherData = localStorage.getItem("selectedVoucherDetails");
    storedVoucherData.then((selectedVoucherDetails: any) => {
      setAppliedVoucher(JSON.parse(selectedVoucherDetails));
    });
  }, []);

  
  const priceAfterVoucher = sumprice - (sumprice * (appliedVoucher?.discount || 0) / 100);

  return (
    <div>
      <HeaderHotelType /><br /><br /><br />
      <div className="">
        <div className="flex items-center w-[1280px] mx-auto mt-[60px] ">
          <span className="flex items-center mr-[300px] space-x-3 text-blue-500 font-medium">
            <AiOutlineLeft />
            <a href="" className="">Chọn phòng</a>
          </span>
          <div className="flex items-center space-x-8">
            <a className="flex items-center space-x-3 " href="">
            <span className="bg-[#f5f6fa] px-4  font-medium py-2 text-[#6a6971] rounded-full">
                1
              </span>
              <span className="font-medium text-[14px] text-gray-500">Chọn phòng</span>
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
            <span className="bg-[#e8952f] px-2 py-2 text-white rounded-full">
                <AiOutlineCheck />
              </span>
              <span className="text-[#e8952f] text-[14px] font-medium">
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
            {/* Lưu vào local */}
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
                          // name="gender"
                          type="radio"
                          value="Khác"
                          {...register("gender", { required: true })}
                          // value={formData.gender}
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
                      // id="last-name"
                      className="border mt-2 w-[360px] h-[45px] rounded-md px-3 text-[12px] outline-none"
                      type="text"
                      placeholder="Ex: Nguyen"
                      {...register("lastName", { required: true })}
                      name="lastName"
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
                      name="email"
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
                      className="border mt-2 w-[360px] h-[45px] rounded-md px-3 text-[12px] outline-none text-black"
                      type="tel"
                      placeholder="Ex: Anh Duy"
                      {...register("phone", { required: true })}
                      name="phone"
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

              {/* ADD mã voucher */}

              <div
                className={`border border-black rounded-md w-[800px] pb-10 mt-4 voucher-list overflow-auto max-h-90`}
              >
                <div className="border border-b-[#f9f9f9] bg-[#f5f6fa] px-5 py-5 flex items-center justify-between">
                  <span className="font-medium text-[18px]">
                    MiiChii Ưu Đãi
                  </span>
                </div>

                {/* Modal overlay */}
                {showVoucherModal && (
                  <div
                    className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center"
                    onClick={closeVoucherModal}
                  >
                    {/* Nội dung modal lớn hơn */}
                    <div
                      className="bg-white p-8 rounded-md shadow-lg w-[800px] overflow-y-auto"
                      onClick={handleModalClick}
                    >
                      {/* Tiêu đề của modal */}
                      <div className="mb-4">
                        <h2 className="text-xl font-semibold">
                          Danh sách Voucher
                        </h2>
                        {/* Ô tìm kiếm */}
                        <div className="mt-2 relative rounded-md border border-gray-300 shadow-sm flex">
                          <input
                            type="text"
                            name="search"
                            id="search"
                            className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-5 py-3 sm:text-sm rounded-md"
                            placeholder="Nhập voucher cần tìm kiếm..."
                          />
                          <button
                            type="button"
                            className="absolute inset-y-0 right-0 px-3 flex pl-6 items-center bg-gray-200 rounded-md font-medium"
                            value={"Tìm"}
                            onClick={handleModalClick}
                          >
                            Tìm kiếm
                            <svg
                              className="h-5 w-2 text-gray-500"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              {/* Biểu tượng tìm kiếm của bạn */}
                            </svg>
                          </button>
                        </div>
                      </div>

                      {/* Thông tin voucher */}
                      <ul className="voucher-list overflow-auto max-h-90">
                        {myvoucher?.vouchers?.map(
                          (voucher: any, index: any) => (
                            <li
                              key={index}
                              className="flex items-center space-x-4 mb-4"
                            >
                              <input
                                type="radio"
                                id={`voucher${index}`}
                                name="voucher"
                                value={`voucher${index}`}
                                checked={selectedVoucher === voucher}
                                onChange={() => handleVoucherSelect(voucher)}
                              />

                              {/* Thêm thông tin cho mỗi voucher */}
                              <div className="flex items-center">
                                <img
                                  className="w-10 h-10 rounded-full mr-2"
                                  src={voucher.image}
                                  alt={`Hình ảnh Voucher ${index + 1}`}
                                />
                                <div>
                                  <p className="font-bold">{voucher.name}</p>
                                  <p>Hạn sử dụng: {voucher.expiryDate}</p>
                                  <p>Giảm giá: {voucher.discount}%</p>
                                </div>
                              </div>
                            </li>
                          )
                        )}
                      </ul>

                      {/* Nút sử dụng voucher */}
                      <button
                        className="font-medium bg-blue-500 px-6 py-2 text-white rounded-md ml-auto flex"
                        onClick={handleUseVoucher}
                      >
                        Sử dụng
                      </button>
                    </div>
                  </div>
                )}

                {/* COIN */}
                <div className="flex">
                  <div className="flex items-center ml-5 mt-2">
                    <input
                      type="checkbox"
                      id="useCoin"
                      name="useCoin"
                      className="mr-2"
                    />
                    <label
                      htmlFor="useCoin"
                      className="text-sm text-gray-600 cursor-pointer"
                    >
                      Sử dụng số coin đang có
                    </label>
                  </div>

                  <div className="flex items-center ml-5 mt-2">
                    <input
                      type="checkbox"
                      id="useCoin"
                      name="useCoin"
                      className="mr-2"
                    />
                    <div
                      className={`text-sm text-gray-600 cursor-pointer ${
                        showVoucherModal ? "opacity-50 pointer-events-none" : ""
                      }`}
                      onClick={openVoucherModal}
                    >
                      Chọn voucher
                    </div>
                  </div>
                </div>
              </div>
              {/* end */}

              <div className="border boder-black  rounded-md w-[800px] pb-10 mt-4">
                <div className="border border-b-[#bg-[#f9f9f9]]  bg-[#f5f6fa] px-5 py-5">
                  <span className="font-medium text-[18px]">
                    Phương thức thanh toán
                  </span>
                </div>
                <div className="px-5 py-3">
                  <a href="" className="text-[15px]   text-left">
                    Khi nhấp vào "Thanh toán", bạn đồng ý cung cấp các thông tin
                    trên và đồng ý với các
                    <span className="text-[#80c3fa] underline-offset-1 underline">
                      điều khoản,điều kiện{" "}
                    </span>{" "}
                    và
                    <span className="text-[#80c3fa] underline-offset-1 underline ">
                      {" "}
                      chính sách và quyền riêng
                    </span>{" "}
                    tư của <span className="font-medium">Miichii</span>
                  </a>
                </div>
                <div>
                  <button
                    type="submit"
                    className="bg-[#e8952f] text-white rounded-full px-[50px] pt-3 pb-3 text-[20px] font-medium ml-[500px] transform transition-tranform hover:scale-105 duration-300"
                  >
                    Thanh toán
                  </button>
                </div>
              </div>
            </form>

            {/* endForm */}
          </div>
          <div className="border boder-black  rounded-md w-[460px] pb-10 h-full">
            <div className="border border-b-[#bg-[#f9f9f9]]  bg-[#f5f6fa] px-5 py-5">
              <span className="font-medium text-[18px]">Chuyến đi</span>
            </div>
            <div className="px-5">
              <div className=" mt-4">
                <div className="flex items-center justify-between ">
                  <h2 className="text-[18px] font-medium">{hotel[1]}</h2>
                  <a className="text-sm text-blue-500 font-medium hover:underline" href="">
                    Chỉnh sửa
                  </a>
                </div>
                <div className="text-[13px] mt-2 border-b-2 pb-2">
                  <p className="text-sm pt-3 items-center flex text-gray-500 font-medium">
                    <AiOutlineCalendar class="text-lg mr-2"/>
                    {date[0].toISOString().slice(0, 10)}
                    <AiOutlineArrowRight className="inline-block mx-1 " />
                    {date[1].toISOString().slice(0, 10)}
                  </p>
                  <p className="text-sm pb-3 text-gray-500 font-medium flex items-center mt-1">
                    <AiOutlineSchedule class="text-lg mr-2"/>
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
                    <div className="flex items-center justify-between pt-5">
                      <h1 className="font-semibold">{roomNumber}</h1>
                      <button className="text-base font-semibold ">
                        {item?.price.toLocaleString('vi-VN')} đ
                      </button>
                    </div>
                    <div className="border-b-2 pb-3">
                      <p className="text-sm pt-3 items-center flex text-gray-500 font-medium">
                        <AiOutlineForm class="text-lg mr-2"/>
                        <span className="pr-1">0{item?.count}</span>
                        {item?.name}
                      </p>
                      <span className="flex text-gray-500 mt-1">
                        <AiOutlineTeam class="text-lg mr-2"/>
                        <p className="text-sm pb-3 font-medium ">
                        {NumberPeople && NumberPeople?.filter((item:any, index1:any) => index1 == index).map(( {adults, children, infants}:any, index:any) => (
                                  <div key={index}>Người lớn:{adults}, Trẻ em:{children}, Em bé: {infants}</div>
                                ))}
                          </p>
                      </span>
                    </div>
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
                    <div>
                      <div className="border-gray-100  px-2 rounded mt-5">
                        <p className="text-[17px] pb-3 font-semibold">
                          Voucher được áp dụng:
                        </p>
                      </div>
                      <div className="border-gray-100 px-2 rounded mt-3">
                        {appliedVoucher ? (
                          <>
                            <p>
                              {appliedVoucher.name} - Giảm giá:{" "}
                              {appliedVoucher.discount}%
                            </p>
                          </>
                        ) : (
                          <p className="text-sm pb-3 font-medium text-gray-500 flex items-center">
                           <AiOutlineGift class="text-lg mr-2"/>
                            Không có voucher được áp dụng
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
              <div className=" mt-4 border-t-2 pt-4">
                <div className="flex items-center justify-between ">
                  <h2 className="text-[17px] font-medium">Số tiền tạm tính:</h2>
                  <a className="text-[18px] font-semibold text-[#e8952f]" href="">
                    {sumprice.toLocaleString('vi-VN')} đ
                  </a>
                </div>
                <div className="flex items-center justify-between mt-4">
                  <h2 className="text-[17px] font-medium">
                    {" "}
                    Số tiền được giảm :
                  </h2>
                  <a className="text-[15px] font-medium text-red-600" href="">
                    - { ((sumprice * appliedVoucher?.discount || 0) / 100).toLocaleString('vi-VN')}
                  </a>
                </div>
                <div className="flex items-center justify-between mt-4">
                  <h2 className="text-[18px] font-medium">
                    {" "}
                    Tổng cộng:
                  </h2>
                  <a className="text-[18px] font-medium text-[#e8952f]" href="">
                  {priceAfterVoucher.toLocaleString('vi-VN')} đ
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
                  <span className="text-orange-400">
                    {order && order?.name}
                  </span>
                </p>
                <p className="mb-2">
                  <span className="">Email:</span>{" "}
                  <span className="text-orange-400">
                    {order && order?.email}
                  </span>
                </p>
                <p className="mb-2">
                  <span className="">Số điện thoại:</span>{" "}
                  <span className="text-orange-400">
                    {order && order?.phone}
                  </span>
                </p>
                <p className="mb-2">
                  <span className="">Ngày nhận phòng:</span>{" "}
                  <span className="text-orange-400">
                    {order && order?.check_in}
                  </span>
                </p>
                <p className="mb-2">
                  <span className="">Ngày trả phòng:</span>{" "}
                  <span className="text-orange-400">
                    {" "}
                    {order && order?.check_out}
                  </span>
                </p>
                <p className="mb-2">
                  <span className="">Số người:</span>{" "}
                  <span className="text-orange-400">
                    {order && order?.people_quantity}
                  </span>
                </p>
                <p className="mb-2">
                  <span className="">CCCD</span>{" "}
                  <span className="text-orange-400">
                    {order && order?.cccd}
                  </span>
                </p>
                <p className="mb-2">
                  <span className="">Quốc tịch</span>{" "}
                  <span className="text-orange-400">
                    {order && order?.nationality}
                  </span>
                </p>
                <p className="mb-2">
                  <span className="">Tổng số tiền:</span>{" "}
                  <span className="text-orange-400 font-semibold">
                    {order && order?.total_amount}
                  </span>
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
              <button className="flex space-x-2 items-center bg-orange-400 px-3 py-1 rounded-md hover:bg-orange-600 hover:text-white">
                <AiOutlineHome />
                <Link to={"/homepage"}>Quay lại trang chủ</Link>
              </button>
              {userData?.id ? (
                <button className="flex space-x-2 items-center bg-blue-500 px-3 py-1 rounded-md hover:bg-blue-600 hover:text-white">
                  <BsCartCheck />
                  <Link to={"/profileUser/myorder"}>Lịch sử đặt hàng</Link>
                </button>
              ) : (
                <div></div>
              )}
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default BookingInformation;
