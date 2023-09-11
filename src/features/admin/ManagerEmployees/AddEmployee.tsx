import  { useState } from 'react';
import { Input, DatePicker, Select, Button, Upload, Form, Radio ,message} from 'antd';
import {  ArrowLeftOutlined} from '@ant-design/icons';
import { Link ,useNavigate} from 'react-router-dom';
import { useAddAdmin_AdminMutation } from '@/api/admin/admin_admin';




const { Option } = Select;

const AddEmployeePage = () => {
  const navigate = useNavigate()
  const [selectedRange, setSelectedRange] = useState<any>();

  const handleRangeChange = (dates: any) => {
    setSelectedRange(dates?.toDate() || null);
  };
  const [addEmployee] = useAddAdmin_AdminMutation()
  const [form] = Form.useForm();
//   const [imageUrl, setImageUrl] = useState(null);

  const handleSubmit = (values:any) => {
    const newValue = {
      ...values,
      date: selectedRange.toISOString().slice(0, 10)
  }
    addEmployee(newValue).unwrap().then(() =>{
      navigate("/admin/manageremployee")
      message.success("Thêm nhân viên thành công!")
    })
    console.log('Form values:', values);
  };

  const handleImageUpload = (info:any) => {
    if (info.file.status === 'done') {
      // Get URL of the uploaded image
    //   setImageUrl(info.file.response.url);
    }
  };

  return (
    <div>
     
     <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
      <div className="text-lg font-semibold">Thêm Nhân Viên</div>
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
  {/* Form fields on the left */}
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
        <DatePicker onChange={handleRangeChange} />
        </Form.Item>

  </div>

  {/* Form fields on the right */}
  <div className="w-1/2 p-4">
  {/* <Form.Item label="Cơ Sở" name="" rules={[{ required: true, message: 'Please enter ' }]}>
          <Input />
        </Form.Item> */}

        <Form.Item label="Địa Chỉ" name="address" rules={[{ required: true, message: 'Vui lòng nhập địa chỉ nhân viên !' }]}>
          <Input.TextArea />
        </Form.Item>

        <Form.Item label="Số Điện Thoại"name="phone" rules={[{ required: true, message: 'Vui lòng nhập số điện thoại nhân viên!' }]}>
          <Input />
        </Form.Item>

        <Form.Item label="Email" name="email" rules={[{ required: true, message: 'Vui lòng nhập email! ' }]}>
          <Input />
        </Form.Item>

        <Form.Item label="Hình ảnh" name="image" rules={[{ required: true, message: 'Bạn chưa cập nhập file ảnh! ' }]}>
          <Upload>
            <Button>Tải lên</Button>
          </Upload>
        </Form.Item>
    <Form.Item>
      <Button type="primary" htmlType="submit" className=' bg-blue-600 text-white rounded-md'>Thêm nhân viên</Button>
    </Form.Item>
  </div>
</Form>
    </div>
    
  );
};

export default AddEmployeePage;