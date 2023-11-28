import { useState } from 'react';
import { Input, DatePicker, Select, Button, Form, Radio, message, Spin } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useAddAdmin_admin_AdminMutation, useGetAdmin_admin_AdminQuery } from '@/api/admin/admin_admin_admin';
import { useGetRoles1Query } from '@/api/admin/role1_admin';
import { format } from 'date-fns';


const { Option } = Select;
interface DataType {
  name: string
  id: number
}
const AddEmployeePage = () => {
  const navigate = useNavigate()
  const { data: dataAdmin } = useGetAdmin_admin_AdminQuery({});
  const [selectedFile, setSelectedFile] = useState<File>();
  const [addEmployee, { isLoading: isCreatingEmployee }] = useAddAdmin_admin_AdminMutation()
  const [form] = Form.useForm();
  const { data: dataRole } = useGetRoles1Query({});
  const [isUploading, setIsUploading] = useState(false)
  const data = dataRole?.map(({ id, name }: DataType) => ({
    key: id,
    name: name,
  }));
  // check trùng email
  const checkEmailDuplicate = async (_: any, value: string) => {
    const emailExists = dataAdmin?.some((item: any) => item.email === value);
    if (emailExists) {
      return Promise.reject('Email đã tồn tại. Vui lòng sử dụng email khác.');
    }
    return Promise.resolve();
  };
  // thêm nhân viên
  const handleSubmit = (values: any) => {
    // chuyển ngày sang dạng chuỗi
    if (values.date && !isNaN(new Date(values.date).getTime())) {
      values.date = format(new Date(values.date), 'yyyy-MM-dd');
    }
    const body = new FormData()
    body.append('name', values.name)
    if (selectedFile) {
      body.append('image', selectedFile as File);
    }
    else {
      message.error("Vui lòng chọn ảnh!")
    }
    body.append('address', values.address)
    body.append('date', values.date)
    body.append('email', values.email)
    body.append('gender', values.gender)
    body.append('password', values.password)
    body.append('phone', values.phone)
    body.append('role', values.role)
    body.append('description', values.description)
    body.append('status', '2')
    setIsUploading(true);
    message.loading({ content: 'Đang tải ảnh lên...', key: 'uploading', duration: 3 });
    addEmployee(body).unwrap().then(() => {
      navigate("/admin/manageremployee")
      message.success("Thêm nhân viên thành công!")
    }).catch(() => {
      message.error("Thêm nhân viên thất bại!")
    }).finally(() => {
      setIsUploading(false);
    })

  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target
    const selectedFiles = files as FileList
    setSelectedFile(selectedFiles?.[0])
  };
  return (
    <div>
      {isUploading && <Spin className='animate' />}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <div className="text-lg font-bold text-orange-500">Thêm Nhân Viên</div>
        <button className="px-3 py-2 border hover:bg-orange-400 bg-orange-500 text-white rounded-md flex items-center" onClick={() => navigate(`/admin/manageremployee`)}>
          <ArrowLeftOutlined className="pr-2" /> Quay lại
        </button>
      </div>
      <Form
        form={form}
        onFinish={handleSubmit}
        encType="multipart/form-data"
        labelCol={{ span: 8 }}
        layout='vertical'
      >
        <div className="flex justify-between space-x-8">
          <div className="w-1/2">
            <Form.Item label="Tên Nhân Viên" name="name"
              rules={[{ required: true, message: 'Vui lòng nhâp tên nhân viên!' },
              { whitespace: true, message: "Không được nhập khoảng trắng" }]}>
              <Input />
            </Form.Item>
            <Form.Item label="Giới Tính" name="gender" rules={[{ required: true, message: "Chọn giới tính" }]}>
              <Radio.Group className="w-full">
                <Radio value={0}>Nam</Radio>
                <Radio value={1}>Nữ</Radio>
                <Radio value={2}>Khác</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item label="Mật khẩu" name="password"
              rules={[
                { required: true, message: 'Vui lòng nhập mật khẩu! ' },
                { min: 6, message: "Mật khẩu chứa ít nhất 6 kí tự!" },
                { whitespace: true, message: "Không được nhập khoảng trắng" }
              ]}>
              <Input.Password />
            </Form.Item>
            <Form.Item label="Địa Chỉ" name="address" rules={[{ required: true, message: 'Vui lòng nhập địa chỉ nhân viên !' },
            { whitespace: true, message: "Không được nhập khoảng trắng" }]}>
              <Input.TextArea />
            </Form.Item>
            <Form.Item label="Mô tả" name="description" colon={false} rules={[
              {
                whitespace: true, message: "Không được nhập khoảng trắng",
              },
              { required: true, message: 'Vui lòng nhập mô tả !' }
            ]}>
              <Input.TextArea />
            </Form.Item>

          </div>
          <div className="w-1/2">
            <Form.Item label="Ngày Sinh" name="date" rules={[{ required: true, message: 'Vui lòng nhập ngày sinh nhân viên! '}]}>
              <DatePicker className="w-full" />
            </Form.Item>
            <Form.Item label="Số Điện Thoại" name="phone"
              rules={[
                { required: true, message: 'Vui lòng nhập số điện thoại nhân viên!' },
                { pattern: /^(0[2-9]|84[2-9])(\d{8}|\d{9})$/, message: 'Vui lòng nhập số điện thoại theo định dạng!' },
                { max: 10, message: "Số điện thoại không được vượt quá 10 kí tự!" },
                { whitespace: true, message: "Không được nhập khoảng trắng" }
              ]}>
              <Input className="w-full" />
            </Form.Item>

            <Form.Item label="Email" name="email"
              rules={[
                { required: true, message: 'Vui lòng nhập email! ' },
                { type: "email", message: "Email chưa dúng định dạng!" },
                { validator: checkEmailDuplicate },
                { whitespace: true, message: "Không được nhập khoảng trắng" }
              ]}>
              <Input className="w-full" />
            </Form.Item>
            <Form.Item label="Chọn Role" name="role" rules={[{ required: true, message: 'Vui lòng chọn vai trò!' }]}>
              <Select style={{ width: '100%' }}>
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
            </Form.Item>
          </div>
        </div>
        <Form.Item>
          <Button loading={isCreatingEmployee} type="primary" htmlType="submit" className=' bg-blue-600 text-white rounded-md'>Thêm nhân viên</Button>
        </Form.Item>
      </Form>
    </div>

  );
};

export default AddEmployeePage;