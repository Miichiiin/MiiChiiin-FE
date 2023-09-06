
import React, { useState, useEffect, useRef } from 'react';
import { AiOutlineEnvironment } from "react-icons/ai";
import { useGetHotel_homesQuery } from '@/api/hotel_home';

const SearchInput = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedHotel, setSelectedHotel] = useState(""); // Sử dụng để lưu tên khách sạn đã chọn
  const [divClicked, setDivClicked] = useState(false); // Sử dụng để theo dõi việc bấm vào div
 

  const refCalen = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleDivClick = () => {
    setDivClicked(true); // Khi bấm vào div, đánh dấu rằng div đã được bấm
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (!divClicked && refCalen.current && !refCalen.current.contains(event.target as Node)) {
      setIsDropdownOpen(false);
    }
    setDivClicked(false); // Đặt lại trạng thái khi bấm ngoài div
  };

  // Hàm xử lý khi chọn một khách sạn từ dropdown
  const handleHotelSelect = (hotelName: string) => {
    setSelectedHotel(hotelName); // Lưu tên khách sạn đã chọn vào state
    setIsDropdownOpen(false); // Đóng dropdown sau khi chọn
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [divClicked]); // Theo dõi biến divClicked trong dependencies



  return (
    <div>
      <div ref={refCalen} onClick={handleDivClick}>
        <div onClick={toggleDropdown} className="relative">
          <div className="border z-0 border-[#e0e0e0] xl:w-[400px] xl:h-[55px] xl:pl-[55px] 
                        lg:w-[200px] lg:h-[55px] xl:text-[16px] lg:text-[11px] lg:pl-[40px] 
                        sm:w-[130px] h-[45px] sm:text-[10px] sm:pl-[38px]">
            <span className='text-[#b0b4b8] absolute top-4'>{selectedHotel || 'Bạn nhập nơi muốn đến...'}</span>
          </div>
          <span className="absolute mt-1 xl:start-[23px] lg:start-3 top-3 lg:text-[22px] text-[#b0b4b8] sm:start-4"><AiOutlineEnvironment /></span>
        </div>
        {isDropdownOpen && (
          <div className='absolute'>
            <div className="box-full rounded-md top-1 bg-white px-6 py 6 text-black flex grid-cols-4 w-[1050px] gap-[60px] absolute transition duration-2000">
              
              <div className="leading-[45px]">
                <span className="flex items-center space-x-2 text-[17px] hover:text-[#f2ba50]"><AiOutlineEnvironment /> <span>Phú Quốc</span></span>
                <p className="text-[12px] hover:text-[#f2ba50]" onClick={() => handleHotelSelect("VinHolidays Fiesta Phú Quốc")}>VinHolidays Fiesta Phú Quốc</p>
                <p className="text-[12px] hover:text-[#f2ba50]" onClick={() => handleHotelSelect("Vinpearl Wonderworld Phú Quốc")}>Vinpearl Wonderworld Phú Quốc</p>
                <p className="text-[12px] hover:text-[#f2ba50]" onClick={() => handleHotelSelect("Vinpearl Resort & Spa Phú Quốc")}>Vinpearl Resort & Spa Phú Quốc</p>
              </div>
              <div className="leading-[45px]">
                <span className="flex items-center space-x-2 text-[17px] hover:text-[#f2ba50]"><AiOutlineEnvironment /> <span>Nha Trang</span></span>
                <p className="text-[12px] hover:text-[#f2ba50]" onClick={() => handleHotelSelect("VinHolidays Fiesta Nha Trang")}>VinHolidays Fiesta Nha Trang</p>
                <p className="text-[12px] hover:text-[#f2ba50]" onClick={() => handleHotelSelect("Vinpearl Wonderworld Nha Trang")}>Vinpearl Wonderworld Nha Trang</p>
                <p className="text-[12px] hover:text-[#f2ba50]" onClick={() => handleHotelSelect("Vinpearl Resort & Spa Nha Trang")}>Vinpearl Resort & Spa Nha Trang</p>
              </div>
              <div className="leading-[45px]">
                    <span className="flex items-center space-x-2 text-[17px] hover:text-[#f2ba50]"><AiOutlineEnvironment/> <span>Hội An</span></span>
                    <p className="text-[12px] hover:text-[#f2ba50]"><a href="">Vinpearl Resort & Spa Hội An</a></p>
                    <p className="text-[12px] hover:text-[#f2ba50]"><a href="">Vinpearl Resort & Golf Nam Hội An</a></p>

                    <span className="flex items-center space-x-2 text-[17px] mt-8 hover:text-[#f2ba50]"><AiOutlineEnvironment/> <span>Đà Nẵng</span></span>
                    <p className="text-[12px] hover:text-[#f2ba50]"><a href="">Vinpearl Resort & Spa Hội An</a></p>
                    <p className="text-[12px] hover:text-[#f2ba50]"><a href="">Vinpearl Resort & Spa Đà Nẵng</a></p>
                </div>
                <div className="leading-[45px]">
                    <span className="flex items-center space-x-2 text-[17px] hover:text-[#f2ba50]"><AiOutlineEnvironment/> <span>Quảng Ninh</span></span>
                    <p className="text-[12px] hover:text-[#f2ba50]"><a href="">Vinpearl Resort & Spa Hạ Long</a></p>
                </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

export default SearchInput;
