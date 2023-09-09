import { AiOutlineHeart, AiOutlineClose, AiOutlineInfoCircle, AiFillStar, AiOutlineStar } from 'react-icons/ai'
import { BsPeople, BsChevronCompactRight, BsChevronCompactLeft } from 'react-icons/bs'
import { MdOutlineBed } from 'react-icons/md'
import React, { useState } from 'react';
import Modal from 'react-modal';

const images = [
  'https://booking-static.vinpearl.com/room_types/d76f7196be2e4dc48052b4216cf5d3b6_3630-024.jpg',
  'https://booking-static.vinpearl.com/room_types/3b32d17cdfd144e395addd747f481a6f_3630-004.jpg',
  'https://booking-static.vinpearl.com/room_types/cd1aa854eb3f4a65aa2087cca3e30ce6_3630-008.jpg',
  'https://booking-static.vinpearl.com/room_types/58dbe43d1302477fbaf0c10782bcca91_3630-039.jpg',
];

const DetailTypeofRoom = () => {
  // State để bật tắt modal và lưu index của ảnh hiện tại
  const [showModal, setShowModal] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  // Bật modal
  const toggleModal = () => {
    setShowModal(!showModal);
    setCurrentImageIndex(0);
  };
  // Trở về ảnh trước
  const showPreviousImage = () => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
    } else {
      setCurrentImageIndex(images.length - 1);
    }
  };
  // Sang ảnh tiếp theo
  const showNextImage = () => {
    if (currentImageIndex < images.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
    } else {
      setCurrentImageIndex(0);
    }
  };

  return (
    <div className='max-w-7xl mx-auto my-5'>
      <div className="flex justify-between pb-5">
        <h1 className='text-2xl uppercase font-bold'>Vinpearl WonderWorld Phú Quốc</h1>
        <button className='flex items-center text-red-500 font-semibold hover:text-red-700'><AiOutlineHeart className='mx-2' /> Yêu thích</button>
      </div>
      <div className='grid grid-cols-5 gap-8'>
        <div className='col-span-4'>
          <img src="https://booking-static.vinpearl.com/room_types/d76f7196be2e4dc48052b4216cf5d3b6_3630-024.jpg" alt="" className='w-full rounded' />
        </div>
        <div className='col-span-1'>
          <div className='pb-6'>
            <img src="https://booking-static.vinpearl.com/room_types/3b32d17cdfd144e395addd747f481a6f_3630-004.jpg" alt="" className='w-full rounded' />
          </div>
          <div className='pb-6'>
            <img src="https://booking-static.vinpearl.com/room_types/cd1aa854eb3f4a65aa2087cca3e30ce6_3630-008.jpg" alt="" className='w-full rounded' />
          </div>
          <div className='pb-6'>
            <img src="https://booking-static.vinpearl.com/room_types/58dbe43d1302477fbaf0c10782bcca91_3630-039.jpg" alt="" className='w-full rounded' />
          </div>
          <div className=''>
            <img src="https://booking-static.vinpearl.com/room_types/d76f7196be2e4dc48052b4216cf5d3b6_3630-024.jpg" alt="" className='w-full rounded' onClick={toggleModal}/>
            
          </div>
          {/*  */}
        </div>
        {/* Cửa sổ popup */}
        <Modal
          isOpen={showModal}
          onRequestClose={toggleModal}
          contentLabel="Additional Images"
          className="modal mx-auto mt-[200px] animate-fade-in "
        >
          <div className='max-w-3xl mx-auto'>
            <button
              className='absolute top-2 right-2 text-gray-500 hover:text-gray-700'
              onClick={toggleModal}
            >
              <AiOutlineClose className='text-2xl' />
            </button>
            <div className='relative'>
              <img src={images[currentImageIndex]} alt="" className='w-full rounded' />
              <div className='absolute inset-0 flex justify-between items-center'>
                <button
                  className='bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded'
                  onClick={showPreviousImage}
                >
                  <BsChevronCompactLeft />
                </button>
                <button
                  className='bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded'
                  onClick={showNextImage}
                >
                  <BsChevronCompactRight />
                </button>
              </div>
            </div>
          </div>
        </Modal>

      </div>
      <div className='py-5'>
        <h1 className='text-xl font-semibold pb-2'>Biệt thự 2 phòng ngủ</h1>
        <p className='text-md pb-2'>Với diện tích từ 261 m², Biệt thự 2 phòng ngủ là biệt thự thiết kế thông minh, tích hợp đầy đủ tiện nghi cho kỳ lưu trú của bạn. Biệt thự có khoảng sân vườn rộng rãi với thiên nhiên xanh mát bên ngoài cửa sổ. Với 2 phòng ngủ, biệt thự phù hợp với nhiều đối tượng khách hàng, từ các cặp vợ chồng đi hưởng tuần trăng mật, tới những nhóm bạn trẻ năng động, hay những gia đình yêu thích khám phá, những doanh nhân kết hợp giữa đi sự kiện và cùng gia đình tận hưởng.</p>
        <h1 className='text-xl font-semibold pb-2'>Tiện nghi</h1>
        <div className='grid grid-cols-5 gap-2 pb-2'>
          <h1 className='flex items-center text-md'><BsPeople /><span className='px-2'>8 người</span></h1>
          <h1 className='flex items-center text-md'><MdOutlineBed /><span className='px-2'>Giường lớn</span></h1>
          <h1 className='flex items-center text-md'><BsPeople /><span className='px-2'>8 người</span></h1>
          <h1 className='flex items-center text-md'><MdOutlineBed /><span className='px-2'>Giường lớn</span></h1>
          <h1 className='flex items-center text-md'><BsPeople /><span className='px-2'>8 người</span></h1>
          <h1 className='flex items-center text-md'><MdOutlineBed /><span className='px-2'>Giường lớn</span></h1>
        </div>
        <div className='pb-2'>
          <h1 className='text-xl font-semibold pb-4'>Đánh giá</h1>
          {/*Show ra đánh giá*/}
          <div className='comment-list grid grid-cols-2 gap-4 pb-5'>
            <div className='comment column'>
              <div className="small-column py-2 flex items-center">
                <div className="border rounded-full bg-blue-300 w-16 h-16 flex justify-center items-center">
                  <span className="text-xl">Q</span>
                </div>
                <h1 className="text-xl px-3">31/08/2023
                  <br />
                  Khách Hàng : <span className="font-bold ">T****n</span>
                </h1>
                <h1 className="text-xl px-3"><span className='font-semibold italic'>Biệt thự 2 phòng ngủ</span>
                  <br />
                </h1>
              </div>
              <h1>Phòng thoáng mát sạch sẽ, tiện nghi đầy đủ máy sấy, bọc che tóc khi tắm, tủ lạnh lạnh sẵn, free 2 nước khoáng. Quá tuyệt vời với giá này</h1>
            </div>
          </div>

          {/*Form đánh giá */}
          <div className="flex items-center justify-start shadow-lg mb-4 w-full">
            <form className="bg-white rounded-lg pt-2 w-full">
              <div className="flex flex-wrap mx-3 mb-6">
                <h2 className="px-4 pt-3 pb-2 text-gray-800 text-lg font-semibold">Thêm đánh giá mới </h2>
                <div className="md:w-full px-3 mb-2 mt-2">
                  <textarea className="bg-gray-100 rounded border border-gray-400 leading-normal resize-none w-full h-20 py-2 px-3 placeholder-gray-700 focus:outline-none focus:bg-white" name="body" placeholder='Viết một đánh giá mới' required></textarea>
                </div>
                <div className="w-full md:w-full flex items-start px-3">
                  <div className="flex items-center text-gray-700 mr-auto">
                    <AiOutlineInfoCircle />
                    <p className="text-xs md:text-sm pt-px px-2">Hãy đánh giá lịch sự.</p>
                  </div>
                  <div className="flex justify-end">
                    <button type='submit' className="text-blue-700 font-semibold py-2 px-4 border border-blue-400 rounded-lg tracking-wide hover:bg-blue-500 hover:text-white text-lg" >Đăng bình luận</button>
                  </div>
                </div>
              </div>
            </form>
          </div>
          <div className='pb-5'>
            <h1 className='text-xl font-semibold pb-4'>Bạn cảm thấy ưng ý chưa ?</h1>
            <div className='flex justify-center space-x-8'>
            <button className='bg-blue-500 hover:bg-blue-700 text-white py-4 px-2 rounded w-full my-2'>Đặt phòng ngay</button>
            <button className='bg-blue-500 hover:bg-blue-700 text-white py-4 px-2 rounded w-full my-2'>Thêm vào booking</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DetailTypeofRoom