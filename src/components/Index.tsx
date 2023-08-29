import { AiOutlineArrowRight } from "react-icons/ai";
const Index = () => {
  return (
    <div>
        <div className="mt-7 bg-[#fbf8f2] w-full pb-8">
            <div className="w-[1280px] mx-auto">
                <h1 className="text-[30px] pt-10 pb-6">Trải nghiệm hệ sinh thái Vinpearl</h1>
                <div className="flex items-center space-10">
                    <div className="">
                        <img className="mb-6 w-[900px]" src="https://statics.vinpearl.com/styles/741x500/public/2023_01/Hotels%20&%20Resort_1673079062.png.webp?itok=yrxzLyG7" alt="" />
                        <a href="" className="text-[22px] hover:text-[#f2ba50]">Nghỉ dưỡng</a>
                        <p className="text-[14px]">Trải mình bên những bãi biển hấp dẫn nhất thế giới, Vinpearl mang đến trải nghiệm nghỉ dưỡng trọn vẹn nhất</p><br />
                        <span className="flex items-center space-x-6 text-[#f2ba50]"><a  href="">Khám phá</a> <AiOutlineArrowRight/></span>
                    </div>
                    <div className="ml-10">
                        <img className="mb-6 h-[560px] w-[450px] " src="https://statics.vinpearl.com/styles/409x500/public/2023_01/Amusement%20Park_1673079085.png.webp?itok=4cFi2wfJ" alt="" />
                        <a href="" className="text-[22px] hover:text-[#f2ba50]">Vui chơi giải trí</a>
                        <p className="text-[14px]">Chuỗi công viên chủ đề lớn nhất Việt Nam, dẫn đầu Châu Á</p><br />
                        <span className="flex items-center space-x-6 text-[#f2ba50]"><a  href="">Khám phá</a> <AiOutlineArrowRight/></span>
                    </div>
                </div>
            </div>
        </div>
        <div className="w-[1280px] mx-auto mt-10 ">
            <div className="flex items-center justify-between">
                <h2 className="text-[30px] mb-7">Phòng khách sạn</h2>
                <span className="flex items-center space-x-6 text-[#f2ba50]"><a  href="">Xem thêm</a> <AiOutlineArrowRight/></span>
            </div>
            <div className="grid grid-cols-3 flex  ">
                <div className="w-[400px] relative overflow-hidden">
                    <div className="relative overflow-hidden mb-4">
                        <img className="w-[400px] h-[250xp] object-cover transition-transform transform scale-100 hover:scale-105" 
                            src="https://booking-static.vinpearl.com/room_types/964a61f90cdb42db95b61263a7fdc74b_VH1PQ_Suite%20Room4.jpg" 
                            alt="" 
                        />
                    </div>
                    <a className="hover:text-[#f2ba50]" href="">Wonder Summer 2023: Miễn phí kỳ nghỉ tuyệt hơn mơ cho bé yêu</a>
                </div>
                <div className="w-[400px]  relative overflow-hidden">
                    <div className="relative overflow-hidden mb-4">
                        <img className="w-[400px] h-[250xp] object-cover transition-transform transform scale-100 hover:scale-105" 
                            src="https://booking-static.vinpearl.com/room_types/964a61f90cdb42db95b61263a7fdc74b_VH1PQ_Suite%20Room4.jpg" 
                            alt="" 
                        />
                    </div>
                    <a className="hover:text-[#f2ba50]" href="">Cảm hứng bất tận: trọn gói vé máy bay và nghỉ dưỡng 3N2Đ tiết kiệm đến 40%</a>
                </div>
                <div className="w-[400px] ">
                    <div className="relative overflow-hidden mb-4">
                        <img className="w-[400px] h-[250xp] object-cover transition-transform transform scale-100 hover:scale-105" 
                            src="https://booking-static.vinpearl.com/room_types/964a61f90cdb42db95b61263a7fdc74b_VH1PQ_Suite%20Room4.jpg" 
                            alt="" 
                        />
                    </div>
                    <a className="hover:text-[#f2ba50]" href="">Đặt phòng sớm, ưu đãi lớn: tổng hợp ưu đãi early bird không thể bỏ lỡ</a>
                </div>
                
            </div>
        </div>
        <div className="mt-10 relative bg-[#585c5b]">
            <div className="w-[740px] mx-auto absolute inset-0 top-[300px] items-center ">
                <p className="text-[#f2ba50] font-bold text-[20px] text-center pb-1">Pearl Club</p>
                <p className="text-[27px] text-center pb-2 text-white font-medium">Đặc quyền nghỉ dưỡng thượng lưu</p>
                <p className="text-white">
                    Pearl Club là chương trình khách hàng thân thiết của Vinpearl. Khách hàng có thể đăng ký là thành viên 
                    miễn phí và tích lũy giao dịch để nâng hạng, trải nghiệm ngay các đặc quyền ưu đãi trong toàn bộ hệ sinh 
                    thái Vinpearl.
                </p>
            </div>
            <img className="w-full bg-[#585c5b]" src="https://statics.vinpearl.com/styles/1920x860/public/2023_01/About%20Pearl%20Club_1673079019.jpg.webp?itok=f-G5FUpc" alt="" />
        </div>
        <div className="w-[1280px] mx-auto mt-10 ">
            <div className="flex items-center justify-between">
                <h2 className="text-[30px] mb-7">Ưu đãi khuyến mãi</h2>
                <span className="flex items-center space-x-6 text-[#f2ba50]"><a  href="">Xem thêm</a> <AiOutlineArrowRight/></span>
            </div>
            <div className="grid grid-cols-3 flex  ">
                <div className="w-[400px] ">
                    <div className="relative overflow-hidden mb-4">
                        <img className="w-full h-auto object-cover transition-transform transform scale-100 hover:scale-105 " 
                            src="https://statics.vinpearl.com/styles/378x250/public/2023_05/vinpearl_1684721297.jpg.webp?itok=hYT97ZUH" 
                            alt="" 
                        />
                    </div>
                    <a className="hover:text-[#f2ba50]" href="">Wonder Summer 2023: Miễn phí kỳ nghỉ tuyệt hơn mơ cho bé yêu</a>
                </div>
                <div className="w-[400px] ">
                    <div className="relative overflow-hidden mb-4">
                        <img className="w-full h-auto object-cover transition-transform transform scale-100 hover:scale-105 " 
                            src="https://statics.vinpearl.com/styles/378x250/public/2023_05/combo-cam-hung-bat-tan-banner_1685342465.jpg.webp?itok=Bh7dfsY4" 
                            alt="" 
                        />
                    </div>
                    <a className="hover:text-[#f2ba50]" href="">Cảm hứng bất tận: trọn gói vé máy bay và nghỉ dưỡng 3N2Đ tiết kiệm đến 40%</a>
                </div>
                <div className="w-[400px]  ">
                    <div className="relative overflow-hidden mb-4">
                        <img className="w-full h-auto object-cover transition-transform transform scale-100 hover:scale-105" 
                            src="https://statics.vinpearl.com/styles/378x250/public/2023_01/tong-hop-uu-dai-early-bird-banner_1673341683.jpg.webp?itok=YNNs_fjY" 
                            alt="" 
                        />
                    </div>
                    <a className="hover:text-[#f2ba50]" href="">Đặt phòng sớm, ưu đãi lớn: tổng hợp ưu đãi early bird không thể bỏ lỡ</a>
                </div>
                
            </div>
        </div>
    </div>
  )
}

export default Index
