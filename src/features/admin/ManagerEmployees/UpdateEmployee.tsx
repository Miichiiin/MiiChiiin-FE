import  { useEffect, useState } from 'react';
import { Input, DatePicker,  Select, Button, Form, Radio ,message,Image} from 'antd';
import {  ArrowLeftOutlined} from '@ant-design/icons';
import { Link ,useParams,useNavigate} from 'react-router-dom';
import { useGetAdmin_AdminByIdQuery, useUpdateAdmin_AdminMutation } from '@/api/admin/admin_admin';
import { useGetRolesQuery } from '@/api/admin/role_admin';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import 'dayjs/locale/vi';
import { useGetAdmin_admin_AdminByIdQuery, useGetAdmin_admin_AdminQuery, useUpdateAdmin_admin_AdminMutation } from '@/api/admin/admin_admin_admin';
import { useGetRoles1Query } from '@/api/admin/role1_admin';
import { format } from 'date-fns';

dayjs.extend(utc);
dayjs.extend(timezone);



const { Option } = Select;
interface DataType {
  name: string
  id:number
  id_role: number
}
const UpdateEmployeePage = () => {
  const {id} = useParams<{id:string}>()
  const {data: empolyeeData} = useGetAdmin_admin_AdminByIdQuery(id || "")  
  console.log("data",empolyeeData);
  const [updateEmployee,{isLoading: isUpdateEmployee}] = useUpdateAdmin_admin_AdminMutation()
  const navigate = useNavigate()
  const [form] = Form.useForm();
  const [selectedFile, setSelectedFile] = useState<File>();
  const [isImageChanged, setIsImageChanged] = useState(false);
  const {data: dataRole} = useGetRoles1Query({});
  
  const data = dataRole?.map(({id,name}:DataType) =>({
    key:id,
    name:name,
  }));
  
useEffect(() => {
  const haha = empolyeeData?.roles[0]
  form.setFieldsValue({
    name: empolyeeData?.name,
    date: dayjs(empolyeeData?.date).tz('Asia/Ho_Chi_Minh'),
    password: empolyeeData?.password,
    address: empolyeeData?.address,
    email: empolyeeData?.email,
    phone: empolyeeData?.phone,
    description: empolyeeData?.description,
    role: haha?.name,
  });
}, [empolyeeData]);
  const handleSubmit = (values:any) => {
    // Chuyển ngày sang dạng chuỗi
    if (values.date && !isNaN(new Date(values.date).getTime())) {
      values.date = format(new Date(values.date), 'yyyy-MM-dd');
    }
    const body = new FormData()
    if (id) {
      body.append('id', id);
    }
    body.append('name', values.name)
    // body.append('gender', values.gender)
    body.append('date', values.date)
    body.append('password', values.password)
    body.append('role', values.role)
    body.append('address', values.address)
    body.append('phone', values.phone)
    body.append('email', values.email)
    body.append('description', values.description)
    if (isImageChanged) {
      body.append('image', selectedFile as File);
    } else {
      body.append('image', empolyeeData?.image);
    }
    console.log('body', body);
    updateEmployee(body).unwrap().then(() =>{
      navigate("/admin/manageremployee");
      message.success("Update thành công !")
    })
    console.log('Form values:', values);
  };

  const handleChange = (event:React.ChangeEvent<HTMLInputElement>  ) => {
    const {files} = event.target
     const selectedFiles = files as FileList
     setSelectedFile(selectedFiles?.[0])
     setIsImageChanged(true);
   };

  return (
    <div>
     
     <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
      <div className="text-lg font-semibold">Cập Nhật Nhân Viên</div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
            <Input.Search placeholder="Tìm kiếm" style={{ marginRight: '8px' }} />
            <Select
        showSearch
        style={{ width: 200 }}
        placeholder="Search to Select"
        optionFilterProp="children"
        filterOption={(input, option) => (option?.label ?? '').includes(input)}
        filterSort={(optionA, optionB) =>
          (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
        }
        options={[
          {
            value: '1',
            label: 'Not Identified',
          },
          {
            value: '2',
            label: 'Closed',
          },
          {
            value: '3',
            label: 'Communicated',
          },
          {
            value: '4',
            label: 'Identified',
          },
          {
            value: '5',
            label: 'Resolved',
          },
          {
            value: '6',
            label: 'Cancelled',
          },
        ]}
      />
        </div>
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
        // initialValues={empolyeeData} // Sử dụng dữ liệu hiện có để điền vào các trường
        encType="multipart/form-data"
        className="flex"
      >
          <div className="w-1/2 p-4 bg-white">
                <Form.Item label="Tên Nhân Viên" name="name" rules={[{ required: true, message: 'Vui lòng nhâp tên nhân viên!' }]}>
                  <Input />
                </Form.Item>
                 <Form.Item label="Giới Tính" name="gender" rules={[{ required: true, message: "Chọn giới tính" }]}>
                 <Radio.Group>
                    <Radio value={0}>Nam</Radio>
                    <Radio value={1}>Nữ</Radio>
                    <Radio value={2}>Khác</Radio>
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
                      // { validator: checkEmailDuplicate },
                    ]}>
                  <Input />
                </Form.Item>

                <Form.Item
                  name="image"
                  label="Upload"
                >
                  <input type='file' onChange={handleChange}/>
                  <div className='w-[150px] mt-5'>
                  <Image src={empolyeeData?.image} />
                  </div>
                </Form.Item>
              
                <div>
         </div>
            <Form.Item>
              <Button loading={isUpdateEmployee} type="primary" htmlType="submit" className=' bg-blue-600 text-white rounded-md'>Update nhân viên</Button>
            </Form.Item>
          </div>
      </Form>
    </div>
    
  );
};

export default UpdateEmployeePage;