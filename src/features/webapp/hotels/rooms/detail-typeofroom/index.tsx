import {
  AiOutlineClose,
  AiOutlineInfoCircle,
  AiOutlineEye,
  AiOutlineLeft,
  AiOutlineRight,
  AiOutlineWifi,
  AiOutlineCalendar,
  AiOutlineUser,
  AiOutlineMinus,
  AiOutlinePlus,
} from "react-icons/ai";
import {
  BsPeople,
  BsChevronCompactRight,
  BsChevronCompactLeft,
  BsArrowsFullscreen,
} from "react-icons/bs";
import { CSSProperties, useEffect, useRef, useState } from "react";
import Modal from "react-modal";
import { useNavigate, useParams } from "react-router-dom";
import "../../../../../components/Css/datePicker.css";
import { Link } from "react-router-dom";
import { DatePicker, message } from "antd";
import { useGetCategory_detailQuery } from "@/api/webapp/category_home";
import { useGetHotel_homeByIdQuery } from "@/api/webapp/hotel_home";
import { useAddRate_homeMutation } from "@/api/webapp/comment_home";
import { useGetRating_homeQuery } from "@/api/webapp/rates_home";
import { useLikeDetailRoomMutation } from "@/api/bookingUser";
import Slider, { Settings } from "react-slick";
import HeaderHotelType from "@/features/webapp/HotelType/HeaderHotelType";
import Footer from "@/components/Footer";
import FadeLoader from "react-spinners/HashLoader";
const { RangePicker } = DatePicker;

