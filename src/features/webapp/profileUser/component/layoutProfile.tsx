
import { AiOutlineShoppingCart, AiOutlineUser } from 'react-icons/ai';
import { BiLogOut } from 'react-icons/bi';
import { BsFillCartCheckFill } from 'react-icons/bs';
import { Link, Outlet } from 'react-router-dom';
import HeaderHotelType from '../../HotelType/HeaderHotelType';
import Footer from '@/components/Footer';
import { useEffect, useState } from 'react';
import '../../../../index.css'
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
   //srollto
   useEffect(() =>{
    window.scrollTo({ top: 0, behavior: 'smooth' });
  })

  
  return (
   <div className='bg-gray-100'>
       <HeaderHotelType/>
     <div className="w-[1200px] mx-auto h-[700px]">
      <div className="grid grid-cols-4  sticky">
        <div className="bg-[#151b40] flex flex-col justify-center text-center items-center  h-[700px] ">
          <div className=" p-5 text-center">
            <img
              src={user.image}
              alt="imageUser"
              width={200}
              className="rounded-[100%] mt-[150px] my-3"
            />
            <h2 className="font-bold text-white text-lg flex justify-center">{user.name}</h2>
            <hr className="mt-5 text-gray-400"/>
          </div>

          <div className="text-[18px] leading-7 mt-6">
            <label className="space-x-3 flex items-center text-white "><AiOutlineUser class=""/> <Link className='' to="">Thông tin tài khoản</Link></label><br />
            <label className="space-x-3 flex items-center text-white "><AiOutlineShoppingCart/> <Link to="/profileUser/mywallet">Ví của tôi</Link></label><br />
            <label className="space-x-3 flex items-center text-white "><BsFillCartCheckFill/> <Link to="/profileUser/myorder">Đơn hàng của tôi</Link></label><br />
            <label className="space-x-3 flex items-center text-white  pb-10"><BiLogOut/> <Link to="">Đăng xuất</Link></label>
          </div>
        </div>
        <div className="col-span-3 mt-[100px] ml-5">
          <Outlet/>
        </div>
      </div>
    </div>
    <div className='mt-[-40px]'>
      <Footer/> 
    </div>
   </div>
  );
};
