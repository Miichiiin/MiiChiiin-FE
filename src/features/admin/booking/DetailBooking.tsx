import React, { useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { useGetBooking_adminByIdQuery } from "@/api/admin/booking_admin";
import { useGetCategory_homeQuery } from "@/api/webapp/category_home";
import { Button, Form } from 'antd';
import { useGetService_hotelQuery } from '@/api/webapp/service_hotel';
import { AiOutlineDown, AiOutlineUp } from 'react-icons/ai';


const DetailBooking = () => {
  const { data: categories } = useGetCategory_homeQuery();
  const { data: services } = useGetService_hotelQuery({});
  const { id } = useParams<{ id: string }>();
  const { data: booking } = useGetBooking_adminByIdQuery(id);
  const [isServicesVisible, setIsServicesVisible] = useState<{ [key: number]: boolean }>({});

  const toggleServicesVisibility = (roomIndex: number) => {
    setIsServicesVisible((prevIsServicesVisible) => ({
      ...prevIsServicesVisible,
      [roomIndex]: !prevIsServicesVisible[roomIndex],
    }));
  };
  const getServiceName = (serviceId: any) => {
    // Điều này chỉ là một ví dụ đơn giản, bạn cần thay thế bằng cách lấy tên dịch vụ từ dữ liệu thực tế của bạn.
    const serviceData = services.find((service: any) => service.id === serviceId);
    return serviceData ? serviceData.name : 'Dịch vụ không tồn tại';
  };
  const navigate = useNavigate()



  return (
    <div className="w-[100%] mx-auto">
      <h1 className="font-semibold text-xl">Thông tin Đặt phòng</h1>

      <div>


        <div className='choice-column'>
          <section className='flex'>
            <div className='px-2'>
              <div key={booking?.id} className='flex items-center'>
                <div className='flex flex-col border rounded-lg px-2 py-3 my-2 w-[400px] mt-10 leading-[50px] text-[17px] font-medium'>
                  <h1 >Tên khách hàng: {booking?.name}</h1>
                  <span>Căn cước công dân: {booking?.cccd}</span>
                  <span>Số điện thoại: {booking?.phone}</span>
                  <span>Email: {booking?.email}</span>
                  <span>Check in: {booking?.check_in}</span>
                  <span>Check out: {booking?.check_out}</span>
                  <span>Quốc tịch: {booking?.nationality}</span>
                  <span>Tổng số người: {booking?.people_quantity}</span>
                  <div className='flex justify-between'>
                    <h1 className=''>{booking?.description}</h1>
                  </div>
                </div>
                <div className="col-span-2">
                  <h2 className="text-lg font-semibold mb-2 ml-4">Danh sách phòng và dịch vụ đã đặt</h2>
                  <ul>
                    {booking?.cart?.map((item: any, index: any) => {
                      const room = categories?.find((category: any) => category.id === item.id_cate);

                      return (
                        <li key={index} className='ml-3 my-2'>
                          <div className='border flex justify-between px-2 py-3'>
                            <div className=''>
                              {room && (
                                <>
                                  <span className='font-bold text-md' >Phòng: </span>
                                  <span className='text-blue-800 font-semibold'>{room.name}</span>
                                </>
                              )}
                            </div>
                            <button onClick={() => toggleServicesVisibility(index)} type='button'>
                              {isServicesVisible[index] ? <span className='flex items-center'>Ẩn dịch vụ <AiOutlineUp /></span> : <span className='flex items-center'>Hiện dịch vụ <AiOutlineDown /></span>}
                            </button>
                          </div>
                          {isServicesVisible[index] && (
                            <ul className='border-b border-x'>
                              {item.services.map((serviceId:any, serviceIndex:any) => (
                                <li key={serviceIndex} className='pt-1'>
                                  <span className='text-md  font-bold px-2'>Dịch vụ {serviceIndex + 1}: </span> {getServiceName(serviceId)}
                                </li>
                              ))}
                            </ul>
                          )}
                        </li>
                      );
                    })}
                  </ul>

                </div>
              </div>
              <Button type="primary" danger onClick={() => navigate("/admin/bookingmanagement")}>
              Quay lại
            </Button>
            </div>
            
          </section>
        </div>
      </div>
    </div>
  );
}

export default DetailBooking;