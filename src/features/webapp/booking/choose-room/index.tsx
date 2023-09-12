import { useState } from "react";
import { GrLocation } from "react-icons/gr";
import { HiOutlineUser } from "react-icons/hi";


import {
  AiOutlineExpandAlt,
  AiOutlineInfoCircle,
  AiOutlineArrowRight,
} from "react-icons/ai";
import HeaderHotelType from "src/features/webapp/HotelType/HeaderHotelType";

// import { SearchQuickHotel } from "@/components/SearchQuickHotel";

import { SearchHotel } from "./searchHotel";
import { useGetCategory_homeQuery } from "@/api/webapp/category_home";
import { useAppSelector } from "@/app/hook";
import { useGetHotel_homeByIdQuery } from "@/api/webapp/hotel_home";
import { Link } from "react-router-dom";



const ChooseRoom = () => {
  const { data: hotels } = useGetCategory_homeQuery();
  const [selectedRooms, setSelectedRooms] = useState<any>([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const searchSlide = useAppSelector((state: any) => state.searchSlice?.items);
  const {data: hotel_detail} = useGetHotel_homeByIdQuery(searchSlide[0]?.nameHotel?.[0])
  console.log("hotel_detail",hotel_detail);
  



 

  const handleRoomSelect = (selectedHotel: any) => {
    setSelectedRooms([...selectedRooms, selectedHotel]);
    const price = selectedHotel.price;
    setTotalPrice(totalPrice + price);
    // Đánh dấu rằng đã chọn phòng
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
              <p className="text-lg py-2">
                {hotel_detail?.description}
              </p>
              <Link
                to="/hotel"
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
                    Chọn phòng: <span>{selectedRooms.length}/1</span>
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
                      <div className="justify-end flex items-center">
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
                    <h1 className="font-semibold">
                      Vinpearl WonderWorld Phú Quốc
                    </h1>
                    <button className="text-sm">Chỉnh sửa</button>
                  </div>
                  <p className="text-sm pt-3 items-center flex">
                    Chủ Nhật, Th08 27, 2023  
                    <AiOutlineArrowRight className="inline-block mx-1" />
                    Thứ Ba, Th08 29, 2023
                  </p>
                  <p className="text-sm pb-3">02 Đêm</p>
                </div>
                <hr className="my-4" />
                <div className="pb-6">
                  <h1 className="font-semibold">Danh sách phòng đã chọn:</h1>
                  <ul>
                    {uniqueSelectedRooms.map((room: any, index: any) => (
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
                  <hr className="my-2" />
                  <div className="flex items-center justify-between">
                    <h1 className="font-semibold">Tổng cộng:</h1>
                    <h1 className="text-xl font-bold text-yellow-500">
                      {totalPrice}vnđ
                    </h1>
                  </div>
                </div>
                <button className="bg-yellow-500 hover:bg-yellow-600 text-white py-3 px-2 text-lg font-bold rounded-full w-full">
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
