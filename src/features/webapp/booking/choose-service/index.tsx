
import { useAppDispatch, useAppSelector } from '@/app/hook';
import { useState } from 'react';
import { AiOutlineInfoCircle, AiFillCheckCircle, AiOutlineCheckCircle, AiOutlineDown, AiOutlineUp, AiOutlineArrowRight } from 'react-icons/ai'
import { Link, useNavigate } from 'react-router-dom'
import { differenceInDays, parseISO } from 'date-fns';
import { useGetService_hotelQuery } from '@/api/webapp/service_hotel';
const ChooseService = () => {

    const toggleShowService = () => {
        setIsServiceOpen(!isServiceOpen);
    };
    const [isServiceOpen, setIsServiceOpen] = useState(false);
    const [selectedServices, setSelectedServices] = useState<any[]>([]);
    const [totalPrice, setTotalPrice] = useState(0); // Tổng tiền
    // Hàm để thêm hoặc bỏ chọn dịch vụ
    const toggleServiceSelection = (serviceId: number, servicePrice: number) => {
        if (selectedServices.includes(serviceId)) {
            // Nếu dịch vụ đã được chọn, loại bỏ nó khỏi danh sách
            setSelectedServices(selectedServices.filter((id) => id !== serviceId));
            setTotalPrice(totalPrice - servicePrice);
        } else {
            // Nếu dịch vụ chưa được chọn, thêm nó vào danh sách
            setSelectedServices([...selectedServices, serviceId]);
            setTotalPrice(totalPrice + servicePrice);
        }
    };
    const { data: serviceData, isLoading } = useGetService_hotelQuery({})
    const carts = useAppSelector((state: any) => state.cart?.items);
    const navigate = useNavigate()
    
    
    

   const sumPrice = carts?.reduce((total: any, item: any) => total + item.price * (differenceInDays((parseISO(item?.check_out)), parseISO(item?.check_in))), 0) + totalPrice

   const onhanldeSubmit = () => {
    navigate(`/booking`)
   }
    return (
        <div className='max-w-7xl mx-auto '>
            {/*Content*/}
            <div className='max-w-5xl mx-auto my-5'>
                <section className='flex space-x-16 items-center px-2 py-3'>
                    <Link to={"/choose-room"} className='underline text-yellow-500 text-md font-bold flex justify-start pr-32'>Chọn phòng </Link>
                    <h1 className='flex items-center'> <AiFillCheckCircle className='text-yellow-500 text-4xl' /> <span className='px-2'>Chọn phòng</span> </h1>
                    <h1 className='flex items-center'> <AiOutlineCheckCircle className='text-4xl' /><span className='px-2'>Dịch vụ</span> </h1>
                    <h1 className='flex items-center'> <AiOutlineCheckCircle className='text-4xl' /><span className='px-2'>Thanh toán</span> </h1>
                </section>
                <section className='grid grid-cols-3 gap-4 py-3'>
                    {/*Chọn dịch vụ mua thêm*/}
                    <div className='col-span-2 '>
                        <div className='border px-2 py-3 bg-gray-100 rounded my-3'>
                            <div className="flex justify-between items-center">
                                <h1 className='text-lg font-bold text-yellow-900'>Dịch vụ mua thêm </h1>
                            </div>
                        </div>
                        {/*Chọn dịch vụ mua thêm*/}
                        <div className='choice-column'>
                            {/*Thông tin dịch vụ*/}
                            <section className='border rounded-lg px-2 py-3 my-2'>
                                <div className='px-2'>
                                    <h1 className='font-semibold text-xl'>Phòng 1</h1>
                                    <div className='flex justify-between'>
                                        <h1 className=''>Biệt thự 1 phòng ngủ</h1>
                                        <button
                                            onClick={toggleShowService}
                                            className='text-yellow-700 hover:text-yellow-500 font-semibold '
                                        >
                                            {isServiceOpen ? <span className='flex items-center'>Ẩn dịch vụ <AiOutlineUp /></span> : <span className='flex items-center'>Hiện dịch vụ <AiOutlineDown /></span>}
                                        </button>
                                    </div>
                                </div>
                                <hr className='my-2' />
                                {/*Bật tắt hiện dịch vụ*/}
                                {isServiceOpen && (
                                    <div className='grid grid-cols-3 gap-2 pt-2'>
                                        {serviceData?.map((item: any) => (
                                            <div className="column border" key={item.id}>
                                                <img src={item?.image} className='w-full' />
                                                <h1 className='pl-2 pt-2 pb-5'>{item.name}</h1>
                                                <p className='pl-2 pb-2 font-semibold text-yellow-800 text-lg'>{item.price}<span className='text-sm'> vnđ</span></p>
                                                <div className='flex justify-between items-center px-2 py-3'>
                                                    <button className='flex items-center hover:text-yellow-500'><AiOutlineInfoCircle /><span className='pl-1'>Chi tiết</span></button>
                                                    <label className='items-center flex' >
                                                        <input type="checkbox" className="w-5 h-5 text-yellow-600 bg-yellow-500 border-yellow-500 rounded checked:bg-yellow-500 " onChange={() => toggleServiceSelection(item.id, item.price)}
                                                            checked={selectedServices.includes(item.id)} />
                                                        <span className="ml-2 text-sm font-medium text-yellow-800">Thêm</span>
                                                    </label>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </section>
                        </div>
                    </div>
                    <div className='booking-column'>
                        {/*Thông tin chuyến đi*/}
                        <div className='border px-2 py-3 bg-gray-100 rounded my-3'>
                            <h1 className='text-lg font-bold text-yellow-900'>Chuyến đi</h1>
                        </div>
                        {/*Thông tin khách sạn*/}

                        {carts?.map((item: any) => {
                            return <>
                                <div className='border rounded px-2 py-4'>
                                    <div>
                                        <div className='flex items-center justify-between'>
                                            <h1 className='font-semibold'>
                                                {item.nameHotel}
                                            </h1>
                                            <button className='text-sm'>Chỉnh sửa</button>
                                        </div>
                                        <p className='text-sm pt-3 items-center flex'>{item?.check_in}
                                            <AiOutlineArrowRight className='inline-block mx-1' />
                                            {item?.check_out}</p>
                                        <p className='text-sm pb-3'>{differenceInDays((parseISO(item?.check_out)), parseISO(item?.check_in))} Đêm</p>
                                    </div>
                                    <hr className='my-2' />
                                    {/*Thông tin phòng đã đặt*/}
                                    <div>
                                        <div className='flex items-center justify-between'>
                                            <h1 className='font-semibold'>
                                                Phòng 1
                                            </h1>
                                            <button className='text-lg font-semibold italic'>{item?.price}</button>
                                        </div>
                                        <p className='text-sm pt-3 items-center flex'><span className='pr-1'>x1</span> {item?.name}</p>
                                        <p className='text-sm pb-3'>2 Người lớn, 2 Trẻ em</p>
                                        {/*Dịch vụ đã chọn*/}
                                        <div className='border-gray-100 bg-gray-100 px-2 rounded'>
                                            <p className='text-sm pb-3 font-semibold'>Dịch vụ mua thêm</p>

                                            <ul className='list-disc px-3'>
                                                {selectedServices?.map((selectedServiceId) => {
                                                    const selectedService = serviceData.find((item: any) => item?.id === selectedServiceId);
                                                    if (selectedService) {
                                                        return (
                                                            <li className='text-sm pb-2' key={selectedService.id}>
                                                                <div className='flex justify-between items-center'>
                                                                    <p>{selectedService?.name}</p>
                                                                    <p>{selectedService?.price} vnđ</p>
                                                                </div>
                                                            </li>
                                                        );
                                                    }
                                                    return null;
                                                })}
                                            </ul>


                                        </div>
                                    </div>
                                    <hr className='my-4' />
                                    <div className='pb-6'>
                                        {/*tổng cộng*/}
                                        <div className='flex items-center justify-between'>
                                            <h1 className='font-semibold'>
                                                Tổng cộng:
                                            </h1>
                                            {/* <h1 className='text-xl font-bold text-yellow-500'>{totalPrice} vnđ</h1> */}
                                            <h1>{sumPrice}</h1>
                                        </div>
                                    </div>
                                    <button onClick={onhanldeSubmit } className='bg-yellow-500 hover:bg-yellow-600 text-white py-3 px-2 text-lg font-bold rounded-full w-full'>Tiếp tục</button>
                                </div>
                            </>
                        })}
                    </div>
                </section>
            </div>
        </div>
    )
}

export default ChooseService