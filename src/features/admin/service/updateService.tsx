
import { useGetService_adminIdQuery, useUpdateService_adminMutation } from '@/api/admin/service_admin';
import { Button, Form, Image, Input, InputNumber, Select, message,Skeleton, Spin} from 'antd';
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
      return <Skeleton active/>
  }

  if (isError) {
    message.error('Tải dịch vụ thất bại')
  }


  return (
    <div>
      {isUploading && <Spin className='animate' />}
      <header className="flex justify-between items-center my-5 mx-3">
        <h2 className="text-2xl ">Cập nhật dịch vụ: <span className='text-blue-700 font-semibold'>{data?.name}</span></h2>
      </header>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={data} // Sử dụng dữ liệu hiện có để điền vào các trường
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item label="Tên dịch vụ" name="name" rules={[{ required: true, message: 'Hãy nhập tên dịch vụ!' }]}>
          <Input allowClear />
        </Form.Item>

        <Form.Item label="Giá" name="price" rules={[{ required: true, message: 'Hãy nhập giá dịch vụ!' }]}>
          <InputNumber />
        </Form.Item>

        <Form.Item
          name="image"
          label="Upload"
        >
          <input type='file' onChange={handleChange} />
          <Image src={data?.image} className='w-[100px] h-[100px] my-2' />
        </Form.Item>
        
        <Form.Item
          label="Số lượng"
          name="quantity"
          rules={[{ required: true, message: 'Hãy nhập số lượng dịch vụ!' }]}
        >
          <InputNumber />
        </Form.Item>

        <Form.Item label="Trạng thái" name="status" >
          <Select placeholder="Chọn trạng thái " style={{ width: '150px' }}>
            <Select.Option value={1}>Có sẵn</Select.Option>
            <Select.Option value={0}>Đã thuê</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item label="Mô tả" name="description">
          <Input.TextArea placeholder="Nội dung" allowClear />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" className="bg-blue-500 text-white" htmlType="submit">
            Cập nhật
          </Button>
          <Button type="primary" danger className='mx-2' onClick={()=>navigate("/admin/service")}>
            Quay lại
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
