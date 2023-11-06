import { useGetComfortByIdQuery, useUpdateComfortMutation } from '@/api/admin/comfort_admin';
import { Button, Form, Input, Select, Skeleton, message } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';

const { Option } = Select;

const UpdateUtilitiesPage = () => {
  const navigate = useNavigate()
  const [updateUtil] = useUpdateComfortMutation()

  const { id } = useParams<{ id: string }>();
  const { data, isLoading, isError } = useGetComfortByIdQuery(id || "");


  type FieldType = {
    key: number;
    id: string | number;
    name: string;
    description: string;
    status: string;
    alt: string;
  }
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  const onFinish = (values: FieldType) => {
    updateUtil({ ...values, id: id }).unwrap().then(() => {
      message.success('Sửa tiện ích thành công')
      navigate('/admin/managerutilities')
    });
  }
  if (isLoading) {
    return <Skeleton active />
  }
  if (isError) {
    message.error('Có lỗi xảy ra khi tải thông tin tiện ích.')
  }

  return (
    <div>
      <header className="flex justify-between items-center my-5 mx-3">
        <h2 className="text-2xl  text-blue-700">Sửa tiện ích: <span className='font-semibold'>{data?.name}</span></h2>
      </header>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={data}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Tên tiện ích"
          name="name"
          rules={[{ required: true, message: 'Hãy nhập tên tiện ích!' },
          { whitespace: true, message: 'Không được để trống!' }]}
        >
          <Input allowClear />
        </Form.Item>
        <Form.Item
          label="Trạng thái"
          name="status"
          rules={[{ required: true, message: 'Hãy chọn trạng thái!' }]}
        >
          <Select placeholder="Chọn trạng thái" style={{ width: '150px' }}
          >
            <Select.Option value={0}>Đang chờ</Select.Option>
            <Select.Option value={1}>Đã ẩn</Select.Option>
            <Select.Option value={2}>Hoạt động</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="Mô tả"
          name="description"
          rules={[{ required: true, message: 'Hãy nhập mô tả!' },
          { whitespace: true, message: 'Không được để trống!' }]}
        >
          <Input.TextArea placeholder="Nội dung" allowClear />
        </Form.Item>


        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" className='bg-blue-500 text-white' htmlType="submit">
            Update Tiện ích
          </Button>
          <Button type="primary" danger className='mx-2' onClick={() => navigate("/admin/managerutilities")}>
            Quay lại
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default UpdateUtilitiesPage;
