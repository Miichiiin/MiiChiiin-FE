import { useGetRoom_AdminsQuery, useRemoveRoom_AdminMutation } from "@/api/admin/room_admin";
import {

  Divider,
  Radio,
  Input,
  Select,
  Button,
  Popconfirm,
  message,
  Pagination,
  Skeleton,
} from "antd";
import type { ColumnsType } from "antd/es/table";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoAddCircleOutline } from "react-icons/io5";

export const ManagerRoom = () => {
  const { data: roomData, isLoading, isError } = useGetRoom_AdminsQuery({})
  const navigate = useNavigate();
  const [removeRoom] = useRemoveRoom_AdminMutation();

  // phân quyền
  const dataPermission = localStorage.getItem('userAdmin')
  const currentUserPermissions = (dataPermission && JSON.parse(dataPermission).permissions) || [];
  const hasAddUserPermission = (permissions: any) => {
    return currentUserPermissions.includes(permissions);
  };
  interface DataType {
    id: number;
    name: string;
    name_category: string;
    name_hotel: string;
    status: number | string;
  }

  const columns: ColumnsType<DataType> = [
    {
      title: "#",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Tên phòng",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Tên loại phòng",
      dataIndex: "name_category",
      key: "name_category",
    },
    {
      title: "Tên khách sạn",
      dataIndex: "name_hotel",
      key: "name_hotel",
    },
    {
      title: "Trang thái",
      dataIndex: "status",
      key: "status",
      render: (_, record) => {
        let statusText = '';

        if (record.status === 2) {
          statusText = 'Hoạt động';
        } else if (record.status === 1) {
          statusText = 'Đã ẩn';
        } else if (record.status === 0) {
          statusText = 'Đang chờ';
        }

        return <span>{statusText}</span>;
      },
    },
    {
      title: "Hành động",
      key: "action",
      render: (_: any, item: any) => {
        return (
          <>

            <div>
              {hasAddUserPermission("delete room") && (
                <Popconfirm
                  title="Xóa sản phẩm"
                  description="Bạn có muốn xóa không??"
                  onConfirm={() => {
                    removeRoom(item.id).unwrap().then(() => {
                      message.success("Xóa thành công");
                    })
                  }}
                  okText="Có"
                  cancelText="Không"
                >
                  <Button danger>Xóa</Button>
                </Popconfirm>
              )}
              {hasAddUserPermission("update room") && (
                <Link className="mx-2 px-4 py-1 border border-blue-700 rounded" to={`/admin/updateroom/${item.id}`}>Sửa</Link>
              )}
            </div>

          </>
        )
      }
    }
  ];

  const [searchText, setSearchText] = useState("");
  const [selectionType, setSelectionType] = useState<'checkbox'>('checkbox');
  const [selectedStatus, setSelectedStatus] = useState<string | undefined>(undefined);
  const filteredData = roomData ? roomData
    .filter((item: DataType) =>
      item.name.toLowerCase().includes(searchText.toLowerCase())
    )
    .filter((item: DataType) =>
      selectedStatus === undefined ? true : item.status === selectedStatus
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
  }, [searchText, selectedStatus]);
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
            placeholder="Search to Select"
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
                value: 0,
                label: "Ngừng hoạt động",
              },
              {
                value: 1,
                label: "Đang sử dụng",
              },
              {
                value: 2,
                label: "Trống",
              },
              
            ]}
            onChange={(value) => {
              if (value === "all") {
                setSelectedStatus(undefined); // Xóa bộ lọc
              } else {
                setSelectedStatus(value); // Sử dụng giá trị trạng thái đã chọn
              }
            }}
          />
        </div>
        {hasAddUserPermission("add room") && (
          <button className="ml-2 px-3 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 flex items-center" onClick={() => navigate(`/admin/addroom`)}>
            <IoAddCircleOutline  className="text-xl" />
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
              className={`px-3 pt-3 pb-5 rounded-md border shadow-lg cursor-pointer hover:shadow-xl transition duration-300 ease-in-out h-[150px] 
                ${item.status === 1
                  ? 'bg-orange-600 text-white border border-black'
                  : item.status === 0
                    ? 'bg-red-500 text-white cursor-not-allowed '
                    // : selectedRoom && selectedRoom.id === item.id 
                    // ? 'bg-blue-700 cursor-pointer border-2 border-blue-700 '
                    : 'bg-green-700 cursor-pointer'
                  }
              `}
              onClick={() => navigate(`/admin/updateroom/${item.id}`)}
            >
              <h2 className="font-bold text-2xl text-center text-white">{item?.name}</h2>
              <p className='text-md py-2'>Loại phòng: <span className='font-bold'>{item?.name_category}</span></p>
              <p className='text-md'>Tình trạng: <span className='font-bold'>{item?.status === 2 ? 'Trống ' : item?.status === 1 ? 'Đang sử dụng' : item?.status === 0 ? 'Ngừng hoạt động': ''}</span></p>

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
