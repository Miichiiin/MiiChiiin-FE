import { Card, Form, Button, Upload, message ,Input} from "antd";
// import { UploadOutlined,CloudUploadOutlined  } from "@ant-design/icons";
import { Link } from "react-router-dom"; 
import {  useGetAdmin_AdminById1Query, useUpdateAdmin_Admin1Mutation } from "@/api/admin/admin_admin1";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
// const { Text } = Typography;


const AdminInfoPage = () => {
  const {id} = useParams()
  const dataUser = useGetAdmin_AdminById1Query(id);
  const [updateProfile] = useUpdateAdmin_Admin1Mutation();
  const [form] = Form.useForm();
  const userAdminLocal = localStorage.getItem('userAdmin') || "";  
  const dataLogin = JSON.parse(userAdminLocal);  
  const idLC = userAdminLocal ? JSON.parse(userAdminLocal)?.id : null;
  const data = idLC === dataUser?.data?.id;
  const list = data ? dataUser.data : null;  

  
  useEffect(() => {
    if (list) {
      // tuổi
      const currentYear = new Date().getFullYear();
      const listYear = new Date(list.date).getFullYear();
      const age = listYear ? currentYear - listYear : null;
      form.setFieldsValue({
        name: list?.name,
        description: list?.description,
        address: list?.address,
        email: list?.email,
        phone: list?.phone,
        name_hotel: dataLogin?.name_hotel,
        role:dataLogin?.role,
        date: age !== null ? age.toString() : '',
        // image
      });
    }
  }, [list, form]);
  
  const onFinish = (values:any) => {
      updateProfile({...values,id:id}).unwrap().then(() =>{
      // navigate("/admin/manageroomtype")
      message.success("Update thành công loại thông tin!")
    })
    console.log('Form values:', values);
  };
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <div className="">
      <Card title="Thông tin Admin">
      <Form
            form={form}
            name="basic"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
        <div className="flex">
          <div className="w-1/3 p-4 border-r flex flex-col items-center justify-center space-y-3">
          <Form.Item label="" name="image" className="mt-5">
            <Upload
              action="/api/upload" // Thay thế bằng đường dẫn API của bạn cho việc tải file lên
              showUploadList={false}
              beforeUpload={(file) => false} // Ngăn việc tải lên tự động khi bấm vào ảnh
            >
              
              <div className="cursor-pointer">
                {/* {adminInfo.image ? ( */}
                  <img
                    src={list?.image}
                    alt="Admin"
                    className="rounded-full w-[150px] h-[150px]"
                    style={{ boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px' }}
                  />
                {/* ) : (
                  <Text type="secondary">Không có hình ảnh</Text>
                )} */}
              </div>
            </Upload>
          </Form.Item>
            <Form.Item label="Địa chỉ" name="address" className="mt-5">
                <Input/>
            </Form.Item>
            <Form.Item label="Email" name="email" className="mt-5">
                 <Input/>
            </Form.Item>
            <Form.Item label="Phone" name="phone" className="mt-5">
               <Input/>
            </Form.Item>
          </div>
          <div className="w-2/3 p-4" >
              <Form.Item label="Tên" name="name" className="mb-4">
                <Input  className="border-b-2"
                 
                />
              </Form.Item>
              <Form.Item label="Tuổi" name="date" className="mb-4">
                <Input className="border-b-2"
                 
                />
              </Form.Item>
              <Form.Item label="Cơ sở làm việc:" name="name_hotel" className="mb-4">
                <Input className="border-b-2"
                
                />
              </Form.Item>
              <Form.Item label="Chức danh" name="role" className="mb-4">
                <Input className="border-b-2"
                 
                />
              </Form.Item>
              <Form.Item 
                label="Mô tả" 
                name="description"
                className="mb-4">
                <Input className="border-b-2"
               
                />
              </Form.Item>
              <Form.Item wrapperCol={{ offset: 8, span: 16 }} className="mb-4">
                <Button
                  type="primary"
                  htmlType="submit"
                  onClick={() => message.success("Thông tin đã được lưu")}
                  className="bg-[#0ea5e9]"
                >
                  Lưu
                </Button>
              </Form.Item>
              {/* <div className="text-center">
                <Link to="/quen-mat-khau">Quên mật khẩu</Link> |{" "}
                <Link to="/thay-doi-mat-khau">Thay đổi mật khẩu</Link>
              </div> */}
          </div>
        </div>
        </Form>
      </Card>
    </div>
  );
};

export default AdminInfoPage;
