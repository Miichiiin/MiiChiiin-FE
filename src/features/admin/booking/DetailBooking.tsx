import { useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { useGetBooking_adminByIdQuery } from "@/api/admin/booking_admin";
import { Skeleton } from 'antd';
//import { useGetService_hotelQuery } from '@/api/webapp/service_hotel';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import 'dayjs/locale/vi';

import { AiOutlineDown, AiOutlineTool, AiOutlineUp } from 'react-icons/ai';
import { ArrowLeftOutlined } from '@ant-design/icons';
dayjs.extend(utc);
dayjs.extend(timezone);

const DetailBooking = () => {
  const { id } = useParams<{ id: string }>();
  const { data: booking, isLoading, isError } = useGetBooking_adminByIdQuery(id);
  const [isServicesVisible, setIsServicesVisible] = useState<{ [key: number]: boolean }>({});
  const toggleServicesVisibility = (roomIndex: number) => {
    setIsServicesVisible((prevIsServicesVisible) => ({
      ...prevIsServicesVisible,
      [roomIndex]: !prevIsServicesVisible[roomIndex],
    }));
  };

  const navigate = useNavigate()
  const checkIn = dayjs(booking?.check_in);
  const checkOut = dayjs(booking?.check_out);
  const numberOfNights = checkOut.diff(checkIn, 'day');


  if (isLoading) {
    return <Skeleton active />;
  }

  if (isError) {
    return <div>Có lỗi xảy ra khi tải thông tin dịch vụ.</div>;
  } // phân quyền
  const dataPermission = localStorage.getItem('userAdmin')
  const currentUserPermissions = (dataPermission && JSON.parse(dataPermission).permissions) || [];
  const hasAddUserPermission = (permissions: any) => {
    return currentUserPermissions.includes(permissions);
  };

  return (
    <div className="w-[100%] mx-auto">

      <section className='grid grid-cols-2 gap-8'>
        <div key={booking?.id} className=''>
          <h1 className="font-bold text-lg mb-2 text-orange-500">Thông tin đặt phòng : <span className='font-bold text-xl text-orange-900'>{booking?.slug}</span></h1>
          <div className='flex flex-col border rounded-lg px-2 mb-4 py-3 leading-[25px] '>
            <div className='grid grid-cols-2 gap-4'>
              <p className='font-semibold'>Tên khách hàng: <span className='text-lg font-medium text-blue-900'>{booking?.name}</span></p>
              <p className='font-semibold'>Căn cước công dân: <span className='text-lg font-medium text-blue-900'>{booking?.cccd}</span></p>
              <p className='font-semibold'>Số điện thoại: <span className='text-lg font-medium text-blue-900'>{booking?.phone}</span></p>
              <p className='font-semibold'>Email: <span className='text-lg font-medium text-blue-900'>{booking?.email}</span></p>
              <p className='font-semibold'>Check in: <span className='text-lg font-medium text-blue-900'>{dayjs(booking?.check_in).format('YYYY-MM-DD HH:mm:ss')}</span></p>
              <p className='font-semibold'>Check out: <span className='text-lg font-medium text-blue-900'>{dayjs(booking?.check_out).format('YYYY-MM-DD HH:mm:ss')}</span></p>
              <p className='font-semibold'>Quốc tịch: <span className='text-lg font-medium text-blue-900'>{booking?.nationality}</span></p>
              <p className='font-semibold'>Tổng số người: <span className='text-lg font-medium text-blue-900'>{booking?.people_quantity}</span></p>
              <p className='font-semibold'>Số phòng: <span className='text-lg font-medium text-blue-900'>{booking?.total_room}</span></p>
              <p className='font-semibold'>Số đêm: <span className='text-lg font-medium text-blue-900'>{numberOfNights}</span></p>
              <p className='font-semibold'>Tổng tiền: <span className='text-lg font-medium text-blue-900'>{new Intl.NumberFormat('vi-VN', {
                            style: 'currency',
                            currency: 'VND',
                          }).format(booking?.total_amount)}</span></p>
              <p className='font-semibold'>Trạng thái: <span className='text-lg font-medium text-blue-900'>
                {booking?.status === 2 ? 'Đã check in' : booking?.status === 3 ? 'Đã thanh toán' : booking?.status === 4 ? 'Đã check out' : booking?.status === 1 ? 'Đã huỷ' : booking?.status === 0 ? 'Đang chờ' : ''}
              </span></p>

            </div>

          </div>

        </div>
        <div className="">
          <h1 className="text-lg font-bold mb-2 ml-4 text-orange-500">Danh sách phòng và dịch vụ đã đặt</h1>
          <ul>
            {booking?.room?.map((item: any, index: any) => {
              return (
                <li key={index} className='ml-3 my-2'>
                  <div className='border flex justify-between px-2 py-3'>
                    <div className=''>

                      <>
                        <span className='font-bold text-md pr-1 italic text-lg' >{index + 1}:</span>
                        <span className='text-lg text-blue-500 px-2 '> <span className='text-gray-800 font-semibold'>Phòng</span> <span className='font-bold'>{item.name}</span></span>
                        Thuộc<span className='text-blue-800 font-semibold'> {item.category_name}</span>
                      </>

                    </div>
                    <button onClick={() => toggleServicesVisibility(index)} type='button'>
                      {isServicesVisible[index] ? <span className='flex items-center text-orange-800'>Ẩn dịch vụ <AiOutlineUp /></span> : <span className='flex items-center text-orange-800'>Hiện dịch vụ <AiOutlineDown /></span>}
                    </button>
                  </div>
                  {isServicesVisible[index] && (
                    <ul className='border-b border-x'>
                      {item.services.map((service: any, serviceIndex: any) => (
                        <li key={serviceIndex} className='pt-1'>
                          <span className='text-md font-bold px-2 italic'>Dịch vụ {serviceIndex + 1}: </span> <span className='text-blue-800 font-semibold'>{service?.name}</span> x<span className='text-red-500 font-semibold'>{service.quantity_service}</span>
                          <span className='text-md font-bold pl-2 italic'>Giá : </span> <span className='text-blue-800 font-semibold'>
                            {new Intl.NumberFormat('vi-VN', {
                            style: 'currency',
                            currency: 'VND',
                          }).format(service?.price * service.quantity_service)}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              );
            })}
          </ul>

        </div>

      </section>
      <div className='flex justify-end mb-5'>
        <button className='mx-2 px-3 py-2 border hover:bg-orange-400 bg-orange-500 text-white rounded-md flex items-center' onClick={() => navigate("/admin/bookingmanagement")}>
          <ArrowLeftOutlined className="pr-2" />Quay lại
        </button>
        {hasAddUserPermission("update admin") && (
        <button className='px-3 py-2 hover:bg-cyan-600 bg-cyan-500 text-white rounded-md text-xl items-center' ><a href={`/admin/updatebooking/${booking?.id}`}><AiOutlineTool /></a></button>
        )}
      </div>
    </div>
  );
}

export default DetailBooking;