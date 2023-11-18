import { useEffect, useRef, useState } from "react";
import { AiOutlineRight, AiOutlineMenu, AiOutlineDown } from "react-icons/ai";
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
    localStorage.removeItem("selectedRooms");
    localStorage.removeItem("totalPrice");
    localStorage.removeItem("selectedVoucherDetails");
  };

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
          <div className="fixed top-0 left-0 w-full  z-20 bg-white ">
            <div className="border-b-2 pb-6  ">
              <div
                className="xl:w-[1280px] xl:mx-auto h-[50px] flex items-center justify-between
                            lg:text-[15px] lg:mr-10 text-[#616971]
                            sm:mr-10 relative
                            "
              >
                <div onClick={toggleMenu} className="text-[25px] pt-6">
                  <AiOutlineMenu />
                </div>
                <Link to="/homepage" onClick={clearLocalStorageData}>
                  {/* Đặt hàm clearLocalStorageData khi click vào liên kết */}
                  <img
                    src="https://res.cloudinary.com/dzqywzres/image/upload/v1700062478/u7kzl2ufmmbe66o9kivw.png"
                    alt=""
                    className="absolute top-2 w-[200px] end-[45%]"
                  />
                </Link>

                <div className="flex items-center justify-end space-x-2 mt-6 text-gray-800 lg:text-[15px]">
                {loggedIn ? (
                  <>
                    <div className="text-white pt-1">
                      <button  onClick={toggleDropdown}>
                          <img className="w-7 h-7 rounded-full " src={loggedIn?.image} alt="" />
                      </button> 
                      {isDropdownOpen && (
                          <div className="flex-col flex absolute bg-white text-black absolute mt-1 end-5 bg-white border border-gray-300 shadow-lg transform transition-tranform durtion-500">
                            <ul className="leading-9 text-black text-center font-medium">
                              <li className="hover:bg-[#f2ba50] hover:text-white px-10">
                                <button
                                  onClick={handleLogout}
                                  className=""
                                >
                                {" "}
                                Logout
                              </button>
                              </li>
                              <li className="hover:bg-[#f2ba50] hover:text-white px-7">
                                Thông tin User
                              </li>
                              <li className="hover:bg-[#f2ba50] hover:text-white px-5">
                                Voucher
                              </li>
                            </ul>
                          </div>
                          )}
                    </div>
                    
                  </>
                ) : (
                  <>
                  {}
                    <Link
                      to="/login"
                      className="hover:underline font-medium"
                    >
                      Đăng nhập 
                    </Link>
                    <AiOutlineRight />
                  </>
                )}
                  <AiOutlineRight />
                  <span className="pl-2 pr-1 text-[14px]">/</span>
                  <Cart />
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      {isMenuOpen && (
        <div
          ref={menuRef}
          className={`fixed top-0 z-30 box-shadow left-0 w-[355px] h-full bg-white text-white  transition-transform duration-800 ease-in-out transform 
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
          <div className="text-gray-800 text-[17px] leading-[50px] px-10 py-10 font-medium">
            <div className="flex items-center justify-between">
              <a href="/hoteltype">Khách sạn</a>{" "}
              <span className="mt-1 text-[12px] ">
              </span>
            </div>
            <p className="flex items-center justify-between">
              <a href="/">Trang chủ</a>{" "}
              <span className="mt-1 text-[12px] ">
              </span>
            </p>
            <p>
              <a href="/promotion">Ưu đãi khuyến mãi</a>
            </p>
            <p>
              <a href="/new">New</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default HeaderHotelType;
