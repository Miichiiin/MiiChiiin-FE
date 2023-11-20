import { useAddUserMutation } from '@/api/users';
import { PlusOutlined, UploadOutlined } from '@ant-design/icons';
import { Button, DatePicker, Form, Input, InputNumber, Select, Upload ,message} from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
export const AddUser = () => {
    const [addUser, {isLoading}] = useAddUserMutation()
    const navigate = useNavigate()
    const [image, setImage] = useState("");
    const [selectedRange, setSelectedRange] = useState<any>();
    const handleRangeChange = (dates: any) => {
      setSelectedRange(dates?.toDate() || null);
    };
   
    const onFinish =  (values: any) => {
        const newValue = {
            ...values,
            date: selectedRange.toISOString().slice(0, 10)
        }
        
        addUser(newValue).unwrap().then(() => {
            console.log("thanh cong", newValue);
            navigate("/admin/usermanagement")
            message.success('Thêm khách hàng thành công!');
            
        })

      
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    type FieldType = {
        name: string,
        email:string,
        image:string,
        description:string,
        email_verified_at:string,
        phone: number
        address:string,
        status: number,
        gender:number,
        date: string,
        nationality:string,
        cccd: string
    };
    const normFile = (e: any) => {
        if (Array.isArray(e)) {
            return e;
        }
        return setImage(e?.fileList)
    };
    console.log("anh",image);
    
    return (
        <div>

            <header className="flex justify-between items-center mb-5">
                <h2 className="text-lg font-bold text-orange-500">Thêm dịch vụ</h2>
            </header>
            <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item<FieldType>
                    label="Họ và tên"
                    name="name"
                    rules={[{ required: true, message: 'Hãy nhập tên dịch Tên!' }]}
                >
                    <Input allowClear />
                </Form.Item>

                <Form.Item<FieldType>
                    label="Email"
                    name="email"
                    rules={[{ required: true, message: 'Hãy nhập tên dịch Email!' },
                    { type: "email", message: 'Email không đúng định dạng' }
                    ]}
                >
                    <Input allowClear />
                </Form.Item>
                <Form.Item label="Tải lên tệp" name="file" valuePropName="fileList" getValueFromEvent={normFile}>
                    <Upload
                        action="/upload.do" // Đặt endpoint tải lên của bạn
                        listType="text" // Hiển thị tên tệp thay vì hình ảnh
                        maxCount={1} // Số lượng tệp tối đa
                    >
                        <Button icon={<UploadOutlined />}>Chọn tệp</Button>
                    </Upload>
                </Form.Item>


                <Form.Item<FieldType>
                    label="Giới tính"
                    name="gender"
                    rules={[{ required: true, message: 'Hãy nhập tên dịch Giới tính!' }]}
                >
                    <Select defaultValue="all" style={{ width: '150px' }}>
                        <Select.Option value="male">Nam</Select.Option>
                        <Select.Option value="famele">Nữ</Select.Option>
                        <Select.Option value="other">Khác</Select.Option>
                    </Select>
                    
                </Form.Item>

                <Form.Item
                    label="Ngày sinh"
                    name="date"
                    rules={[{ required: true, message: 'Hãy nhập  ngày sinh!' }]}
                >
                    <DatePicker onChange={handleRangeChange} />
                </Form.Item>

                <Form.Item<FieldType>
                    label="Địa chỉ"
                    name="address"
                    rules={[{ required: true, message: 'Hãy nhập  địa chỉ!' }]}
                >
                    <Input allowClear/>
                </Form.Item>

                <Form.Item<FieldType>
                    label="Sdt"
                    name="phone"
                    rules={[{ required: true, message: 'Hãy nhập số điện thoại !' }]}
                >
                    <Input allowClear/>
                </Form.Item>

                <Form.Item<FieldType>
                    label="CCCD"
                    name="cccd"
                    rules={[{ required: true, message: 'Hãy nhập căn cước công dân!' }]}
                >
                    <Input allowClear/>
                </Form.Item>

                <Form.Item<FieldType>
                    label="Quốc tịch"
                    name="nationality"
                    rules={[{ required: true, message: 'Hãy nhập quốc tịch!' }]}
                >
                    <Input allowClear/>
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" className='bg-blue-500 text-white' htmlType="submit">
                        Submit
                    </Button>
                    <button className='bg-red-500 text-white px-2 py-1.5 mx-2 rounded-lg hover:bg-red-400' onClick={()=>navigate("/admin/usermanagement")}> Quay lại</button>
                </Form.Item>
            </Form>
        </div>
    )
}
// 