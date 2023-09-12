import { useState, useEffect, useRef } from 'react';
import { Button, Form, DatePicker } from 'antd';
import { Navigate, useNavigate } from 'react-router-dom';
import {
  AiOutlineEnvironment,
  AiOutlineIdcard,
  AiOutlineMinus,
  AiOutlinePlus,
  AiOutlineUser,
} from 'react-icons/ai';
import axios from 'axios';
import { useAppDispatch } from '@/app/hook';
import { addSearch } from '@/api/searchSlice';
import { isYesterday } from 'date-fns';


const { RangePicker } = DatePicker;


export const SearchQuickHotel = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedHotel, setSelectedHotel] = useState('');
  const [divClicked, setDivClicked] = useState(false);
  const [hotelsData, setHotelsData] = useState([]);
  const dispatch = useAppDispatch();
  const [selectedRange, setSelectedRange] = useState<[Date | null, Date | null]>([null, null]);
  const navigate = useNavigate();

  // const onFinish = (values: any) => {
  //   const newValue = {
  //     ...values,
  //     nameHotel: selectedHotel,
  //     // check_in: selectedRange[0]?.toISOString().slice(0, 10),
  //     // check_out: selectedRange[1]?.toISOString().slice(0, 10),
  //     date: selectedRange,
  //     numberRoom: numberOfRooms1,
  //     numberPeople: roomDetails1,
  //   };
  //   console.log("valuenew",newValue)
  //   dispatch(addSearch(newValue));
  //   // navigate("/choose-room")
  //   console.log("Giatri:",values)
  // };

  const onHandSubmit = () => {
    const newValue = {
      nameHotel: selectedHotel,
      check_in: selectedRange[0]?.toISOString().slice(0, 25),
      check_out: selectedRange[1]?.toISOString().slice(0, 25),
      date: selectedRange,
      numberRoom: numberOfRooms1,
      numberPeople: roomDetails1,
    };
    console.log("valuenew", newValue)
    dispatch(addSearch(newValue));
    navigate("/choose-room")

  }

  type FieldType = {
    nameHotel?: string;
    password?: string;
    remember?: string;
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
      .get("http://localhost:3000/hotel_home") // Thay đổi đường dẫn dựa vào cấu hình của bạn
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
  interface RoomDetail {
    adults: number;
    children: number;
    infants: number;
  }
  const [numberOfRooms1, setNumberOfRooms1] = useState(1);
  const [roomDetails1, setRoomDetails1] = useState<RoomDetail[]>([
    { adults: 1, children: 0, infants: 0 },
  ]);

  console.log("số phòng", numberOfRooms1);
  console.log("số người", roomDetails1);

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
    if (value >= 1 && value <= 8) {
      const updatedRoomDetails = [...roomDetails1];
      updatedRoomDetails[roomIndex].adults = value;
      setRoomDetails1(updatedRoomDetails);
    }
  };

  const handleChildrenChange1 = (roomIndex: number, value: number) => {
    if (value >= 0 && value <= 4) {
      const updatedRoomDetails = [...roomDetails1];
      updatedRoomDetails[roomIndex].children = value;
      setRoomDetails1(updatedRoomDetails);
    }
  };

  const handleInfantChange1 = (roomIndex: number, value: number) => {
    if (value >= 0 && value <= 3) {
      const updatedRoomDetails = [...roomDetails1];
      updatedRoomDetails[roomIndex].infants = value;
      setRoomDetails1(updatedRoomDetails);
    }
  };
  /*Cuộn trang*/
  const shouldShowScroll = numberOfRooms1 > 1;
  return (
    <div className="ml-36">
      <Form
        className="flex items-center w-full flex-wrap" // Thêm lớp flex-wrap để xử lý trường hợp tràn dòng
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true, nameHotel: selectedHotel }}
        // onFinish={onFinish}
        autoComplete="off"
      >
        <div className="flex items-center w-full">
          <Form.Item<FieldType>
            name="nameHotel"
            className="flex-grow"
          // rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <div ref={refCalen} onClick={handleDivClick}>
              <div onClick={toggleDropdown} className="relative">
                <div
                  className="border z-0 border-[#e0e0e0] xl:w-[400px] xl:h-[55px] xl:pl-[55px] 
                        lg:w-[200px] lg:h-[55px] xl:text-[16px] lg:text-[11px] lg:pl-[40px] 
                        sm:w-[130px] h-[45px] sm:text-[10px] sm:pl-[38px]"
                >
                  <span className="text-[#b0b4b8] absolute top-4">
                    {selectedHotel || "Bạn nhập nơi muốn đến..."}
                  </span>
                </div>
                <span className="absolute mt-1 xl:start-[23px] lg:start-3 top-3 lg:text-[22px] text-[#b0b4b8] sm:start-4">
                  <AiOutlineEnvironment />
                </span>
              </div>
              {isDropdownOpen && (
                <div className="absolute">
                  <div className="box-full rounded-md top-1 bg-white px-6 py 6 text-black flex grid-cols-4 w-[1050px] gap-[60px] absolute transition duration-2000">
                    {hotelsData.map((hotel: any) => (
                      <div key={hotel.id} className="leading-[45px]">
                        <span className="flex items-center space-x-2 text-[17px] hover:text-[#f2ba50]">
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

          <Form.Item className="flex-grow ml-2 ">
            <RangePicker
              style={{
                width: '280px',
                fontSize: '16px',
                height: '55px',
                borderRadius: '0',
              }}
              format="DD/MM/YYYY "
              onChange={handleRangeChange}
              disabledDate={(current) => {
                // Vô hiệu hóa các ngày hôm trước
                return current && current.isBefore(new Date(), 'day');
              }}
            />
          </Form.Item>

          <Form.Item<FieldType> className="flex-grow ml-2">
            <button>
              <div className="flex items-center border border-[#e0e0e0] px-5 py-1.5 relative text-[#b0b4b8] ">
                <span className="xl:text-[22px] lg:text-[19px] mr-4">
                  <AiOutlineUser />
                </span>
                <div onClick={handleDivClick1} className="lg:w-[170px]">
                  <div className="xl:text-[12px] xl:space-x-7 lg:space-x-3 lg:text-[13px] sm:text-[9px] sm:space-x-2 font-medium">
                    <label htmlFor="">Số phòng </label>
                    <label htmlFor="">Số người </label>
                  </div>
                  <div
                    onClick={toggleDropdown1}
                    className="xl:text-[14px] xl:space-x-7 lg:flex lg:text-[13px] lg:space-x-5 sm:text-[8px] font-medium text-[#353c46]"
                  >
                    <label htmlFor="">{numberOfRooms1} phòng</label>
                    <label htmlFor="">
                      {roomDetails1.reduce(
                        (total, room) => total + room.adults,
                        0
                      )}{" "}
                      người -
                      {roomDetails1.reduce(
                        (total, room) => total + room.children,
                        0
                      )}
                    </label>
                  </div>
                </div>
                <div ref={refCalen1}>
                  {isDropdownOpen1 && (
                    <div className="absolute  lg:w-[385px] sm:w-[340px] ml-[-20px]  bg-white border border-gray-300 shadow-lg px-5 py-4 start-5 top-14 ">
                      <div className="flex items-center justify-between cursor-pointer text-[15px]">
                        <span className="font-medium">Số phòng</span>
                        <div className="flex items-center space-x-4">
                          {numberOfRooms1 > 1 && (
                            <button
                              onClick={() =>
                                handleRoomChange1(numberOfRooms1 - 1)
                              }
                              className="border border-gray-400 text-gray-400 px-1 py-1 rounded-full"
                            >
                              <AiOutlineMinus />
                            </button>
                          )}
                          <a href="">{numberOfRooms1}</a>
                          <button
                            onClick={() =>
                              handleRoomChange1(numberOfRooms1 + 1)
                            }
                            className="border border-gray-400 text-gray-400 px-1 py-1 rounded-full"
                          >
                            <AiOutlinePlus />
                          </button>
                        </div>
                      </div>
                      <hr className="text-gray-300 mt-3" />
                      <div
                        className={`max-h-[230px] w-auto  ${shouldShowScroll
                            ? "overflow-y-scroll overflow-hidden"
                            : ""
                          }`}
                      >
                        {roomDetails1.map((room, index) => (
                          <div key={index} className="mt-3 ">
                            <p className="mb-2 mr-[260px] text-[14px] font-medium">
                              Phòng {index + 1}
                            </p>
                            <div className="flex items-center space-x-[42px] border-b-[1px] pb-5">
                              <span>
                                <h2 className="ml-3 mb-2 text-[12px] text-gray-400">
                                  Người lớn
                                </h2>
                                <div className="flex items-center space-x-3">
                                  <button
                                    onClick={() =>
                                      handleAdultChange1(index, room.adults + 1)
                                    }
                                    className="border border-gray-400 text-[12px] text-gray-400 px-1 py-1 rounded-full"
                                  >
                                    <AiOutlinePlus />
                                  </button>
                                  <a href="">{room.adults}</a>
                                  <button
                                    onClick={() =>
                                      handleAdultChange1(index, room.adults - 1)
                                    }
                                    className="border border-gray-400 text-[12px] text-gray-400 px-1 py-1 rounded-full"
                                  >
                                    <AiOutlineMinus />
                                  </button>
                                </div>
                              </span>
                              <span>
                                <h2 className="ml-3 mb-2 text-[13px] text-gray-400">
                                  Trẻ em
                                </h2>
                                <div className="flex items-center space-x-3">
                                  <button
                                    onClick={() =>
                                      handleChildrenChange1(
                                        index,
                                        room.children + 1
                                      )
                                    }
                                    className="border border-gray-400 text-[12px] text-gray-400 px-1 py-1 rounded-full"
                                  >
                                    <AiOutlinePlus />
                                  </button>
                                  <a href="">{room.children}</a>
                                  <button
                                    onClick={() =>
                                      handleChildrenChange1(
                                        index,
                                        room.children - 1
                                      )
                                    }
                                    className="border border-gray-400 text-[12px] text-gray-400 px-1 py-1 rounded-full"
                                  >
                                    <AiOutlineMinus />
                                  </button>
                                </div>
                              </span>
                              <span>
                                <h2 className="ml-3 mb-2 text-[13px] text-gray-400">
                                  Em bé
                                </h2>
                                <div className="flex items-center space-x-3">
                                  <button
                                    onClick={() =>
                                      handleInfantChange1(
                                        index,
                                        room.infants + 1
                                      )
                                    }
                                    className="border border-gray-400 text-[12px] text-gray-400 px-1 py-1 rounded-full"
                                  >
                                    <AiOutlinePlus />
                                  </button>
                                  <a href="">{room.infants}</a>
                                  <button
                                    onClick={() =>
                                      handleInfantChange1(
                                        index,
                                        room.infants - 1
                                      )
                                    }
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
                      <p className="mt-3 text-gray-400 text-[12px] mr-[60px]">
                        *Em bé: Dưới 2 tuổi/ Trẻ em: Từ 2 - dưới 12 tuổi
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </button>
          </Form.Item>

          <Form.Item className="border border-[#e0e0e0] ml-2">
            <div className="flex items-center px-5 py-4 text-[#b0b4b8] lg:space-x-3 sm:space-x-[-10px] w-40 h-18">
              <span className="xl:text-[23px] lg:text-[16px] sm:text-[12px] mr-4 ">
                <AiOutlineIdcard />
              </span>
              <span className="xl:text-[14px] lg:text-[13px] sm:text-[8px] font-medium text-[#353c46]">
                Ưu đãi
              </span>
            </div>
          </Form.Item>

          <Form.Item className="flex-grow ml-2">
            <Button
              htmlType="submit"
              className="text-white bg-[#e8952f] px-10 py-7 font-bold text-center xl:text-[16px] lg:text-[16px] sm:text-[12px] "
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "0", // Áp dụng borderRadius thành 0
              }}
              onClick={onHandSubmit}
            >
              Tìm kiếm
            </Button>
          </Form.Item>
        </div>
      </Form>
    </div>
  );
};
