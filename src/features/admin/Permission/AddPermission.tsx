import { useGetPermissions1Query } from '@/api/admin/permisstion1_admin';
import { useAddRole1Mutation } from '@/api/admin/role1_admin';
// import { CloudUploadOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { Button, Form, Input, Transfer, message } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { TransferDirection } from 'antd/es/transfer';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeftOutlined } from '@ant-design/icons';
interface RecordType {
  key: string;
  title: string;
  description: string;
  chosen: boolean;
  guard_name: string;
}

const AddPermission = () => {
  // const [oneWay, setOneWay] = useState(false);
  const [targetKeys, setTargetKeys] = useState<string[]>([]);
  const [sourceData, setSourceData] = useState<RecordType[]>([]);
  const [form] = useForm();
  const navigate = useNavigate();
  const [addRole] = useAddRole1Mutation();
  const { data: perData } = useGetPermissions1Query({});

  // Lưu danh sách các quyền đã chọn
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);
  useEffect(() => {
    if (perData) {
      // Tạo mảng sourceData từ perData
      const sourceDataArray: RecordType[] = perData.map((item: any) => ({
        key: item.id.toString(),
        title: item.name,
        guard_name: "admins",
        chosen: targetKeys.includes(item.id.toString()),
      }));
      // Cập nhật trạng thái sourceData
      setSourceData(sourceDataArray);
    }
  }, [perData, targetKeys]);

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

  const onFinish = (values: any) => {
    const numericTargetKeys = targetKeys.map(Number);
    values.guard_name = "admins";
    values.permissions = numericTargetKeys;
    // Gửi dữ liệu cập nhật lên máy chủ, bao gồm 'guard_name' và 'permissions'
    addRole(values).unwrap().then(() => {
      navigate("/admin/indexPermission");
      message.success('Thêm chức vụ thành công!');
    });
  };
  // search
  const handleSearch = (dir: TransferDirection, value: string) => {
    console.log('search:', dir, value);
  };
  return (
    <>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <h1 className="text-lg font-bold text-orange-500">Thêm Role</h1>
        <button className='mr-2 px-3 py-2 border hover:bg-orange-400 bg-orange-500 text-white rounded-md flex items-center' onClick={() => navigate("/admin/indexPermission")}>
          <ArrowLeftOutlined className="pr-2" />Quay lại
        </button>
      </header>
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
          render={(item) => item.title}
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
            height: '420px',
          }}
        />
        <br />
        <div className='flex space-x-[875px] items-center'>
          {/* <Switch
            unCheckedChildren="one way"
            checkedChildren="one way"
            checked={oneWay}
            onChange={setOneWay}
            className='mt-1 bg-gray-500'
          /> */}
          {/* Nút để thêm quyền từ trái sang phải */}
          <Button
            type="primary"
            htmlType="submit"
            className=' bg-blue-600 text-white rounded-md mt-3'
          >
            Add
          </Button>

          <button className='px-3 py-2 bg-cyan-500 text-white rounded-md hover:bg-cyan-600' onClick={handleAddPermissions}>Thêm quyền</button>

        </div>

      </Form>
    </>
  );
};

export default AddPermission;
