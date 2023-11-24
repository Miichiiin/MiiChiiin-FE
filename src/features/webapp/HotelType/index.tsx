import  { useState, useEffect } from "react";
import { AiOutlineEnvironment, AiOutlinePhone, AiOutlineMail , AiFillWechat,AiOutlineSchedule } from "react-icons/ai";
import HeaderHotelType from "./HeaderHotelType";
import Search from "@/components/Search";
import { Rate } from 'antd';
import { Link } from "react-router-dom";
import { useGetHotel_homesQuery } from "@/api/webapp/hotel_home";
import '../../../components/Css/index.css'
const desc = ['kém', 'tệ', 'bình thường', 'tốt', 'tuyệt vời'];

const HotelType = () => {
    const { data: booking } = useGetHotel_homesQuery();
    console.log("data",booking);
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
                <div className="w-[1024px] mx-auto mt-10 leading-[80px]">
                    <h1 className="text-[30px] font-medium">Khám phá khách sạn Vinpearl</h1>
                    <div className="space-x-4 md:grid-cols-2 ">
                        {locations && locations?.map((location:any, index:any) => (
                            <a
                                key={index}
                                className={`border-2 border-black py-2 px-8 rounded-md font-medium ${selectedLocation === location ? 'bg-[#f2ba50] text-white border-none' : ''}`}
                                href="#"
                                onClick={() => handleLocationSelect(location)}
                            >
                                {location}
                            </a>
                        ))}
                    </div>
                    <p className="font-medium text-lg mt-10">Có <span className="font-bold text-xl">{filteredHotels?.length}</span> khách sạn tại <span className="font-bold text-xl">{selectedLocation}</span></p>
                </div>
                <div className="fixed bottom-4 z-10 right-4 w-20 h-20 bg-[#f2ba50] border border-gray-300 rounded-full shadow-md p-4 ">
                    <span className="text-[50px] text-white"><AiFillWechat /></span>
                </div>
                <div>
                    {filteredHotels && filteredHotels?.map((item:any, index:any) => (
                        <Link to={`/hotel/${item.id}`} className="w-[1024px] mx-auto box-shadow rounded-md flex space-x-8 my-5" key={index}>
                            <div className="w-[50%]"><img className="rounded-l-sm" src={item?.image?.[0]?.image} alt="" /></div>
                            <div className="py-3 ">
                                <h1 className="text-[26px] font-bold">{item?.name}</h1>
                                <span className="font-medium ">
                                    <Rate tooltips={desc} value={item.star} />
                                    ({item?.star}/5)
                                </span>
                                <p className="mt-5 text-[17px] flex items-center space-x-2 "><AiOutlineEnvironment /><span>{item?.address}</span></p>
                                <p className="mt-5 text-[17px] flex items-center space-x-2 "><AiOutlinePhone class="text-xl"/> <span>(+84) {item?.phone}</span></p>
                                <p className="mt-4 text-[17px] flex items-center space-x-2 "><AiOutlineMail /><span>{item?.email}</span></p>
                                <p className="mt-5 text-[17px] flex items-center space-x-2 "><AiOutlineSchedule /><span>{item?.description}</span></p>

                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default HotelType;
