import { GrLocation } from 'react-icons/gr'
import { HiOutlineUser } from 'react-icons/hi'
import { AiOutlineExpandAlt, AiOutlineInfoCircle, AiOutlineArrowRight } from 'react-icons/ai'
import HeaderHotelType from "src/features/webapp/HotelType/HeaderHotelType";
import Search from 'src/components/Search';
const ChooseRoom = () => {
  return (
    <div>
      <div className='mb-[250px]'>
        <HeaderHotelType />
      </div>
      <div className='max-w-7xl mx-auto'>
        <Search />
        <div className='max-w-5xl mx-auto my-5'>
          <section className='border grid grid-cols-3 gap-4 px-2 py-3'>
            <div className=''>
              <img src='https://booking-static.vinpearl.com/hotels/3144cb44bcad401c92d99f97466e682e_s%E1%BA%A3nh%20dis-1-002.jpg' alt='' className='w-full rounded-md' />
            </div>
            <div className='col-span-2'>
              <a className='text-xl hover:underline font-semibold '>Vinpearl WonderWorld Phú Quốc</a>
              <div className='flex items-center py-4'>
                <GrLocation />
                <p className='text-sm pl-4'>Địa chỉ: Bãi Dài, Gành Dầu, Phú Quốc, Kiên Giang</p>
              </div>
              <p className='text-lg py-2'>
                Thiết kế của những biệt thự tại Vinpearl Wonderworld Phú Quốc tôn vinh sự riêng tư với những khoảng sân vườn rộng và khoáng đạt bên ngoài khung cửa. Khu nghỉ dưỡng sở hữu bãi biển riêng và địa hình tiếp giáp sân golf trong rừng nguyên sinh độc đáo mang đến nhiều trải nghiệm nghỉ dưỡng cho mỗi du khách yêu thích
              </p>
              <a href="" className='font-semibold text-blue-700 hover:text-blue-500 hover:underline'> Xem chi tiết  </a>
            </div>
          </section>
          <section className='grid grid-cols-3 gap-4 py-3'>
            <div className='col-span-2 '>
              <div className='border px-2 py-3 bg-gray-100 rounded my-3'>
                <div className="flex justify-between items-center">
                  <h1 className='text-lg font-bold'>Chọn phòng:  <span>0/1</span></h1>
                </div>
              </div>
              <form className='choice-column'>
                <section className='border rounded-lg grid grid-cols-3 gap-4 px-2 py-3 my-2'>
                  <div className='image'>
                    <img src='https://booking-static.vinpearl.com/hotels/3144cb44bcad401c92d99f97466e682e_s%E1%BA%A3nh%20dis-1-002.jpg' alt='' className='w-full h-full rounded-md' />
                  </div>
                  <div className='col-span-2'>
                    <a className='text-xl hover:underline'>Biệt thự 2 phòng ngủ</a>
                    <div className='flex items-center py-4'>
                      <HiOutlineUser />
                      <p className='text-sm px-2'>8 người</p>
                      <AiOutlineExpandAlt />
                      <p className='text-sm px-2'>260m<span className='text-[10px]'>2</span></p>
                    </div>
                    <p className=' text-right'> Giá công bố: <span className='font-semibold text-lg'>6.200.000 vnđ</span>  </p>
                    <p className=' flex justify-end items-center'><AiOutlineInfoCircle /> <span className='px-2'> Giá thành viên:</span> <span className='font-semibold text-xl'>5.600.000 vnđ</span>  </p>
                    <div className='justify-end flex items-center'>
                      <button className='flex border px-8 py-3 mt-4 bg-blue-500 hover:bg-blue-600 text-white rounded-full'>
                        Chọn
                      </button>
                    </div>
                  </div>
                </section>

              </form>
            </div>
            <div className='booking-column'>
              {/*Thông tin chuyến đi*/}
              <div className='border px-2 py-3 bg-gray-100 rounded my-3'>
                <h1 className='text-lg font-bold '>Chuyến đi</h1>
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
                    <button className='text-lg font-semibold '>21.000.000</button>
                  </div>
                  <p className='text-sm pt-3 items-center flex'><span className='pr-1'>x1</span> Biệt Thự 2 Phòng Ngủ</p>
                  <p className='text-sm pb-3'>2 Người lớn, 2 Trẻ em</p>
                  {/*Dịch vụ đã đặt*/}
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
    </div>
  )
}

export default ChooseRoom