import React, { useState } from "react";
import { BsPeople } from "react-icons/bs";
import { MdOutlineBed } from "react-icons/md";
import { DatePicker, message } from 'antd';
import { Link, useNavigate, useParams } from "react-router-dom";
import { useGetCategory_homeQuery } from "@/api/webapp/category_home";

const { RangePicker } = DatePicker;

const RoomTypes = () => {
  const { id:idHotel } = useParams();
  const { data, isLoading } = useGetCategory_homeQuery();
  console.log("data", data);
  const navigate = useNavigate()


  const [selectedRange, setSelectedRange] = useState<[Date | null, Date | null]>([null, null]);

  const handleRangeChange = (dates: any) => {
    setSelectedRange([dates[0]?.toDate() || null, dates[1]?.toDate() || null]);
  };

  const handleButtonClick = () => {
    if (selectedRange[0] && selectedRange[1]) {
      console.log('Ngày bắt đầu:', selectedRange[0].toISOString().slice(0, 10));
      console.log('Ngày kết thúc:', selectedRange[1].toISOString().slice(0, 10));
      message.success('Chọn ngày thành công');
    } else {
      message.error('Vui lòng chọn một khoảng ngày.');
    }
  };

  interface Room {
    count: number;
    name: string;
    price: number;
  }

  const onHandSubmit = (index: any) => {
    if (selectedRange[0] && selectedRange[1]) {
      const updatedSelectedRooms = [{
        count: 1,
        name: data[index]?.name,
        price: data[index]?.price
      }];
      const encodedGuests = [`adults:1,children:0,infants:0`];
      const encodedSelectedRooms = encodeURIComponent(JSON.stringify(updatedSelectedRooms));
  
      const hotel = `${data[1].hotel_id}, ${data[1].nameHotel}`
      console.log("hoteldl:",hotel)
      const url = `/choose-service/${hotel}/${selectedRange}/${encodedSelectedRooms}/${encodedGuests}`;
      console.log("url", url);
  
      navigate(url);
    } else {
      message.error('Vui lòng chọn ngày check-in và check-out trước khi đặt phòng.');
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto my-5">
      <section className="">
        <h1 className="text-2xl flex justify-center items-center font-semibold pb-5 up">
          Các hạng phòng
        </h1>
        <div className='flex justify-between'>
          <div>
            <RangePicker
              id='dateRange'
              placeholder={['Ngày Check-In', 'Ngày Check-Out']}
              onChange={handleRangeChange}
            />
          </div>
        </div>
        <div className="">
          {data?.map((roomType: any, index: number) => (
            <section
              key={roomType.id}
              className="grid grid-cols-5 gap-4 px-2 py-3"
            >
              <div className="col-span-2 flex items-center">
                <img
                  src={roomType.image}
                  alt=""
                  className="h-full rounded-md"
                />
              </div>
              <div className="col-span-3 pt-8">
                <h1 className="text-2xl pb-4">{roomType.name}</h1>
                <p className="pb-4">{roomType.description}</p>
                <div className="grid grid-cols-3 gap-8">
                  <h1 className="flex items-center px-4 text-xl">
                    <BsPeople />
                    <span className="px-2">
                      {roomType.quantity_of_people} người
                    </span>
                  </h1>
                  <h1 className="flex items-center px-4 text-xl">
                    <MdOutlineBed />
                    <span className="px-2">{roomType.bedType}</span>
                  </h1>
                  <h1 className="flex items-center px-4 text-xl">
                    <BsPeople />
                    <span className="px-2">
                      {roomType.quantity_of_people} người
                    </span>
                  </h1>
                  <h1 className="flex items-center px-4 text-xl">
                    <BsPeople />
                    <span className="px-2">
                      {roomType.quantity_of_people} người
                    </span>
                  </h1>
                </div>
                <hr className="my-4" />
                <div className="flex justify-between items-center">
                  <h1 className="font-semibold">Giá công bố</h1>
                  <h1 className="text-sm">
                    <span className="font-semibold text-lg">
                      {roomType.price} VNĐ
                    </span>
                  </h1>
                </div>

              <div className="flex justify-center items-center mt-6">
                <button
                  className="border-2 border-blue-500 bg-blue-500 hover:border-blue-700 hover:bg-blue-700 text-white px-4 py-3 rounded mx-2 w-full"
                  onClick={onHandSubmit} 
                >
                  Đặt ngay
                </button>
                <button className="border-2 border-blue-500 hover:bg-blue-500 text-blue-700 hover:text-white px-4 py-3 rounded w-full">
                  <Link
                    to={`/hotel/${idHotel}/rooms/detail/${roomType.id}?idroom=${roomType.id}`}
                  >
                    Xem thêm
                  </Link>
                </button>
              </div>
              </div>
            </section>
          ))}
        </div>
      </section>
    </div>
  );
};

export default RoomTypes;