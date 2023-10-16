import React, { useState } from 'react';
import { Input, DatePicker, InputNumber, Select, Button, Upload, Form ,message} from 'antd';
import { CloudUploadOutlined, ArrowLeftOutlined} from '@ant-design/icons';
import { Link ,useNavigate} from 'react-router-dom';
import { useAddVoucherMutation } from '@/api/admin/voucher';



const { Option } = Select;

const AddVoucherPage = () => {
  const [addvoucher] = useAddVoucherMutation()
  const navigate = useNavigate()
  const [form] = Form.useForm();
  const [imageUrl, setImageUrl] = useState(null);

  const handleSubmit = (values:any) => {
    addvoucher(values).unwrap().then(() =>{
      navigate("/admin/managervouchers")
      message.success("Thêm thành công voucher!")
    })
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
      <div className="text-lg font-semibold">Thêm Voucher</div>
        
        <Button className="ml-2 px-3 pb-3 bg-red-500 text-white rounded-md">
              <Link to={`/admin/managervouchers`}>
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
    <Form.Item 
      label="Mã Voucher " 
      name="slug" 
      rules={[{ required: true, message: 'Vui lòng nhập mã voucher' }]}>
      <Input />
    </Form.Item>
    <Form.Item label="Tên Voucher "
     name="name" 
     rules={[{ required: true, message: 'Vui lòng nhập tên của bạn!' }]}>
      <Input />
    </Form.Item>
    <Form.Item 
      label="Loại Type" 
      name="discount" 
      rules={[{ required: true, message: 'Vui lòng nhập loại!' }]}>
      <Select>
        <Option value="discount">30</Option>
        <Option value="freebie">10</Option>
      </Select>
    </Form.Item>
    <Form.Item 
      label="Short Description" 
      name="meta"
      rules={[{ required: true, message: 'Vui lòng nhập mô tả ngắn!' }]}
      >
      <Input.TextArea rows={2} />
    </Form.Item>
    <Form.Item 
      label="Long Description" 
      name="description"
      rules={[{ required: true, message: 'Vui lòng nhập mô tả dài!' }]}
      >
      <Input.TextArea rows={4} />
    </Form.Item>
  </div>

  {/* Form fields on the right */}
  <div className="w-1/2 p-4">
    <Form.Item 
      label="Start Date" 
      name="start_at" 
      rules={[{ required: true, message: 'Vui lòng nhập ngày bắt đầu!' }]}>
      <DatePicker />
    </Form.Item>
    <Form.Item 
      label="End Date" 
      name="expire_at" 
      rules={[{ required: true, message: 'Vui lòng nhập ngày kết thúci!' }]}>
      <DatePicker />
    </Form.Item>
    <Form.Item 
      label="Quantity" 
      name="quantity" 
      rules={[{ required: true, message: 'Vui lòng nhập số lượng' }]}>
      <InputNumber min={1} />
    </Form.Item>
    <Form.Item label="Status" name="status" rules={[{ required: true, message: 'Vui lòng nhập trạng thái' }]}>
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
      <Button type="primary" htmlType="submit" className=' bg-blue-600 text-white rounded-md'>Add Voucher</Button>
    </Form.Item>
  </div>
  </Form>
    </div>
    
  );
};

export default AddVoucherPage;