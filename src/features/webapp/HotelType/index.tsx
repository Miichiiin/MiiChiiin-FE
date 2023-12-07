import  { useState, useEffect, CSSProperties } from "react";
import { AiOutlineEnvironment, AiOutlinePhone, AiOutlineMail , AiFillWechat,AiOutlineSchedule } from "react-icons/ai";
import HeaderHotelType from "./HeaderHotelType";
import Search from "@/components/Search";
import { Rate } from 'antd';
import { Link } from "react-router-dom";
import { useGetHotel_homesQuery } from "@/api/webapp/hotel_home";
import '../../../components/Css/index.css'
import Footer from "@/components/Footer";
const desc = ['kém', 'tệ', 'bình thường', 'tốt', 'tuyệt vời'];
import FadeLoader from "react-spinners/HashLoader";
const HotelType = () => {
    const { data: booking } = useGetHotel_homesQuery();
    //loading trang
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
     //srollto
     const [userInteracted] = useState(false);
     useEffect(() => {
       if (!userInteracted) {
         window.scrollTo({ top: 0, behavior: 'smooth' });
       }
     }, [userInteracted]); 

    return (
        <div>
            {loading ?
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
                            <p className=" text-lg mt-10">Có <span className="font-medium text-xl">{filteredHotels?.length}</span> khách sạn tại <span className="font-medium text-xl">{selectedLocation}</span></p>
                        </div>
                        <div className="fixed bottom-4 z-10 right-4 w-20 h-20 bg-[#f2ba50] border border-gray-300 rounded-full shadow-md p-4 ">
                            <span className="text-[50px] text-white"><AiFillWechat /></span>
                        </div>
                        <div>
                            {filteredHotels && filteredHotels?.map((item:any, index:any) => (
                                <Link to={`/hotel/${item.id}`} className="w-[1024px] mx-auto box-shadow rounded-md flex space-x-8 my-5" key={index}>
                                    <div className="w-[50%]"><img className="rounded-l-sm" src={item?.image?.[0]?.image} alt="" /></div>
                                    <div className="py-3 ">
                                        <h1 className="text-[26px] font-medium">{item?.name}</h1>
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
                <Footer/>
            </div>
            }
        </div>
    );
}

export default HotelType;
