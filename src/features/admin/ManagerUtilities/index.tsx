import { useGetComfortQuery, useRemoveComfortMutation } from "@/api/admin/comfort_admin";
import {
  Table,
  Divider,
  Radio,
  Input,
  Select,
  Popconfirm,
  message,
  Skeleton,
  Switch,
} from "antd";
import type { ColumnsType } from "antd/es/table";
import { useState } from "react";
import { AiOutlineTool } from "react-icons/ai";
import { BiTrash } from "react-icons/bi";
import { IoAddCircleOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";



export const ManagerUtilities = () => {
  // phân quyền
  const dataPermission = localStorage.getItem('userAdmin')
  const currentUserPermissions = (dataPermission && JSON.parse(dataPermission).permissions) || [];
  const hasAddUserPermission = (permissions: any) => {
    return currentUserPermissions.includes(permissions);
  };

  const [selectedStatus, setSelectedStatus] = useState<string | undefined>(undefined);
  const [searchText, setSearchText] = useState("");
  const [selectionType, setSelectionType] = useState<'checkbox'>('checkbox');
  const { data: Ultilities, isLoading, isError } = useGetComfortQuery({});
  const [removeUtility, { isLoading: isRemoving }] = useRemoveComfortMutation();
  const navigate = useNavigate();
  interface DataType {
    key: number;
    id: string | number;
    name: string;
    description: string;
    status: string | number;
    alt: string;
  }
  const data = Ultilities?.map(({ id, name, description, status, alt }: DataType) => ({
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
        return <Switch className="bg-gray-500" checkedChildren="Hoạt động" unCheckedChildren="Đang chờ" defaultChecked={record.status === 2} />
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
        <div className="flex">
          {hasAddUserPermission("update comfort") && (
            <button className="mr-2 px-3 py-2 hover:bg-cyan-600 bg-cyan-500 text-white rounded-md" onClick={() => navigate(`/admin/updateUtilities/${record.key}`)}>
              <AiOutlineTool className="text-lg" />
            </button>
          )}
          {hasAddUserPermission("delete comfort") && (
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
              <button className='hidden mr-2 px-3 py-2 hover:bg-red-600 bg-red-500 text-white rounded-md'>
                <BiTrash className="text-lg" />
              </button>
            </Popconfirm>
          )}
        </div>
      ),
    }
  ];


  if (isLoading) return <Skeleton active />;
  if (isError) return <div>Đã xảy ra lỗi khi tải dữ liệu</div>;
  if (isRemoving) {
    message.loading({ content: 'Đang xóa ...', key: 'updatable', duration: 0.5 });
  }
  return (
    <div>
      <div
        className='flex justify-between items-center mb-4'
      >
        <div className="text-lg font-bold text-orange-500">Quản Lý tiện ích</div>
        <div className="flex items-center">
          {/*phần tìm kiếm và lọc */}
          <Input.Search placeholder="Tìm kiếm" className="mr-4" allowClear onSearch={(value) => setSearchText(value)} />
          <Select
            showSearch
            style={{ width: 200 }}
            placeholder="Lọc"
            defaultValue="all"
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
        {hasAddUserPermission("add comfort") && (
          <button onClick={() => navigate(`/admin/addUtilities`)} className="ml-2 px-3 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
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
      <Table
        columns={columns}
        dataSource={filteredData}
      />
    </div>
  );
};
