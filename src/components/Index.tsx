import { AiOutlineArrowRight, AiOutlineRight, AiOutlineLeft } from "react-icons/ai";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import React from "react";
import { TextTruncate } from "../components/TextTruncate"
import Header from "./Header";
import Search from "./Search";

import { Link } from "react-router-dom";
import { useGetHotel_homesQuery } from "@/api/webapp/hotel_home";
import { useGetVoucherQuery } from "@/api/admin/voucher";
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
    const { data: voucher } = useGetVoucherQuery();

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
            <SearchQuickHotel />
            <div className="mt-7 bg-[#fbf8f2] w-full pb-8">
                <div className="xl:w-[1280px] xl:mx-auto ">
                    <div className="flex items-center  lg:w-[1280px]">
                        <h1 className="lg:text-[30px]  pt-10 pb-6 ">Trải nghiệm hệ sinh thái Miichi</h1>
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
                    <span className="flex items-center space-x-6 text-[#f2ba50] hover:underline hover:underline-offset-4"><Link to="/hoteltype">Xem thêm</Link> <AiOutlineArrowRight /></span>
                </div>

                <div className="relative ">
                    <button onClick={handlePrev} className="bg-white border border-[#e8952f] rounded-full text-[#e8952f] px-3 py-3 absolute z-10 top-[130px] start-[-15px] transition-transform transform scale-100 hover:scale-125"><AiOutlineLeft /></button>
                    <button onClick={handleNext} className="bg-white border border-[#e8952f] rounded-full text-[#e8952f] px-3 py-3 ml-[800px] z-10 absolute  top-[130px] end-2  transition-transform transform scale-100 hover:scale-125" ><AiOutlineRight /></button>
                    <Slider {...settings} ref={sliderRef} className="w-[1280px] mx-auto">
                        {booking?.map((item: any) => {
                            return <>
                                <Link to={`/hotel/${item?.id}`} key={item?.id} className="w-[400px] relative overflow-hidden">
                                    <div className="relative overflow-hidden mb-4">
                                        <img className="w-[400px] h-[250px] object-cover transition-transform transform scale-100 hover:scale-105 rounded-md"
                                            src={item.image}
                                            alt=""
                                        />
                                    </div>
                                    <h2 className="text-xl hover:text-[#f2ba50]">{item.name} </h2>
                                    <Link className="hover:text-[#f2ba50]" to={`/hotel/${item?.id}`}><TextTruncate text={item.description} maxLength={52} /></Link>
                                </Link>
                            </>
                        })}
                    </Slider>
                </div>
            </div>
            <div className="mt-10 relative bg-[#585c5b]" style={{ textShadow: '1px 2px 3px #000' }}>
                <div className="w-[740px] mx-auto absolute inset-0 top-[300px] items-center">
                    <p className="text-[#f2ba50] font-bold text-[35px] text-center pb-1" style={{ textShadow: '1px 3px 4px #000' }}>
                        Pearl Club
                    </p>
                    <p className="text-[25px] text-center pb-2 text-white font-medium" >
                        Đặc quyền nghỉ dưỡng thượng lưu
                    </p>
                    <p className="text-white text-center font-semibold text-[18px]" style={{ textShadow: '2px 2px 4px #000' }}>
                        Pearl Club là chương trình khách hàng thân thiết của Vinpearl. Khách hàng có thể đăng ký là thành viên miễn phí và tích
                        lũy giao dịch để nâng hạng, trải nghiệm ngay các đặc quyền ưu đãi trong toàn bộ hệ sinh thái Vinpearl.
                    </p>
                </div>
                <img className="w-full bg-[#585c5b]" src="https://statics.vinpearl.com/styles/1920x860/public/2023_01/About%20Pearl%20Club_1673079019.jpg.webp?itok=f-G5FUpc" alt="" />
            </div>
            <div className="bg-[#fbf8f2] w-full py-10 ">
                <div className="xl:w-[1280px] xl:mx-auto mt-10 lg:">
                    <div className="flex items-center justify-between">
                        <h2 className="text-[30px] mb-7">Ưu đãi khuyến mãi</h2>
                        <span className="flex items-center space-x-6 text-[#f2ba50]"><Link to={`/promotion`} > Xem thêm
                        </Link> <AiOutlineArrowRight /></span>
                    </div>
                    <div className="sm:grid xl:grid-cols-3 flex lg:grid-cols-2 sm:justify-center ">
                        <Slider {...settings} ref={sliderRef} className="w-[1280px] mx-auto">
                            {voucher?.map((item: any) => {
                                return <>
                                    <div className="w-[400px] ">
                                        <div className="relative overflow-hidden mb-4">
                                            <img className=" h-auto object-cover transition-transform transform scale-100 hover:scale-105 rounded-md"
                                                src={item.image} width="400px" height="300px"

                                                alt=""
                                            />
                                        </div>
                                        <a className="hover:text-[#f2ba50]" href="/promotion" key={item?.id}>{item?.name}</a>
                                    </div>
                                </>
                            })}
                        </Slider>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Index
