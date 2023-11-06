
import { useGetService_adminQuery, useRemoveService_adminMutation } from "@/api/admin/service_admin";
import {
  Table,
  Divider,
  Radio,
  Button,
  Select,
  Input,
  Image,
  Popconfirm,
  Pagination,
  message,
  Skeleton,
} from "antd";
import type { ColumnsType } from "antd/es/table";
import { useState, useEffect } from "react";
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
        'add service',
        'update service',
        'delete service',
        'add voucher',
      ]
    },
  }

];
export const ServiceManagement = () => {
  const { data: visibleItems, isLoading, isError } = useGetService_adminQuery();
  const [removeService] = useRemoveService_adminMutation();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(5);
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  // phân quyền
  const [hasAddUserPermission, setHasAddUserPermission] = useState(
    users[0].admin.permissions.includes("add service") &&
    users[0].admin.permissions.includes("update service") &&
    users[0].admin.permissions.includes("delete service")
  );
  interface DataType {
    key: string;
    name: string;
    quantity: number;
    price: number;
    status: string | number;
    image: string;
    description: string; // Thêm description vào DataType
  }

  const columns: ColumnsType<DataType> = [
    {
      title: "Stt",
      dataIndex: "id",
      key: "id", // Đổi từ 'id' thành 'key'
    },
    {
      title: "Tên dịch vụ",
      dataIndex: "name",
      key: "name",
      render: (text: any, item: any) => {
        return (
          <>
            {hasAddUserPermission && (
              <Link to={`/admin/updateservice/${item.id}`}>{text}</Link>
            )}
          </>
        )
      }
    },
    {
      title: "Giá dịch vụ",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Hình ảnh",
      dataIndex: "image",
      key: "image",
      render: (text: any) => <Image src={text} width={100} height={100}/>,
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Trạng thái",
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
      title: "Mô tả",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Thao tác",
      dataIndex: "action",
      key: "action",
      render: (_, item: any) => {
        return (
          <>
            {hasAddUserPermission && (
             <div className="flex items-center">
               <Popconfirm
                title="Xóa sản phẩm"
                description="Bạn có muốn xóa không??"
                onConfirm={() => {
                  removeService(item.id).unwrap().then(() => {
                    message.success("Xóa thành công");
                  })
                }}
                okText="Có"
                cancelText="Không"
              >
                <Button danger>Xóa</Button>
              </Popconfirm>
              <Link className="mx-2 px-4 py-1 border border-blue-700 rounded" to={`/admin/updateservice/${item.id}`}>Sửa</Link>
             </div>
            )}

          </>
        )
      }
    }
  ];

  const [data, setData] = useState<DataType[]>([]);
  useEffect(() => {
    if (visibleItems) {
      const formattedData: DataType[] = visibleItems.map((item: any) => ({
        key: item.id,
        name: item.name,
        price: item.price,
        image: item.image,
        quantity: item.quantity,
        status: item.status,
        description: item.description,
      }));
      setData(formattedData);
    }
  }, [visibleItems]);

  useEffect(() => {
    if (visibleItems) {
      const startIndex = (currentPage - 1) * pageSize;
      const endIndex = startIndex + pageSize;

      const currentData = visibleItems.slice(startIndex, endIndex);

      setData(currentData);
    }
  }, [visibleItems, currentPage, pageSize]);
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
    return <div>Error</div>;
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
        <div className="text-lg font-semibold">Quản Lý Dịch Vụ</div>
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
                value: 0,
                label: "Đang chờ",
              },
              {
                value: 2,
                label: "Hoạt động",
              }
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
            <Link to={`/admin/addservice`}>Thêm dịch vụ</Link>
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
      <div className="table-container">
        <Table
          columns={columns}
          dataSource={filteredData}
          className="custom-table"
          pagination={false}
        />
        <Pagination
          current={currentPage}
          total={visibleItems?.length || 0}
          pageSize={pageSize}
          onChange={handlePageChange}
          showSizeChanger={false}
          style={{ textAlign: "right", marginTop: "30px" }}
        />
      </div>
    </div>
  );
};
