import { AiOutlineArrowRight, AiOutlineRight, AiOutlineLeft ,AiOutlineComment,AiFillStar,AiOutlineSlackSquare,AiOutlineInsertRowLeft} from "react-icons/ai";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import React, { CSSProperties, useEffect, useState } from "react";
import { TextTruncate } from "../components/TextTruncate"
import Header from "./Header";
// import Search from "./Search";
import "./Css/hover.css"
import { Link } from "react-router-dom";
import { useGetHotel_homesQuery } from "@/api/webapp/hotel_home";
// import { useGetVoucherQuery } from "@/api/admin/voucher";
import { SearchQuickHotel } from "./SearchQuickHotel";
import FadeLoader from "react-spinners/HashLoader";
import Footer from "./Footer";
const Index = () => {

    let settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
    };
    const { data: booking } = useGetHotel_homesQuery();
    // const dataCkeck = booking?.[0]?.image;
  // loading trang
  const [loading,setLoading] = useState(false);
  useEffect(() =>{
    setLoading(true)
    setTimeout(() =>{
      if (booking && booking.length > 0) {
        setLoading(false);
      }
    })
  },[booking]);  
  const override: CSSProperties = {
    display: "flex",
    position:"fixed",
    top: "45%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  };
    // const { data: voucher } = useGetVoucherQuery();    
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
            { loading ?
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

                    <div className="relative">
                        <button onClick={handleNext} className="bg-white border border-[#e8952f] rounded-full text-[#e8952f] px-3 py-3 absolute z-10 top-[110px] start-[-15px] transition-transform transform scale-100 hover:scale-125"><AiOutlineLeft /></button>
                        <button onClick={handlePrev} className="bg-white border border-[#e8952f] rounded-full text-[#e8952f] px-3 py-3 ml-[800px] z-10 absolute  top-[110px] end-0  transition-transform transform scale-100 hover:scale-125" ><AiOutlineRight /></button>
                        <Slider {...settings} ref={sliderRef} className="w-[1280px] mx-auto">
                            { booking?.map((item: any) => {
                                return <>
                                    <Link to={`/hotel/${item?.id}`} key={item?.id} className="w-[400px] relative overflow-hidden">
                                        <div className="relative overflow-hidden mb-[-15px]">
                                        <figure className="snip0016">
                                            <img className="w-[400px] h-[250px] object-cover transition-transform transform scale-100 hover:scale-105 rounded-md"
                                                src={item?.image?.[0]?.image}
                                                alt=""
                                            />
                                            <figcaption>
                                            <h2 className="pb-3">Khách sạn <span className="px-2">Nổi bật  </span>nhất</h2>
                                            <div className=" items-center font-medium">
                                                <p className="flex items-center space-x-1">
                                                    <span className="font-medium ">Hạng khách sạn:</span> 
                                                    {Array.from({ length: item?.star }, (_, index) => (
                                                        <span key={index} className="flex items-center">
                                                        <AiFillStar />
                                                        </span>
                                                    ))}
                                                </p>
                                            <p>
                                                <p className="flex items-center space-x-4">
                                                        <span className="flex items-center"><AiOutlineSlackSquare class="mr-2"/> {item?.total_comforts} tiện ích</span> 
                                                        <span className="flex items-center"> <AiOutlineInsertRowLeft class="mr-2"/> {item?.total_rooms} phòng</span>
                                                        <span className="flex items-center"> <AiOutlineComment class="mr-2"/> {item?.total_rating_content} lượt</span>
                                                    </p>
                                            </p>
                                            </div>
                                            
                                            <p className="max-w-prose mx-auto ">
                                                <TextTruncate text={"Mô tả: " + item?.description || ''} maxLength={150} />
                                            </p>
                                            <a href="#"></a>
                                            </figcaption>
                                        </figure>
                                            
                                        </div>
                                        <h2 className="text-xl hover:text-[#f2ba50]">{item.name} </h2>
                                        <Link className="hover:text-[#f2ba50]" to={`/hotel/${item?.id}`}><TextTruncate text={item.description} maxLength={52} /></Link>
                                    </Link>
                                </>
                            })}
                        </Slider>
                    </div>
                </div>
                <div className="mt-20 mb-20 relative bg-[#585c5b]" style={{ textShadow: '1px 2px 3px #000' }}>
                    <div className="w-[740px] mx-auto absolute inset-0 top-[300px] items-center">
                        <p className="text-[#f2ba50] font-bold text-[35px] text-center pb-1" style={{ textShadow: '1px 3px 4px #000' }}>
                            Miichi Club
                        </p>
                        <p className="text-[25px] text-center pb-2 text-white font-medium" >
                            Đặc quyền nghỉ dưỡng thượng lưu
                        </p>
                        <p className="text-white text-center font-semibold text-[18px]" style={{ textShadow: '2px 2px 4px #000' }}>
                            Miichi Club là chương trình khách hàng thân thiết của Vinpearl. Khách hàng có thể đăng ký là thành viên miễn phí và tích
                            lũy giao dịch để nâng hạng, trải nghiệm ngay các đặc quyền ưu đãi trong toàn bộ hệ sinh thái Miichi.
                        </p>
                    </div>
                    <img className="w-full bg-[#585c5b]" src="https://statics.vinpearl.com/styles/1920x860/public/2023_01/About%20Pearl%20Club_1673079019.jpg.webp?itok=f-G5FUpc" alt="" />
                </div>
                <div className="bg-[#fbf8f2] w-full py-10 ">
                    <div className="xl:w-[1280px] xl:mx-auto mt-10 lg:">
                        <div className="flex items-center justify-between">
                            {/* <h2 className="text-[30px] mb-14">Khám phá cùng Miichi</h2> */}
                            {/* <span className="flex items-center space-x-6 text-[#f2ba50]"><Link to={`/promotion`} > Xem thêm
                            </Link> <AiOutlineArrowRight /></span> */}
                        </div>
                        <div className="grid grid-cols-3 gap-2">
                            <div>
                            <div className="mb-20">
                                    <h2 className="text-2xl font-medium mb-2">
                                        Khám phá
                                    </h2>
                                    <p>
                                    Hãy sẵn sàng để ngỡ ngàng trước một Việt Nam mà bạn chưa bao giờ thấy, 
                                    nơi hội tụ tinh hoa văn hóa kỳ thú của năm châu bốn biển
                                    </p>
                            </div>
                                <div className="relative ">
                                    <img className="object-cover h-[74%]" src="https://statics.vinpearl.com/Family%20Fun_1672982530.jpg" alt="" />
                                    <span className="absolute bottom-3 start-5 text-white">
                                        <h2 className="font-medium text-2xl">Gia đình</h2>
                                        <p>Nghĩ dưỡng bên biển</p>
                                    </span>
                                </div>
                            </div>
                            <div className="relative">
                                <img className="object-cover h-full" src="https://statics.vinpearl.com/ban-be_1690371126.jpg" alt="" />
                                <span className="absolute bottom-3 start-5 text-white">
                                    <h2 className="font-medium text-2xl">Nhóm bạn</h2>
                                    <p>Nghĩ dưỡng & vui chơi</p>
                                </span>
                            </div>
                            <div className="flex flex-col gap-2">
                                <div className="relative">
                                    <img className="object-cover" src="https://statics.vinpearl.com/golfer_1690370771.jpg" alt="" />
                                    <span className="absolute bottom-3 start-5 text-white">
                                        <h2 className="font-medium text-2xl">Golfer</h2>
                                        <p>Nghĩ dưỡng & vui chơi</p>
                                    </span>
                                </div>
                                <div className="relative">
                                    <img className="object-cover" src="https://statics.vinpearl.com/middle-aged_1690370783.jpg" alt="" />
                                    <span className="absolute bottom-3 start-5 text-white">
                                        <h2 className="font-medium text-2xl">Hội đòng niên</h2>
                                        <p>Nghĩ dưỡng </p>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer/>
            </div>
            }
        </div>
    )
}

export default Index
