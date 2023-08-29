import { useEffect, useState } from "react";
import { AiOutlineSearch ,AiOutlineRight,AiOutlineMenu,AiOutlineEnvironment} from "react-icons/ai";
import video from '../video/vdeo.mp4'
import "../components/Css/index.css"
const Header = () => {
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
                <video className="w-full relative mb-5" src={video} autoPlay muted loop/>
                <div className={`w-full h-[130px] z-20 text-white p-4 transition duration-300 ease-in-out ${isFixed ? 'fixed top-0 left-0 duration-800 animate-slide-down bg-gray-800 pl-[120px]' : 'duration-500 '}`}>
                    <div className="xl:w-[1280px] xl:mx-auto inset-0 absolute top-0 
                        lg:text-[15px] lg:mr-10 
                        sm:mr-10
                        ">
                        <div className="flex items-center justify-end space-x-2 mt-6 text-white 
                         lg:text-[15px] 
                        ">
                            <span className="text-[28px] "> < AiOutlineSearch/></span> <a href="" className="hover:">Đăng nhập</a><AiOutlineRight/>
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
                        <div className="">
                            <div className="flex items-center mx-auto mt-6 justify-between  
                                lg:ml-10

                            ">
                                <ul className="flex items-center space-x-[30px] text-[12px] text-white 
                                    xl:space-x-[80px] xl:text-[17px]
                                    lg:space-x-[60px] lg:text-[15px] lg:block lg:flex
                                    sm:hidden
                                ">
                                    <button className="h-[40px] pb-3 "><AiOutlineMenu/></button>
                                    <li className="group  h-[40px]  after-3 ">
                                        <div className="">
                                            <a href="" >Khách sạn</a>
                                            <div className="top-10 bg-white px-6 py 6 text-black flex grid-cols-4 w-[1050px] gap-[60px] absolute  hidden group-hover:block group-hover:flex transition duration-2000">
                                                <div className="leading-[45px]">
                                                    <span className="flex items-center space-x-2 text-[17px] hover:text-[#f2ba50]"><AiOutlineEnvironment/> <span>Phú Quốc</span></span>
                                                    <p className="text-[12px] hover:text-[#f2ba50]"><a href="">VinHolidays Fiesta Phú Quốc</a></p>
                                                    <p className="text-[12px] hover:text-[#f2ba50]"><a href="">Vinpearl Wonderworld Phú Quốc</a></p>
                                                    <p className="text-[12px] hover:text-[#f2ba50]"><a href="">Vinpearl Resort & Spa Phú Quốc</a></p>
                                                </div>
                                                <div className="leading-[45px]">
                                                    <span className="flex items-center space-x-2 text-[17px] hover:text-[#f2ba50]"><AiOutlineEnvironment/> <span>Nha Trang</span></span>
                                                    <p className="text-[12px] hover:text-[#f2ba50]"><a href="">Vinpearl Resort & Spa Nha Trang Bay</a></p>
                                                    <p className="text-[12px] hover:text-[#f2ba50]"><a href="">Vinpearl Resort Nha Trang</a></p>
                                                    <p className="text-[12px] hover:text-[#f2ba50]"><a href="">Vinpearl Sealink Nha Trang</a></p>
                                                    <p className="text-[12px] hover:text-[#f2ba50]"><a href="">Vinpearl Luxury Nha Trang</a></p>
                                                    <p className="text-[12px] hover:text-[#f2ba50]"><a href="">Vinpearl Beachfront Nha Trang</a></p>
                                                    <p className="text-[12px] hover:text-[#f2ba50]"><a href="">Vinpearl Golflink Nha Trang</a></p>   
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
                                    </li>
                                    <li className="h-[40px] group after-3 ">
                                    <div className="">
                                            <a href="" >Trải nghiệm</a>
                                            <div className="top-10 bg-white px-6 py 6 text-black flex grid-cols-4 w-[750px] gap-[60px] absolute  hidden group-hover:block group-hover:flex transition duration-2000">
                                                <div className="leading-[45px]">
                                                    <span className="flex items-center space-x-2 text-[17px] hover:text-[#f2ba50]"><AiOutlineEnvironment/> <span>Phú Quốc</span></span>
                                                    <p className="text-[12px] hover:text-[#f2ba50]"><a href="">VinHolidays Fiesta Phú Quốc</a></p>
                                                    <p className="text-[12px] hover:text-[#f2ba50]"><a href="">Vinpearl Wonderworld Phú Quốc</a></p>
                                                    <p className="text-[12px] hover:text-[#f2ba50]"><a href="">Vinpearl Resort & Spa Phú Quốc</a></p>
                                                </div>
                                                <div className="leading-[45px]">
                                                    <span className="flex items-center space-x-2 text-[17px] hover:text-[#f2ba50]"><AiOutlineEnvironment/> <span>Nha Trang</span></span>
                                                    <p className="text-[12px] hover:text-[#f2ba50]"><a href="">Vinpearl Resort & Spa Nha Trang Bay</a></p>
                                                    <p className="text-[12px] hover:text-[#f2ba50]"><a href="">Vinpearl Resort Nha Trang</a></p>
                                                    <p className="text-[12px] hover:text-[#f2ba50]"><a href="">Vinpearl Sealink Nha Trang</a></p>
                                                </div>
                                                <div className="leading-[45px]">
                                                    <span className="flex items-center space-x-2 text-[17px] hover:text-[#f2ba50]"><AiOutlineEnvironment/> <span>Hội An</span></span>
                                                    <p className="text-[12px] hover:text-[#f2ba50]"><a href="">Vinpearl Resort & Spa Hội An</a></p>
                                                    <p className="text-[12px] hover:text-[#f2ba50]"><a href="">Vinpearl Resort & Golf Nam Hội An</a></p>
                                                </div>
                                            
                                            </div>
                                        </div>
                                    </li>
                                    <li className="h-[40px] after-3"><a href="">Ưu đãi khuyến mãi</a></li>
                                    <li className="h-[40px] after-3">
                                        <a href="">New</a>
                                    </li>
                                </ul>
                                <button className="h-[40px] pb-3 lg:hidden ml-5"><AiOutlineMenu/></button>
                                <img className="w-[80px] mb-6 lg:hidden " src="https://vinpearl.com/themes/porto/img/vinpearl/vp.svg" alt="" />
                                <a href="" className="px-5 py-2 bg-[#e8952f] text-white font-medium">Đặt ngay</a>
                                
                            </div>
                        </div>
                        <div className={` transition-opacity z-0 lg:ml-10 absolute top-[300px] sm:ml-5 ${isFixed ? 'absolute top-[-400px] opacity-0 ' : ''}`}>
                            <h1 className="lg:text-[35px] text-white mb-5 sm:text-[30px] ">Chào mừng đến với Vinpearl</h1>
                            <p className="text-white sm:text-[11px] lg:text-[16px]">Đánh thức mọi giác quan với hệ sinh thái nghỉ dưỡng ven biển đẳng cấp của Vinpearl</p>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    </div>
  )
}

export default Header
