import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Form, Input, InputNumber, DatePicker, Checkbox, Select, Popconfirm, message } from 'antd';
import { useGetCategory_homeQuery } from '@/api/webapp/category_home';
import { useGetService_hotelQuery } from '@/api/webapp/service_hotel';
import { useAddBooking_adminMutation } from '@/api/admin/booking_admin';
import { AiOutlineDown, AiOutlineUp } from 'react-icons/ai';
import { BsTrash3 } from 'react-icons/bs';
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
  total_rooms_available: number;
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
    services: {
      id_service: number;
      quantity: number;
    }[];
  }[];
  id_promotions: number;
  message: string
}
interface RoomData {
  id_cate: number;
  services: {
    id_service: number;
    quantity: number;
  }[];
}

const AddBooking = () => {
  const { data: categories } = useGetCategory_homeQuery(); // Lấy danh sách loại phòng
  const { data: services } = useGetService_hotelQuery(); // Lấy danh sách dịch vụ
  const [addBooking] = useAddBooking_adminMutation(); // Thêm booking
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [selectedServices, setSelectedServices] = useState<number[]>([]);
  const [cartData, setCartData] = useState<FieldType['cart']>([]);
  const [form] = Form.useForm();
  const [selectedRoomsData, setSelectedRoomsData] = useState<RoomData[]>([]);
  const [roomCount, setRoomCount] = useState(0);
  const navigate = useNavigate();
  const [isServicesVisible, setIsServicesVisible] = useState<{ [key: number]: boolean }>({});
  const [selectedRoomIndex, setSelectedRoomIndex] = useState<number | null>(null);
  const [maxRoomQuantity, setMaxRoomQuantity] = useState(1);
  const [isRoomsHidden, setIsRoomsHidden] = useState(false);
  const [isServicesHidden, setIsServicesHidden] = useState<boolean>(false);
  const [availableRoomCounts, setAvailableRoomCounts] = useState<{ [key: number]: number }>({});
  const [selectedServicesQuantity, setSelectedServicesQuantity] = useState<{ [key: number]: number }>({});
  
  const handleCheckboxChange = (service: Service) => {
    if (selectedServices.includes(service.id)) {
      // If the service is already selected, deselect it
      setSelectedServices(selectedServices.filter((id) => id !== service.id));
      // Remove the quantity entry
      delete selectedServicesQuantity[service.id];
    } else {
      // If the service is not selected, select it
      setSelectedServices([...selectedServices, service.id]);
      // Set the initial quantity to 1 for the selected service
      selectedServicesQuantity[service.id] = 1;
      
    }
  };

  useEffect(() => {
    if (categories) {
      const initialAvailableRoomCounts: { [key: number]: number } = {};
      categories.forEach((category: Category) => {
        initialAvailableRoomCounts[category.id] = category.total_rooms_available;
      });
      setAvailableRoomCounts(initialAvailableRoomCounts);
    }
  }, [categories]);

  const handleContinueClick = () => {
    if (selectedRoomIndex !== null) {
      if (roomCount < maxRoomQuantity) {
        // Tăng số lượng phòng đã chọn lên 1
        setRoomCount(roomCount + 1);

        const updatedAvailableRoomCounts = { ...availableRoomCounts };
        updatedAvailableRoomCounts[selectedRoomIndex] -= 1;
        setAvailableRoomCounts(updatedAvailableRoomCounts);
        // Tìm xem phòng đã được thêm vào mảng selectedRoomsData chưa
        const roomIndex = selectedRoomsData?.findIndex((roomData) => roomData.id_cate === selectedRoomIndex);

        if (roomIndex !== -1) {
          // Phòng đã có trong mảng, tạo một bản sao của nó và cập nhật dịch vụ cho phòng mới
          const updatedSelectedRoomsData = [...selectedRoomsData];
          const newRoom = { ...updatedSelectedRoomsData[roomIndex] };
          newRoom.services = selectedServices.map((serviceId) => ({ id_service: serviceId, quantity: selectedServicesQuantity[serviceId] }));

          // Thêm phòng mới cùng loại vào mảng
          updatedSelectedRoomsData.push(newRoom);
          setSelectedRoomsData(updatedSelectedRoomsData);
        } else {
          // Phòng chưa có trong mảng, thêm nó vào
          setSelectedRoomsData([...selectedRoomsData, { id_cate: selectedRoomIndex, services: selectedServices.map((serviceId) => ({ id_service: serviceId, quantity: selectedServicesQuantity[serviceId] })) }]);
        }

        // Cập nhật giá trị cart trong form antd
        const updatedCart = [...cartData, { id_cate: selectedRoomIndex, services: selectedServices.map((serviceId) => ({ id_service: serviceId, quantity: selectedServicesQuantity[serviceId] })) }];
        setCartData(updatedCart);
        form.setFieldsValue({ cart: updatedCart });
        calculateTotalAmount(updatedCart);

      }
    }
    setSelectedServices([]);
    setSelectedRoomIndex(null);
    setIsRoomsHidden(false);
    setIsServicesHidden(false);
    setSelectedServicesQuantity({});
  };
  // Hàm để ẩn/hiện dịch vụ cho phòng đã chọn
  const toggleServicesVisibility = (roomIndex: number) => {
    setIsServicesVisible((prevIsServicesVisible) => ({
      ...prevIsServicesVisible,
      [roomIndex]: !prevIsServicesVisible[roomIndex],
    }));
  };
  const handleRoomClick = (roomIndex: number) => {
    const selectedCategory = categories?.find((category: any) => category.id === roomIndex); // Tìm loại phòng tương ứng với roomIndex
    if (selectedCategory && availableRoomCounts[roomIndex] > 0) {
      const id_cate = selectedCategory.id;
      setSelectedRoomIndex(id_cate);
      setIsRoomsHidden(!isRoomsHidden);
      setIsServicesHidden(!isServicesHidden);
    }
  };

  const handleEnterPress = (value: number | undefined) => {
    // Xử lý giá trị khi có sự thay đổi trong InputNumber
    if (typeof value === 'number') {
      setMaxRoomQuantity(value); // Cập nhật maxRoomQuantity khi có thay đổi
    }
  };
  const getServiceName = (serviceId: any) => {
    // Điều này chỉ là một ví dụ đơn giản, bạn cần thay thế bằng cách lấy tên dịch vụ từ dữ liệu thực tế của bạn.
    const serviceData = services?.find((service: any) => service.id === serviceId);
    return serviceData ? serviceData.name : 'Dịch vụ không tồn tại';
  };

  const handleRemoveRoom = (roomIndex: number) => {
    // Cập nhật lại mảng selectedRoomsData
    const updatedSelectedRoomsData = [...selectedRoomsData];
    // Xóa phòng đã chọn khỏi mảng
    updatedSelectedRoomsData.splice(roomIndex, 1);
    // Cập nhật lại mảng selectedRoomsData
    setSelectedRoomsData(updatedSelectedRoomsData);
    const selectedCategory = categories?.find((category: any) => category.id === selectedRoomIndex);
    if (selectedCategory && selectedRoomIndex !== null) {
      const updatedAvailableRoomCounts = { ...availableRoomCounts };
      updatedAvailableRoomCounts[selectedRoomIndex] += 1;
      setAvailableRoomCounts(updatedAvailableRoomCounts);
    }
    // Giảm số lượng phòng đã chọn đi 1
    setRoomCount(roomCount - 1);
    // Cập nhật lại tổng giá
    calculateTotalAmount(updatedSelectedRoomsData);
  };

  const handleCancelRemoveRoom = (e: React.MouseEvent<HTMLElement>) => {
    console.log(e);
    message.error('Click on No');
  };
  const handleCheckInDateChange = (selectedDate: dayjs.Dayjs | null) => {
    form.setFieldsValue({ check_in: selectedDate });
  };

  const handleCheckOutDateChange = (selectedDate: dayjs.Dayjs | null) => {
    form.setFieldsValue({ check_out: selectedDate });
  };

  const calculateTotalAmount = (cart: FieldType['cart']) => {
    let totalRoom = 0;
    let totalService = 0;

    // Lấy ngày check-in và ngày check-out từ form
    const checkInDate = form.getFieldValue('check_in');
    const checkOutDate = form.getFieldValue('check_out');

    if (checkInDate && checkOutDate) {
      const days = checkOutDate.diff(checkInDate, 'days');

      // Tính tổng giá tiền của các loại phòng đã chọn dựa trên số ngày thuê
      cart.forEach((roomData) => {
        const selectedCategory = categories?.find((category: any) => category?.id === roomData?.id_cate);
        console.log(selectedCategory);

        if (selectedCategory) {
          console.log(selectedCategory);
          totalRoom += selectedCategory?.price * days
        }

        // Tính tổng giá tiền của các dịch vụ đã chọn cho từng phòng
        roomData.services.forEach((serviceId) => {
          const selectedService = services?.find((service: any) => service.id === serviceId.id_service);
          const quantity = serviceId.quantity;
          if (selectedService) {
            totalService += (selectedService?.price * quantity)
          }
        });
      });
    }

    let total = totalRoom + totalService;

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
      id_cate: roomData.id_cate, // ID phòng đã chọn
      services: roomData.services, // Các dịch vụ đã chọn cho phòng
    }));

    // Cập nhật giá trị cart trong values
    const formattedValues = {
      ...values,
      check_in: values.check_in?.format('YYYY-MM-DD HH:mm:ss'),
      check_out: values.check_out?.format('YYYY-MM-DD HH:mm:ss'),
      cart: cart,
      promotion: 1,
      message: "Add booking nhé"
    };

    console.log(formattedValues)
    addBooking(formattedValues).unwrap().then(() => {
      message.success('Thêm thành công');
      navigate('/admin/bookingmanagement');
    });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
    message.error('Thêm thất bại');
  };

  return (

    <div className="mx-auto overflow-auto scroll-smooth">
      <h1 className='text-xl font-semibold pb-5'>Thêm Booking mới </h1>
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
          <div className="grid grid-cols-2 gap-8">
            <div className='grid grid-cols-2 h-screen'>
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
                  { required: true, message: 'Hãy nhập!' },
                  { whitespace: true, message: 'Không được để trống!' },
                  {
                    pattern: /^[0-9]*$/,
                    message: 'Căn cước không có chữ',
                  },
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
                  {
                    pattern: /^[0-9]*$/,
                    message: 'Chỉ được nhập số ',
                  },
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
                  {
                    type: 'email',
                    message: 'Email không hợp lệ!',
                  },
                ]}

                labelCol={{ span: 24 }}
              >
                <Input allowClear className='w-[250px]' />
              </Form.Item>
              <Form.Item

                label="Check in"
                name="check_in"
                labelCol={{ span: 24 }}
                rules={[
                  {
                    required: true,
                    message: 'Hãy chọn ngày check in!',
                  },
                  {
                    validator: (_, value) => {
                      if (dayjs(value).isBefore(dayjs(), 'day')) {
                        return Promise.reject('Không được chọn ngày trong quá khứ!');
                      }
                      return Promise.resolve();
                    },
                  },
                ]}
              >
                <DatePicker
                  value={form.getFieldValue('check_in')}
                  placeholder="Chọn ngày và giờ"
                  onChange={handleCheckInDateChange}
                  format="YYYY-MM-DD HH:mm"
                  className='w-[250px]'
                />
              </Form.Item>
              <Form.Item
                label="Check out"
                name="check_out"
                labelCol={{ span: 24 }}
                rules={[
                  {
                    required: true,
                    message: 'Hãy chọn ngày check out!',
                  },
                  {
                    validator: (_, value) => {
                      if (dayjs(value).isBefore(dayjs(), 'day')) {
                        return Promise.reject('Không được chọn ngày trong quá khứ!');
                      }
                      return Promise.resolve();
                    },
                  },
                ]}
              >
                <DatePicker
                  value={form.getFieldValue('check_out')}
                  onChange={handleCheckOutDateChange}
                  format="YYYY-MM-DD HH:mm"
                  placeholder="Chọn ngày và giờ"
                  className='w-[250px]'
                />
              </Form.Item>
              <Form.Item
                label="Số lượng người"
                name="people_quantity"
                rules={[
                  { required: true, message: 'Hãy nhập!' },
                  { whitespace: true, message: 'Không được để trống!' },
                  {
                    pattern: /^[1-9][0-9]*$/,
                    message: 'Phải nhập số nguyên dương',
                  },

                ]}
                labelCol={{ span: 24 }}

              >
                <Input className='w-[250px]' />
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
                initialValue={1}
                rules={[
                  { required: true, message: 'Hãy nhập!' },
                  {
                    pattern: /^[1-9][0-9]*$/,
                    message: 'Phải nhập số nguyên dương',
                  },]}
                labelCol={{ span: 24 }}
              >
                <InputNumber className='w-[250px]'

                  onChange={(value: any) => {
                    handleEnterPress(value);
                  }}
                />
              </Form.Item>
              <Form.Item
                label="Trạng thái"
                name="status"
                labelCol={{ span: 24 }}
              >
                <Select className='w-[250px]'>
                  <Select.Option value="1" >Không hiển thi</Select.Option>
                  <Select.Option value="2">Hiển thị</Select.Option>
                </Select>
              </Form.Item>
            </div>
            <div className='choose-room w-full '>
              <div className='p-3 rounded-md ' style={{ boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }}>
                <div className='text-md col-span-2'><h1>Phòng {roomCount} / {maxRoomQuantity}</h1></div>
                <div className="grid grid-cols-2 gap-2">
                  {categories?.map((category: Category, index: number) => (
                    <React.Fragment key={index}>
                      {(!isRoomsHidden && !isServicesHidden || (isRoomsHidden && selectedRoomIndex === category?.id)) && (
                        <div
                          className={`px-3 py-2 rounded-md  border h-[130px]
                           ${selectedRoomIndex === category?.id
                              ? 'bg-blue-500 text-white border border-black cursor-pointer'
                              : category.total_rooms_available < 1
                                ? 'hidden'
                                : availableRoomCounts[category?.id] === 0
                                  ? 'bg-red-500 text-white cursor-not-allowed'
                                  : 'bg-[#15803d] cursor-pointer '
                            }`}
                          onClick={() => {
                            if (category.total_rooms_available >= 1) {
                              handleRoomClick(category?.id);
                            }
                          }}
                        >
                          <h2 className="font-bold text-xl ">{category?.name}</h2>
                          <p className='text-md'>Còn: <span className='font-bold'>{availableRoomCounts[category?.id]}</span> phòng</p>
                          <p className='text-md'>Sức chứa: <span className='font-bold'>{category?.quantity_of_people}</span> người</p>
                          <p className='text-md'>Giá: <span className='font-bold'>{category?.price}</span> <span>vnđ</span></p>
                        </div>
                      )}
                    </React.Fragment>
                  ))}

                </div>

                <div className="">
                  {isServicesHidden && selectedRoomIndex !== null && (
                    <Form.Item name={['cart', selectedRoomIndex, 'services']} className=''>
                      {services?.map((service: Service,) => (
                        <div key={service.id} className="my-3 flex items-center text-md w-[600px]">
                          <Checkbox
                            className=""
                            value={service.id}
                            checked={selectedServices.includes(service.id)}
                            onChange={() => handleCheckboxChange(service)}
                          />

                          <div className='ml-1'>
                            <span className='text-xl font-semibold text-blue-900 pl-2'>{service.name}</span>
                            <span className='font-semibold px-5 text-md'>Giá : {service?.price} vnđ</span>
                            {selectedServices.includes(service.id) && (
                              <div className='ml-2'>
                                <Button
                                  onClick={() => {
                                    if (selectedServicesQuantity[service.id] && selectedServicesQuantity[service.id] > 1) {
                                      setSelectedServicesQuantity((prev) => ({
                                        ...prev,
                                        [service.id]: prev[service.id] - 1,
                                      }));
                                    }
                                  }}
                                >
                                  -
                                </Button>
                                <span className='mx-2'>{selectedServicesQuantity[service.id]}</span>
                                <Button
                                  onClick={() => {
                                    setSelectedServicesQuantity((prev) => ({
                                      ...prev,
                                      [service.id]: (prev[service.id] || 0) + 1,
                                    }));
                                  }}
                                >
                                  +
                                </Button>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </Form.Item>

                  )}
                  <div className='flex justify-center items-center'><Button className='border border-blue-500 rounded px-4 mt-2 ' onClick={handleContinueClick}>Tiếp tục</Button></div>
                </div>
              </div>
              <div className='my-3 px-2'>
                <h2 className='font-bold'>Các phòng đã chọn:</h2>
                <ul className="">
                  {selectedRoomsData.map((roomData, index) => {
                    const selectedCategory = categories?.find((category: any) => category?.id === roomData?.id_cate);
                    return (
                      <li key={index} className="p-3 rounded-md border border-gray-300 mb-2">
                        <div className='flex justify-between items-center'>
                          <div>
                            <p className='font-bold text-lg'>Phòng {index + 1}</p>
                            <p>Tên loại phòng: {selectedCategory?.name}</p>
                          </div>
                          <button
                            type='button'
                            onClick={() => toggleServicesVisibility(index)}
                            className="mb-2 flex items-center text-blue-500"
                          >
                            {isServicesVisible[index] ? <span className='flex items-center'>Ẩn dịch vụ <AiOutlineUp /></span> : <span className='flex items-center'>Hiện dịch vụ <AiOutlineDown /></span>}
                          </button>
                        </div>

                        {isServicesVisible[index] && (
                          <ul>
                            {roomData.services.map((serviceId, serviceIndex) => (
                              <li key={serviceIndex}>
                                Dịch vụ {serviceIndex + 1}: {getServiceName(serviceId.id_service)} x{serviceId.quantity}
                              </li>
                            ))}
                          </ul>
                        )}
                        <Popconfirm
                          title="Xoá phòng ?"
                          description="Bạn có chắc muốn xoá phòng này không ?"
                          onConfirm={() => handleRemoveRoom(index)}
                          onCancel={() => handleCancelRemoveRoom}
                          okText={<span className='text-blue-900 font-semibold hover:text-white'>Yes</span>}
                          cancelText="No"
                        >
                          <div className='flex justify-end'>
                            <Button className="bg-red-300 flex justify-center items-center" type='primary' danger shape='circle'><BsTrash3 /></Button>
                          </div>
                        </Popconfirm>
                      </li>
                    );
                  })}
                </ul>
              </div>


            </div>
          </div>
        </div>
        <div>
          <Form.Item label="Tổng thanh toán" name="total_amount" className='ml-16  '>
            <InputNumber value={totalAmount} disabled className="text-black text-lg font-semibold" />
          </Form.Item>
          <Form.Item >
            <div className="flex justify-start items-center space-x-4">
              <Button type="primary" className="bg-blue-500 text-white" htmlType="submit" >
                Add
              </Button>
              <Button type="primary" danger onClick={() => navigate("/admin/bookingmanagement")}>
                Quay lại
              </Button>
            </div>
          </Form.Item>
        </div>
      </Form>
    </div>
  );
};

export default AddBooking;