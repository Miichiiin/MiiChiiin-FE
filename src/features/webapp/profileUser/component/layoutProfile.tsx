
import { AiOutlineShoppingCart, AiOutlineUser } from 'react-icons/ai';
import { BiLogOut } from 'react-icons/bi';
import { BsFillCartCheckFill } from 'react-icons/bs';
import { Link, Outlet } from 'react-router-dom';
import HeaderHotelType from '../../HotelType/HeaderHotelType';
import Footer from '@/components/Footer';
import { useEffect, useState } from 'react';

export const LayoutProfile = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    gender: "",
    image: "",
    cccd: "",
    nationality: "",
    address:""
  });
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    console.log("storedUser", storedUser);
  }, []);

  return (
   <div className='bg-gray-100'>
       <HeaderHotelType/>
     <div className="w-[1200px] mx-auto my-2">
      <div className="grid grid-cols-4  sticky">
        <div className="bg-[#f2ba50]  h-auto col-span-1">
          <div className="ml-8 p-5 text-center">
            <img
              src={user.image}
              alt="imageUser"
              width={200}
              className="rounded-[100%] mt-[150px] my-3"
            />
            <h2 className="font-bold text-white text-[20px]">{user.name}</h2>
            <hr className="mt-5 text-gray-400"/>
          </div>

          <div className="text-[18px]  mt-6 leading-7 ml-[70px]">
            <label className="space-x-3 flex items-center text-white"><AiOutlineUser/> <Link to="">Thông tin tài khoản</Link></label><br />
            <label className="space-x-3 flex items-center text-white"><AiOutlineShoppingCart/> <Link to="/profileUser/mywallet">Ví của tôi</Link></label><br />
            <label className="space-x-3 flex items-center text-white"><BsFillCartCheckFill/> <Link to="/profileUser/myorder">Đơn hàng của tôi</Link></label><br />
            <label className="space-x-3 flex items-center text-white"><BiLogOut/> <Link to="">Đăng xuất</Link></label>
          </div>
        </div>
        <div className="col-span-3 mt-[100px] ml-5">
          <Outlet/>
        </div>
      </div>
    </div>
    <Footer/>
   </div>
  );
};
