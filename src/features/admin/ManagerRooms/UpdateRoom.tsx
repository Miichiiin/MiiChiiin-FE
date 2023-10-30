import {
  Form,
  Input,
  Select,
  Button,
  message,
} from "antd";
const { Option } = Select;
import { Link, useParams } from "react-router-dom";
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useGetCategory_adminQuery } from "@/api/admin/category_admin";
import { useGetRoom_AdminByIdQuery, useUpdateRoom_AdminMutation } from "@/api/admin/room_admin";
const UpdateRoomPage = () => {
  const { data: RoomCategories } = useGetCategory_adminQuery()
  const { id } = useParams();
  const {data, isLoading, isError} = useGetRoom_AdminByIdQuery(id)
  const [updateRoom] = useUpdateRoom_AdminMutation();
  const onFinish = (values: any) => {
    console.log("Form values:", values);
    updateRoom({...values, id}).unwrap().then(() => {
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

        <Button className="ml-2 px-3 pb-3 bg-red-500 text-white rounded-md">
          <Link to={`/admin/managerroom`}>
            <ArrowLeftOutlined /> Quay lại
          </Link>
        </Button>
      </div>

      <Form 
       name="updateRoom"
        initialValues={data} 
       onFinish={onFinish}>
        <div className="flex justify-center">
          <div className="w-1/2 p-4 bg-white pr-2">
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
            <Form.Item label="Trạng Thái" name="status" rules={[{ required: true, message: 'Hãy chọn trạng thái ' }]}>
              <Select placeholder="Chọn trạng thái">
                <Select value={1}>Có sẵn</Select>
                <Select value={0}>Đã đặt</Select>
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
