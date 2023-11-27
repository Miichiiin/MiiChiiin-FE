import { useEffect, useState } from 'react';
import { Input, DatePicker, Select, Button, Form, Radio, message, Image, Spin } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useParams, useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import 'dayjs/locale/vi';
import { useGetAdmin_admin_AdminByIdQuery, useUpdateAdmin_admin_AdminMutation } from '@/api/admin/admin_admin_admin';
import { useGetRoles1Query } from '@/api/admin/role1_admin';
import { format } from 'date-fns';

dayjs.extend(utc);
dayjs.extend(timezone);



const { Option } = Select;
interface DataType {
  name: string
  id: number
  id_role: number
}
const UpdateEmployeePage = () => {
  const { id } = useParams<{ id: string }>()
  const { data: empolyeeData } = useGetAdmin_admin_AdminByIdQuery(id || "")
  const [updateEmployee, { isLoading: isUpdateEmployee }] = useUpdateAdmin_admin_AdminMutation()
  const navigate = useNavigate()
  const [form] = Form.useForm();
  const [selectedFile, setSelectedFile] = useState<File>();
  const [isImageChanged, setIsImageChanged] = useState(false);
  const { data: dataRole } = useGetRoles1Query({});
  const [isUploading, setIsUploading] = useState(false)
  const data = dataRole?.map(({ id, name }: DataType) => ({
    key: id,
    name: name,
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
      gender: empolyeeData?.gender
    });
  }, [empolyeeData]);
  const handleSubmit = (values: any) => {
    // Chuyển ngày sang dạng chuỗi
    if (values.date && !isNaN(new Date(values.date).getTime())) {
      values.date = format(new Date(values.date), 'yyyy-MM-dd');
    }
    const body = new FormData()
    if (id) {
      body.append('id', id);
    }
    body.append('name', values.name)
    body.append('gender', values.gender)
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
    setIsUploading(true);
    message.loading({ content: 'Đang tải ảnh lên...', key: 'uploading', duration: 3 });
    updateEmployee(body).unwrap().then(() => {
      navigate("/admin/manageremployee");
      message.success("Update thành công !")
    }).catch(() => {
      message.error("Update thất bại !")
    })
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target
    const selectedFiles = files as FileList
    setSelectedFile(selectedFiles?.[0])
    setIsImageChanged(true);
  };

  return (
    <div>
      {isUploading && <Spin className='animate' />}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <div className="text-lg font-bold text-orange-500">Cập Nhật Nhân Viên: <span className='font-semibold text-orange-900'>{empolyeeData?.name}</span></div>
        <button className="px-3 py-2 border hover:bg-orange-400 bg-orange-500 text-white rounded-md flex items-center" onClick={() => navigate(`/admin/manageremployee`)}>
          <ArrowLeftOutlined className="pr-2" /> Quay lại
        </button>
      </div>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        // initialValues={empolyeeData} // Sử dụng dữ liệu hiện có để điền vào các trường
        encType="multipart/form-data"
      >
        <div className="flex">
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
            <DatePicker className='w-full' />
          </Form.Item>
          <Form.Item label="Mật khẩu" name="password"
            rules={[
              { required: true, message: 'Vui lòng nhập mật khẩu! ' },
              { min: 6, message: "Mật khẩu chứa ít nhất 6 kí tự!" }
            ]}>
            <Input.Password className='w-full' />
          </Form.Item>
          <Form.Item label="Mô tả" name="description" colon={false}>
            <Input.TextArea className='w-full' />
          </Form.Item>
        </div>
        <div className="w-1/2 p-4">
          <Form.Item label="Địa Chỉ" name="address" rules={[{ required: true, message: 'Vui lòng nhập địa chỉ nhân viên !' }]}>
            <Input />
          </Form.Item>

          <Form.Item label="Số Điện Thoại" name="phone"
            rules={[
              { required: true, message: 'Vui lòng nhập số điện thoại nhân viên!' },
              { pattern: /^(0[2-9]|84[2-9])(\d{8}|\d{9})$/, message: 'Vui lòng nhập số điện thoại theo định dạng!' },
              { max: 10, message: "Số điện thoại không được vượt quá 10 kí tự!" }
            ]}>
            <Input />
          </Form.Item>

          <Form.Item label="Email" name="email"
            rules={[
              { required: true, message: 'Vui lòng nhập email! ' },
              { type: "email", message: "Email chưa dúng định dạng!" },
              // { validator: checkEmailDuplicate },
            ]}>
            <Input />
          </Form.Item>
          <Form.Item label="Chọn Role" name="role" rules={[{ required: true, message: 'Vui lòng chọn vai trò!' }]}>
            <Select style={{ width: 200 }}>
              {data?.map((item: any, index: any) => (
                <Option key={index} value={item.key}>
                  {item.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="image"
            label="Upload"
          >
            <input type='file' onChange={handleChange} />
            <Image src={empolyeeData?.image} width={100} height={100} className='my-2' />
          </Form.Item>

          <div>
            
          </div>
          
        </div>
        </div>
        <Form.Item>
            <Button loading={isUpdateEmployee} type="primary" htmlType="submit" className=' bg-blue-600 text-white rounded-md'>Update nhân viên</Button>
          </Form.Item>
      </Form>
    </div>

  );
};

export default UpdateEmployeePage;