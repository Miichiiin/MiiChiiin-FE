import { useState } from 'react';
import { BsGoogle } from 'react-icons/bs'
const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [usernameError, setUsernameError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');

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

    const isFormValid = emailError === '' && passwordError === '' && confirmPasswordError === '' && usernameError === '';

    return (
        <div className="body mx-auto items-center">
            <div className="" >
                <div className="flex justify-center items-center ">
                    <div className="">
                        <img src="https://decofuni.vn/Upload/images/tin-tuc/miniresort-dep.jpg" alt="" className="h-screen" />
                    </div>
                    <div className="w-[768px] h-screen px-5">
                        <h1 className="text-center text-uppercase pt-10 pb-5 text-3xl ">Login</h1>
                        <form className="">
                            <div className="">
                                <label >Email address </label>
                                <input type="text" id="email" name="email" placeholder="Email address" value={email}
                                    onChange={handleEmailChange}
                                    className="border-2 w-full py-2 my-2 transition ease-in-out m-0 focus:outline-none px-2 focus:border-blue-300" />
                            </div>
                            {emailError && <p className="error text-red-500 pb-2 text-sm">{emailError}</p>}
                            <div className="">
                                <label >Username </label>
                                <input type="text" id="username" name="username" placeholder="Username " value={username}
                                    onChange={handleUsernameChange}
                                    className="border-2 w-full py-2 my-2 transition ease-in-out m-0 focus:outline-none px-2 focus:border-blue-300" />
                            </div>
                            {usernameError && <p className="error text-red-500 pb-2 text-sm">{usernameError}</p>}
                            <div className="">
                                <label >Password</label>
                                <input type="password" id="password" name="password" placeholder="Password" value={password}
                                    onChange={handlePasswordChange}
                                    className="border-2 w-full py-2 my-2 transition ease-in-out m-0 focus:outline-none px-2 focus:border-blue-300" />
                            </div>
                            {passwordError && <p className="error text-red-500 text-sm">{passwordError}</p>}
                            <div className="">
                                <label >Confirm Password</label>
                                <input type="password" id="confirmPassword" name="confirmPassword" placeholder="Confirm Password" value={confirmPassword}
                                    onChange={handleConfirmPasswordChange}
                                    className="border-2 w-full py-2 my-2 transition ease-in-out m-0 focus:outline-none px-2 focus:border-blue-300" />
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
                                <p className="py-4 text-center">You have an account ? <a href=""
                                    className="hover:text-blue-700 text-blue-500 font-bold">Login here</a></p>

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