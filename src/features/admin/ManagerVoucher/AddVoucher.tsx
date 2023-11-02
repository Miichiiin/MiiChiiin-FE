import React, { useState } from 'react';
import { Input, DatePicker, InputNumber, Select, Button, Upload, Form ,message} from 'antd';
import { CloudUploadOutlined, ArrowLeftOutlined} from '@ant-design/icons';
import { Link ,useNavigate} from 'react-router-dom';
import { useAddVoucherMutation } from '@/api/admin/voucher';
import { format } from 'date-fns';


const { Option } = Select;

const AddVoucherPage = () => {
  const [addvoucher,{isLoading: isAddVoucher}] = useAddVoucherMutation()
  const navigate = useNavigate()
  const [form] = Form.useForm();
  const [selectedFile, setSelectedFile] = useState<File>();

  const handleSubmit = (values:any) => {
    if (values.start_at && !isNaN(new Date(values.start_at).getTime())) {
      values.start_at = format(new Date(values.start_at), 'yyyy-MM-dd');
    }
    if (values.expire_at && !isNaN(new Date(values.expire_at).getTime())) {
      values.expire_at = format(new Date(values.expire_at), 'yyyy-MM-dd');
    }
    const body = new FormData()
      body.append('name',  values.name) 
      body.append('image', selectedFile as File) 
      body.append('slug', values.slug)
      body.append('description', values.description)
      body.append('meta', values.meta)
      body.append('discount', values.discount)
      // body.append('gender', values.gender)
      body.append('start_at', values.start_at)
      body.append('expire_at', values.expire_at)
      body.append('quantity', values.quantity)
      console.log('body', body)
      addvoucher(body).unwrap().then(() =>{

        navigate("/admin/managervouchers")
        message.success("Thêm thành công voucher!")
    })
    console.log('Form values:', values);
  };
 const handleChange = (event:React.ChangeEvent<HTMLInputElement>  ) => {
   const {files} = event.target
    const selectedFiles = files as FileList
    setSelectedFile(selectedFiles?.[0])
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
      encType="multipart/form-data"
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
          label="Giám giá" 
          name="discount" 
          rules={[{ required: true, message: 'Vui lòng nhập loại!' }]}>
          <Input />
        </Form.Item>
        <Form.Item 
          label="Short Description" 
          name="meta"
          rules={[{ required: true, message: 'Vui lòng nhập mô tả ngắn!' }]}
          >
          <Input.TextArea rows={2} />
        </Form.Item>
        <Form.Item 
          label=" Description" 
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
        <Form.Item
          name="image"
          label="Upload"
        >
          <input type='file' onChange={handleChange}/>
        </Form.Item>
        <Form.Item>
          <Button loading={isAddVoucher} type="primary" htmlType="submit" className=' bg-blue-600 text-white rounded-md'>Add Voucher</Button>
        </Form.Item>
      </div>
      </Form>
    </div>
    
  );
};

export default AddVoucherPage;