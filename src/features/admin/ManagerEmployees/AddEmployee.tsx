import  { useState } from 'react';
import { Input, DatePicker, Select, Button, Form, Radio ,message} from 'antd';
import {  ArrowLeftOutlined} from '@ant-design/icons';
import { Link ,useNavigate} from 'react-router-dom';
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
  const [selectedFile, setSelectedFile] = useState<File>();
  const [addEmployee , {isLoading: isCreatingEmployee}] = useAddAdmin_admin_AdminMutation()
  const [form] = Form.useForm();
  const {data: dataRole} = useGetRoles1Query({});
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
      const body = new FormData()
      body.append('name',  values.name) 
      body.append('image', selectedFile as File) 
      body.append('address', values.address)
      body.append('date', values.date)
      body.append('email', values.email)
      // body.append('gender', values.gender)
      body.append('password', values.password)
      body.append('phone', values.phone)
      body.append('role', values.role)
      body.append('description', values.description)
      console.log('body', body)
    addEmployee(body).unwrap().then(() =>{
      navigate("/admin/manageremployee")
      message.success("Thêm nhân viên thành công!")
    })
    
  };
 
  const handleChange = (event:React.ChangeEvent<HTMLInputElement>  ) => {
   const {files} = event.target
    const selectedFiles = files as FileList
    setSelectedFile(selectedFiles?.[0])
    // if (info.file.status === 'uploading') {
    //   return;
    // }
    // if (info.file.status === 'done') {
    //   // Get this url from response in real world.
    //   getBase64(info.file.originFileObj as RcFile, (url) => {
    //     console.log('url', url)
    //     // setSelectedFile(url);
    //   });
    // }
  };
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
                <Form.Item label="Mô tả" className='w-[46%]' name="description" colon={false}>
                    <Input.TextArea/>
                  </Form.Item>
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
                >
                  <input type='file' onChange={handleChange}/>
                  {/* <Upload  onChange={handleChange} name="avatar" action="http://localhost:5173/admin/addemployee"   >
                    <Button icon={<InboxOutlined />}>Click to upload</Button>
                  </Upload> */}
                </Form.Item>
              
                <div>
         </div>
            <Form.Item>
              <Button loading={isCreatingEmployee} type="primary" htmlType="submit" className=' bg-blue-600 text-white rounded-md'>Thêm nhân viên</Button>
            </Form.Item>
          </div>
      </Form>
    </div>
    
  );
};

export default AddEmployeePage;