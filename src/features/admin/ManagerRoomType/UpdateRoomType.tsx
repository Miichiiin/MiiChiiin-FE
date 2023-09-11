import  { useEffect, useState } from 'react';
import { Input, DatePicker, InputNumber, Select, Button, Upload, Form ,message} from 'antd';
import { CloudUploadOutlined, ArrowLeftOutlined, PlusOutlined} from '@ant-design/icons';
import { Link ,useNavigate,useParams} from 'react-router-dom';
import { useGetCategory_adminByIdQuery, useUpdateCategory_adminMutation } from '@/api/category_admin';

const { Option } = Select;

const UpdateRoomType = () => {

  const navigate = useNavigate()
  const {id} = useParams()
  const {data:categoryData} = useGetCategory_adminByIdQuery(id)
  const [updateCategory] = useUpdateCategory_adminMutation()
  const [imageUrl, setImageUrl] = useState(null);
  const [form] = Form.useForm();
  console.log("data", categoryData);
  
  
  useEffect(() =>{
    form.setFieldsValue({
       name: categoryData?.name,
       image: categoryData?.image,
       description: categoryData?.description,
       capacity: categoryData?.capacity,
       price: categoryData?.price,
       acreage: categoryData?.acreage,
       status: categoryData?.status,
       quantity_of_people: categoryData?.quantity_of_people
    })
  },[categoryData])
  
  const onFinish = (values:any) => {
      updateCategory({...values,id:id}).unwrap().then(() =>{
      navigate("/admin/manageroomtype")
      message.success("Update thành công loại phòng!")
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
  id: string;
  name: string;
  description: string;
  capacity: string;
  convenient: string;
  image:string;
  quantity_of_people:number;
  price:number;
  acreage:number;
  status:string;
  
  
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
      <div className="text-lg font-semibold">Update Loại phòng</div>
        
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
        label="Tên loại phòng"
        name="name"
        rules={[{ required: true, message: 'Vui lòng nhập tên loại phòng!' }]}
      >
        <Input />
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
        label="Mô tả"
        name="description"
        rules={[{ required: true, message: 'Vui lòng nhập mô tả!' }]}
      >
        <Input.TextArea />
      </Form.Item>

      <Form.Item<FieldType>
        label="Sức chứa"
        name="quantity_of_people"
        rules={[{ required: true, message: 'Vui lòng nhập sức chứa!' }]}
      >
        <InputNumber />
      </Form.Item>
      <Form.Item<FieldType>
        label="Giá"
        name="price"
        rules={[{ required: true, message: 'Vui lòng nhập giá phòng!' }]}
      >
        <InputNumber />
      </Form.Item>
      <Form.Item<FieldType>
        label="Diện tích"
        name="acreage"
        rules={[{ required: true, message: 'Vui lòng nhập diện tích!' }]}
      >
        <InputNumber /> 
      </Form.Item>
      <Form.Item<FieldType>
        label="Trạng thái phòng"
        name="status"
        rules={[{ required: true, message: 'Vui lòng nhập trạng thái phòng!' }]}
      >
        <Input /> 
      </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" className=' bg-blue-600 text-white rounded-md'>Update Loại Phòng</Button>
        </Form.Item>
  </div>
</Form>
    </div>
    
  );
};

export default UpdateRoomType;