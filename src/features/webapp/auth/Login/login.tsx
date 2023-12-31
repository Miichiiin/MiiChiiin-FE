import { BsGoogle } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import "./login.css";
import { message } from "antd";
import { useSigninMutation } from "@/api/auth/auth";
import { useForm } from "react-hook-form";
import { SigninForm, schemaSignIn } from "@/schema/auth";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import GoogleLoginButton from "./loginGoogle";
import axios from 'axios';

const Login = () => {
  const [Signin] = useSigninMutation();
  const navigate = useNavigate();
  const {register,handleSubmit,formState: { errors }} = useForm<SigninForm>({
    resolver: yupResolver(schemaSignIn),
  });

const handleLogin = async (user: any) => {
  try {
    await Signin(user).then(async () => {
      const userLocal = localStorage.getItem('user');
      console.log('userLocal', userLocal);

      if (userLocal) {
        const token = localStorage.getItem('token');
        if (token) {
          // Add the token to the header of subsequent requests
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          message.success('Đăng nhập thành công');
          navigate('/');
        } else {
          message.error('Không tìm thấy token trong lưu trữ!');
        }
      } else {
        message.error('Thông tin tài khoản hoặc mật khẩu không chính xác!');
      }
    });
  } catch (error) {
    // Handle the error
  }
};
  useEffect(() => {
    window.scrollTo(0, 0);
  });
  return (
    <div className="mx-auto items-center h-screen bg-no-repeat bg-fixed bg-cover brightness-[100%] overflow-hidden overflow-x-hidden">
      <div className="">
        <div className="flex ">
          <div className="flex">
            <div className="w-[67%]">
              <img 
                src="https://storage.googleapis.com/vin3sprodauth0.vin3s.vn/vinpearl_login_screen.jpg" 
                alt="" 
                className="object-cover"
              />
            </div>
           
            <div className="flex w-[33%]">
              <div className="px-10">
                <div className="flex mt-[70px] justify-center mb-[-50px]">
                  <a href="/" className="h-[150px] flex justify-center"><img className="w-[50%] h-[50%] object-cover" src="https://res.cloudinary.com/dzqywzres/image/upload/v1700062478/u7kzl2ufmmbe66o9kivw.png " alt="" /></a>
                  {/* <img className="w-[30%] h-[30%] object-cover" src="https://storage.googleapis.com/vin3sprodauth0.vin3s.vn/vinpearl_login_logo-02.png" alt="" /> */}
                </div>
                <div className="flex">
                    <h1 className=" font-bold mb-3 text-[17px] w-[50%] border-b-[3px] border-[#e8952f] pb-2 text-center">
                      Đăng nhập/Login
                    </h1>
                    <h1 className=" font-bold mb-3 text-[17px] text-center w-[50%]">
                     Đăng kí/Register
                    </h1>
                </div>
                <form onSubmit={handleSubmit(handleLogin)} className="">
                  <div className="">
                    <input
                      type="text"
                      id="email"
                      placeholder="Email address"
                      className="border-1 border pl-3 rounded w-full py-[10px] my-2 transition ease-in-out m-0 focus:outline-none outline-none text-gray-500 text-[13px]"
                      {...register("email")}
                    />
                  </div>
                  <div className="text-red-500">
                    {errors.email && errors.email.message}
                  </div>
                  <div className="">
                    <input
                      type="password"
                      id="password"
                      placeholder="Password"
                      className="border-1 border pl-3 rounded w-full py-[10px] my-2 transition ease-in-out m-0 focus:outline-none outline-none text-gray-500 text-[13px]"
                      {...register("password")}
                    />
                  </div>
                  <div className="text-red-500">
                    {errors.password && errors.password.message}
                  </div>
                  <div className="py-2 flex justify-between items-center">
                    <div>
                      <input
                        className="mr-2 leading-tight"
                        type="checkbox"
                        id="remember"
                        name="remember"
                      />
                      <span className="text-[14px] font-medium">Remember me</span>
                    </div>
                    <div>
                      <a href="" className="hover:text-blue-700 text-blue-500 text-[14px] font-medium underline">
                        Forgot your password ?
                      </a>
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="bg-[#e8952f] hover:text-black  text-white font-medium text-[15px] py-[10px] mt-3 px-4 rounded w-full"
                  >
                    Đăng nhập / Login
                  </button>
                  <hr className="mt-5 pb-5" />
                  <div className="text-[14px]">
                    <p className="py-4 text-center">
                      Didn't have account ?{" "}
                      <Link
                        to={"/register"}
                        className="hover:text-blue-700 text-blue-500 font-bold"
                      >
                        Create an account
                      </Link>
                    </p>

                    <div className="flex justify-center gap-6">
                      <button className="text-white  bg-red-500 hover:bg-red-400 focus:ring-4 focus:outline-none font-medium rounded-lg px-5 py-3 text-center inline-flex items-center justify-between">
                        <BsGoogle className="text-xl" />
                        <span className="px-2">Login with Google</span>
                      </button>
                      <GoogleLoginButton/>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
