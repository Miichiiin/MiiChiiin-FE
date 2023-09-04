import { useState } from "react";
import HeaderHotelType from "../HotelType/HeaderHotelType"
import { AiOutlineSearch ,AiOutlineShoppingCart} from "react-icons/ai";
const Order = () => {
    const [isProductInCart, setIsProductInCart] = useState(false);
  return (
    <div>
        <HeaderHotelType/>
      <div>
        <div className="w-[1280px] mx-auto flex space-x-4">
            <div className="border w-[350px] py-10 px-5 rounded-md">
                <div className="border-b-2 pb-4 text-center">
                    <img  className="rounded-full ml-[100px]" src="data:image/png;base64,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" alt="" />
                    <p className="mt-4 font-medium text-[18px]">Vương Xuân Chiến</p>
                    <p className="mt-1 font-medium">Mã thẻ : 86868</p>
                </div>
                <div className="text-[18px]  mt-6 leading-7 ml-[70px]">
                    <label className="space-x-1"><input type="checkbox" className="w-4 h-4"/> <a href="">Thông tin tài khoản</a></label><br />
                    <label className="space-x-1"><input type="checkbox" className="w-4 h-4"/> <a href="">Ưu đãi của tôi</a></label><br />
                    <label className="space-x-1"><input type="checkbox" className="w-4 h-4"/> <a href="">Đơn hàng của tôi</a></label><br />
                    <label className="space-x-1"><input type="checkbox" className="w-4 h-4"/> <a href="">Đăng xuất</a></label>
                </div>
            </div>
            <div>
                <div className="border-b-2 w-[900px] pb-2">
                    <h2 className="text-[22px] font-medium">Đơn hàng của tôi</h2>
                </div>
                <div className="flex items-center mt-3 space-x-5 mb-10">
                    <div className="relative">
                        <span className="absolute top-3 start-1 text-[#a5a3af]"><AiOutlineSearch/></span><input className="border rounded-md py-2 text-[13px] pl-6" type="text" placeholder="Nhập đơn hàng..."/>
                    </div>
                    <select className="border py-1 px-3 rounded-md outline-none text-[#a5a3af]">
                        <option selected>Thời gian đặt</option>
                        <option>1 tuần trước</option>
                        <option>1 tháng trước</option>
                    </select>
                     <select className="border py-1 px-3 rounded-md outline-none text-[#a5a3af]">
                        <option selected>Trạng thái đơn</option>
                        <option>1 tuần trước</option>
                        <option>1 tháng trước</option>
                    </select>
                </div>
                <div>
                {isProductInCart ? (
                    <div className="border flex px-3 py-3 space-x-4 rounded-md mt-2">
                        <img className="w-[240px] h-[140px] rounded" src="https://booking-static.vinpearl.com/room_types/216b0990ea2a44079494e7a994a24d61_Hinh-anh-VinHolidays-1-Phu-Quoc-Phong-Standard-Twin-3x2-so-2.png" alt="" />
                        <div className="leading-10">
                            <span className="space-x-5 font-medium">
                                <span className="font-medium">Phòng Tiêu Chuẩn 2 Giường Đơn</span>
                                <span>Giương đơn</span>
                                <span>Trạng thái: <span className="text-[#]">Đã thanh toán</span></span>
                            </span><br />
                            <span className="font-medium">
                                <span>Dịch vụ: ....</span>
                            </span>
                            <div className=" space-x-[150px] font-medium">
                                <span>Giá tiền: <span>2.300.000 đ</span></span>
                                <span>Đặt ngày: 23/2/2023 - 25/2/2023</span>
                            </div>
                        </div>
                    </div>
                    ) : (
                    <div className="text-center leading-[80px]">
                        <div className="ml-[420px]">
                        <span className="text-[30px] "><AiOutlineShoppingCart/></span>
                        </div>
                        <p className="text-[20px]">Hiện tại chưa có sản phẩm nào trong giỏ hàng!</p>
                        <a className="rounded-2xl bg-red-500 text-white px-5 py-2 font-medium" href="">Đặt hàng ngay</a>
                    </div>
                     )}
                </div>
            </div>
        </div>
        <div>

        </div>
      </div>
    </div>
  )
}

export default Order
