import React, { useEffect, useState } from "react";
import { GrLocation } from "react-icons/gr";
import { HiOutlineUser } from "react-icons/hi";
import {
  AiOutlineExpandAlt,
  AiOutlineInfoCircle,
  AiOutlineArrowRight,
  AiOutlineRight,
  AiFillStar,
  AiOutlineFrown,
  AiOutlineLeft,
  AiOutlineEye,
  AiOutlineCloseCircle,
  AiOutlineLike,
  AiOutlineSchedule,
  AiOutlineForm,
  AiOutlineTeam,
  AiOutlineCalendar,
} from "react-icons/ai";
import HeaderHotelType from "src/features/webapp/HotelType/HeaderHotelType";
import { SearchHotel } from "./searchHotel";
import { useGetCategory_homeByIdQuery } from "@/api/webapp/category_home";
// import { useAppSelector } from "@/app/hook";
import { useGetHotel_homeByIdQuery } from "@/api/webapp/hotel_home";
import { Link, useNavigate, useParams } from "react-router-dom";
import { differenceInDays, parseISO } from "date-fns";
import moment from "moment";
import "./swper.css";
import Slider from "react-slick";

const ChooseRoom = () => {
  const [selectedRooms, setSelectedRooms] = useState<any>([]);

  const [totalPrice, setTotalPrice] = useState<any>(0);
  const searchSlide = useParams();
  // const [isRoomSelected, setIsRoomSelected] = useState(false);
  const [selectedRoomCount, setSelectedRoomCount] = useState(0);

  let numberPeople: { [key: string]: number }[] = [];
  if (searchSlide && searchSlide.numberPeople) {
    numberPeople = searchSlide.numberPeople
      .split("&")
      .map((detailsString: string) => {
        const detailsArray = detailsString.split(",");

        const roomDetails: { [key: string]: number } = {};
        detailsArray.forEach((detail) => {
          const [key, value] = detail.split(":");
          roomDetails[key] = parseInt(value);
        });

        return roomDetails;
      });
  }


  let date: Date[] = [];
  if (searchSlide && searchSlide.date) {
    const timeArray = searchSlide.date.split(",");
    date = timeArray.map((time) => new Date(time));
  }

  let hotel: string[] = [];
  if (searchSlide && searchSlide.nameHotel) {
    hotel = searchSlide.nameHotel.split(",");
  }

  const { data: hotel_detail } = useGetHotel_homeByIdQuery(hotel[0]);

  console.log(hotel_detail);

  // Lấy dữ liệu từ localStorage

  const handleRoomSelect = (selectedHotel: any) => {
    // Kiểm tra xem số lượng phòng đã chọn có vượt quá giới hạn không
    if (
      searchSlide &&
      typeof searchSlide.numberRoom === "string" &&
      /^\d+$/.test(searchSlide.numberRoom)
    ) {
      const numberRoom = parseInt(searchSlide.numberRoom, 10); // Chuyển đổi chuỗi thành số nguyên

      if (selectedRooms.length < numberRoom) {
        setSelectedRooms([...selectedRooms, selectedHotel]);
        const price = selectedHotel.price;
        setTotalPrice(totalPrice + price);
        setSelectedRoomCount(selectedRooms.length + 1); // Tăng số lượng phòng đã chọn
        // Lưu danh sách phòng đã chọn và tổng giá tiền vào localStorage
        localStorage.setItem(
          "selectedRooms",
          JSON.stringify([...selectedRooms, selectedHotel])
        );
        localStorage.setItem("totalPrice", (totalPrice + price).toString());
        // Đánh dấu rằng đã chọn phòng
      } else {
        // Xử lý trường hợp khi đã đạt đến giới hạn phòng
        // Ở đây bạn có thể thêm thông báo hoặc xử lý tùy ý
      }
    }
    // Không thực hiện gì nếu đã đạt đến giới hạn, không cần thông báo
  };

  const handleRemoveRoom = (room: any) => {
    // Tìm vị trí của phòng trong danh sách đã chọn
    const roomIndex = selectedRooms.findIndex(
      (selectedRoom: any) => selectedRoom.id === room.id
    );

    if (roomIndex !== -1) {
      // Loại bỏ phòng khỏi danh sách đã chọn
      const updatedSelectedRooms = [...selectedRooms];
      updatedSelectedRooms.splice(roomIndex, 1);
      setSelectedRooms(updatedSelectedRooms);

      // Trừ giá của phòng ra khỏi tổng giá
      const priceToRemove = room.price;
      setTotalPrice(totalPrice - priceToRemove);

      setSelectedRoomCount(selectedRooms.length - 1); // Giảm số lượng phòng đã chọn

      // Lưu danh sách phòng đã chọn và tổng giá tiền vào localStorage sau khi xóa
      localStorage.setItem(
        "selectedRooms",
        JSON.stringify(updatedSelectedRooms)
      );
      localStorage.setItem(
        "totalPrice",
        (totalPrice - priceToRemove).toString()
      );
    }
  };

  const uniqueSelectedRooms =
    selectedRooms &&
    selectedRooms.length > 0 &&
    selectedRooms.reduce((acc: any, room: any) => {
      // Kiểm tra xem phòng đã tồn tại trong danh sách chưa
      // const existingRoom = acc.find((r: any) => r.id === room.id);
      acc.push({ ...room, count: 1 });
      // // Nếu phòng đã tồn tại, tăng số lượng
      // if (existingRoom) {
      //   existingRoom.count++;
      // } else {
      //   // Nếu không, thêm phòng vào danh sách mới
      //   acc.push({ ...room, count: 1 });
      // }

      return acc;
    }, []);
  const individuals: any =
    searchSlide.numberPeople && searchSlide.numberPeople.split("&");

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

  const { data: hotels } = useGetCategory_homeByIdQuery({
    id: hotel?.[0],
    check_in: moment(date[0]).format("YYYY-MM-DD"),
    check_out: moment(date[1]).format("YYYY-MM-DD"),
    number_people: totalAdults + totalChildren,
    total_room: searchSlide.numberRoom,
  });
  console.log("hotels", hotels);

  // Lấy dữ liệu từ local storage
  const savedRoomInfoJSON = localStorage.getItem("roomInfo");
  const savedRoomInfo = savedRoomInfoJSON ? JSON.parse(savedRoomInfoJSON) : [];

  // Sử dụng dữ liệu từ local storage nếu có hoặc fallback là uniqueSelectedRooms
  const roomsToDisplay =
    uniqueSelectedRooms.length > 0 ? uniqueSelectedRooms : savedRoomInfo;
  const navigate = useNavigate();

  interface Room {
    count: number;
    name: string;
    price: number;
  }

  useEffect(() => {
    const storedSelectedRooms = localStorage.getItem("selectedRooms");
    const storedTotalPrice = localStorage.getItem("totalPrice");

    // Kiểm tra xem dữ liệu có tồn tại trong Local Storage không
    if (storedSelectedRooms && storedTotalPrice) {
      const parsedSelectedRooms = JSON.parse(storedSelectedRooms);

      const parsedTotalPrice = parseFloat(storedTotalPrice);

      // Cập nhật trạng thái với dữ liệu lấy từ Local Storage
      setSelectedRooms(parsedSelectedRooms);
      setTotalPrice(parsedTotalPrice);

      // Cập nhật selectedRoomCount dựa trên độ dài của danh sách phòng đã chọn
      setSelectedRoomCount(parsedSelectedRooms.length);
    }
  }, []);

  const onHandSubmit = () => {
    const updatedSelectedRooms: Room = uniqueSelectedRooms.map((room: any) => ({
      id_cate: room.id,
      count: room.count,
      name: room.name,
      price: room.price,
    }));
    const encodedGuests = numberPeople
      .map((details) => {
        return `adults:${details.adults},children:${details.children},infants:${details.infants}`;
      })
      .join("&");
    // const encodedGuests = encodeURIComponent(JSON.stringify(numberPeople));
    const encodedSelectedRooms = encodeURIComponent(
      JSON.stringify(updatedSelectedRooms)
    );

    const newCart = {
      hotel: searchSlide.nameHotel,
      date: date,
      numberRoom: updatedSelectedRooms,
      numberPeople: numberPeople,
      price: totalPrice,
    };
    if (!localStorage.getItem("cart")) {
      localStorage.setItem("cart", JSON.stringify([]));
    }
    const cartItems = JSON.parse(localStorage.getItem("cart") as any);
    cartItems.push(newCart);
    localStorage.setItem("cart", JSON.stringify(cartItems));
    const url = `/choose-service/${hotel}/${date}/${encodedSelectedRooms}/${encodedGuests}`;
    navigate(url);
  };

  //Silde
  let settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  const sliderRef = React.useRef<Slider>(null);

  const handleNext = () => {
    if (sliderRef.current) {
      sliderRef.current.slickNext();
    }
  };

  const handlePrev = () => {
    if (sliderRef.current) {
      sliderRef.current.slickPrev();
    }
  };

  console.log("eeelect", selectedRooms);

  return (
    <div>
      <div className="mb-[100px]">
        <HeaderHotelType />
      </div>
      <div className="mb-20">
        <SearchHotel />
      </div>
      <div className="max-w-7xl mx-auto">
        <div className="max-w-5xl mx-auto my-5">
          <section className="group rounded-md border grid grid-cols-3 gap-4 px-2 py-3 hover:border-[#e8952f] hover:rounded-md hover:shadow-xl ">
            <div className="relative">
              <button
                onClick={handlePrev}
                className="bg-white border border-[#e8952f] rounded-full text-[#e8952f] px-2 py-2 absolute z-10 top-[45%] start-[-12px] transition-transform transform scale-100 hover:scale-125"
              >
                <AiOutlineLeft class="text-[13px]" />
              </button>
              <button
                onClick={handleNext}
                className="bg-white border border-[#e8952f] rounded-full text-[#e8952f] px-2 py-2 ml-[800px] z-10 absolute top-[42%]  end-[-13px]  transition-transform transform scale-100 hover:scale-125"
              >
                <AiOutlineRight class="text-[13px]" />
              </button>
              <Slider {...settings} ref={sliderRef}>
                <img
                  className="rounded-xl"
                  src="https://booking-static.vinpearl.com/hotels/3144cb44bcad401c92d99f97466e682e_s%E1%BA%A3nh%20dis-1-002.jpg"
                  alt=""
                />
                <img
                  className="rounded-xl"
                  src="https://booking-static.vinpearl.com/hotels/3144cb44bcad401c92d99f97466e682e_s%E1%BA%A3nh%20dis-1-002.jpg"
                  alt=""
                />
                <img
                  className="rounded-xl"
                  src="https://booking-static.vinpearl.com/hotels/3144cb44bcad401c92d99f97466e682e_s%E1%BA%A3nh%20dis-1-002.jpg"
                  alt=""
                />
              </Slider>
            </div>
            <div className="col-span-2 ml-2">
              <a className="text-xl hover:underline font-semibold ">
                {hotel_detail?.[0]?.name}
              </a>
              <div className="flex py-3 flex-col space-y-2">
                <div className="flex items-center">
                  <GrLocation />
                  <p className="text-sm pl-2">
                    Địa chỉ: {hotel_detail?.[0]?.address}/{" "}
                    {hotel_detail?.[0]?.city_name}
                  </p>
                </div>
                <p className="flex items-center font-medium space-x-2">
                  <AiOutlineFrown />
                  {Array.from(
                    { length: hotel_detail?.[0]?.star },
                    (_, index) => (
                      <span
                        key={index}
                        className="flex items-center text-[#e8952f]"
                      >
                        <AiFillStar />
                      </span>
                    )
                  )}
                </p>
              </div>
              <p className="pb-4">{hotel_detail?.[0]?.description}</p>
              <Link
                to={`/hotel/${hotel_detail?.[0]?.id}`}
                className="font-semibold text-blue-700 hover:text-blue-500 hover:underline flex items-center "
              >
                {" "}
                Xem chi tiết <AiOutlineRight class="mt-1 ml-1" />{" "}
              </Link>
            </div>
          </section>
          <section className="grid grid-cols-3 gap-4 py-3">
            <div className="col-span-2">
              <div className="border px-2 py-3 bg-gray-100 rounded my-3">
                <div className="flex justify-between items-center">
                  <h1 className="text-lg font-bold">
                    Chọn phòng:{" "}
                    <span>
                      {selectedRooms?.length}/{searchSlide?.numberRoom}
                    </span>
                  </h1>
                </div>
              </div>
              <div className="choice-column">
                {hotels?.map((hotel: any, index: any) => (
                  <section
                    key={index}
                    className="border rounded-lg grid grid-cols-3 gap-4 px-2 py-3 my-2"
                  >
                    <div className="image">
                      <img
                        src={hotel?.image}
                        alt=""
                        className="w-full h-full rounded-md"
                      />
                    </div>
                    <div className="col-span-2">
                      <a className="text-xl hover:underline font-medium flex items-center">
                        {hotel?.name}
                        <p className="text-[18px] mt-1 ml-2">
                          (
                          {hotel?.Total_rooms < 4 ? (
                            <span style={{ color: "red" }}>
                              Còn {hotel?.Total_rooms}
                            </span>
                          ) : (
                            <span>Còn {hotel?.Total_rooms}</span>
                          )}
                          )
                        </p>
                      </a>
                      <div className="flex items-center mt-2 font-normal justify-between">
                        <div className="flex items-center">
                          <HiOutlineUser class="text-[18px]" />
                          <p className="text-sm px-1 mr-4">
                            {hotel?.quantity_of_people} người
                          </p>
                          <AiOutlineExpandAlt class="text-[18px]" />
                          <p className="text-sm px-1">
                            {hotel?.acreage}m
                            <span className="text-[10px]">2</span>
                          </p>
                        </div>
                        <div className="flex items-center space-x-5">
                          <span className="flex items-center ">
                            <AiOutlineEye class="pr-1 text-[23px] font-medium" />
                            {hotel?.views}
                          </span>
                          <span className="flex items-center">
                            <AiOutlineLike class="pr-1 text-[23px] font-medium" />
                            {hotel?.likes}
                          </span>
                        </div>
                      </div>

                      <div className="justify-between flex items-center mt-10 space-x-2">
                        <div>
                          <p className=" text-left">
                            {" "}
                            Giá công bố:{" "}
                            <span className="font-semibold text-md text-gray-500">
                              {hotel?.price.toLocaleString("vi-VN")} đ
                            </span>{" "}
                          </p>
                          <p className=" flex justify-end items-center text-left space-x-2">
                            {" "}
                            <span className=""> Giá thành viên:</span>{" "}
                            <span className="font-semibold text-md ">
                              {hotel?.price.toLocaleString("vi-VN")} đ
                            </span>
                            <AiOutlineInfoCircle class="text-red-500" />{" "}
                          </p>
                          {/* ... */}
                        </div>
                        <div>
                          {/* <p>
                            {hotel.Total_rooms < 4 ? (
                              <span style={{ color: "red" }}>
                                Còn {hotel.Total_rooms} phòng
                              </span>
                            ) : (
                              <span>Còn {hotel.Total_rooms} phòng</span>
                            )}
                          </p> */}
                        </div>
                        <button
                          className="flex border px-5 py-2 mt-4 bg-[#2a398c] hover:bg-blue-800 text-white rounded-full font-medium"
                          onClick={() => handleRoomSelect(hotel)}
                        >
                          Chọn
                        </button>
                      </div>
                    </div>
                  </section>
                ))}
              </div>
            </div>
            <div className="booking-column ">
              <div className="border px-2 py-3 bg-gray-100 rounded my-3">
                <h1 className="text-lg font-bold ">Chuyến đi</h1>
              </div>
              <div className="border rounded px-2 py-4">
                <div>
                  <div className="flex items-center justify-between">
                    <h1 className="font-semibold text-lg">
                      {hotel_detail?.[0]?.name}
                    </h1>
                    <button className="text-sm text-blue-500 font-medium hover:underline">
                      Chỉnh sửa
                    </button>
                  </div>
                  <div className="border-b-2 pb-3">
                    <p className="text-sm pt-3 items-center flex  mb-1 text-gray-500 font-medium">
                      <AiOutlineCalendar class="text-lg mr-2" />
                      {date[0].toISOString().slice(0, 10)}
                      <AiOutlineArrowRight className="inline-block mx-2" />
                      {date[1].toISOString().slice(0, 10)}
                    </p>
                    <p className="text-sm pb-3 flex items-center text-gray-500 font-medium">
                      <AiOutlineSchedule class="text-lg mr-2" />
                      {differenceInDays(
                        parseISO(date[1].toISOString().slice(0, 10)),
                        parseISO(date[0].toISOString().slice(0, 10))
                      )}{" "}
                      Đêm
                    </p>
                  </div>
                </div>
                <div className="pb-6">
                  <h1 className="font-semibold text-lg pt-4">
                    Danh sách phòng đã chọn:
                  </h1>
                  {roomsToDisplay?.length > 0 ? (
                    <ul>
                      {roomsToDisplay?.map((room: any, index: any) => (
                        <li key={index} className="flex flex-col">
                          <div className="flex items-center justify-between">
                            <span className="text-base  mt-2 flex items-center text-gray-500 font-medium">
                              <AiOutlineForm class="text-lg mr-2" />
                              {room?.name} -{" "}
                              {room.price.toLocaleString("vi-VN")} đ{" "}
                              {room?.count > 1 ? `x${room?.count}` : ""}
                            </span>
                            <button
                              onClick={() => handleRemoveRoom(room)}
                              className="text-red-500 hover:text-red-500 focus:outline-none text-xl transition-transform transform scale-100 hover:scale-125"
                            >
                              <AiOutlineCloseCircle />
                            </button>
                          </div>
                          <span className="basis-1/3 mb-4 text-gray-500 font-medium border-b-2 pb-7">
                            <p className="text-sm pt-1 flex items-center">
                              <AiOutlineTeam class="text-lg mr-2" />
                              <p className="text-sm pb-3 text-gray-500 font-medium">
                                {numberPeople &&
                                  numberPeople?.filter(
                                    (item: any, index1: any) => index1 == index
                                  ).map(
                                    (
                                      { adults, children, infants }: any,
                                      index: any
                                    ) => (
                                      <div key={index}>
                                        Người lớn:{adults}, Trẻ em:{children},
                                        Em bé: {infants}
                                      </div>
                                    )
                                  )}
                              </p>
                            </p>
                          </span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    // Hiển thị dữ liệu từ local storage nếu không có phòng nào được chọn
                    <div>
                      {savedRoomInfo ? (
                        <p>
                          {savedRoomInfo.name} - {savedRoomInfo.price}vnđ
                        </p>
                      ) : (
                        <p>Không có phòng nào được chọn.</p>
                      )}
                    </div>
                  )}
                  <div className="flex items-center justify-between mt-3">
                    <h1 className="font-medium text-lg">Tổng cộng:</h1>
                    {totalPrice ? (
                      <h1 className="text-xl font-semibold text-yellow-500 ">
                        {(
                          totalPrice *
                          differenceInDays(
                            parseISO(date[1].toISOString().slice(0, 10)),
                            parseISO(date[0].toISOString().slice(0, 10))
                          )
                        ).toLocaleString("vi-VN")}
                        <span className="pl-1">đ</span>
                      </h1>
                    ) : (
                      <h1 className="text-xl font-semibold text-yellow-500 ">
                        {(
                          savedRoomInfo.price *
                          differenceInDays(
                            parseISO(date[1].toISOString().slice(0, 10)),
                            parseISO(date[0].toISOString().slice(0, 10))
                          )
                        ).toLocaleString("vi-VN")}
                        <span className="pl-1">đ</span>
                      </h1>
                    )}
                  </div>
                </div>

                <button
                  onClick={onHandSubmit}
                  className={`bg-[#e8952f] h-12 hover:bg-yellow-600 text-white text-lg font-medium rounded-full w-full ${
                    selectedRoomCount === parseInt(searchSlide?.numberRoom, 10)
                      ? ""
                      : "opacity-50 pointer-events-none" // Ẩn và vô hiệu hóa nút nếu chưa đủ số phòng
                  }`}
                >
                  Tiếp tục
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ChooseRoom;
