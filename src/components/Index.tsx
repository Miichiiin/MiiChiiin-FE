import { AiOutlineArrowRight, AiOutlineRight, AiOutlineLeft } from "react-icons/ai";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import React from "react";
import { TextTruncate } from "../components/TextTruncate"
import Header from "./Header";
import Search from "./Search";
import { useGetHotel_homesQuery } from "@/api/hotel_home";
import { Link } from "react-router-dom";
import { SearchQuickHotel } from "./SearchQuickHotel";
const Index = () => {
    let settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
    };
    const { data: booking, error, isLoading } = useGetHotel_homesQuery();
console.log(booking);

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
    return (
        <div>
            <Header />
            <SearchQuickHotel/>
            <div className="mt-7 bg-[#fbf8f2] w-full pb-8">
                <div className="xl:w-[1280px] xl:mx-auto ">
                   <div className="flex items-center  lg:w-[1280px]">
                        <h1 className="lg:text-[30px]  pt-10 pb-6 ">Trải nghiệm hệ sinh thái Vinpearl</h1>
                   </div>
                    <div className="flex items-center space-10 sm:justify-center">
                        <div className="">
                            <img className="mb-6 xl:w-[900px] lg:w-[550px] sm:w-[380px] rounded-md" src="https://statics.vinpearl.com/styles/741x500/public/2023_01/Hotels%20&%20Resort_1673079062.png.webp?itok=yrxzLyG7" alt="" />
                            <a href="" className="hover:text-[#f2ba50] xl:text-[22px] lg:text-[18px] sm:text-[12px] ">Nghỉ dưỡng</a>
                            <p className="xl:text-[14px] lg:text-[11px] sm:text-[8px]">Trải mình bên những bãi biển hấp dẫn nhất thế giới, Vinpearl mang đến trải nghiệm nghỉ dưỡng trọn vẹn nhất</p><br />
                            <span className="flex items-center lg:text-[16px] lg:space-x-6 sm:text-[12px] text-[#f2ba50]"><a href="">Khám phá</a> <AiOutlineArrowRight /></span>
                        </div>
                        <div className="ml-10">
                            <img className="mb-6 xl:h-[560px] xl:w-[450px] lg:w-[400px] lg:h-[373px] sm:w-[200px] h-[260px] rounded-md" src="https://statics.vinpearl.com/styles/409x500/public/2023_01/Amusement%20Park_1673079085.png.webp?itok=4cFi2wfJ" alt="" />
                            <a href="" className="hover:text-[#f2ba50] xl:text-[22px] lg:text-[18px] sm:text-[12px] ">Vui chơi giải trí</a>
                            <p className="xl:text-[14px] lg:text-[11px] sm:text-[8px]">Chuỗi công viên chủ đề lớn nhất Việt Nam, dẫn đầu Châu Á</p><br />
                            <span className="flex items-center lg:text-[16px] lg:space-x-6 sm:text-[12px] text-[#f2ba50]"><a href="">Khám phá</a> <AiOutlineArrowRight /></span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="w-[1280px] mx-auto mt-10 ">
                <div className="flex items-center justify-between">
                    <h2 className="text-[30px] mb-7">Khách sạn</h2>
                    <span className="flex items-center space-x-6 text-[#f2ba50]"><Link to="/hoteltype">Xem thêm</Link> <AiOutlineArrowRight /></span>
                </div>

                <div className="relative ">
                    <button onClick={handlePrev} className="bg-white border border-[#e8952f] rounded-full text-[#e8952f] px-3 py-3 absolute z-10 top-[130px] start-[-15px] transition-transform transform scale-100 hover:scale-125"><AiOutlineLeft /></button>
                    <button onClick={handleNext} className="bg-white border border-[#e8952f] rounded-full text-[#e8952f] px-3 py-3 ml-[800px] z-10 absolute  top-[130px] end-2  transition-transform transform scale-100 hover:scale-125" ><AiOutlineRight /></button>
                    <Slider {...settings} ref={sliderRef} className="w-[1280px] mx-auto">
                        {booking?.map((item: any) => {
                          return  <>
                                <Link to={`/hotel`} className="w-[400px] relative overflow-hidden">
                                    <div className="relative overflow-hidden mb-4">
                                        <img className="w-[400px] h-[250px] object-cover transition-transform transform scale-100 hover:scale-105 rounded-md"
                                            src={item.image}
                                            alt=""
                                        />
                                    </div>
                                    <h2 className="text-xl">{item.name} </h2>
                                    <Link className="hover:text-[#f2ba50]" to="/hotel"><TextTruncate text={item.description} maxLength={52} /></Link>
                                </Link>
                            </>
                        })}
                    </Slider>
                </div>
            </div>
            <div className="mt-10 relative bg-[#585c5b]">
                <div className="w-[740px] mx-auto absolute inset-0 top-[300px] items-center ">
                    <p className="text-[#f2ba50] font-bold text-[20px] text-center pb-1">Pearl Club</p>
                    <p className="text-[27px] text-center pb-2 text-white font-medium">Đặc quyền nghỉ dưỡng thượng lưu</p>
                    <p className="text-white">
                        Pearl Club là chương trình khách hàng thân thiết của Vinpearl. Khách hàng có thể đăng ký là thành viên
                        miễn phí và tích lũy giao dịch để nâng hạng, trải nghiệm ngay các đặc quyền ưu đãi trong toàn bộ hệ sinh
                        thái Vinpearl.
                    </p>
                </div>
                <img className="w-full bg-[#585c5b]" src="https://statics.vinpearl.com/styles/1920x860/public/2023_01/About%20Pearl%20Club_1673079019.jpg.webp?itok=f-G5FUpc" alt="" />
            </div>
            <div className="bg-[#fbf8f2] w-full py-10 ">
                <div className="xl:w-[1280px] xl:mx-auto mt-10 lg:">
                    <div className="flex items-center justify-between">
                        <h2 className="text-[30px] mb-7">Ưu đãi khuyến mãi</h2>
                        <span className="flex items-center space-x-6 text-[#f2ba50]"><a href="">Xem thêm</a> <AiOutlineArrowRight /></span>
                    </div>
                    <div className="sm:grid xl:grid-cols-3 flex lg:grid-cols-2 sm:justify-center ">
                        <div className="w-[400px] ">
                            <div className="relative overflow-hidden mb-4">
                                <img className="w-full h-auto object-cover transition-transform transform scale-100 hover:scale-105 rounded-md"
                                    src="https://statics.vinpearl.com/styles/378x250/public/2023_05/vinpearl_1684721297.jpg.webp?itok=hYT97ZUH"
                                    alt=""
                                />
                            </div>
                            <a className="hover:text-[#f2ba50]" href="">Wonder Summer 2023: Miễn phí kỳ nghỉ tuyệt hơn mơ cho bé yêu</a>
                        </div>
                        <div className="w-[400px] ">
                            <div className="relative overflow-hidden mb-4">
                                <img className="w-full h-auto object-cover transition-transform transform scale-100 hover:scale-105 rounded-md"
                                    src="https://statics.vinpearl.com/styles/378x250/public/2023_05/combo-cam-hung-bat-tan-banner_1685342465.jpg.webp?itok=Bh7dfsY4"
                                    alt=""
                                />
                            </div>
                            <a className="hover:text-[#f2ba50]" href="">Cảm hứng bất tận: trọn gói vé máy bay và nghỉ dưỡng 3N2Đ tiết kiệm đến 40%</a>
                        </div>
                        <div className="w-[400px]  ">
                            <div className="relative overflow-hidden mb-4">
                                <img className="w-full h-auto object-cover transition-transform transform scale-100 hover:scale-105 rounded-md"
                                    src="https://statics.vinpearl.com/styles/378x250/public/2023_01/tong-hop-uu-dai-early-bird-banner_1673341683.jpg.webp?itok=YNNs_fjY"
                                    alt=""
                                />
                            </div>
                            <a className="hover:text-[#f2ba50]" href="">Đặt phòng sớm, ưu đãi lớn: tổng hợp ưu đãi early bird không thể bỏ lỡ</a>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Index
