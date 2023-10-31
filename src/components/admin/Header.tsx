import { Layout, theme } from 'antd';
import { BiLogOut } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
const { Header } = Layout;

export const HeaderAdmin = () => {
    const navigate = useNavigate();
    const userAdminLocal = localStorage.getItem('userAdmin')
    console.log("user",userAdminLocal);
    
    let imageLC = "";
    let name = "";
   if(userAdminLocal) {
    const data = JSON.parse(userAdminLocal);
    imageLC = data.image;
    name = data.name;
   }
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    const handleLogout = () =>{
        const confirm = window.confirm("Bạn có muốn đăng xuất không?");
        if(confirm) {
            localStorage.removeItem('userAdmin');
            localStorage.removeItem('tokenAdmin');
            navigate("/loginadmin");
        }
      }
    return (

        <Header style={{ padding: 0, background: colorBgContainer }} className='flex justify-between items-center py-5 '>
           
            <div className='flex justify-between items-center space-x-8 mx-5'>
                <img src={imageLC} alt="" className='h-10 w-10 object-cover rounded-full' />
                <h3 className='text-xl form-bold'>{name}</h3>
                {/* <select name="" id="" className='border border-gray-500 w-100px h-100px rounded'>
                    <option value=""></option>
                    <option value="">Profile</option>
                    <option value="">Profile</option>
                </select> */}
            </div>
            <div className='w-50'>
                <div className="w-50 mx-5">
                    <button  onClick={handleLogout}>
                        <BiLogOut size={35} />
                    </button>
                </div>
            </div>
        </Header>

    )
}
