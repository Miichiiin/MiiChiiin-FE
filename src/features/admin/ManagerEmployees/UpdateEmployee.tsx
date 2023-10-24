import  { useEffect, useState } from 'react';
import { Input, DatePicker,  Select, Button, Upload, Form, Radio ,message} from 'antd';
import {  ArrowLeftOutlined} from '@ant-design/icons';
import { Link ,useParams,useNavigate} from 'react-router-dom';
import { useGetAdmin_AdminByIdQuery, useUpdateAdmin_AdminMutation } from '@/api/admin/admin_admin';
import { useGetRolesQuery } from '@/api/admin/role_admin';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import 'dayjs/locale/vi';
import { useGetAdmin_admin_AdminByIdQuery, useUpdateAdmin_admin_AdminMutation } from '@/api/admin/admin_admin_admin';
import { useGetRoles1Query } from '@/api/admin/role1_admin';

dayjs.extend(utc);
dayjs.extend(timezone);



const { Option } = Select;

const UpdateEmployeePage = () => {
  const {id} = useParams<{id:string}>()
  const {data: empolyeeData} = useGetAdmin_admin_AdminByIdQuery(id || "")
  console.log("data",empolyeeData);
  
  const [updateEmployee] = useUpdateAdmin_admin_AdminMutation()
  const navigate = useNavigate()
  const [form] = Form.useForm();
  const [imageUrl, setImageUrl] = useState(null);
  const {data: dataRole} = useGetRoles1Query({});
  const data = dataRole?.map(({id,name}:DataType) =>({
    key:id,
    name:name,
  }));
  const [selectedRole, setSelectedRole] = useState<string | undefined>(empolyeeData?.role); 
  interface DataType {
    name: string
    id:number
    id_role: number
  }
   // lấy ra role
   
   const [initialRole, setInitialRole] = useState<string | undefined>(empolyeeData?.role);

  useEffect(() =>{
    form.setFieldsValue({
      name: empolyeeData?.name,
      gender:empolyeeData?.gender,
      date: dayjs(empolyeeData?.date).tz('Asia/Ho_Chi_Minh'),
      address: empolyeeData?.address,
      phone: empolyeeData?.phone,
      email: empolyeeData?.email,
      image: empolyeeData?.image,
      id_role: empolyeeData?.id_role,
    })
  },[empolyeeData,form,initialRole])
  
  const handleSubmit = (values:any) => {
    updateEmployee({...values,id:id,id_role:selectedRole}).unwrap().then(() =>{
      navigate("/admin/manageremployee");
      message.success("Update thành công !")
    })
    console.log('Form values:', values);
  };

  const handleImageUpload = (info:any) => {
    if (info.file.status === 'done') {
      // Get URL of the uploaded image
      setImageUrl(info.file.response.url);
    }
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
        className="flex"
      >
        <div className="w-1/2 p-4 bg-white">
              <Form.Item label="Tên Nhân Viên" name="name" rules={[{ required: true, message: 'Please enter name' }]}>
                <Input />
              </Form.Item>
              <div className="">
                <div className="">
                  <Form.Item
                    label="Giới Tính"
                    name="gender"
                    initialValue={empolyeeData?.gender}
                    rules={[{ required: true, message: 'Vui lòng chọn giới tính!' }]}
                  >
                    <Radio.Group>
                      <Radio value="male">Nam</Radio>
                      <Radio value="female">Nữ</Radio>
                    </Radio.Group>
                  </Form.Item>
                </div>
                <Form.Item label="Chọn Role" name="id_role" rules={[{ required: true, message: 'Vui lòng chọn vai trò!' }]}>
                <Select style={{ width: 200 }}
                  value={initialRole} 
                  onChange={(value) => setSelectedRole(value)}
                >
                  {data?.map((item: any, index: any) => (
                    <Option key={index} value={item.key}>
                      {item.name}
                    </Option>
                  ))}
                </Select>
                </Form.Item>
                <div className="w-1/2 p-4 bg-white ml-[-15px]">
                  <Form.Item
                    label="Ngày Sinh"
                    name="date"
                    rules={[{ required: true, message: 'Vui lòng chọn ngày sinh!' }]}
                  >
                    <DatePicker 
                       format="YYYY-MM-DD"
                       placeholder="Chọn ngày và giờ"
                       className='w-[250px]'
                       value={form.getFieldValue('date')}
                    />
                  </Form.Item>
                </div>
              </div>

        </div>
        <div className="w-1/2 p-4">

              <Form.Item label="Địa Chỉ" name="address" rules={[{ required: true, message: 'Please enter ' }]}>
                <Input.TextArea />
              </Form.Item>

              <Form.Item label="Số Điện Thoại"name="phone" rules={[{ required: true, message: 'Please enter ' }]}>
                <Input />
              </Form.Item>

              <Form.Item label="Email" name="email" rules={[{ required: true, message: 'Please enter ' }]}>
                <Input />
              </Form.Item>

              <Form.Item label="Hình ảnh" name="image" rules={[{ required: true, message: 'Please enter ' }]}>
                <Upload>
                  <Button>Tải lên</Button>
                </Upload>
              </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className=' bg-blue-600 text-white rounded-md'>Update Employee</Button>
          </Form.Item>
        </div>
      </Form>
    </div>
    
  );
};

export default UpdateEmployeePage;