import React, { useState, useEffect, useRef } from "react";
import { AiOutlineEnvironment } from "react-icons/ai";
import axios from "axios"; // Import thư viện axios
import { useAppDispatch } from "@/app/hook";
import { addSearch } from "@/api/searchSlice";

const SearchInput = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedHotel, setSelectedHotel] = useState("");
  console.log("ten ks:",selectedHotel)
  const [divClicked, setDivClicked] = useState(false);
  const [hotelsData, setHotelsData] = useState([]); // State để lưu dữ liệu từ API
  const dispatch = useAppDispatch();

  if(selectedHotel){
    dispatch(addSearch(selectedHotel))
  }
  

  const refCalen = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleDivClick = () => {
    setDivClicked(true);
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      !divClicked &&
      refCalen.current &&
      !refCalen.current.contains(event.target as Node)
    ) {
      setIsDropdownOpen(false);
    }
    setDivClicked(false);
  };

  const handleHotelSelect = (hotelName: string) => {
    setSelectedHotel(hotelName);
    setIsDropdownOpen(false);
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [divClicked]);

  // Sử dụng useEffect để gọi API khi component được mount
  useEffect(() => {
    axios
      .get("http://localhost:3000/hotel_home") // Thay đổi đường dẫn dựa vào cấu hình của bạn
      .then((response) => {
        setHotelsData(response.data); // Lưu dữ liệu từ API vào state
      })
      .catch((error) => {
        console.error("Error fetching hotels data:", error);
      });
  }, []);

  return (
    <div>
      <div ref={refCalen} onClick={handleDivClick}>
        <div onClick={toggleDropdown} className="relative">
          <div
            className="border z-0 border-[#e0e0e0] xl:w-[400px] xl:h-[55px] xl:pl-[55px] 
                        lg:w-[200px] lg:h-[55px] xl:text-[16px] lg:text-[11px] lg:pl-[40px] 
                        sm:w-[130px] h-[45px] sm:text-[10px] sm:pl-[38px]">
            <span className='text-[#353c46] absolute top-4'>{selectedHotel || 'Bạn nhập nơi muốn đến...'}</span>
          </div>
          <span className="absolute mt-1 xl:start-[23px] lg:start-3 top-3 lg:text-[22px] text-[#353c46] sm:start-4"><AiOutlineEnvironment /></span>
        </div>
        {isDropdownOpen && (
          <div className="absolute">
            <div className="box-full rounded-md top-1 bg-white px-6 py 6 text-black flex grid-cols-4 w-[1050px] gap-[60px] absolute transition duration-2000">
              {hotelsData.map((hotel: any) => (
                <div key={hotel.id} className="leading-[45px]">
                  <span className="flex items-center space-x-2 text-[17px] hover:text-[#f2ba50]">
                    <AiOutlineEnvironment />
                    <span>{hotel.city_name}</span>
                  </span>
                  <p
                    className="text-[12px] hover:text-[#f2ba50]"
                    onClick={() => handleHotelSelect(hotel.name)}
                  >
                    {hotel.name}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchInput;
