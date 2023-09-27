import { useGetRolesQuery } from '@/api/admin/role_admin';
import { Space, Table, Button } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { Link } from 'react-router-dom';
  
 
  

const IndexPremission = () => {
    const {data : dataRole} = useGetRolesQuery({});    
    const dataSource = dataRole ? dataRole.map(({ id, name, guard_name, lever }: DataType) => ({
        key: id,
        name: name,
        guard_name: guard_name,
        lever: lever
    })) : [];

    interface DataType {
        id: number;
        name: string;
        guard_name: string;
        lever: number;
        created_at: string;
        updated_at: string;
      }
      const columns: ColumnsType<DataType> = [
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
          render: (text) => <a>{text}</a>,
        },
        {
          title: 'guard_name',
          dataIndex: 'guard_name',
          key: 'guard_name',
        },
        {
          title: 'lever',
          dataIndex: 'lever',
          key: 'lever',
        },
        {
          title: 'Action',
          key: 'action',
          render: (text:any,item:any) => (
            <Space size="middle">
              <Button className='btn-primary bg-[#0284c7] text-white'><Link to={`/admin/permission/${item.key}`}>Thêm quyền</Link></Button>
            </Space>
          ),
        },
      ];
  return (
    <div>
      <Table columns={columns} dataSource={dataSource} />;
    </div>
  )
}

export default IndexPremission
