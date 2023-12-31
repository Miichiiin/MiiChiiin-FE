import { Layout, theme } from 'antd';
import { useNavigate } from 'react-router-dom';
const { Header } = Layout;
import { MdArrowDropDown } from "react-icons/md";
import { useState } from 'react';
import { CiLogout, CiUser } from "react-icons/ci";
export const HeaderAdmin = () => {
    const navigate = useNavigate();
    const userAdminLocal = localStorage.getItem('userAdmin')
    const idLC = userAdminLocal ? JSON.parse(userAdminLocal)?.id : null;
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    let imageLC = "";
    let name = "";
    let nameHotel = "";
    if (userAdminLocal) {
        const data = JSON.parse(userAdminLocal);

        imageLC = data.image;
        name = data.name;
        nameHotel = data?.name_hotel.name
    }
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    const handleLogout = () => {
        const confirm = window.confirm("Bạn có muốn đăng xuất không?");
        if (confirm) {
            localStorage.removeItem('userAdmin');
            localStorage.removeItem('tokenAdmin');
            navigate("/loginadmin");
        }
    }
    return (

        <Header style={{ padding: 0, background: colorBgContainer }} className='flex justify-between items-center py-5 '>

            <div className='flex justify-between items-center mx-6'>
                <h3 className='text-xl font-bold italic text-orange-500'>{nameHotel}</h3>
            </div>
            <div className='flex items-center mr-3'>
                <img src={imageLC} className='h-10 w-10 object-cover rounded-full' />
                <div className='relative'>
                    <h3 className='text-md px-2 flex items-center cursor-pointer ' onClick={toggleDropdown} >{name} <MdArrowDropDown /></h3>
                    {isDropdownOpen && (
                        <div className='absolute right-0 w-[185px] pl-2 py-2 bg-gray-100 rounded shadow-lg'>
                            {/* Adjusted size for smaller dropdown */}
                            <ul className='text-sm'>
                                <li className='hover:text-blue-500 py-1 cursor-pointer flex items-center' onClick={()=>navigate(`admininfo/${idLC}`)}><CiUser className="mx-2"/>Thông tin tài khoản</li>
                                <li className='hover:text-blue-500 py-1 cursor-pointer flex items-center' onClick={handleLogout}><CiLogout className="mx-2"/>Đăng xuất</li>
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </Header>

    )
}
