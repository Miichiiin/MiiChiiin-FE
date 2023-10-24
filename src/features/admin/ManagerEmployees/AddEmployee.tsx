import  { useState } from 'react';
import { Input, DatePicker, Select, Button, Upload, Form, Radio ,message} from 'antd';
import {  ArrowLeftOutlined, InboxOutlined, UploadOutlined} from '@ant-design/icons';
import { Link ,useNavigate} from 'react-router-dom';
import { useAddAdmin_AdminMutation } from '@/api/admin/admin_admin';
import { useGetRolesQuery } from '@/api/admin/role_admin';
import { useAddAdmin_admin_AdminMutation, useGetAdmin_admin_AdminQuery } from '@/api/admin/admin_admin_admin';
import { useGetRoles1Query } from '@/api/admin/role1_admin';
import { format } from 'date-fns';



const { Option } = Select;
interface DataType {
  name: string
  id:number
}
const AddEmployeePage = () => {
  const navigate = useNavigate()
  const {data:dataAdmin} = useGetAdmin_admin_AdminQuery({});
  const [selectedFile, setSelectedFile] = useState(null);
  const [addEmployee] = useAddAdmin_admin_AdminMutation()
  const [form] = Form.useForm();
  const {data: dataRole} = useGetRoles1Query({});
  const [fileList, setFileList] = useState([]);// ảnh
  const data = dataRole?.map(({id,name}:DataType) =>({
    key:id,
    name:name,
  }));
  // check trùng email
  const checkEmailDuplicate = async (rule:any, value:string) => {
    const emailExists = dataAdmin.some((item:any) => item.email === value);
    if (emailExists) {
      return Promise.reject('Email đã tồn tại. Vui lòng sử dụng email khác.');
    }
    return Promise.resolve();
  };
  // thêm nhân viên
  const handleSubmit = (values:any) => {
    // chuyển ngày sang dạng chuỗi
    if (values.date && !isNaN(new Date(values.date).getTime())) {
      values.date = format(new Date(values.date), 'yyyy-MM-dd');
    }
   
   
    const newValue = {
      image: selectedFile,
      ...values,
  }
  console.log("newValue", newValue);
  
    addEmployee(newValue).unwrap().then(() =>{
      navigate("/admin/manageremployee")
      message.success("Thêm nhân viên thành công!")
    })
    console.log('Form values:', newValue);
  };
  // ảnh
  const normFile = (e:any) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };
 
console.log("fileanh",selectedFile);

  // const handleFileChange = (event) => {
  //   const file = event.target.files[0];
  //   setSelectedFile(file);
  //   // console.log("event", event.target);
    
  //   // Xử lý file tại đây nếu cần
  // };
  // const handleUpload = (file) => {
  //   console.log('Uploaded file:', file);
  // };
  return (
    <div>
     
     <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
      <div className="text-lg font-semibold">Thêm Nhân Viên</div>
        <Button className="ml-2 px-3 pb-3 bg-red-500 text-white rounded-md">
              <Link to={`/admin/manageremployee`}>
                <ArrowLeftOutlined /> Quay lại
              </Link>
        </Button>
      </div>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        encType="multipart/form-data"
        className="flex"
      >
          <div className="w-1/2 p-4 bg-white">
                <Form.Item label="Tên Nhân Viên" name="name" rules={[{ required: true, message: 'Vui lòng nhâp tên nhân viên!' }]}>
                  <Input />
                </Form.Item>
                <Form.Item label="Giới Tính" name="gender" rules={[{ required: true }]}>
                  <Radio.Group>
                    <Radio value="male">Nam</Radio>
                    <Radio value="female">Nữ</Radio>
                  </Radio.Group>
                </Form.Item>

                <Form.Item label="Ngày Sinh" name="date" rules={[{ required: true, message: 'Vui lòng nhập ngày sinh nhân viên! ' }]}>
                <DatePicker />
                </Form.Item>
                <div className='flex space-x-10'>
                  <Form.Item label="Mật khẩu" className='w-[46%]' name="password" 
                    rules={[
                        { required: true, message: 'Vui lòng nhập mật khẩu! ' },
                        {min:6,message:"Mật khẩu chứa ít nhất 6 kí tự!"}
                      ]}>
                    <Input.Password/>
                  </Form.Item>
                </div>
                <Form.Item label="Chọn Role"  name="role" rules={[{ required: true, message: 'Vui lòng chọn vai trò!' }]}>
                  <Select style={{ width: 200 }}>
                    {data?.map((item: any, index: any) => (
                      <Option key={index} value={item.key}>
                        {item.name}
                      </Option>
                    ))}
                  </Select>
              </Form.Item>

          </div>
          <div className="w-1/2 p-4">
                <Form.Item label="Địa Chỉ" name="address" rules={[{ required: true, message: 'Vui lòng nhập địa chỉ nhân viên !' }]}>
                  <Input.TextArea />
                </Form.Item>

                <Form.Item label="Số Điện Thoại"name="phone" 
                  rules={[
                      { required: true, message: 'Vui lòng nhập số điện thoại nhân viên!' },
                      { pattern: /^(0[2-9]|84[2-9])(\d{8}|\d{9})$/, message: 'Vui lòng nhập số điện thoại theo định dạng!' },
                      {max:10,message:"Số điện thoại không được vượt quá 10 kí tự!"}
                    ]}>
                  <Input />
                </Form.Item>

                <Form.Item label="Email" name="email" 
                  rules={[
                      { required: true, message: 'Vui lòng nhập email! ' },
                      {type: "email",message:"Email chưa dúng định dạng!"},
                      { validator: checkEmailDuplicate },
                    ]}>
                  <Input />
                </Form.Item>

                <Form.Item
                  name="image"
                  label="Upload"
                  valuePropName="fileList"
                  getValueFromEvent={normFile}
                >
                  <Upload name="image" listType="picture" fileList={fileList} beforeUpload={() => false}>
                    <Button icon={<InboxOutlined />}>Click to upload</Button>
                  </Upload>
                </Form.Item>
                {/* <Upload
                  action="/upload"
                  onChange={handleUpload}
                  showUploadList={false}
                >
                  <Button icon={<UploadOutlined />}>Tải lên</Button>
                </Upload> */}
                <div>
              {/* <input type="file" onChange={handleFileChange} /> */}
         </div>
            <Form.Item>
              <Button type="primary" htmlType="submit" className=' bg-blue-600 text-white rounded-md'>Thêm nhân viên</Button>
            </Form.Item>
          </div>
      </Form>
    </div>
    
  );
};

export default AddEmployeePage;