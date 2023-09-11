import { useEffect, useState, useRef } from "react";
import { format, addDays, isBefore, startOfDay } from "date-fns";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import {  AiOutlineCalendar, AiOutlineUser, AiOutlineIdcard, AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import "../components/Css/index.css"
import SearchInput from "./SearchInput";
import SearchDay from "./SearchDay";
import { Link } from "react-router-dom";
const Search = () => {
  /*Hàm Dropdow*/
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [divClicked, setDivClicked] = useState(false); // Sử dụng để theo dõi việc bấm vào div
  const refCalen = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleDivClick = () => {
    setDivClicked(true); // Khi bấm vào div, đánh dấu rằng div đã được bấm
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (!divClicked && refCalen.current && !refCalen.current.contains(event.target as Node)) {
      setIsDropdownOpen(false);
    }
    setDivClicked(false); // Đặt lại trạng thái khi bấm ngoài div
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [divClicked]);
  //
 
  /*Tăng số lượng phòng*/
  interface RoomDetail {
    adults: number;
    children: number;
    infants: number;
  }
  const [numberOfRooms, setNumberOfRooms] = useState(1);
  const [roomDetails, setRoomDetails] = useState<RoomDetail[]>([{ adults: 1, children: 0, infants: 0 }]);

  const handleRoomChange = (value: number) => {
    if (value >= 1) {
      setNumberOfRooms(value);

      // Tạo một bản sao của roomDetails để chỉnh sửa
      const updatedRoomDetails: RoomDetail[] = [...roomDetails];

      // Nếu value tăng 1 so với phòng hiện tại, thêm các phòng mới
      while (updatedRoomDetails.length < value) {
        updatedRoomDetails.push({ adults: 1, children: 0, infants: 0 });
      }

      // Nếu value giảm, ẩn bớt các phòng thừa
      updatedRoomDetails.splice(value);

      setRoomDetails(updatedRoomDetails);
    }
  };

  const handleAdultChange = (roomIndex: number, value: number) => {
    if (value >= 1 && value <= 8) {
      const updatedRoomDetails = [...roomDetails];
      updatedRoomDetails[roomIndex].adults = value;
      setRoomDetails(updatedRoomDetails);
    }
  };

  const handleChildrenChange = (roomIndex: number, value: number) => {
    if (value >= 0 && value <= 4) {
      const updatedRoomDetails = [...roomDetails];
      updatedRoomDetails[roomIndex].children = value;
      setRoomDetails(updatedRoomDetails);
    }
  };

  const handleInfantChange = (roomIndex: number, value: number) => {
    if (value >= 0 && value <= 3) {
      const updatedRoomDetails = [...roomDetails];
      updatedRoomDetails[roomIndex].infants = value;
      setRoomDetails(updatedRoomDetails);
    }
  };
  /*Cuộn trang*/
  const shouldShowScroll = numberOfRooms > 1;
   
  return (
    <div>
      <div className="flex items-center xl:space-x-2 lg:justify-center xl:w-[1280px] xl:mx-auto mt-[-120px] lg:space-x-4 
          sm:justify-center sm:space-x-1">
        <SearchInput/>
        <SearchDay/>
        <button>
          <div className="flex items-center border border-[#e0e0e0] px-5 py-2 relative text-[#b0b4b8]">
            <span className="xl:text-[22px] lg:text-[19px] mr-4"><AiOutlineUser /></span>
            <div onClick={handleDivClick} className="lg:w-[170px]">
              <div className="xl:text-[12px] xl:space-x-7 lg:space-x-3 lg:text-[13px] sm:text-[9px] sm:space-x-2 font-medium">
                <label htmlFor="">Số phòng </label>
                <label htmlFor="">Số người </label>
              </div>
              <div onClick={toggleDropdown} className="xl:text-[14px] xl:space-x-7 lg:flex lg:text-[13px] lg:space-x-5 sm:text-[8px] font-medium text-[#353c46]">
                <label htmlFor="">{numberOfRooms} phòng</label>
                <label htmlFor="">{roomDetails.reduce((total, room) => total + room.adults, 0)} người -
                  {roomDetails.reduce((total, room) => total + room.children, 0)}
                </label>
              </div>
            </div>
            <div ref={refCalen}>
              {isDropdownOpen && (
                <div className="absolute  lg:w-[385px] sm:w-[340px] ml-[-20px]  bg-white border border-gray-300 shadow-lg px-5 py-4 start-5 top-14 ">
                  <div className="flex items-center justify-between cursor-pointer text-[15px]">
                    <span className="font-medium text-[#353c46]">Số phòng</span>
                    <div className="flex items-center space-x-4">
                      {numberOfRooms > 1 && (
                        <button
                          onClick={() => handleRoomChange(numberOfRooms - 1)}
                          className="border border-gray-600 text-gray-600 px-1 py-1 rounded-full"
                        >
                          <AiOutlineMinus />
                        </button>
                      )}
                      <a className="text-[#353c46] font-medium" href="">{numberOfRooms}</a>
                      <button
                        onClick={() => handleRoomChange(numberOfRooms + 1)}
                        className="border border-gray-600 text-gray-600 px-1 py-1 rounded-full"
                      >
                        <AiOutlinePlus />
                      </button>
                    </div>
                  </div>
                  <hr className="text-gray-300 mt-3" />
                  <div className={`max-h-[230px] w-auto  ${shouldShowScroll ? 'overflow-y-scroll overflow-hidden' : ''}`}>
                    {roomDetails.map((room, index) => (
                      <div key={index} className="mt-3 ">
                        <p className="mb-2 mr-[260px] text-[14px] font-medium text-[#353c46]">Phòng {index + 1}</p>
                        <div className="flex items-center space-x-[42px] border-b-[1px] pb-5">
                          <span>
                            <h2 className="ml-3 mb-2 text-[12px] text-gray-600 font-medium">Người lớn</h2>
                            <div className="flex items-center space-x-3">
                              <button
                                onClick={() => handleAdultChange(index, room.adults - 1)}
                                className="border border-gray-600 text-[12px] text-gray-600 px-1 py-1 rounded-full"
                              >
                                <AiOutlineMinus />
                              </button>
                              <a className="text-[#353c46] font-medium" href="">{room.adults}</a>
                              <button
                                onClick={() => handleAdultChange(index, room.adults + 1)}
                                className="border border-gray-600 text-[12px] text-gray-600 px-1 py-1 rounded-full"
                              >
                                <AiOutlinePlus />
                              </button>
                            </div>
                          </span>
                          <span>
                            <h2 className="ml-3 mb-2 text-[13px] text-gray-600 font-medium" >Trẻ em</h2>
                            <div className="flex items-center space-x-3">
                              <button
                                onClick={() => handleChildrenChange(index, room.children - 1)}
                                className="border border-gray-600 text-[12px] text-gray-600 px-1 py-1 rounded-full"
                              >
                                <AiOutlineMinus />
                              </button>
                              <a className="text-[#353c46] font-medium" href="">{room.children}</a>
                              <button
                                onClick={() => handleChildrenChange(index, room.children + 1)}
                                className="border border-gray-600 text-[12px] text-gray-600 px-1 py-1 rounded-full"
                              >
                                <AiOutlinePlus />
                              </button>
                            </div>
                          </span>
                          <span>
                            <h2 className="ml-3 mb-2 text-[13px] text-gray-600 font-medium">Em bé</h2>
                            <div className="flex items-center space-x-3">
                              <button
                                onClick={() => handleInfantChange(index, room.infants - 1)}
                                className="border border-gray-600 text-[12px] text-gray-600 px-1 py-1 rounded-full"
                              >
                                <AiOutlineMinus />
                              </button>
                              <a className="text-[#353c46] font-medium" href="">{room.infants}</a>
                              <button
                                onClick={() => handleInfantChange(index, room.infants + 1)}
                                className="border border-gray-600 text-[12px] text-gray-600 px-1 py-1 rounded-full"
                              >
                                <AiOutlinePlus />
                              </button>
                            </div>
                          </span>
                        </div>

                      </div>
                    ))}
                  </div>
                  <p className="mt-3 text-gray-400 text-[12px] mr-[60px]">*Em bé: Dưới 2 tuổi/ Trẻ em: Từ 2 - dưới 12 tuổi</p>
                </div>
              )}
            </div>
          </div>
        </button>
        <div className="flex items-center border border-[#e0e0e0] px-5 py-4 text-[#b0b4b8] lg:space-x-3 sm:space-x-[-10px]">
          <span className="xl:text-[23px] lg:text-[16px] sm:text-[12px] mr-4"><AiOutlineIdcard /></span>
          <span className="xl:text-[14px] lg:text-[13px] sm:text-[8px] font-medium text-[#353c46]">Ưu đãi</span>
        </div>
        <Link to={'/choose-room'}><button className="text-white bg-[#e8952f] px-6 py-[17.5px] font-medium xl:text-[13px] lg:text-[13px] sm:text-[7px]">Tìm Kiếm</button></Link>
      </div>

    </div>
  )
}

export default Search