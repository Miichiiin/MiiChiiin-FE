import  { useState } from 'react';
import { Input, DatePicker,  Select, Button, Upload, Form, Radio } from 'antd';
import {  ArrowLeftOutlined} from '@ant-design/icons';
import { Link } from 'react-router-dom';



const { Option } = Select;

const UpdateEmployeePage = () => {
  const [form] = Form.useForm();
  const [imageUrl, setImageUrl] = useState(null);

  const handleSubmit = (values:any) => {
    console.log('Form values:', values);
  };

  const handleImageUpload = (info:any) => {
    if (info.file.status === 'done') {
      // Get URL of the uploaded image
      setImageUrl(info.file.response.url);
    }
  };

  return (
    <div>
     
     <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
      <div className="text-lg font-semibold">Cập Nhật Nhân Viên</div>
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
        <Button className="ml-2 px-3 pb-3 bg-red-500 text-white rounded-md">
              <Link to={`/admin/manageremployee`}>
                <ArrowLeftOutlined /> Quay lại
              </Link>
        </Button>
      </div>
      <Form
  form={form}
  layout="vertical"
  onFinish={handleSubmit}
  className="flex"
>
  {/* Form fields on the left */}
  <div className="w-1/2 p-4 bg-white">
        <Form.Item label="Id" name="" rules={[{ required: true, message: 'Please enter id' }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Tên Nhân Viên" name="" rules={[{ required: true, message: 'Please enter name' }]}>
          <Input />
        </Form.Item>

        <Form.Item label="Căn Cước" name="" rules={[{ required: true, message: 'Please enter ' }]}>
          <Input />
        </Form.Item>

        <Form.Item label="Quốc Tịch" name="" rules={[{ required: true, message: 'Please enter ' }]}>
          <Input />
        </Form.Item>

        <div className="flex">
          <div className="w-1/2 p-4 bg-white mr-2">
            <Form.Item
              label="Giới Tính"
              name="gender"
              rules={[{ required: true, message: 'Vui lòng chọn giới tính!' }]}
            >
              <Radio.Group>
                <Radio value="male">Nam</Radio>
                <Radio value="female">Nữ</Radio>
              </Radio.Group>
            </Form.Item>
          </div>

          <div className="w-1/2 p-4 bg-white ml-2">
            <Form.Item
              label="Ngày Sinh"
              name="dob"
              rules={[{ required: true, message: 'Vui lòng chọn ngày sinh!' }]}
            >
              <DatePicker />
            </Form.Item>
          </div>
        </div>
        <Form.Item label="Chức Vụ" name="" rules={[{ required: true, message: 'Please enter ' }]}>
        <Input />
        </Form.Item>

  </div>

  {/* Form fields on the right */}
  <div className="w-1/2 p-4">
  <Form.Item label="Cơ Sở" name="" rules={[{ required: true, message: 'Please enter ' }]}>
          <Input />
        </Form.Item>

        <Form.Item label="Địa Chỉ" name="" rules={[{ required: true, message: 'Please enter ' }]}>
          <Input.TextArea />
        </Form.Item>

        <Form.Item label="Số Điện Thoại"name="" rules={[{ required: true, message: 'Please enter ' }]}>
          <Input />
        </Form.Item>

        <Form.Item label="Email" name="" rules={[{ required: true, message: 'Please enter ' }]}>
          <Input />
        </Form.Item>

        <Form.Item label="Hình ảnh" name="" rules={[{ required: true, message: 'Please enter ' }]}>
          <Upload>
            <Button>Tải lên</Button>
          </Upload>
        </Form.Item>
    <Form.Item>
      <Button type="primary" htmlType="submit" className=' bg-blue-600 text-white rounded-md'>Add Voucher</Button>
    </Form.Item>
  </div>
</Form>
    </div>
    
  );
};

export default UpdateEmployeePage;