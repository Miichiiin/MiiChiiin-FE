import  { CSSProperties, useEffect, useRef, useState } from "react";
import { BsPeople ,BsArrowsFullscreen,BsBricks,BsClipboardCheck,BsEye,BsHeart} from "react-icons/bs";
import { AiOutlineCalendar ,AiOutlineUser,AiOutlineClose,AiOutlineMinus,AiOutlinePlus} from "react-icons/ai";
import { DatePicker, message } from "antd";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useGetCategory_homeQuery } from "@/api/webapp/category_home";
import { useGetHotel_homeByIdQuery } from "@/api/webapp/hotel_home";
import HeaderHotelType from "@/features/webapp/HotelType/HeaderHotelType";
import Footer from "@/components/Footer";
import FadeLoader from "react-spinners/HashLoader";
const { RangePicker } = DatePicker;

const RoomTypes = () => {
  const { id: idHotel } = useParams();
  const { data: hotelData } = useGetHotel_homeByIdQuery(idHotel);  
  const { data } = useGetCategory_homeQuery(idHotel); 
  //loading trang
  const [loading,setLoading] = useState(false);
  useEffect(() =>{
    setLoading(true)
    setTimeout(() =>{
      if (data && data.length > 0) {
        setLoading(false);
      }
    })
  },[data]);  
  const override: CSSProperties = {
    display: "flex",
    position:"fixed",
    top: "45%",
    left: "50%",
    transform: "translate(-50%, -50%)", 
  };   
  const navigate = useNavigate();

  const [selectedRange, setSelectedRange] = useState<
    [Date | null, Date | null]
  >([null, null]);
  const [roomDetails1, setRoomDetails1] = useState<RoomDetail[]>([
    { adults: 1, children: 0, infants: 0 },
  ]);
  const [numberOfRooms1, setNumberOfRooms1] = useState(1);

  const handleRangeChange = (dates: any) => {
    setSelectedRange([dates[0]?.toDate() || null, dates[1]?.toDate() || null]);
  };


  const onHandSubmit = () => {
    if (selectedRange[0] && selectedRange[1]) {

      const encodedGuests =  roomDetails1?.map((details) => {
        return `adults:${details.adults},children:${details.children},infants:${details.infants}`;
      })
      .join("&");
      const encodedSelectedRooms = numberOfRooms1;

      const hotel = `${idHotel}, ${hotelData?.[0]?.name}`;

      const url = `/choose-room/${hotel}/${selectedRange}/${encodedSelectedRooms}/${encodedGuests}`;
      navigate(url);
    } else {
      message.error(
        "Vui lòng chọn ngày check-in và check-out trước khi đặt phòng."
      );
    }
  };
// form đặt ngày
 /*Hàm Dropdow*/
 const [isDropdownOpen1, setIsDropdownOpen1] = useState(false);
 const [divClicked1, setDivClicked1] = useState(false); // Sử dụng để theo dõi việc bấm vào div
 const refCalen1 = useRef<HTMLDivElement>(null);

 const toggleDropdown1 = () => {
   setIsDropdownOpen1(!isDropdownOpen1);
 };

 const handleDivClick1 = () => {
   setDivClicked1(true); // Khi bấm vào div, đánh dấu rằng div đã được bấm
   setIsDropdownOpen1(!isDropdownOpen1);
 };
 const handleClickOutside1 = (event: MouseEvent) => {
  if (
    !divClicked1 &&
    refCalen1.current &&
    !refCalen1.current.contains(event.target as Node)
  ) {
    setIsDropdownOpen1(false);
  }
  setDivClicked1(false); // Đặt lại trạng thái khi bấm ngoài div
};

useEffect(() => {
  document.addEventListener("click", handleClickOutside1);

  return () => {
    document.removeEventListener("click", handleClickOutside1);
  };
}, [divClicked1]);
   /*Tăng số lượng phòng*/
   interface RoomDetail {
    adults: number;
    children: number;
    infants: number;
  }

  

  const handleRoomChange1 = (value: number) => {
    if (value >= 1) {
      setNumberOfRooms1(value);

      // Tạo một bản sao của roomDetails1 để chỉnh sửa
      const updatedRoomDetails: RoomDetail[] = [...roomDetails1];

      // Nếu value tăng 1 so với phòng hiện tại, thêm các phòng mới
      while (updatedRoomDetails.length < value) {
        updatedRoomDetails.push({ adults: 1, children: 0, infants: 0 });
      }

      // Nếu value giảm, ẩn bớt các phòng thừa
      updatedRoomDetails.splice(value);

      setRoomDetails1(updatedRoomDetails);
    }
  };

  const handleAdultChange1 = (roomIndex: number, value: number) => {
    if (value >= 1 && value <= 4) {
      const updatedRoomDetails = [...roomDetails1];
      updatedRoomDetails[roomIndex].adults = value;
      setRoomDetails1(updatedRoomDetails);
    }
  };

  const handleChildrenChange1 = (roomIndex: number, value: number) => {
    if (value >= 0 && value <= 3) {
      const updatedRoomDetails = [...roomDetails1];
      updatedRoomDetails[roomIndex].children = value;
      setRoomDetails1(updatedRoomDetails);
    }
  };

  const handleInfantChange1 = (roomIndex: number, value: number) => {
    if (value >= 0 && value <= 2) {
      const updatedRoomDetails = [...roomDetails1];
      updatedRoomDetails[roomIndex].infants = value;
      setRoomDetails1(updatedRoomDetails);
    }
  };
   /*Cuộn trang*/
   const shouldShowScroll = numberOfRooms1 > 1;
// hết phần chọn phòng
//
/*Hàm Dropdow đặt phòng*/
const [isDropdownOpen, setIsDropdownOpen] = useState(false);
const dropdownRef = useRef<HTMLDivElement>(null);

const toggleDropdown = () => {
  setIsDropdownOpen(!isDropdownOpen);
  setIsScrollLocked(false);
};
const closeOpen = () =>{
  setIsDropdownOpen(!isDropdownOpen)
  setIsScrollLocked(false)
}
useEffect(() => {
  const handleClickOutside = (event:MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      // setIsDropdownOpen(false);
      setIsScrollLocked(false)
    }
  };

  document.addEventListener("mousedown", handleClickOutside);

  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
}, []);
/*Khóa cuộn trang*/
const [isScrollLocked, setIsScrollLocked] = useState(false);

