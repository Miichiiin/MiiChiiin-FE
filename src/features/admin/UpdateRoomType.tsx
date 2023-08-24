
import { Form, Input, InputNumber, Button, Upload, message, Select} from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { Link } from "react-router-dom";


const UpdateRoomType = () => {
  const onFinish = (values) => {
    console.log('Form values:', values);
    // Gửi dữ liệu lên server hoặc xử lý theo yêu cầu của bạn
    message.success('Thêm loại phòng thành công!');
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
    <div className="text-lg font-semibold">Cập Nhật Loại Phòng</div>
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
           <button className="ml-2 px-2 py-2 bg-red-500 text-white rounded-md">
           <Link to={`/admin/`}>Quay lại</Link>
            </button>
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
      Cập Nhật Loại Phòng
    </Button>
  </Form.Item>
    </Form>

    </div>
  );
};

export default UpdateRoomType;