// import { useAppSelector } from "@/app/hook";
import { useState } from "react";
import {
  AiOutlineInfoCircle,
  AiFillCheckCircle,
  AiOutlineCheckCircle,AiOutlineCheck,
  AiOutlineDown,
  AiOutlineUp,AiOutlineForm,AiOutlineTeam,
  AiOutlineArrowRight,AiFillCaretDown ,AiFillCaretUp,AiOutlineCalendar,AiOutlineSchedule, AiOutlineLeft
} from "react-icons/ai";
import { json, useNavigate, useParams } from "react-router-dom";
import { differenceInDays, parseISO } from "date-fns";
import { useGetService_hotelIdQuery} from "@/api/webapp/service_hotel";
import { Button } from "antd";
import HeaderHotelType from "../../HotelType/HeaderHotelType";

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

  // const carts = useAppSelector((state: any) => state.cart?.items);
  const navigate = useNavigate();

  const dataParam = useParams();

  let hotel: string[] = [];
  if (dataParam && dataParam.nameHotel) {
    hotel = dataParam.nameHotel.split(",");
  }
  const { data: serviceData } = useGetService_hotelIdQuery(hotel[0]);

  let date: Date[] = [];
  if (dataParam && dataParam.date) {
    const timeArray = dataParam.date.split(",");
    date = timeArray.map((time) => new Date(time));
  }


  let roomDetailsString:any = []
  if(dataParam && dataParam?.numberPeople){
    roomDetailsString = JSON.stringify(dataParam?.numberPeople).split("&").map((item:any )=> item.replace(/^"|"$/g, ''))
  }
  const NumberPeople: { [key: string]: number }[] = [];

  roomDetailsString.forEach((item:any) => {
    const obj: { [key: string]: number } = {};
    const keyValuePairs: string[] = item.split(',');
  
    keyValuePairs.forEach(pair => {
      const [key, value]: string[] = pair.split(':');
      obj[key] = parseInt(value);
    });
  
    NumberPeople.push(obj);
  });
  
  
  let roomNumber: any[] = [];
  if (dataParam && dataParam.numberRoom) {
    roomNumber = JSON.parse(dataParam.numberRoom);
  }
  
  const numberOfRooms = roomNumber.length;
  console.log("numberOfRooms",numberOfRooms);
  

  const onhanldeSubmit = () => {
    const service = JSON.stringify(selectedServices);
    const url = `/booking/${hotel}/${date}/${JSON.stringify(roomNumber)}/${service}/${dataParam.numberPeople}`;
    navigate(url);
    // navigate(`/booking`)
  };
  



