import { useGetComfortByIdQuery, useUpdateComfortMutation } from '@/api/admin/comfort_admin';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { Button, Form, Input, Select, Skeleton, message } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';


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
      <header className="flex justify-between items-center mb-5">
        <h2 className="text-lg font-bold text-orange-500">Sửa tiện ích: <span className=' text-orange-900 font-semibold'>{data?.name}</span></h2>
        <button className='px-3 py-2 border hover:bg-orange-400 bg-orange-500 text-white rounded-md flex items-center' onClick={() => navigate("/admin/managerutilities")}>
          <ArrowLeftOutlined className="pr-2" /> Quay lại
        </button>
      </header>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        layout='vertical'
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
          <Select placeholder="Chọn trạng thái"
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


        <Form.Item >
          <Button type="primary" className='bg-blue-500 text-white' htmlType="submit">
            Update Tiện ích
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default UpdateUtilitiesPage;
