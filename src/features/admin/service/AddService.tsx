import { useAddService_adminMutation } from '@/api/admin/service_admin';

import { Button, Form, Input, InputNumber, Select, Spin, message } from 'antd';
import { useState } from 'react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';


export const AddService = () => {
  const navigate = useNavigate();
  const [addServiceAdmin, {isLoading}] = useAddService_adminMutation();
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
      message.success({content: 'Thêm dịch vụ thành công', key: 'uploading'})
    }).catch(() => {
      message.error({content: 'Thêm dịch vụ thất bại', key: 'uploading'})
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
      {isUploading && <Spin className='animate'/>}
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
          <InputNumber />
        </Form.Item>
        <Form.Item
          label="Trạng thái"
          name="status"
          rules={[{ required: true, message: 'Chọn trạng thái đi ' }]}
        >
          <Select placeholder="Chọn trạng thái" style={{ width: '150px' }}>
            <Select.Option value={1} >Đang chờ</Select.Option>
            <Select.Option value={0}>Ẩn</Select.Option>
            <Select.Option value={2}>Hoạt động</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="Mô tả" name="description">
          <Input.TextArea placeholder="Nội dung" allowClear />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" className="bg-blue-500 text-white" htmlType="submit">
          {isLoading ? (
              <AiOutlineLoading3Quarters className="animate-spin" />
            ) : (
              "Add"
            )}
          </Button>
          <Button type='primary' danger className='mx-2' onClick={()=>navigate("/admin/service")}>Quay lại</Button>
        </Form.Item>
      </Form>
    </div>
  );
};
