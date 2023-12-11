
import { useState } from 'react';
import { Link ,useNavigate} from 'react-router-dom';
// import { message } from "antd";
const ForgotPass = () => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [emailError, setEmailError] = useState('');
    const [usernameError, setUsernameError] = useState('');
    // const navigate = useNavigate();

    const handleEmailChange = (e: any) => {
        const newEmail = e.target.value;
        setEmail(newEmail);
        // Kiểm tra email hợp lệ
        if (!newEmail.includes('@')) {
            setEmailError('Vui lòng nhập đúng định dạng email!');
        } else {
            setEmailError('');
        }
    };


    const handleUsernameChange = (e:any) => {
        const newUsername = e.target.value;
        setUsername(newUsername);
        // Kiểm tra username không trống
        if (!newUsername.trim()) {
            setUsernameError('Username is required');
        } else {
            setUsernameError('');
        }
    };
    
    const isFormValid = emailError === ''  && usernameError === '';

    return (
        <div className="mx-auto items-center h-screen bg-no-repeat bg-fixed bg-cover brightness-[100%] overflow-hidden overflow-x-hidden">
            <div className="flex" >
                <div className='flex'>
                    <div className="w-[67%] relative">
                        <img 
                        src="https://res.cloudinary.com/dzqywzres/image/upload/v1701050900/b6ihzn2wajkkgwdbbznz.jpg" 
                        alt="" 
                        className="object-cover"
                        />
                        <div className="absolute top-[20%] end-[45%] text-white  w-[45%]">
                        <h2 className="text-3xl mb-2 font-medium">Trải nghiệm cuộc sông đăng cấp cùng Miichi</h2>
                        <p className="text-xl">Hưởng ngay ưu đãi và tích lũy giao dịch sau khi đăng ký thành viên</p>
                        </div>
                    </div>
                    <div className="w-[33%] flex">
                        <div className="px-10 w-[93%]">
                            <div className="flex mt-[70px] justify-center mb-[-50px]">
                                <a href="/" className="h-[150px] flex justify-center"><img className="w-[100%] h-[50%] object-cover" src="https://res.cloudinary.com/dzqywzres/image/upload/v1701702390/llrnrzljtdhaendxphbz.png" alt="" /></a>
                            </div>
                            <div className="flex">
                                <h1 className=" font-bold mb-3 text-[17px] w-[50%] ">
                                    <Link to={"/login"}> Đăng nhập/Login</Link>
                                </h1>
                                <h1 className=" font-bold mb-3 text-[17px] text-center w-[50%] border-b-[3px] border-[#e8952f] pb-2 text-center">
                                <Link to={"/forgotpass"}>Lấy mật khẩu/Forgot</Link>
                                </h1>
                            </div>
                            <form >
                                <div className="">
                                    <input type="text" id="email" name="email" placeholder="Email address" value={email}
                                        onChange={handleEmailChange}
                                        className="border-1 border pl-3 rounded w-full py-[10px] my-2 transition ease-in-out m-0 focus:outline-none outline-none text-gray-500 text-[13px]" />
                                </div>
                                {emailError && <p className="error text-red-500 pb-2 text-sm">{emailError}</p>}
                                <div className="">
                                    <input type="text" id="username" name="username" placeholder="Username " value={username}
                                        onChange={handleUsernameChange}
                                        className="border-1 border pl-3 rounded w-full py-[10px] my-2 transition ease-in-out m-0 focus:outline-none outline-none text-gray-500 text-[13px]" />
                                </div>
                                <div className="py-2 flex justify-between items-center">
                                    <div>
                                        <input className="mr-2 leading-tight" type="checkbox" id="remember" name="remember" />
                                        <span className="text-[14px] font-medium">
                                            Remember me
                                        </span>
                                    </div>
                                    <div>
                                        <a href="/register" className="hover:text-blue-700 text-blue-500 text-[14px] font-medium underline">Đăng ký/register ?</a>
                                    </div>
                                </div>
                                <button type="submit" className="bg-[#e8952f] hover:text-black hover:shadow-xl text-white font-medium py-[10px] mt-3 px-4 rounded w-full" disabled={!isFormValid}>Gửi thông tin</button>
                                <hr className="mt-5 " />
                            </form>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
    )
}

export default ForgotPass