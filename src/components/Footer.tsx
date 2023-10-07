import { AiFillEnvironment ,AiTwotoneMail,AiTwotonePhone} from "react-icons/ai";
const Footer = () => {
  return (
    <div>
        <div className="bg-[#151b40] w-full mt-10 pt-10 pb-10 " >
            <div className="w-[1280px] mx-auto grid grid-cols-4 gap-10">
                <div className="text-white">
                    <img className="mb-4" src="https://vinpearl.com/themes/porto/images/logos/logo_vp_footer.svg" alt="" />
                    <p className="flex  space-x-2"><span className="mt-2 text-[#f2ba50] "><AiFillEnvironment/></span> <span className="text-[14px]">Đảo Hòn Tre, Phường Vĩnh Nguyên, Thành phố Nha Trang, Tỉnh Khánh Hòa, Việt Nam</span></p>
                    <p className="text-[#f2ba50] flex items-center space-x-2 mt-4"><AiTwotoneMail/><span>callcenter@vinpearl.com</span></p>
                    <p className="text-[#f2ba50] flex items-center space-x-2 mt-4 mb-4"><AiTwotonePhone/><span> 1900 23 23 89 (Nhánh số 3)</span></p>
                    <p className="text-[12px] mb-8">
                      <span>Chủ tài khoản: <br />
                            Công ty cổ phần Miichi <br />
                            Tài khoản ngân hàng số: 9124412488166 (VND) <br />
                            Ngân hàng thương mại cổ phần Kỹ Thương Việt Nam (Techcombank) – Hội sở
                      </span>
                    </p>
                    <p className="text-[12px] mb-8">
                      <span>
                            Số ĐKKD: <br />
                            4200456848. ĐK lần đầu 26/7/2006. <br />
                            ĐK thay đổi tại từng thời điểm <br />
                            Nơi cấp: <br />
                            Sở kế hoạch và đầu tư tỉnh Khánh Hòa  
                      </span>
                    </p>
                    <img className="w-[40%]" src="https://vinpearl.com/themes/porto/img/vinpearl/logo-da-thong-bao-website-voi-bo-cong-thuong.png" alt="" />
                </div>
                <div className="text-white leading-10">
                    <p className="text-[21px] hover:text-[#f2ba50]">Về Miichi</p>
                      <p className="text-[14px] hover:text-[#f2ba50]">Về chúng tôi</p>
                      <p className="text-[14px] hover:text-[#f2ba50]">Liên hệ</p>
                      <p className="text-[14px] hover:text-[#f2ba50]">Tuyển dụng</p>
                      <p className="text-[14px] hover:text-[#f2ba50]">Câu hỏi thường gặp</p>
                      <p className="text-[14px] hover:text-[#f2ba50]">Bản đồ trang</p>
                      <p className="text-[21px] mt-[80px] hover:text-[#f2ba50]">Điểm đến nổi bật</p>
                      <p className="text-[14px] hover:text-[#f2ba50]">Nam Hội An</p>
                      <p className="text-[14px] hover:text-[#f2ba50]">Nha Trang</p>
                      <p className="text-[14px] hover:text-[#f2ba50]">Phú Quốc</p>
                </div>
              <div className="text-white leading-10">
                  <p className="text-[21px] hover:text-[#f2ba50]">Điều khoản & Quy định</p>
                  <p className="text-[14px] hover:text-[#f2ba50]">Điều khoản chung</p>
                  <p className="text-[14px] hover:text-[#f2ba50]">Quy định chung</p>
                  <p className="text-[14px] hover:text-[#f2ba50]">Quy định về thanh toán</p>
                  <p className="text-[14px] hover:text-[#f2ba50]">Quy định về xác nhận thông tin đặt phòng</p>
                  <p className="text-[14px] hover:text-[#f2ba50]">Chính sách giải quyết tranh chấp</p>
                  <p className="text-[14px] hover:text-[#f2ba50]">Chính sách quyền riêng tư</p>

                  <p className="text-[21px] hover:text-[#f2ba50] mt-8">Tag</p>
                  <p className="text-[14px] hover:text-[#f2ba50]">Du lịch Phú Quốc</p>
                  <p className="text-[14px] hover:text-[#f2ba50]">Du lịch Nha Trang</p>
                  <p className="text-[14px] hover:text-[#f2ba50]">Du lịch Hội An</p>
                  <p className="text-[14px] hover:text-[#f2ba50]">Du lịch Đà Nẵng</p>
             </div>
             <div className="text-white leading-10">
                <p className="text-[21px] hover:text-[#f2ba50]">Tin tức & Sự kiện</p>
                <p className="text-[14px] hover:text-[#f2ba50]">Tin công ty</p>
                <p className="text-[14px] hover:text-[#f2ba50]">Cẩm nang du lịch</p>
                <p className="text-[14px] hover:text-[#f2ba50]">Thành tựu</p>
                <div>
                  
                </div>
            </div>
            </div>
           
        </div>
        <div className="bg-[#0a0f2b] w-full h-[40px] pt-2">
            <div className="flex items-center w-[1280px] mx-auto justify-between  ">
              <span className="text-white">Copyright © 2022 Vinpearl.com. All rights reserved</span>
              <div className="flex space-x-3">
                <img src="https://vinpearl.com/themes/porto/images/logos/facebook.svg" alt="" />
                <img src="https://vinpearl.com/themes/porto/images/logos/youtube.svg" alt="" />
                <img src="https://vinpearl.com/themes/porto/images/logos/instagram.svg" alt="" />
              </div>
            </div>
        </div>
    </div>
  )
}

export default Footer
