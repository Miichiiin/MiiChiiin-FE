
import { useGetService_adminQuery, useRemoveService_adminMutation } from "@/api/admin/service_admin";
import {
  Table,
  Divider,
  Radio,
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
import { AiOutlineTool } from "react-icons/ai";
import { BiTrash } from "react-icons/bi";
import { IoAddCircleOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";


export const ServiceManagement = () => {
  const { data: visibleItems, isLoading, isError } = useGetService_adminQuery();
  const [removeService] = useRemoveService_adminMutation();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(5);
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  const navigate = useNavigate();
  // phân quyền
  const dataPermission = localStorage.getItem('userAdmin')
  const currentUserPermissions = (dataPermission && JSON.parse(dataPermission).permissions) || [];
  const hasAddUserPermission = (permissions: any) => {
    return currentUserPermissions.includes(permissions);
  };
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
      render: (text: any) => <Image src={text} width={100} height={100} />,
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

            <div className="flex items-center">
              {hasAddUserPermission("update service") && (
                <button className="mr-2 px-3 py-2 hover:bg-cyan-600 bg-cyan-500 text-white rounded-md" onClick={() => navigate(`/admin/updateservice/${item.id}`)}><AiOutlineTool className="text-lg" /></button>
              )}
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
                  <button className="mr-2 px-3 py-2 hover:bg-red-600 bg-red-500 text-white rounded-md" ><BiTrash className="text-lg" /></button>
                </Popconfirm>
              )}

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

  if (isLoading) {
    return <Skeleton active />;
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
        <div className="text-lg font-bold text-orange-500">Quản Lý Dịch Vụ</div>
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
        {hasAddUserPermission("add service") && (
          <button className="ml-2 px-3 py-2 hover:bg-blue-600 bg-blue-500 text-white rounded-md" onClick={() => navigate(`/admin/addservice`)}>
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
