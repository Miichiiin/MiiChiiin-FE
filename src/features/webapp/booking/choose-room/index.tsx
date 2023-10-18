import { useEffect, useState } from "react";
import { GrLocation } from "react-icons/gr";
import { HiOutlineUser } from "react-icons/hi";
import {
  AiOutlineExpandAlt,
  AiOutlineInfoCircle,
  AiOutlineArrowRight,
} from "react-icons/ai";
import HeaderHotelType from "src/features/webapp/HotelType/HeaderHotelType";
import { SearchHotel } from "./searchHotel";
import { useGetCategory_homeQuery } from "@/api/webapp/category_home";
// import { useAppSelector } from "@/app/hook";
import { useGetHotel_homeByIdQuery } from "@/api/webapp/hotel_home";
import { Link, useNavigate, useParams } from "react-router-dom";
import { differenceInDays, parseISO } from "date-fns";
import { Button } from "antd";

const ChooseRoom = () => {
  const { data: hotels } = useGetCategory_homeQuery();
  const [selectedRooms, setSelectedRooms] = useState<any>([]);
  const [totalPrice, setTotalPrice] = useState<any>(0);
  const searchSlide = useParams();
  console.log("search", searchSlide)
  // const [isRoomSelected, setIsRoomSelected] = useState(false);
  const [selectedRoomCount, setSelectedRoomCount] = useState(0);
  console.log("hotelds", hotels);

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
  console.log("numberPeople", numberPeople);

  let date: Date[] = [];
  if (searchSlide && searchSlide.date) {
    const timeArray = searchSlide.date.split(",");
    date = timeArray.map((time) => new Date(time));
  }
  console.log("date1", date);

  let hotel: string[] = [];
  if (searchSlide && searchSlide.nameHotel) {
    hotel = searchSlide.nameHotel.split(",");
  }

  const { data: hotel_detail } = useGetHotel_homeByIdQuery(hotel[0]);

  console.log("khách sạn", hotel);

// Lấy dữ liệu từ localStorage

const handleRoomSelect = (selectedHotel: any) => {
  // Kiểm tra xem số lượng phòng đã chọn có vượt quá giới hạn không
  if (
    searchSlide &&
    typeof searchSlide.numberRoom === 'string' &&
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
        'selectedRooms',
        JSON.stringify([...selectedRooms, selectedHotel])
      );
      localStorage.setItem('totalPrice', (totalPrice + price).toString());
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

  const uniqueSelectedRooms = selectedRooms.reduce((acc: any, room: any) => {
    // Kiểm tra xem phòng đã tồn tại trong danh sách chưa
    const existingRoom = acc.find((r: any) => r.id === room.id);
  
    // Nếu phòng đã tồn tại, tăng số lượng
    if (existingRoom) {
      existingRoom.count++;
    } else {
      // Nếu không, thêm phòng vào danh sách mới
      acc.push({ ...room, count: 1 });
    }
  
    return acc;
  }, []);
  
// Lấy dữ liệu từ local storage
const savedRoomInfoJSON = localStorage.getItem('roomInfo');
const savedRoomInfo = savedRoomInfoJSON ? JSON.parse(savedRoomInfoJSON) : [];



// Sử dụng dữ liệu từ local storage nếu có hoặc fallback là uniqueSelectedRooms
const roomsToDisplay = uniqueSelectedRooms.length > 0 ? uniqueSelectedRooms : savedRoomInfo;
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
      price: totalPrice
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

  return (
    <div>
      <div className="mb-[150px]">
        <HeaderHotelType />
      </div>
      <SearchHotel />
      <div className="max-w-7xl mx-auto">
        <div className="max-w-5xl mx-auto my-5">
          <section className="border grid grid-cols-3 gap-4 px-2 py-3">
            <div className="">
              <img
                src="https://booking-static.vinpearl.com/hotels/3144cb44bcad401c92d99f97466e682e_s%E1%BA%A3nh%20dis-1-002.jpg"
                alt=""
                className="w-full rounded-md"
              />
            </div>
            <div className="col-span-2">
              <a className="text-xl hover:underline font-semibold ">
                {hotel_detail?.name}
              </a>
              <div className="flex items-center py-4">
                <GrLocation />
                <p className="text-sm pl-4">
                  Địa chỉ: {hotel_detail?.city_name}
                </p>
              </div>
              <p className="text-lg py-2">{hotel_detail?.description}</p>
              <Link
                to={`/hotel/${hotel_detail?.id}`}
                className="font-semibold text-blue-700 hover:text-blue-500 hover:underline"
              >
                {" "}
                Xem chi tiết{" "}
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
                      {selectedRooms.length}/{searchSlide.numberRoom}
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
                        src="https://booking-static.vinpearl.com/hotels/3144cb44bcad401c92d99f97466e682e_s%E1%BA%A3nh%20dis-1-002.jpg"
                        alt=""
                        className="w-full h-full rounded-md"
                      />
                    </div>
                    <div className="col-span-2">
                      <a className="text-xl hover:underline">{hotel?.name}</a>
                      <div className="flex items-center py-4">
                        <HiOutlineUser />
                        <p className="text-sm px-2">
                          {hotel?.quantity_of_people} người
                        </p>
                        <AiOutlineExpandAlt />
                        <p className="text-sm px-2">
                          {hotel?.acreage}m
                          <span className="text-[10px]">2</span>
                        </p>
                      </div>
                      <p className=" text-right">
                        {" "}
                        Giá công bố:{" "}
                        <span className="font-semibold text-lg">
                          {hotel?.price}vnđ
                        </span>{" "}
                      </p>
                      <p className=" flex justify-end items-center">
                        <AiOutlineInfoCircle />{" "}
                        <span className="px-2"> Giá thành viên:</span>{" "}
                        <span className="font-semibold text-xl">
                          {hotel?.reduced_price}vnđ
                        </span>{" "}
                      </p>
                      {/* ... */}
                      <div className="justify-between flex items-center">
                        <div>
                          <p>
                            {hotel.total_rooms < 4 ? (
                              <span style={{ color: "red" }}>
                                Còn {hotel.total_rooms} phòng
                              </span>
                            ) : (
                              <span>Còn {hotel.total_rooms} phòng</span>
                            )}
                          </p>
                        </div>
                        <button
                          className="flex border px-8 py-3 mt-4 bg-blue-500 hover:bg-blue-600 text-white rounded-full"
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
            <div className="booking-column">
              <div className="border px-2 py-3 bg-gray-100 rounded my-3">
                <h1 className="text-lg font-bold ">Chuyến đi</h1>
              </div>
              <div className="border rounded px-2 py-4">
                <div>
                  <div className="flex items-center justify-between">
                    <h1 className="font-semibold">{hotel_detail?.name}</h1>
                    <button className="text-sm">Chỉnh sửa</button>
                  </div>
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
                <hr className="my-4" />
                <div className="pb-6">
    <h1 className="font-semibold">Danh sách phòng đã chọn:</h1>
    {roomsToDisplay.length > 0 ? (
      <ul>
        {roomsToDisplay.map((room: any, index: any) => (
          <li key={index} className="flex flex-col">
            <div className="flex items-center justify-between">
              <span className="basis-2/3">
                {room.name} - {room.price}vnđ{" "}
                {room.count > 1 ? `x${room.count}` : ""}
              </span>
              <button
                onClick={() => handleRemoveRoom(room)}
                className="text-red-500 hover:text-red-500 focus:outline-none"
              >
                x
              </button>
            </div>
            <span className="basis-1/3">
              <p className="text-sm pt-3">2 Người lớn, 2 Trẻ em</p>
              <hr className="my-4" />
            </span>
          </li>
        ))}
      </ul>
    ) : (
      // Hiển thị dữ liệu từ local storage nếu không có phòng nào được chọn
      <div>
        {savedRoomInfo ? (
          <p>{savedRoomInfo.name} - {savedRoomInfo.price}vnđ</p>
        ) : (
          <p>Không có phòng nào được chọn.</p>
        )}
      </div>
    )}
    <hr className="my-2" />
    <div className="flex items-center justify-between">
  <h1 className="font-semibold">Tổng cộng:</h1>
  {totalPrice ? (
    <h1 className="text-xl font-bold text-yellow-500">
      {totalPrice * differenceInDays(
        parseISO(date[1].toISOString().slice(0, 10)),
        parseISO(date[0].toISOString().slice(0, 10))
      )}vnđ
    </h1>
  ) : (
    <h1 className="text-xl font-bold text-yellow-500">
      {savedRoomInfo.price * differenceInDays(
        parseISO(date[1].toISOString().slice(0, 10)),
        parseISO(date[0].toISOString().slice(0, 10))
      )}vnđ
    </h1>
  )}
</div>
  </div>

                <Button
                  onClick={onHandSubmit}
                  className={`bg-yellow-500 hover:bg-yellow-600 text-white text-lg font-bold rounded-full w-full ${selectedRoomCount === parseInt(searchSlide?.numberRoom, 10)
                      ? ""
                      : "opacity-50 pointer-events-none" // Ẩn và vô hiệu hóa nút nếu chưa đủ số phòng
                    }`}
                >
                  Tiếp tục
                </Button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ChooseRoom;
