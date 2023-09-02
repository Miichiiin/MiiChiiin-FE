import { useEffect, useState } from "react";
import { AiOutlineSearch ,AiOutlineRight,AiOutlineMenu,AiOutlineEnvironment} from "react-icons/ai";
import "../../../components/Css/index.css"
const HeaderHotelType = () => {
    /*Hàm Dropdow*/ 
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
  };
  /*cố định menu*/ 
  const [isFixed, setIsFixed] = useState(false);
  const handleScroll = () => {
    setIsFixed(window.scrollY > 800);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
    /*slideshow*/ 
  return (
    <div>
        <header className=" ">
            <div>
                <img src="" alt="" />
                <div className={`w-full h-[130px] z-20 text-white p-4 transition duration-300 ease-in-out ${isFixed ? 'fixed top-0 left-0 duration-800 animate-slide-down text-white bg-gray-800 pl-[120px]' : 'duration-500 '}`}>
                    <div className="border-b-2 pb-6 mb-10">
                        <div className="xl:w-[1280px] xl:mx-auto h-[50px] flex items-center justify-between
                            lg:text-[15px] lg:mr-10 text-[#616971]
                            sm:mr-10
                            ">
                            <div className="text-[25px] pt-6"><AiOutlineMenu/></div>
                            <img src="https://booking.vinpearl.com/static/media/vinpearl-logo@2x.cc2b881d.svg" alt="" />
                            <div className="flex items-center justify-end space-x-2 mt-6 text-black lg:text-[15px]">
                                <a href="" className=" font-medium">Đăng nhập</a><AiOutlineRight/>
                                <span className="pl-2 pr-1 text-[14px]">/</span>
                                <button type="submit" onClick={toggleDropdown} className="flex items-center border-white space-x-1 ">
                                    <img className="rounded-full w-5 h-5" src="https://st.quantrimang.com/photos/image/2021/09/05/Co-Vietnam.png" alt="" /> 
                                    <span className="font-medium text-[16px] hover:">VIE</span> <AiOutlineRight/>
                                </button>
                                {isDropdownOpen && (
                                    <div className="absolute mt-[220px] bg-white border border-gray-300 shadow-lg ">
                                        <ul className="py-3 px-6 leading-9 text-black" >
                                            <li>Vietnamese</li>
                                            <li>English</li>
                                            <li>China</li>
                                            <li>Korea</li>
                                        </ul>
                                    </div>
                                )}
                            
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    </div>
  )
}

export default HeaderHotelType