useEffect(() => {
  if (isScrollLocked) {
    document.documentElement.style.overflow = "hidden"; // Khóa cuộn trang
  } else {
    document.documentElement.style.overflow = "auto"; // Cho phép cuộn trang
  }

  return () => {
    document.documentElement.style.overflow = "auto"; // Đảm bảo rằng cuộn trang đã được kích hoạt trở lại khi component bị unmount
  };
}, [isScrollLocked]);
  //srollto
  const [userInteracted] = useState(false);
  useEffect(() => {
    if (!userInteracted) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [userInteracted]); 

  
  return (
    <div>
      {
        loading ?
          <div className="relative">
            <FadeLoader 
            color="#d7ba37"
            loading={loading}
            cssOverride={override}
            // size={40}
            // aria-label="Loading Spinner"
            // data-testid="loader"
            className="animate-pulse absolute z-10"
            />
        </div>
      :
      <div>
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
            {/* <div className="flex justify-between">
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
              </div> */}
            <div className="">
              {data?.map((roomType: any,) => (
                <section
                  key={roomType.id}
                  className="grid grid-cols-5 gap-2 px-2 py-3"
                >
                  <div className="col-span-3 flex items-center mb-5">
                    <img
                      src={roomType.image}
                      alt=""
                      className="w-[99%] h-[400px] rounded-md"
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
                        // onClick={onHandSubmit}
                        onClick={toggleDropdown}
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
                    <div className="" ref={dropdownRef}>
                    {isDropdownOpen && (
                      <div className={`fixed  top-0 bg-gray-200 z-40 w-[41.2%] h-full transform transition-transform 
                          ${isDropdownOpen ? 'translate-x-0' : 'translate-x-full'} duration-700 ease-in`}
                      >
                        <div className="bg-gray-800 text-white h-[250px] pt-[180px] px-14">
                          
                          <span className="">
                            <div className="flex items-center justify-between">
                              <h2 className="text-2xl font-medium">Khách sạn {hotelData?.[0]?.name}</h2>
                              <button onClick={closeOpen} className="hover:scale-105 duration-300 text-xl"><AiOutlineClose /></button>
                            </div> 
                            <h2>{roomType.name}</h2>
                          </span>
                        </div>
                        <div className="px-14 py-10">
                          <div className="flex-grow ml-2 group relative">
                            <AiOutlineCalendar class="absolute top-4 start-0 z-10 w-10 h-5 text-gray-500 group-hover:text-[#e8952f]"/>
                            <RangePicker
                              className="w-[400px] text-[16px] h-[50px] border-gray-400 transition-all duration-300 ease-in-out hover:border-[#e8952f] hover:shadow-md "
                              format="DD/MM/YYYY"
                              separator=""
                              onChange={handleRangeChange}
                              onClick={(e) => e.stopPropagation()}
                              disabledDate={(current) => {
                                return current && current.isBefore(new Date(), 'day');
                              }}
                              popupStyle={{ overflow: 'hidden' }}
                              style={{ color: 'red', fontWeight: 'bold', paddingTop:"20px", paddingLeft:"45px"}}
                            />
                            <span className='absolute flex top-1 start-11 font-medium text-sm text-gray-500 group-hover:text-[#e8952f] '>Ngày nhận - Ngày trả</span>
                          </div>
                          <button className='w-[415px] px-2 pt-4 ' >
                            <div className="group flex items-center bg-white border border-gray-400 h-[50px] px-2 py-1.5 relative text-[#b0b4b8] rounded transition-all 
                              duration-300 ease-in-out hover:border-[#e8952f] hover:shadow-md " 
                            >
                              <span className="xl:text-[20px] lg:text-[19px] mr-3 group-hover:text-[#e8952f] text-gray-500">
                                <AiOutlineUser />
                              </span>
                              <div onClick={handleDivClick1} className="lg:w-[170px]">
                                <div className="xl:text-[12px] xl:space-x-6 lg:space-x-3 lg:text-[13px] sm:text-[9px] text-gray-700 sm:space-x-2 font-semibold ">
                                  <label htmlFor="" className='cursor-pointer group-hover:text-[#e8952f] ml-[-35px] text-sm font-medium text-gray-500'>Số phòng - Số người</label>
                                </div>
                                <div
                                  onClick={toggleDropdown1}
                                  className="xl:text-[14px] xl:space-x-7 lg:flex lg:text-[13px] lg:space-x-5 sm:text-[8px] font-medium text-[#353c46] w-[320px] cursor-pointer "
                                >
                                  <label htmlFor="" className='cursor-pointer '>{numberOfRooms1} phòng </label>
                                  <label htmlFor="" className=' cursor-pointer text-gray-700 font-semibold'>
                                    {roomDetails1.reduce((total, room) => total + room.adults, 0)}{" "}
                                    người lớn - {" "}
                                    {roomDetails1.reduce((total, room) => total + room.children, 0)}{" "}
                                    trẻ em
                                  </label>
                                </div>
                              </div>
                              <div ref={refCalen1}>
                                {isDropdownOpen1 && (
                                  <div className="absolute mt-1 lg:w-[400px] sm:w-[340px] ml-[-20px]  bg-white border border-gray-300 shadow-lg px-5 py-4 start-5 top-14 hover:block rounded-md">
                                      <div className="flex items-center justify-between cursor-pointer text-[15px]">
                                      <span className="font-medium text-gray-700">Số phòng</span>
                                      <div className="flex items-center space-x-4">
                                        {numberOfRooms1 > 1 && (
                                          <button
                                            onClick={() =>
                                              handleRoomChange1(numberOfRooms1 - 1)
                                            }
                                            className="border border-gray-600 text-gray-600 px-1 py-1 rounded-full"
                                          >
                                            <AiOutlineMinus />
                                          </button>
                                        )}
                                        <a className='text-gray-600 font-medium' href="">{numberOfRooms1}</a>
                                        <button
                                          onClick={() =>
                                            handleRoomChange1(numberOfRooms1 + 1)
                                          }
                                          className="border border-gray-600 text-gray-600 px-1 py-1 rounded-full"
                                        >
                                          <AiOutlinePlus />
                                        </button>
                                      </div>
                                      </div>
                                      <hr className="text-gray-600 mt-3" />
                                      <div
                                        className={`max-h-[230px] w-auto  ${shouldShowScroll
                                          ? "overflow-y-scroll overflow-hidden"
                                          : ""
                                          }`}
                                      >
                                        {roomDetails1?.map((room, index) => (
                                          <div key={index} className="mt-3 ">
                                            <p className="mb-2 mr-[260px] text-[14px] font-bold text-gray-600">
                                              Phòng {index + 1}
                                            </p>
                                            <div className="flex items-center space-x-[42px] border-b-[1px] pb-5">
                                              <span>
                                                <h2 className="ml-3 mb-2 text-[12px] text-gray-600 font-medium">
                                                  Người lớn
                                                </h2>
                                                <div className="flex items-center space-x-3 font-medium text-gray-600">
                                                  <button
                                                    onClick={() =>
                                                      handleAdultChange1(index, room.adults - 1)
                                                    }
                                                    className="border border-gray-600 text-[12px] text-gray-600 px-1 py-1 rounded-full"
                                                  >
                                                    <AiOutlineMinus />
                                                  </button>
                                                  <a href="">{room.adults}</a>
                                                  <button
                                                    onClick={() =>
                                                      handleAdultChange1(index, room.adults + 1)
                                                    }
                                                    className="border border-gray-600 text-[12px] text-gray-600 px-1 py-1 rounded-full"
                                                  >
                                                    <AiOutlinePlus />
                                                  </button>
            
                                                </div>
                                              </span>
                                              <span>
                                                <h2 className="ml-3 mb-2 text-[13px] text-gray-600 font-medium">
                                                  Trẻ em
                                                </h2>
                                                <div className="flex items-center space-x-3 text-gray-600 font-medium">
                                                  <button
                                                    onClick={() =>
                                                      handleChildrenChange1(
                                                        index,
                                                        room.children - 1
                                                      )
                                                    }
                                                    className="border border-gray-600 text-[12px] text-gray-600 px-1 py-1 rounded-full"
                                                  >
                                                    <AiOutlineMinus />
                                                  </button>
                                                  <a href="">{room.children}</a>
                                                  <button
                                                    onClick={() =>
                                                      handleChildrenChange1(
                                                        index,
                                                        room.children + 1
                                                      )
                                                    }
                                                    className="border border-gray-600 text-[12px] text-gray-600 px-1 py-1 rounded-full"
                                                  >
                                                    <AiOutlinePlus />
                                                  </button>
            
                                                </div>
                                              </span>
                                              <span>
                                                <h2 className="ml-3 mb-2 text-[13px] text-gray-600 font-medium">
                                                  Em bé
                                                </h2>
                                                <div className="flex items-center space-x-3 text-gray-600 font-medium ">
                                                  <button
                                                    onClick={() =>
                                                      handleInfantChange1(
                                                        index,
                                                        room.infants - 1
                                                      )
                                                    }
                                                    className="border border-gray-600 text-[12px] text-gray-400 px-1 py-1 rounded-full"
                                                  >
                                                    <AiOutlineMinus />
                                                  </button>
                                                  <a href="">{room.infants}</a>
                                                  <button 
                                                    onClick={() =>
                                                      handleInfantChange1(
                                                        index,
                                                        room.infants + 1
                                                      )
                                                    }
                                                    className="border border-gray-600 text-[12px] text-gray-600 px-1 py-1 rounded-full "
                                                  >
                                                    <AiOutlinePlus />
                                                  </button>
            
                                                </div>
                                              </span>
                                            </div>
                                          </div>
                                        ))}
                                      </div>
                                      <p className="mt-3 text-gray-600 text-[12px] text-center font-medium ">
                                        *Em bé: Dưới 2 tuổi/ Trẻ em: Từ 2 - dưới 12 tuổi
                                      </p>
                                  </div>
                                )}
                              </div>
                            </div>
                          </button>
                          <button onClick={() => onHandSubmit()} className="bg-[#e8952f] w-[400px] ml-2 mt-4 py-3 rounded text-white font-medium  hover:shadow-xl">Tìm kiếm</button>
                        </div>
                      </div>
                    )}
                  </div>
                  </div>
                </section>
              ))}
            </div>
          </section>
        </div>
        <Footer/>
      </div>
      }
    </div>
  );
};

export default RoomTypes;
