import { useGetRoom_AdminsQuery, useRemoveRoom_AdminMutation } from "@/api/admin/room_admin";
import {
  Table,
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
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";


export const ManagerRoom = () => {

  const { data: roomData, isLoading, isError } = useGetRoom_AdminsQuery({})
  const navigate = useNavigate();
  const [removeRoom] = useRemoveRoom_AdminMutation();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(5);
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

   // phân quyền
 const dataPermission = localStorage.getItem('userAdmin')
 const currentUserPermissions = (dataPermission && JSON.parse(dataPermission).permissions) || [];  
 const hasAddUserPermission = (permissions:any) => {
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
      //render: (_, __, index) => <span>{index + 1}</span>,
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
  const [data, setData] = useState<DataType[]>([]);
  // useEffect(() => {
  //   if (roomData) {
  //     const formattedData: DataType[] = roomData.map((item: any) => ({
  //       key: item.id,
  //       name: item.name,
  //       name_category: item.name_category,
  //       name_hotel: item.name_hotel,
  //       status: item.status,
  //     }));
  //     setData(formattedData);
  //   }
  // }, [roomData]);

  useEffect(() => {
    if (roomData) {
      const startIndex = (currentPage - 1) * pageSize;
      const endIndex = startIndex + pageSize;

      const currentData = roomData.slice(startIndex, endIndex);

      setData(currentData);
    }
  }, [roomData, currentPage, pageSize]);

  const [searchText, setSearchText] = useState("");
  const [selectionType, setSelectionType] = useState<'checkbox'>('checkbox');
  const [selectedStatus, setSelectedStatus] = useState<string | undefined>(undefined);

  const filteredData = data ? data
    .filter((item: DataType) =>
      item.name.toLowerCase().includes(searchText.toLowerCase())
    )
    .filter((item: DataType) =>
      selectedStatus === undefined ? true : item.status === selectedStatus
    ) : [];
    if (isLoading) {
      return <Skeleton active/>;
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
        <div className="text-lg font-semibold">Quản Lý Phòng</div>
        <div className='flex items-center'>
          <Input.Search placeholder="Tìm kiếm" className="mr-4" allowClear onSearch={(value) => setSearchText(value)} />
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
                value: 1,
                label: "Đã ẩn",
              },
              {
                value: 2,
                label: "Hoạt động",
              },
              {
                value: 0,
                label: "Đang chờ",
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
          <button className="ml-2 px-3 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600" onClick={()=>navigate(`/admin/addroom`)}>
            Thêm phòng
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
      <Table
        columns={columns}
        dataSource={filteredData}
        pagination={false}
      />
      <Pagination
        current={currentPage}
        total={roomData?.length}
        pageSize={pageSize}
        onChange={handlePageChange}
        showSizeChanger={false}
        style={{ textAlign: "right", marginTop: "30px" }}
      />
    </div>
  );
};
