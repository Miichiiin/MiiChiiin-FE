// import HeaderGT from "./Header"
import { AiOutlineArrowRight,AiFillWechat,AiOutlineRight } from "react-icons/ai";
const HotelIntroduction = () => {
  return (
    <div>
      {/* <HeaderGT/> */}
      
      <div className="bg-[#fbf8f2] w-full mt-3 px-5 py-10">
        <div className="mt-10 w-[940px] text-[14px] text-center mx-auto">
            <h1 className="text-[30px] font-medium mb-3">Smart Stay - VinHolidays</h1>
            <p>Được thiết kế theo lối kiến trúc mạnh mẽ, vững chãi nhưng không kém phần tinh tế, thu hút cùng hệ thống 687 phòng nghỉ có nội thất hiện đại và bể bơi ngoài trời 800m2, VinHolidays Fiesta Phú Quốc là lựa chọn hàng đầu để nghỉ dưỡng và gắn kết cho khách hàng từ các gia đình, nhóm bạn trẻ đến những đoàn khách số lượng lớn.</p>
            <p>Nằm tại vị trí trung tâm của khu phức hợp Grand World và liền kề quần thể Vinpearl, VinHolidays Fiesta Phú Quốc cùng các trải nghiệm vui chơi giải trí và mua sắm đa dạng, hứa hẹn mang tới kì nghỉ trong mơ với chi phí hợp lý cho tất cả mọi người trong hành trình <a href="" className="text-[#4a6d76] hover:text-[#f2ba50]">du lịch Phú Quốc.</a></p>
        </div>
        <div className="fixed bottom-4 z-10 right-4 w-20 h-20  bg-[#f2ba50] border border-gray-300 rounded-full shadow-md p-4 ">
             {/* Nội dung box chát */}
             <span className="text-[50px] text-white"><AiFillWechat/></span>
        </div>
        <div className="flex space-x-4 w-[1460px] mx-auto  mt-10">
            <img className="w-[500px]" src="https://statics.vinpearl.com/styles/600x450/public/2023_03/vinholidays-fiesta-phu-quoc-1_1679990625.jpg.webp?itok=slS8iOZS" alt="" />
            <img className="w-[380px]" src="https://statics.vinpearl.com/styles/452x450/public/2023_03/vinholidays-fiesta-phu-quoc-2_1679990625.jpg.webp?itok=lAj2cL0s" alt="" />
            <img className="w-[550px] " src="https://statics.vinpearl.com/styles/600x450/public/2023_03/vinholidays-fiesta-phu-quoc-3_1679990627.jpg.webp?itok=mktFVuH5" alt="" />
        </div>
        
      </div>
      <div className="">
            <div className="flex items-center justify-between w-[1280px] mx-auto mt-[80px]">
                <h1 className="text-[30px]">Các hạng phòng</h1>
                <span className="flex items-center space-x-2 text-[#f2ba50]"><a href="">Xem tất cả </a><AiOutlineArrowRight/></span>
            </div>
            <div className="mt-10 w-[1280px] mx-auto space-x-4 flex ">
                <div className="">
                    <div className="relative overflow-hidden mb-4">
                        <img className="w-[400px] h-[250xp] object-cover transition-transform transform scale-100 hover:scale-105 " 
                            src="https://booking-static.vinpearl.com/room_types/964a61f90cdb42db95b61263a7fdc74b_VH1PQ_Suite%20Room4.jpg" 
                            alt="" 
                        />
                    </div>
                    <h1 className="text-[24px] font-normal pb-2">Phòng Tiêu Chuẩn Giường Đôi</h1>
                    <p className="text-[#8e9399] text-[14px] mb-3">Phòng Tiêu Chuẩn Giường Đôi với diện tích 25.2 - 28.5m2 được thiết kế hiện đại, tích hợp đầy đủ tiện nghi cho kỳ lưu trú của bạn. Đây là lựa chọn lý tưởng dành cho các nhóm bạn</p>
                    <span className="flex items-center space-x-2 text-[#f2ba50]"><a href="">Xem tất cả </a><AiOutlineArrowRight/></span>
                </div>
                <div className="">
                    <div className=" relative overflow-hidden mb-4">
                        <img className="w-[400px] h-[250xp] object-cover transition-transform transform scale-100 hover:scale-105" 
                            src="https://booking-static.vinpearl.com/room_types/964a61f90cdb42db95b61263a7fdc74b_VH1PQ_Suite%20Room4.jpg" 
                            alt="" 
                        />
                    </div>
                    <h1 className="text-[24px] font-normal pb-2">Phòng Tiêu Chuẩn Giường Đôi</h1>
                    <p className="text-[#8e9399] text-[14px] mb-3">Phòng Tiêu Chuẩn Giường Đôi với diện tích 25.2 - 28.5m2 được thiết kế hiện đại, tích hợp đầy đủ tiện nghi cho kỳ lưu trú của bạn. Đây là lựa chọn lý tưởng dành cho các nhóm bạn</p>
                    <span className="flex items-center space-x-2 text-[#f2ba50]"><a href="">Xem tất cả </a><AiOutlineArrowRight/></span>
                </div>
                <div >
                    <div className="relative overflow-hidden mb-4">
                        <img className="w-[400px] h-[250xp] object-cover transition-transform transform scale-100 hover:scale-105" 
                            src="https://booking-static.vinpearl.com/room_types/964a61f90cdb42db95b61263a7fdc74b_VH1PQ_Suite%20Room4.jpg" 
                            alt="" 
                        />
                    </div>
                    <h1 className="text-[24px] font-normal pb-2">Phòng Tiêu Chuẩn Giường Đôi</h1>
                    <p className="text-[#8e9399] text-[14px] mb-3">Phòng Tiêu Chuẩn Giường Đôi với diện tích 25.2 - 28.5m2 được thiết kế hiện đại, tích hợp đầy đủ tiện nghi cho kỳ lưu trú của bạn. Đây là lựa chọn lý tưởng dành cho các nhóm bạn</p>
                    <span className="flex items-center space-x-2 text-[#f2ba50]"><a href="">Xem tất cả </a><AiOutlineArrowRight/></span>
                </div>
            </div>
        </div>
        <div className="bg-[#fbf8f2] w-full mt-10 px-5 py-3 ">
           <div className="w-[1440px] mx-auto pb-10 relative">
                <div className="flex items-center justify-between w-[1280px] mx-auto mt-[80px] mb-10">
                    <h1 className="text-[30px]">Ẩm Thực</h1>
                    <span className="flex items-center space-x-2 text-[#f2ba50]"><a href="">Xem tất cả </a><AiOutlineArrowRight/></span>
                </div>
                <div className="grid grid-cols-4 gap-4">
                    <div className="relative ">
                        <img className="h-[400px] w-[380px]" src="https://statics.vinpearl.com/styles/368x540/public/2023_03/Nh%C3%A0%20h%C3%A0ng%20Ol%C3%A1%20Costa_1679990016.jpeg.webp?itok=l5R_1-tR" alt="" />
                        <span className="absolute bottom-3 start-5 text-white leading-7">
                            <p >Ẩm thực</p>
                            <span className="flex items-center space-x-4"><p className="text-[23px]">Nhà Hàng Ola Costa</p><span className="mt-1"><AiOutlineArrowRight/></span></span>
                        </span>
                    </div>
                    <div className="relative ">
                        <img className="h-[400px] w-[380px]" src="https://statics.vinpearl.com/styles/368x540/public/2023_03/Scorpio%20Bar%202_1679990017.jpg.webp?itok=yeIqPgWH" alt="" />
                        <span className="absolute bottom-3 start-5 text-white leading-7">
                            <p >Ẩm thực</p>
                            <span className="flex items-center space-x-4"><p className="text-[23px]">Nhà Hàng Ola Costa</p><span className="mt-1"><AiOutlineArrowRight/></span></span>
                        </span>
                    </div>
                    <div className="relative ">
                        <img className="h-[400px] w-[380px]" src="https://statics.vinpearl.com/styles/368x540/public/2023_03/Nh%C3%A0%20h%C3%A0ng%20Ol%C3%A1%20Costa_1679990016.jpeg.webp?itok=l5R_1-tR" alt="" />
                        <span className="absolute bottom-3 start-5 text-white leading-7">
                            <p >Ẩm thực</p>
                            <span className="flex items-center space-x-4"><p className="text-[23px]">Nhà Hàng Ola Costa</p><span className="mt-1"><AiOutlineArrowRight/></span></span>
                        </span>
                    </div>
                    <div className="relative ">
                        <img className="h-[400px] w-[380px]" src="https://statics.vinpearl.com/styles/368x540/public/2023_03/Scorpio%20Bar%202_1679990017.jpg.webp?itok=yeIqPgWH" alt="" />
                        <span className="absolute bottom-3 start-5 text-white leading-7">
                            <p >Ẩm thực</p>
                            <span className="flex items-center space-x-4"><p className="text-[23px]">Nhà Hàng Ola Costa</p><span className="mt-1"><AiOutlineArrowRight/></span></span>
                        </span>
                    </div>
                </div>
                <button className="bg-white absolute top-[280px] end-[410px] w-8 hover:bg-gray-500 hover:text-white h-12 text-[22px] pl-1"><AiOutlineRight/></button>
           </div>
        </div>
        <div className="w-[1280px] mx-auto mt-10 relative">
            <img src="https://vinpearl.com/themes/porto/images/microsite_hotel_v2/img_become.jpg" alt="" />
            <div className="leading-10  absolute text-white top-[100px] start-[200px]">
                <p className="text-[30px]">Đăng ký thành viên Pearl</p>
                <p>Mức giá ưu đãi, tích lũy để hưởng đêm nghỉ miễn phí và hơn thế nữa.</p>
            </div>
        </div>
        <div className="mb-[100px]">
            <div className="flex items-center justify-between w-[1280px] mx-auto mt-[80px]">
                <h1 className="text-[30px]">Ưu Đãi</h1>
                <span className="flex items-center space-x-2 text-[#f2ba50]"><a href="">Xem tất cả </a><AiOutlineArrowRight/></span>
            </div>
            <div className="mt-10 w-[1280px] grid grid-cols-3 mx-auto gap-4  ">
                <div className="">
                    <img className="mb-5 w-[400px] h-300px" src="https://statics.vinpearl.com/styles/378x250/public/2023_08/season-of-smile-banner_1693304230.jpg.webp?itok=9OPICet9" alt="" />
                    <p className="text-[#8e9399] text-[14px] mb-3">Đặt phòng sớm, ưu đãi lớn: tổng hợp ưu đãi early bird không thể bỏ lỡ</p>
                </div>
                <div >
                    <img className="mb-5 w-[400px] h-300px" src="https://statics.vinpearl.com/styles/378x250/public/2022_01/Vinfast-thumb_1641955450.jpg.webp?itok=o1zhtnOK" alt="" />
                    <p className="text-[#8e9399] text-[14px] mb-3">VinFast - Người tiên phong tri ân người tiên phong</p>
                </div>
                <div >
                    <img className="mb-5 w-[400px] h-300px" src="https://statics.vinpearl.com/styles/378x250/public/2023_01/tong-hop-uu-dai-early-bird-banner_1673341683.jpg.webp?itok=YNNs_fjY" alt="" />
                    <p className="text-[#8e9399] text-[14px] mb-3">Đón hè rực rỡ tại Vinpearl cùng trọn bộ cẩm nang ưu đãi hè 2023</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default HotelIntroduction
