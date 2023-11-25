import React, { useEffect, useState } from "react";
import { useGetVoucher_hotelIdQuery } from "@/api/webapp/voucher_home";
import { AiOutlineDollar } from "react-icons/ai";
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
        <div className="mt-8 flex gap-4 overflow-auto max-h-[380px]">
          {myvoucher?.vouchers?.map((voucher:any) => (
            <div key={voucher?.id} className="mb-4">
              <div className="gird grid-cols-3 gap-4 ">
                <div className="group flex-1 border rounded-t-md hover:shadow-xl ">
                  <img
                    src={voucher?.image}
                    alt={`Hình ảnh ${voucher?.name}`}
                    className="rounded-t-md"
                  />
                  <div className="relative bg-white pt-3 mt-2 px-2 pb-4 ">
                    <h3 className="text-lg text-gray-700 group-hover:underline group-hover:underline-offset-4 font-medium">
                      {voucher?.name}
                    </h3>
                    <p className="mt-2">
                      <span className="text-gray-900 text-base">
                        Giảm giá: {voucher?.discount}%
                      </span>
                      <br />
                      <span className="text-gray-900 text-base ">Mã: {voucher?.slug}</span>
                      <br />
                      <span className="text-gray-900">
                        Hạn đến: {voucher?.expire_at}
                      </span>
                      <br />
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  </div>
  );
};

export default myWallet;
