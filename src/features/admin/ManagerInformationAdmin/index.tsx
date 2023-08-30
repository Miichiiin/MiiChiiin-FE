import { Card, Form, Button, Upload, message, Typography } from "antd";
import { UploadOutlined,CloudUploadOutlined  } from "@ant-design/icons";
import { Link } from "react-router-dom"; // Import thư viện react-router-dom

const { Text } = Typography;

const AdminInfoPage = () => {
  const adminInfo = {
    name: "Tên Admin",
    age: 30,
    workplace: "Cơ sở A",
    position: "Chức danh XYZ",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRv95H4EPRO6t-QWfECFA7hTCW5Lw2fLlHTKS6JScPsLJZsefRVbTiKJSIh9k0WSwZ6ilw&usqp=CAU",
  };

  return (
    <div className="">
      <Card title="Thông tin Admin">
        <div className="flex">
          <div className="w-1/3 p-4 border-r">
            {adminInfo.image ? (
              <img
                src={adminInfo.image}
                alt="Admin"
                style={{ maxWidth: "100%" }}
              />
            ) : (
              <Text type="secondary">Không có hình ảnh</Text>
            )}
            <Form.Item label="Image" name="image" className="mt-5">
              <Upload
                action="/api/upload" // Replace with your image upload API endpoint
                showUploadList={false}
               
              >
                <Button icon={<CloudUploadOutlined />}>Upload Image</Button>
              </Upload>
             
            
            </Form.Item>
          </div>
          <div className="w-2/3 p-4">
            <Form labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
              <Form.Item label="Tên" className="mb-4">
                <Text strong>{adminInfo.name}</Text>
                <div className="border-t mt-2"></div>
              </Form.Item>
              <Form.Item label="Tuổi" className="mb-4">
                <Text strong>{adminInfo.age}</Text>
                <div className="border-t mt-2"></div>
              </Form.Item>
              <Form.Item label="Cơ sở làm việc:" className="mb-4">
                <Text strong>{adminInfo.workplace}</Text>
                <div className="border-t mt-2"></div>
              </Form.Item>
              <Form.Item label="Chức danh" className="mb-4">
                <Text strong>{adminInfo.position}</Text>
                <div className="border-t mt-2"></div>
              </Form.Item>
              <Form.Item wrapperCol={{ offset: 8, span: 16 }} className="mb-4">
                <Button
                  type="primary"
                  onClick={() => message.success("Thông tin đã được lưu")}
                >
                  Lưu
                </Button>
              </Form.Item>
              <div className="text-center">
                <Link to="/quen-mat-khau">Quên mật khẩu</Link> |{" "}
                <Link to="/thay-doi-mat-khau">Thay đổi mật khẩu</Link>
              </div>
            </Form>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default AdminInfoPage;
