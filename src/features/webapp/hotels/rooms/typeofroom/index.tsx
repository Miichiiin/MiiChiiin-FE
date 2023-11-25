import  { useState } from "react";
import { BsPeople ,BsArrowsFullscreen,BsBricks,BsClipboardCheck,BsEye,BsHeart} from "react-icons/bs";
import { AiOutlineCalendar } from "react-icons/ai";
import { DatePicker, message } from "antd";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useGetCategory_homeQuery } from "@/api/webapp/category_home";
import { useGetHotel_homeByIdQuery } from "@/api/webapp/hotel_home";
import HeaderHotelType from "@/features/webapp/HotelType/HeaderHotelType";

const { RangePicker } = DatePicker;

const RoomTypes = () => {
  const { id: idHotel } = useParams();
  const { data: hotelData } = useGetHotel_homeByIdQuery(idHotel);
  const { data } = useGetCategory_homeQuery(idHotel);
  const navigate = useNavigate();

  const [selectedRange, setSelectedRange] = useState<
    [Date | null, Date | null]
  >([null, null]);

  const handleRangeChange = (dates: any) => {
    setSelectedRange([dates[0]?.toDate() || null, dates[1]?.toDate() || null]);
  };

  const handleButtonClick = () => {
    if (selectedRange[0] && selectedRange[1]) {
      console.log("Ngày bắt đầu:", selectedRange[0].toISOString().slice(0, 10));
      console.log(
        "Ngày kết thúc:",
        selectedRange[1].toISOString().slice(0, 10)
      );
      message.success("Chọn ngày thành công");
    } else {
      message.error("Vui lòng chọn một khoảng ngày.");
    }
  };

  interface Room {
    count: number;
    name: string;
    price: number;
  }

  const onHandSubmit = (index: any) => {
    if (selectedRange[0] && selectedRange[1]) {
      const updatedSelectedRooms = [
        {
          count: 1,
          name: data[index]?.name,
          price: data[index]?.price,
        },
      ];
      const encodedGuests = [`adults:1,children:0,infants:0`];
      const encodedSelectedRooms = 1;

      const hotel = `${idHotel}, ${hotelData?.[0]?.name}`;

      const url = `/choose-room/${hotel}/${selectedRange}/${encodedSelectedRooms}/${encodedGuests}`;
      navigate(url);
    } else {
      message.error(
        "Vui lòng chọn ngày check-in và check-out trước khi đặt phòng."
      );
    }
  };

  return (
    <div className="max-w-7xl mx-auto my-5">
      <br />
      <br />
      <br />
      <br />
      <br />
      <HeaderHotelType />
      <section className="">
        <h1 className="text-2xl flex justify-center items-center font-semibold pb-5 up">
          Các hạng phòng 
        </h1>
        <div className="flex justify-between">
          <div className="flex-grow ml-2 group relative ">
              <AiOutlineCalendar class="absolute top-4 start-0 z-10 w-10 h-5 text-gray-500 group-hover:text-[#e8952f]"/>
              <RangePicker
                className="w-[400px] text-[16px] h-[50px] border-gray-400 transition-all duration-300 ease-in-out hover:border-[#e8952f] hover:shadow-md "
                format="DD/MM/YYYY"
                separator=""
                onChange={handleRangeChange}
                disabledDate={(current) => {
                  return current && current.isBefore(new Date(), 'day');
                }}
                popupStyle={{ overflow: 'hidden' }}
                style={{ color: 'red', fontWeight: 'bold', paddingTop:"20px", paddingLeft:"45px"}}
              />
              <span className='absolute flex top-1 start-11 font-medium text-sm text-gray-500 group-hover:text-[#e8952f] '>Ngày nhận - Ngày trả</span>
            </div>
          </div>
        <div className="">
          {data?.map((roomType: any,) => (
            <section
              key={roomType.id}
              className="grid grid-cols-5 gap-2 px-2 py-3"
            >
              <div className="col-span-3 flex items-center">
                <img
                  src={roomType.image}
                  alt=""
                  className="w-[99%] h-[90%]  rounded-md"
                />
              </div>
              <div className="col-span-2 pt-8">
                <h1 className="text-2xl pb-4 font-medium">{roomType.name}</h1>
                <p className="pb-4">{roomType.description}</p>
                <h2 className="text-lg font-medium pb-6">Thông tin cơ bản</h2>
                <div className="grid grid-cols-3 gap-6">
                  <h1 className="flex items-center px-2 text-lg">
                    <BsArrowsFullscreen class="mr-2"/>
                    <span className="px-2 relative">
                      {roomType.acreage} m<span className="absolute top-[-3px]">2</span>
                    </span>
                  </h1>
                  <h1 className="flex items-center  text-base">
                    <BsPeople class="mr-2"/>
                    <span className="px-2">
                      {roomType.quantity_of_people} người
                    </span>
                  </h1>
                  <h1 className="flex items-center px-2 text-base">
                    <BsBricks class="mr-2"/>
                    <span className="px-2">{roomType.total_rooms} phòng</span>
                  </h1>
                  
                  <h1 className="flex items-center px-2 text-base">
                    <BsClipboardCheck class=""/>
                    <span className="px-2">
                      {roomType.total_comfort} tiện nghi
                    </span>
                  </h1>
                  <h1 className="flex items-center  text-base">
                    <BsEye class="mr-1"/>
                    <span className="px-2">
                      {roomType.total_comfort} lượt
                    </span>
                  </h1>
                  <h1 className="flex items-center px-2 text-base">
                    <BsHeart class="mr-1"/>
                    <span className="px-2">
                      {roomType.total_comfort} lượt
                    </span>
                  </h1>
                </div>
                <hr className="my-4" />
                <div className="flex  items-center">
                  <h1 className="font-semibold">Giá công bố ~ </h1>
                  <h1 className="text-sm">
                    <span className="font-semibold text-lg ml-1 text-[#e8952f]">
                      {roomType.price.toLocaleString('vi-VN')} đ
                    </span>
                  </h1>
                </div>

                <div className="flex justify-center items-center mt-6">
                  <button
                    className=" bg-[#e8952f]  hover:text-black font-medium hover:shadow-xl text-white px-4 py-3 rounded mx-2 w-full"
                    onClick={onHandSubmit}
                  >
                    Đặt ngay
                  </button>
                  <button className="border-2 border-[#e8952f] hover:bg-[#e8952f] text-[#e8952f] hover:text-white px-4 py-3 rounded w-full">
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
