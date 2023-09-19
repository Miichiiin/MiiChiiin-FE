import { useAppSelector } from "@/app/hook";
import { useState } from "react";
import {
  AiOutlineInfoCircle,
  AiFillCheckCircle,
  AiOutlineCheckCircle,
  AiOutlineDown,
  AiOutlineUp,
  AiOutlineArrowRight,
} from "react-icons/ai";
import { Link, useNavigate, useParams } from "react-router-dom";
import { differenceInDays, parseISO } from "date-fns";
import { useGetService_hotelQuery } from "@/api/webapp/service_hotel";
interface ServiceOpenState {
  [index: number]: boolean;
}
const ChooseService = () => {
  const [isServiceOpen, setIsServiceOpen] = useState<ServiceOpenState>({});
  const toggleShowService = (index: number) => {
    setIsServiceOpen((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  const [selectedServices, setSelectedServices] = useState<any[]>([]);
  // const [totalPrice, setTotalPrice] = useState(0);

  const toggleServiceSelection = (
    serviceId: any,
    price: any,
    roomIndex: any
  ) => {
    const serviceIndex = selectedServices.findIndex(
      (service) => service.id === serviceId && service.roomIndex === roomIndex
    );
    if (serviceIndex !== -1) {
      setSelectedServices((prevSelectedServices) =>
        prevSelectedServices.filter(
          (service) =>
            !(service.id === serviceId && service.roomIndex === roomIndex)
        )
      );
    } else {
      setSelectedServices((prevSelectedServices) => [
        ...prevSelectedServices,
        { id: serviceId, price, roomIndex },
      ]);
    }
  };
  const { data: serviceData } = useGetService_hotelQuery({});
  // const carts = useAppSelector((state: any) => state.cart?.items);
  const navigate = useNavigate();

  const dataParam = useParams();

  console.log("dataParam", dataParam);
  console.log("numbegeRoom", dataParam.numberRoom);

  let hotel: string[] = [];
  if (dataParam && dataParam.nameHotel) {
    hotel = dataParam.nameHotel.split(",");
  }

  console.log("hotel", hotel);

  let date: Date[] = [];
  if (dataParam && dataParam.date) {
    const timeArray = dataParam.date.split(",");
    date = timeArray.map((time) => new Date(time));
  }
  let roomNumber: any[] = [];
  if (dataParam && dataParam.numberRoom) {
    roomNumber = JSON.parse(dataParam.numberRoom);
  }

  const numberOfRooms = roomNumber.length;

  const onhanldeSubmit = () => {
    console.log("submitroomNumber",roomNumber);
    console.log("submitdate",date);
    console.log("submitsermist",selectedServices);
    console.log("submithotel",hotel);    
    const url = `/booking/${hotel}/${date}/${roomNumber}/${selectedServices}`
    navigate(url);
    // navigate(`/booking`)
  };
  // Tính tổng tiền của dịch vụ trong phòng
  const serviceTotalPrice = selectedServices.reduce(
    (accumulator: any, selectedService: any) => {
      const { id } = selectedService;
      const selectedServiceData = serviceData.find(
        (item: any) => item.id === id
      );
      if (selectedServiceData) {
        return accumulator + selectedServiceData.price;
      }
      return accumulator;
    },
    0
  );
  console.log("tien dịch vụ", serviceTotalPrice);
  let totalPrice1 = 0;

  roomNumber.map((item: any) => {
    const startDate = new Date(date[0]); // Lấy ngày bắt đầu thuê phòng từ date[0]
    const endDate = new Date(date[1]); // Lấy ngày kết thúc thuê phòng từ date[1]
    const numberOfDays = Math.ceil(
      (endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24)
    ); // Tính số ngày thuê phòng

    totalPrice1 += item.price * numberOfDays * item.count;
  });

  // Hiển thị tổng tiền
  console.log("Tổng tiền: ", totalPrice1);

  const sumprice = totalPrice1 + serviceTotalPrice

  return (
    <div className="max-w-7xl mx-auto ">
      {/*Content*/}
      <div className="max-w-5xl mx-auto my-5">
        <section className="flex space-x-16 items-center px-2 py-3">
          <Link
            to={"/choose-room"}
            className="underline text-yellow-500 text-md font-bold flex justify-start pr-32"
          >
            Chọn phòng{" "}
          </Link>
          <h1 className="flex items-center">
            {" "}
            <AiFillCheckCircle className="text-yellow-500 text-4xl" />{" "}
            <span className="px-2">Chọn phòng</span>{" "}
          </h1>
          <h1 className="flex items-center">
            {" "}
            <AiOutlineCheckCircle className="text-4xl" />
            <span className="px-2">Dịch vụ</span>{" "}
          </h1>
          <h1 className="flex items-center">
            {" "}
            <AiOutlineCheckCircle className="text-4xl" />
            <span className="px-2">Thanh toán</span>{" "}
          </h1>
        </section>
        <section className="grid grid-cols-3 gap-4 py-3">
          {/*Chọn dịch vụ mua thêm*/}
          <div className="col-span-2 ">
            <div className="border px-2 py-3 bg-gray-100 rounded my-3">
              <div className="flex justify-between items-center">
                <h1 className="text-lg font-bold text-yellow-900">
                  Dịch vụ mua thêm{" "}
                </h1>
              </div>
            </div>
            {/*Chọn dịch vụ mua thêm*/}
            <div className="choice-column">
              {/*Thông tin dịch vụ*/}
              {[...Array(numberOfRooms)].map((_, roomIndex) => (
                <section
                  key={roomIndex}
                  className="border rounded-lg px-2 py-3 my-2"
                >
                  <div className="px-2">
                    <h1 className="font-semibold text-xl">
                      Phòng {roomIndex + 1}
                    </h1>
                    <div className="flex justify-between">
                      <h1 className="">Biệt thự 1 phòng ngủ</h1>
                      <button
                        onClick={() => toggleShowService(roomIndex)}
                        className="text-yellow-700 hover:text-yellow-500 font-semibold"
                      >
                        {isServiceOpen[roomIndex] ? (
                          <span className="flex items-center">
                            Ẩn dịch vụ <AiOutlineUp />
                          </span>
                        ) : (
                          <span className="flex items-center">
                            Hiện dịch vụ <AiOutlineDown />
                          </span>
                        )}
                      </button>
                    </div>
                  </div>
                  <hr className="my-2" />
                  {isServiceOpen[roomIndex] && (
                    <div className="grid grid-cols-3 gap-2 pt-2">
                      {serviceData?.map((item: any) => (
                        <div className="column border" key={item.id}>
                          <img src={item?.image} className="w-full" />
                          <h1 className="pl-2 pt-2 pb-5">{item.name}</h1>
                          <p className="pl-2 pb-2 font-semibold text-yellow-800 text-lg">
                            {item.price}
                            <span className="text-sm"> vnđ</span>
                          </p>
                          <div className="flex justify-between items-center px-2 py-3">
                            <button className="flex items-center hover:text-yellow-500">
                              <AiOutlineInfoCircle />
                              <span className="pl-1">Chi tiết</span>
                            </button>
                            <label className="items-center flex">
                              <input
                                type="checkbox"
                                className="w-5 h-5 text-yellow-600 bg-yellow-500 border-yellow-500 rounded checked:bg-yellow-500"
                                onChange={() =>
                                  toggleServiceSelection(
                                    item.id,
                                    item.price,
                                    roomIndex
                                  )
                                }
                                checked={selectedServices.some(
                                  (service) =>
                                    service.id === item.id &&
                                    service.roomIndex === roomIndex
                                )}
                              />
                              <span className="ml-2 text-sm font-medium text-yellow-800">
                                Thêm
                              </span>
                            </label>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </section>
              ))}
            </div>
          </div>
          <div className="booking-column">
            {/*Thông tin chuyến đi*/}
            <div className="border px-2 py-3 bg-gray-100 rounded my-3">
              <h1 className="text-lg font-bold text-yellow-900">Chuyến đi</h1>
            </div>
            {/*Thông tin khách sạn*/}
            <div className="border rounded px-2 py-4">
              <div>
                <div className="flex items-center justify-between">
                  <h1 className="font-semibold">{hotel[1]}</h1>
                  <button className="text-sm">Chỉnh sửa</button>
                </div>
                <p className="text-sm pt-3 items-center flex">
                  {date[0].toISOString().slice(0, 10)}
                  <AiOutlineArrowRight className="inline-block mx-1" />
                  {date[1].toISOString().slice(0, 10)}
                </p>
                <p className="text-sm pb-3">
                  {differenceInDays(
                    parseISO(date[1].toISOString().slice(0, 10)),
                    parseISO(date[0].toISOString().slice(0, 10))
                  )}{" "}
                  Đêm
                </p>
              </div>
              <hr className="my-2" />
              {/*Thông tin phòng đã đặt*/}
              {roomNumber?.map((item: any, index: number) => {
                const roomNumber = `Phòng ${index + 1}`;
                const selectedServicesInRoom = selectedServices.filter(
                  (service) => service.roomIndex === index
                );

                return (
                  <div key={index}>
                    <div className="flex items-center justify-between">
                      <h1 className="font-semibold">{roomNumber}</h1>
                      <button className="text-lg font-semibold italic">
                        {item?.price}
                      </button>
                    </div>
                    <p className="text-sm pt-3 items-center flex">
                      <span className="pr-1">x{item?.count}</span>
                      {item?.name}
                    </p>
                    <p className="text-sm pb-3">2 Người lớn, 2 Trẻ em</p>
                    {/* Dịch vụ đã chọn */}
                    {selectedServicesInRoom.length > 0 && (
                      <div className="border-gray-100 bg-gray-100 px-2 rounded">
                        <p className="text-sm pb-3 font-semibold">
                          Dịch vụ mua thêm
                        </p>
                        <ul className="list-disc px-3">
                          {selectedServicesInRoom.map((selectedService) => {
                            const { id, price, roomIndex } = selectedService;
                            const selectedRoom = roomIndex + 1;
                            const selectedServiceData = serviceData.find(
                              (item: any) => item.id === id
                            );
                            if (selectedServiceData) {
                              return (
                                <li className="text-sm pb-2" key={id}>
                                  <div className="flex justify-between items-center">
                                    <p>
                                      {" "}
                                      Phòng {selectedRoom}:{" "}
                                      {selectedServiceData.name}
                                    </p>
                                    <p>{selectedServiceData.price} vnđ</p>
                                  </div>
                                </li>
                              );
                            }
                            return null;
                          })}
                        </ul>
                      </div>
                    )}
                  </div>
                );
              })}
              <hr className="my-4" />
              <div className="pb-6">
                {/*tổng cộng*/}
                <div className="flex items-center justify-between">
                  <h1 className="font-semibold">Tổng cộng:</h1>
                  <h1 className='text-xl font-bold text-yellow-500'>{sumprice} vnđ</h1>
                </div>
              </div>
              <button
                onClick={onhanldeSubmit}
                className="bg-yellow-500 hover:bg-yellow-600 text-white py-3 px-2 text-lg font-bold rounded-full w-full"
              >
                Tiếp tục
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ChooseService;
