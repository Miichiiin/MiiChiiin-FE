import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Form, Input, InputNumber, DatePicker, Checkbox } from 'antd';
import { useGetCategory_homeQuery } from '@/api/webapp/category_home';
import { useGetService_hotelQuery } from '@/api/webapp/service_hotel';
import { useAddBooking_adminMutation } from '@/api/admin/booking_admin';
import Modal from 'react-modal';
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
  const [roomCount, setRoomCount] = useState(0);
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);
  const toggleModal = () => {
    setShowModal(!showModal);
  };


  const [isServicesVisible, setIsServicesVisible] = useState<{ [key: number]: boolean }>({});
  const [selectedRoomIndex, setSelectedRoomIndex] = useState<number | null>(null);
  const [maxRoomQuantity, setMaxRoomQuantity] = useState(0);

  const handleContinueClick = () => {
    if (selectedRoomIndex !== null) {
      if (roomCount < maxRoomQuantity) {
        // Tăng số lượng phòng đã chọn lên 1
        setRoomCount(roomCount + 1);

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
          calculateTotalAmount();
        } else {
          // Phòng chưa có trong mảng, thêm nó vào
          setSelectedRoomsData([...selectedRoomsData, { roomIndex: selectedRoomIndex, services: selectedServices }]);
        }

        // Cập nhật giá trị cart trong form antd
        const updatedCart = [...cartData, { id_cate: selectedRoomIndex, services: selectedServices }];
        setCartData(updatedCart);
        form.setFieldsValue({ cart: updatedCart });
        calculateTotalAmount();
      }
    }
    setSelectedServices([]);
    setSelectedRoomIndex(null);
    setIsRoomsHidden(false);
  };
  // Hàm để thêm hoặc xóa dịch vụ cho một phòng
  
  // Hàm để ẩn/hiện dịch vụ cho phòng đã chọn
  const toggleServicesVisibility = (roomIndex: number) => {
    setIsServicesVisible((prevIsServicesVisible) => ({
      ...prevIsServicesVisible,
      [roomIndex]: !prevIsServicesVisible[roomIndex],
    }));
  };

  const [isRoomsHidden, setIsRoomsHidden] = useState(false);
  const handleRoomClick = (roomIndex: number) => {
    setSelectedRoomIndex(roomIndex);
    setIsRoomsHidden(!isRoomsHidden);
  };

  const handleEnterPress = (value: number | undefined) => {
    // Xử lý giá trị khi có sự thay đổi trong InputNumber
    if (typeof value === 'number') {
      setMaxRoomQuantity(value); // Cập nhật maxRoomQuantity khi có thay đổi
    }
  };
  const getServiceName = (serviceId: any) => {
    // Điều này chỉ là một ví dụ đơn giản, bạn cần thay thế bằng cách lấy tên dịch vụ từ dữ liệu thực tế của bạn.
    const serviceData = services.find((service: any) => service.id === serviceId);
    return serviceData ? serviceData.name : 'Dịch vụ không tồn tại';
  };
  // Hàm để xóa một dịch vụ khỏi phòng đã chọn
  const handleRemoveService = (roomIndex: any, serviceId: any) => {
    const confirm = window.confirm("Chắc chưa?")
    const roomData = selectedRoomsData[roomIndex];
    // Remove the service from the room's services
    if(confirm){
      roomData.services = roomData.services.filter((id) => id !== serviceId);

      // If the room has no services left, remove the entire room
      if (roomData.services.length === 0) {
        handleRemoveRoom(roomIndex);
      } else {
        // Update the selectedRoomsData
        const updatedSelectedRoomsData = [...selectedRoomsData];
        updatedSelectedRoomsData[roomIndex] = roomData;
        setSelectedRoomsData(updatedSelectedRoomsData);
  
        // Recalculate the total amount
        calculateTotalAmount();
      }
    }
    
  };
  const handleRemoveRoom = (roomIndex: any) => {
    const confirm = window.confirm("Chắc chưa?")
    // Remove the room from selectedRoomsData
    if(confirm){
      const updatedSelectedRoomsData = selectedRoomsData.filter((_, index) => index !== roomIndex);
      setSelectedRoomsData(updatedSelectedRoomsData);
  
      // Decrement roomCount
      setRoomCount((prevRoomCount) => prevRoomCount - 1);
  
      // Recalculate the total amount
      calculateTotalAmount();
    }
    
  };

  const calculateTotalAmount = () => {
    let total = 0;

    // Tính tổng giá tiền của các loại phòng đã chọn
    selectedRoomsData.forEach((roomData) => {
      const selectedCategory = categories[roomData.roomIndex];
      if (selectedCategory) {
        total += selectedCategory?.price;
      }

      // Tính tổng giá tiền của các dịch vụ đã chọn cho từng phòng
      roomData.services.forEach((serviceId) => {
        const selectedService = services.find((service: any) => service.id === serviceId);
        if (selectedService) {
          total += selectedService?.price;
        }
      });
    });

    // Cập nhật giá trị tổng thanh toán
    setTotalAmount(total);
  };

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
    addBooking(values).unwrap().then(() => {
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
        style={{ maxWidth: 1200 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        form={form}
      >

        <div className=''>
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
              <Input allowClear className='w-[250px]' />
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
              <Input allowClear className='w-[250px]' />
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
              <DatePicker
                // showTime
                // format="YYYY-MM-DD HH:mm:ss"
                // placeholder="Chọn ngày và giờ"
                className='w-[250px]'
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
                className='w-[250px]'
              />
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
            <Form.Item
              label="Số lượng phòng"
              name="total_rooms"
              rules={[{ required: true, message: 'Hãy nhập !' }]}
              labelCol={{ span: 24 }}
            >
              <InputNumber className='w-[250px]'

                onChange={(value: any) => {
                  handleEnterPress(value);
                }}
              />
            </Form.Item>
          </div>
          <Button danger type='primary' onClick={toggleModal} className='my-5'>Chọn phòng</Button>
          <Modal
            isOpen={showModal}
            onRequestClose={toggleModal}
            contentLabel="Additional Images"
            className="modal mx-auto animate-fade-in w-[1080px] max-h-screen overflow-y-auto bg-white border p-2">

            <div className='p-3 rounded-md grid grid-cols-2 gap-4' style={{ boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }}>
              <div className='text-md col-span-2'><h1>Phòng {roomCount} / {maxRoomQuantity}</h1></div>
              <div className="grid grid-cols-2 gap-4">
              {categories?.map((category: Category, index: number) => (
                  <React.Fragment key={category?.id}>
                    {(!isRoomsHidden || (isRoomsHidden && selectedRoomIndex === index)) && (
                      <div
                        className={`p-4 rounded-md cursor-pointer border h-[200px] ${selectedRoomIndex === index
                          ? 'bg-blue-500 text-white border border-black'
                          : category.total_rooms < 1
                            ? 'bg-red-500 text-white cursor-not-allowed'
                            : 'bg-[#15803d] '
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
                      </div>
                    )}
                  </React.Fragment>
                ))}

              </div>

              <div className="ml-5">
                {selectedRoomIndex !== null && (
                  <Form.Item name={['cart', selectedRoomIndex, 'services']} className='flex items-center'>
                    {services?.map((service: Service) => (
                      <div key={service.id} className="my-3">
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
                        <div className='flex items-center'>
                          <img src={service.image} alt={service.name} className="w-[100px] h-[100px]" />
                          <span className="ml-2">{service.name} </span> <span className='font-semibold'>{service?.price}</span></div>
                      </div>
                    ))}
                  </Form.Item>

                )}
                <div className='flex justify-center items-center'><Button className='border border-blue-500 rounded px-4 ' onClick={handleContinueClick}>Tiếp tục</Button></div>
              </div>

            </div>
            <div className='my-3 px-2'>
              <h2 className='font-bold '>Các phòng đã chọn:</h2>
              <ul className="grid grid-cols-2 gap-4">
                {selectedRoomsData.map((roomData, roomIndex) => (
                  <li key={roomIndex} className="p-3 rounded-md border border-gray-300">
                    <div className=''>
                      <p className='font-bold text-lg'>Phòng {roomIndex + 1}</p>
                      <p>Tên loại phòng: {categories && categories[roomData.roomIndex]?.name}
                      </p>
                      <button type='button' onClick={() => toggleServicesVisibility(roomIndex)} className="mb-2 text-blue-500">
                        {isServicesVisible[roomIndex] ? 'Ẩn dịch vụ' : 'Hiện dịch vụ'}
                      </button>
                    </div>

                    {isServicesVisible[roomIndex] && (
                      <ul>
                        {roomData.services.map((serviceId, serviceIndex) => (
                          <li key={serviceIndex}>
                            Dịch vụ {serviceIndex + 1}: {getServiceName(serviceId)}
                            <button
                              onClick={() => handleRemoveService(roomIndex, serviceId)}
                              className={`ml-2 text-red-500`}
                              type='button'
                            >
                              Xóa
                            </button>
                          </li>
                        ))}
                      </ul>
                    )}
                    <button onClick={() => handleRemoveRoom(roomIndex)} className="text-red-500">Xóa phòng</button>
                  </li>
                ))}
              </ul>
            </div>
          </Modal>



        </div>



        <Form.Item label="Tổng thanh toán" name="total_amount" className='ml-16  '>
          <InputNumber value={totalAmount} disabled className="text-black text-lg font-semibold" />
        </Form.Item>
        <Form.Item >
          <div className="flex justify-start items-center space-x-4">
            <Button type="primary" className="bg-blue-500 text-white" htmlType="submit">
              Add
            </Button>
            <Button type="primary" danger onClick={() => navigate("/admin/bookingmanagement")}>
              Quay lại
            </Button>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddBooking;