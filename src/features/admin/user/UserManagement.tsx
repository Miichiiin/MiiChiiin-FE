import { useGetUsersQuery, useRemoveUserMutation } from '@/api/users';
import { Table, Divider, Radio, Button, Select, Input, Image } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useState } from 'react';
import { Link } from 'react-router-dom';

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
       'add typeRom',
       'update typeRom',
       'delete typeRom',
       'add voucher',
     ]
   },
  }
 
];
export const UserManagement = () => {
    const {data:dataUser} = useGetUsersQuery([])
    const [removeUser] = useRemoveUserMutation()
    const dataSource = dataUser?.map(({id,name,email,image,description,email_verified_at,phone,address,status,gender,date,created_at,updated_at,cccd,nationality} :DataType) =>({
      key:id,
      name,
      email,
      image,
      description,
      email_verified_at,
      phone,
      address,
      status,
      gender,
      date,
      created_at,
      updated_at,
      cccd,
      nationality
    }))
    interface DataType {
        key:number,
        id:string | number,
        name: string,
        email:string,
        image:string,
        description:string,
        email_verified_at:string,
        phone: number
        address:string,
        status: number,
        gender:number,
        date: string,
        created_at:string,
        updated_at:string
        cccd: string,
        nationality:string
      }

    const columns: ColumnsType<DataType> = [
        {
            title: "#Stt",
            dataIndex: "key",
            key: "id",
            // render: (_, record, index) => <span>{index + 1}</span>,
          },
          {
            title: "Tên Khách hàng",
            dataIndex: "name",
            key: "name",
            render: (text:any,item:any) =>{
              return (
                  <>
                    {hasAddUserPermission && (
                      <Link to={`/admin/updateuser/${item.key}`}>{text}</Link>
                    )}
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
            render: (image) => <img src={image} alt="Hình ảnh" width="100" />,
          },
          {
            title: "Mô tả ",
            dataIndex: "description",
            key: "description",
          },
          {
            title: "Email xác minh",
            dataIndex: "email_verified_at",
            key: "email_verified_at",
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
          },
          {
            title: "Giới tính",
            dataIndex: "gender",
            key: "gender",
          },
          {
            title: "Năm sinh",
            dataIndex: "date",
            key: "date",
          },
          {
            title: "created_at",
            dataIndex: "created_at",
            key: "created_at",
          },
          {
            title: "updated_at",
            dataIndex: "updated_at",
            key: "updated_at",
          },
        {
            title: 'CCCD',
            dataIndex: 'cccd',
            key: 'cccd',
        },
        {
            title: 'Quốc tịch',
            dataIndex: 'nationality',
            key: 'nationality',
        },
    ];

    const rowSelection = {
        onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },

    };
    const [selectionType, setSelectionType] = useState<'checkbox'>('checkbox');
    const [selectedRows, setSelectedRows] = useState<DataType[]>([]);

    const confirmDelete = (id: number) => {
        const isConfirmed = window.confirm('Bạn có chắc chắn muốn xóa khách sạn này?');
        if (isConfirmed) {
            removeUser(id).unwrap().then(() => {
                setSelectedRows((prevSelectedRows) => prevSelectedRows.filter((row) => row.key !== id));
            });
        }
    };
    // const onSearch = (value: string) => console.log(value);
    // phân quyền
  const [hasAddUserPermission, setHasAddUserPermission] = useState(
    users[0].admin.permissions.includes("add user") &&
    users[0].admin.permissions.includes("update user") &&
    users[0].admin.permissions.includes("delete user")
  );
    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <div className="text-lg font-semibold">Quản lý khách hàng</div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Input.Search placeholder="Tìm kiếm" style={{ marginRight: '8px' }} />
                    <Select
                        showSearch
                        style={{ width: 200 }}
                        placeholder="Search to Select"
                        optionFilterProp="children"
                        filterOption={(input, option) => (option?.label ?? '').includes(input)}
                        filterSort={(optionA, optionB) =>
                            (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                        }
                        options={[
                            {
                                value: '1',
                                label: 'Not Identified',
                            },
                            {
                                value: '2',
                                label: 'Closed',
                            },
                            {
                                value: '3',
                                label: 'Communicated',
                            },
                            {
                                value: '4',
                                label: 'Identified',
                            },
                            {
                                value: '5',
                                label: 'Resolved',
                            },
                            {
                                value: '6',
                                label: 'Cancelled',
                            },
                        ]}
                    />
                </div>
                {hasAddUserPermission && (
                  <button className="ml-2 px-2 py-2 bg-blue-500 text-white rounded-md"><Link to={'/admin/adduser'}>Thêm khách hàng</Link></button>
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
            {hasAddUserPermission && (
                <Button type="primary" className='mx-5' danger
                onClick={() => {
                    selectedRows.forEach((row) => confirmDelete(row.key));
                }}
                disabled={selectedRows.length === 0}
            >Xóa</Button>
            )}
            <Radio.Group
                onChange={({ target: { value } }) => {
                    setSelectionType(value);
                }}
                value={selectionType}
            >
            </Radio.Group>

            <Divider />
            <div className="table-container">
                <Table
                    rowSelection={{
                        type: selectionType,
                        ...rowSelection,
                        selectedRowKeys: selectedRows.map((row) => row.key), // Thêm dòng này
                        onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
                            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
                            setSelectedRows(selectedRows);
                        },
                    }}
                    columns={columns}
                    dataSource={dataSource}
                    className="custom-table"
                    scroll={{ x: 2000 }}
                />
            </div>
        </div>
    )
}
