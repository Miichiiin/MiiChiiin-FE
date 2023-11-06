
import { Form, Input, InputNumber, Button, message, Spin, Select } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { Link, useNavigate } from "react-router-dom";
import { useAddCategory_adminMutation } from '@/api/admin/category_admin';
import { useState } from 'react';



const AddRoomType = () => {
  const [selectedFile, setSelectedFile] = useState<File>();
  const [addCategory_admin] = useAddCategory_adminMutation()
  const navigate = useNavigate()
  const [isUploading, setIsUploading] = useState(false)

  const onFinish = (values: any) => {
    const body = new FormData()
    body.append('name', values.name)
    body.append('image', selectedFile as File)
    body.append('description', values.description)
    body.append('quantity_of_people', values.quantity_of_people)
    body.append('price', values.price)
    body.append('status', values.status)
    body.append('floor', values.floor)
    body.append('acreage', values.acreage)
    body.append('short_description', values.short_description)
    setIsUploading(true);
    message.loading({ content: 'Đang tải ảnh lên...', key: 'uploading', duration: 6 });
    addCategory_admin(body)
      .unwrap()
      .then(() => {
        navigate("/admin/manageroomtype");
        message.success({ content: 'Thêm loại phòng thành công', key: 'uploading' });
      })
      .catch(() => {
        message.error({ content: 'Thêm loại phòng thất bại', key: 'uploading' });
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
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <div className="text-xl font-semibold">Thêm Loại Phòng</div>

        <Button className="ml-2 px-3 pb-3 bg-red-500 text-white rounded-md">
          <Link to={`/admin/manageroomtype`} className='items-center flex'>
            <ArrowLeftOutlined className='pr-2'/> Quay lại
          </Link>
        </Button>
      </div>

      <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >

        <Form.Item
          label="Tên loại phòng"
          name="name"
          rules={[{ required: true, message: 'Vui lòng nhập tên loại phòng!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="image"
          label="Upload"
        >
          <input type='file' onChange={handleChange} />
        </Form.Item>

        <Form.Item
          label="Mô tả"
          name="description"
          rules={[{ required: true, message: 'Vui lòng nhập mô tả!' }]}
        >
          <Input.TextArea />
        </Form.Item>
        <Form.Item
          label="Mô tả ngắn"
          name="short_description"
          rules={[{ required: true, message: 'Vui lòng nhập mô tả ngắn!' }]}
        >
          <Input.TextArea />
        </Form.Item>

        <Form.Item
          label="Số tầng"
          name="floor"
          rules={[{ required: true, message: 'Vui lòng nhập số tầng!' }]}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item
          label="Số người"
          name="quantity_of_people"
          rules={[{ required: true, message: 'Vui lòng nhập số người!' }]}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item
          label="Giá"
          name="price"
          rules={[{ required: true, message: 'Vui lòng nhập giá phòng!' }]}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item
          label="Diện tích"
          name="acreage"
          rules={[{ required: true, message: 'Vui lòng nhập diện tích!' }]}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item
          label="Trạng thái phòng"
          name="status"
          rules={[{ required: true, message: 'Vui lòng nhập trạng thái phòng!' }]}
        >
          <Select placeholder="Chọn trạng thái">
            <Select.Option value={2}>Đang hoạt động</Select.Option>
            <Select.Option value={1}>Đang bảo trì</Select.Option>
            <Select.Option value={0}>Đang chờ</Select.Option>
          </Select>
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
