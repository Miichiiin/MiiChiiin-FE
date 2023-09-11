
import { Form, Input, InputNumber, Button, Upload, message} from 'antd';
import { UploadOutlined, ArrowLeftOutlined} from '@ant-design/icons';
import { Link ,useNavigate} from "react-router-dom";
import { useAddCategory_adminMutation } from '@/api/category_admin';


const AddRoomType = () => {
  const [addCategory_admin] = useAddCategory_adminMutation()
  const navigate = useNavigate()
  const onFinish = (values:any) => {
    addCategory_admin(values)
      .unwrap()
      .then(() => {
        navigate("admin/manageroomtype");
        message.success('Thêm loại phòng thành công!');
      })
    .catch  ((error) =>{
      message.error('Đã sảy ra lỗi khi thêm loại phòng');
      console.log("Error",error);
      
    })
    console.log('Form values:', values);
    
  };

  const onFinishFailed = (errorInfo:any) => {
    console.log('Failed:', errorInfo);
  };
  interface FieldType {
    id: string;
    name: string;
    description: string;
    capacity: string;
    convenient: string;
    image:string;
    quantity_of_people:number;
    price:number;
    acreage:number;
    floor:number;
    status:string;
    likes:number;
    views:number;
    created_at:Date;
    updated_at:Date;
  }
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
      <div className="text-lg font-semibold">Thêm Loại Phòng</div>
        
        <Button className="ml-2 px-3 pb-3 bg-red-500 text-white rounded-md">
              <Link to={`/admin/manageroomtype`}>
                <ArrowLeftOutlined /> Quay lại
              </Link>
        </Button>
      </div>

      <Form
  // name="addRoomType"
  labelCol={{ span: 4 }}
  wrapperCol={{ span: 16 }}
  initialValues={{ remember: true }}
  onFinish={onFinish}
  onFinishFailed={onFinishFailed}
>

  <Form.Item<FieldType> 
    label="Tên loại phòng"
    name="name"
    rules={[{ required: true, message: 'Vui lòng nhập tên loại phòng!' }]}
  >
    <Input />
  </Form.Item>

  <Form.Item<FieldType>
    label="Hình ảnh">
    <Upload>
      <Button icon={<UploadOutlined />}>Tải lên</Button>
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
    name="capacity"
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



  <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
    <Button type="primary" htmlType="submit" className=' bg-blue-600 text-white rounded-md'>
      Thêm loại phòng
    </Button>
  </Form.Item>
      </Form>

    </div>
  );
};

export default AddRoomType;
