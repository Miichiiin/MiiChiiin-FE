import { useSignupMutation } from '@/api/auth/register';
import { useState } from 'react';
import { BsGoogle } from 'react-icons/bs'
import { Link } from 'react-router-dom';
const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [usernameError, setUsernameError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');

    const [Signup] = useSignupMutation() 

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
    const handleConfirmPasswordChange = (e:any) => {
        const newConfirmPassword = e.target.value;
        setConfirmPassword(newConfirmPassword);
        // Kiểm tra trùng khớp với password
        if (newConfirmPassword !== password) {
            setConfirmPasswordError('Passwords do not match');
        } else {
            setConfirmPasswordError('');
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
    const handleRegistration = async (e: React.FormEvent) => {
        e.preventDefault();
        // Kiểm tra nếu có lỗi, không thực hiện đăng ký
        if (emailError || passwordError || confirmPasswordError || usernameError) {
            console.log('Form contains errors. Cannot register.');
            return;
        }
        try {
          // Gọi API đăng ký tài khoản ở đây
          const response = await Signup({
            variables: {
              email,
              password,
              username,
            },
          });
      
          console.log('Đăng ký thành công:', response);
          // Bạn có thể muốn chuyển hướng người dùng đến một trang khác sau khi đăng ký thành công
        } catch (error) {
          console.error('Đăng ký thất bại:',);
        }
      };

    const isFormValid = emailError === '' && passwordError === '' && confirmPasswordError === '' && usernameError === '';

    return (
        <div className="mx-auto items-center h-screen bg-[url('https://res.cloudinary.com/chuoi2taps/image/upload/v1692668816/wallpaperflare.com_wallpaper_jsnfw2.jpg')] bg-no-repeat bg-fixed bg-cover brightness-[100%]">
            <div className="" >
                <div className="flex justify-center items-center ">
                    <div className="w-[768px] px-5 mt-[135px] bg-blue-300 opacity-90 shadow-lg rounded-lg pb-3">
                        <h1 className="text-center uppercase pt-10 pb-5 text-3xl font-bold italic ">Đăng ký tài khoản</h1>
                        <form onSubmit={handleRegistration}>
                            <div className="">
                                <input type="text" id="email" name="email" placeholder="Email address" value={email}
                                    onChange={handleEmailChange}
                                    className="border-b-2 rounded w-full py-2 my-2 transition ease-in-out m-0 focus:outline-none focus:text-white focus:border-blue-300 outline-none bg-blue-300 placeholder:italic placeholder:font-bold text-white placeholder:text-blue-700" />
                            </div>
                            {emailError && <p className="error text-red-500 pb-2 text-sm">{emailError}</p>}
                            <div className="">
                                <input type="text" id="username" name="username" placeholder="Username " value={username}
                                    onChange={handleUsernameChange}
                                    className="border-b-2 rounded w-full py-2 my-2 transition ease-in-out m-0 focus:outline-none focus:text-white focus:border-blue-300 outline-none bg-blue-300 placeholder:italic placeholder:font-bold text-white placeholder:text-blue-700" />
                            </div>
                            {usernameError && <p className="error text-red-500 pb-2 text-sm">{usernameError}</p>}
                            <div className="">
                                <input type="password" id="password" name="password" placeholder="Password" value={password}
                                    onChange={handlePasswordChange}
                                    className="border-b-2 rounded w-full py-2 my-2 transition ease-in-out m-0 focus:outline-none focus:text-white focus:border-blue-300 outline-none bg-blue-300 placeholder:italic placeholder:font-bold text-white placeholder:text-blue-700" />
                            </div>
                            {passwordError && <p className="error text-red-500 text-sm">{passwordError}</p>}
                            <div className="">
                                <input type="password" id="confirmPassword" name="confirmPassword" placeholder="Confirm Password" value={confirmPassword}
                                    onChange={handleConfirmPasswordChange}
                                    className="border-b-2 rounded w-full py-2 my-2 transition ease-in-out m-0 focus:outline-none focus:text-white focus:border-blue-300 outline-none bg-blue-300 placeholder:italic placeholder:font-bold text-white placeholder:text-blue-700" />
                            </div>
                            {confirmPasswordError && <p className="error text-red-500 pb-2 text-sm">{confirmPasswordError}</p>}
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
                            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded w-full" disabled={!isFormValid}>Đăng ký / Sign up</button>
                            <hr className="mt-5 pb-5" />
                            <div>
                                <p className="py-4 text-center">You have an account ? <Link className="hover:text-blue-700 text-blue-500 font-bold" to={"/login"}>Login here</Link> </p>

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

export default Register