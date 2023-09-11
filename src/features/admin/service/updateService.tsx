import { useGetServices_AdminByIdQuery, useUpdateServices_AdminMutation } from '@/api/admin/service_admin';
import { Button, Form, Input, InputNumber, Select, Upload, message } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';


export const UpdateService = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [updateServiceAdmin] = useUpdateServices_AdminMutation();

  // Sử dụng useGetServices_AdminByIdQuery để lấy thông tin dịch vụ
  const { data, isLoading, isError } = useGetServices_AdminByIdQuery(id);

  const onFinish = (values: any) => {
    // Gửi yêu cầu cập nhật dịch vụ bằng API updateServices_Admin
    updateServiceAdmin({ id, ...values }) // Thêm id vào dữ liệu để xác định dịch vụ cần cập nhật
      .then(() => {
        message.success('Cập nhật dịch vụ thành công');
        navigate('/admin/service');
      })
      .catch((error: any) => {
        console.error('Failed:', error);
        message.error('Cập nhật dịch vụ thất bại');
      });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Có lỗi xảy ra khi tải thông tin dịch vụ.</div>;
  }

  return (
    <div>
      <header className="flex justify-between items-center my-5 mx-3">
        <h2 className="text-2xl text-blue-700">Cập nhật dịch vụ</h2>
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

        <Form.Item label="Ảnh" name="image" valuePropName="image" getValueFromEvent={normFile}>
          <Upload action="/upload.do" listType="picture-card">
            {/* Hiển thị ảnh hiện tại hoặc cho phép người dùng tải lên ảnh mới */}
          </Upload>
        </Form.Item>

        <Form.Item label="Trạng thái" name="status" rules={[{ required: true, message: 'Hãy chọn trạng thái dịch vụ!' }]}>
          <Select style={{ width: '150px' }}>
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
            Cập nhật
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
