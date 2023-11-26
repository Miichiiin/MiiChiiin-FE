
import { Form, Input, InputNumber, Button, message, Spin, Select } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useNavigate } from "react-router-dom";
import { useAddCategory_adminMutation } from '@/api/admin/category_admin';
import { useState } from 'react';
import { useGetComfortQuery } from '@/api/admin/comfort_admin';



const AddRoomType = () => {
  const [selectedFile, setSelectedFile] = useState<File>();
  const [addCategory_admin] = useAddCategory_adminMutation()
  const navigate = useNavigate()
  const [isUploading, setIsUploading] = useState(false)
  const { data: comforts } = useGetComfortQuery({})


  const onFinish = (values: any) => {
    const comfort = values.comfort

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
    comfort.forEach((item: any, index: any) => {
      body.append(`comfort[${index}]`, item);
    })
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
      {isUploading && <Spin className='animate' />}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <div className="text-lg font-bold text-orange-500">Thêm Loại Phòng</div>

        <button className="px-3 py-2 border hover:bg-orange-400 bg-orange-500 text-white rounded-md flex items-center" onClick={() => navigate("/admin/manageroomtype")}>
          <ArrowLeftOutlined className='pr-2' /> Quay lại
        </button>
      </div>

      <Form
        labelCol={{ span: 6 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        layout='vertical'
      >

        <div className='flex justify-between space-x-8'>
          <div className='w-1/2'>
            <Form.Item
              label="Tên loại phòng"
              name="name"
              rules={[{ required: true, message: 'Vui lòng nhập tên loại phòng!' }]}
            >
              <Input />
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
              label="Trạng thái"
              name="status"
              rules={[{ required: true, message: 'Vui lòng nhập trạng thái phòng!' }]}
            >
              <Select placeholder="Chọn trạng thái" >
                <Select.Option value={2}>Đang hoạt động</Select.Option>
                <Select.Option value={1}>Đang bảo trì</Select.Option>
                <Select.Option value={0}>Đang chờ</Select.Option>
              </Select>
            </Form.Item>
          </div>

          <div className='w-1/2'>
            <Form.Item
              label="Số tầng"
              name="floor"
              rules={[{ required: true, message: 'Vui lòng nhập số tầng!' }]}
            >
              <InputNumber className='w-full' />
            </Form.Item>
            <Form.Item
              label="Số người"
              name="quantity_of_people"
              rules={[{ required: true, message: 'Vui lòng nhập số người!' }]}
            >
              <InputNumber className='w-full' />
            </Form.Item>
            <Form.Item
              label="Giá"
              name="price"
              rules={[{ required: true, message: 'Vui lòng nhập giá phòng!' }]}
            >
              <InputNumber className='w-full' />
            </Form.Item>
            <Form.Item
              label="Diện tích"
              name="acreage"
              rules={[{ required: true, message: 'Vui lòng nhập diện tích!' }]}
            >
              <InputNumber className='w-full' />
            </Form.Item>

            <Form.Item
              label="Tiện ích"
              name="comfort"
              rules={[{ required: true, message: 'Vui lòng nhập trạng thái phòng!' }]}

            >

              <Select placeholder="Chọn tiện tích" mode='multiple'>
                {comforts?.map((item: any) => (
                  <Select.Option key={item.id} value={item.id}>
                    {item.name}
                  </Select.Option>
                ))}
              </Select>

            </Form.Item>




            <Form.Item
              name="image"
              label="Upload"
            >
              <input type='file' onChange={handleChange} />
            </Form.Item>
          </div>
        </div>

        <Form.Item >
          <Button type="primary" htmlType="submit" className=' bg-blue-600 text-white rounded-md'>
            Thêm loại phòng
          </Button>
        </Form.Item>
      </Form>

    </div>
  );
};

export default AddRoomType;
