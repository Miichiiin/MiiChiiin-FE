import { AiOutlineLeft ,AiOutlineCheck,} from "react-icons/ai";
import { BsArrowRight } from "react-icons/bs";
const BookingInformation = () => {
  return (
    <div className="">
        <div className="flex items-center w-[1280px] mx-auto mt-[60px] ">
            <span className="flex items-center mr-[300px] space-x-3 text-[#6181bb]"><AiOutlineLeft/><a href="">Chọn phòng</a></span>
            <div className="flex items-center space-x-8">
                <a className="flex items-center space-x-3 text-[#e8952f]" href=""><span className="bg-[#e8952f] px-2 py-2 text-white rounded-full"><AiOutlineCheck/></span><span className="font-medium text-[14px]">Chọn phòng</span></a>
                <a className="flex items-center space-x-3 text-[#e8952f]" href=""><span className="bg-[#f5f6fa] px-4  font-medium py-2 text-[#6a6971] rounded-full">2</span><span className="text-[#6a6971] text-[14px] font-medium">Dịch vụ mua thêm</span></a>
                <a className="flex items-center space-x-3 text-[#e8952f]" href=""><span className="bg-[#f5f6fa] px-4 py-2 font-medium text-[#6a6971] rounded-full">3</span><span className="text-[#6a6971] text-[14px] font-medium">Thanh toán</span></a>
            </div>
        </div>
        <div className="w-[1280px] mx-auto mt-10 flex space-x-4" >
            <div>
                <div className="border boder-black  rounded-md w-[800px] pb-10 ">
                    <div className="border border-b-[#bg-[#f9f9f9]] px-4 py-4 bg-[#f5f6fa]">
                        <span className="font-medium text-[18px]">Thông tin người đặt chỗ </span>
                    </div>
                    <div className="mt-5 mb-5 flex items-center px-5 py-5">
                        <span className="mr-6">Danh xưng <span className="text-red-500">*</span></span>
                        <form action="action_page.php" className=" space-x-2">
                            <span className="items-center "><input type="radio" name="gender" value="male" checked/> Ông</span>
                            <span className="items-center "><input type="radio" name="gender" value="male" /> Bà</span>
                            <span className="items-center "><input type="radio" name="gender" value="male" /> Khác</span>
                        </form>
                    </div>
                    <div className=" flex items-center space-x-8 px-5 py-5">
                        <div>
                            <label htmlFor="">Họ <span className="text-red-500">*</span></label><br />
                            <input className="border mt-2 w-[360px] h-[45px] rounded-md  px-3 text-[12px] outline-none " type="text" placeholder="Ex: Nguyen"/>
                        </div>
                        <div>
                            <label htmlFor="">Tên đêm và tên <span className="text-red-500">*</span></label><br />
                            <input className="border mt-2 w-[360px] h-[45px] rounded-md  px-3 text-[12px] outline-none " type="text" placeholder="Ex: Anh Duy"/>
                        </div>
                    </div>
                    <div className="px-5  py-3 flex items-center space-x-8">
                        <div>
                            <label htmlFor="">Email nhận thông tin đơn hàng <span className="text-red-500">*</span></label><br />
                            <input className="border mt-2 w-[360px] h-[45px] rounded-md  px-3 text-[12px] outline-none " type="text" placeholder="Ex: abc@gmail.com"/>
                        </div>
                        <div>
                            <label htmlFor="">Điện thoại <span className="text-red-500">*</span></label><br />
                            <input className="border mt-2 w-[360px] h-[45px] rounded-md  px-3 text-[12px] outline-none " type="tel" placeholder="Ex: Anh Duy"/>
                        </div>
                    </div>
                    <div className=" px-5">
                        <label >Vùng quốc gia<span className="text-red-500">*</span></label><br />
                        <select name="lang" id="lang-select" className="border w-[360px] h-[45px] mt-4 rounded-md px-3">
                            <option value="">Trung Quốc</option>
                            <option value="csharp">Hà Lan</option>
                            <option value="cpp">Lào</option>
                            <option value="php">Thái Lan</option>
                            <option value="ruby">Mỹ</option>
                            <option value="js">Úc</option>
                            <option value="dart" selected>Việt Nam</option>
                        </select>
                    </div>
                    <span className="flex mt-4 items-center space-x-3 px-5"><span className="bg-[#e8952f] px-1 py-1 rounded-full text-white text-[10px]"><AiOutlineCheck/></span><a className="text-[15px] text-[#e8952f]" href="">Tôi là khách lưu trú</a></span>
                </div>
                <div className="border boder-black  rounded-md w-[800px] pb-10 mt-4">
                    <div className="border border-b-[#bg-[#f9f9f9]] px-4 py-4 bg-[#f5f6fa] px-5 py-5">
                        <span className="font-medium text-[18px]">Phương thức thanh toán</span>
                    </div>
                    <a href="" className="text-[15px] px-5 text-left">Khi nhấp vào "Thanh toán", bạn đồng ý cung cấp các thông tin trên và đồng ý với các 
                    <span className="text-[#80c3fa] underline-offset-1 underline">điều khoản,điều kiện  </span> và 
                    <span className="text-[#80c3fa] underline-offset-1 underline"> chính sách và quyền riêng</span> tư của Vinpearl.</a>
                    <div>
                        <a href="" className="bg-[#e8952f] text-white rounded-full px-[50px] pt-3 pb-3 text-[20px] font-medium ml-[500px] " >Thanh toán</a>
                    </div>
                </div>
            </div>
            <div className="border boder-black  rounded-md w-[460px] pb-10 h-[400px]">
                <div className="border border-b-[#bg-[#f9f9f9]] px-4 py-4 bg-[#f5f6fa] px-5 py-5">
                    <span className="font-medium text-[18px]">Chuyến đi</span>
                    
                </div>
                <div className="px-5">
                    <div className=" mt-4">
                        <div className="flex items-center justify-between ">
                            <h2 className="text-[18px] font-medium">VinHolidays Fiesta Phú Quốc</h2>
                            <a className="text-[12px]" href="">Chỉnh sửa</a>
                        </div>
                        <div className="text-[13px] mt-2">
                            <div className="flex items-center space-x-2">
                                <a href="">Chủ Nhật, Th08 27, 2023</a> <BsArrowRight/>
                                <a href="">Thứ Ba, Th08 29, 2023</a>
                            </div>
                            <a href=""> 02 Đêm</a>
                        </div>
                    </div>
                    <div className=" mt-4 border-t-2 pt-4">
                        <div className="flex items-center justify-between ">
                            <h2 className="text-[18px] font-medium">Phòng 1</h2>
                            <a className="text-[18px] font-medium" href="">12.400.000đ</a>
                        </div>
                        <div className="text-[13px] mt-2">
                            <div className="flex items-center space-x-2">
                                <a href="">x1 Biệt Thự 2 Phòng Ngủ</a> 
                            </div>
                            <a className="" href=""> 1 Người lớn</a>
                        </div>
                    </div>
                    <div className=" mt-4 border-t-2 pt-4">
                        <div className="flex items-center justify-between ">
                            <h2 className="text-[18px] font-medium">Tổng cộng:</h2>
                            <a className="text-[18px] font-medium text-[#e8952f]" href="">12.400.000 đ</a>
                        </div>
                        <div className="text-[13px] mt-2">
                            <a className="" href="">Bao gồm cả thuế</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
    </div>
  )
}

export default BookingInformation
