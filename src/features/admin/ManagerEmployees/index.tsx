
import { useGetAdmin_admin_AdminQuery, useRemoveAdmin_admin_AdminMutation } from "@/api/admin/admin_admin_admin";
import { Table, Divider, Radio, Input, Select, Button } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useState } from "react";
import { Link } from "react-router-dom";


export const ManagerEmployee = () => {
  const { data: emploData } = useGetAdmin_admin_AdminQuery({})
  const [removeEployee,{isLoading: isRemoveEmployee}] = useRemoveAdmin_admin_AdminMutation()
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
      render: (text: any, item: any) => {
        return (
          <>
            <Link to={`/admin/updateemployee/${item.key}`}>{text}</Link>
          </>
        )
      }
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
      render: (text, item) => (
        <div className="flex space-x-2">
          {hasAddUserPermission("delete user") && (
            <Button loading={isRemoveEmployee}
              className='px-4 py-1 bg-red-600 hover:bg-red-700 text-white rounded-md'
              onClick={() => confirmDelete(item.key)}
            >
              Xóa
            </Button>
          )}
          {hasAddUserPermission("update user") && (
            <Button type="primary" className='bg-[#3b82f6]'>
              <Link to={`/admin/updateemployee/${item.key}`}>Sửa</Link>
            </Button>
          )}
        </div >
      ),
    },
  ];

  const [searchText, setSearchText] = useState("");
  const [selectedRows, setSelectedRows] = useState<DataType[]>([]);
  const [selectionType, setSelectionType] = useState<'checkbox'>('checkbox');
  const [selectedStatus, setSelectedStatus] = useState<string | undefined>(undefined);
  const filteredData = dataSource ? dataSource
    .filter((item: DataType) =>
      item.name.toLowerCase().includes(searchText.toLowerCase())
    )
    .filter((item: DataType) =>
      selectedStatus === undefined ? true : item.status === selectedStatus
    ) : [];

  const confirmDelete = (id: number) => {
    const isConfirmed = window.confirm('Bạn có chắc chắn muốn xóa khách sạn này?');
    if (isConfirmed) {
      removeEployee(id).unwrap().then(() => {
        setSelectedRows((prevSelectedRows) => prevSelectedRows.filter((row) => row.key !== id));
      });
    }
  };
  // phân quyền
  const dataPermission = localStorage.getItem('userAdmin')
  const currentUserPermissions = (dataPermission && JSON.parse(dataPermission).permissions) || [];  
  const hasAddUserPermission = (permissions:any) => {
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
        <div className="text-lg font-semibold">Quản Lý Nhân Viên</div>
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
          <button className="ml-2 px-2 py-2 bg-blue-500 text-white rounded-md">
                <Link to={`/admin/addemployee`}>Thêm Nhân Viên</Link>
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