import { useGetRoom_AdminsQuery } from "@/api/admin/room_admin";
import {
  Divider,
  Radio,
  Input,
  Select,
  Pagination,
  Skeleton,
} from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoAddCircleOutline } from "react-icons/io5";

export const ManagerRoom = () => {
  const { data: roomData, isLoading, isError } = useGetRoom_AdminsQuery({})
  const navigate = useNavigate();

  // phân quyền
  const dataPermission = localStorage.getItem('userAdmin')
  const currentUserPermissions = (dataPermission && JSON.parse(dataPermission).permissions) || [];
  const hasAddUserPermission = (permissions: any) => {
    return currentUserPermissions.includes(permissions);
  };


  const [searchText, setSearchText] = useState("");
  const [selectionType, setSelectionType] = useState<'checkbox'>('checkbox');
  const [selectedState, setSelectedState] = useState<boolean| undefined | string>();
  const filteredData = roomData ? roomData
    .filter((item:any) =>
      item.name.toLowerCase().includes(searchText.toLowerCase())
    )
    .filter((item:any) =>
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
  if (isLoading) {
    return <Skeleton active />;
  }
  if (isError) {
    return <div>Có lỗi xảy ra khi tải thông tin dịch vụ.</div>;
  }
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
      <Radio.Group
        onChange={({ target: { value } }) => {
          setSelectionType(value);
        }}
        value={selectionType}
      ></Radio.Group>
      <Divider />
      {/* <Table
        columns={columns}
        dataSource={filteredData}
        pagination={false}
      /> */}
      <div className="grid grid-cols-5 gap-3">
        {paginatedData?.map((item: any, index: any) => (
          <React.Fragment key={index}>
            <div
              style={item.state === true ? { textShadow: "1px 1px 3px #000"  } : item.state === false ? { } : {}}
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
              <p className='text-md font-semibold'>Tình trạng: <span className='font-bold'>{item?.state === false ? 'Còn trống ' : item?.state === true ? 'Đang sử dụng'  : ''}</span></p>

              {/* {selectedRoom && selectedRoom.id === item.id && (
                <div className="flex justify-center items-center mt-3">
                  {hasAddUserPermission("delete room") && (
                    <Popconfirm
                      title="Xóa sản phẩm"
                      description="Bạn có muốn xóa không??"
                      onConfirm={() => {
                        removeRoom(selectedRoom.id).unwrap().then(() => {
                          message.success("Xóa thành công");
                          setSelectedRoom(null); // Clear the selected room after deletion
                        })
                      }}
                      okText="Có"
                      cancelText="Không"
                    >
                      <button
                        className='mr-2 px-3 py-2 hover:bg-red-600 bg-red-500 text-white rounded-md'
                      >
                        Xóa
                      </button>
                    </Popconfirm>
                  )}
                  {hasAddUserPermission("update room") && (
                    <button className='mr-2 px-3 py-2 hover:bg-cyan-600 bg-cyan-500 text-white rounded-md' onClick={() => navigate(`/admin/updateroom/${selectedRoom.id}`)}>
                      Sửa
                    </button>
                  )}
                </div>
              )} */}
            </div>
          </React.Fragment>
        ))}
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
