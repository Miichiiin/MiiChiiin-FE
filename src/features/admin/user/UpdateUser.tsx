import  { useEffect, useState } from 'react';
import { Input, DatePicker, InputNumber, Select, Button, Upload, Form ,message} from 'antd';
import { CloudUploadOutlined, ArrowLeftOutlined, PlusOutlined} from '@ant-design/icons';
import { Link ,useNavigate,useParams} from 'react-router-dom';
import { useGetUserIdQuery, useUpdateUserMutation } from '@/api/users';

import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import 'dayjs/locale/vi';

dayjs.extend(utc);
dayjs.extend(timezone);

const UpdateUserPage = () => {
  const navigate = useNavigate()
  const {id} = useParams<{id:string}>()
  const {data:userData} = useGetUserIdQuery(id||"")
  const [updateUser] = useUpdateUserMutation()
  const [imageUrl, setImageUrl] = useState(null);
  const [form] = Form.useForm();
  
  useEffect(() =>{
    form.setFieldsValue({
        name:userData?.name,
        email: userData?.email,
        image: userData?.image,
        gender: userData?.gender,
        date: dayjs(userData?.date).tz('Asia/Ho_Chi_Minh'),
        address: userData?.address,
        phone: userData?. phone,
        cccd: userData?.cccd,
        nationality: userData?.nationality,
    })
  },[userData])
  
  const onFinish = (values:any) => {
      updateUser({...values,id:id}).unwrap().then(() =>{
      navigate("/admin/usermanagement")
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
    name: string,
    email:string,
    image:string,
    description:string,
    phone: number
    address:string,
    status: number,
    gender:number,
    date: string,
    nationality:string,
    cccd:number,
    created_at:string,
    updated_at:string
};
const normFile = (e: any) => {
    if (Array.isArray(e)) {
        return e;
    }
    return e?.fileList;
};
  return (
    <div>
     
     <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
      <div className="text-lg font-semibold">Update User</div>
        
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
          <div className="w-1/2 p-4 bg-white">
            <Form.Item<FieldType>
                label="Họ và tên"
                name="name"
                rules={[{ required: true, message: 'Hãy nhập tên dịch Tên!' }]}
            >
                <Input allowClear />
            </Form.Item>

            <Form.Item<FieldType>
                label="Email"
                name="email"
                rules={[{ required: false, message: 'Hãy nhập tên dịch Email!' },
                { type: "email", message: 'Email không đúng định dạng' }
                ]}
            >
                <Input allowClear />
            </Form.Item>

            <Form.Item label="Ảnh" valuePropName="image" getValueFromEvent={normFile}>
                <Upload action="/upload.do" listType="picture-card">
                    <div>
                        <PlusOutlined />
                        <div style={{ marginTop: 8 }}>Upload</div>
                    </div>
                </Upload>
            </Form.Item>


            <Form.Item<FieldType>
                label="Giới tính"
                name="gender"
            >
                <Select defaultValue="all" style={{ width: '150px' }}>
                    <Select.Option value="all">Nam</Select.Option>
                    <Select.Option value="available">Nữ</Select.Option>
                    <Select.Option value="occupied">Khác</Select.Option>
                </Select>
            </Form.Item>

            <Form.Item
                label="Ngày sinh"
                name="date"
            >
                <DatePicker
                  format="YYYY-MM-DD"
                  placeholder="Chọn ngày và giờ"
                  className='w-[250px]'
                  value={form.getFieldValue('date')}
                />
            </Form.Item>

            <Form.Item<FieldType>
                label="Địa chỉ"
                name="address"
            >
                <Input allowClear/>
            </Form.Item>

            <Form.Item<FieldType>
                label="Sdt"
                name="phone"
            >
                <Input allowClear/>
            </Form.Item>

            {/* <Form.Item<FieldType>
                label="CCCD"
                name="cccd"
            >
                <Input allowClear/>
            </Form.Item>

            <Form.Item<FieldType>
                label="Quốc tịch"
                name="nationality"
            >
                <Input allowClear/>
            </Form.Item> */}
            
            {/* <Form.Item<FieldType> 
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
            </Form.Item> */}
            <Form.Item>
              <Button type="primary" htmlType="submit" className=' bg-blue-600 text-white rounded-md'>Update User</Button>
            </Form.Item>
          </div>
        </Form>
    </div>
    
  );
};

export default UpdateUserPage;