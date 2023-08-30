import { useState } from "react";
import { AiOutlineEnvironment ,AiOutlineCalendar,AiOutlineUser,AiOutlineIdcard} from "react-icons/ai";
const Search = () => {
  const [selectedDate, setSelectedDate] = useState('');
  const handleDateChange = (event: any) => {
    const selectedDate = event.target.value;
    setSelectedDate(selectedDate);
  };
  
  return (
    <div>
        <div className="flex items-center xl:space-x-10 xl:w-[1280px] xl:mx-auto mt-[-120px] lg:space-x-4 lg:justify-center 
          sm:justify-center  
        ">
           <div className="relative">
              <input className=" border z-0 border-[#e0e0e0] xl:w-[400px] xl:h-[55px] xl:pl-[55px] 
                    lg:w-[200px] lg:h-[55px] xl:text-[16px] lg:text-[11px] lg:pl-[40px] 
                    sm:w-[180px] h-[45px] sm:text-[10px] sm:pl-[38px]" 
                    type="text" placeholder="Nhập khách sạn mà bạn muốn đến ..."/>
              <span className="absolute mt-1 xl:start-[25px] lg:start-3 top-3 lg:text-[22px]  sm:start-4"><AiOutlineEnvironment/></span>
           </div>
            <div className="flex items-center border border-[#e0e0e0] px-5 py-2">
                <span className="xl:text-[26px] mr-4 lg:text-[22px] sm:text-[12px]"><AiOutlineCalendar/></span>
                <div>
                    <div className="xl:text-[13px] xl:space-x-10 lg:space-x-8 sm:space-x-5 sm:text-[10px]">
                        <label htmlFor="">Ngày đến</label>
                        <label htmlFor="">Ngày đi</label> 
                    </div>
                    <div className="xl:text-[12px] lg:text-[12px] lg:flex sm:text-[10px] sm:flex">
                        <input 
                          className="xl:w-[90px] focus:outline-none "
                          type="date" 
                          value={selectedDate} 
                          onChange={handleDateChange}
                          min={new Date().toISOString().split('T')[0]}
                          />
                        <input 
                            className="xl:w-[90px] focus:outline-none "
                            type="date" 
                          />
                    </div>
                </div>
                
            </div>
            <div className="flex items-center border border-[#e0e0e0] px-5 py-2">
                <span className="xl:text-[23px] lg:text-[19px] mr-4"><AiOutlineUser/></span>
                <div>
                  <div className="xl:text-[13px] xl:space-x-4 lg:space-x-3 lg:text-[13px]">
                    <label htmlFor="">Số phòng </label>
                    <label htmlFor="">Số người </label>
                  </div>
                  <div className="xl:text-[13px] xl:space-x-7 lg:flex lg:text-[13px] lg:space-x-5">
                    <label htmlFor="">1 người</label>
                    <label htmlFor="">1 người</label>
                  </div>
                </div>
            </div>
            <div className="flex items-center border border-[#e0e0e0] px-5 py-4 space-x-3">
              <span className="xl:text-[23px] lg:text-[16px] mr-4"><AiOutlineIdcard/></span>
              <span className="xl:text-[14px] lg:text-[13px]">Ưu đãi</span>
            </div>
            <button className="text-white bg-[#e8952f] px-6 py-4 xl:text-[15px] lg:text-[13px]">Tìm Kiếm</button>
        </div>

    </div>
  )
}

export default Search
