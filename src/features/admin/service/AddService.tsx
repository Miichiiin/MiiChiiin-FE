
import { useAddServices_AdminMutation } from '@/api/admin/service_admin';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, InputNumber, Select, Upload, message } from 'antd';
import { useNavigate } from 'react-router-dom';


export const AddService = () => {
  
  const navigate = useNavigate();
  const [addServiceAdmin] = useAddServices_AdminMutation();

  const onFinish = (values:any) => {
    addServiceAdmin(values).unwrap()
      .then(() => {
        
        message.success('Thêm dịch vụ thành công');
        navigate('/admin/service');
      })
      .catch((error: any) => {
        console.error('Failed:', error);
        message.error('Thêm dịch vụ thất bại');
      });
  };

  const onFinishFailed = (errorInfo:any) => {
    console.log('Failed:', errorInfo);
  };

  const normFile = (e:any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  return (
    <div>
      <header className="flex justify-between items-center my-5 mx-3">
        <h2 className="text-2xl text-blue-700">Thêm dịch vụ</h2>
      </header>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Tên dịch vụ"
          name="name"
          rules={[{ required: true, message: 'Hãy nhập tên dịch vụ!' }]}
        >
          <Input allowClear />
        </Form.Item>

        <Form.Item
          label="Giá"
          name="price"
          rules={[{ required: true, message: 'Hãy nhập giá dịch vụ!' }]}
        >
          <InputNumber />
        </Form.Item>

        <Form.Item label="Ảnh" name="image" valuePropName="image" getValueFromEvent={normFile}>
          <Upload action="/upload.do" listType="picture-card">
            <div>
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>Upload</div>
            </div>
          </Upload>
        </Form.Item>

        <Form.Item
          label="Trạng thái"
          name="status"
          rules={[{ required: true, message: 'Hãy chọn trạng thái dịch vụ!' }]}
        >
          <Select defaultValue="all" style={{ width: '150px' }}>
            <Select.Option value="all">Đang dùng</Select.Option>
            <Select.Option value="available">Có sẵn</Select.Option>
            <Select.Option value="occupied">Đã thuê</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item label="Mô tả" name="description">
          <Input.TextArea placeholder="Nội dung" allowClear />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" className="bg-blue-500 text-white" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
