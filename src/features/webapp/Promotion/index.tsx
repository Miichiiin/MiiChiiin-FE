import { useEffect, useState } from "react";
import { AiFillWechat, AiOutlineCalendar } from "react-icons/ai";
import { useGetVoucherQuery } from "@/api/admin/voucher";
import Header from "@/components/Header";

const Promotion = () => {
  const [visibleVoucherCount, setVisibleVoucherCount] = useState(3);
  const { data } = useGetVoucherQuery();

  // Hàm xử lý sự kiện khi ấn nút "Xem thêm voucher"
  const handleShowMore = () => {
    setVisibleVoucherCount(visibleVoucherCount + 3); // Tăng số lượng voucher hiển thị
  };

  if (!data) {
    return null; // Hoặc bạn có thể trả về một thông báo lỗi khác nếu cần
  }
   //srollto
   useEffect(() =>{
    window.scrollTo({ top: 0, behavior: 'smooth' });
  })

  return (
    <div>
      <Header/>
      <div className="w-[1280px] mx-auto mt-10 relative">
        {/* Nút chat */}
        <div className="fixed bottom-4 z-10 right-4 w-20 h-20 bg-[#f2ba50] border border-gray-300 rounded-full shadow-md p-4 ">
          {/* Nội dung box chat */}
          <span className="text-[50px] text-white">
            <AiFillWechat />
          </span>
        </div>
      </div>

      <div className="w-[1280px] mx-auto mt-[70px] relative">
        <h1 className="text-[40px] font-bold mb-8">Tin nổi bật</h1>
        <div className="flex space-x-10">
          {/* Voucher lớn */}
          <div className="relative overflow-hidden">
            <img
              src="https://statics.vinpearl.com/styles/752x468/public/2023_08/season-of-smile-banner_1693304230.jpg.webp?itok=hc6PvhB7"
              alt="Image"
              className=" rounded-md w-[850px] object-cover transition-transform transform scale-100 hover:scale-105 duration-300"
            />
            <div className="w-[700px] text-left text-white absolute inset-0 top-[250px] start-7">
              <p className="text-[25px] font-bold">
                Trọn bộ kinh nghiệm, điểm đến & combo du lịch Phú Quốc từ A -
                Z 2023
              </p>
              <p className="font-medium pb-3">
                Du lịch Phú Quốc với trọn bộ cẩm nang về thời điểm, khí hậu,
                phương tiện đi lại, kế hoạch ăn - chơi - ngủ - nghỉ từ A - Z
                sau đây sẽ giúp mọi du khách tận hưởng kỳ nghỉ của mình trọn
                vẹn nhất!
              </p>
              <a
                className="px-3 py-2 rounded-md bg-[#e8952f] text-white font-medium"
                href=""
              >
                Khám phá
              </a>
            </div>
          </div>

          {/* Các voucher nhỏ */}
          <div>
            <div className=" overflow-hidden">
              <img 
                className="mb-6 w-[450px] h-[240px] rounded-md object-cover transition-transform transform scale-100 hover:scale-105 duration-300"
                src="https://statics.vinpearl.com/styles/365x240/public/2023_06/spa-retreat-package-banner_1685706136.jpg.webp?itok=QetmDjCj"
                alt=""
              />
              <div className="w-[380px] text-left text-white absolute inset-0 top-[250px] start-[880px] ">
                <p className="text-[18px] font-bold ">
                  Kinh nghiệm du lịch Nha Trang tự túc siêu tiết kiệm 2023
                </p>
              </div>
            </div>
            <div className="overflow-hidden">
              <img
                className="mb-6 w-[450px] h-[240px] rounded-md object-cover transition-transform transform scale-100 hover:scale-105 duration-300"
                src="https://statics.vinpearl.com/styles/358x223/public/2022_07/cau-rong-da-nang_1657938152.jpg.webp?itok=5nKAbeZd"
                alt=""
              />
              <div className="w-[380px] text-left text-white absolute inset-0 top-[500px] start-[880px]">
                <p className="text-[18px] font-bold">
                  Du lịch Đà Nẵng vui quên lối về trọn bộ cẩm nang A-Z
                </p>
              </div>
            </div>
          </div>
        </div>

        <a
          className="text-[23px] font-medium pb-2 border-b-2 border-[#f2ba50] "
          href=""
        >
          Ưu Đãi 
        </a>

      </div>

      {/* Danh sách voucher */}
      <div className="w-[1280px] mx-auto mt-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8 mb-8 ">
          {data.slice(0, visibleVoucherCount).map((hotel:any) => (
            <div
              key={hotel.id}
              className="bg-white rounded-md shadow-md transform transition-transform hover:shadow-xl "
            >
              <img
                src={hotel.image}
                alt="Image"
                className="w-[450px] h-[280px] rounded-tl-md rounded-tr-md rounded-bl-md rounded-br-md object-cover transform scale-100 duration-300  transition-transform"
              />
              <span className="flex items-center  space-x-2 text-[#e94e4e] font-bold mt-5 ml-5">
                <span className="">{hotel.name_hotel}</span>
              </span>
              <h2 className="mt-2 font-bold ml-5">{hotel.name}</h2>
              <span className="flex items-center space-x-1 text-[#82888f] ml-5">
                  <span>{hotel.description}</span>
              </span>
              <span className="flex items-center space-x-1 ml-5 mt-3 font-medium ">
                  <span>Hạn áp dụng:</span>
                </span>
              <div className="flex items-center space-x-4 mb-2 mt-1 ml-4">
                <span className="flex items-center space-x-1 text-[#82888f] font-medium">
                  <AiOutlineCalendar class="text-xl mr-2"/>
                  <span>{hotel.start_at}-{hotel.expire_at}</span>
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Nút "Xem thêm voucher" */}
        {visibleVoucherCount < data.length && (
          <div className="flex justify-center mt-4">
            <button
              onClick={handleShowMore}
              className="bg-[#e8952f] text-white px-4 py-2 rounded-full transform transition-transform hover:scale-105 duration-300"
            >
              Xem thêm voucher
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Promotion;
