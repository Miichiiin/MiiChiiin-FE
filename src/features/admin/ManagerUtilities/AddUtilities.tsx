import { useAddComfortMutation } from '@/api/admin/comfort_admin';
import { Button, Form, Input, Select, message } from 'antd';
import { useNavigate } from 'react-router-dom';

const AddUtilities = () => {
    const navigate = useNavigate()
    const [addUtilities] = useAddComfortMutation()
    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };
    const onFinish = (values:any) => {
        addUtilities(values).unwrap().then(() => {
            navigate('/admin/managerutilities')
            message.success('Thêm tiện ích thành công')
        });
    }
    return (
        <div>
            <header className="flex justify-between items-center my-5 mx-3">
                <h2 className="text-2xl  text-blue-700">Thêm tiện ích</h2>
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
                <Form.Item
                    label="Tên tiện ích"
                    name="name"
                    rules={[{ required: true, message: 'Hãy nhập tên tiện ích!' },
                    { whitespace: true, message: 'Không được để trống!' }]}
                >
                    <Input allowClear />
                </Form.Item>

                <Form.Item
                    label="Trạng thái"
                    name="status"
                    rules={[{ required: true, message: 'Hãy chọn trạng thái!' }]}
                >
                    <Select placeholder="Chọn trạng thái" style={{ width: '150px' }}
                     >
                        <Select.Option value={0}>Đang dùng</Select.Option>
                        <Select.Option value={1}>Có sẵn</Select.Option>
                    </Select>
                </Form.Item>

                <Form.Item
                    label="Mô tả"
                    name="description"
                    rules={[{ required: true, message: 'Hãy nhập mô tả!' },
                    { whitespace: true, message: 'Không được để trống!' }]}
                >
                    <Input.TextArea placeholder="Nội dung" allowClear />
                </Form.Item>


                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" className='bg-blue-500 text-white' htmlType="submit" >
                        Thêm tiện ích
                    </Button>
                    <Button type="primary" danger className='mx-2' onClick={() => navigate("/admin/managerutilities")}>
                        Quay lại
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default AddUtilities