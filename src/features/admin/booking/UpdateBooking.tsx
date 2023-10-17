import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Form, Input, InputNumber, DatePicker, Checkbox, Popconfirm, message, Select, Radio } from 'antd';
import { useGetCategory_homeQuery } from '@/api/webapp/category_home';
import { useGetService_hotelQuery } from '@/api/webapp/service_hotel';
import { useGetBooking_adminByIdQuery, useUpdateBooking_adminMutation } from '@/api/admin/booking_admin';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import 'dayjs/locale/vi';
import { BsTrash3 } from 'react-icons/bs';
import { useGetRoom_AdminsQuery } from '@/api/admin/room_admin';

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
    id_cate: number | string;
    services: number[] | string[];
  }[];
  id_room: string | number;
  promotion: number;
}

const UpdateBooking = () => {
  const { data: categories } = useGetCategory_homeQuery(); // Lấy danh sách loại phòng
  const { data: services } = useGetService_hotelQuery(); // Lấy danh sách dịch vụ
  const { data: roomsData } = useGetRoom_AdminsQuery({}) // Lấy danh sách phòng

  const navigate = useNavigate();
  const [updateBooking] = useUpdateBooking_adminMutation() // Thêm booking
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [selectedServices, setSelectedServices] = useState<number[]>([]);
  const [cartData, setCartData] = useState<FieldType['cart']>([]);
  const [form] = Form.useForm();
  const [selectedRoomsData, setSelectedRoomsData] = useState<{ id_cate: number; services: number[] }[]>([]);
  const [selectedRoomIndex, setSelectedRoomIndex] = useState<number | null>(null);
  const [isRoomsHidden, setIsRoomsHidden] = useState(false);
  const [isServicesHidden, setIsServicesHidden] = useState<boolean>(false);
  const { id } = useParams<{ id: string }>()
  const { data: bookingData } = useGetBooking_adminByIdQuery(id || "")
  const [roomCount, setRoomCount] = useState(0);
  const [maxRoomQuantity, setMaxRoomQuantity] = useState(0);
  const [availableRoomCounts, setAvailableRoomCounts] = useState<{ [key: number]: number }>({});
  const [listRoomSelected, setListRoomSelected] = useState<any[]>([])
  const [selectedRoom, setSelectedRoom] = useState<any[]>([])

  useEffect(() => {
    if (categories) {
      const initialAvailableRoomCounts: { [key: number]: number } = {};
      categories.forEach((category: Category) => {
        initialAvailableRoomCounts[category.id] = category.total_rooms;
      });
      setAvailableRoomCounts(initialAvailableRoomCounts);
    }
  }, [categories]);

  //Hàm tính tổng giá tiền
  const calculateTotalAmount = (cart: FieldType['cart']) => {
    let totalRoom = 0
    let totalService = 0

    // Lấy ngày check-in và ngày check-out từ form
    const checkInDate = form.getFieldValue('check_in');
    const checkOutDate = form.getFieldValue('check_out');


    // Tính tổng giá tiền của các loại phòng đã chọn
    if (checkInDate && checkOutDate) {
      const days = checkOutDate.diff(checkInDate, 'days');

      // Tính tổng giá tiền của các loại phòng đã chọn dựa trên số ngày thuê
      cart.forEach((roomData) => {
        const selectedCategory = categories?.find((category: any) => category?.id === roomData?.id_cate);

        if (selectedCategory) {
          totalRoom += selectedCategory?.price * days
        }

        // Tính tổng giá tiền của các dịch vụ đã chọn cho từng phòng
        roomData.services.forEach((serviceId) => {
          const selectedService = services?.find((service: any) => service.id === serviceId);
          if (selectedService) {
            totalService += selectedService?.price
          }
        });
      });
    }

    let total = totalRoom + totalService;
    // Cập nhật giá trị tổng thanh toán
    setTotalAmount(total);
  };

  //set giá trị phòng cũ vào form
  useEffect(() => {
    if (bookingData) {
      setMaxRoomQuantity(bookingData?.total_rooms || 0);
      setRoomCount(bookingData.cart?.length || 0);
      form.setFieldsValue({
        name: bookingData?.name,
        cccd: bookingData?.cccd,
        phone: bookingData?.phone,
        email: bookingData?.email,
        check_in: dayjs(bookingData?.check_in)?.tz('Asia/Ho_Chi_Minh'),
        check_out: dayjs(bookingData?.check_out)?.tz('Asia/Ho_Chi_Minh'),
        people_quantity: bookingData?.people_quantity,
        nationality: bookingData?.nationality,
        total_rooms: bookingData?.total_rooms,
        status: bookingData?.status,
      });

      // Lấy danh sách các phòng đã chọn từ bookingData và cập nhật vào selectedRoomsData
      const selectedRoomsFromBooking = bookingData?.cart || [];

      const updatedSelectedRoomsData = selectedRoomsFromBooking?.map((item: any) => {
        const id_cate = item?.id_cate;
        return {
          id_cate,
          services: item.services || [],
        };
      });
      setSelectedRoomsData(updatedSelectedRoomsData);
      setCartData(updatedSelectedRoomsData);
      calculateTotalAmount(updatedSelectedRoomsData);
    }
  }, [bookingData]);

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
        const updatedAvailableRoomCounts = { ...availableRoomCounts };
        updatedAvailableRoomCounts[selectedRoomIndex] -= 1;
        setAvailableRoomCounts(updatedAvailableRoomCounts);
        // Tìm xem phòng đã được thêm vào mảng selectedRoomsData chưa
        const roomIndex = selectedRoomsData?.findIndex((roomData) => roomData.id_cate === selectedRoomIndex);

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
          setSelectedRoomsData([...selectedRoomsData, { id_cate: selectedRoomIndex, services: selectedServices }]);
        }

        // Cập nhật giá trị cart trong form antd
        const updatedCart = [...cartData, { id_cate: selectedRoomIndex, services: selectedServices }];
        setCartData(updatedCart);
        form.setFieldsValue({ cart: updatedCart });
        calculateTotalAmount(updatedCart);

      }
    }
    setSelectedServices([]);
    setSelectedRoomIndex(null);
    setIsRoomsHidden(false);
    setIsServicesHidden(false);
  };
  // Hàm hiện dịch vụ khi click vào phòng
  const handleRoomClick = (roomIndex: number) => {
    setSelectedServices([]);
    const selectedCategory = categories?.find((category: any) => category.id === roomIndex); // Tìm loại phòng tương ứng với roomIndex
    if (availableRoomCounts[roomIndex] > 0) {
      const id_cate = selectedCategory.id;
      setSelectedRoomIndex(id_cate);
      if (selectedCategory) {
        setIsRoomsHidden(!isRoomsHidden);
        setIsServicesHidden(!isServicesHidden);
      }
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
  useEffect(() => {
    form.setFieldsValue({
      total_amount: totalAmount,
    });
  }, [totalAmount]);

  const [isSelectingServices, setIsSelectingServices] = useState(false);
  const [isSelectingRooms, setIsSelectingRooms] = useState(false);
  const [hiddenSelectingRooms, setHiddenSelectingRooms] = useState(false);
  const [hiddenSelectingServices, setHiddenSelectingServices] = useState(false);

  const handleSelectRooms = (roomIndex: any) => {
    setSelectedRoomIndex(roomIndex);
    console.log(selectedRoomIndex);
    setListRoomSelected(roomsData.filter((room: any) => room.id_cate === selectedRoomsData[roomIndex]?.id_cate))
    setIsSelectingRooms(!isSelectingRooms);
    setHiddenSelectingRooms(!hiddenSelectingRooms)
    setIsSelectingServices(false);
  }
  const handleSelectServices = (roomIndex: any) => {
    setSelectedRoomIndex(roomIndex);
    setIsSelectingServices(!isSelectingServices);
    const selectedServices = selectedRoomsData[roomIndex]?.services || [];
    setSelectedServices(selectedServices);
    setHiddenSelectingServices(!hiddenSelectingServices)
    setIsSelectingRooms(false);

  };
  const handleUpdateCart = () => {
    if (selectedRoomIndex !== null && selectedServices.length > 0) {
      // Tạo một bản sao mới của cartData để tránh thay đổi trực tiếp.
      const updatedCartData = [...cartData];
      const selectedRoomIdCate = selectedRoomsData[selectedRoomIndex]?.id_cate;
  
      // Tìm tất cả các mục có id_cate tương tự trong cartData
      const itemsToUpdate = updatedCartData.filter((item) => item.id_cate === selectedRoomIdCate);
      if (itemsToUpdate.length > 0) {
        // Nếu đã tồn tại, cập nhật dịch vụ của tất cả các mục có id_cate tương tự
        itemsToUpdate.forEach((item) => {
          item.services = selectedServices;
        });
      }
      setCartData(updatedCartData);
      form.setFieldsValue({ cart: updatedCartData });
      calculateTotalAmount(updatedCartData);
    }
  
    setIsSelectingServices(false);
    setHiddenSelectingServices(false);
  };
  
  




  const onFinish = (values: FieldType) => {

    const cart = selectedRoomsData.map((roomData) => ({
      id_cate: roomData.id_cate, // ID phòng đã chọn
      services: roomData.services, // Các dịch vụ đã chọn cho phòng
    }));

    const formattedValues = {
      ...values,
      id: id,
      check_in: values.check_in?.format('YYYY-MM-DD HH:mm:ss'),
      check_out: values.check_out?.format('YYYY-MM-DD HH:mm:ss'),
      cart: cart
    };
    console.log(formattedValues);

    updateBooking(formattedValues).unwrap().then(() => {
      message.success('Cập nhật thành công');
    });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
    message.error('Cập nhật thất bại');
  };


  return (
    <div className="mx-auto overflow-auto scroll-smooth">
      <h1 className='text-xl font-semibold pb-5'>Cập nhật Booking: <span className='font-bold text-blue-800 text-2xl'>{bookingData?.name}</span></h1>
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
          <div className="grid grid-cols-2 gap-8 ">
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
                  { required: true, message: 'Hãy nhập !' },
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

                ]}
              >
                <DatePicker
                  value={form.getFieldValue('check_in')}
                  onChange={handleCheckInDateChange}
                  format="YYYY-MM-DD HH:mm:ss"
                  placeholder="Chọn ngày và giờ"
                  className='w-[250px]'
                  disabledDate={(current) => {
                    // Vô hiệu hóa các ngày hôm trước
                    return current && current.isBefore(new Date(), 'day');
                  }}
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
                ]}
              >
                <DatePicker
                  value={form.getFieldValue('check_out')}
                  onChange={handleCheckOutDateChange}
                  format="YYYY-MM-DD HH:mm:ss"
                  placeholder="Chọn ngày và giờ"
                  className='w-[250px]'
                  disabledDate={(current) => {
                    // Vô hiệu hóa các ngày hôm trước
                    return current && current.isBefore(new Date(), 'day');
                  }}
                />
              </Form.Item>
              <Form.Item
                label="Số lượng người"
                name="people_quantity"
                labelCol={{ span: 24 }}
                rules={[
                  { required: true, message: 'Hãy nhập!' },
                  {
                    pattern: /^[1-9][0-9]*$/,
                    message: 'Phải nhập số nguyên dương',
                  },

                ]}
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
                          className={`px-3 py-2 rounded-md cursor-pointer border h-full
                          ${selectedRoomIndex === category?.id
                              ? 'bg-blue-500 text-white border border-black'
                              : category.total_rooms < 1
                                ? 'bg-red-500 text-white cursor-not-allowed'
                                : availableRoomCounts[category?.id] === 0
                                  ? 'bg-red-500 text-white cursor-not-allowed'
                                  : 'bg-[#15803d] '

                            }`}
                          onClick={() => {
                            if (category.total_rooms >= 1) {
                              handleRoomClick(category?.id);
                            }
                          }}
                        >
                          <h2 className="font-bold text-xl">{category?.name}</h2>
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
                      {services?.map((service: Service) => (
                        <div key={service.id} className="my-3 flex items-center text-md w-[600px]">
                          <Checkbox
                            className=''
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

                          <div className='ml-1'>
                            <span className='text-xl font-semibold text-blue-900 pl-2'>{service.name}</span>
                            <span className='font-semibold px-5 text-md'>Giá : {service?.price} vnđ</span>
                          </div>
                        </div>

                      ))}
                    </Form.Item>

                  )}
                  <div className='flex justify-center items-center'><Button className='border border-blue-500 rounded px-4 mt-2 w-full ' onClick={handleContinueClick}>Tiếp tục</Button></div>
                </div>
              </div>
              {/*Các loại phòng đã chon*/}
              <div className='p-3 rounded-md mt-3 ' style={{ boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }}>
                <div className='text-md col-span-2'><h1>Các loại phòng đã chọn</h1></div>
                <div className="grid grid-cols-2 gap-2">
                  {selectedRoomsData?.map((roomData, index) => {
                    const selectedCategory = categories?.find((category: any) => category?.id === roomData?.id_cate);

                    return (
                      <React.Fragment key={index}>
                        {((!hiddenSelectingServices || selectedRoomIndex === index) && (!hiddenSelectingRooms || selectedRoomIndex === index)) && (
                          <div
                            className={`px-3 py-2 rounded-md border h-full`}>
                            <h2 className="font-bold text-xl"> Phòng {index + 1}</h2>

                            <div className="flex justify-between items-center">
                              <h2 >
                                <span className='pr-2'>Loại phòng:</span><span className='font-semibold italic'>{selectedCategory?.name}</span></h2>
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
                            </div>
                            <p className=''>Tên phòng : { }</p>
                            <p className="text-md">Dịch vụ đã chọn: </p>
                            <ul>
                              {roomData.services.map((serviceId, serviceIndex) => (
                                <li key={serviceIndex}>
                                  Dịch vụ {serviceIndex + 1}: {getServiceName(serviceId)}
                                </li>
                              ))}
                            </ul>
                            <div className='flex justify-between item-center pt-4'>
                              <Button onClick={() => handleSelectRooms(index)}>Chọn phòng</Button>
                              <Button onClick={() => handleSelectServices(index)}>Chọn lại dịch vụ</Button>
                            </div>
                          </div>
                        )}
                      </React.Fragment>
                    );
                  })}
                </div>
                <div className="">
                  {isSelectingServices && selectedRoomIndex !== null && (
                    <Form.Item name={['cart', selectedRoomIndex, 'services']} className=''>
                      {services?.map((service: Service) => (
                        <div key={service.id} className="my-3 flex items-center text-md w-[600px]">
                          <Checkbox
                            className=''
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

                          <div className='ml-1'>
                            <span className='text-xl font-semibold text-blue-900 pl-2'>{service.name}</span>
                            <span className='font-semibold px-5 text-md'>Giá : {service?.price} vnđ</span>
                          </div>
                        </div>

                      ))}
                      <div className='ml-[210px] items-center'>
                        <Button className='border border-blue-500 rounded px-4 mt-2  ' onClick={handleUpdateCart}>
                          Cập nhật cart
                        </Button>
                      </div>
                    </Form.Item>
                  )}
                  {isSelectingRooms && selectedRoomIndex !== null && (
                    <Form.Item name="id_room" className=''>
                      <Radio.Group
                        optionType="button"
                        buttonStyle="solid"
                        onChange={(e) => {
                          const selectedRoomId = e.target.value;
                          if (selectedRoom.includes(selectedRoomId)) {
                            // If the room is already selected, remove it
                            setSelectedRoom(selectedRoom.filter(id => id !== selectedRoomId));
                          } else {
                            // If the room is not selected, add it to the selected services
                            setSelectedRoom([...selectedRoom, selectedRoomId]);
                          }
                        }}
                      >
                        {listRoomSelected?.map((room: any) => (
                          <div key={room.id} className="my-3 flex items-center text-md w-[600px]">
                            <Radio
                              value={room.id}
                              checked={selectedRoom.includes(room.id)}
                              className='mr-2'
                            >
                              Phòng {room.name}
                            </Radio>
                          </div>
                        ))}
                      </Radio.Group>
                      <div className='ml-[210px] items-center'>
                        <Button className='border border-blue-500 rounded px-4 mt-2  '>
                          Cập nhật phòng
                        </Button>
                      </div>
                    </Form.Item>
                  )}

                </div>
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
              <Button type="primary" className="bg-blue-500 text-white" htmlType="submit">
                Cập nhật
              </Button>
              <Button type="primary" danger onClick={() => navigate("/admin/bookingmanagement")}>
                Quay lại
              </Button>
            </div>
          </Form.Item></div>
      </Form>
    </div>
  );
};

export default UpdateBooking;