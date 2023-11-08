import { useGetRoles1Query, useRemoveRole1Mutation } from '@/api/admin/role1_admin';
import { Space, Table, Button } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { Link } from 'react-router-dom';
  
 
  

const IndexPremission = () => {
    const {data : dataRole} = useGetRoles1Query({}); 
    console.log("data",dataRole);
    
    const [removeRole] = useRemoveRole1Mutation()   
    const dataSource = dataRole ? dataRole.map(({ id, name, level,created_at,updated_at,guard_name}: DataType) => ({
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

const hasAddUserPermission = (permissions:any) => {
  return currentUserPermissions.includes(permissions);
};

    interface DataType {
        key:number;
        id: number;
        name: string;
        level: number;
        created_at: string;
        updated_at: string;
        guard_name:string;
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
          render: (text:any,item:any) => (
            <Space size="middle">
              {
                hasAddUserPermission('add permission') && (
                  <Button className='btn-primary bg-[#0284c7] text-white'><Link to={`/admin/permission/${item.key}`}>Thêm quyền</Link></Button>
                )
              }
              {
                hasAddUserPermission('delete permission') && (
                  <Button className='bg-red-500 text-white' 
                    onClick={() => handleDelete(item.key)}            
                  >Xóa</Button>
                )
              }
              
            </Space>
          ),
        },
      ];
  return (
    <div>
      {
        hasAddUserPermission('add role') && (
          <Button className='btn-primary bg-[#0284c7] text-white'><Link to={"/admin/addpermission"}>Thêm role</Link></Button>
        )
      }
      <Table columns={columns} dataSource={dataSource} />
    </div>
  )
}

export default IndexPremission
