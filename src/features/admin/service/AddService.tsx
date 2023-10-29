import { useAddService_adminMutation } from '@/api/admin/service_admin';
import { PlusOutlined, UploadOutlined } from '@ant-design/icons';
import { Button, Form, Input, InputNumber, Select, Upload, message } from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


export const AddService = () => {
  const navigate = useNavigate();
  const [addServiceAdmin] = useAddService_adminMutation();
  const [file, setFile] = useState();

  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.file;
  };

  const onFileChange = ({ file }: any) => {
    setFile(file);
  };
  const props = {
    action: 'https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188',
    onChange: onFileChange,
    multiple: true,
  };

  const onFinish = (values: any) => {
    if (file) {
      const image = file;
      addServiceAdmin({ ...values, image: image as File }).unwrap()
        .then(() => { 
          message.success('Thêm dịch vụ thành công');
          navigate('/admin/service');
        })
        .catch((error: any) => {
          console.error('Failed:', error);
          message.error('Thêm dịch vụ thất bại');
        });
    } else {
      // Xử lý trường hợp khi biến 'file' là null
      console.error('Không có tệp ảnh được chọn');
    }
  };



  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
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
        <Form.Item
          label="Ảnh"
          name="image"
          valuePropName="image"
          getValueFromEvent={normFile}>
          <Upload
            name="image"
            maxCount={1}
            {...props}
          >
            <Button icon={<UploadOutlined />}>Chọn ảnh</Button>
          </Upload>
        </Form.Item>
        <Form.Item
          label="Số lượng"
          name="quantity"
          rules={[{ required: true, message: 'Hãy nhập số lượng dịch vụ!' }]}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item
          label="Trạng thái"
          name="status"
        >
          <Select defaultValue="all" style={{ width: '150px' }}>
            <Select.Option value="all">Chọn trạng thái</Select.Option>
            <Select.Option value={1} >Có sẵn</Select.Option>
            <Select.Option value={0}>Đã thuê</Select.Option>
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
