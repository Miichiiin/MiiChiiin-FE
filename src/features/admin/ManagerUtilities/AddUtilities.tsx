import { useAddComfortMutation } from '@/api/admin/comfort_admin';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { Button, Form, Input, Select, message } from 'antd';
import { useNavigate } from 'react-router-dom';

const AddUtilities = () => {
    const navigate = useNavigate()
    const [addUtilities] = useAddComfortMutation()
    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };
    const onFinish = (values: any) => {
        addUtilities(values).unwrap().then(() => {
            navigate('/admin/managerutilities')
            message.success('Thêm tiện ích thành công')
        });
    }
    return (
        <div>
            <header className="flex justify-between items-center mb-5 ">
                <h2 className="text-lg font-bold text-orange-500">Thêm tiện ích</h2>
                <button className='px-3 py-2 border hover:bg-orange-400 bg-orange-500 text-white rounded-md flex items-center' onClick={() => navigate("/admin/managerutilities")}>
                    <ArrowLeftOutlined className="pr-2" /> Quay lại
                </button>
            </header>
            <Form
                name="basic"
                labelCol={{ span: 6 }}
                layout='vertical'
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <div className=''>
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
                        <Select placeholder="Chọn trạng thái"
                        >
                            <Select.Option value={0}>Đang chờ</Select.Option>
                            <Select.Option value={1}>Đã ẩn</Select.Option>
                            <Select.Option value={2}>Hoạt động</Select.Option>
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
                </div>
                <Form.Item >
                    <Button type="primary" className='bg-blue-500 text-white' htmlType="submit" >
                        Thêm tiện ích
                    </Button>

                </Form.Item>
            </Form>
        </div>
    )
}

export default AddUtilities