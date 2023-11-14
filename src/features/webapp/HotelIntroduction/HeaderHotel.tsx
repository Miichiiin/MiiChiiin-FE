import { useEffect, useRef, useState } from "react";
import {
  AiOutlineSearch,
  AiOutlineRight,
  AiOutlineMenu,
  AiOutlineDown,
} from "react-icons/ai";
import "../../../components/Css/index.css";
import Cart from "@/components/cart";
import {
  useGetHotel_homeByIdQuery,
  useGetHotel_homesQuery,
} from "@/api/webapp/hotel_home";
import { Link, useParams } from "react-router-dom";
const HeaderHotel = () => {
  const { id } = useParams<{ id: string }>();
  const { data: hotelData } = useGetHotel_homeByIdQuery(id);
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
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  /*Menu điều hướng*/
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
  //
  return (
    <div>
      <header className=" ">
        <div>
          <img
            className="w-full relative mb-5 h-[670px]"
            src="https://statics.vinpearl.com/styles/1920x1004/public/2023_03/vinholidays-fiesta-phu-quoc-banner_1679989823.jpg.webp?itok=ODH70Jom"
            alt=""
          />
          <div
            className={`w-full h-[130px] z-20 text-white p-4 transition duration-300 ease-in-out ${
              isFixed
                ? "fixed top-0 left-0 duration-800 animate-slide-down bg-gray-800 pl-[120px]"
                : "duration-500 "
            }`}
          >
            <div
              className="xl:w-[1280px] xl:mx-auto inset-0 absolute top-0 
                        lg:text-[15px] lg:mr-10 
                        sm:mr-10
                        "
            >
              <div
                className="flex items-center justify-end space-x-2 mt-6 text-white 
                         lg:text-[15px] "
              >
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
                  className="flex items-center border-white space-x-1 "
                >
                  <img
                    className="rounded-full w-5 h-5"
                    src="https://st.quantrimang.com/photos/image/2021/09/05/Co-Vietnam.png"
                    alt=""
                  />
                  <span className="font-medium text-[16px] hover:">VIE</span>{" "}
                  <AiOutlineRight />
                </button>
                <Cart />

                {isDropdownOpen && (
                  <div className="absolute mt-[220px] bg-white border border-gray-300 shadow-lg ">
                    <ul className="py-3 px-6 leading-9 text-black">
                      <li>Vietnamese</li>
                      <li>English</li>
                      <li>China</li>
                      <li>Korea</li>
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
                    <button onClick={toggleMenuu} className="h-[40px] pb-3 ">
                      <AiOutlineMenu />
                    </button>
                    <li className="group  h-[40px]  after-4 font-medium">
                      <div className="">
                        <a href="">Khách sạn</a>
                      </div>
                    </li>
                    <li className="h-[40px] group after-4 font-medium">
                      <div className="">
                        <a href="">Hạng phòng</a>
                      </div>
                    </li>
                    <li className="h-[40px] after-4 font-medium">
                      <a href="">Ẩm thực</a>
                    </li>
                    <li className="h-[40px] after-4 font-medium">
                      <a href="/new">Ưu đãi</a>
                    </li>
                  </ul>
                  <button className="h-[40px] pb-3 lg:hidden ml-5">
                    <AiOutlineMenu />
                  </button>
                  <img
                    className="w-[80px] mb-6 lg:hidden "
                    src="https://vinpearl.com/themes/porto/img/vinpearl/vp.svg"
                    alt=""
                  />
                  <a
                    href=""
                    className="px-5 py-2 bg-[#e8952f] text-white font-medium"
                  >
                    Đặt ngay
                  </a>
                </div>
              </div>
              <div
                className={` transition-opacity z-0 lg:ml-10 absolute top-[450px] sm:ml-5 ${
                  isFixed ? "absolute top-[-400px] opacity-0 " : ""
                }`}
              >
                <h1
                  className="lg:text-[45px] text-white mb-5 sm:text-[30px] font-medium"
                  style={{ textShadow: "2px 2px 4px #000" }}
                >
                  {hotelData?.name}
                </h1>
                <p
                  className="text-white sm:text-[11px] lg:text-[20px] font-medium"
                  style={{ textShadow: "2px 2px 4px #000" }}
                >
                  {hotelData?.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>
      {isMenuOpen && (
        <div
          ref={menuRef}
          className={`fixed top-0 z-30 box-shadow left-0 w-[400px] h-full bg-white text-white  transition-transform duration-300 ease-in-out transform 
            ${
              isMenuOpen
                ? "translate-x-0 fixed top-0  left-0 duration-800  text-white "
                : "-translate-x-full opacity-0 duration-800"
            }`}
        >
          <div className="h-[130px] bg-gray-800">
            <button
              onClick={closeMenu}
              className="absolute top-4 right-4 text-white text-2xl "
            >
              <span>&times;</span>
            </button>
          </div>
          <div className="text-gray-800 text-[21px] leading-[50px] px-10 py-10 font-medium">
            <div className="flex items-center justify-between">
              <a href="">Khách sạn</a>{" "}
              <span className="mt-1 text-[12px] ">
                <AiOutlineDown />
              </span>
            </div>
            <p className="flex items-center justify-between">
              <a href="">Trải nghiện</a>{" "}
              <span className="mt-1 text-[12px] ">
                <AiOutlineDown />
              </span>
            </p>
            <p>
              <a href="">Ưu đãi khuyến mãi</a>
            </p>
            <p>
              <a href="">New</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
export default HeaderHotel;
