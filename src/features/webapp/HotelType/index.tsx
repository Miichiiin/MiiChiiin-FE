import { AiOutlineEnvironment, AiOutlinePhone, AiOutlineReconciliation, AiFillWechat } from "react-icons/ai";
import HeaderHotelType from "./HeaderHotelType";
import Search from "@/components/Search";

import { Rate } from 'antd';
import { useState } from "react";
import { Link } from "react-router-dom";
import { useGetHotel_homesQuery } from "@/api/webapp/hotel_home";

const desc = ['terrible', 'bad', 'normal', 'good', 'wonderful'];

const HotelType = () => {
    const { data: booking} = useGetHotel_homesQuery();
    const [value, setValue] = useState(4);
    return (
        <div>
            <HeaderHotelType /><br /><br /><br /><br /><br />
            <Search />
            <div>
                <div className="w-[1280px] mx-auto mt-10 leading-[80px]">
                    <h1 className="text-[30px] font-medium">Khám phá khách sạn Vinpearl</h1>
                    <a className="text-[23px] font-medium pb-2 border-b-2 border-[#f2ba50]" href="">Điểm đến</a>
                    <div className="space-x-4 md:grid-clos-2 ">
                        <a className="border-2 border-black py-3 px-9 rounded-md font-medium " href="">Phú Quốc</a>
                        <a className="border-2 border-black py-3 px-9 rounded-md font-medium " href="">Nha Trang</a>
                        <a className="border-2 border-black py-3 px-9 rounded-md font-medium " href="">Nam Hội An</a>
                        <a className="border-2 border-black py-3 px-9 rounded-md font-medium " href="">Đà Nẵng</a>
                        <a className="border-2 border-black py-3 px-9 rounded-md font-medium " href="">Hạ Long</a>
                    </div>
                    <p>Có 1 khách sạn tại <span className="font-medium">Phú Quốc</span></p>
                </div>
                <div className="fixed bottom-4 z-10 right-4 w-20 h-20  bg-[#f2ba50] border border-gray-300 rounded-full shadow-md p-4 ">
                    
                    <span className="text-[50px] text-white"><AiFillWechat /></span>
                </div>
                <div>
                    {booking?.map((item: any) => {
                        return <>
                            <Link to={`/hotel/${item.id}`} className="w-[1280px] mx-auto shadow-lg rounded-md flex space-x-8 my-5">
                                <img className="rounded-l-sm" src="https://statics.vinpearl.com/styles/images_530_x_312/public/2021_08/vinpearl-resort-&-spa-phu-quoc-1_1629092655.jpg.webp?itok=Ui1quUvu" alt="" />
                                <div className="py-3 ">
                                    <h1 className="text-[26px] font-bold">{item?.name}</h1>
                                    <p className="mt-5 text-[18px]"><AiOutlineEnvironment /><span>{item?.city_name}</span></p>
                                    <p className="mt-5 text-[18px]"><AiOutlinePhone />(+84) {item?.phone}</p>
                                    <p className="mt-4 text-[18px]"><AiOutlineReconciliation /></p>

                                    <span>
                                        <Rate tooltips={desc} value={value} />
                                        {value ? <span className="ant-rate-text">{desc[value - 1]}</span> : ''}
                                    </span>
                                </div>
                            </Link>
                        </>
                    })}

                </div>
            </div>
        </div>
    )
}

export default HotelType
