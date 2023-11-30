import { AiOutlineRight ,AiOutlineLeft,AiFillWechat,AiOutlineCalendar,AiOutlineEye,AiOutlineSearch} from "react-icons/ai";
import HeaderNew from "./HeaderNew";
import Slider from "react-slick";
import React, { CSSProperties, useEffect, useState } from "react";
import HeaderHotelType from "../HotelType/HeaderHotelType";
import Footer from "@/components/Footer";
import FadeLoader from "react-spinners/HashLoader";
const New = () => {
      //loading trang
      const [loading,setLoading] = useState(false);
      useEffect(() =>{
          setLoading(true)
          setTimeout(() =>{
              setLoading(false);
          },1000)
      },[]);  
      const override: CSSProperties = {
          display: "flex",
          margin: "20% 50%",
          top:""    
      };
    let settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 2,
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
     //srollto
    useEffect(() =>{
        window.scrollTo({ top: 0, behavior: 'smooth' });
    })

    
  return (
    <div>
        {loading?
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
            <div>
                <HeaderHotelType/> <br /><br /><br /><br /><br />
                <div className="">
                    <div className="w-[1280px] mx-auto mt-10 relative ">
                            <div className="fixed bottom-4 z-10 right-4 w-20 h-20  bg-[#f2ba50] border border-gray-300 rounded-full shadow-md p-4 ">
                                {/* Nội dung box chát */}
                                <span className="text-[50px] text-white"><AiFillWechat/></span>
                            </div>
                            <button onClick={handlePrev} className="absolute top-[100px] end-[-20px] z-10 bg-white px-3 py-3 border border-[#e8952f] rounded-full text-[#e8952f]"><AiOutlineRight/></button>
                            <button onClick={handleNext} className="absolute top-[100px] start-[-20px] z-10 bg-white px-3 py-3 border border-[#e8952f] rounded-full text-[#e8952f] "><AiOutlineLeft/></button>
                            <div className="">
                            <Slider {...settings} ref={sliderRef} className="w-[1280px] mx-auto ">
                                <div className="relative w-60 h-60 overflow-hidden ">
                                    <img
                                        src="https://statics.vinpearl.com/styles/215x226/public/2020_11/Hinh-anh-Vinpearl-Resort-&-Golf-Nam-Hoi-An-Banner-16x9-so-1_0.png.webp?itok=mxhdez2Z"
                                        alt="Image"
                                        className="w-[245px] h-full rounded-md object-cover transition-transform transform scale-100 hover:scale-105 "
                                    />
                                    <span className="absolute inset-0 top-[200px] text-center text-white font-bold">Hội An</span>
                                </div>
                                <div className="relative w-60 h-60 overflow-hidden ">
                                    <img
                                        src="https://statics.vinpearl.com/styles/215x226/public/2023_05/Tin-golf_1684465590.jpg.webp?itok=wyFduBSZ"
                                        alt="Image"
                                        className="w-[245px] h-full rounded-md object-cover transition-transform transform scale-100 hover:scale-105"
                                    />
                                    <span className="absolute inset-0 top-[200px] text-center text-white font-bold">Tin Golf</span>
                                </div>
                                <div className="relative w-60 h-60 overflow-hidden ">
                                    <img
                                        src="https://statics.vinpearl.com/styles/215x226/public/2020_11/deakZKN9-reason-1-1.png.webp?itok=kv4bn1m5"
                                        alt="Image"
                                        className="w-[245px] h-full rounded-md object-cover transition-transform transform scale-100 hover:scale-105"
                                    />
                                    <span className="absolute inset-0 top-[200px] text-center text-white font-bold">Đà Nẵng</span>
                                </div>
                                <div className="relative w-60 h-60 overflow-hidden ">
                                    <img
                                        src="https://statics.vinpearl.com/styles/215x226/public/2020_11/1015998_15120409390038243694.jpg.webp?itok=0Ro6sFXd"
                                        alt="Image"
                                        className="w-[245px] h-full rounded-md object-cover transition-transform transform  scale-100 hover:scale-105"
                                    />
                                    <span className="absolute inset-0 top-[200px] text-center text-white font-bold">Quảng Ninh</span>
                                </div>
                                <div className="relative w-60 h-60 overflow-hidden ">
                                    <img
                                        src="https://statics.vinpearl.com/styles/215x226/public/2021_05/hinh-anh-hai-phong.jpg.webp?itok=AKJuVHxR"
                                        alt="Image"
                                        className="w-[245px] h-full rounded-md object-cover transition-transform transform scale-100 hover:scale-105 "
                                    />
                                    <span className="absolute inset-0 top-[200px] text-center text-white font-bold">Hải Phòng</span>
                                </div>
                                <div className="relative w-60 h-60 overflow-hidden ">
                                    <img
                                        src="https://statics.vinpearl.com/styles/215x226/public/2021_05/hinh-anh-hai-phong.jpg.webp?itok=AKJuVHxR"
                                        alt="Image"
                                        className="w-[245px] h-full rounded-md object-cover transition-transform transform scale-100 hover:scale-105 "
                                    />
                                    <span className="absolute inset-0 top-[200px] text-center text-white font-bold">Hải Phòng</span>
                                </div>
                                </Slider>
                            </div>
                    </div>
                    <div className="w-[1280px] mx-auto mt-[70px] relative">
                        <h1 className="text-[40px] font-bold mb-8">Tin nổi bật</h1>
                        <div className="flex space-x-10">
                            <div className="relative overflow-hidden">
                                <img src="https://statics.vinpearl.com/styles/752x468/public/2023_01/du-lich-phu-quoc-1_1673071911.jpg.webp?itok=TxAFhW9J" 
                                    alt="Image" 
                                    className=" rounded-md w-[850px] object-cover transition-transform transform scale-100 hover:scale-105"
                                />
                                <div className="w-[700px] text-left text-white absolute inset-0 top-[250px] start-7">
                                    <p className="text-[25px] font-bold">Trọn bộ kinh nghiệm, điểm đến & combo du lịch Phú Quốc từ A - Z 2023</p>
                                    <p className="font-medium pb-3">Du lịch Phú Quốc với trọn bộ cẩm nang về thời điểm, khí hậu, phương tiện đi lại, kế hoạch ăn - chơi - 
                                        ngủ - nghỉ từ A - Z sau đây sẽ giúp mọi du khách tận hưởng kỳ nghỉ của mình trọn vẹn nhất!
                                    </p>
                                    <a className="px-3 py-2 rounded-md bg-[#e8952f] text-white font-medium" href="">Khám phá</a>
                                </div>
                            </div>
                            <div>
                                <div className=" overflow-hidden">
                                    <img className="mb-6 w-[450px] h-[240px] rounded-md object-cover transition-transform transform scale-100 hover:scale-105" 
                                        src="https://statics.vinpearl.com/styles/358x223/public/2022_07/du-lich-nha-trang_1659071315.JPG.webp?itok=5NUNuf8_" 
                                        alt="" 
                                    />
                                    <div className="w-[380px] text-left text-white absolute inset-0 top-[250px] start-[880px] ">
                                        <p className="text-[18px] font-bold ">Kinh nghiệm du lịch Nha Trang tự túc siêu tiết kiệm 2023</p>
                                    </div>
                                </div>
                                <div className="overflow-hidden">
                                    <img className="mb-6 w-[450px] h-[240px] rounded-md object-cover transition-transform transform scale-100 hover:scale-105" 
                                        src="https://statics.vinpearl.com/styles/358x223/public/2022_07/cau-rong-da-nang_1657938152.jpg.webp?itok=5nKAbeZd" 
                                        alt="" 
                                    />
                                    <div className="w-[380px] text-left text-white absolute inset-0 top-[500px] start-[880px]">
                                        <p className="text-[18px] font-bold">Du lịch Đà Nẵng vui quên lối về trọn bộ cẩm nang A-Z</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-[1280px] mx-auto mt-4 flex space-x-10">
                            <div className="w-[810px]">
                                <h1 className="mb-10 text-[22px] font-medium">Tin mới nhất</h1>
                                <div className="border-t-black border-t-2 pt-10 grid grid-cols-2 gap-5">
                                    <div className="relative overflow-hidden ">
                                        <img src="https://statics.vinpearl.com/lau-oc-ha-noi-thumb_1692969239.jpg" 
                                            alt="Image"
                                            className="w-[450px] h-[260px] rounded-md object-cover transition-transform transform scale-100 hover:scale-105" 
                                        />
                                        <h2 className="mt-2 font-bold">Top 13+ quán lẩu ốc Hà Nội ngon, giá hợp lý xì xụp ngày gió mùa</h2>
                                        <div className="flex items-center space-x-4 mb-2 mt-2">
                                            <span className="flex items-center space-x-1 text-[#82888f]"><AiOutlineCalendar/><span>25/8/2023</span></span>
                                            <span className="flex items-center space-x-1 text-[#82888f]"><AiOutlineEye/><span>2.002</span></span>
                                        </div>
                                        <p className="text-[#82888f]">Mỗi quán lẩu ốc Hà Nội là nơi đưa thực khách bước vào sức hấp dẫn của món ngon ngày nhiều gió,..</p>
                                    </div>
                                    <div className="relative overflow-hidden ">
                                        <img src="https://statics.vinpearl.com/Quan-kem-ngon-Ha-Noi-26_1692967629.jpg" 
                                            alt="Image"
                                            className="w-[450px] h-[260px] rounded-md object-cover transition-transform transform scale-100 hover:scale-105" 
                                        />
                                        <h2 className="mt-2 font-bold">Điểm mặt 23 quán kem ngon Hà Nội đa vị, đa sắc cho team mê kem</h2>
                                        <div className="flex items-center space-x-4 mb-2 mt-2">
                                            <span className="flex items-center space-x-1 text-[#82888f]"><AiOutlineCalendar/><span>25/8/2023</span></span>
                                            <span className="flex items-center space-x-1 text-[#82888f]"><AiOutlineEye/><span>2.002</span></span>
                                        </div>
                                        <p className="text-[#82888f]">Mỗi quán lẩu ốc Hà Nội là nơi đưa thực khách bước vào sức hấp dẫn của món ngon ngày nhiều gió,..</p>
                                    </div>
                                </div>
                            </div>
                            <div className="w-[428px]">
                                <h1 className="mb-10 text-[22px] font-medium">Tìm kiếm</h1>
                                <div className="border-t-black border-t-2 ">
                                    <div className="relative mt-8">
                                        <input className=" border z-0 border-[#e0e0e0] w-[428px] h-[55px] pl-[55px] " type="text" placeholder="Tìm kiếm từ khóa ..."/>
                                        <span className="absolute mt-1 end-5 top-3 text-[27px] "><AiOutlineSearch/></span>
                                    </div>
                                </div>
                                <div>
                                    <h1 className="mb-3 mt-10 text-[22px] font-medium">Ưu đãi hot nhất</h1>
                                    <div className="border-t-[#e0e0e0] border-t-2 flex pt-5 space-x-4 mb-5">
                                        <img src="https://booking-static.vinpearl.com/tours/9aba1c9bf5ae4192b05ae0f1cce6b516_zipline%20(1)_vinwonders-nha-trang-ve-vao-cua-2-chieu.jpg" 
                                            alt="" 
                                            className="w-[140px] h-[80px]  rounded"
                                        />
                                        <div>
                                            <p className="text-[13px]">Giá chỉ từ <span className="text-[#e8952f]">1.000.000 đ</span></p>
                                            <a className="font-bold" href="">VinWonders Nha Trang</a>
                                        </div>
                                    </div>
                                    <div className="border-t-[#e0e0e0] border-t-2 flex pt-5 space-x-4 mb-5">
                                        <img src="https://booking-static.vinpearl.com/tours/9a07a94fe8154ebabc209cb7f83273e2_VPPQ_Festive%20202039%20(1)_Combo-ve-vao-cua-vinwonders-safari.jpg" 
                                            alt="" 
                                            className="w-[140px] h-[80px]  rounded"
                                        />
                                        <div>
                                            <p className="text-[13px]">Giá chỉ từ <span className="text-[#e8952f]">1.000.000 đ</span></p>
                                            <a className="font-bold" href="">[VinWonders & Vinpearl Safari Phú Quốc] - Combo Vé vào cửa...</a>
                                        </div>
                                    </div>
                                    <div className="border-t-[#e0e0e0] border-t-2 flex pt-5 space-x-4 mb-5">
                                        <img src="https://booking-static.vinpearl.com/tours/ece6e58a02fd48de9eba9d3f4689f77a_Hinh-anh-VinWonders-Nam-Hoi-An-River-Safari-3x2-so-1%20(1)_vinwonders-nam-hoi-an-ve-vao-cua.jpg" 
                                            alt="" 
                                            className="w-[140px] h-[80px]  rounded"
                                        />
                                        <div>
                                            <p className="text-[13px]">Giá chỉ từ <span className="text-[#e8952f]">1.000.000 đ</span></p>
                                            <a className="font-bold" href="">VinWonders Nam Hội An</a>
                                        </div>
                                    </div>
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

export default New
