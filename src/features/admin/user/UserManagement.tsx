import { useGetUsers_adminQuery, useRemoveUser_adminMutation } from '@/api/admin/admin_usermanage';
import { Table, Divider, Select, Input, Skeleton, Pagination, Popconfirm, message } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useEffect, useState } from 'react';
import { AiOutlineTool } from 'react-icons/ai';
import { BiTrash } from 'react-icons/bi';
import { IoAddCircleOutline } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';


export const UserManagement = () => {
  const { data: dataUser, isLoading, isError } = useGetUsers_adminQuery([])
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize] = useState<number>(5);
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  const [data, setData] = useState<DataType[]>([]);
  const navigate = useNavigate()
  useEffect(() => {
    if (dataUser) {
      const startIndex = (currentPage - 1) * pageSize;
      const endIndex = startIndex + pageSize;

      const currentData = dataUser.slice(startIndex, endIndex);

      setData(currentData);
    }
  }, [dataUser, currentPage, pageSize]);
  const [removeUser] = useRemoveUser_adminMutation()
  interface DataType {
    key: number,
    id: string | number,
    name: string,
    email: string,
    image: string,
    description: string,
    email_verified_at: string,
    phone: number
    address: string,
    status: number,
    gender: number,
    date: string,
    cccd: string,
    nationality: string
  }

  const columns: ColumnsType<DataType> = [
    {
      title: "ID",
      dataIndex: "id",
    },
    {
      title: "Tên Khách hàng",
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
      render: (image) => <img src={image} alt="Hình ảnh" className='w-[50px] h-[50px]' />,
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (_, record) => {
        let statusText = '';
        if (record.status === 1) {
          statusText = 'Hoạt đông';
        } else if (record.status === 0) {
          statusText = 'Đang chờ';
        }

        return <span>{statusText}</span>;
      },
    },
    {
      title: "Giới tính",
      dataIndex: "gender",
      key: "gender",
      render: (_, record) => {
        let genderText = '';

        if (record.gender === 2) {
          genderText = 'Khác';
        } else if (record.gender === 1) {
          genderText = 'Nữ';
        } else if (record.gender === 0) {
          genderText = 'Nam';
        }

        return <span>{genderText}</span>;
      },
    },
    {
      title: "Action",
      key: "action",
      render: (_, item) => (
        <div className="flex">
          {hasAddUserPermission("update user") && (
            <button className='mr-2 px-3 py-2 hover:bg-cyan-600 bg-cyan-500 text-white rounded-md' onClick={() => navigate(`/admin/updateuser/${item?.id}`)}>
              <AiOutlineTool className="text-lg" />
            </button>
          )}
          {hasAddUserPermission("delete user") && (
            <Popconfirm
              title="Xóa Khách sạn"
              description="Bạn có muốn xóa không??"
              onConfirm={() => {
                removeUser(item.id).unwrap().then(() => {
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

        </div>
      ),
    }
  ];
  const [searchText, setSearchText] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<number | undefined | string>(undefined);
  const filteredData = data ? data
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

  if (isLoading) return <Skeleton active />;
  if (isError) return <div>Something went wrong</div>;
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <div className="text-lg font-bold text-orange-500">Quản lý khách hàng</div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Input.Search placeholder="Tìm kiếm" style={{ marginRight: '8px' }} onSearch={(value) => setSearchText(value)} allowClear />
          <Select
            showSearch
            style={{ width: 200 }}
            placeholder="Lọc"
            defaultValue="all"
            optionFilterProp="children"
            filterOption={(input, option) => (option?.label ?? '').includes(input)}
            filterSort={(optionA, optionB) =>
              (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
            }
            options={[
              {
                value: "all",
                label: "Tất cả",
              },
              {
                value: 1,
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
        {hasAddUserPermission("add user") && (
          <button className="ml-2 px-3 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600" onClick={() => navigate('/admin/adduser')}><IoAddCircleOutline className="text-xl" /></button>
        )}
      </div>
      {/* Phần CSS tùy chỉnh cho bảng */}
      <style>
        {`
                    .table-container {
                        background-color: #f4f4f4;
                        border-radius: 8px;
                        padding: 16px;
                    }
                    `}
      </style>
      <Divider />
      <div className="table-container">
        <Table
          columns={columns}
          dataSource={filteredData}
          className="custom-table"
          scroll={{ x: 2000 }}
          pagination={false}
        />
        <Pagination
          current={currentPage}
          total={dataUser?.length || 0}
          pageSize={pageSize}
          onChange={handlePageChange}
          showSizeChanger={false}
          style={{ textAlign: "right", marginTop: "30px" }}
        />
      </div>
    </div>
  )
}
