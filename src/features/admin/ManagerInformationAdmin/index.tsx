import { Card, Form, Button, Upload, message ,Input} from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useGetAdmin_admin_AdminByIdQuery, useRemoveAdmin_admin_AdminMutation } from "@/api/admin/admin_admin_admin";


const AdminInfoPage = () => {
  const {id} = useParams()
  const dataUser = useGetAdmin_admin_AdminByIdQuery(id);
  const [updateProfile] = useRemoveAdmin_admin_AdminMutation();
  const [form] = Form.useForm();
  const userAdminLocal = localStorage.getItem('userAdmin') || "";  
  const dataLogin = JSON.parse(userAdminLocal);  
  const idLC = userAdminLocal ? JSON.parse(userAdminLocal)?.id : null;
  const data = idLC === dataUser?.data?.id;
  const list = data ? dataUser.data : null;  
  const navigate = useNavigate()
  
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
            layout="vertical"
        >
        <div className="flex">
          <div className="w-1/3 border-r flex flex-col items-center justify-center ">
          <Form.Item label="" name="image" className="">
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
            <div className="w-full mr-7">
            <Form.Item label="Địa chỉ" name="address" >
                <Input className="w-full"/>
            </Form.Item>
            <Form.Item label="Email" name="email" >
                 <Input/>
            </Form.Item>
            <Form.Item label="Phone" name="phone">
               <Input/>
            </Form.Item>
            </div>
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
                  className="bg-[#0ea5e9] "
                >
                  Lưu
                </Button>
                <button className="mx-2 px-3 py-[4.5px] border hover:bg-orange-600 bg-orange-500 text-white rounded-md"  onClick={()=>navigate(`/admin`)}>Quay lại</button>
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
