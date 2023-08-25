import React, { useState } from 'react';
import { Input, DatePicker, InputNumber, Select, Button, Upload, Form } from 'antd';
import { CloudUploadOutlined, ArrowLeftOutlined} from '@ant-design/icons';
import { Link } from 'react-router-dom';



const { Option } = Select;

const UpdateVoucherPage = () => {
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
      <div className="text-lg font-semibold">Update Voucher</div>
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
              <Link to={`/admin/`}>
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
    <Form.Item label="Id " name="" rules={[{ required: true }]}>
      <Input />
    </Form.Item>
    <Form.Item label="Mã Voucher " name="" rules={[{ required: true, message: 'Please enter voucher code' }]}>
      <Input />
    </Form.Item>
    <Form.Item label="Tên Voucher " name="" rules={[{ required: true, message: 'Please enter voucher name' }]}>
      <Input />
    </Form.Item>
    <Form.Item label="Loại Type" name="" rules={[{ required: true, message: 'Please select voucher type' }]}>
      <Select>
        <Option value="discount">30</Option>
        <Option value="freebie">10</Option>
      </Select>
    </Form.Item>
    <Form.Item label="Short Description" name="shortDescription">
      <Input.TextArea rows={2} />
    </Form.Item>
    <Form.Item label="Long Description" name="longDescription">
      <Input.TextArea rows={4} />
    </Form.Item>
  </div>

  {/* Form fields on the right */}
  <div className="w-1/2 p-4">
  <Form.Item label="Discount Value" name="discountValue" rules={[{ required: true, message: 'Please enter discount value' }]}>
      <InputNumber min={0} />
    </Form.Item>
    <Form.Item label="Start Date" name="startDate" rules={[{ required: true, message: 'Please select start date' }]}>
      <DatePicker />
    </Form.Item>
    <Form.Item label="End Date" name="endDate" rules={[{ required: true, message: 'Please select end date' }]}>
      <DatePicker />
    </Form.Item>
    <Form.Item label="Quantity" name="quantity" rules={[{ required: true, message: 'Please enter quantity' }]}>
      <InputNumber min={1} />
    </Form.Item>
    <Form.Item label="Status" name="status" rules={[{ required: true, message: 'Please select status' }]}>
      <Select>
        <Option value="active">Active</Option>
        <Option value="inactive">Inactive</Option>
      </Select>
    </Form.Item>
    <Form.Item label="Image" name="image">
      <Upload
        action="/api/upload" // Replace with your image upload API endpoint
        showUploadList={false}
        onChange={handleImageUpload}
      >
        <Button icon={<CloudUploadOutlined />}>Upload Image</Button>
      </Upload>
      {imageUrl && <img src={imageUrl} alt="Voucher" className="mt-2 max-w-full h-32 object-contain" />}
    </Form.Item>
    <Form.Item>
      <Button type="primary" htmlType="submit" className=' bg-blue-600 text-white rounded-md'>Update Voucher</Button>
    </Form.Item>
  </div>
</Form>
    </div>
    
  );
};

export default UpdateVoucherPage;