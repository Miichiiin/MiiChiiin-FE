import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Form, Input, InputNumber, DatePicker, Checkbox } from 'antd';
import { useGetCategory_homeQuery } from '@/api/webapp/category_home';
import { useGetService_hotelQuery } from '@/api/webapp/service_hotel';
import { useGetBooking_adminByIdQuery, useUpdateBooking_adminMutation } from '@/api/admin/booking_admin';
import Modal from 'react-modal';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import 'dayjs/locale/vi';

dayjs.extend(utc);
dayjs.extend(timezone);


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
  cart: {
    id_cate: number;
    services: number[];
  }[];
  promotion: number;
}

const UpdateBooking = () => {
  const { data: categories } = useGetCategory_homeQuery(); // Lấy danh sách loại phòng
  const { data: services } = useGetService_hotelQuery({}); // Lấy danh sách dịch vụ
  const navigate = useNavigate();
  const [updateBooking] = useUpdateBooking_adminMutation() // Thêm booking
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [selectedServices, setSelectedServices] = useState<number[]>([]);
  const [cartData, setCartData] = useState<FieldType['cart']>([]);
  const [form] = Form.useForm();
  const [selectedRoomsData, setSelectedRoomsData] = useState<{ roomIndex: number; services: number[] }[]>([]);
  const [selectedRoomIndex, setSelectedRoomIndex] = useState<number | null>(null);
  const [isRoomsHidden, setIsRoomsHidden] = useState(false);
  const [isServicesVisible, setIsServicesVisible] = useState<{ [key: number]: boolean }>({});
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };
  const calculateTotalAmount = () => {
    let total = 0
    // Tính tổng số tiền cho các phòng đã chọn
    selectedRoomsData.forEach((roomData) => {
      const roomCategory = categories && categories[roomData.roomIndex]
      if (roomCategory) {
        total += roomCategory.price;
      }
    });

    // Tính tổng số tiền cho các dịch vụ đã chọn
    selectedServices.forEach((serviceId) => {
      const service = services && services.find((service: any) => service.id === serviceId);
      if (service) {
        total += service.price;
      }
    });
    setTotalAmount(total);
  };


  const handleCheckInDateChange = (selectedDate: dayjs.Dayjs | null) => {
    form.setFieldsValue({ check_in: selectedDate });
  };

  const handleCheckOutDateChange = (selectedDate: dayjs.Dayjs | null) => {
    form.setFieldsValue({ check_out: selectedDate });
  };
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

  // Hàm hiện dịch vụ khi click vào phòng

  const handleRoomClick = (roomIndex: number) => {


    setSelectedRoomIndex(roomIndex);
    setIsRoomsHidden(!isRoomsHidden);
    calculateTotalAmount();
  };

  const handleEnterPress = (value: number | undefined) => {
    // Xử lý giá trị khi có sự thay đổi trong InputNumber
    if (typeof value === 'number') {
      setMaxRoomQuantity(value); // Cập nhật maxRoomQuantity khi có thay đổi
    }
  };
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
  // Hàm để xóa một dịch vụ khỏi phòng đã chọn
  const handleRemoveService = (roomIndex: any, serviceId: any) => {
    const roomData = selectedRoomsData[roomIndex];
    // Remove the service from the room's services
    roomData.services = roomData.services.filter((id) => id !== serviceId);


    // Update the selectedRoomsData
    const updatedSelectedRoomsData = [...selectedRoomsData];
    updatedSelectedRoomsData[roomIndex] = roomData;
    setSelectedRoomsData(updatedSelectedRoomsData);

    // Recalculate the total amount
    calculateTotalAmount();
  };
  const handleRemoveRoom = (roomIndex: any) => {
    // Remove the room from selectedRoomsData
    const updatedSelectedRoomsData = selectedRoomsData.filter((_, index) => index !== roomIndex);
    setSelectedRoomsData(updatedSelectedRoomsData);

    // Decrement roomCount
    setRoomCount((prevRoomCount) => prevRoomCount - 1);

    // Recalculate the total amount
    calculateTotalAmount();
  };

  const onFinish = (values: FieldType) => {

    const cart = selectedRoomsData.map((roomData) => ({
      id_cate: roomData.roomIndex + 1, // ID phòng đã chọn
      services: roomData.services, // Các dịch vụ đã chọn cho phòng
    }));

    const formattedValues = {
      ...values,
      id: id,
      check_in: values.check_in?.format('YYYY-MM-DD HH:mm:ss'),
      check_out: values.check_out?.format('YYYY-MM-DD HH:mm:ss'),
      cart: cart
    };


    console.log("Update Values", formattedValues)
    updateBooking(formattedValues).unwrap().then(() => {
      navigate(`/admin/detailbooking/${id}`);
    });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const { id } = useParams<{ id: string }>()
  const { data: bookingData } = useGetBooking_adminByIdQuery(id || "")
  const [roomCount, setRoomCount] = useState(0);
  const [maxRoomQuantity, setMaxRoomQuantity] = useState(0);


  useEffect(() => {
    if (bookingData) {
      setMaxRoomQuantity(bookingData.total_rooms || 0);
      setRoomCount(bookingData.cart?.length || 0);
      form.setFieldsValue({
        name: bookingData.name,
        cccd: bookingData.cccd,
        phone: bookingData.phone,
        email: bookingData.email,
        check_in: dayjs(bookingData.check_in).tz('Asia/Ho_Chi_Minh'),
        check_out: dayjs(bookingData.check_out).tz('Asia/Ho_Chi_Minh'),
        people_quantity: bookingData.people_quantity,
        nationality: bookingData.nationality,
        total_amount: bookingData?.total_amount,
        total_rooms: bookingData.total_rooms,
      });
      // Lấy danh sách các phòng đã chọn từ bookingData và cập nhật vào selectedRoomsData
      const selectedRoomsFromBooking = bookingData.cart || [];
      const updatedSelectedRoomsData = selectedRoomsFromBooking.map((item: any) => {
        const roomIndex = categories?.findIndex((category: any) => category.id === item.id_cate);
        return {
          roomIndex,
          services: item.services || [],
        };
      });
      setSelectedRoomsData(updatedSelectedRoomsData);
    }
  }, [bookingData]);
  useEffect(() => {
    form.setFieldsValue({
      total_amount: totalAmount,
    });
  }, [totalAmount]);

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
                value={form.getFieldValue('check_in')}
                onChange={handleCheckInDateChange}
                showTime
                format="YYYY-MM-DD HH:mm:ss"
                placeholder="Chọn ngày và giờ"
                className='w-[250px]'
              />
            </Form.Item>
            <Form.Item
              label="Check out"
              name="check_out"
              labelCol={{ span: 24 }}
            >
              <DatePicker
                value={form.getFieldValue('check_out')}
                onChange={handleCheckOutDateChange}
                showTime
                format="YYYY-MM-DD HH:mm:ss"
                placeholder="Chọn ngày và giờ"
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
            className="modal mx-auto mt-[100px] animate-fade-in w-[1080px] overflow-scroll h-[800px] bg-white ">

            <div className='p-3 rounded-md  grid grid-cols-2 gap-4' style={{ boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }}>
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
        {/* Danh sách phòng và dịch vụ đã đặt */}


        <Form.Item label="Tổng thanh toán" name="total_amount" className='ml-16  '>
          <InputNumber value={totalAmount} disabled className="text-black text-lg font-semibold" />
        </Form.Item>
        <Form.Item >
          <div className="flex justify-start items-center space-x-4">
            <Button type="primary" className="bg-blue-500 text-white" htmlType="submit">
              Cập nhật
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

export default UpdateBooking;