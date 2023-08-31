// import { GrLocation } from 'react-icons/gr'
// import { HiOutlineUser } from 'react-icons/hi'
import { AiOutlineExpandAlt, AiOutlineInfoCircle, AiFillCheckCircle, AiOutlineCheckCircle, AiOutlineDown, AiOutlineUp, AiOutlineArrowRight } from 'react-icons/ai'

import { Link } from 'react-router-dom'
const ChooseService = () => {
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
                                        <button className='text-yellow-700 hover:text-yellow-500 font-semibold flex items-center'>Ẩn dịch vụ <AiOutlineUp /></button>
                                    </div>
                                </div>
                                <hr className='my-2' />
                                <div className='grid grid-cols-3 gap-2 pt-2'>
                                    <div className="column border">
                                        <img src="https://booking-static.vinpearl.com/hotels/amenity/9d1b2f4b552c43418d3c83a4525512a6_VAP%20PQ.jpg" alt="" className='w-full' />
                                        <h1 className='pl-2 pt-2 pb-5'>VinWonders & Vinpearl Safari Phú Quốc</h1>
                                        <p className='pl-2 pb-2 font-semibold text-yellow-800 text-lg'>9.400.000đ</p>
                                        <div className='flex justify-between items-center px-2 py-3'>
                                            <button className='flex items-center hover:text-yellow-500'><AiOutlineInfoCircle /><span className='pl-1'>Chi tiết</span></button>
                                            <label className='items-center flex'>
                                                <input type="checkbox" className="w-5 h-5 text-yellow-600 bg-yellow-500 border-yellow-500 rounded checked:bg-yellow-500 " />
                                                <span className="ml-2 text-sm font-medium text-yellow-800">Thêm</span>
                                            </label>
                                        </div>
                                    </div>
                                </div>  
                            </section>
                        </div>
                    </div>
                    <div className='booking-column'>
                        {/*Thông tin chuyến đi*/}
                        <div className='border px-2 py-3 bg-gray-100 rounded my-3'>
                            <h1 className='text-lg font-bold text-yellow-900'>Chuyến đi</h1>
                        </div>
                        {/*Thông tin khách sạn*/}
                        <div className='border rounded px-2 py-4'>
                            <div>
                                <div className='flex items-center justify-between'>
                                    <h1 className='font-semibold'>
                                        Vinpearl WonderWorld Phú Quốc
                                    </h1>
                                    <button className='text-sm'>Chỉnh sửa</button>
                                </div>
                                <p className='text-sm pt-3 items-center flex'>Chủ Nhật, Th08 27, 2023
                                    <AiOutlineArrowRight className='inline-block mx-1' />
                                    Thứ Ba, Th08 29, 2023</p>
                                <p className='text-sm pb-3'>02 Đêm</p>
                            </div>
                            <hr className='my-2' />
                            {/*Thông tin phòng đã đặt*/}
                            <div>
                                <div className='flex items-center justify-between'>
                                    <h1 className='font-semibold'>
                                        Phòng 1
                                    </h1>
                                    <button className='text-lg font-semibold italic'>21.000.000</button>
                                </div>
                                <p className='text-sm pt-3 items-center flex'><span className='pr-1'>x1</span> Biệt Thự 2 Phòng Ngủ</p>
                                <p className='text-sm pb-3'>2 Người lớn, 2 Trẻ em</p>
                                {/*Dịch vụ đã đặt*/}
                                <div className='border-gray-100 bg-gray-100 px-2 rounded'>
                                    <p className='text-sm pb-3 font-semibold'>Dịch vụ mua thêm</p>
                                    <ul className='list-disc px-3'>
                                        <li className='text-sm pb-2'>
                                            <div className='flex justify-between items-center'>
                                                <p>VinWonders & Vinpearl Safari Phú Quốc <span>x4</span></p> <p>9.400.000đ</p>
                                            </div>
                                        </li>
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
                                    <h1 className='text-xl font-bold text-yellow-500'>38.920.000</h1>
                                </div>
                            </div>
                            <button className='bg-yellow-500 hover:bg-yellow-600 text-white py-3 px-2 text-lg font-bold rounded-full w-full'>Tiếp tục</button>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}

export default ChooseService