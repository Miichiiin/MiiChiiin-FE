import { useGetComfortQuery, useRemoveComfortMutation } from "@/api/admin/comfort_admin";
import {
  Table,
  Divider,
  Radio,
  Input,
  Select,
  Button,
  Popconfirm,
  message,
  Image,
  Skeleton,
} from "antd";
import type { ColumnsType } from "antd/es/table";
import { useState } from "react";
import { Link } from "react-router-dom";

const users = [
  {
   token: "haha",
   admin:{
     id: 2,
     id_hotel: 1,
     name: "Augustus Mitchell",
     image: "https://via.placeholder.com/640x480.png/0055aa?text=enim",
     role: "",
     permissions: [
       'add comfort',
       'update comfort',
       'delete comfort',
       'add voucher',
     ]
   },
  }
 
];
export const ManagerUtilities = () => {
  // phân quyền
  const [hasAddUserPermission, setHasAddUserPermission] = useState(
    users[0].admin.permissions.includes("add comfort") &&
    users[0].admin.permissions.includes("update comfort") &&
    users[0].admin.permissions.includes("delete comfort")
  );

  const [selectedStatus, setSelectedStatus] = useState<string | undefined>(undefined);
  const [searchText, setSearchText] = useState("");
  const [selectedRows, setSelectedRows] = useState<DataType[]>([]);
  const [selectionType, setSelectionType] = useState<'checkbox'>('checkbox');
  const { data: Ultilities, isLoading, isError } = useGetComfortQuery({});
  const [removeUtility] = useRemoveComfortMutation();

  interface DataType {
    key: number;
    id: string | number;
    name: string;
    description: string;
    status: string | number;
    alt: string;
  }
  const data = Ultilities?.map(({ id, name, description,status, alt }: DataType) => ({
    key: id,
    name,
    description,
    status,
    alt
  }))

  //lọc dữ liệu 
  const filteredData = data ? data
    .filter((item: DataType) =>
      item.name.toLowerCase().includes(searchText.toLowerCase())
    )
    .filter((item: DataType) =>
      selectedStatus === undefined ? true : item.status === selectedStatus
    ) : [];


  const columns: ColumnsType<DataType> = [
    {
      title: "#",
      dataIndex: "key",
    },
    {
      title: "Tên tiện ích",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      key: "description",
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
      }
    },
    {
      title: "Icon",
      dataIndex: "alt",
      key: "alt",
    },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: any) => (
        <div className="flex space-x-2">
          {hasAddUserPermission && (
            <Popconfirm
              title="Bạn có chắc chắn muốn xóa?"
              onConfirm={() => {
                removeUtility(record.key).unwrap().then(() => {
                  message.success("Xóa thành công");
                });
              }}
              okText="Xóa"
              cancelText="Hủy"
            >
              <button className="mr-2 text-white font-semibold py-2 px-4 hover:bg-red-400  border border-red-400 rounded-lg tracking-wide bg-red-500 hover:text-white">
                Xóa
              </button>
            </Popconfirm>
          )}
          {hasAddUserPermission && (
            <button className="mr-2 text-white font-semibold py-2 px-4 hover:bg-blue-400  border border-blue-400 rounded-lg tracking-wide bg-blue-500 hover:text-white">
              <Link to={`/admin/updateUtilities/${record.key}`}>Sửa</Link>
            </button>
          )}
        </div>
      ),
    }
  ];

  // Alert xác nhận xoá
  const confirmDelete = (id: number) => {
    const isConfirmed = window.confirm('Bạn có chắc chắn muốn xóa comment này?');
    if (isConfirmed) {
      removeUtility(id).unwrap().then(() => {
        setSelectedRows((prevSelectedRows) => prevSelectedRows.filter((row) => row.key !== id));
      });
    }
  };

  if (isLoading) return <Skeleton active/>;
  if (isError) return <div>Đã xảy ra lỗi khi tải dữ liệu</div>;
  return (
    <div>
      <div
        className='flex justify-between items-center mb-4'
      >
        <div className="text-lg font-semibold">Quản Lý Utilities</div>
        <div className="flex items-center">
          {/*phần tìm kiếm và lọc */}
          <Input.Search placeholder="Tìm kiếm" className="mr-4" allowClear onSearch={(value) => setSearchText(value)} />
          <Select
            showSearch
            style={{ width: 200 }}
            placeholder="Search to Select"
            optionFilterProp="children"
            filterOption={(input, option) =>
              (option?.label ?? "").includes(input)
            }
            filterSort={(optionA, optionB) =>
              (optionA?.label ?? "")
                .toLowerCase()
                .localeCompare((optionB?.label ?? "").toLowerCase())
            }
            options={[
              {
                value: "all",
                label: "Tất cả",
              },
              {
                value: 0,
                label: "Đang chờ",
              },
              {
                value: 1,
                label: "Đã ẩn",
              },
              {
                value: 2,
                label: "Hoạt động",
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
          {/*Nút Thêm */}
        </div>
        {hasAddUserPermission && (
          <Button type="primary" className="ml-2 mt-1 bg-gray-500">
          <Link to={`/admin/addUtilities`}>Thêm</Link>
        </Button>
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
      />
    </div>
  );
};
