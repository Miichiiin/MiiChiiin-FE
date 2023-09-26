import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Form, Input, InputNumber, Select, DatePicker, Checkbox } from 'antd';
import { useGetCategory_homeQuery } from '@/api/webapp/category_home';
import { useGetService_hotelQuery } from '@/api/webapp/service_hotel';
import { useAddBooking_adminMutation } from '@/api/admin/booking_admin';



interface Category {
  id: number;
  name: string;
  price: number;
  total_rooms: number;
  quantity_of_people: number;
}

interface Service {
  id: number;
  name: string;
  price: number;
  image: string;
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
  const { data: categories } = useGetCategory_homeQuery(); // Lấy danh sách loại phòng
  const { data: services } = useGetService_hotelQuery({}); // Lấy danh sách dịch vụ
  const [addBooking] = useAddBooking_adminMutation(); // Thêm booking
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [selectedServices, setSelectedServices] = useState<number[]>([]);
  const [cartData, setCartData] = useState<FieldType['cart']>([]);
  const [form] = Form.useForm();
  const [selectedRoomsData, setSelectedRoomsData] = useState<{ roomIndex: number; services: number[] }[]>([]);

  const handleContinueClick = () => {
    // Kiểm tra xem đã chọn phòng nào đó hay chưa
    console.log("đã bấm nút");
  
    if (selectedRoomIndex !== null) {
      // Tìm xem phòng đã được thêm vào mảng selectedRoomsData chưa
      const roomIndex = selectedRoomsData.findIndex((roomData) => roomData.roomIndex === selectedRoomIndex);
  
      if (roomIndex !== -1) {
        // Phòng đã có trong mảng, tạo một bản sao của nó và cập nhật dịch vụ cho phòng mới
        const updatedSelectedRoomsData = [...selectedRoomsData];
        const newRoom = { ...updatedSelectedRoomsData[roomIndex] };
        newRoom.services = selectedServices;
  
        // Thêm phòng mới cùng loại vào mảng
        updatedSelectedRoomsData.push(newRoom);
        setSelectedRoomsData(updatedSelectedRoomsData);
      } else {
        // Phòng chưa có trong mảng, thêm nó vào
        setSelectedRoomsData([...selectedRoomsData, { roomIndex: selectedRoomIndex , services: selectedServices }]);
      }
      // Cập nhật giá trị cart trong form antd
      const updatedCart = [...cartData, { id_cate: selectedRoomIndex  , services: selectedServices }];
      setCartData(updatedCart);
      form.setFieldsValue({ cart: updatedCart });
      calculateTotalAmount();
    }
    setSelectedServices([]);
    setSelectedRoomIndex(null);
  };
  
  console.log("selected", selectedRoomsData);

  // Hàm hiện dịch vụ khi click vào phòng
  const [selectedRoomIndex, setSelectedRoomIndex] = useState<number | null>(null);

  const handleRoomClick = (roomIndex: number) => {
    setSelectedRoomIndex(roomIndex);
    
  };

  const navigate = useNavigate();
  // Hàm để lấy tên dịch vụ dựa vào serviceId

  const getServiceName = (serviceId: any) => {
    // Điều này chỉ là một ví dụ đơn giản, bạn cần thay thế bằng cách lấy tên dịch vụ từ dữ liệu thực tế của bạn.
    const serviceData = services.find((service: any) => service.id === serviceId);
    return serviceData ? serviceData.name : 'Dịch vụ không tồn tại';
  };

