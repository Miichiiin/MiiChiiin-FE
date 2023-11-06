
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
} from "antd";
import type { ColumnsType } from "antd/es/table";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";


export const ServiceManagement = () => {
  const { data: visibleItems } = useGetService_adminQuery();
  const [removeService] = useRemoveService_adminMutation();
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
    key: string;
    name: string;
    quantity: number;
    price: number;
    status: string;
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
            {hasAddUserPermission("update service") && (
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
      render: (text: any, item: any) => {
        return (
          <>
           
             <div className="flex items-center">
             {hasAddUserPermission("delete service") && (
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
               )}
               {
                hasAddUserPermission("update service") && (
                  <Link className="mx-2 px-4 py-1 border border-blue-700 rounded" to={`/admin/updateservice/${item.id}`}>Sửa</Link>
                )
               }
             </div>
           

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
                label: "Có sẵn",
              },
              {
                value: 0,
                label: "Đã thuê",
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
        {hasAddUserPermission("add service") && (
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
