import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Form, Input, InputNumber, DatePicker, Checkbox, Popconfirm, message, Select, Radio, Skeleton } from 'antd';
import { useGetService_adminQuery } from '@/api/admin/service_admin';
import { useGetBooking_adminByIdQuery, useUpdateBooking_adminMutation } from '@/api/admin/booking_admin';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import 'dayjs/locale/vi';
import { BsTrash3 } from 'react-icons/bs';
import { useGetRoom_AdminsQuery } from '@/api/admin/room_admin';
import { useGetCategory_BookingQuery } from '@/api/admin/category_booking';
import { ArrowLeftOutlined } from '@ant-design/icons';


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
    id_room?: number;
    id_cate: number;
    services: {
      id_service: number;
      quantity: number;
    }[];
  }[];
  id_promotions: number;
  flag: boolean;
}
interface RoomData {
  id_room?: number;
  id_cate: number;
  services: {
    id_service: number;
    quantity: number;
  }[];
}

const UpdateBooking = () => {
  const { data: categories } = useGetCategory_BookingQuery() // Lấy danh sách loại phòng
  const { data: services } = useGetService_adminQuery() // Lấy danh sách dịch vụ
  const { data: roomsData } = useGetRoom_AdminsQuery({}) // Lấy danh sách phòng

  const navigate = useNavigate();
  const [updateBooking] = useUpdateBooking_adminMutation() // Thêm booking
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [selectedServices, setSelectedServices] = useState<number[]>([]);
  const [cartData, setCartData] = useState<FieldType['cart']>([]);
  const [form] = Form.useForm();
  const [selectedRoomsData, setSelectedRoomsData] = useState<RoomData[]>([]);
  const [selectedRoomIndex, setSelectedRoomIndex] = useState<number | null>(null);
  const [isRoomsHidden, setIsRoomsHidden] = useState(false);
  const [isServicesHidden, setIsServicesHidden] = useState<boolean>(false);
  const { id } = useParams<{ id: string }>()
  const { data: bookingData, isLoading, isError } = useGetBooking_adminByIdQuery(id)

  const [roomCount, setRoomCount] = useState(0);
  const [maxRoomQuantity, setMaxRoomQuantity] = useState(0);
  const [availableRoomCounts, setAvailableRoomCounts] = useState<{ [key: number]: number }>({});
  const [listRoomSelected, setListRoomSelected] = useState<any[]>([])
  const [selectedRoom, setSelectedRoom] = useState<number | null>()
  const [selectedServicesQuantity, setSelectedServicesQuantity] = useState<{ [key: number]: number }>({});
  const [isUpdateRoom, setIsUpdateRoom] = useState(false);

  // Cập nhật lại số lượng phòng còn trống khi categories thay đổi
  useEffect(() => {
    if (categories) {
      const initialAvailableRoomCounts: { [key: number]: number } = {};
      categories.forEach((category: Category) => {
        initialAvailableRoomCounts[category.id] = category.total_rooms_available;
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

  //set giá trị phòng cũ vào form
  useEffect(() => {
    if (bookingData) {
      setMaxRoomQuantity(bookingData?.total_room || 0);
      setRoomCount(bookingData.room?.length || 0);
      form.setFieldsValue({
        name: bookingData?.name,
        cccd: bookingData?.cccd,
        phone: bookingData?.phone,
        email: bookingData?.email,
        check_in: dayjs(bookingData?.check_in)?.tz('Asia/Ho_Chi_Minh'),
        check_out: dayjs(bookingData?.check_out)?.tz('Asia/Ho_Chi_Minh'),
        people_quantity: bookingData?.people_quantity,
        nationality: bookingData?.nationality,
        total_room: bookingData?.total_room,
        status: bookingData?.status,
      });

      // Lấy danh sách các phòng đã chọn từ bookingData và cập nhật vào selectedRoomsData
      const updatedSelectedRoomsData = bookingData?.room?.map((item: any) => {
        return {
          id_room: item?.id,
          id_cate: item?.id_category,
          services:
            item.services?.map((service: any) => ({
              id_service: service.id,
              quantity: service.quantity_service,
            })) || [],

        };
      });
      setSelectedRoomsData(updatedSelectedRoomsData);
      setSelectedRoomsData(updatedSelectedRoomsData);
      setCartData(updatedSelectedRoomsData);
      calculateTotalAmount(updatedSelectedRoomsData);
    }
  }, [bookingData]);

  const handleCheckboxChange = (service: Service) => {
    if (selectedServices.includes(service.id)) {
      // Nếu dịch vụ đã được chọn, hủy chọn nó
      setSelectedServices(selectedServices.filter((id) => id !== service.id));
      // Xóa thông tin số lượng
      delete selectedServicesQuantity[service.id];
    } else {
      // Nếu dịch vụ chưa được chọn, chọn nó
      setSelectedServices([...selectedServices, service.id]);
      // Đặt số lượng ban đầu là 1 cho dịch vụ được chọn
      selectedServicesQuantity[service.id] = 1;
    }
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
        setIsUpdateRoom(true);
      }
    }

    setSelectedServices([]);
    setSelectedRoomIndex(null);
    setIsRoomsHidden(false);
    setIsServicesHidden(false);
    setSelectedServicesQuantity({});
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
      setMaxRoomQuantity(value);// Cập nhật maxRoomQuantity khi có thay đổi
    }
    setIsUpdateRoom(true);
  };
  const getServiceName = (serviceId: number) => {
    const serviceData = services?.find((service: any) => service.id === serviceId);
    return serviceData ? serviceData.name : 'Dịch vụ không tồn tại';
  };
  const handleRemoveRoom = (roomIndex: number) => {
    const updatedSelectedRoomsData = [...cartData];
    // Xóa phòng đã chọn khỏi mảng
    updatedSelectedRoomsData.splice(roomIndex, 1);
    // Cập nhật lại mảng selectedRoomsData
    setCartData(updatedSelectedRoomsData);
    // Lấy id_cate của phòng vừa xoá
    const removedRoomId = selectedRoomsData[roomIndex].id_cate;
    // Cập nhật lại số lượng phòng còn lại trong availableRoomCounts
    const updatedAvailableRoomCounts = { ...availableRoomCounts };
    updatedAvailableRoomCounts[removedRoomId] += 1;
    setAvailableRoomCounts(updatedAvailableRoomCounts);
    // Giảm số lượng phòng đã chọn đi 1
    setRoomCount(roomCount - 1);
    // Cập nhật lại tổng giá
    calculateTotalAmount(updatedSelectedRoomsData);
    setIsUpdateRoom(true);
  };
  const handleCancelRemoveRoom = () => {
    message.error('Click on No');
  };


  const [isSelectingServices, setIsSelectingServices] = useState(false);
  const [hiddenSelectingServices, setHiddenSelectingServices] = useState(false);
  const [isSelectingRooms, setIsSelectingRooms] = useState(false);
  const [hiddenSelectingRooms, setHiddenSelectingRooms] = useState(false);

  const getRoomName = (roomId: any) => {

    const roomData = roomsData?.find((room: any) => room?.id === roomId);

    return roomData ? `Phòng ${roomData.name}` : 'Phòng không tồn tại';
  }

  const handleSelectRooms = (roomIndex: any) => {
    setSelectedRoomIndex(roomIndex);
    const rooms = roomsData?.id_room
    setSelectedRoom(rooms);
    setListRoomSelected(roomsData?.filter((room: any) => room.id_cate === selectedRoomsData[roomIndex]?.id_cate))
    setIsSelectingRooms(!isSelectingRooms);
    setHiddenSelectingRooms(!hiddenSelectingRooms)
    setIsSelectingServices(false);
  }
  const handleUpdateRoom = () => {
    if (selectedRoomIndex !== null) {
      const updatedCartData = [...cartData];
      updatedCartData[selectedRoomIndex].id_room = Number(selectedRoom);
      setSelectedRoom(Number(selectedRoom));
      setCartData(updatedCartData);
      form.setFieldsValue({ cart: updatedCartData });
      setIsUpdateRoom(true);
    }
    setIsSelectingRooms(false);
    setHiddenSelectingRooms(false);
    setSelectedRoomIndex(null);


  };
  const handleSelectServices = (roomIndex: any) => {
    setSelectedRoomIndex(roomIndex);
    setIsSelectingServices(!isSelectingServices);
    const selectedServices = selectedRoomsData[roomIndex]?.services?.map((service) => service.id_service) || [];
    if (selectedServices.length > 0) {
      selectedServices.forEach((serviceId) => {
        selectedServicesQuantity[serviceId] = selectedRoomsData[roomIndex]?.services?.find((service) => service.id_service === serviceId)?.quantity || 1;
      });
      setSelectedServices(selectedServices);
    };
    setHiddenSelectingServices(!hiddenSelectingServices)
    setIsSelectingRooms(false);

  };
  const handleUpdateCart = () => {
    if (selectedRoomIndex !== null) {
      // Tạo một bản sao mới của cartData để tránh thay đổi trực tiếp.
      const updatedCartData = [...cartData];
      // Cập nhật lại mảng cartData
      updatedCartData[selectedRoomIndex].services = selectedServices.map((serviceId) => ({
        id_service: serviceId,
        quantity: selectedServicesQuantity[serviceId] || 1,
      }));
      setCartData(updatedCartData);
      form.setFieldsValue({ cart: updatedCartData });
      calculateTotalAmount(updatedCartData);
      setIsUpdateRoom(true);
    }
    setIsSelectingServices(false);
    setHiddenSelectingServices(false);
  };

  const onFinish = (values: FieldType) => {

    const cart = cartData?.map((roomData) => ({
      id_room: roomData?.id_room, // ID phòng đã chọn
      id_cate: roomData.id_cate, // ID loại phòng đã chọn
      services: roomData.services, // Các dịch vụ đã chọn cho phòng
    }));

    const formattedValues = {
      ...values,
      id: id,
      check_in: values.check_in?.format('YYYY-MM-DD HH:mm:ss'),
      check_out: values.check_out?.format('YYYY-MM-DD HH:mm:ss'),
      cart: cart,
      promotion: 1,
      flag: isUpdateRoom
    };
    let flagIdRoom = false;
    formattedValues?.cart?.map((item: any) => {
      if (item.id_room === undefined || item.id_room === null) {
        flagIdRoom = true;
      }
    })

    if (flagIdRoom) {
      message.error('Vui lòng chọn phòng');
    }
    else {
      updateBooking(formattedValues).unwrap().then(() => {
        message.success('Cập nhật thành công');
        setTimeout(() => {
          navigate(`/admin/detailbooking/${id}`)
        }, 2000);
      });
    }

  };

  const onFinishFailed = () => {
    message.error('Cập nhật thất bại');
  };

  useEffect(() => {
    form.setFieldsValue({
      total_amount: totalAmount,
    });
  }, [totalAmount]);

  if (isLoading) {
    return <Skeleton active />;
  }

  if (isError) {
    return <div>Có lỗi xảy ra khi tải thông tin dịch vụ.</div>;
  }

  return (
    <div className="mx-auto overflow-auto scroll-smooth">
      <header className='flex justify-between items-center mb-3'>
        <h1 className='text-xl text-orange-500 font-bold pb-5'>Cập nhật Booking: <span className='font-semibold text-orange-900 text-2xl'>{bookingData?.slug}</span></h1>
        <button className='px-3 py-2 border hover:bg-orange-400 bg-orange-500 text-white rounded-md flex items-center' onClick={() => navigate(`/admin/detailbooking/${id}`)}>
          <ArrowLeftOutlined className="pr-2" /> Quay lại
        </button>
      </header>
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
        <div className="grid grid-cols-2 gap-8 ">
          <div className='grid grid-cols-2 h-screen'>
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
                format="YYYY-MM-DD "
                placeholder="Chọn ngày và giờ"
                className='w-[250px]'
                // disabledDate={(current) => {
                //   // Vô hiệu hóa các ngày hôm trước
                //   return current && current.isBefore(new Date(), 'day');
                // }}
                disabled

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
                format="YYYY-MM-DD"
                placeholder="Chọn ngày và giờ"
                className='w-[250px]'
                // disabledDate={(current) => {
                //   // Vô hiệu hóa các ngày hôm trước
                //   return current && current.isBefore(new Date(), 'day');
                // }}
                disabled
              />
            </Form.Item>
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
                { required: true, message: 'Hãy nhập số vào !' },
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
              name="total_room"
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
              rules={[{ required: true, message: 'Hãy chọn trạng thái!' }]}
            >
              <Select style={{ width: "250px" }} placeholder="Hãy chọn trạng thái">
                <Select.Option value={0}>Đang chờ</Select.Option>
                <Select.Option value={1}>Đã huỷ</Select.Option>
                <Select.Option value={2}>Đã check in</Select.Option>
                <Select.Option value={3}>Đã thanh toán</Select.Option>
                <Select.Option value={4}>Đã hoàn thành</Select.Option>
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
                            : category.total_rooms_available < 1
                              ? 'hidden'
                              : availableRoomCounts[category?.id] === 0
                                ? 'bg-red-500 text-white cursor-not-allowed'
                                : 'bg-[#15803d] '

                          }`}
                        onClick={() => {
                          if (category.total_rooms_available >= 1) {
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
                  <Form.Item name={['room', selectedRoomIndex, 'services']} className=''>
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
                <div className='flex justify-center items-center'><Button className='border border-blue-500 rounded px-4 mt-2 w-full ' onClick={handleContinueClick}>Tiếp tục</Button></div>
              </div>
            </div>
            {/*Các loại phòng đã chon*/}
            <div className='p-3 rounded-md mt-3 ' style={{ boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }}>
              <div className='text-md col-span-2'><h1>Các loại phòng đã chọn</h1></div>
              <div className="grid grid-cols-2 gap-2">
                {cartData?.map((roomData, index) => {
                  const selectedCategory = categories?.find((category: any) => category?.id === roomData?.id_cate);
                  return (
                    <React.Fragment key={index}>
                      {((!hiddenSelectingServices || selectedRoomIndex === index) && (!hiddenSelectingRooms || selectedRoomIndex === index)) && (
                        <div
                          className={`px-3 py-2 rounded-md border h-full`}>
                          <h2 className="font-bold text-xl text-blue-800"> Phòng số {index + 1}</h2>

                          <div className="flex justify-between items-center">
                            <h2 >
                              <span className='pr-2'>Loại phòng:</span><span className='font-semibold italic text-blue-800'>{selectedCategory?.name}</span></h2>
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
                          <p className=''>Tên phòng : <span className='font-semibold text-blue-800'>{getRoomName(roomData?.id_room)} </span></p>

                          <p className="text-md ">Dịch vụ đã chọn: </p>
                          <ul>
                            {roomData?.services?.map((serviceId, serviceIndex) => (
                              <li key={serviceIndex}>
                                Dịch vụ {serviceIndex + 1} : <span className='font-semibold text-blue-800 italic'> {getServiceName(serviceId.id_service)}</span> x <span className='text-red-500 font-semibold'>{serviceId.quantity}</span>
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
                              <span className='mx-2'>{selectedServicesQuantity[service.id] || 1}</span>
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
                    <div className='ml-[210px] items-center'>
                      <Button className='border border-blue-500 rounded px-4 mt-2  ' onClick={handleUpdateCart}>
                        Cập nhật cart
                      </Button>
                    </div>
                  </Form.Item>
                )}
                {isSelectingRooms && selectedRoomIndex !== null && (
                  <Form.Item name={['cart', selectedRoomIndex, 'id_room']} className=''>
                    <Radio.Group
                      optionType="button"
                      buttonStyle="solid"
                      onChange={(e) => {
                        const selectedRoomId = e.target.value;
                        setSelectedRoom(selectedRoomId);
                      }}
                    >
                      {listRoomSelected?.map((room: any) => (
                        <div key={room.id} className="my-3 flex items-center text-md w-[600px]">
                          <Radio
                            value={room.id}
                            checked={selectedRoom === room.id}
                            className='mr-2'
                          >
                            Phòng {room.name}
                          </Radio>
                        </div>
                      ))}
                    </Radio.Group>
                    <div className='ml-[210px] items-center'>
                      <Button className='border border-blue-500 rounded px-4 mt-2' onClick={handleUpdateRoom}>
                        Cập nhật phòng
                      </Button>
                    </div>
                  </Form.Item>
                )}

              </div>
            </div>
          </div>
        </div>
        <div>
          <Form.Item label="Tổng thanh toán" name="total_amount" className=' '>
            <InputNumber value={totalAmount} disabled className="text-black text-lg font-semibold w-[130px] px-3" />
          </Form.Item>
          <Form.Item >
            <div className="flex justify-start items-center space-x-4">
              <Button type="primary" className="bg-blue-500 text-white" htmlType="submit">
                Cập nhật booking
              </Button>
            </div>
          </Form.Item>
        </div>
      </Form>
    </div>
  );
};

export default UpdateBooking;