import {
  Form,
  Input,
  Select,
  Button,
  message,
} from "antd";
const { Option } = Select;
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useGetCategory_adminQuery } from "@/api/admin/category_admin";
import { useGetRoom_AdminByIdQuery, useUpdateRoom_AdminMutation } from "@/api/admin/room_admin";
const UpdateRoomPage = () => {
  const { data: RoomCategories } = useGetCategory_adminQuery()
  const navigate = useNavigate();
  const { id } = useParams();
  const { data, isLoading, isError } = useGetRoom_AdminByIdQuery(id)
  const roomData = data?.[0]

  const [updateRoom] = useUpdateRoom_AdminMutation();
  const onFinish = (values: any) => {
    console.log("Form values:", values);
    updateRoom({ ...values, id }).unwrap().then(() => {
      navigate("/admin/managerroom");
      message.success('Sửa phòng thành công');
    })
  };
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Có lỗi xảy ra khi tải thông tin dịch vụ.</div>;
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <div className="text-xl font-semibold">Cập Nhật Phòng: <span className="text-3xl text-blue-800">{data.name}</span></div>

        <button className="px-3 py-2 border hover:bg-orange-400 bg-orange-500 text-white rounded-md flex items-center" onClick={() => navigate(`/admin/managerroom`)}>
          <ArrowLeftOutlined className="mr-2" /> Quay lại
        </button>
      </div>

      <Form
        name="updateRoom"
        initialValues={roomData}
        onFinish={onFinish}
        layout="vertical"
        labelCol={{ span: 8 }}
      >
        <div className="flex">
          <div className="w-1/2 bg-white pr-2">
            <Form.Item label="Tên Phòng" name="name" rules={[{ required: true, message: 'Nhập tên phòng' }]}>
              <Input />
            </Form.Item>

            <Form.Item label="Loại Phòng" name="id_cate" rules={[{ required: true, message: 'Hãy chọn loại phòng ' }]}>
              <Select>
                {RoomCategories?.map((item: any) => (
                  <Option key={item.id} value={item.id}>{item.name}</Option>
                ))}
              </Select>

            </Form.Item>

          </div>
          <div className="w-1/2 bg-white pr-2">
            <Form.Item label="Trạng Thái" name="status" rules={[{ required: true, message: 'Hãy chọn trạng thái ' }]}>
              <Select placeholder="Chọn trạng thái">
                <Select.Option value={1}>Đã ẩn</Select.Option>
                <Select.Option value={0}>Đang chờ</Select.Option>
                <Select.Option value={2}>Hoạt động</Select.Option>
              </Select>
            </Form.Item>
          </div>
        </div>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="bg-blue-600 text-white rounded-md"
          >
            Cập Nhật Phòng
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default UpdateRoomPage;
