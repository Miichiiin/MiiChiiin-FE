import  { useEffect, useState } from 'react';
import { Input, DatePicker, InputNumber, Select, Button, Upload, Form ,message} from 'antd';
import { CloudUploadOutlined, ArrowLeftOutlined} from '@ant-design/icons';
import { Link ,useNavigate,useParams} from 'react-router-dom';
import { useGetVoucherByIdQuery, useUpdateVoucherMutation } from '@/api/voucher';

const { Option } = Select;

const UpdateVoucherPage = () => {

  const navigate = useNavigate()
  const {id} = useParams<{id:string}>()
  const {data:voucherData} = useGetVoucherByIdQuery(id||"")
  const [updateVoucher] = useUpdateVoucherMutation()
  const [imageUrl, setImageUrl] = useState(null);
  const [form] = Form.useForm();
  
  useEffect(() =>{
    form.setFieldsValue({
      name:voucherData?.name,
      slug:voucherData?.slug,
      image:voucherData?.image,
      quantity:voucherData?.quantity,
      discount:voucherData?.discount,
      start_at:voucherData?.start_at,
      expire_at:voucherData?.expire_at,
      status:voucherData?.status,
      meta:voucherData?.meta,
      description:voucherData?.description
    })
  },[voucherData])
  
  const onFinish = (values:any) => {
      updateVoucher({...values,id:id}).unwrap().then(() =>{
      navigate("/admin/managervouchers")
      message.success('Update khách hàng thành công!');

    })
    console.log('Form values:', values);
  };

  const handleImageUpload = (info:any) => {
    if (info.file.status === 'done') {
      // Get URL of the uploaded image
      setImageUrl(info.file.response.url);
    }
  };
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
};
  type FieldType = {
      id: string | number,
      name: string,
      slug:string,
      image:string,
      quantity:number,
      discount:number,
      start_at:string,
      expire_at:string
      status:number
      meta: string
      description: string
      created_at:string,
      updated_at:string
  }
  return (
    <div>
     
     <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
      <div className="text-lg font-semibold">Update Voucher</div>
        
        <Button className="ml-2 px-3 pb-3 bg-red-500 text-white rounded-md">
              <Link to={`/admin/managervouchers`}>
                <ArrowLeftOutlined /> Quay lại
              </Link>
        </Button>
      </div>
        <Form
            form={form}
            layout="vertical"
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            className="flex"
        >
  {/* Form fields on the left */}
  <div className="w-1/2 p-4 bg-white">
    <Form.Item<FieldType> 
      label="Mã Voucher " 
      name="slug" 
      rules={[{ required: true, message: 'Please enter voucher code' }]}>
      <Input />
    </Form.Item>
    <Form.Item<FieldType> 
      label="Tên Voucher " 
      name="name" 
      rules={[{ required: true, message: 'Please enter voucher name' }]}>
      <Input />
    </Form.Item>
    {/* <Form.Item<FieldType> 
      label="Loại Type" 
      name="discount" 
      rules={[{ required: true, message: 'Please select voucher type' }]}>
      <Select>
        <Option value="discount">30</Option>
        <Option value="freebie">10</Option>
      </Select>
    </Form.Item> */}
    <Form.Item<FieldType> 
      label="Mô tả ngắn" 
      name="meta">
      <Input.TextArea rows={2} />
    </Form.Item>
    <Form.Item<FieldType> 
      label="Mô tả dài" 
      name="description">
      <Input.TextArea rows={4} />
    </Form.Item>
  </div>

  {/* Form fields on the right */}
  <div className="w-1/2 p-4">
  <Form.Item label="Discount Value" name="discount" rules={[{ required: true, message: 'Please enter discount value' }]}>
      <InputNumber min={0} />
    </Form.Item>
    {/* <Form.Item<FieldType> 
      label="Start Date" 
      name="start_at" 
      rules={[{ required: true, message: 'Please select start date' }]}>
      <DatePicker />
    </Form.Item>
    <Form.Item<FieldType> 
      label="End Date" 
      name="expire_at" 
      rules={[{ required: true, message: 'Please select end date' }]}>
      <DatePicker />
    </Form.Item> */}
    <Form.Item<FieldType> 
      label="Quantity" 
      name="quantity" 
      rules={[{ required: true, message: 'Please enter quantity' }]}>
      <InputNumber min={1} />
    </Form.Item>
    <Form.Item<FieldType> 
      label="Status" 
      name="status" 
      rules={[{ required: true, message: 'Please select status' }]}>
      <Select>
        <Option value="active">Active</Option>
        <Option value="inactive">Inactive</Option>
      </Select>
    </Form.Item>
    <Form.Item<FieldType> 
    label="Image" 
    name="image">
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