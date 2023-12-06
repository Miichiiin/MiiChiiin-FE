import {
  AiOutlineArrowRight,
  AiFillWechat,
  AiOutlineRight,
  AiOutlineLeft,AiOutlineShrink,AiFillLike,AiFillEye,AiOutlineTeam,AiOutlineInsertRowLeft,AiOutlineSlackSquare
} from "react-icons/ai";
import React, { useEffect, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import '../../../components/Css/hover.css'
import { TextTruncate } from "../../../components/TextTruncate";
import HeaderHotel from "./HeaderHotel";
import Footer from "@/components/Footer";
import { Link, useParams } from "react-router-dom";
import { useGetCategory_homeQuery } from "@/api/webapp/category_home";
import { useGetService_hotelIdQuery } from "@/api/webapp/service_hotel";
import { useUseGetRating_hotel_homeQueryQuery } from "@/api/webapp/rate_hotel_home";
import { SearchQuickHotel } from "@/components/SearchQuickHotel";
import { useGetHotel_homeByIdQuery } from "@/api/webapp/hotel_home";
import { useViewDetailRoomMutation } from "@/api/bookingUser";
// import {  useGetVoucher_hotelQuery } from "@/api/webapp/voucher_home";
import FadeLoader from "react-spinners/HashLoader";
import { CSSProperties } from 'react';

const HotelIntroduction = () => {
  const { id: idHotel } = useParams<{ id: string }>();
  // const { data: voucher } = useGetVoucher_hotelQuery();
  const { data: service } = useGetService_hotelIdQuery(idHotel);
  const { data } = useGetCategory_homeQuery(idHotel);
  const {data: hotelData} = useGetHotel_homeByIdQuery(idHotel);
  const { data: dataRate } = useUseGetRating_hotel_homeQueryQuery(idHotel);
  // loading trang
  const [loading,setLoading] = useState(false);
  useEffect(() =>{
    setLoading(true)
    setTimeout(() =>{
      if (dataRate && dataRate.length > 0) {
        setLoading(false);
      }
    })
  },[dataRate]);

  const override: CSSProperties = {
    display: "flex",
    position:"fixed",
    top: "45%",
    left: "50%",
    transform: "translate(-50%, -50%)",  
  };
  let settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
  };

  const sliderRef = React.useRef<Slider>(null);

  const handleNext = () => {
    if (sliderRef.current) {
      sliderRef.current.slickNext();
    }
  };

  const handlePrev = () => {
    if (sliderRef.current) {
      sliderRef.current.slickPrev();
    }
  };
  /*Slider 2*/
  var settings1 = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
  };
  // 3
  let settings2 = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2, // Số đánh giá hiển thị trên mỗi slide
    slidesToScroll: 1,
    autoplay: true, // Tự động chuyển slide
    autoplaySpeed: 3000,
  };
  const sliderRef1 = React.useRef<Slider>(null);

  const handleNext1 = () => {
    if (sliderRef1.current) {
      sliderRef1.current.slickNext();
    }
  };

  const [addView] = useViewDetailRoomMutation()

  const view = (id:any) => {
    addView(id)
  }
  //srollto
  useEffect(() =>{
    window.scrollTo({ top: 0, behavior: 'smooth' });
  })
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
      <div className="mx-auto overflow-y-auto ">
        <HeaderHotel />
        <SearchQuickHotel />
        <div className="bg-[#fbf8f2] w-full mt-3 px-5 py-10">
          <div className="mt-10 w-[940px] text-[14px] text-center mx-auto">
            <h1 className="text-[30px] font-medium mb-3">{hotelData?.[0]?.name}</h1>
            <p>
              Được thiết kế theo lối kiến trúc mạnh mẽ, vững chãi nhưng không
              kém phần tinh tế, thu hút cùng hệ thống 687 phòng nghỉ có nội thất
              hiện đại và bể bơi ngoài trời 800m2, VinHolidays Fiesta Phú Quốc
              là lựa chọn hàng đầu để nghỉ dưỡng và gắn kết cho khách hàng từ
              các gia đình, nhóm bạn trẻ đến những đoàn khách số lượng lớn.
            </p>
            <p>
              Nằm tại vị trí trung tâm của khu phức hợp Grand World và liền kề
              quần thể Vinpearl, VinHolidays Fiesta Phú Quốc cùng các trải
              nghiệm vui chơi giải trí và mua sắm đa dạng, hứa hẹn mang tới kì
              nghỉ trong mơ với chi phí hợp lý cho tất cả mọi người trong hành
              trình{" "}
              <a href="" className="text-[#4a6d76] hover:text-[#f2ba50]">
                du lịch {hotelData?.[0]?.city_name}.
              </a>
            </p>
          </div>
          <div className="fixed bottom-4 z-10 right-4 w-20 h-20  bg-[#f2ba50] border border-gray-300 rounded-full shadow-md p-4 ">
            {/* Nội dung box chát */}
            <span className="text-[50px] text-white">
              <AiFillWechat />
            </span>
          </div>
          <div className="flex space-x-4 w-[1460px] mx-auto  mt-10">
            <img
              className="w-[500px]"
              src="https://statics.vinpearl.com/styles/600x450/public/2023_03/vinholidays-fiesta-phu-quoc-1_1679990625.jpg.webp?itok=slS8iOZS"
              alt=""
            />
            <img
              className="w-[380px]"
              src="https://statics.vinpearl.com/styles/452x450/public/2023_03/vinholidays-fiesta-phu-quoc-2_1679990625.jpg.webp?itok=lAj2cL0s"
              alt=""
            />
            <img
              className="w-[550px] "
              src="https://statics.vinpearl.com/styles/600x450/public/2023_03/vinholidays-fiesta-phu-quoc-3_1679990627.jpg.webp?itok=mktFVuH5"
              alt=""
            />
          </div>
        </div>
        <div className="">
          <div className="flex items-center justify-between w-[1280px] mx-auto mt-[80px]">
            <h1 className="text-[30px]">Các hạng phòng</h1>
            <span className="flex items-center space-x-2 text-[#f2ba50]">
              <Link to={`/hotel/${idHotel}/rooms/roomtypes`}>Xem tất cả </Link>
              <AiOutlineArrowRight />
            </span>
          </div>

          <div className="mt-10 w-[1280px] mx-auto relative">
            <button
              onClick={handleNext}
              className="bg-white  border border-[#e8952f] rounded-full text-[#e8952f] px-3 py-3 absolute z-10 top-[27%] start-[-15px] transform transition-tranform hover:scale-125 duration-300 "
            >
              <AiOutlineLeft />
            </button>
            <button
              onClick={handlePrev}
              className="bg-white border border-[#e8952f] rounded-full text-[#e8952f] px-3 py-3 ml-[800px] z-10 absolute transform transition-tranform hover:scale-125 duration-300  top-[27%] end-0  "
            >
              <AiOutlineRight />
            </button>
            <Slider {...settings} ref={sliderRef} className="">
              {data?.map((item: any) => {
                return (
                  <>
                    <div>
                      <div className="relative overflow-hidden ">
                        <Link onClick={() => view(item?.id)} to={`/hotel/${idHotel}/rooms/detail/${item?.id}`}>
                          <figure className="snip0016">
                              <img className="w-[400px] h-[250px] object-cover transition-transform transform scale-100 hover:scale-105 rounded-md"
                                  src={item?.image}
                                  alt=""
                              />
                              <figcaption>
                              <h2 className="pb-3">Loại phòng <span className="px-2">Nổi bật  </span>nhất</h2>
                              <div className="flex items-center space-x-5 font-medium">
                                  <p className="flex items-center space-x-1">
                                      <span className="font-medium ">Thông tin phòng cơ bản :</span> 
                                      {/* {Array.from({ length: item?.star }, (_, index) => (
                                          <span key={index} className="flex items-center ">
                                          <AiFillStar />
                                          </span>
                                      ))} */}
                                  </p>
                              </div>
                              <p className="flex items-center space-x-9">
                                <span className="flex items-center"> <AiOutlineShrink class="mr-2"/> {item?.acreage} m2</span>
                                <span className="flex items-center"><AiOutlineTeam class="mr-2"/> {item?.quantity_of_people} người</span>
                                <span className="flex items-center"><AiOutlineSlackSquare class="mr-2"/> {item?.total_comfort} tiện ích</span> 
                              </p>
                              <p className="flex items-center space-x-6"> 
                                <span className="flex items-center"><AiFillEye class="mr-2"/> {item?.views} lượt</span>
                                <span className="flex items-center"><AiFillLike class="mr-2"/> {item?.likes} lượt</span>
                                <span className="flex items-center"> <AiOutlineInsertRowLeft class="mr-2"/> {item?.total_rooms} phòng</span>
                              </p>
                              <p className="max-w-prose mx-auto ">
                                  <TextTruncate text={"Mô tả: " + item?.description || ''} maxLength={150} />
                              </p>
                              <a href="#"></a>
                              </figcaption>
                          </figure>
                        </Link>
                      </div>
                      <div className="flex items-center ">
                        <h1 className="text-[24px] font-normal pb-2 w-[50%]">
                          {item.name}
                        </h1>
                        <h2 className=" w-[50%] text-[20px] font-normal pb-2 flex justify-center text-center">
                          {item.price.toLocaleString('vi-VN')} đ
                        </h2>
                      </div>
                      <p className="text-[#8e9399] text-[14px] mb-3">
                        {" "}
                        <TextTruncate text={item.description} maxLength={100} />
                      </p>
                      <div className="flex items-center space-x-2 text-[#f2ba50] cursor-pointer">
                        <Link to={`/hotel/${idHotel}/rooms/detail/${item.id}`}>
                          Xem chi tiết{" "}
                        </Link>
                        <AiOutlineArrowRight />
                      </div>
                    </div>
                  </>
                );
              })}
            </Slider>
          </div>
        </div>
        <div className="bg-[#fbf8f2] w-full mt-10 px-5 py-3 ">
          {/* hiển thị đánh giá sao */}
          <div className="w-[1280px] mx-auto mt-5 relative">
            <h1 className="text-[30px] mb-[30px]">Thông tin đánh giá</h1>
            <div>
              <Slider {...settings2} className="mb-10 pb-3">
                {dataRate?.map((item: any) => {
                  const createdAtDate = new Date(item.created_at);
                  const formattedDate =
                    createdAtDate.toLocaleDateString("vi-VN");
                  const firstLetterOfName = item.user_name.charAt(0);
                  return (
                    <div key={item.id} className="comment column ">
                      <Link
                        to={`/hotel/${idHotel}/rooms/detail/${item?.id_category}`}
                      >
                        <div className="comment column border border-gray-300 p-5 rounded-xl mr-5">
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
                                Loại phòng: {item?.category_name}
                              </span>
                              <h1 className="text-[14px] pr-2 font-medium">
                                Đánh giá:{" "}
                                <span className="text-yellow-400 text-[20px]  mt-[-5px]">
                                  {"★".repeat(item.rating)}
                                </span>
                              </h1>
                            </h1>
                          </div>
                          <h1 className="ml-[75px]">{item.content}</h1>
                        </div>
                      </Link>
                    </div>
                  );
                })}
              </Slider>
            </div>
          </div>
        </div>
        <div className="w-[1280px] mx-auto mt-10 relative">
          <img
            src="https://vinpearl.com/themes/porto/images/microsite_hotel_v2/img_become.jpg"
            alt=""
          />
          <div className="leading-10  absolute text-white top-[100px] start-[200px]">
            <p className="text-[30px]">Đăng ký thành viên Miichi</p>
            <p>
              Mức giá ưu đãi, tích lũy để hưởng đêm nghỉ miễn phí và hơn thế
              nữa.
            </p>
          </div>
        </div>
        <div>
          <div className="w-[1560px] mx-auto pb-10 relative">
            <div className="flex items-center justify-between w-[1280px] mx-auto mt-[80px] mb-10">
              <h1 className="text-[30px]">Dịch Vụ</h1>
              <span className="flex items-center space-x-2 text-[#f2ba50]">
                <a href="">Xem tất cả </a>
                <AiOutlineArrowRight />
              </span>
            </div>
            <div className="w-[1280px] mx-auto ">
              <Slider {...settings1} ref={sliderRef1} className="space-x-4">
                {service?.map((item: any, index: any) => (
                  <div key={index} className="relative">
                    <img
                      className="h-[300px] w-[400px] rounded-md"
                      src={item?.image}
                      alt=""
                    />
                    <span className="absolute bottom-3 start-5 text-white leading-7">
                      <p>Dịch Vụ</p>
                      <span className="flex items-center space-x-4">
                        <p className="text-[23px]">{item?.name}</p>
                        <span className="mt-1">
                          <AiOutlineArrowRight />
                        </span>
                      </span>
                    </span>
                  </div>
                ))}
              </Slider>
            </div>
            <button
              onClick={handleNext1}
              className="top-[50%] end-[12%] bg-white border border-[#e8952f] rounded-full text-[#e8952f] px-3 py-3 ml-[800px] z-10 absolute transform transition-tranform hover:scale-125 duration-300 "
            >
              <AiOutlineRight />
            </button>
          </div>
        </div>
      
      {/* <div className="mb-[100px]">
        <div className="flex items-center justify-between w-[1280px] mx-auto mt-[80px]">
          <h1 className="text-[30px]">Ưu Đãi</h1>
          <span className="flex items-center space-x-2 text-[#f2ba50]">
            <a href="/promotion">Xem tất cả </a>
            <AiOutlineArrowRight />
          </span>
        </div>
        <div className="mt-10">
          <Slider
            {...settings}
            // ref={sliderRef}
            className="w-[1280px] mx-auto"
          >
            {voucher?.map((item: any) => {
              return (
                <>
                  <div className="w-[400px] ">
                    <div className="relative overflow-hidden mb-4">
                      <Link to={`/promotion`}>
                        <img
                          className=" h-auto object-cover transition-transform transform scale-100 hover:scale-105 rounded-md"
                          src={item.image}
                          width="400px"
                          height="300px"
                          alt=""
                        />
                      </Link>
                    </div>
                    <a
                      className="hover:text-[#f2ba50] font-bold"
                      href="/promotion"
                      key={item?.id}
                    >
                      {item?.name}
                    </a>
                    <span className="flex items-center space-x-1 text-[#82888f] ">
                      <span>{item?.description}</span>
                    </span>
                  </div>
                </>
              );
            })}
          </Slider>
        </div>
      </div> */}
      <Footer/>
    </div>
    
    }
    
    </div>
  );
};

export default HotelIntroduction;
