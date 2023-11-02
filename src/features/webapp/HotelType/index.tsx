import  { useState, useEffect } from "react";
import { AiOutlineEnvironment, AiOutlinePhone, AiOutlineReconciliation, AiFillWechat } from "react-icons/ai";
import HeaderHotelType from "./HeaderHotelType";
import Search from "@/components/Search";
import { Rate } from 'antd';
import { Link } from "react-router-dom";
import { useGetHotel_homesQuery } from "@/api/webapp/hotel_home";

const desc = ['kém', 'tệ', 'bình thường', 'tốt', 'tuyệt vời'];

const HotelType = () => {
    const { data: booking } = useGetHotel_homesQuery();
    const [selectedLocation, setSelectedLocation] = useState("Hà Nội");
    const [locations, setLocations] = useState<any>([]);

    useEffect(() => {
        if (booking) {
            const locations = Array.from(new Set(booking?.map((item:any) => item.city_name)));
            setLocations(locations);
        }
    }, [booking]);

    const handleLocationSelect = (location:any) => {
        setSelectedLocation(location);
    };

    // Lọc danh sách khách sạn theo địa điểm đã chọn
    const filteredHotels = booking?.filter((item:any) => item.city_name === selectedLocation);
    console.log("filteredHotels",filteredHotels);
    

    return (
        <div>
            <HeaderHotelType /><br /><br /><br /><br /><br />
            <Search />
            <div>
                <div className="w-[1280px] mx-auto mt-10 leading-[80px]">
                    <h1 className="text-[30px] font-medium">Khám phá khách sạn Vinpearl</h1>
                    <div className="space-x-4 md:grid-cols-2 ">
                        {locations && locations?.map((location:any, index:any) => (
                            <a
                                key={index}
                                className={`border-2 border-black py-3 px-9 rounded-md font-medium ${selectedLocation === location ? 'bg-[#f2ba50]' : ''}`}
                                href="#"
                                onClick={() => handleLocationSelect(location)}
                            >
                                {location}
                            </a>
                        ))}
                    </div>
                    <p>Có {filteredHotels?.length} khách sạn tại <span className="font-medium">{selectedLocation}</span></p>
                </div>
                <div className="fixed bottom-4 z-10 right-4 w-20 h-20 bg-[#f2ba50] border border-gray-300 rounded-full shadow-md p-4 ">
                    <span className="text-[50px] text-white"><AiFillWechat /></span>
                </div>
                <div>
                    {filteredHotels && filteredHotels?.map((item:any, index:any) => (
                        <Link to={`/hotel/${item.id}`} className="w-[1280px] mx-auto shadow-lg rounded-md flex space-x-8 my-5" key={index}>
                            <img className="rounded-l-sm" src={item?.image?.[0]?.image} alt="" />
                            <div className="py-3 ">
                                <h1 className="text-[26px] font-bold">{item?.name}</h1>
                                <span>
                                    <Rate tooltips={desc} value={item.star} />
                                    {item?.star}
                                </span>
                                <p className="mt-5 text-[18px]"><AiOutlinePhone />(+84) {item?.phone}</p>
                                <p className="mt-4 text-[18px]"><AiOutlineReconciliation />{item?.email}</p>
                                <p className="mt-5 text-[18px]"><AiOutlineEnvironment /><span>{item?.address}</span></p>
                                <p className="mt-5 text-[18px]"><AiOutlineEnvironment /><span>{item?.description}</span></p>

                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default HotelType;
