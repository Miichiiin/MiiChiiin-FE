// import { BsGoogle } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
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
        if(userAdminLocal !== null) {
          const data = JSON.parse(userAdminLocal);
          console.log("dataLoginAdmin",data.admin);
          
         
        if(userAdminLocal) {  
          const tokenAdmin = localStorage.getItem('tokenAdmin')        
          if(tokenAdmin) {
              message.success("Đăng nhập thành công!");
              navigate(`/admin/${data?.id_hotel}`);
          }else {
            message.error("Không tồn tại token vui lòng kiểm tra lại thông tin đăng nhập!")
          }
        }else{
          message.error("Thông tin tài khoản hoặc mật khẩu không chính xác !");
        }
      }  
      });
    } catch (error) {
     
    }
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  });
 
  return (
    <div className="flex ">
      <div className="w-[67%]">
        <img 
          src="https://storage.googleapis.com/vin3sprodauth0.vin3s.vn/vinpearl_login_screen.jpg" 
          alt="" 
          className="object-cover"
        />
      </div>
      <div className="flex w-[33%]">
          <div className="px-10">
            <div className="flex mt-[70px] mb-10 justify-center">
              <img className="w-[30%] h-[30%] object-cover" src="https://storage.googleapis.com/vin3sprodauth0.vin3s.vn/vinpearl_login_logo-01.png" alt="" />
              <img className="w-[30%] h-[30%] object-cover" src="https://storage.googleapis.com/vin3sprodauth0.vin3s.vn/vinpearl_login_logo-02.png" alt="" />
            </div>
           <div className="flex">
              <h1 className=" font-bold mb-3 text-[17px] w-[50%] border-b-[3px] border-[#e8952f] pb-2 text-center">
                Đăng nhập/Login
              </h1>
              <h1 className=" font-bold mb-3 text-[17px] text-center w-[50%]">
                Forgot password 
              </h1>
           </div>
            <form onSubmit={handleSubmit(handleLoginAdmin)} className="">
              <div className="">
                <input
                  type="text"
                  id="email"
                  placeholder="Email "
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
                  placeholder="Mật khẩu/Password"
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
              <hr className="mt-5 pb-3" />
              <div>
                {/* <div className="flex justify-center gap-6">
                  <button className="text-white  bg-red-500 hover:bg-red-400 focus:ring-4 focus:outline-none font-medium rounded-lg px-5 py-3 text-center inline-flex items-center justify-between">
                    <BsGoogle className="text-xl" />
                    <span className="px-2">Login with Google</span>
                  </button>
                </div> */}
              </div>
              <div className="text-center">
                <span className="text-[14px] ">Bạn có tài khoản chưa? <a href="" className="text-blue-600 font-medium">Đăng kí ngay</a></span>
              </div>
            </form>
          </div>
        </div>
    </div>
  );
};

export default LoginAdmin;