  // Hàm để xóa một dịch vụ khỏi phòng đã chọn
  const handleRemoveService = (roomIndex: any, serviceId: any) => {
    // Sao chép danh sách phòng đã chọn
    const updatedSelectedRoomsData = [...selectedRoomsData];
    // Lấy ra thông tin của phòng đã chọn
    const roomData = updatedSelectedRoomsData[roomIndex];
    // Kiểm tra xem dịch vụ có tồn tại trong phòng không
    const serviceIndex = roomData.services.indexOf(serviceId);
    if (serviceIndex !== -1) {
      // Nếu dịch vụ tồn tại, xoá nó khỏi danh sách dịch vụ của phòng
      roomData.services.splice(serviceIndex, 1);

      // Cập nhật lại danh sách phòng đã chọn
      updatedSelectedRoomsData[roomIndex] = roomData;

      // Cập nhật selectedRoomsData với danh sách mới
      setSelectedRoomsData(updatedSelectedRoomsData);

      // Cập nhật giỏ hàng (cart) trong form nếu cần
      const updatedCartData = updatedSelectedRoomsData.map((roomData) => ({
        id_cate: roomData.roomIndex,
        services: roomData.services,
      }));
      setCartData(updatedCartData);
      form.setFieldsValue({ cart: updatedCartData });
      calculateTotalAmount();
    }
  };
  const handleRemoveRoom = (roomIndex: any) => {
    const updatedSelectedRoomsData = [...selectedRoomsData];
    updatedSelectedRoomsData.splice(roomIndex, 1); // Xoá phòng khỏi danh sách
    setSelectedRoomsData(updatedSelectedRoomsData);

    const updatedCartData = updatedSelectedRoomsData.map((roomData) => ({
      id_cate: roomData.roomIndex,
      services: roomData.services,
    }));
    setCartData(updatedCartData);
    form.setFieldsValue({ cart: updatedCartData });
    calculateTotalAmount();
  };

  const calculateTotalAmount = () => {
    let total = 0;
  
    // Tính tổng giá tiền của các loại phòng đã chọn
    selectedRoomsData.forEach((roomData) => {
      const selectedCategory = categories[roomData.roomIndex];
      if (selectedCategory) {
        total += selectedCategory.price;
      }
  
      // Tính tổng giá tiền của các dịch vụ đã chọn cho từng phòng
      roomData.services.forEach((serviceId) => {
        const selectedService = services.find((service:any) => service.id === serviceId);
        if (selectedService) {
          total += selectedService.price;
        }
      });
    });
  
    // Cập nhật giá trị tổng thanh toán
    setTotalAmount(total);
  };
  
  
  
  //
  useEffect(() => {
    form.setFieldsValue({
      total_amount: totalAmount,
    });
  }, [totalAmount]);
  const onFinish = (values: FieldType) => {

    const cart = selectedRoomsData.map((roomData) => ({
      id_cate: roomData.roomIndex + 1, // ID phòng đã chọn
      services: roomData.services, // Các dịch vụ đã chọn cho phòng
    }));

    // Cập nhật giá trị cart trong values
    values.cart = cart;

    console.log(values)
    // addBooking(values).unwrap().then(() => {navigate('/admin/bookingmanagement');
    // });
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
        style={{ maxWidth: 1200 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        form={form}
      >

        <div className='grid grid-colss-2 '>
          <div className="grid grid-cols-2 mx-2 ">
            <Form.Item
              label="Tên người dùng"
              name="name"
              rules={[
                { required: true, message: 'Hãy nhập tên người dùng!' },
                { whitespace: true, message: 'Không được để trống!' },
              ]}
              labelCol={{ span: 24 }}
            >
              <Input allowClear className='w-[200px]' />
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
              <Input allowClear className='w-[200px]' />
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
              <Input allowClear className='w-[200px]' />
            </Form.Item>
            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: 'Hãy nhập !' },
                { whitespace: true, message: 'Không được để trống!' },

              ]}

