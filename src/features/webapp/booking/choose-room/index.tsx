import React, { useState } from "react";
import { GrLocation } from "react-icons/gr";
import { HiOutlineUser } from "react-icons/hi";
import {
  AiOutlineExpandAlt,
  AiOutlineInfoCircle,
  AiOutlineArrowRight,
} from "react-icons/ai";
import HeaderHotelType from "src/features/webapp/HotelType/HeaderHotelType";
import { useGetCategory_homeQuery } from "@/api/category_home";
import { SearchQuickHotel } from "@/components/SearchQuickHotel";
import { SearchHotel } from "./searchHotel";

const ChooseRoom = () => {
  const { data: hotels } = useGetCategory_homeQuery();
  const [selectedRooms, setSelectedRooms] = useState<any>([]);
  const [totalPrice, setTotalPrice] = useState(0);


  const handleRoomSelect = (selectedHotel: any) => {
    setSelectedRooms([...selectedRooms, selectedHotel]);
    const price = selectedHotel.price;
    setTotalPrice(totalPrice + price);
// Đánh dấu rằng đã chọn phòng
  };

  return (
    <div>
      <div className="mb-[150px]">
        <HeaderHotelType />
      </div>
       <SearchHotel/>
      <div className="max-w-7xl mx-auto">
        <div className="max-w-5xl mx-auto my-5">
          <section className="border grid grid-cols-3 gap-4 px-2 py-3">
            <div className=''>
              <img src='https://booking-static.vinpearl.com/hotels/3144cb44bcad401c92d99f97466e682e_s%E1%BA%A3nh%20dis-1-002.jpg' alt='' className='w-full rounded-md' />
            </div>
            <div className='col-span-2'>
              <a className='text-xl hover:underline font-semibold '>Vinpearl WonderWorld Phú Quốc</a>
              <div className='flex items-center py-4'>
                <GrLocation />
                <p className='text-sm pl-4'>Địa chỉ: Bãi Dài, Gành Dầu, Phú Quốc, Kiên Giang</p>
              </div>
              <p className='text-lg py-2'>
                Thiết kế của những biệt thự tại Vinpearl Wonderworld Phú Quốc tôn vinh sự riêng tư với những khoảng sân vườn rộng và khoáng đạt bên ngoài khung cửa. Khu nghỉ dưỡng sở hữu bãi biển riêng và địa hình tiếp giáp sân golf trong rừng nguyên sinh độc đáo mang đến nhiều trải nghiệm nghỉ dưỡng cho mỗi du khách yêu thích
              </p>
              <a href="" className='font-semibold text-blue-700 hover:text-blue-500 hover:underline'> Xem chi tiết  </a>
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
                    <div className='image'>
                    <img src='https://booking-static.vinpearl.com/hotels/3144cb44bcad401c92d99f97466e682e_s%E1%BA%A3nh%20dis-1-002.jpg' alt='' className='w-full h-full rounded-md' />
                  </div>
                  <div className='col-span-2'>
                    <a className='text-xl hover:underline'>{hotel?.name}</a>
                    <div className='flex items-center py-4'>
                      <HiOutlineUser />
                      <p className='text-sm px-2'>{hotel?.quantity_of_people} người</p>
                      <AiOutlineExpandAlt />
                      <p className='text-sm px-2'>{hotel?.acreage}m<span className='text-[10px]'>2</span></p>
                    </div>
                    <p className=' text-right'> Giá công bố: <span className='font-semibold text-lg'>{hotel?.price}vnđ</span>  </p>
                    <p className=' flex justify-end items-center'><AiOutlineInfoCircle /> <span className='px-2'> Giá thành viên:</span> <span className='font-semibold text-xl'>{hotel?.reduced_price}vnđ</span>  </p>
                    {/* ... */}
                    <div className='justify-end flex items-center'>
                      <button className='flex border px-8 py-3 mt-4 bg-blue-500 hover:bg-blue-600 text-white rounded-full'  onClick={() => handleRoomSelect(hotel)}>
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
                  <div className='flex items-center justify-between'>
                    <h1 className='font-semibold'>
                      Vinpearl WonderWorld Phú Quốc
                    </h1>
                      <button className='text-sm'>Chỉnh sửa</button>
                    
                  </div>
                  <p className='text-sm pt-3 items-center flex'>Chủ Nhật, Th08 27, 2023
                    <AiOutlineArrowRight className='inline-block mx-1' />
                    Thứ Ba, Th08 29, 2023</p>
                  <p className='text-sm pb-3'>02 Đêm</p>
                </div>
                 <hr className='my-4' />
                <div className='pb-6'>
                  <h1 className='font-semibold'>Danh sách phòng đã chọn:</h1>
                  <ul>
                    {selectedRooms.map((room: any, index: number) => (
                      <li key={index} className="flex flex-col">
                      <span className="basis-2/3">
                        {room.name} -  {room.price}vnđ
                        
                      </span>
                      <span className="basis-1/3">
                       
                      <p className='text-sm pt-3'>2 Người lớn, 2 Trẻ em</p>
                      <hr className='my-4' />
                      </span>
                      
                    </li>
                    ))}
                  </ul>
                  <hr className='my-2' />
                  <div className='flex items-center justify-between'>
                    <h1 className='font-semibold'>
                      Tổng cộng:
                    </h1>
                    <h1 className='text-xl font-bold text-yellow-500'>{totalPrice}vnđ</h1>
                  </div>
                </div>
                <button className='bg-yellow-500 hover:bg-yellow-600 text-white py-3 px-2 text-lg font-bold rounded-full w-full'>Tiếp tục</button>
                

              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ChooseRoom;
