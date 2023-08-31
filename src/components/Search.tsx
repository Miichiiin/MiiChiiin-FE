import { useEffect, useState, useRef } from "react";
import { format, addDays, isBefore, startOfDay } from "date-fns";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { AiOutlineEnvironment ,AiOutlineCalendar,AiOutlineUser,AiOutlineIdcard,AiOutlinePlus,AiOutlineMinus} from "react-icons/ai";

const Search = () => {
  /*chọn ngày*/
  const [calendar, setCalendar] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 1),
      key: "selection",
    },
  ]);
  const [isOpen, setIsOpen] = useState(false);
  const refCalen = useRef<HTMLDivElement>(null);

  const out = (event: any) => {
    if (refCalen.current && !refCalen.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", out, true);
    return () => {
      document.removeEventListener("click", out, true);
    };
  }, []);

  const handleDateChange = (item: any) => {
    // Kiểm tra xem ngày bắt đầu và ngày kết thúc có nằm trong quá khứ hay không
    if (isBefore(item.selection.startDate, startOfDay(new Date())) || isBefore(item.selection.endDate, startOfDay(new Date()))) {
      return; // Không cho phép chọn ngày trong quá khứ
    }

    setCalendar([item.selection]);
  };
  const disabledDay = (date: Date) => {
    const today = startOfDay(new Date());
    return isBefore(date, today); // Vô hiệu hóa các ngày trong quá khứ
  };
  //
    /*Hàm Dropdow*/ 
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);     
  };
    // const out2 = (event: any) => {
    //   if (refCalen.current && !refCalen.current.contains(event.target)) {
    //     setIsDropdownOpen(false);
    //   }
    // };
    // useEffect(() => {
    //   document.addEventListener("click", out2, true);
    //   return () => {
    //     document.removeEventListener("click", out2, true);
    //   };
    // }, []);
  
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
        <div className="flex items-center xl:space-x-2 lg:justify-center xl:w-[1280px] xl:mx-auto mt-[-120px] lg:space-x-4 lg:justify-center
          sm:justify-center  
        ">
           <div className="relative">
              <input className=" border z-0 border-[#e0e0e0] xl:w-[400px] xl:h-[55px] xl:pl-[55px] 
                    lg:w-[200px] lg:h-[55px] xl:text-[16px] lg:text-[11px] lg:pl-[40px] 
                    sm:w-[180px] h-[45px] sm:text-[10px] sm:pl-[38px]" 
                    type="text" placeholder="Nhập khách sạn mà bạn muốn đến ..."/>
              <span className="absolute mt-1 xl:start-[23px] lg:start-3 top-3 lg:text-[22px] text-[#b0b4b8] sm:start-4"><AiOutlineEnvironment/></span>
           </div>
            <div className="flex items-center border border-[#e0e0e0] px-5 py-2 text-[#b0b4b8]">
                <span className="xl:text-[22px] mr-4 lg:text-[22px] sm:text-[12px]"><AiOutlineCalendar/></span>
                <div>
                    <div className="xl:text-[12px]  lg:space-x-8 sm:space-x-5 sm:text-[10px] font-medium">
                        <label htmlFor="">Ngày đến</label>
                        <label htmlFor="">Ngày đi</label> 
                    </div>
                    <div className="xl:text-[12px] lg:text-[12px] lg:flex sm:text-[10px] sm:flex relative">
                      <input className="outline-none font-medium text-[14px] text-[#353c46]"
                          value={`${format(calendar[0].startDate, "dd-MM-yyyy")} - ${format(
                            calendar[0].endDate,
                            "dd-MM-yyyy"
                          )}`}
                          onClick={() => setIsOpen(true)}
                        />
                        <div ref={refCalen} className="absolute top-7">
                          {isOpen && (
                            <DateRange
                              onChange={handleDateChange}
                              editableDateInputs={true}
                              moveRangeOnFirstSelection={false}
                              ranges={calendar}
                              months={2}
                              showMonthAndYearPickers={false}
                              showDateDisplay={false}
                              showMonthArrow={true}
                              minDate={startOfDay(new Date())}
                              disabledDay={disabledDay}
                              direction="horizontal"
                            />
                          )}
                        </div>
                    </div>
                </div>
                
            </div>
            <button>
            <div  className="flex items-center border border-[#e0e0e0] px-5 py-2 relative text-[#b0b4b8]">
                <span className="xl:text-[22px] lg:text-[19px] mr-4"><AiOutlineUser/></span>
                <div onClick={toggleDropdown} className="w-[170px]">
                  <div className="xl:text-[12px] xl:space-x-7 lg:space-x-3 lg:text-[13px] font-medium">
                    <label htmlFor="">Số phòng </label>
                    <label htmlFor="">Số người </label>
                  </div>
                  <div className="xl:text-[14px] xl:space-x-7 lg:flex lg:text-[13px] lg:space-x-5 font-medium text-[#353c46]">
                    <label htmlFor="">{numberOfRooms} phòng</label>
                    <label htmlFor="">{roomDetails.reduce((total, room) => total + room.adults , 0)} người - 
                      {roomDetails.reduce((total, room) => total +  room.children , 0)}
                    </label>
                  </div>
                </div>
                {isDropdownOpen && (
                    <div className="absolute  w-[380px] ml-[-20px]  bg-white border border-gray-300 shadow-lg px-5 py-4 top-14 ">
                    <div className="flex items-center justify-between cursor-pointer text-[15px]">
                        <span className="font-medium">Số phòng</span>
                        <div className="flex items-center space-x-4">
                          {numberOfRooms > 1 && (
                            <button
                              onClick={() => handleRoomChange(numberOfRooms - 1)}
                              className="border border-gray-400 text-gray-400 px-1 py-1 rounded-full"
                            >
                              <AiOutlineMinus />
                            </button>
                          )}
                          <a href="">{numberOfRooms}</a>
                          <button
                            onClick={() => handleRoomChange(numberOfRooms + 1)}
                            className="border border-gray-400 text-gray-400 px-1 py-1 rounded-full"
                          >
                            <AiOutlinePlus />
                          </button>
                        </div>
                      </div>
                        <hr className="text-gray-300 mt-3"/>
                    <div  className={`max-h-[230px] w-auto  ${shouldShowScroll ? 'overflow-y-scroll overflow-hidden' : ''}`}>
                    {roomDetails.map((room, index) => (
                      <div key={index} className="mt-3 ">
                        <p className="mb-2 mr-[260px] text-[14px] font-medium">Phòng {index + 1}</p>
                        <div className="flex items-center space-x-[42px] border-b-[1px] pb-5">
                        <span>
                              <h2 className="ml-3 mb-2 text-[12px] text-gray-400">Người lớn</h2>
                              <div className="flex items-center space-x-3">
                                  <button
                                  onClick={() => handleAdultChange(index, room.adults + 1)}
                                  className="border border-gray-400 text-[12px] text-gray-400 px-1 py-1 rounded-full"
                                  >
                                  <AiOutlinePlus />
                                  </button>
                                  <a  href="">{room.adults}</a>
                                  <button
                                  onClick={() => handleAdultChange(index, room.adults - 1)}
                                  className="border border-gray-400 text-[12px] text-gray-400 px-1 py-1 rounded-full"
                                  >
                                  <AiOutlineMinus />
                                  </button>
                              </div>
                          </span>
                          <span>
                              <h2 className="ml-3 mb-2 text-[13px] text-gray-400">Trẻ em</h2>
                              <div className="flex items-center space-x-3">
                                  <button
                                  onClick={() => handleChildrenChange(index, room.children + 1)}
                                  className="border border-gray-400 text-[12px] text-gray-400 px-1 py-1 rounded-full"
                                  >
                                  <AiOutlinePlus />
                                  </button>
                                  <a href="">{room.children}</a>
                                  <button
                                  onClick={() => handleChildrenChange(index, room.children - 1)}
                                  className="border border-gray-400 text-[12px] text-gray-400 px-1 py-1 rounded-full"
                                  >
                                  <AiOutlineMinus />
                                  </button>
                              </div>
                              </span>
                              <span>
                              <h2 className="ml-3 mb-2 text-[13px] text-gray-400">Em bé</h2>
                              <div className="flex items-center space-x-3">
                                  <button
                                  onClick={() => handleInfantChange(index, room.infants + 1)}
                                  className="border border-gray-400 text-[12px] text-gray-400 px-1 py-1 rounded-full"
                                  >
                                  <AiOutlinePlus />
                                  </button>
                                  <a href="">{room.infants}</a>
                                  <button
                                  onClick={() => handleInfantChange(index, room.infants - 1)}
                                  className="border border-gray-400 text-[12px] text-gray-400 px-1 py-1 rounded-full"
                                  >
                                  <AiOutlineMinus />
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
            </button>
            <div className="flex items-center border border-[#e0e0e0] px-5 py-4 space-x-3 text-[#b0b4b8]">
              <span className="xl:text-[23px] lg:text-[16px] mr-4"><AiOutlineIdcard/></span>
              <span className="xl:text-[14px] lg:text-[13px] font-medium text-[#353c46]">Ưu đãi</span>
            </div>
            <button className="text-white bg-[#e8952f] px-6 py-[17.5px] xl:text-[13px] font-medium  lg:text-[13px]">Tìm Kiếm</button>
        </div>
                  
    </div>
  )
}

export default Search
