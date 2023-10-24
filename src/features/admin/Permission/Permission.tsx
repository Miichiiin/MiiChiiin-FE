import { useGetPermissions1Query } from '@/api/admin/permisstion1_admin';
import { useAddRole1Mutation, useGetRole1ByIdQuery, useUpdateRole1Mutation} from '@/api/admin/role1_admin';
// import { CloudUploadOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { Button, Form, Input, Transfer ,message} from 'antd';
import { useForm } from 'antd/es/form/Form';
import { TransferDirection } from 'antd/es/transfer';
import { useEffect, useState } from 'react';
import {  useNavigate ,useParams} from 'react-router-dom';

interface RecordType {
  key: string;
  title: string;
  chosen: boolean;
  guard_name: string;
  name:string;
  id:number
}

const Permission = () => {
  // const [oneWay, setOneWay] = useState(false);
  const [targetKeys, setTargetKeys] = useState<string[]>([]);
  const [sourceData, setSourceData] = useState<RecordType[]>([]);  
      
  const [form] = useForm();
  const {id} = useParams();
  const navigate = useNavigate();
  const [updateRole] = useUpdateRole1Mutation();
  const {data: dataRole} = useGetRole1ByIdQuery(id);
    
  // Lưu danh sách các quyền đã chọn
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);

  useEffect(() => {
    form.setFieldsValue({
      name: dataRole?.name,
    });
  }, [dataRole]);
  //hiển thi các quyền còn lại
  useEffect(() => {
    if (dataRole && dataRole.list_permissions) {
      const unauthorizedPermissions = dataRole.list_permissions.map((permission:RecordType) => ({
        key: permission.id.toString(), 
        name: permission.name,
        chosen: false,
      }));
      const authorizedPermissions = dataRole.had_permissions.map((permission:RecordType) => ({
        key: permission.id.toString(), 
        name: permission.name,
        chosen: true,
      }));
      setSourceData([...unauthorizedPermissions, ...authorizedPermissions]);                        
    }
  }, [dataRole]);
  // cập nhập quyền đã chọn
  useEffect(() => {
    if (dataRole && dataRole.had_permissions) {
      const initialTargetKeys = dataRole.had_permissions.map((permission:RecordType) => permission.id.toString());
      setTargetKeys(initialTargetKeys);   
    }    
  }, [dataRole]);
  

  //update role
  const onFinish = (values: any) => {
    const numericTargetKeys = targetKeys.map(Number);
    const updatedData = {
      id: id,
      name: values.name,
      guard_name: "admins",
      permissions: numericTargetKeys,
    };
  
    console.log("numericTargetKeys",numericTargetKeys )
     // Gửi dữ liệu cập nhật lên máy chủ
    updateRole(updatedData).unwrap().then(() => {
      console.log("data",updatedData);
      message.success('Cập nhật chức vụ thành công!');
      navigate("/admin/indexPermission");
    });
  };
  // Hàm xử lý việc thêm quyền 
  const handleAddPermissions = () => {
    const newTargetKeys = [...targetKeys, ...selectedPermissions];    
    setTargetKeys(newTargetKeys);
    const updatedSourceData = sourceData.map((item) => ({
      ...item,
      chosen: newTargetKeys.includes(item.key),
    }));
    setSourceData(updatedSourceData);
    setSelectedPermissions([]); // Đặt lại danh sách các quyền đã chọn
  };
  // search
  const handleSearch = (dir: TransferDirection, value: string) => {
    console.log('search:', dir, value);
  };
  console.log('sourceData', sourceData)
  console.log('targetKeys', targetKeys)

  return (
    <>
      <Form form={form} layout="vertical" onFinish={onFinish}>

        <Form.Item
          label="Tên Role "
          name="name"
          className='w-[500px] font-medium '
        >
          <Input />
        </Form.Item>
        <Transfer
          dataSource={sourceData}
          targetKeys={targetKeys}
          onChange={setTargetKeys} // Sử dụng hàm setTargetKeys để cập nhật targetKeys
          render={(item) => item.name}
          oneWay={true}
          pagination
          showSearch
          onSearch={handleSearch}
          // Thêm một chức năng chọn để lưu danh sách quyền đã chọn
          onSelectChange={(selectedKeys) => {
            setSelectedPermissions(selectedKeys);
          }}
          listStyle={{
            width: '500px',
            height: '460px',
          }}
        />
        <br />
        <div className='flex space-x-[850px] items-center'>
           <Button
            type="primary"
            htmlType="submit"
            className=' bg-blue-600 text-white rounded-md mt-3'
          >
            Update
          </Button>
           <Button className='bg-gray-500 text-white' onClick={handleAddPermissions}>Thêm quyền</Button>
           
        </div>
        
      </Form>
    </>
  );
};

export default Permission;