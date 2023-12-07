import {
  Form,
  Input,
  Select,
  Button,
  message,
  Popconfirm,
} from "antd";
const { Option } = Select;
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useGetCategory_adminQuery } from "@/api/admin/category_admin";
import { useGetRoom_AdminByIdQuery, useRemoveRoom_AdminMutation, useUpdateRoom_AdminMutation } from "@/api/admin/room_admin";
import { FaRegTrashAlt } from "react-icons/fa";
import { FiTool } from "react-icons/fi";
const UpdateRoomPage = () => {
  const { data: RoomCategories } = useGetCategory_adminQuery()

  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>()
  const { data, isLoading, isError } = useGetRoom_AdminByIdQuery(id)

  const roomData = data?.[0]

  const [updateRoom] = useUpdateRoom_AdminMutation();
  const [removeRoom, { isLoading: isRemoving }] = useRemoveRoom_AdminMutation();

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
  if (isRemoving) {
    message.loading({ content: 'Đang xóa ...', key: 'updatable', duration: 0.5 });
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <div className="text-lg text-orange-500 font-bold">Cập Nhật Phòng: <span className="text-xl text-orange-800">{roomData?.name}</span></div>

        <div className="flex items-center  space-x-2">
          <button className="px-3 py-2 border hover:bg-orange-400 bg-orange-500 text-white rounded-md flex items-center" onClick={() => navigate(`/admin/managerroom`)}>
            <ArrowLeftOutlined className="mr-2" /> Quay lại
          </button>
          <Popconfirm
            title="Xóa phòng"
            description="Bạn có muốn xóa không??"
            onConfirm={() => {
              removeRoom(id || "")?.unwrap().then(() => {
                message.success("Xóa thành công");
                navigate("/admin/managerroom");
              });
            }}
            okText="Có"
            cancelText="Không"
          >
            <button
              className=' px-3 py-2 hover:bg-red-600 bg-red-500 text-white rounded-md flex items-center '>
              <FaRegTrashAlt className="mr-2" /> Xoá phòng
            </button>
          </Popconfirm>
        </div>

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
                <Select.Option value={1}>Ngừng hoạt động</Select.Option>
                <Select.Option value={2}>Đang hoạt động</Select.Option>
              </Select>
            </Form.Item>
          </div>
        </div>

        <div className="flex items-center">
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="bg-blue-600 text-white rounded-md "
            >
              <div className="flex items-center">Cập nhật phòng <FiTool className="ml-2" /></div>
            </Button>
          </Form.Item>
        </div>
      </Form>

    </div>
  );
};

export default UpdateRoomPage;
