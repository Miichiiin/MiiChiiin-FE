import {
  Form,
  Input,
  Select,
  Button,
  message,
} from "antd";

const { Option } = Select;
import { Link } from "react-router-dom";
import { ArrowLeftOutlined} from '@ant-design/icons';
import { useGetCategory_adminQuery } from "@/api/admin/category_admin";
import { useAddRoom_AdminMutation } from "@/api/admin/room_admin";

const AddRoomPage = () => {
  const {data:RoomCategories} = useGetCategory_adminQuery()
  const [addRoom] = useAddRoom_AdminMutation()
  console.log(RoomCategories);
  
  const onFinish = (values: any) => {
    console.log("Form values:", values);
    addRoom(values).unwrap().then(() => {
      message.success('Thêm phòng thành công');
    })
  };

  return (
    <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
      <div className="text-xl font-semibold">Thêm Phòng</div>
        
        <Button className="ml-2 px-3 pb-3 bg-red-500 text-white rounded-md">
              <Link to={`/admin/managerroom`} className="flex items-center">
                <ArrowLeftOutlined  className="mr-2"/> Quay lại
              </Link>
        </Button>
      </div>
      
        
      <Form name="addRoom" onFinish={onFinish}>
        <div className="flex">
          <div className="w-[400px] p-4 bg-white pr-2">
            <Form.Item label="Tên Phòng"  name="name" rules={[{ required: true, message: 'Nhập tên phòng' }]}>
              <Input />
            </Form.Item>

            <Form.Item label="Loại Phòng" name="id_cate" rules={[{ required: true, message: 'Hãy chọn loại phòng ' }]}>
              <Select>
                {RoomCategories?.map((item:any) => (
                  <Option key={item.id} value={item.id}>{item.name}</Option>
                ))}
              </Select>
              
            </Form.Item>

          </div>
          <div className="w-1/2 p-4 bg-white pr-2">
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
            Thêm Phòng
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddRoomPage;
