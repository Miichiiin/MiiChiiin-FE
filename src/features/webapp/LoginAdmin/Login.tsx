import { BsGoogle } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import "./login.css";
import { message } from "antd";
import { useForm } from "react-hook-form";
import { SigninForm, schemaSignIn } from "@/schema/auth";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { useSigninMutation } from "@/api/auth/authAdmin";
const LoginAdmin = () => {
  const [SigninAdmin] = useSigninMutation();
  const navigate = useNavigate();
  const {register,handleSubmit,formState: { errors }} = useForm<SigninForm>({
    resolver: yupResolver(schemaSignIn),
  });
  const handleLoginAdmin = async (userAdmin: SigninForm) => {
    try {
      await SigninAdmin(userAdmin).then(() => {
        const userAdminLocal = localStorage.getItem('userAdmin')
        console.log("userAdminLocal", userAdminLocal);
        
        if(userAdminLocal) {
          message.success("Đăng nhập thành công!");
          setTimeout(() => {
            navigate("/admin");
          }, 2000);
        }else{
          message.error("Thông tin tài khoản hoặc mật khẩu không chính xác !");
        }
      
      });
    } catch (error) {
     
    }
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  });
 
  return (
    <div className="mx-auto items-center h-screen bg-[url('https://res.cloudinary.com/chuoi2taps/image/upload/v1692668816/wallpaperflare.com_wallpaper_jsnfw2.jpg')] bg-no-repeat bg-fixed bg-cover brightness-[100%]">
      <div className="">
        <div className="flex justify-center items-center">
          <div className="w-[768px] px-5 mt-[135px] bg-gradient-to-b from-red-500 via-green-500 to-blue-500  opacity-90 shadow-lg rounded-lg pb-3">
            <h1 className="text-center uppercase pt-10 pb-5 text-3xl font-bold italic">
              Login
            </h1>
            <form onSubmit={handleSubmit(handleLoginAdmin)} className="">
              <div className="">
                <input
                  type="text"
                  id="email"
                  placeholder="Email address"
                  className="border-b-2 pl-2 rounded w-full py-2 my-2 transition ease-in-out m-0 focus:outline-none focus:text-white focus:border-blue-300 outline-none bg-blue-300 placeholder:italic placeholder:font-bold text-white placeholder:text-blue-700"
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
                  className="border-b-2 pl-2 rounded w-full py-2 my-2 transition ease-in-out m-0 focus:outline-none focus:text-white focus:border-blue-300 outline-none bg-blue-300 placeholder:italic placeholder:font-bold text-white placeholder:text-blue-700"
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
                  <span className="">Remember me</span>
                </div>
                <div>
                  <a href="" className="hover:text-blue-700 text-blue-500 ">
                    Forgot your password ?
                  </a>
                </div>
              </div>
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded w-full"
              >
                Đăng nhập / Login
              </button>
              <hr className="mt-5 pb-5" />
              <div>
                <div className="flex justify-center gap-6">
                  <button className="text-white  bg-red-500 hover:bg-red-400 focus:ring-4 focus:outline-none font-medium rounded-lg px-5 py-3 text-center inline-flex items-center justify-between">
                    <BsGoogle className="text-xl" />
                    <span className="px-2">Login with Google</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginAdmin;