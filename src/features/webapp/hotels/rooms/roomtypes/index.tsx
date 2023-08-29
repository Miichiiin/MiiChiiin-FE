import React from 'react'
import { BsPeople } from 'react-icons/bs'
import { MdOutlineBed } from 'react-icons/md'
const RoomTypes = () => {
    return (
        <div className='max-w-7xl mx-auto my-5'>
            <section className='grid grid-cols-5 gap-8'>
                {/* Left sidebar -- Filter  */}
                <div className='border-2'>

                </div>
                {/* Right sidebar -- Room types */}
                <div className='col-span-4'>
                    <section className='grid grid-cols-5 gap-4 px-2 py-3'>
                        <div className='col-span-2 flex items-center'>
                            <img src='https://booking-static.vinpearl.com/room_types/d76f7196be2e4dc48052b4216cf5d3b6_3630-024.jpg' alt='' className=' h-full rounded-md' />
                        </div>
                        <div className='col-span-3 pt-8'>
                            <h1 className='text-2xl pb-4'>Biệt thự 2 phòng ngủ</h1>
                            <p className='pb-4'>Với diện tích từ 261 m², Biệt thự 2 phòng ngủ là biệt thự thiết kế thông minh, tích hợp đầy đủ tiện nghi cho kỳ lưu trú của bạn. Biệt thự có khoảng sân vườn rộng rãi với thiên nhiên xanh mát bên ngoài cửa sổ.</p>
                            <div className="grid grid-cols-3 gap-8">
                                <h1 className='flex items-center px-4 text-xl'><BsPeople /><span className='px-2'>8 người</span></h1>
                                <h1 className='flex items-center px-4 text-xl'><MdOutlineBed /><span className='px-2'>Giường lớn</span></h1>
                                <h1 className='flex items-center px-4 text-xl'><BsPeople /><span className='px-2'>8 người</span></h1>
                                <h1 className='flex items-center px-4 text-xl'><BsPeople /><span className='px-2'>8 người</span></h1>
                            </div>
                            <hr  className='my-4'/>
                            <div className='flex justify-between items-center'>
                                <h1 className='font-semibold'>Giá công bố</h1>
                                <h1 className='text-sm'><span className='font-semibold text-lg'>7.000.000</span> VNĐ</h1>
                            </div>
                            <div>
                                <button className='border-2 border-blue-500 bg-blue-500 hover:border-blue-700 hover:bg-blue-700 text-white px-4 py-3 rounded mx-2 mt-6'>Đặt ngay</button>
                                <button className='border-2 border-blue-500 hover:bg-blue-500 text-blue-700 hover:text-white px-4 py-3 rounded ml-5'>Xem thêm</button>
                            </div>
                        </div>
                    </section>
                    
                </div>
            </section>
        </div>
    )
}

export default RoomTypes