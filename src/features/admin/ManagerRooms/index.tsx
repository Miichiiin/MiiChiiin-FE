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
import { Link } from "react-router-dom";

const users = [
  {
    token: "haha",
    admin: {
      id: 2,
      id_hotel: 1,
      name: "Augustus Mitchell",
      image: "https://via.placeholder.com/640x480.png/0055aa?text=enim",
      role: "",
      permissions: [
        'add room',
        'update room',
        'delete room',
        'add voucher',
      ]
    },
  }

];
export const ManagerRoom = () => {

  const { data: roomData, isLoading, isError } = useGetRoom_AdminsQuery({})
  
  const [removeRoom] = useRemoveRoom_AdminMutation();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(5);
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // phân quyền
  const [hasAddUserPermission, setHasAddUserPermission] = useState(
    users[0].admin.permissions.includes("add room") &&
    users[0].admin.permissions.includes("update room") &&
    users[0].admin.permissions.includes("delete room")
  );
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
            {hasAddUserPermission && (
              <div>
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
                <Link className="mx-2 px-4 py-1 border border-blue-700 rounded" to={`/admin/updateroom/${item.id}`}>Sửa</Link>
              </div>
            )}
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
        {hasAddUserPermission && (
          <button className="ml-2 px-2 py-2 bg-blue-500 text-white rounded-md">
            <Link to={`/admin/addroom`}>Thêm phòng</Link>
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
