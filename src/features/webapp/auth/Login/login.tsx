import { useState } from 'react';
import { BsGoogle } from 'react-icons/bs'
import { Link, useNavigate } from 'react-router-dom';
import './login.css'
import { useSigninMutation } from '@/api/auth/auth';
const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [Signin] = useSigninMutation()
    const handleEmailChange = (e: any) => {
        const newEmail = e.target.value;
        setEmail(newEmail);
        // Kiểm tra email hợp lệ
        if (!newEmail.includes('@')) {
            setEmailError('Invalid email format');
        } else {
            setEmailError('');
        }
    };

    const handlePasswordChange = (e: any) => {
        const newPassword = e.target.value;
        setPassword(newPassword);
        // Kiểm tra password có ít nhất 6 ký tự
        if (newPassword.length < 6) {
            setPasswordError('Password must be at least 6 characters');
        } else {
            setPasswordError('');
        }
    };
    const navigate = useNavigate()
    const handleLogin = (e: any) => {
        e.preventDefault();
        const login = {email,password}
       Signin(login).then(() => {
        // navigate("/homepage")
       })
    };
    return (
        <div className="mx-auto items-center h-screen bg-[url('https://res.cloudinary.com/chuoi2taps/image/upload/v1692668816/wallpaperflare.com_wallpaper_jsnfw2.jpg')] bg-no-repeat bg-fixed bg-cover brightness-[100%]">
            <div className="" >
                <div className="flex justify-center items-center">
                    <div className="w-[768px] px-5 mt-[135px] bg-blue-300 opacity-90 shadow-lg rounded-lg pb-3">
                        <h1 className="text-center uppercase pt-10 pb-5 text-3xl font-bold italic">Login</h1>
                        <form onSubmit={handleLogin} className=''>
                            <div className="">
                                <input type="text" id="email" name="email" placeholder="Email address" value={email}
                                    onChange={handleEmailChange}
                                    className="border-b-2 rounded w-full py-2 my-2 transition ease-in-out m-0 focus:outline-none focus:text-white focus:border-blue-300 outline-none bg-blue-300 placeholder:italic placeholder:font-bold text-white placeholder:text-blue-700"/>
                            </div>
                            {emailError && <p className="error text-red-500 pb-2 text-sm">{emailError}</p>}
                            <div className="">
                                <input type="password" id="password" name="password" placeholder="Password" value={password}
                                    onChange={handlePasswordChange}
                                    className="border-b-2 rounded w-full py-2 my-2 transition ease-in-out m-0 focus:outline-none focus:text-white focus:border-blue-300 outline-none bg-blue-300 placeholder:italic placeholder:font-bold text-white placeholder:text-blue-700" />
                            </div>
                            {passwordError && <p className="error text-red-500 text-sm">{passwordError}</p>}
                            <div className="py-2 flex justify-between items-center">
                                <div>
                                    <input className="mr-2 leading-tight" type="checkbox" id="remember" name="remember" />
                                    <span className="">
                                        Remember me
                                    </span>
                                </div>
                                <div>
                                    <a href="" className="hover:text-blue-700 text-blue-500 ">Forgot your password ?</a>
                                </div>
                            </div>
                            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded w-full" disabled={emailError !== '' || passwordError !== ''}>Đăng nhập / Login</button>
                            <hr className="mt-5 pb-5" />
                            <div>
                                <p className="py-4 text-center">Didn't have account ? <Link to={"/register"}
                                    className="hover:text-blue-700 text-blue-500 font-bold">Create an account</Link></p>

                                <div className="flex justify-center gap-6">
                                    <button className='text-white  bg-red-500 hover:bg-red-400 focus:ring-4 focus:outline-none font-medium rounded-lg px-5 py-3 text-center inline-flex items-center justify-between'><BsGoogle className='text-xl' /><span className='px-2'>Login with Google</span></button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login