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
import { ArrowLeftOutlined } from "@ant-design/icons";

const UpdateFeedBackPage = () => {
  const onFinish = (values: any) => {
    console.log("Form values:", values);
    // Gửi dữ liệu lên server hoặc xử lý theo yêu cầu của bạn
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "16px",
        }}
      >
        <div className="text-lg font-semibold">Cập Nhật FeedBack</div>

        <Button className="ml-2 px-3 pb-3 bg-red-500 text-white rounded-md">
          <Link to={`/admin/managerfeedback`}>
            <ArrowLeftOutlined /> Quay lại
          </Link>
        </Button>
      </div>

      <Form name="addRoom" onFinish={onFinish}>
        <div className="flex">
          <div className="w-1/2 p-4 bg-white pr-2">
            <Form.Item label="id" name="">
              <Input />
            </Form.Item>

            <Form.Item
              label="Tên Khách Hàng"
              name=""
              rules={[{ required: true, message: "Please enter " }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Email"
              name=""
              rules={[{ required: true, message: "Please enter " }]}
            >
              <Input.TextArea />
            </Form.Item>

            <Form.Item
              label="Sđt"
              name=""
              rules={[{ required: true, message: "Please enter " }]}
            >
              <Input />
            </Form.Item>
          </div>
          <div className="w-1/2 p-4 bg-white pr-2">
            <Form.Item
              label="Ngày feedback"
              name="feedbackDate"
              rules={[
                { required: true, message: "Vui lòng chọn ngày feedback" },
              ]}
            >
              <DatePicker />
            </Form.Item>
            <Form.Item
              label="Nội dung"
              name="content"
              rules={[{ required: true, message: "Vui lòng nhập nội dung" }]}
            >
              <Input.TextArea rows={4} />
            </Form.Item>

            <Form.Item
              label="Mô Tả Dài"
              name=""
              rules={[{ required: true, message: "Please enter " }]}
            >
              <Input.TextArea />
            </Form.Item>
        <Form.Item label="Trạng Thái" name="" rules={[{ required: true, message: 'Please enter ' }]}>
                <Select>
                  <Option value="">Đã Duyệt</Option>
                  <Option value="">Đang Duyệt</Option>
                  <Option value="">Chưa Duyệt</Option>
                  
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

export default UpdateFeedBackPage;
