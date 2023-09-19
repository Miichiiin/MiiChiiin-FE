import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAddBooking_adminMutation } from '@/api/admin/booking_admin';
import { useGetCategory_adminQuery } from '@/api/admin/category_admin';
import { useGetServices_AdminQuery } from '@/api/admin/service_admin';
import { Button, Form, Input, InputNumber, Select, DatePicker } from 'antd';

interface Category {
  id: number;
  name: string;
  price: number;
}

interface Service {
  id: number;
  name: string;
  price: number;
}

interface FieldType {
  key: string;
  id: number | string;
  check_in: string;
  check_out: string;
  email: string;
  name: string;
  people_quantity: number;
  total_amount: number;
  status: number | string;
  cccd: string;
  nationality: string;
  id_user: number;
  phone: string;
  cart: {
    id_cate: number;
    services: number[];
  }[];
  promotion: number;
}

const AddBooking = () => {
  const { data: categories } = useGetCategory_adminQuery({}); // Lấy danh sách loại phòng
  const { data: services } = useGetServices_AdminQuery(); // Lấy danh sách dịch vụ
  const [addBooking] = useAddBooking_adminMutation(); // Thêm booking
  const [roomCount, setRoomCount] = useState<number>(1);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({
      total_amount: totalAmount,
    });
  }, [totalAmount]);

  const calculateTotalAmount = (values: FieldType) => {
    let totalPrice = 0;

    // Lặp qua từng phần tử trong giỏ hàng (cart)
    values.cart.forEach((item) => {
      const category = categories?.find((category: Category) => category.id === item.id_cate);
      if (category) {
        totalPrice += category?.price || 0; // Cộng giá loại phòng vào tổng
      }

      item.services?.forEach((serviceId: number) => {
        const service = services?.find((service: Service) => service.id === serviceId);
        if (service) {
          totalPrice += service?.price || 0; // Cộng giá dịch vụ vào tổng
        }
      });
    });

    setTotalAmount(totalPrice);
  };

  const [showDeleteButton, setShowDeleteButton] = useState<boolean>(false);

  // Hàm để xử lý việc xoá phòng
  const handleRoomRemoval = (roomIndexToRemove: number) => {
    const currentCart = form.getFieldValue('cart') as FieldType['cart'];

    if (Array.isArray(currentCart)) {
      // Xoá phần tử tại roomIndexToRemove nếu nó tồn tại
      if (currentCart.length > 1 || roomIndexToRemove >= 0) {
        currentCart.splice(roomIndexToRemove, 1);
        form.setFieldsValue({ cart: currentCart });
        calculateTotalAmount(form.getFieldsValue());
        setRoomCount(roomCount - 1);

        if (roomCount === 2) {
          setShowDeleteButton(false);
        }
      }
    }
  };

  const navigate = useNavigate();

  const onFinish = (values: FieldType) => {
    console.log(values);

    addBooking(values)
      .unwrap()
      .then(() => {
        navigate('/admin/bookingmanagement');
      });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className="mx-auto w-[50%]">
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        form={form}
      >
        <div className="grid grid-cols-2 mx-2">
          <Form.Item
            label="Tên người dùng"
            name="name"
            rules={[
              { required: true, message: 'Hãy nhập tên người dùng!' },
              { whitespace: true, message: 'Không được để trống!' },
            ]}
            labelCol={{ span: 24 }}
          >
            <Input allowClear className='w-[250px]'/>
          </Form.Item>
          <Form.Item
            label="Căn cước công dân"
            name="cccd"
            rules={[
              { required: true, message: 'Hãy nhập !' },
              { whitespace: true, message: 'Không được để trống!' },
            ]}
            labelCol={{ span: 24 }}
          >
            <Input allowClear className='w-[250px]'/>
          </Form.Item>
          <Form.Item
            label="Số điện thoại"
            name="phone"
            rules={[
              { required: true, message: 'Hãy nhập !' },
              { whitespace: true, message: 'Không được để trống!' },
            ]}
            
            labelCol={{ span: 24 }}
          >
            <Input allowClear className='w-[250px]' />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: 'Hãy nhập !' },
              { whitespace: true, message: 'Không được để trống!' },
              { type: 'email', message: 'Email không hợp lệ!' },
            ]}
            
            labelCol={{ span: 24 }}
          >
            <Input allowClear className='w-[250px]' />
          </Form.Item>
          <Form.Item
            label="Check in"
            name="check_in"
            labelCol={{ span: 24 }}
          >
            <DatePicker className='w-[250px]' 
            showTime
               format="YYYY-MM-DD HH:mm:ss"
               placeholder="Chọn ngày và giờ"/>
          </Form.Item>
          <Form.Item
            label="Check out"
            name="check_out"
            labelCol={{ span: 24 }}
          >
            <DatePicker className='w-[250px]' 
              showTime
               format="YYYY-MM-DD HH:mm:ss"
               placeholder="Chọn ngày và giờ"/>
          </Form.Item>
          <Form.Item
            label="Số lượng người"
            name="people_quantity"
            rules={[{ required: true, message: 'Hãy nhập !' }]}
            labelCol={{ span: 24 }}
          >
            <InputNumber className='w-[250px]' />
          </Form.Item>
          <Form.Item
            label="Quốc tịch"
            name="nationality"
            rules={[
              { required: true, message: 'Hãy nhập !' },
              { whitespace: true, message: 'Không được để trống!' },
            ]}
            
            labelCol={{ span: 24 }}
          >
            <Input allowClear className='w-[250px]' />
          </Form.Item>
        </div>
        {Array.from({ length: roomCount }).map((_, index) => (
          <React.Fragment key={index}>
            <div className="grid grid-cols-2 gap-4 mx-2">
              <div >
                <Form.Item
                  label={`Loại phòng ${index + 1}`}
                  name={['cart', index, 'id_cate']}
                  labelCol={{ span: 24 }}
                >
                  <Select className='w-[250px]' onChange={() => calculateTotalAmount(form.getFieldsValue())}>
                    {categories?.map((category: Category) => (
                      <Select.Option value={category.id} key={category.id} >
                        {category.name}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </div>
              <div >
                <Form.Item
                  label={`Dịch vụ ${index + 1}`}
                  name={['cart', index, 'services']}
                  labelCol={{ span: 24 }}
                >
                  <Select mode="multiple" className='w-[250px]' onChange={() => calculateTotalAmount(form.getFieldsValue())}>
                    {services?.map((service: Service) => (
                      <Select.Option value={service.id} key={service.id}>
                        {service.name}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </div>
            </div>
          </React.Fragment>
        ))}
        <Form.Item label="Tổng thanh toán" name="total_amount" className='ml-16  '>
          <InputNumber value={totalAmount} disabled className="text-black text-lg font-semibold" />
        </Form.Item>
        <Form.Item >  
          <div className="flex justify-start items-center space-x-4">
          <Button type="primary" className="bg-blue-500 text-white" htmlType="submit">
            Add
          </Button>
            <Button
              onClick={() => {
                setRoomCount(roomCount + 1);
                setShowDeleteButton(true);
              }}
              className='bg-yellow-500 text-white'
              type='primary'
            >
              Thêm phòng
            </Button>
            {/* Hiển thị nút "Xoá phòng" nếu có ít nhất 2 phòng */}
            {showDeleteButton && (
              <Button
                onClick={() => {
                  handleRoomRemoval(roomCount - 1); // Xoá phòng cuối cùng
                }}
                type='primary'
                danger
              >
                Xoá phòng
              </Button>
            )}
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddBooking;
