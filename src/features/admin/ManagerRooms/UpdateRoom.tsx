import {
    Form,
    Input,
    Select,
    Radio,
    InputNumber,
    DatePicker,
    Button,
    Upload,
  } from "antd";
  
  const { Option } = Select;
  import { Link } from "react-router-dom";
  import { ArrowLeftOutlined} from '@ant-design/icons';
  
  const UpdateRoomPage = () => {
    const onFinish = (values: any) => {
      console.log("Form values:", values);
      // Gửi dữ liệu lên server hoặc xử lý theo yêu cầu của bạn
    };
  
    return (
      <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <div className="text-lg font-semibold">Cập Nhật Phòng</div>
          
          <Button className="ml-2 px-3 pb-3 bg-red-500 text-white rounded-md">
                <Link to={`/admin/managerroom`}>
                  <ArrowLeftOutlined /> Quay lại
                </Link>
          </Button>
        </div>
        
          
        <Form name="addRoom" onFinish={onFinish}>
          <div className="flex">
            <div className="w-1/2 p-4 bg-white pr-2">
              <Form.Item label="id"  name="">
                <Input />
              </Form.Item>
              <Form.Item label="Tên Phòng"  name="" rules={[{ required: true, message: 'Please enter ' }]}>
                <Input />
              </Form.Item>
  
              <Form.Item label="Loại Phòng" name="" rules={[{ required: true, message: 'Please enter ' }]}>
                <Select>
                  <Option value="single">Phòng Đơn</Option>
                  <Option value="double">Phòng Đôi</Option>
                  {/* ...Thêm các loại phòng khác */}
                </Select>
              </Form.Item>
  
              <Form.Item label="Tiện Nghi" >
              <Select mode="multiple" placeholder="Chọn tiện nghi">
                <Option value="wifi">Wifi</Option>
                <Option value="tv">TV</Option>
                {/* ...Thêm các lựa chọn khác */}
              </Select>
            </Form.Item>
              <Form.Item label="Mô Tả Ngắn"  name="" rules={[{ required: true, message: 'Please enter ' }]}>
                <Input.TextArea />
              </Form.Item>
            </div>
            <div className="w-1/2 p-4 bg-white pr-2">
              <Form.Item label="Trạng Thái" name="" rules={[{ required: true, message: 'Please enter ' }]}>
                <Radio.Group>
                  <Radio value="available">Có sẵn</Radio>
                  <Radio value="occupied">Đã đặt</Radio>
                  {/* ...Thêm các trạng thái khác */}
                </Radio.Group>
              </Form.Item>
  
              <div className="flex">
                <Form.Item
                  className="w-1/2 pr-2"
                  label="Sức Chứa"
                  name="" rules={[{ required: true, message: 'Please enter ' }]}
                  
                >
                  <InputNumber />
                </Form.Item>
                <Form.Item
                  className="w-1/2 pl-2"
                  label="Ngày Tạo"
                  name="" rules={[{ required: true, message: 'Please enter ' }]}
                >
                  <DatePicker />
                </Form.Item>
              </div>
  
              <div className="flex">
                <Form.Item
                  className="w-1/2 pr-2"
                  label="Giá Đã Giảm"
                  name="" rules={[{ required: true, message: 'Please enter ' }]}
                >
                  <InputNumber />
                </Form.Item>
  
                <Form.Item
                  className="w-1/2 pr-2"
                  label="Giá Gốc"
                  name="" rules={[{ required: true, message: 'Please enter ' }]}
                >
                  <InputNumber />
                </Form.Item>
              </div>
  
              <Form.Item label="Mô Tả Dài"  name="" rules={[{ required: true, message: 'Please enter ' }]}>
                <Input.TextArea />
              </Form.Item>
            </div>
          </div>
          <div className="w-full p-4 bg-white mt-4">
            <Form.Item label="Hình Ảnh"  name="" rules={[{ required: true, message: 'Please enter ' }]}>
              <Upload>
                <Button>Tải lên</Button>
              </Upload>
            </Form.Item>
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
  