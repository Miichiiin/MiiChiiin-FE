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
    <div className="bg-white shadow-md border border-gray-300 p-8 mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 mt-10 rounded-tl-2xl rounded-tr-2xl rounded-bl-2xl rounded-br-2xl">
    <section>
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <div className="bg-white shadow-md border border-gray-300 p-8 mx-auto max-w-screen-xl px-4 sm:px-6 sm:py-12 lg:px-8 flex items-center justify-between pt-[200px]">
          <header className="">
            <h2 className="font-bold text-[20px]">Voucher Của Tôi</h2>
            <p className="text-red-500 font-bold">Lưu ý: Một Coin tương ứng với 1.000 Vnđ</p>
          </header>
          <div className="mr-5 flex items-center">
              <span className="text-gray-700">

                Coin: {myvoucher?.coin} <AiOutlineDollar />
              </span>
            </div>
        </div>
        <hr className="mt-5 text-gray-400" />
        <div className="mt-8 flex gap-4">
          {myvoucher?.vouchers?.map((voucher:any) => (
            <div key={voucher?.id} className="mb-4">
              <div className="gird grid-cols-3 gap-4">
                <div className="group flex-1">
                  <img
                    src={voucher?.image}
                    alt={`Hình ảnh ${voucher?.name}`}
                    className="w-"
                  />
                  <div className="relative bg-white pt-3 mt-2">
                    <h3 className="text-xl text-gray-700 group-hover:underline group-hover:underline-offset-4">
                      {voucher?.name}
                    </h3>
                    <p className="mt-2">
                      <span className="text-gray-900">
                        Giảm giá: {voucher?.discount}%
                      </span>
                      <br />
                      <span className="text-gray-900">{voucher?.slug}</span>
                      <br />
                      <span className="text-gray-900">
                        Ngày kết thúc: {voucher?.expire_at}
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