              labelCol={{ span: 24 }}
            >
              <Input allowClear className='w-[200px]' />
            </Form.Item>
            <Form.Item
              label="Check in"
              name="check_in"
              labelCol={{ span: 24 }}
            >
              <DatePicker
                // showTime
                // format="YYYY-MM-DD HH:mm:ss"
                // placeholder="Chọn ngày và giờ"
                className='w-[200px]'
              />
            </Form.Item>
            <Form.Item
              label="Check out"
              name="check_out"
              labelCol={{ span: 24 }}
            >
              <DatePicker
                // showTime
                // format="YYYY-MM-DD HH:mm:ss"
                // placeholder="Chọn ngày và giờ"
                className='w-[200px]'
              />
            </Form.Item>
            <Form.Item
              label="Số lượng người"
              name="people_quantity"
              rules={[{ required: true, message: 'Hãy nhập !' }]}
              labelCol={{ span: 24 }}
            >
              <InputNumber className='w-[200px]' />
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
              <Input allowClear className='w-[200px]' />
            </Form.Item>
          </div>

          <div className='flex px-3 py-3 rounded-md h-[400px]' style={{ boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }}>
            <div className="grid grid-cols-3 gap-3">
              {categories?.map((category: Category, index: number) => (
                <React.Fragment key={index}>
                  <div
                    className={`p-4 rounded-md cursor-pointer w-[150px] h-[140px] ${selectedRoomIndex === index ? 'bg-blue-500 text-white' : category.total_rooms < 1 ? 'bg-red-500 text-white cursor-not-allowed' : 'bg-[#15803d] '
                      }`}
                    onClick={() => {
                      if (category.total_rooms >= 1) {
                        handleRoomClick(index);
                      }
                    }}
                  >
                    <h2 className="font-bold text-md">{category?.name}</h2>
                    <p>Còn: {category?.total_rooms} phòng</p>
                    <p>Sức chứa: {category?.quantity_of_people} người</p>
                    <p>Giá {category?.price}</p>
                    <p>Dịch vụ đã chọn: </p>
                  </div>
                </React.Fragment>
              ))}
            </div>

            <div className="flex-1 p-4 ml-[50px]">
              {selectedRoomIndex !== null && (
                <Form.Item name={['cart', selectedRoomIndex, 'services']} labelCol={{ span: 24 }}>
                  {services?.map((service: Service) => (
                    <div key={service.id} className="mb-4">
                      <Checkbox
                        value={service.id}
                        checked={selectedServices.includes(service.id)}
                        onChange={(e) => {
                          const selectedServiceId = service.id;
                          if (e.target.checked) {
                            setSelectedServices([...selectedServices, selectedServiceId]);
                          } else {
                            setSelectedServices(selectedServices.filter((id) => id !== selectedServiceId));
                          }
                        }}
                      />
                      <img src={service.image} alt={service.name} className="w-[70px] h-[70px]" />
                      <span className="ml-2">{service.name}</span>
                    </div>
                  ))}
                </Form.Item>
              )}

              <Button className='btn-primary bg-' onClick={handleContinueClick}>Tiếp tục</Button>
            </div>
          </div>

        </div>
        <div>
          <h2>Các phòng đã chọn:</h2>
          <ul>
            {selectedRoomsData.map((roomData, roomIndex) => (
              <li key={roomIndex}>
                <p>Phòng {roomIndex + 1} <span>Tên loại phòng: {categories && categories[roomData.roomIndex]?.name}  </span></p>
                <ul>
                  {roomData.services.map((serviceId, serviceIndex) => (
                    <li key={serviceIndex}>
                      Dịch vụ {serviceIndex + 1}: {getServiceName(serviceId)} {/* Thay thế getServiceName với hàm lấy tên dịch vụ */}
                      <button onClick={() => handleRemoveService(roomIndex, serviceId)} className="text-red-500">Xóa</button>
                    </li>
                  ))}
                </ul>
                <button onClick={() => handleRemoveRoom(roomIndex)} className="text-red-500">Xóa phòng</button>
              </li>
            ))}
          </ul>
        </div>



        <Form.Item label="Tổng thanh toán" name="total_amount" className='ml-16  '>
          <InputNumber value={totalAmount} disabled className="text-black text-lg font-semibold" />
        </Form.Item>
        <Form.Item >
          <div className="flex justify-start items-center space-x-4">
            <Button type="primary" className="bg-blue-500 text-white" htmlType="submit">
              Add
            </Button>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddBooking;