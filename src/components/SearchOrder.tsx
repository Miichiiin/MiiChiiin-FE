import {
  useFindBookingMutation,
} from "@/api/bookingUser";
import { message } from "antd";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineCalendar, AiOutlineInsertRowRight, AiOutlineSearch, AiOutlineTeam } from "react-icons/ai";
import { BsCalculator } from "react-icons/bs";

const SearchOrder = () => {
  const [bookingData, setBookingData] = useState<any>(null);

  const [find_booking] = useFindBookingMutation();

  const { register, handleSubmit } = useForm();

  const onSubmit = async (data: any) => {
    
    try {
      const response:any = await find_booking(data);
      if (response?.error) {
        message.error(response.error.message);
        setBookingData(null)
      } else if (response?.data) {
        const { data: bookingData } = response;
        setBookingData(bookingData);
        // Tiếp tục xử lý dữ liệu
      }
    } catch (error) {
      message.error('Đã xảy ra lỗi khi tìm kiếm.');
    }
  };
  return (
    <div className="">
      <div className=" w-[1024px] absolute start-[220px] top-0 z-10 p-5 text-black">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex items-center text-white w-[1024px] bg-white py-1"
        >
          <div className="flex items-center gap-8 pl-5">
            <input
              type="text"
              placeholder="Nhập hóa đơn mà bạn muốn tìm kiếm vào đây..."
              {...register("slug")}
              className="py-3 text-[13px] placeholder-gray-500 text-black pl-9 rounded w-[400px] border"
            />
            <i className="absolute text-gray-500 text-[20px] pl-2">
              <AiOutlineSearch />
            </i>
          </div>
          <div className="flex items-center pl-5">
            <input
              type="text"
              placeholder="Nhập số điện thoại mà bạn muốn tìm kiếm vào đây..."
              {...register("phone")}
              className="py-3 text-[13px] placeholder-gray-500 text-black pl-9 rounded w-[400px] border"
            />
          </div>
          <button
            type="submit"
            className="text-white font-medium text-[15px] bg-[#e8952f] absolute end-1 px-7 py-[10px] rounded-md"
          >
            Tìm kiếm
          </button>
        </form>

        {bookingData ? (
          <div
            className="mt-2 bg-white  px-5 py-2 overflow-y-scroll w-[1024px]"
            style={{ maxHeight: "400px" }}
          >
            <h2 className="text-[23px] font-medium mb-3 py-3">
              Thông tin tìm kiếm
            </h2>
            <div className="flex  rounded-md">
              <div className=" w-[50%] rounded-md border">
                <h3 className="text-[17px] h-10 font-medium px-2 py-2 bg-gray-300 mb-2">
                  Thông tin khách hàng
                </h3>
                <div className="text-[14px] font-normal px-2 leading-9">
                  <span>
                    <span className="text-base font-medium text-gray-500">Họ và tên:{" "}</span>
                    <span className=" px-1 mr-5 ">
                      {bookingData?.name}
                    </span>
                  </span>{" "}
                  <br />
                  <span>
                    <span className="text-base font-medium text-gray-500">Email:{" "}</span>
                    <span className=" px-1 mr-5">
                      {bookingData?.email}
                    </span>
                  </span>{" "}
                  <br />
                  <span>
                    <span className="text-base font-medium text-gray-500">Địa chỉ:{" "}</span>
                    <span className=" px-1 mr-5">
                      Phường Tân Bình, Thành phố Hải Dương
                    </span>
                  </span>{" "}
                  <br />
                  <span>
                    <span className="text-base font-medium text-gray-500">Số điện thoại:{" "}</span>
                    <span className=" px-1 mr-5">
                      {bookingData?.phone}
                    </span>
                  </span>{" "}
                  <br />
                  <span>
                    <span className="text-base font-medium text-gray-500"> Căn cước công dân:{" "}</span>
                    <span className=" px-1 mr-5">
                      {bookingData?.cccd}
                    </span>
                  </span>{" "}
                  <br />
                  <span>
                    <span className="text-base font-medium text-gray-500 ">Quốc tịch:{" "}</span>
                    <span className=" px-1 mr-5">
                      {bookingData?.nationality}
                    </span>
                  </span>{" "}
                  <br />
                </div>
              </div>
              <div className="w-[50%] border rounded-md ">
                <h3 className="text-[17px] h-10 font-medium px-2 py-2 bg-gray-300 mb-2">
                  Thông tin đặt phòng
                </h3>
                <h2 className="px-2 font-medium mb-2 text-[18px] mt-4">
                  VinHolidays Fiesta Phú Quốc
                </h2>
                <div className="flex text-sm  px-2 space-x-12 text-base ">
                  <span className="flex items-center">
                    <AiOutlineInsertRowRight className="text-base text-gray-500"/>{" "}
                    <span className="ml-1  px-1">
                      {bookingData?.total_room} phòng
                    </span>
                  </span>
                  <span className="flex items-center">
                    <AiOutlineTeam className="text-lg text-gray-500 "/> {" "}
                    <span className="ml-1  px-1 ">
                      {bookingData?.people_quantity} người
                    </span>{" "}
                  </span>
                  <span className="flex items-center">
                    <BsCalculator className="text-base text-gray-500"/> {" "}
                    <span className="ml-1  px-1 ">
                      {bookingData?.total_amount.toLocaleString("vi-VN")} đ
                    </span>{" "}
                  </span>
                </div>
                <span className="w-[100%] items-center flex text-sm px-2 mt-1 mb-3">
                <AiOutlineCalendar className="text-lg mr-1 text-gray-500"/>
                  <div>
                    {" "}
                    <span className=" px-1 ">
                      {" "}
                      {new Date(bookingData?.check_in).toLocaleDateString()}
                    </span>{" "}
                    - 
                    <span className=" px-1 ">
                      {new Date(bookingData?.check_out).toLocaleDateString()}
                    </span>
                  </div>
                </span>
                <div className="border-t-2">
                  <h2 className="my-3 mx-2 font-medium">Thông tin các phòng</h2>

                  {bookingData?.room?.map((item: any) => {
                    return (
                      <>
                        <div className="border-b-1 mb-2 flex overflow-y-scroll h-[105px]">
                          <img
                            className="w-[30%] h-[90px]  px-2 "
                            src={item?.category_image}
                            alt=""
                          />
                          <div>
                            <span className="">
                             <span className=" text-sm font-medium text-gray-500"> Loại phòng:</span>
                              <span className="text-sm px-1">
                                {item?.category_name} -  {item?.name}
                              </span>
                            </span>
                            <br />
                            <span className=" flex mt-1">
                              <span className=" text-sm text-gray-500 font-medium">  Dịch vụ:</span>
                              {item?.services?.map((service: any) => {
                                return (
                                  <span className=" px-1 mr-5 text-sm flex items-center">
                                    {service?.name}
                                  </span>
                                );
                              })}
                            </span>
 
                          </div>
                        </div>
                      </>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div
            className="mt-2 bg-white px-5 py-2 overflow-y-scroll w-[1024px]"
            style={{ maxHeight: "400px" }}
          >
            <h2 className="text-[23px] font-medium mb-3 py-3">
              Thông tin tìm kiếm
            </h2>
            <div className="flex flex-col justify-center items-center ">
              <div className="flex items-center justify-between">
                <div className="w-[500px] border-r-2">
                  <h3 className="text-[17px] h-10 font-medium px-2 py-2 bg-gray-300 mb-2 pl-5">
                    Thông tin khách hàng
                  </h3>
                  <img className="object-cover h-[230px] ml-[130px]" 
                  src="https://t4.ftcdn.net/jpg/04/75/01/23/360_F_475012363_aNqXx8CrsoTfJP5KCf1rERd6G50K0hXw.jpg" 
                  alt="" />
                </div>
               <div className="w-[505px] flex flex-col justify-center">
                  <h3 className="text-[17px] h-10 font-medium px-2 py-2 bg-gray-300 mb-2 pl-5">
                    Thông tin đặt phòng
                  </h3>
                  <img className="object-cover h-[230px] w-[230px] flex ml-[150px]" 
                  src="https://t4.ftcdn.net/jpg/04/75/01/23/360_F_475012363_aNqXx8CrsoTfJP5KCf1rERd6G50K0hXw.jpg" 
                  alt="" />
               </div>
              </div>
              
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchOrder;
