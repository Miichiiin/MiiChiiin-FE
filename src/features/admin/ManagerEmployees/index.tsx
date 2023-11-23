
import { useGetAdmin_admin_AdminQuery, useRemoveAdmin_admin_AdminMutation } from "@/api/admin/admin_admin_admin";
import { Table, Divider, Radio, Input, Select, Button, Popconfirm, message } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useState } from "react";
import { AiOutlineTool } from "react-icons/ai";
import { BiTrash } from "react-icons/bi";
import { IoAddCircleOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";


export const ManagerEmployee = () => {
  const { data: emploData } = useGetAdmin_admin_AdminQuery({})
  const navigate = useNavigate()
  const [removeEployee, { isLoading: isRemoveEmployee }] = useRemoveAdmin_admin_AdminMutation()
  const dataSource = emploData?.map(({ id, name, id_role, email, password, image, description, gender, date, address, status, phone }: DataType) => ({
    key: id,
    id_role,
    name,
    email,
    password,
    image,
    description,
    gender,
    date,
    address,
    status,
    phone
  }))

  interface DataType {
    key: number;
    id: string | number;
    id_role: number;
    name: string;
    email: string;
    password: number | string;
    image: string;
    description: string;
    gender: string;
    date: string;
    address: string;
    phone: number;
    status: number | string;
  }

  const columns: ColumnsType<DataType> = [
    {
      title: "#Stt",
      dataIndex: "key",
      key: "key",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Tên nhân viên",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Hình ảnh",
      dataIndex: "image",
      key: "image",
      render: (image) => <img src={image} alt="Hình ảnh" width="70" />,
    },
    // {
    //   title: "Chức vụ",
    //   dataIndex: "description",
    //   key: "description",
    // },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (_, record) => {
        let statusText = '';

        if (record.status === 2) {
          statusText = 'Xác nhận';
        } else if (record.status === 1) {
          statusText = 'Đã ẩn';
        } else if (record.status === 0) {
          statusText = 'Đang chờ';
        }

        return <span>{statusText}</span>;
      },
    },
    {
      title: "Ngày sinh",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Sđt",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Thao tác",
      dataIndex: "action",
      key: "action",
      render: (_, item) => (
        <div className="flex">
          {hasAddUserPermission("update user") && (
            <button className='mr-2 px-3 py-2 hover:bg-cyan-600 bg-cyan-500 text-white rounded-md' onClick={() => navigate(`/admin/updateemployee/${item.key}`)}>
              <AiOutlineTool className="text-lg" />
            </button>
          )}
          {hasAddUserPermission("delete user") && (
            <Popconfirm
              title="Xóa Khách sạn"
              description="Bạn có muốn xóa không??"
              onConfirm={() => {
                removeEployee(item.key).unwrap().then(() => {
                  message.success("Xóa thành công");
                })
              }}
              okText="Có"
              cancelText="Không"
            >
              <button
                className='mr-2 px-3 py-2 hover:bg-red-600 bg-red-500 text-white rounded-md'
              >
                <BiTrash className="text-lg" />
              </button>
            </Popconfirm>

          )}

        </div >
      ),
    },
  ];

  const [searchText, setSearchText] = useState("");
  const [selectionType, setSelectionType] = useState<'checkbox'>('checkbox');
  const [selectedStatus, setSelectedStatus] = useState<string | undefined>(undefined);
  const filteredData = dataSource ? dataSource
    .filter((item: DataType) =>
      item.name.toLowerCase().includes(searchText.toLowerCase())
    )
    .filter((item: DataType) =>
      selectedStatus === undefined ? true : item.status === selectedStatus
    ) : [];

  // phân quyền
  const dataPermission = localStorage.getItem('userAdmin')
  const currentUserPermissions = (dataPermission && JSON.parse(dataPermission).permissions) || [];
  const hasAddUserPermission = (permissions: any) => {
    return currentUserPermissions.includes(permissions);
  };
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
        <div className="text-lg font-bold text-orange-500">Quản Lý Nhân Viên</div>
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
                value: 0,
                label: "Đang chờ",
              },
              {
                value: 1,
                label: "Đã ẩn",
              },
              {
                value: 2,
                label: "Xác nhận",
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
        {hasAddUserPermission('add user') && (
          <button className="ml-2 px-3 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600" onClick={() => navigate(`/admin/addemployee`)}>
            <IoAddCircleOutline className="text-xl" />
          </button>
        )}
      </div>

      <Divider />
      <Table
        columns={columns}
        dataSource={filteredData}
      />
    </div>
  );
};