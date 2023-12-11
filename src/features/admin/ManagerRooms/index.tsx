import { useGetRooms_AdminsQuery } from "@/api/admin/room_admin";
import {
  Divider,
  Input,
  Select,
  Pagination,
  Skeleton,
  DatePicker,
} from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoAddCircleOutline } from "react-icons/io5";
import dayjs from 'dayjs';
import 'dayjs/locale/vi';
import 'dayjs/plugin/utc';
import 'dayjs/plugin/timezone';
dayjs.locale('vi');
import './style.css';

export const ManagerRoom = () => {
  const today = dayjs();
  const [checkIn, setCheckIn] = useState(today);
  const [checkOut, setCheckOut] = useState(today.add(3, 'day'));

  const handleCheckInDateChange = (value:any) => {
    setCheckIn(value);
    // Automatically update checkOut to be 3 days from checkIn
  };

  const handleCheckOutDateChange = (value:any) => {
    setCheckOut(value);
  };
  const disabledDate = (current:any) => {
    // Disable dates before the check-in date
    return current && current < checkIn.startOf('day');
  };

  const { data: roomData, isLoading, isError } = useGetRooms_AdminsQuery({ check_in: checkIn?.format("YYYY-MM-DD"), check_out: checkOut?.format("YYYY-MM-DD") })
  const navigate = useNavigate();

  // phân quyền
  const dataPermission = localStorage.getItem('userAdmin')
  const currentUserPermissions = (dataPermission && JSON.parse(dataPermission).permissions) || [];
  const hasAddUserPermission = (permissions: any) => {
    return currentUserPermissions.includes(permissions);
  };


  const [searchText, setSearchText] = useState("");
  const [selectedState, setSelectedState] = useState<boolean | undefined | string>();
  const filteredData = roomData ? roomData
    .filter((item: any) =>
      item.name.toLowerCase().includes(searchText.toLowerCase())
    )
    .filter((item: any) =>
      selectedState === undefined ? true : item?.state === selectedState
    ) : [];

  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 20,
  });

  const handlePageChange = (page: number) => {
    setPagination({ ...pagination, current: page });
  };

  const paginatedData = filteredData.slice(
    (pagination.current - 1) * pagination.pageSize,
    pagination.current * pagination.pageSize
  );
  useEffect(() => {
    setPagination({ ...pagination, current: 1 });
  }, [searchText, selectedState]);

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "16px",
        }}
      >
        <div className="text-lg font-bold text-orange-500">Quản Lý Phòng</div>
        <div className='flex items-center'>
          <Input.Search placeholder="Tìm kiếm" className="mr-4" allowClear onSearch={(value) => {
            setSearchText(value)
          }} />


          <Select
            showSearch
            style={{ width: 200 }}
            placeholder="Lọc"
            defaultValue="all"
            optionFilterProp="children"
            filterOption={(input, option) => (option?.label ?? "").includes(input)}
            filterSort={(optionA, optionB) =>
              (optionA?.label ?? "").toLowerCase().localeCompare((optionB?.label ?? "").toLowerCase())
            }
            options={[
              {
                value: "all",
                label: "Tất cả",
              },
              {
                value: true,
                label: "Đang sử dụng",
              },
              {
                value: false,
                label: "Còn trống",
              },
            ]}
            onChange={(value) => {
              if (value === "all") {
                setSelectedState(undefined); // Xóa bộ lọc
              } else {
                setSelectedState(value); // Sử dụng giá trị trạng thái đã chọn
              }
            }}
          />
        </div>
        {hasAddUserPermission("add room") && (
          <button className="ml-2 px-3 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 flex items-center" onClick={() => navigate(`/admin/addroom`)}>
            <IoAddCircleOutline className="text-xl" />
          </button>
        )}
      </div>
      <div className="flex justify-center items-center space-x-4">
        <div>
          <span className="font-semibold">Check in: </span>
          <DatePicker
            onChange={handleCheckInDateChange}
            format="DD-MM-YYYY"
            value={checkIn}
            allowClear={false}
          />
        </div>
        <div>
          <span className="font-semibold">Check out: </span>
          <DatePicker
            onChange={handleCheckOutDateChange}
            format="DD-MM-YYYY"
            value={checkOut}
            allowClear={false}
            disabledDate={disabledDate}
          />
        </div>
      </div>
      <Divider />

      <div className="grid grid-cols-5 gap-3">
        {isLoading ? (
          <Skeleton active />
        ) : isError ? (
          <div>Chọn ngày checkin và checkout</div>
        ) : (
          paginatedData?.map((item: any, index: any) => (
            <React.Fragment key={index}>
              <div
                style={item.state === true ? { textShadow: "1px 1px 3px #000" } : item.state === false ? {} : {}}
                className={`px-3 pt-3 pb-5 rounded-md border shadow-lg cursor-pointer hover:shadow-xl transition duration-300 ease-in-out h-[150px] 
            ${item.state === true
                    ? 'bg-red-500 text-white border border-gray-700 '
                    : item.state === false
                      ? 'bg-green-600 border border-gray-700'
                      : ''
                  }
          `}
                onClick={() => navigate(`/admin/updateroom/${item.id}`)}
              >
                <h2 className="font-bold text-2xl text-center text-white" style={{ textShadow: "2px 2px 4px #000" }}>{item?.name}</h2>
                <p className='text-md py-2 font-semibold'>Loại phòng: <span className='font-bold'>{item?.name_category}</span></p>
                <p className='text-md font-semibold'>Tình trạng: <span className='font-bold'>{item?.state === false ? 'Còn trống ' : item?.state === true ? 'Đang sử dụng' : ''}</span></p>
              </div>
            </React.Fragment>
          ))
        )}
      </div>
      <Pagination
        current={pagination.current}
        pageSize={pagination.pageSize}
        total={filteredData?.length}
        onChange={handlePageChange}
        style={{ textAlign: "right", marginTop: "30px" }}
      />
    </div>
  );
};
