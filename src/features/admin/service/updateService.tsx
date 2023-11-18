
import { useGetService_adminIdQuery, useUpdateService_adminMutation } from '@/api/admin/service_admin';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { Button, Form, Image, Input, InputNumber, Select, message, Skeleton, Spin } from 'antd';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';


export const UpdateService = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>()
  const { data, isLoading, isError } = useGetService_adminIdQuery(id)
  const [updateServiceAdmin] = useUpdateService_adminMutation();
  const [selectedFile, setSelectedFile] = useState<File>();
  const [isImageChanged, setIsImageChanged] = useState(false);
  const [isUploading, setIsUploading] = useState(false)

  const onFinish = (values: any) => {
    const body = new FormData()
    if (id) {
      body.append('id', id);
    }
    body.append('name', values.name)
    body.append('description', values.description)
    body.append('quantity', values.quantity)
    body.append('price', values.price)
    body.append('status', values.status)
    if (isImageChanged) {
      body.append('image', selectedFile as File);
    } else {
      body.append('image', data?.image);
    }
    setIsUploading(true);

    message.loading({ content: 'Đang tải ảnh lên...', key: 'uploading', duration: 6 });

    updateServiceAdmin(body).unwrap()
      .then(() => {
        message.success({ content: 'Cập nhật dịch vụ thành công', key: 'uploading' });
        navigate('/admin/service');
      })
      .catch(() => {
        message.error({ content: 'Cập nhật dịch vụ thất bại', key: 'uploading' });
      })
      .finally(() => {
        setIsUploading(false);
      });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target
    const selectedFiles = files as FileList
    setSelectedFile(selectedFiles?.[0])
    setIsImageChanged(true);
  };

  if (isLoading) {
    return <Skeleton active />
  }

  if (isError) {
    message.error('Tải dịch vụ thất bại')
  }


  return (
    <div>
      {isUploading && <Spin className='animate' />}
      <header className="flex justify-between items-center mb-5">
        <h2 className="text-xl font-semibold ">Cập nhật dịch vụ: <span className='text-2xl text-blue-700 font-semibold'>{data?.name}</span></h2>
        <button className='px-3 py-2 border hover:bg-orange-400 bg-orange-500 text-white rounded-md flex items-center' onClick={() => navigate("/admin/service")}>
          <ArrowLeftOutlined className="pr-2" /> Quay lại
        </button>
      </header>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        layout='vertical'
        initialValues={data} // Sử dụng dữ liệu hiện có để điền vào các trường
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item label="Tên dịch vụ" name="name" rules={[{ required: true, message: 'Hãy nhập tên dịch vụ!' }]}>
          <Input allowClear />
        </Form.Item>

        <Form.Item label="Giá" name="price" rules={[{ required: true, message: 'Hãy nhập giá dịch vụ!' }]}>
          <InputNumber className='w-full' />
        </Form.Item>

        <Form.Item
          name="image"
          label="Upload"
        >
          <input type='file' onChange={handleChange} />
          <Image src={data?.image} className='my-2' width={100} height={100} />
        </Form.Item>

        <Form.Item
          label="Số lượng"
          name="quantity"
          rules={[{ required: true, message: 'Hãy nhập số lượng dịch vụ!' }]}
        >
          <InputNumber className='w-full' />
        </Form.Item>

        <Form.Item label="Trạng thái" name="status" >
          <Select placeholder="Chọn trạng thái " >
            <Select.Option value={1} >Đang chờ</Select.Option>
            <Select.Option value={0}>Ẩn</Select.Option>
            <Select.Option value={2}>Hoạt động</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item label="Mô tả" name="description">
          <Input.TextArea placeholder="Nội dung" allowClear />
        </Form.Item>

        <Form.Item >
          <Button type="primary" className="bg-blue-500 text-white" htmlType="submit">
            Cập nhật
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