const DetailTypeofRoom = () => {
  const { idHotel, idRoom } = useParams();
  const { data } = useGetCategory_detailQuery({
    id: idRoom,
    id_hotel: idHotel,
  });
  const dataImage = data?.[0]?.imageUrl;
  
  const likeStart = data?.[0]?.likes;
  const [like, setLike] = useState();
  useEffect(() => {
    if (likeStart !== undefined) {
      setLike(likeStart);
    }
  }, [likeStart]);
  const [roomRating, setRoomRating] = useState(0); // đánh giá

  const { data: hotelData } = useGetHotel_homeByIdQuery(idHotel);

  const navigate = useNavigate();
  const [addRate] = useAddRate_homeMutation();
  const dataLogin = localStorage.getItem("user");
  const isLoggedIn = !!dataLogin; // kiểm tra login
  const dataToken = localStorage.getItem("token");
  const { data: dataRate } = useGetRating_homeQuery(idRoom);
  //loading trang
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState([]);

  useEffect(() => {
    if (hotelData) {
      console.log(hotelData?.[0]);

      setImages(hotelData?.[0]?.image);
    }
  }, [hotelData]);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      if (data && data.length > 0) {
        setLoading(false);
      }
    });
  }, [data]);
  const override: CSSProperties = {
    display: "flex",
    position: "fixed",
    top: "45%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  };
  const dataComment = dataRate?.filter(
    (comment: any) => comment.id_category === parseInt(String(idRoom))
  );

  const [roomDetails1, setRoomDetails1] = useState<RoomDetail[]>([
    { adults: 1, children: 0, infants: 0 },
  ]);

  const [numberOfRooms1, setNumberOfRooms1] = useState(1);

  // Check xem có token chưa
  const [commentText, setCommentText] = useState("");
  const canComment = !!dataToken;

  // Danh sách từ không thích hợp
  const inappropriateWords = ["mẹ", "óc chó"];

  // Hàm kiểm tra từ không thích hợp
  const containsInappropriateWords = (text: any) => {
    const regex = new RegExp(`\\b(${inappropriateWords.join("|")})\\b`, "gi");
    return regex.test(text);
  };
  // thêm bình luận
  const handleCommentSubmit = async (e: any) => {
    e.preventDefault();

    if (canComment) {
      const hasInappropriateWords = containsInappropriateWords(commentText);

      if (hasInappropriateWords) {
        message.error("Bình luận của bạn chứa từ không thích hợp.");
      } else {
        if (dataLogin !== null) {
          // Kiểm tra xem dataLogin không phải null
          const userData = JSON.parse(dataLogin);

          try {
            const response: any = await addRate({
              id_user: userData.id, // Sử dụng id từ userData
              id_category: idRoom,
              rating: roomRating,
              content: commentText,
              status: 1, // Tùy thuộc vào cách bạn quản lý trạng thái
            });

            if (response.data) {
              message.success("Bình luận đã được thêm thành công.");
              setCommentText("");
              setRoomRating(0);
            } else {
              message.error("Đã xảy ra lỗi khi thêm bình luận.");
            }
          } catch (error) {
            console.error("Error adding comment:", error);
            message.error("Đã xảy ra lỗi khi thêm bình luận.");
          }
        } else {
          message.error(
            "Dữ liệu người dùng không tồn tại. Vui lòng đăng nhập để bình luận."
          );
          navigate("/login");
        }
      }
    } else {
      message.error("Vui lòng đăng nhập để bình luận.");
      navigate("/login");
    }
  };
  //
  const [selectedRange, setSelectedRange] = useState<
    [Date | null, Date | null]
  >([null, null]);

  const handleRangeChange = (dates: any) => {
    setSelectedRange([dates[0]?.toDate() || null, dates[1]?.toDate() || null]);
  };

  const onHandSubmit = () => {
    if (selectedRange[0] && selectedRange[1]) {
      const roomDetailsString = roomDetails1
        .map((details) => {
          return `adults:${details.adults},children:${details.children},infants:${details.infants}`;
        })
        .join("&");
      const encodedSelectedRooms = numberOfRooms1;

      const hotel = `${idHotel}, ${hotelData?.[0]?.name}`;

      const url = `/choose-room/${hotel}/${selectedRange}/${encodedSelectedRooms}/${roomDetailsString}`;
      navigate(url, { replace: true });
    } else {
      message.error(
        "Vui lòng chọn ngày check-in và check-out trước khi đặt phòng."
      );
    }
  };

  // State để bật tắt modal và lưu index của ảnh hiện tại
  const [showModal, setShowModal] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  // Bật modal
  const toggleModal = () => {
    setShowModal(!showModal);
    setCurrentImageIndex(0);
  };
  // Trở về ảnh trước
  const showPreviousImage = () => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
    } else {
      setCurrentImageIndex(images.length - 1);
    }
  };
  // Sang ảnh tiếp theo
  const showNextImage = () => {
    if (currentImageIndex < images.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
    } else {
      setCurrentImageIndex(0);
    }
  };
  useEffect(() => {
    let timer: any;

    if (showModal) {
      // Tạo một hàm để chuyển đổi ảnh tiếp theo
      const showNextImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
      };

      // Thiết lập một interval để tự động chuyển đổi ảnh sau mỗi 2 giây
      timer = setInterval(showNextImage, 2000);
    } else {
      clearInterval(timer); // Xóa interval khi Modal không hiển thị
    }

    return () => {
      clearInterval(timer); // Đảm bảo xóa interval khi component unmounts
    };
  }, [showModal, images]);

  const [addLike] = useLikeDetailRoomMutation();

  const Like = (id: any) => {
    addLike(id).then((res: any) => {
      setLike(res.data.likes);
    });
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
    if (value >= 1 && value <= 6) {
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
  // hết phần chọn phòng
  //
  /*Hàm Dropdow đặt phòng*/
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
    setIsScrollLocked(false);
  };
  const closeOpen = () => {
    setIsDropdownOpen(!isDropdownOpen);
    setIsScrollLocked(false);
  };
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        // setIsDropdownOpen(false);
        setIsScrollLocked(false);
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
  // slider
  const sliderFor = useRef<Slider | null>(null);
  const sliderNav = useRef<Slider | null>(null);
  const sliderForSettings: Settings = {
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: true,
    asNavFor: sliderNav.current as unknown as Slider,
  };

  const sliderNavSettings: Settings = {
    slidesToShow: 4,
    slidesToScroll: 1,
    asNavFor: sliderFor.current as unknown as Slider,
    centerMode: true,
    focusOnSelect: true,
  };
  const goToPrev = () => {
    sliderFor.current?.slickPrev();
    sliderNav.current?.slickPrev();
  };

  const goToNext = () => {
    sliderFor.current?.slickNext();
    sliderNav.current?.slickNext();
  };
  //srollto
  const [userInteracted] = useState(false);
  useEffect(() => {
    if (!userInteracted) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [userInteracted]); 
  return (
    <div>
      {loading ? (
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
      ) : (
        <div>
          <div className="max-w-7xl mx-auto my-5">
            <HeaderHotelType /> <br />
            <br /> <br /> <br />
            <div className="flex space-x-10 pb-5">
              <h1 className=" uppercase">
                <span className="text-2xl font-bold text-blue-900 ">
                  Khách sạn {hotelData?.[0]?.name}
                </span>{" "}
                {/* - <span className="text-lg font-semibold">{data?.[0]?.name}</span> */}
              </h1>
              <button className="flex items-center text-red-500 font-semibold transform transtion-transfrom hover:scale-105 duration-300">
                {/* <AiOutlineHeart className="mx-2 " /> Yêu thích  */}
              </button>
            </div>
            <div className="">
              <div className="flex mb-20">
                <div className="w-[65%] mx-auto mr-10 mb-20 relative">
                  <Slider {...sliderForSettings} ref={sliderFor} className="">
                    {dataImage?.map((item: any, index: number) => (
                      <div key={index}>
                        <img
                          src={item?.image}
                          alt=""
                          className=" rounded w-full h-[55%] object-cover hay"
                        />
                      </div>
                    ))}
                  </Slider>
                  <Slider {...sliderNavSettings} ref={sliderNav} className="flex-nav ">
                    {/* <div className="flex">
                      {imageDate && imageDate?.map((item: any, index: number) => (
                        <div key={index} className="">
                          <img
                            src={item?.image}
                            alt=""
                            className=" rounded h-[100px] w-[100px] object-cover"
                          />
                        </div>
                      ))}
                    </div> */}
                  </Slider>
                  <button
                    onClick={goToNext}
                    className="bg-white  border border-[#e8952f] rounded-full text-[#e8952f] px-3 py-3 absolute z-10 bottom-[47%] start-[-20px]  transform transition-tranform hover:scale-125 duration-300 "
                  >
                    <AiOutlineLeft />
                  </button>
                  <button
                    onClick={goToPrev}
                    className="bg-white border border-[#e8952f] rounded-full text-[#e8952f] px-3 py-3 ml-[800px] z-10 absolute transform transition-tranform hover:scale-125 duration-300  bottom-[47%] end-[-20px]  "
                  >
                    <AiOutlineRight />
                  </button>
                </div>
                <div className="w-[35%]">
                  <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-semibold ">
                      {data?.[0]?.name}
                    </h1>
                    <div className="flex space-x-3 items-center">
                      <h1 className="text-[#e8952f] text-xl font-semibold">
                        {data?.[0]?.price.toLocaleString("vi-VN")} đ
                      </h1>
                    </div>
                  </div>
                  <div className="flex items-center space-x-5 text-sm justify-end pt-3">
                    <span className="flex items-center gap-1 cursor-pointer">
                      <AiOutlineEye class="text-lg " />
                      {data?.[0]?.views}
                    </span>

                    <span
                      onClick={() => Like(idRoom)}
                      className="flex items-center gap-1 cursor-pointer"
                    >
                      <img
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdnBlK_Dcb2xIPJe6KfZrqbuR2lFrBUF0mKg&usqp=CAU"
                        alt=""
                        width={17}
                      />
                      {like}
                    </span>
                  </div>
                  <div className="mt-2">
                    <h2 className="text-lg font-medium">Mô tả</h2>
                  </div>
                  <p className="text-base pb-2">{data?.[0]?.description}</p>
                  <h1 className="text-lg font-semibold pb-2">
                    {data?.[0]?.people_quantity}
                  </h1>
                  <h2 className="font-medium mb-2 text-lg mt-1">
                    Tiện ích
                  </h2>
                  <div className="grid grid-cols-3 gap-2 pb-8 border-b-2 ">
                    <h1 className="flex items-center text-md">
                      <BsPeople />
                      <span className="px-2">8 người</span>
                    </h1>
                    <h1 className="flex items-center text-md">
                      <BsArrowsFullscreen />
                      <span className="px-2 relative">
                        {data?.[0]?.acreage} m
                        <span className="absolute bottom-1">2</span>
                      </span>
                    </h1>
                    <h1 className="flex items-center text-md">
                      <AiOutlineWifi />
                      <span className="px-2">Wifi miễn phí</span>
                    </h1>
                  </div>
                  <div className="pb-5">
                    <div className=" flex space-x-2 mt-5">
                      <button
                        // onClick={onHandSubmit}
                        onClick={toggleDropdown}
                        className="bg-[#e8952f] text-white py-2 px-10 font-medium rounded my-3 "
                      >
                        Đặt ngay
                      </button>
                      <Link
                        to={`/hotel/${idHotel}`}
                        className="border border-[#e8952f] text-[#e8952f] hover:bg-[#e8952f]  py-2 hover:text-white px-10 rounded  my-3 font-medium"
                      >
                        Quay lại
                      </Link>
                      {/* <button >Mua con chó</button> */}
                    </div>
                    <div className="" ref={dropdownRef}>
                      {isDropdownOpen && (
                        <div
                          className={`fixed top-0 bg-gray-200 z-40 w-[34.5%] h-full transform transition-transform 
                            ${
                              isDropdownOpen
                                ? "translate-x-0"
                                : "translate-x-full"
                            } duration-700 ease-in`}
                        >
                          <div className="bg-gray-800 text-white h-[250px] pt-[180px] px-14">
                            <span className="">
                              <div className="flex items-center justify-between">
                                <h2 className="text-2xl font-medium">
                                  Khách sạn {hotelData?.[0]?.name}
                                </h2>
                                <button
                                  onClick={closeOpen}
                                  className="hover:scale-105 duration-300 text-xl"
                                >
                                  <AiOutlineClose />
                                </button>
                              </div>
                              <h2>{data?.[0]?.name}</h2>
                            </span>
                          </div>
                          <div className="px-14 py-10">
                            <div className="flex-grow ml-2 group relative">
                              <AiOutlineCalendar class="absolute top-4 start-0 z-10 w-10 h-5 text-gray-500 group-hover:text-[#e8952f]" />
                              <RangePicker
                                className="w-[400px] text-[16px] h-[50px] border-gray-400 transition-all duration-300 ease-in-out hover:border-[#e8952f] hover:shadow-md "
                                format="DD/MM/YYYY"
                                separator=""
                                onChange={handleRangeChange}
                                onClick={(e) => e.stopPropagation()}
                                disabledDate={(current) => {
                                  return (
                                    current &&
                                    current.isBefore(new Date(), "day")
                                  );
                                }}
                                popupStyle={{ overflow: "hidden" }}
                                style={{
                                  color: "red",
                                  fontWeight: "bold",
                                  paddingTop: "20px",
                                  paddingLeft: "45px",
                                }}
                              />
                              <span className="absolute flex top-1 start-11 font-medium text-sm text-gray-500 group-hover:text-[#e8952f] ">
                                Ngày nhận - Ngày trả
                              </span>
                            </div>
                            <button className="w-[415px] px-2 pt-4 ">
                              <div
                                className="group flex items-center bg-white border border-gray-400 h-[50px] px-2 py-1.5 relative text-[#b0b4b8] rounded transition-all 
                                duration-300 ease-in-out hover:border-[#e8952f] hover:shadow-md "
                              >
                                <span className="xl:text-[20px] lg:text-[19px] mr-3 group-hover:text-[#e8952f] text-gray-500">
                                  <AiOutlineUser />
                                </span>
                                <div
                                  onClick={handleDivClick1}
                                  className="lg:w-[170px]"
                                >
                                  <div className="xl:text-[12px] xl:space-x-6 lg:space-x-3 lg:text-[13px] sm:text-[9px] text-gray-700 sm:space-x-2 font-semibold ">
                                    <label
                                      htmlFor=""
                                      className="cursor-pointer group-hover:text-[#e8952f] ml-[-35px] text-sm font-medium text-gray-500"
                                    >
                                      Số phòng - Số người
                                    </label>
                                  </div>
                                  <div
                                    onClick={toggleDropdown1}
                                    className="xl:text-[14px] xl:space-x-7 lg:flex lg:text-[13px] lg:space-x-5 sm:text-[8px] font-medium text-[#353c46] w-[320px] cursor-pointer "
                                  >
                                    <label
                                      htmlFor=""
                                      className="cursor-pointer "
                                    >
                                      {numberOfRooms1} phòng{" "}
                                    </label>
                                    <label
                                      htmlFor=""
                                      className=" cursor-pointer text-gray-700 font-semibold"
                                    >
                                      {roomDetails1.reduce(
                                        (total, room) => total + room.adults,
                                        0
                                      )}{" "}
                                      người lớn -{" "}
                                      {roomDetails1.reduce(
                                        (total, room) => total + room.children,
                                        0
                                      )}{" "}
                                      trẻ em
                                    </label>
                                  </div>
                                </div>
                                <div ref={refCalen1}>
                                  {isDropdownOpen1 && (
                                    <div className="absolute mt-1 lg:w-[400px] sm:w-[340px] ml-[-20px]  bg-white border border-gray-300 shadow-lg px-5 py-4 start-5 top-14 hover:block rounded-md">
                                      <div className="flex items-center justify-between cursor-pointer text-[15px]">
                                        <span className="font-medium text-gray-700">
                                          Số phòng
                                        </span>
                                        <div className="flex items-center space-x-4">
                                          {numberOfRooms1 > 1 && (
                                            <button
                                              onClick={() =>
                                                handleRoomChange1(
                                                  numberOfRooms1 - 1
                                                )
                                              }
                                              className="border border-gray-600 text-gray-600 px-1 py-1 rounded-full"
                                            >
                                              <AiOutlineMinus />
                                            </button>
                                          )}
                                          <a
                                            className="text-gray-600 font-medium"
                                            href=""
                                          >
                                            {numberOfRooms1}
                                          </a>
                                          <button
                                            onClick={() =>
                                              handleRoomChange1(
                                                numberOfRooms1 + 1
                                              )
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
                                                      handleAdultChange1(
                                                        index,
                                                        room.adults - 1
                                                      )
                                                    }
                                                    className="border border-gray-600 text-[12px] text-gray-600 px-1 py-1 rounded-full"
                                                  >
                                                    <AiOutlineMinus />
                                                  </button>
                                                  <a href="">{room.adults}</a>
                                                  <button
                                                    onClick={() =>
                                                      handleAdultChange1(
                                                        index,
                                                        room.adults + 1
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
                                        *Em bé: Dưới 2 tuổi/ Trẻ em: Từ 2 - dưới
                                        12 tuổi
                                      </p>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </button>
                            <button
                              onClick={() => onHandSubmit()}
                              className="bg-[#e8952f] w-[400px] ml-2 mt-4 py-3 rounded text-white font-medium  hover:shadow-xl"
                            >
                              Tìm kiếm
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              {/* Cửa sổ popup */}
              <Modal
                isOpen={showModal}
                onRequestClose={toggleModal}
                contentLabel="Additional Images"
                className="modal mx-auto mt-[100px] animate-fade-in "
              >
                <div className="max-w-3xl mx-auto">
                  <button
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                    onClick={toggleModal}
                  >
                    <AiOutlineClose className="text-2xl" />
                  </button>
                  <div className="relative">
                    <img
                      src={images[currentImageIndex]}
                      alt=""
                      className="w-full rounded "
                    />
                    <div className="absolute inset-0 flex justify-between items-center">
                      <button
                        className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded"
                        onClick={showPreviousImage}
                      >
                        <BsChevronCompactLeft />
                      </button>
                      <button
                        className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded"
                        onClick={showNextImage}
                      >
                        <BsChevronCompactRight />
                      </button>
                    </div>
                  </div>
                </div>
              </Modal>
            </div>
            <div className="pb-5">
              {/* <h1 className="text-xl font-semibold pb-4">
                Bạn cảm thấy ưng ý chưa ?
              </h1> */}
            </div>
            <div className="py-5 mt-[-120px]">
              <div className="pb-2">
                <h1 className="text-2xl font-semibold pb-6">
                  Thông tin đánh giá
                </h1>
                {/* Show ra đánh giá */}
                <div className="comment-list grid grid-cols-2 gap-4 pb-5">
                  {dataComment?.map((item: any) => {
                    const createdAtDate = new Date(item.created_at);
                    const formattedDate =
                      createdAtDate.toLocaleDateString("vi-VN");
                    const firstLetterOfName = item.user_name.charAt(0);
                    return (
                      <div key={item.id} className="comment column">
                        <div className="comment column">
                          <div className="small-column py-2 flex items-center">
                            <div className="border rounded-full bg-blue-300 w-16 h-16 flex justify-center items-center">
                              <span className="text-xl font-bold">
                                {firstLetterOfName}
                              </span>
                            </div>
                            <h1 className="text-[17px] px-3">
                              {formattedDate}
                              <br />
                              <span className="font-bold ">
                                {item.user_name}
                              </span>
                            </h1>
                            <h1 className="text-[17px] ml-5 mb-[-5px]">
                              <span className="font-semibold italic">
                                {data?.name}
                              </span>
                              <h1 className="text-[#e8952f] text-[20px]  mt-[-5px]">
                                {"★".repeat(item.rating)}
                              </h1>
                            </h1>
                          </div>
                          <h1 className="ml-[75px] mt-[-7px]">
                            {item.content}
                          </h1>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/*Form đánh giá */}
                <div className="flex items-center justify-start shadow-lg mb-4 w-full">
                  <form
                    onSubmit={handleCommentSubmit}
                    className="bg-white rounded-lg pt-2 w-full"
                  >
                    <div className="flex flex-wrap mx-3 mb-6">
                      <div className="flex items-center justify-between">
                        <div className="">
                          <h2 className="px-4 pt-3 pb-2 text-gray-800 text-lg font-semibold">
                            Thêm đánh giá mới
                          </h2>
                        </div>
                        <div className="flex items-center space-x-2 mt-1 ml-[800px]">
                          <p className="text-lg font-semibold">
                            Đánh giá sao :
                          </p>
                          {[1, 2, 3, 4, 5].map((rating) => (
                            <label key={rating} className="cursor-pointer">
                              <input
                                type="radio"
                                name="roomRating"
                                value={rating.toString()}
                                onChange={(e) =>
                                  setRoomRating(Number(e.target.value))
                                }
                                className="hidden"
                              />
                              <span
                                className={`text-2xl ${
                                  roomRating >= rating
                                    ? "text-yellow-400"
                                    : "text-gray-400"
                                }`}
                              >
                                &#9733;
                              </span>
                            </label>
                          ))}
                        </div>
                      </div>
                      {isLoggedIn && (
                        <div className="w-full md:w-full flex items-start px-3 mb-2">
                          <textarea
                            value={commentText}
                            onChange={(e) => setCommentText(e.target.value)}
                            className="bg-gray-100 rounded border border-gray-400 leading-normal resize-none w-full h-20 py-2 px-3 placeholder-gray-700 focus:outline-none focus-bg-white"
                            name="body"
                            placeholder="Viết một đánh giá mới"
                            required
                          ></textarea>
                        </div>
                      )}
                      {!isLoggedIn && (
                        <div className="w-full md:w-full flex items-start px-3 mb-2">
                          <textarea
                            className="bg-gray-300 cursor-not-allowed rounded border border-gray-400 leading-normal resize-none w-full h-20 py-2 px-3 placeholder-gray-700 focus:outline-none focus-bg-white"
                            name="body"
                            placeholder="Đăng nhập để bình luận"
                            disabled
                          ></textarea>
                        </div>
                      )}
                      <div className="w-full md:w-full flex items-start px-3">
                        <div className="flex items-center text-gray-700 mr-auto">
                          <AiOutlineInfoCircle />
                          <p className="text-xs md:text-sm pt-px px-2">
                            Hãy đánh giá lịch sự.
                          </p>
                        </div>

                        <div className="flex justify-end">
                          {isLoggedIn ? (
                            <button
                              onClick={onHandSubmit}
                              className="text-white font-semibold py-2 px-4 border bg-[#e8952f] rounded-lg tracking-wide hover:scale-105 duration-300 hover:text-white text-lg"
                            >
                              Đăng bình luận
                            </button>
                          ) : (
                            <Link
                              to="/login"
                              className="text-white font-semibold py-2 px-4 border bg-[#e8952f] rounded-lg tracking-wide hover:scale-105 duration-300 hover:text-white text-lg"
                            >
                              Đăng nhập
                            </Link>
                          )}
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <Footer />
        </div>
      )}
    </div>
  );
};

export default DetailTypeofRoom;
