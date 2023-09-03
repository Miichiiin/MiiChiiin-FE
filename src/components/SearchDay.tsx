import { useEffect, useState, useRef } from "react";
import { format, addDays, isBefore, startOfDay } from "date-fns";
import { DateRange } from "react-date-range";
import {  AiOutlineCalendar } from "react-icons/ai";

const SearchDay = () => {
    /*chọn ngày*/
  const [calendar, setCalendar] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 1),
      key: "selection",
    },
  ]);
  //Kiểm tra ngày quá khứ
    const handleDateChange = (item: any) => {
        // Kiểm tra xem ngày bắt đầu và ngày kết thúc có nằm trong quá khứ hay không
        if (isBefore(item.selection.startDate, startOfDay(new Date())) || isBefore(item.selection.endDate, startOfDay(new Date()))) {
          return; // Không cho phép chọn ngày trong quá khứ
        }
    
        setCalendar([item.selection]);
      };
      const disabledDay = (date: Date) => {
        const today = startOfDay(new Date());
        return isBefore(date, today); // Vô hiệu hóa các ngày trong quá khứ
      };
    // Dropdow
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [divClicked, setDivClicked] = useState(false); // Sử dụng để theo dõi việc bấm vào div
    const refCalen = useRef<HTMLDivElement>(null);
  
    const toggleDropdown = () => {
      setIsDropdownOpen(!isDropdownOpen);
    };
  
    const handleDivClick = () => {
      setDivClicked(true); // Khi bấm vào div, đánh dấu rằng div đã được bấm
      setIsDropdownOpen(!isDropdownOpen);
    };
  
    const handleClickOutside = (event: MouseEvent) => {
      if (!divClicked && refCalen.current && !refCalen.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
      setDivClicked(false); // Đặt lại trạng thái khi bấm ngoài div
    };
  
    const handleDropdownClick = (event: MouseEvent) => {
      event.stopPropagation(); // Ngăn chặn sự kiện click từ việc lan toả lên ngoài dropdown
    };
  
    useEffect(() => {
      document.addEventListener("click", handleClickOutside);
  
      return () => {
        document.removeEventListener("click", handleClickOutside);
      };
    }, [divClicked]); // Theo dõi biến divClicked trong dependencies
  return (
    <div>
      <div ref={refCalen} onClick={handleDivClick}  className=" flex items-center border border-[#e0e0e0] px-5 py-2 text-[#b0b4b8]">
        <span className="xl:text-[22px] mr-4 lg:text-[22px] sm:text-[12px] "><AiOutlineCalendar /></span>
          <div onClick={toggleDropdown}>
            <div className="xl:text-[12px]  lg:space-x-8 sm:space-x-5 sm:text-[9px] sm:font-medium">
              <label htmlFor="">Ngày đến</label>
              <label htmlFor="">Ngày đi</label>
            </div>
            <div className="xl:text-[12px] lg:text-[12px] lg:flex sm:text-[10px] sm:flex relative ">
              <input className="outline-none font-medium lg:text-[14px] sm:text-[8px] text-[#353c46]"
                value={`${format(calendar[0].startDate, "dd-MM-yyyy")} - ${format(
                  calendar[0].endDate,
                  "dd-MM-yyyy"
                )}`}
               
              />
            </div>
        </div>
      </div>
      {isDropdownOpen && (
            <div onClick={() =>handleDropdownClick} className="absolute ">
                <DateRange
                className="date-range lg:text-[12px] sm:text-[8px] "
                onChange={handleDateChange}
                editableDateInputs={true}
                moveRangeOnFirstSelection={false}
                ranges={calendar}
                months={2}
                showMonthAndYearPickers={false}
                showDateDisplay={false}
                showMonthArrow={true}
                minDate={startOfDay(new Date())}
                disabledDay={disabledDay}
                direction="horizontal"
                />
            </div>
         )}
    </div>
  )
}

export default SearchDay
