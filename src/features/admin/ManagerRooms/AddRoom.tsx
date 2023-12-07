import {
  Form,
  Input,
  Select,
  Button,
  message,
} from "antd";

const { Option } = Select;
import { useNavigate } from "react-router-dom";
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useGetCategory_adminQuery } from "@/api/admin/category_admin";
import { useAddRoom_AdminMutation } from "@/api/admin/room_admin";

const AddRoomPage = () => {
  const { data: RoomCategories } = useGetCategory_adminQuery()
  const [addRoom] = useAddRoom_AdminMutation()
  const navigate = useNavigate()

  const onFinish = (values: any) => {
    addRoom(values).unwrap().then(() => {
      message.success('Thêm phòng thành công');
      navigate('/admin/managerroom')
    })
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <div className="text-xl font-semibold">Thêm Phòng</div>
        <button className="px-3 py-2 border hover:bg-orange-400 bg-orange-500 text-white rounded-md flex items-center" onClick={() => navigate(`/admin/managerroom`)}>
          <ArrowLeftOutlined className="mr-2" /> Quay lại
        </button>
      </div>


      <Form name="addRoom" onFinish={onFinish} layout="vertical" labelCol={{ span: 8 }}>
        <div className="flex">
          <div className="w-1/2 bg-white pr-2">
            <Form.Item label="Tên Phòng" name="name" rules={[{ required: true, message: 'Nhập tên phòng' },{whitespace:true, message: 'Không được để khoảng trắng'}]}>
              <Input />
            </Form.Item>

            <Form.Item label="Loại Phòng" name="id_cate" rules={[
              { required: true, message: 'Hãy chọn loại phòng ' },
              { whitespace: true, message: "Không được nhập khoảng trắng"}
              ]}>
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

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="bg-blue-600 text-white rounded-md"
          >
            Thêm Phòng
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddRoomPage;
