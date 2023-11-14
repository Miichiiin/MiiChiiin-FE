import { useEffect, useRef, useState } from "react";
import {
  AiOutlineSearch,
  AiOutlineRight,
  AiOutlineEnvironment,
} from "react-icons/ai";
import video from "../video/vdeo.mp4";
import "../components/Css/index.css";
import Cart from "./cart";
import { Link } from "react-router-dom";
import { useGetHotel_homesQuery } from "@/api/webapp/hotel_home";
import SearchOrder from "./SearchOrder";

const Header = () => {
  /*Hàm Dropdow*/
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { data: hotels } = useGetHotel_homesQuery();

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  /*click ngoài = out*/
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    setIsScrollLocked(false); // Đặt giá trị trạng thái cuộn trang
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        closeMenu();
      }

      if (isDropdownOpen && !target?.closest(".dropdown-button")) {
        setIsDropdownOpen(false);
      }
    };

    window.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);
  /*menu điều hướng*/
  const toggleMenuu = () => {
    setIsMenuOpen(!isMenuOpen);
    setIsScrollLocked(!isMenuOpen); // Đặt giá trị trạng thái cuộn trang
  };
  const closeMenuu = () => {
    setIsMenuOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        closeMenu();
      }
    };

    window.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  /*Khóa cuộn trang*/
  const [isScrollLocked, setIsScrollLocked] = useState(false);

  useEffect(() => {
    if (isScrollLocked) {
      document.documentElement.style.overflow = "hidden"; // Khóa cuộn trang
    } else {
      document.documentElement.style.overflow = "auto"; // Cho phép cuộn trang
    }

    return () => {
      document.documentElement.style.overflow = "auto"; // Đảm bảo rằng cuộn trang đã được kích hoạt trở lại khi component bị unmount
    };
  }, [isScrollLocked]);

  /*cố định menu*/
  const [isFixed, setIsFixed] = useState(false);
  const handleScroll = () => {
    setIsFixed(window.scrollY > 800);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const [loggedIn, setLoggedIn] = useState<any | null>(() => {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  });

  const handleLogout = () => {
    const confirm = window.confirm("Bạn có muốn đăng xuất");
    if (confirm) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setLoggedIn(null);
    }
  };

  return (
    <div>
      <header className=" ">
        <div>
          <video
            className="w-full relative mb-5 "
            src={video}
            // autoPlay
            muted
            loop
          />
          <div
            className={`w-full h-[130px] z-20 text-white p-4 transition duration-300 ease-in-out ${
              isFixed
                ? "fixed  top-0 left-0 duration-800 animate-slide-down bg-gray-800 pl-[120px]"
                : "duration-500 "
            }`}
          >
            <div className="xl:w-[1280px] xl:mx-auto inset-0 absolute top-0 lg:text-[15px] lg:mr-10 sm:mr-10">
              <div className="flex items-center justify-end space-x-2 mt-6 text-white lg:text-[15px] ">
                <span className="text-[28px] ">
                  {""}
                  <button className="h-[40px] pb-3 " onClick={toggleMenu}>
                    <AiOutlineSearch />
                  </button>
                </span>{" "}
                {loggedIn ? (
                  <>
                    <div className="text-white me-3">
                      Xin chào : {loggedIn?.name}
                    </div>
                    <button
                      onClick={handleLogout}
                      className=" px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-orange-500 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
                      style={{ marginRight: "30px" }}
                    >
                      {" "}
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="hover:underline"
                      style={{ textShadow: "1px 2px 3px #000" }}
                    >
                      Đăng nhập
                    </Link>
                    <AiOutlineRight />
                  </>
                )}
                <span className="pl-2 pr-1 text-[14px]">/</span>
                <button
                  type="submit"
                  onClick={toggleDropdown}
                  className="flex items-center border-white space-x-1 dropdown-button"
                >
                  <img
                    className="rounded-full w-5 h-5"
                    src="https://st.quantrimang.com/photos/image/2021/09/05/Co-Vietnam.png"
                    alt=""
                  />
                  <span
                    className="font-medium text-[16px] hover:underline"
                    style={{ textShadow: "1px 2px 3px #000" }}
                  >
                    VIE
                  </span>{" "}
                  <AiOutlineRight />
                </button>
                <Cart />
                {isDropdownOpen && (
                  <div className="absolute mt-[200px] bg-white border border-gray-300 shadow-lg ">
                    <ul className="leading-9 text-black">
                      <li className="hover:bg-[#f2ba50] hover:text-white px-10 ">
                        Tiếng việt
                      </li>
                      <li className="hover:bg-[#f2ba50] hover:text-white px-10">
                        English
                      </li>
                      <li className="hover:bg-[#f2ba50] hover:text-white px-10">
                        China
                      </li>
                      <li className="hover:bg-[#f2ba50] hover:text-white px-10">
                        Korea
                      </li>
                    </ul>
                  </div>
                )}
              </div>

              <div className="">
                <div
                  className="flex items-center mx-auto mt-6 justify-between  
                                lg:ml-10

                            "
                >
                  <ul
                    className="flex items-center space-x-[30px] text-[12px] text-white 
                                    xl:space-x-[80px] xl:text-[17px]
                                    lg:space-x-[60px] lg:text-[15px] lg:block lg:flex
                                    sm:hidden
                                "
                  >
                    <button className="h-[40px] pb-3 " onClick={toggleMenuu}>
                      {/* <AiOutlineMenu /> */}
                    </button>
                    <ul className="group h-[40px] after-3">
                      <li className="relative">
                        <a
                          href="/hoteltype"
                          style={{ textShadow: "2px 2px 4px #000" }}
                        >
                          Khách sạn
                        </a>
                        <div className="top-10 bg-white px-6 py-3 text-black flex grid-cols-4 w-[1050px] gap-[60px] absolute hidden group-hover:block group-hover:flex transition duration-2000 border rounded shadow-md">
                          {hotels?.map((hotel: any) => (
                            <div key={hotel.id} className="leading-[45px]">
                              <span className="flex items-center space-x-2 text-[17px] hover:text-[#f2ba50]">
                                <AiOutlineEnvironment />{" "}
                                <Link to={`/hoteltype`}>
                                  <span>{hotel?.city_name}</span>
                                </Link>
                              </span>
                              <Link to={`/hotel/${hotel.id}`}>
                                {" "}
                                {/* Sử dụng Link để chuyển đến trang HotelIntroduction */}
                                <p className="text-[12px] hover:text-[#f2ba50]">
                                  <a href="">{hotel?.name}</a>
                                </p>
                              </Link>
                            </div>
                          ))}
                        </div>
                      </li>
                    </ul>

                    <li className="h-[40px] group after-3 ">
                      <div className="">
                        <a
                          href="/promotion"
                          style={{ textShadow: "2px 2px 4px #000" }}
                        >
                          Trải nghiệm
                        </a>
                        <div className="top-10 bg-white px-6 py 6 text-black flex grid-cols-4 w-[750px] gap-[60px] absolute  hidden group-hover:block group-hover:flex transition duration-2000 border rounded shadow-md">
                          <div className="leading-[45px]">
                            <span className="flex items-center space-x-2 text-[17px] hover:text-[#f2ba50]">
                              <AiOutlineEnvironment /> <span>Phú Quốc</span>
                            </span>
                            <p className="text-[12px] hover:text-[#f2ba50]">
                              <a href="">VinHolidays Fiesta Phú Quốc</a>
                            </p>
                            <p className="text-[12px] hover:text-[#f2ba50]">
                              <a href="">Vinpearl Wonderworld Phú Quốc</a>
                            </p>
                            <p className="text-[12px] hover:text-[#f2ba50]">
                              <a href="">Vinpearl Resort & Spa Phú Quốc</a>
                            </p>
                          </div>
                          <div className="leading-[45px]">
                            <span className="flex items-center space-x-2 text-[17px] hover:text-[#f2ba50]">
                              <AiOutlineEnvironment /> <span>Nha Trang</span>
                            </span>
                            <p className="text-[12px] hover:text-[#f2ba50]">
                              <a href="">Vinpearl Resort & Spa Nha Trang Bay</a>
                            </p>
                            <p className="text-[12px] hover:text-[#f2ba50]">
                              <a href="">Vinpearl Resort Nha Trang</a>
                            </p>
                            <p className="text-[12px] hover:text-[#f2ba50]">
                              <a href="">Vinpearl Sealink Nha Trang</a>
                            </p>
                          </div>
                          <div className="leading-[45px]">
                            <span className="flex items-center space-x-2 text-[17px] hover:text-[#f2ba50]">
                              <AiOutlineEnvironment /> <span>Hội An</span>
                            </span>
                            <p className="text-[12px] hover:text-[#f2ba50]">
                              <a href="">Vinpearl Resort & Spa Hội An</a>
                            </p>
                            <p className="text-[12px] hover:text-[#f2ba50]">
                              <a href="">Vinpearl Resort & Golf Nam Hội An</a>
                            </p>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li className="h-[40px] after-3">
                      <a
                        href="/promotion"
                        style={{ textShadow: "2px 2px 4px #000" }}
                      >
                        Ưu đãi khuyến mãi
                      </a>
                    </li>
                    <li className="h-[40px] after-3">
                      <a href="/new" style={{ textShadow: "2px 2px 4px #000" }}>
                        New
                      </a>
                    </li>
                    <li>
                      <a
                        href="/loginadmin"
                        style={{ textShadow: "2px 2px 4px #000" }}
                      >
                        Quan tri
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div
                className={` transition-opacity z-0 lg:ml-10 absolute top-[300px] sm:ml-5 ${
                  isFixed ? "absolute top-[-400px] opacity-0 " : ""
                }`}
              >
                <h1
                  className="lg:text-[35px] text-white mb-5 sm:text-[30px] font-bold "
                  style={{ textShadow: "1px 2px 3px #000" }}
                >
                  Chào mừng đến với Vinpearl
                </h1>
                <p
                  className="text-white sm:text-[11px] lg:text-[16px] font-semibold"
                  style={{ textShadow: "1px 2px 3px #000" }}
                >
                  Đánh thức mọi giác quan với hệ sinh thái nghỉ dưỡng ven biển
                  đẳng cấp của Vinpearl
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>
      {isMenuOpen && (
        <div
          ref={menuRef}
          className={`fixed top-[100px] z-30 box-shadow left-0 transition-transform duration-300 ease-in-out transform 
            ${
              isMenuOpen
                ? "translate-x-0 fixed top-0  left-0 duration-800  text-white "
                : "-translate-x-full opacity-0 duration-800"
            }`}
        >
          <SearchOrder />
        </div>
      )}
    </div>
  );
};

export default Header;
