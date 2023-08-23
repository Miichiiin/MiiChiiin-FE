import { Layout, theme } from 'antd';
import { BiLogOut } from 'react-icons/bi';
const { Header } = Layout;

export const HeaderAdmin = () => {
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    return (

        <Header style={{ padding: 0, background: colorBgContainer }} className='flex justify-between items-center py-5 '>
           
            <div className='flex justify-between items-center space-x-8 mx-5'>
                <img src="https://media.istockphoto.com/id/1256768065/vi/vec-to/logo-linh-v%E1%BA%ADt-esport-h%E1%BB%95-tr%E1%BA%AFng.jpg?s=612x612&w=is&k=20&c=_kzP2cuB-s76LYATE2I9RIGp_6vFeqs08PDQKa0EaoU=" alt="" className='h-10 w-10 object-cover rounded-full' />
                <h3 className='text-xl form-bold'>Jone</h3>
                <select name="" id="" className='border border-gray-500 w-100px h-100px rounded'>
                    <option value=""></option>
                    <option value="">Profile</option>
                    <option value="">Profile</option>
                </select>
            </div>
            <div className='w-50'>
                <div className="w-50 mx-5">
                    <BiLogOut size={35} />
                </div>
            </div>
        </Header>

    )
}
