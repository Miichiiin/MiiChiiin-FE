import { useState, useEffect, useRef } from "react";
import { Button, Form, DatePicker } from "antd";
import dayjs from "dayjs";
import {
  AiOutlineEnvironment,
  AiOutlineIdcard,
  AiOutlineMinus,
  AiOutlinePlus,
  AiOutlineUser,
  AiOutlineCalendar,
} from "react-icons/ai";

// import { addSearch } from '@/api/searchSlice';
import { isYesterday } from "date-fns";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "../../../../components/Css/index.css";

const { RangePicker } = DatePicker;

export const SearchHotel = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const [divClicked, setDivClicked] = useState(false);
  const [hotelsData, setHotelsData] = useState([]);

  const searchSlide = useParams();

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

  const [selectedRange, setSelectedRange] = useState(date);

  const [selectedHotel, setSelectedHotel] = useState(hotel[1]);

  const navigate = useNavigate();

  const dateFormat = "YYYY/MM/DD";
 
  type FieldType = {
    nameHotel?: string;
    password?: string;
    remember?: string;
  };

  const onHandSubmit = () => {
    const roomDetailsString = roomDetails1
      .map((details) => {
        return `adults:${details.adults},children:${details.children},infants:${details.infants}`;
      })
      .join("&");
    const url = `/choose-room/${selectedHotel}/${selectedRange}/${numberOfRooms1}/${roomDetailsString}`;
    navigate(url);
  };

  //chọn ten khách sạn
  const refCalen = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleDivClick = () => {
    setDivClicked(true);
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      !divClicked &&
      refCalen.current &&
      !refCalen.current.contains(event.target as Node)
    ) {
      setIsDropdownOpen(false);
    }
    setDivClicked(false);
  };

  const handleHotelSelect = (hotelName: any) => {
    setSelectedHotel(hotelName);
    setIsDropdownOpen(false);
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [divClicked]);

  // Sử dụng useEffect để gọi API khi component được mount
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/hotel") // Thay đổi đường dẫn dựa vào cấu hình của bạn
      .then((response) => {
        setHotelsData(response.data); // Lưu dữ liệu từ API vào state
      })
      .catch((error) => {
        console.error("Error fetching hotels data:", error);
      });
  }, []);
  //chọn ngày đặt
  const handleRangeChange = (dates: any) => {
    const selectedStartDate = dates[0]?.toDate() || null;
    const selectedEndDate = dates[1]?.toDate() || null;

    if (selectedStartDate && isYesterday(selectedStartDate)) {
      // Không thực hiện gì nếu ngày là ngày hôm qua
      return;
    } else {
      setSelectedRange([selectedStartDate, selectedEndDate]);
    }
  };

  /// Chọn số người
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
  //

  /*Tăng số lượng phòng*/
  // interface RoomDetail {
  //   adults: number;
  //   children: number;
  //   infants: number;
  // }
  const [numberOfRooms1, setNumberOfRooms1] = useState(
    Number(searchSlide.numberRoom)
  );
  const [roomDetails1, setRoomDetails1] = useState(numberPeople);

  const handleRoomChange1 = (value: number) => {
    if (value >= 1) {
      setNumberOfRooms1(value);

      // Tạo một bản sao của roomDetails1 để chỉnh sửa
      const updatedRoomDetails = [...roomDetails1];

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
  return (
    <div className="justify-center w-full  items-center h-[90px] ">
      <Form
        className="flex items-center  flex-wrap" // Thêm lớp flex-wrap để xử lý trường hợp tràn dòng
        name="basic"
        // labelCol={{ span: 8 }}
        // wrapperCol={{ span: 16 }}
        // style={{ maxWidth: 600 }}
        // initialValues={{ remember: true, nameHotel: selectedHotel }}
        // onFinish={onFinish}
        autoComplete="off"
      >
        <div className="flex items-center w-[1024px] mx-auto pt-4 ">
          <Form.Item<FieldType> name="nameHotel" className="flex-grow">
            <div ref={refCalen} onClick={handleDivClick} className="">
              <div
                onClick={toggleDropdown}
                className="relative cursor-pointer group"
              >
                <div
                  className=" border rounded border-[#e0e0e0] xl:w-[280px] xl:h-[57px] xl:pl-[55px] 
                  lg:w-[200px] lg:h-[55px] xl:text-[16px] lg:text-[11px] lg:pl-[40px] 
                  sm:w-[130px] h-[45px] sm:text-[10px] sm:pl-[38px] transition-all duration-300 ease-in-out hover:border-[#e8952f] hover:shadow-md"
                >
                  <span className="text-gray-700 absolute pt-[23px] font-medium text-[14px] mt-1">
                    {selectedHotel || "Bạn nhập nơi muốn đến..."}
                  </span>
                  <span className="absolute pt-1 text-sm  text-gray-500 group-hover:text-[#e8952f]">
                    Khách sạn - điểm đến
                  </span>
                </div>
                <span className="absolute mt-1 xl:start-[23px] lg:start-3 top-3 lg:text-[22px] text-[#b0b4b8] sm:start-4 group-hover:text-[#e8952f]">
                  <AiOutlineEnvironment className="text-gray-600"/>
                </span>
              </div>
              {isDropdownOpen && (
                <div className="absolute cursor-pointer z-20">
                  <div className="box-full rounded-md top-1 bg-white px-6 text-black flex grid-cols-4 w-[1050px] gap-[60px] absolute transition duration-2000">
                    {hotelsData.map((hotel: any) => (
                      <div key={hotel.id} className="leading-[45px]">
                        <span className="flex items-center space-x-2 text-[17px] hover:text-[#f2ba50] font-medium">
                          <AiOutlineEnvironment />
                          <span>{hotel.city_name}</span>
                        </span>
                        <button
                          className="text-[12px] hover:text-[#f2ba50]"
                          onClick={() => {
                            handleHotelSelect([hotel.id, hotel.name]);
                          }}
                        >
                          {hotel.name}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </Form.Item>

          <Form.Item className="flex-grow ml-2 group relative">
            <AiOutlineCalendar class="text-gray-600 absolute top-4 start-0 z-10 w-10 h-5 text-gray-500 group-hover:text-[#e8952f]" />
            <RangePicker
              className=" w-[260px] text-[16px] pt-5 h-[57px] px-10 border-[#e0e0e0] transition-all duration-300 ease-in-out hover:border-[#e8952f] hover:shadow-md "
              defaultValue={[
                dayjs(selectedRange[0].toISOString().slice(0, 10), dateFormat),
                dayjs(selectedRange[1].toISOString().slice(0, 10), dateFormat),
              ]}
              
              onChange={(datas) => handleRangeChange(datas)}
              disabledDate={(current) => {
                // Vô hiệu hóa các ngày hôm trước
                return current && current.isBefore(new Date(), "day");
              }}
              popupStyle={{ overflow: "hidden" }}
              style={{
                color: "black",
                fontWeight: "medium",
                position: "relative",
              }}
            />
            <span className="absolute flex top-1 start-11  text-sm text-gray-500 group-hover:text-[#e8952f] ">
              Ngày nhận - Ngày trả
            </span>
          </Form.Item>

          <Form.Item<FieldType> className="flex-grow ml-2">
            <button className="w-[310px]">
              <div
                className="group flex items-center border border-[#e0e0e0] px-5 py-1.5 relative text-[#b0b4b8] rounded transition-all duration-300 ease-in-out 
                  hover:border-[#e8952f] hover:shadow-md "
              >
                <span className="xl:text-[22px] lg:text-[19px] mr-2 group-hover:text-[#e8952f]">
                  <AiOutlineUser class="text-gray-600 "/>
                </span>
                <div onClick={handleDivClick1} className="lg:w-[170px]">
                  <div className="text-left text-[12px] xl:space-x-6 lg:space-x-3 lg:text-[13px] sm:text-[9px] sm:space-x-2  text-gray-700 group-hover:text-[#e8952f]">
                    <label
                      htmlFor=""
                      className="cursor-pointer text-gray-500 text-sm group-hover:text-[#e8952f]"
                    >
                      Số phòng - Số người
                    </label>
                    {/* <label htmlFor="" className='cursor-pointer pl-[20px] text-gray-500 text-sm'>Số người</label> */}
                  </div>
                  <div
                    onClick={toggleDropdown1}
                    className="text-left text-[10px] space-x-5 font-semibold text-[#353c46] h-[23px] w-[320px] cursor-pointer"
                  >
                    <label
                      htmlFor=""
                      className="cursor-pointer pl-0.5 text-gray-700 font-semibold "
                    >
                      {numberOfRooms1} Phòng
                    </label>
                    <label
                      htmlFor=""
                      className="cursor-pointer text-gray-700 font-semibold "
                    >
                      {roomDetails1.reduce(
                        (total, room) => total + room.adults,
                        0
                      )}{" "}
                      Người lớn -{" "}
                      {roomDetails1.reduce(
                        (total, room) => total + room.children,
                        0
                      )}{" "}
                      Trẻ em
                    </label>
                  </div>
                </div>
                <div ref={refCalen1}>
                  {isDropdownOpen1 && (
                    <div className="absolute mt-1 lg:w-[385px] sm:w-[340px] ml-[-20px] bg-white border border-gray-00 shadow-lg px-5 py-4 start-5 top-14 rounded-md ">
                      <div className="flex items-center justify-between cursor-pointer text-[15px] ">
                        <span className="font-medium text-gray-600">
                          Số phòng
                        </span>
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
                          <a href="" className="text-gray-600 font-medium">
                            {numberOfRooms1}
                          </a>
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
                        className={`max-h-[230px] w-auto  ${
                          shouldShowScroll
                            ? "overflow-y-scroll overflow-hidden"
                            : ""
                        }`}
                      >
                        {roomDetails1.map((room, index) => (
                          <div key={index} className="mt-3 ">
                            <p className="mb-2 mr-[260px] text-[14px] font-medium text-gray-600">
                              Phòng {index + 1}
                            </p>
                            <div className="flex items-center space-x-[42px] border-b-[1px] pb-5">
                              <span>
                                <h2 className="ml-3 mb-2 text-[12px] text-gray-600 font-medium">
                                  Người lớn
                                </h2>
                                <div className="flex items-center space-x-3 text-gray-600 font-medium">
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
                                <div className="flex items-center space-x-3 font-medium text-gray-600">
                                  <button
                                    onClick={() =>
                                      handleInfantChange1(
                                        index,
                                        room.infants - 1
                                      )
                                    }
                                    className="border border-gray-600 text-[12px] text-gray-600 px-1 py-1 rounded-full"
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
                      <p className="mt-3 text-gray-600 text-[12px] text-center font-medium">
                        *Em bé: Dưới 2 tuổi/ Trẻ em: Từ 2 - dưới 12 tuổi
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </button>
          </Form.Item>

          {/* <Form.Item className="flex-grow ml-2">
            <div className="flex items-center px-5 py-4 text-[#b0b4b8] lg:space-x-3 sm:space-x-[-10px] w-40 h-[57px] border border-[#e0e0e0] rounded">
              <span className="xl:text-[23px] lg:text-[16px] sm:text-[12px] mr-4 ">
                <AiOutlineIdcard />
              </span>
              <span className="xl:text-[14px] lg:text-[13px] sm:text-[8px] font-medium text-[#353c46]">
                Ưu đãi
              </span>
            </div>
          </Form.Item> */}

          <Form.Item className="flex-grow ml-2">
            <button
              type="submit"
              className="border text-white bg-[#e8952f] xl:text-center px-8 h-[57px] font-bold xl:text-[16px] lg:text-[16px] sm:text-[12px]
            hover:border-[#e8952f] hover:bg-[#f2ba50] transition-all duration-300 ease-in-out flex items-center justify-center rounded"
              onClick={onHandSubmit}
            >
              <span>Thay</span>
              <span className="ml-1">đổi</span>
            </button>
          </Form.Item>
        </div>
      </Form>
    </div>
  );
};
