import { useAddService_adminMutation } from '@/api/admin/service_admin';
import { ArrowLeftOutlined } from '@ant-design/icons';

import { Button, Form, Input, InputNumber, Select, Spin, message } from 'antd';
import { useState } from 'react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';


export const AddService = () => {
  const navigate = useNavigate();
  const [addServiceAdmin, { isLoading }] = useAddService_adminMutation();
  const [selectedFile, setSelectedFile] = useState<File>();
  const [isUploading, setIsUploading] = useState(false)
  const onFinish = (values: any) => {
    const body = new FormData()
    body.append('name', values.name)
    body.append('image', selectedFile as File)
    body.append('description', values.description)
    body.append('quantity', values.quantity)
    body.append('price', values.price)
    body.append('status', values.status)
    setIsUploading(true);

    message.loading({ content: 'Đang tải ảnh lên...', key: 'uploading', duration: 6 });
    addServiceAdmin(body).unwrap().then(() => {
      navigate("/admin/service")
      message.success({ content: 'Thêm dịch vụ thành công', key: 'uploading' })
    }).catch(() => {
      message.error({ content: 'Thêm dịch vụ thất bại', key: 'uploading' })
    }).finally(() => {
      setIsUploading(false);
    })

  };
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target
    const selectedFiles = files as FileList
    setSelectedFile(selectedFiles?.[0])
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div>
      {isUploading && <Spin className='animate' />}
      <header className="flex justify-between items-center mb-5">
        <h2 className="text-2xl text-blue-900 font-semibold">Thêm dịch vụ</h2>
        <button className='px-3 py-2 border hover:bg-orange-400 bg-orange-500 text-white rounded-md flex items-center' onClick={() => navigate("/admin/service")}>
          <ArrowLeftOutlined className="pr-2" /> Quay lại
        </button>
      </header>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        layout='vertical'
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
          <InputNumber className='w-full' />
        </Form.Item>
        <Form.Item
          name="image"
          label="Upload"
        >
          <input type='file' onChange={handleChange} />
        </Form.Item>
        <Form.Item
          label="Số lượng"
          name="quantity"
          rules={[{ required: true, message: 'Hãy nhập số lượng dịch vụ!' }]}
        >
          <InputNumber className='w-full' />
        </Form.Item>
        <Form.Item
          label="Trạng thái"
          name="status"
          rules={[{ required: true, message: 'Chọn trạng thái đi ' }]}
        >
          <Select placeholder="Chọn trạng thái" >
            <Select.Option value={1} >Đang chờ</Select.Option>
            <Select.Option value={0}>Ẩn</Select.Option>
            <Select.Option value={2}>Hoạt động</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="Mô tả" name="description">
          <Input.TextArea placeholder="Nội dung" allowClear />
        </Form.Item>
        <Form.Item>
          <Button type="primary" className="bg-blue-500 text-white" htmlType="submit">
            {isLoading ? (
              <AiOutlineLoading3Quarters className="animate-spin" />
            ) : (
              "Thêm dịch vụ"
            )}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
