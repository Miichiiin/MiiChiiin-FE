
import { Form, Input, InputNumber, Button, Upload, message} from 'antd';
import { UploadOutlined, ArrowLeftOutlined} from '@ant-design/icons';
import { Link } from "react-router-dom";


const AddRoomType = () => {
  const onFinish = (values:any) => {
    console.log('Form values:', values);
    // Gửi dữ liệu lên server hoặc xử lý theo yêu cầu của bạn
    message.success('Thêm loại phòng thành công!');
  };

  const onFinishFailed = (errorInfo:any) => {
    console.log('Failed:', errorInfo);
  };

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
  name="addRoomType"
  labelCol={{ span: 4 }}
  wrapperCol={{ span: 16 }}
  initialValues={{ remember: true }}
  onFinish={onFinish}
  onFinishFailed={onFinishFailed}
>

  <Form.Item
    label="Tên loại phòng"
    name="roomTypeName"
    rules={[{ required: true, message: 'Vui lòng nhập tên loại phòng!' }]}
  >
    <Input />
  </Form.Item>

  <Form.Item label="Hình ảnh">
    <Upload>
      <Button icon={<UploadOutlined />}>Tải lên</Button>
    </Upload>
  </Form.Item>

  <Form.Item
    label="Mô tả"
    name="description"
    rules={[{ required: true, message: 'Vui lòng nhập mô tả!' }]}
  >
    <Input.TextArea />
  </Form.Item>

  <Form.Item
    label="Sức chứa"
    name="capacity"
    rules={[{ required: true, message: 'Vui lòng nhập sức chứa!' }]}
  >
    <InputNumber />
  </Form.Item>

  <Form.Item
    label="Tiện nghi"
    name="amenities"
    rules={[{ required: true, message: 'Vui lòng nhập tiện nghi!' }]}
  >
    <Input.TextArea />
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