let cleanedNumberPeople = dataParam && dataParam.numberPeople ? dataParam.numberPeople.replace(/"/g, '') : undefined;

  const onhanldeGoBack = () => {

    const url = `/choose-room/${dataParam?.nameHotel}/${dataParam?.date}/${numberOfRooms}/${cleanedNumberPeople}`;

    navigate(url);
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
  let totalPrice1 = 0;

  roomNumber.map((item: any) => {
    const startDate = new Date(date[0]); // Lấy ngày bắt đầu thuê phòng từ date[0]
    const endDate = new Date(date[1]); // Lấy ngày kết thúc thuê phòng từ date[1]
    const numberOfDays = Math.ceil(
      (endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24)
    ); // Tính số ngày thuê phòng

    totalPrice1 += item.price * numberOfDays * item.count;
  });
  

  const sumprice = totalPrice1 + serviceTotalPrice;

  return (
    <div className="max-w-7xl mx-auto ">
      <HeaderHotelType />
      {/*Content*/}
      <div className="max-w-5xl mx-auto my-5 mt-36">
        <section className="flex space-x-16 items-center px-2 py-3">
          <Button
            onClick={onhanldeGoBack}
            className="hover:underline text-blue-500 text-md font-bold  flex justify-start items-center space-x-2 pr-32 border-none"
          >
              <AiOutlineLeft />
            Chọn Phòng{" "}
          </Button>
          <h1 className="flex items-center">
            {" "}
              <span className="bg-[#f5f6fa] px-4  font-medium py-2 text-[#6a6971] rounded-full mr-2">
                1
              </span>
              <span className="text-[#6a6971] text-[14px] font-medium">
                Chọn phòng
              </span>
          </h1>
          <h1 className="flex items-center">
            {" "}
            <a className="flex items-center space-x-3 text-[#e8952f]" href="">
            <span className="bg-[#e8952f] px-2 py-2 text-white rounded-full">
                <AiOutlineCheck />
              </span>
              <span className="text-[#e8952f] text-[14px] font-medium">
                Chọn dịch vụ
              </span>
            </a>
          </h1>
          <h1 className="flex items-center">
            {" "}
            <span className="bg-[#f5f6fa] px-4  font-medium py-2 text-[#6a6971] rounded-full mr-2">
                2
              </span>
              <span className="text-[#6a6971] text-[14px] font-medium">
               Thanh toán
              </span>
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
                    <h1 className="font-bold text-lg">
                      Phòng {roomIndex + 1}
                    </h1>
                    <div className="flex justify-between font-medium">
                      <h1 className="">Biệt thự 1 phòng ngủ</h1>
                      <button
                        onClick={() => toggleShowService(roomIndex)}
                        className="text-[#e8952f] hover:text-yellow-500 font-medium"
                      >
                        {isServiceOpen[roomIndex] ? (
                          <span className="flex text-sm items-center space-x-2 text-md font-medium">
                            <span>Ẩn dịch vụ</span> <AiFillCaretUp />
                          </span>
                        ) : (
                          <span className="flex text-sm items-center">
                            Hiện dịch vụ <AiFillCaretDown />
                          </span>
                        )}
                      </button>
                    </div>
                  </div>
                  <hr className="my-2" />
                  {isServiceOpen[roomIndex] && (
                    <div className="grid grid-cols-3 gap-3 pt-2 ">
                      {serviceData?.map((item: any) => (
                        <div className="column border rounded-lg hover:shadow-xl" key={item.id}>
                          <img src={item?.image} className="w-full rounded-t-lg" />
                          <h1 className="pl-2 pt-2 pb-2 text-base font-medium">{item.name}</h1>
                          <p className="pl-2 pb-2 font-semibold text-black text-lg">
                            {item.price}
                            <span className="text-sm"> đ</span>
                          </p>
                          <div className="flex justify-between items-center px-2 py-3 ">
                            <button className="flex items-center hover:text-yellow-500">
                              <AiOutlineInfoCircle class="text-blue-500 font-medium"/>
                              <span className="pl-1 text-xs text-blue-500 font-medium ">Chi tiết</span>
                            </button>
                            <label className="items-center flex">
                              <input
                                type="checkbox"
                                className="w-4 h-4 text-yellow-600 bg-yellow-500 border-yellow-500 rounded checked:bg-yellow-500"
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
                              <span className="ml-2 text-sm font-medium text-[#e8952f]">
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
          <div className="booking-column ">
            {/*Thông tin chuyến đi*/}
            <div className="border px-2 py-4 bg-gray-100 rounded my-3">
              <h1 className="text-lg font-bold text-yellow-900">Chuyến đi</h1>
            </div>
            {/*Thông tin khách sạn*/}
            <div className="border rounded px-4 py-4">
              <div>
                <div className="flex items-center justify-between">
                  <h1 className="font-semibold text-lg">{hotel[1]}</h1>
                  <button onClick={onhanldeGoBack} className="text-sm text-blue-500 font-medium hover:underline">
                    Chỉnh sửa
                  </button>
                </div>
                <div className="border-b-2 pb-3">
                  <p className="text-sm pt-3 items-center flex font-medium text-gray-500">
                    <AiOutlineCalendar class="text-lg mr-2"/>
                    {date[0].toISOString().slice(0, 10)}
                    <AiOutlineArrowRight className="inline-block mx-1" />
                    {date[1].toISOString().slice(0, 10)}
                  </p>
                  <p className="text-sm pb-3 font-medium text-gray-500 flex items-center mt-1">
                    <AiOutlineSchedule class="text-lg mr-2"/>
                    {differenceInDays(
                      parseISO(date[1].toISOString().slice(0, 10)),
                      parseISO(date[0].toISOString().slice(0, 10))
                    )}{" "}
                    Đêm
                  </p>
                </div>
              </div>
              {/*Thông tin phòng đã đặt*/}
              {roomNumber?.map((item: any, index: number) => {
                const roomNumber = `Phòng ${index + 1}`;
                const selectedServicesInRoom = selectedServices.filter(
                  (service) => service.roomIndex === index
                );

                return (
                  <div key={index}>
                    <div className="flex items-center justify-between pt-4">
                      <h1 className="font-semibold">{roomNumber}</h1>
                      <button className="text-md font-semibold ">
                        {item?.price.toLocaleString('vi-VN')} đ
                      </button>
                    </div>
                    <p className="text-sm pt-3 items-center flex text-gray-500 font-medium">
                      <AiOutlineForm class="text-lg mr-2"/>
                      <span className="pr-1">x{item?.count}</span>
                      {item?.name}
                    </p>
                   <div className="flex text-gray-500 mt-1 border-b-2 pb-3">
                      <AiOutlineTeam class="text-lg mr-2"/>
                      <p className="text-sm pb-3 text-gray-500 font-medium">  
                      {NumberPeople && NumberPeople?.filter((item:any, index1:any) => index1 == index).map(( {adults, children, infants}:any, index:any) => (
                                  <div key={index}>Người lớn:{adults}, Trẻ em:{children}, Em bé: {infants}</div>
                                ))}</p>
                   </div>
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
                                    <p>{selectedServiceData.price} đ</p>
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
              <div className="pb-6">
                {/*tổng cộng*/}
                <div className="flex items-center justify-between pt-3">
                  <h1 className="font-semibold text-xl ">Tổng cộng:</h1>
                  <h1 className="text-lg font-bold text-yellow-500">
                    {sumprice.toLocaleString('vi-VN')} đ
                  </h1>
                </div>
              </div>
              <div className="flex justify-center">
                <button
                  onClick={onhanldeSubmit}
                  className="bg-[#e8952f]  text-white py-2.5 mt-3 px-2 text-lg font-bold rounded-full w-[85%]
                      tranform transition-tranform hover:scale-105 duration-300 "
                >
                  Tiếp tục
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ChooseService;