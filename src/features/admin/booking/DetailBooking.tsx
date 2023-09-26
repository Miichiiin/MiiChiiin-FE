import React from 'react';
import { useParams } from "react-router-dom";
import { useGetBooking_adminByIdQuery } from "@/api/admin/booking_admin";
import { useGetCategory_homeQuery } from "@/api/webapp/category_home";
import { Form } from 'antd';
import { useGetService_hotelQuery } from '@/api/webapp/service_hotel';

const DetailBooking = () => {
  const { data: categories } = useGetCategory_homeQuery();
  const { id } = useParams<{ id: string }>();
  const { data: booking } = useGetBooking_adminByIdQuery(id);
  const { data: services } = useGetService_hotelQuery({});
  const [form] = Form.useForm();

  const [isServiceOpen, setIsServiceOpen] = React.useState(false);

  return (
    <div className="w-[100%] mx-auto">
      <h1 className="font-semibold text-xl">Thông tin Đặt phòng</h1>

      <div>
        <Form
          form={form}
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          autoComplete="off">
        </Form>

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
                <div>
                  {/* Hiển thị thông tin từng loại phòng và dịch vụ */}
                  {booking?.cart.map((cartItem: any, index: number) => {
                    const categoryId = cartItem.id_cate;
                    const category = categories?.[categoryId]?.name;

                    return (
                      <div key={index}>
                        <div className="border rounded-lg px-2 py-3 my-2">
                          <h2>Tên loại phòng: {category}</h2>
                          <ul>
                            {cartItem.services.map((serviceId: number, serviceIndex: number) => {
                              const serviceName = services?.[serviceId]?.name;

                              return (
                                <li key={serviceIndex}>
                                  Tên dịch vụ: {serviceName}
</li>
                              );
                            })}
                          </ul>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default DetailBooking;