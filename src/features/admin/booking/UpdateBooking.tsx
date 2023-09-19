import {
  useGetBooking_adminByIdQuery,
  useUpdateBooking_adminMutation,
} from '@/api/admin/booking_admin';
import { useGetCategory_adminQuery } from '@/api/admin/category_admin';
import { useGetServices_AdminQuery } from '@/api/admin/service_admin';
import { Button, Form, Input, InputNumber, Select, message, DatePicker } from 'antd';
import { useForm } from 'antd/es/form/Form';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import 'dayjs/locale/vi';

dayjs.extend(utc);
dayjs.extend(timezone);

interface FieldType {
  key: string;
  id: number | string;
  check_in: dayjs.Dayjs;
  check_out: dayjs.Dayjs;
  email: string;
  name: string;
  people_quantity: number;
  total_amount: number;
  status: number | string;
  cccd: string;
  nationality: string;
  id_user: number;
  phone: string;
  cart: [
    {
      id_cate: number;
      services: number[];
    }
  ];
  promotion: number;
}

const UpdateBooking = () => {
  const { id } = useParams();
  const { data: bookingData } = useGetBooking_adminByIdQuery(id);
  const [updatebooking] = useUpdateBooking_adminMutation();
  const [form] = useForm();
  const { data: categories } = useGetCategory_adminQuery({});
  const { data: services } = useGetServices_AdminQuery();
  const [roomCount, setRoomCount] = useState(1);
  const [totalAmount, setTotalAmount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (bookingData) {
      form.setFieldsValue({
        name: bookingData.name,
        cccd: bookingData.cccd,
        phone: bookingData.phone,
        email: bookingData.email,
        check_in: dayjs(bookingData.check_in).tz('Asia/Ho_Chi_Minh'),
        check_out: dayjs(bookingData.check_out).tz('Asia/Ho_Chi_Minh'),
        people_quantity: bookingData.people_quantity,
        nationality: bookingData.nationality,
        cart: bookingData.cart || [], // Kiểm tra nếu 'cart' không tồn tại, sẽ gán một mảng trống
      });
      calculateTotalAmount(bookingData);
    }
  }, [bookingData]);

  useEffect(() => {
    form.setFieldsValue({
      total_amount: totalAmount,
    });
  }, [totalAmount]);

  const calculateTotalAmount = (values: FieldType) => {
    let totalPrice = 0;

    values.cart.forEach((item) => {
      const category = categories?.find((category: any) => category.id === item.id_cate);
      if (category) {
        totalPrice += category?.price;
      }

      item.services?.forEach((serviceId: number) => {
        const service = services?.find((service: any) => service.id === serviceId);
        if (service) {
          totalPrice += service?.price;
        }
      });
    });

    setTotalAmount(totalPrice);
  };

  const [showDeleteButton, setShowDeleteButton] = useState(false);

  const handleRoomRemoval = (roomIndexToRemove: number) => {
    const currentCart = form.getFieldValue('cart');
    currentCart.splice(roomIndexToRemove, 1);
    form.setFieldsValue({ cart: currentCart });
    calculateTotalAmount(form.getFieldsValue());
    setRoomCount(roomCount - 1);

    if (roomCount === 2) {
      setShowDeleteButton(false);
    }
  };

  const handleCheckInDateChange = (selectedDate: dayjs.Dayjs | null) => {
    form.setFieldsValue({ check_in: selectedDate });
  };

  const handleCheckOutDateChange = (selectedDate: dayjs.Dayjs | null) => {
    form.setFieldsValue({ check_out: selectedDate });
  };

  const onFinish = (values: FieldType) => {
    const formattedValues = {
      ...values,
      check_in: values.check_in?.format('YYYY-MM-DD HH:mm:ss'),
      check_out: values.check_out?.format('YYYY-MM-DD HH:mm:ss'),
      id: id,
    };

    updatebooking(formattedValues)
      .unwrap()
      .then(() => {
        navigate('/admin/bookingmanagement');
      });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div>
      <Form
        form={form}
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item label="Tên người dùng" name="name" rules={[{ required: true, message: 'Hãy nhập tên người dùng!' }]}>
          <Input allowClear />
        </Form.Item>

        <Form.Item label="Căn cước công dân" name="cccd" rules={[{ required: true, message: 'Hãy nhập căn cước công dân!' }]}>
          <Input allowClear />
        </Form.Item>

        <Form.Item label="Số điện thoại" name="phone" rules={[{ required: true, message: 'Hãy nhập số điện thoại!' }]}>
          <Input allowClear />
        </Form.Item>

        <Form.Item label="Email" name="email" rules={[{ required: true, message: 'Hãy nhập email!' }, { type: 'email', message: 'Email không hợp lệ!' }]}>
          <Input allowClear />
        </Form.Item>

        <Form.Item label="Check in" name="check_in">
          <DatePicker
            value={form.getFieldValue('check_in')}
            onChange={handleCheckInDateChange}
            showTime
            format="YYYY-MM-DD HH:mm:ss"
            placeholder="Chọn ngày và giờ"
          />
        </Form.Item>

        <Form.Item label="Check out" name="check_out">
          <DatePicker
            value={form.getFieldValue('check_out')}
            onChange={handleCheckOutDateChange}
            showTime
            format="YYYY-MM-DD HH:mm:ss"
            placeholder="Chọn ngày và giờ"
          />
        </Form.Item>

        <Form.Item label="Số lượng người" name="people_quantity" rules={[{ required: true, message: 'Hãy nhập số lượng người!' }]}>
          <InputNumber />
        </Form.Item>

        <Form.Item label="Quốc tịch" name="nationality" rules={[{ required: true, message: 'Hãy nhập quốc tịch!' }]}>
          <Input allowClear />
        </Form.Item>

        {Array.from({ length: roomCount }).map((_, index) => (
          <React.Fragment key={index}>
            <Form.Item
              label={`Loại phòng ${index + 1}`}
              name={['cart', index, 'id_cate']}
              initialValue={bookingData?.cart[index]?.id_cate}
            >
              <Select style={{ width: '150px' }} onChange={() => calculateTotalAmount(form.getFieldsValue())}>
                {categories?.map((category: any) => (
                  <Select.Option value={category.id} key={category.id}>
                    {category.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              label={`Dịch vụ ${index + 1}`}
              name={['cart', index, 'services']}
              initialValue={bookingData?.cart[index]?.services}
            >
              <Select mode="multiple" style={{ width: '150px' }} onChange={() => calculateTotalAmount(form.getFieldsValue())}>
                {services?.map((service: any) => (
                  <Select.Option value={service.id} key={service.id}>
                    {service.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </React.Fragment>
        ))}

        <Form.Item label="Tổng thanh toán" name="total_amount">
          <InputNumber value={totalAmount} disabled className="text-black font-semibold" />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <div className="flex items-center space-x-4">
            <Button
              onClick={() => {
                setRoomCount(roomCount + 1);
                setShowDeleteButton(true);
              }}
            >
              Thêm phòng
            </Button>
            {showDeleteButton && (
              <Button
                onClick={() => {
                  handleRoomRemoval(roomCount - 1);
                }}
              >
                Xoá phòng
              </Button>
            )}
          </div>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" className="bg-blue-500 text-white" htmlType="submit">
            Cập nhật
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default UpdateBooking;
