import {
  useFindBookingMutation,
  useGetSearchOrderQuery,
} from "@/api/bookingUser";
import { message } from "antd";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineSearch } from "react-icons/ai";

const SearchOrder = () => {
  const [bookingData, setBookingData] = useState<any>(null);

  const [find_booking] = useFindBookingMutation();

  const { register, handleSubmit } = useForm();

  const onSubmit = async (data: any) => {
    console.log("dữ liệu",data);
    
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
    <div>
      <div className="bg-whitec w-[1024px] absolute start-[220px] top-[-50px] z-10 rounded-md p-5 text-black">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex items-center text-white w-[1000px] bg-white"
        >
          <div className="flex items-center">
            <input
              type="text"
              placeholder="Nhập hóa đơn mà bạn muốn tìm kiếm vào đây..."
              {...register("slug")}
              className="py-4 text-[13px] placeholder-gray-500 text-black pl-9 rounded"
            />
            <i className="absolute text-gray-500 text-[20px] pl-2">
              <AiOutlineSearch />
            </i>
          </div>
          <div className="flex items-center">
            <input
              type="text"
              placeholder="Nhập số điện thoại mà bạn muốn tìm kiếm vào đây..."
              {...register("phone")}
              className="py-4 text-[13px] placeholder-gray-500 text-black pl-9 rounded"
            />
          </div>
          <button
            type="submit"
            className="text-white font-medium text-[15px] bg-[#e8952f] absolute end-6 px-7 py-[10px] rounded-md"
          >
            Tìm kiếm
          </button>
        </form>

        {bookingData ? (
          <div
            className="mt-2 bg-white rounded-md px-2 py-2 overflow-y-scroll"
            style={{ maxHeight: "400px" }}
          >
            <h2 className="text-[23px] font-medium mb-3 px-3 py-3">
              Thông tin tìm kiếm
            </h2>
            <div className="flex   rounded-md">
              <div className=" w-[50%] rounded-md border">
                <h3 className="text-[17px] h-10 font-medium px-2 py-2 bg-gray-300 mb-2">
                  Thông tin khách hàng
                </h3>
                <div className="text-[14px] font-medium px-2 leading-7">
                  <span>
                    Họ và tên:{" "}
                    <span className="text-blue-500 px-1 mr-5">
                      {bookingData?.name}
                    </span>
                  </span>{" "}
                  <br />
                  <span>
                    Email:{" "}
                    <span className="text-blue-500 px-1 mr-5">
                      {bookingData?.email}
                    </span>
                  </span>{" "}
                  <br />
                  <span>
                    Địa chỉ:{" "}
                    <span className="text-blue-500 px-1 mr-5">
                      Phường Tân Bình, Thành phố Hải Dương
                    </span>
                  </span>{" "}
                  <br />
                  <span>
                    Số điện thoại:{" "}
                    <span className="text-blue-500 px-1 mr-5">
                      {bookingData?.phone}
                    </span>
                  </span>{" "}
                  <br />
                  <span>
                    Căn cước công dân:{" "}
                    <span className="text-blue-500 px-1 mr-5">
                      {bookingData?.cccd}
                    </span>
                  </span>{" "}
                  <br />
                  <span>
                    Quốc tịch:{" "}
                    <span className="text-blue-500 px-1 mr-5">
                      {bookingData?.nationality}
                    </span>
                  </span>{" "}
                  <br />
                </div>
              </div>
              <div className="w-[50%] border rounded-md">
                <h3 className="text-[17px] h-10 font-medium px-2 py-2 bg-gray-300 mb-2">
                  Thông tin đặt phòng
                </h3>
                <h2 className="px-2 font-bold mb-2 text-[18px] mt-4">
                  VinHolidays Fiesta Phú Quốc
                </h2>
                <div className="flex text-[14px] font-medium px-2 space-x-4">
                  <span className="">
                    Tổng số phòng:{" "}
                    <span className="text-blue-500 px-1 ">
                      {bookingData?.total_room}
                    </span>
                  </span>
                  <span>
                    Tổng số người:{" "}
                    <span className="text-blue-500 px-1 ">
                      {bookingData?.people_quantity}
                    </span>{" "}
                  </span>
                  <span>
                    Tổng tiền:{" "}
                    <span className="text-blue-500 px-1 ">
                      {bookingData?.total_amount} đ
                    </span>{" "}
                  </span>
                </div>
                <span className="w-[100%] items-center flex text-[14px] font-medium px-2 mt-1 mb-3">
                  (Chủ nhật){" "}
                  <span className="text-blue-500 px-1 ">
                    {" "}
                    {new Date(bookingData?.check_in).toLocaleDateString()}
                  </span>{" "}
                  - (Thứ ba)
                  <span className="text-blue-500 px-1">
                    {new Date(bookingData?.check_out).toLocaleDateString()}
                  </span>
                </span>
                <div className="border-t-2">
                  <h2 className="my-3 mx-2 font-bold">Thông tin các phòng</h2>

                  {bookingData?.room?.map((item: any) => {
                    return (
                      <>
                        <div className="border-b-1 mb-2 flex">
                          <img
                            className="w-[25%] h-[60px]  px-2 "
                            src={item?.category_image}
                            alt=""
                          />
                          <div>
                            <span className="text-[14px] font-medium">
                              Phòng:
                              <span className="text-blue-500 px-1 mr-5">
                                {item?.name}
                              </span>{" "}
                              Loại phòng:
                              <span className="text-blue-500 px-1">
                                {item?.category_name}
                              </span>
                            </span>
                            <br />
                            <span className="text-[14px] font-medium flex mt-2">
                              Dịch vụ:
                              {item?.services?.map((service: any) => {
                                return (
                                  <span className="text-blue-500 px-1 mr-5 text-[12px] flex items-center">
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
            className="mt-2 bg-white rounded-md px-2 py-2 overflow-y-scroll"
            style={{ maxHeight: "400px" }}
          >
            <h2 className="text-[23px] font-medium mb-3 px-3 py-3">
              Thông tin tìm kiếm
            </h2>
            <div>Không có dữ liệu</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchOrder;
