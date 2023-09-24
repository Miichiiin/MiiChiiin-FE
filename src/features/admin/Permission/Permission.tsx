import { useGetPermissionsQuery } from '@/api/admin/permission_admin';
import { useGetRoleByIdQuery, useUpdateRoleMutation } from '@/api/admin/role_admin';
import { Button, Form, Input, Switch, Transfer } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

interface RecordType {
  key: string;
  title: string;
  description: string;
  chosen: boolean;
}

const Permission = () => {
  const [oneWay, setOneWay] = useState(false);
  const [targetKeys, setTargetKeys] = useState<string[]>([]);
  const [sourceData, setSourceData] = useState<RecordType[]>([]);
  const { id } = useParams();
  const [form] = useForm();
  const navigate = useNavigate();
  const { data: dataRole } = useGetRoleByIdQuery(id);
  const [updateRole] = useUpdateRoleMutation();
  const { data: perData } = useGetPermissionsQuery({});
  
  // Lưu danh sách các quyền đã chọn
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);

  useEffect(() => {
    form.setFieldsValue({
      name: dataRole?.name,
    });
  }, [dataRole]);

  useEffect(() => {
    if (perData) {
      // Tạo mảng sourceData từ perData
      const sourceDataArray: RecordType[] = perData.map((item: any) => ({
        key: item.id.toString(),
        title: item.name,
        guard_name: item.guard_name,
        chosen: targetKeys.includes(item.id.toString()),
      }));

      // Cập nhật trạng thái sourceData
      setSourceData(sourceDataArray);
    }
  }, [perData, targetKeys]);

  // Hàm xử lý việc thêm quyền từ trái sang phải
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
  // cập nhập quyền đã chọn
  useEffect(() => {
    if (dataRole && dataRole.permissions) {
      setTargetKeys(dataRole.permissions.map((id: number) => id.toString()));
    }
  }, [dataRole]);
  //
  const onFinish = (values: any) => {
    // Gửi dữ liệu cập nhật lên máy chủ, bao gồm targetKeys (danh sách các quyền đã chọn)
    updateRole({ ...values, id: id, permissions: targetKeys }).unwrap().then(() => {
      console.log("Thành công!");
      navigate("/admin/indexPermission");
    });
  };

  return (
    <>
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item
          label="Tên Role "
          name="name"
          className='w-[280px] font-medium '
        >
          <Input />
        </Form.Item>
        <Transfer
          dataSource={sourceData}
          targetKeys={targetKeys}
          onChange={setTargetKeys} // Sử dụng hàm setTargetKeys để cập nhật targetKeys
          render={(item) => item.title}
          oneWay={oneWay}
          pagination
          // Thêm một chức năng chọn để lưu danh sách quyền đã chọn
          onSelectChange={(selectedKeys) => {
            setSelectedPermissions(selectedKeys);
          }}
          className='h-[410px]'
        />
        <br />
        <div className='flex space-x-[220px]'>
          <Switch
            unCheckedChildren="one way"
            checkedChildren="one way"
            checked={oneWay}
            onChange={setOneWay}
            className='mt-1 bg-gray-500'
          />
           {/* Nút để thêm quyền từ trái sang phải */}
           <Button className='bg-gray-500 text-white' onClick={handleAddPermissions}>Lưu lại</Button>
        </div>
        <Button
            type="primary"
            htmlType="submit"
            className=' bg-blue-600 text-white rounded-md mt-3'
          >
            Update
          </Button>
      </Form>
    </>
  );
};

export default Permission;
