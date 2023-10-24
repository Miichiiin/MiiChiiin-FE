import { useState } from 'react';
import { Link, useNavigate, useParams } from "react-router-dom";
import { useGetBooking_adminByIdQuery } from "@/api/admin/booking_admin";
import { useGetCategory_homeQuery } from "@/api/webapp/category_home";
import { Button } from 'antd';
//import { useGetService_hotelQuery } from '@/api/webapp/service_hotel';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import 'dayjs/locale/vi';

import { AiOutlineDown, AiOutlineUp } from 'react-icons/ai';
//import { useGetRoom_AdminsQuery } from '@/api/admin/room_admin';
dayjs.extend(utc);
dayjs.extend(timezone);

const DetailBooking = () => {
  const { data: categories } = useGetCategory_homeQuery();
  //const { data: services } = useGetService_hotelQuery();
  const { id } = useParams<{ id: string }>();
  const { data: booking } = useGetBooking_adminByIdQuery(id);
  console.log(booking);
  
  const [isServicesVisible, setIsServicesVisible] = useState<{ [key: number]: boolean }>({});
  // const getRoomName = (roomId: any) => {
  //   const roomData = roomsData?.find((room: any) => room.id === roomId);
  //   return roomData ? `Phòng ${roomData.name}` : 'Chưa có phòng';
  // }
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


  return (
    <div className="w-[100%] mx-auto">
      <div className='flex justify-end mb-5'>
        <Button type="primary" danger onClick={() => navigate("/admin/bookingmanagement")}>
          Quay lại
        </Button>
        <Button type="primary" className='bg-green-500 mx-2'>
          Export PDF
        </Button>
        <Button type="primary" className='bg-blue-500'> <Link to={`/admin/updatebooking/${booking?.id}`}>Sửa</Link></Button>
      </div>
      <section className='grid grid-cols-2 gap-8'>

        <div key={booking?.id} className=''>
          
          <h1 className="font-semibold text-lg mb-2">Thông tin đặt phòng : <span className='font-bold text-xl text-blue-800'>{booking?.slug}</span></h1>
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
              <p className='font-semibold'>Tổng tiền: <span className='text-lg font-medium text-blue-900'>{booking?.total_amount}</span></p>
            </div>

          </div>

        </div>
        <div className="">
          <h1 className="text-lg font-semibold mb-2 ml-4">Danh sách phòng và dịch vụ đã đặt</h1>
          <ul>
            {booking?.room?.map((item: any, index: any) => {
              const typeroom = categories?.find((category: any) => category.id === item?.id_category);         
              return (
                <li key={index} className='ml-3 my-2'>
                  <div className='border flex justify-between px-2 py-3'>
                    <div className=''>
                      {typeroom && (
                        <>
                          <span className='font-bold text-md px-2' >Phòng {index + 1}:</span>
                          <span className='text-blue-800 font-semibold'>{item.category_name}</span>
                          <span className=' text-blue-500 px-2'>{item.name}</span>
                        </>
                      )}
                    </div>
                    <button onClick={() => toggleServicesVisibility(index)} type='button'>
                      {isServicesVisible[index] ? <span className='flex items-center'>Ẩn dịch vụ <AiOutlineUp /></span> : <span className='flex items-center'>Hiện dịch vụ <AiOutlineDown /></span>}
                    </button>
                  </div>
                  {isServicesVisible[index] && (
                    <ul className='border-b border-x'>
                      {item.services.map((service: any, serviceIndex: any) => (
                        <li key={serviceIndex} className='pt-1'>
                          <span className='text-md font-bold px-2'>Dịch vụ {serviceIndex + 1}: </span> {service?.name}
                          <span className='text-md font-bold pl-2'>Giá : </span> {service?.price}
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

    </div>
  );
}

export default DetailBooking;