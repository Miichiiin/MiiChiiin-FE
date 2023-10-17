import { useEffect, useRef, useState } from "react";
import {
  AiOutlineSearch,
  AiOutlineRight,
  AiOutlineMenu,
  AiOutlineDown,
} from "react-icons/ai";
import "../../../components/Css/index.css";
import Cart from "@/components/cart";
import { Link } from "react-router-dom";

const HeaderHotelType = () => {
  /*Hàm Dropdow*/
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  /*cố định menu*/
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    setIsScrollLocked(!isMenuOpen);
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
  /*slideshow*/

   const clearLocalStorageData = () => {
    localStorage.removeItem('selectRoom');
    localStorage.removeItem('totalPrice');
  };
  return (
    <div>
      <header className=" ">
        <div>
          <div className="fixed top-0 left-0 w-full  z-10 bg-white ">
            <div className="border-b-2 pb-6 mb-10 ">
              <div
                className="xl:w-[1280px] xl:mx-auto h-[50px] flex items-center justify-between
                            lg:text-[15px] lg:mr-10 text-[#616971]
                            sm:mr-10
                            "
              >
                <div onClick={toggleMenu} className="text-[25px] pt-6">
                  <AiOutlineMenu />
                </div>
                <Link to="/homepage" onClick={clearLocalStorageData}>
                  {/* Đặt hàm clearLocalStorageData khi click vào liên kết */}
                  <img
                    src="https://booking.vinpearl.com/static/media/vinpearl-logo@2x.cc2b881d.svg"
                    alt=""
                  />
                </Link>

                <div className="flex items-center justify-end space-x-2 mt-6 text-gray-800 lg:text-[15px]">
                  <a href="" className=" font-medium">
                    Đăng nhập
                  </a>
                  <AiOutlineRight />
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
                    <div className="absolute mt-[180px] bg-white border border-gray-300 shadow-lg ">
                      <ul className="leading-9 text-black">
                        <li className="hover:bg-[#f2ba50] hover:text-white px-10  ">
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
              <a href="/hoteltype">Khách sạn</a>{" "}
              <span className="mt-1 text-[12px] ">
                <AiOutlineDown />
              </span>
            </div>
            <p className="flex items-center justify-between">
              <a href="">Trải nghiệm</a>{" "}
              <span className="mt-1 text-[12px] ">
                <AiOutlineDown />
              </span>
            </p>
            <p>
              <a href="/promotion">Ưu đãi khuyến mãi</a>
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

export default HeaderHotelType;
