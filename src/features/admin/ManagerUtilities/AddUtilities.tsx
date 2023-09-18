import { useAddComfortMutation } from '@/api/admin/comfort_admin';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, InputNumber, Select, Upload, message } from 'antd';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';

const AddUtilities = () => {
    const navigate = useNavigate()
    const [addUtilities, { isLoading }] = useAddComfortMutation()
    const [messageApi, contextHolder] = message.useMessage();

    const success = () => {
        messageApi.open({
            type: 'success',
            content: 'Add product successfully',
        });
    };
    type FieldType = {
        key: number;
        id: string | number;
        name: string;
        description: string;
        deleted_at: string;
        created_at: string;
        updated_at: string;
        status: string;
        alt: string;
    }
    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };
    const onFinish = (values: FieldType) => {
        addUtilities(values).unwrap().then(() => navigate('/admin/managerutilities'));
    }
    return (
        <div>
            <header className="flex justify-between items-center my-5 mx-3">
                <h2 className="text-2xl  text-blue-700">Thêm tiện ích</h2>
            </header>
            {contextHolder}
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
                    label="Tên tiện ích"
                    name="name"
                    rules={[{ required: true, message: 'Hãy nhập tên tiện ích!' },
                    { whitespace: true, message: 'Không được để trống!' }]}
                >
                    <Input allowClear />
                </Form.Item>

                <Form.Item<FieldType>
                    label="Trạng thái"
                    name="status"
                >
                    <Select defaultValue="0" style={{ width: '150px' }}>
                        <Select.Option value="1">Đang dùng</Select.Option>
                        <Select.Option value="2">Có sẵn</Select.Option>
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
                    <Button type="primary" className='bg-blue-500 text-white' htmlType="submit" onClick={() => success()}>
                        {isLoading ? (
                            <AiOutlineLoading3Quarters className="animate-spin" />
                        ) : (
                            "Add new product"
                        )}
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default AddUtilities