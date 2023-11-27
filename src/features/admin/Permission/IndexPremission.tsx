import { useGetRoles1Query, useRemoveRole1Mutation } from '@/api/admin/role1_admin';
import { Table, Input, Divider } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useState } from 'react';
import { BiTrash } from 'react-icons/bi';
import { IoAddCircleOutline } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';




const IndexPremission = () => {
  const { data: dataRole } = useGetRoles1Query({});
  const navigate = useNavigate()
  const [removeRole] = useRemoveRole1Mutation()
  const dataSource = dataRole ? dataRole.map(({ id, name, level, created_at, updated_at, guard_name }: DataType) => ({
    key: id,
    name: name,
    level,
    guard_name,
    created_at,
    updated_at,
  })) : [];
  // xóa
  const handleDelete = (id: number) => {
    const isConfirmed = window.confirm('Bạn có chắc chắn muốn xóa vai trò này?');
    if (isConfirmed) {
      removeRole(id).unwrap().then(() => {
      })
        .catch((error) => {
          console.log(error);

        });
    }
  };
  // phân quyền
  const dataPermission = localStorage.getItem('userAdmin')
  const currentUserPermissions = (dataPermission && JSON.parse(dataPermission).permissions) || [];

  const hasAddUserPermission = (permissions: any) => {
    return currentUserPermissions.includes(permissions);
  };
const dataLogin = localStorage.getItem("userAdmin");
console.log("dataLogin",dataLogin);

  interface DataType {
    key: number;
    id: number;
    name: string;
    level: number;
    created_at: string;
    updated_at: string;
    guard_name: string;
  }
  const columns: ColumnsType<DataType> = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'level',
      dataIndex: 'level',
      key: 'level',
    },
    {
      title: 'created_at',
      dataIndex: 'created_at',
      key: 'created_at',
    },
    {
      title: 'updated_at',
      dataIndex: 'updated_at',
      key: 'updated_at',
    },

    {
      title: 'Action',
      key: 'action',
      render: (text: any, item: any) => (
        <div className='flex items-center'>
          {
            hasAddUserPermission('add permission') && (
              <button className='pr-3 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 flex justify-center items-center' onClick={() => navigate(`/admin/permission/${item.key}`)}>
                <IoAddCircleOutline className="text-lg ml-2 mr-1" /> Thêm quyền
              </button>
            )
          }
          {
            hasAddUserPermission('delete permission') && (
              <button className='ml-2 px-3 py-2 hover:bg-red-600 bg-red-500 text-white rounded-md flex justify-center items-center'
                onClick={() => handleDelete(item.key)}
              ><BiTrash className="text-[22px]" />
              </button>
            )
          }

        </div>
      ),
    },
  ];
  const [searchText, setSearchText] = useState("");
  const filteredData = dataSource ? dataSource
    .filter((item: any) =>
      item.name.toLowerCase().includes(searchText.toLowerCase())
    ) : [];

  return (
    <div>
      <div className='flex justify-between items-center mb-8'>
        <div className="text-lg font-bold text-orange-500">Quản Lý Quyền</div>
        <div className='flex items-center'>
          <Input.Search placeholder="Tìm kiếm" className="mr-4 w-[400px]" allowClear onSearch={(value) => setSearchText(value)} />
        </div>
        {
          hasAddUserPermission('add role') && (
            <button className='pr-3 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 flex justify-center items-center' onClick={() => navigate("/admin/addpermission")}>
              <IoAddCircleOutline className="text-xl ml-2 mr-1" /> Thêm Role
            </button>
          )
        }
      </div>
      <Divider />
      <Table columns={columns} dataSource={filteredData} />
    </div>
  )
}

export default IndexPremission
