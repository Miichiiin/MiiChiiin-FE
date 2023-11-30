import React, { CSSProperties, useEffect, useState } from "react";
import { useGetVoucher_hotelIdQuery } from "@/api/webapp/voucher_home";
import { AiOutlineDollar } from "react-icons/ai";
import FadeLoader from "react-spinners/HashLoader";
const myWallet = () => {
  const userLocal = localStorage.getItem("user");
  let dataUserLogin;

  try {
    if (userLocal !== null) {
      dataUserLogin = JSON.parse(userLocal);
    }
  } catch (error) {
    // Xử lý lỗi khi phân tích dữ liệu JSON
    console.error("Error parsing user data from localStorage:", error);
  }

  const user_id = dataUserLogin ? dataUserLogin.id : null;

  console.log("userId", user_id);

  const { data: myvoucher } = useGetVoucher_hotelIdQuery({
    id: user_id,
  });  
   //loading trang
   const [loading,setLoading] = useState(false);
   useEffect(() =>{
       setLoading(true)
       setTimeout(() =>{
      //  if (myvoucher && myvoucher.length > 0) {
      //      setLoading(false);
      //  }else {
      //    setLoading(true);
      //  }
      setLoading(false)
       },1000)
   },[myvoucher]);  
   const override: CSSProperties = {
       display: "flex",
       position:"fixed",
       top: "60%",
       left: "59%",
       transform: "translate(-50%, -50%)",
   };



  return (
    <div className="bg-white shadow-md border border-gray-300  mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 mt-8 rounded-tl-2xl rounded-tr-2xl rounded-bl-2xl rounded-br-2xl">
    <section>
      <div className="mx-auto ">
        <div className=" flex items-center justify-between border-b-2 pb-3 mt-[-15px]">
          <header className="">
            <h2 className="font-bold text-[20px]">Voucher Của Tôi </h2>
            <p className="text-red-500 font-medium text-sm">Lưu ý: Một Coin tương ứng với 1.000 đ</p>
          </header>
          <div className="mr-5 flex items-center ">
              <span className="text-gray-700 flex items-center">
              <AiOutlineDollar class="mr-2"/> {myvoucher?.coin} 
              </span>
            </div>
        </div>
        <div className="mt-8  gap-4 overflow-auto h-[380px]">
          {
            loading ?
            <div className="relative">
              <FadeLoader 
              color="#d7ba37"
              loading={loading}
              cssOverride={override}
              // size={40}
              // aria-label="Loading Spinner"
              // data-testid="loader"
              className="animate-pulse absolute z-10"
              />
            </div>
            :
            <div>
              {myvoucher?.vouchers?.map((voucher:any) => (
                  <div key={voucher?.id} className="mb-4">
                    <div className=" ">
                      <div className="group flex border rounded-md hover:shadow-xl w-[95%]" >
                        <img
                          src={voucher?.image}
                          alt={`Hình ảnh ${voucher?.name}`}
                          className="rounded-md w-[30%]"
                        />
                        <div className="relative  bg-white pt-3 mt-2 px-2 pb-4 ">
                          <h3 className="text-lg text-gray-700 group-hover:underline group-hover:underline-offset-4 font-medium">
                            {voucher?.name}
                          </h3>
                          <p className="mt-2">
                            <span className="text-gray-900 text-base">
                              Giảm giá: <span className="font-medium ">{voucher?.discount}%</span>
                            </span>
                            <br />
                            <span className="text-gray-900 text-base ">Mã: <span className="font-medium">{voucher?.slug}</span></span>
                            <br />
                            <span className="text-gray-900">
                              Hạn đến: <span className="font-medium">{voucher?.expire_at}</span>
                            </span>
                            <br />
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
            }
        </div>
      </div>
    </section>
  </div>
  );
};

export default myWallet;
