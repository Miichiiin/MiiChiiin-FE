import { PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, InputNumber, Select, Upload } from 'antd';

export const AddService = () => {
    const onFinish = (values: any) => {
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    type FieldType = {
        name_service: string,
        price: string;
        image: string;
        status: string,
        description: string,
    };
    const normFile = (e: any) => {
        if (Array.isArray(e)) {
            return e;
        }
        return e?.fileList;
    };
    return (
        <div>

            <header className="flex justify-between items-center my-5 mx-3">
                <h2 className="text-2xl  text-blue-700">Thêm dịch vụ</h2>
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
                    label="Tên dịch vụ"
                    name="name_service"
                    rules={[{ required: true, message: 'Hãy nhập tên dịch vụ!' }]}
                >
                    <Input allowClear />
                </Form.Item>

                <Form.Item<FieldType>
                    label="giá"
                    name="price"
                    rules={[{ required: true, message: 'Hãy nhập giá dịch vụ!' }]}
                >
                    <InputNumber />
                </Form.Item>

                <Form.Item label="Ảnh" valuePropName="image" getValueFromEvent={normFile}>
                    <Upload action="/upload.do" listType="picture-card">
                        <div>
                            <PlusOutlined />
                            <div style={{ marginTop: 8 }}>Upload</div>
                        </div>
                    </Upload>
                </Form.Item>

                <Form.Item<FieldType>
                    label="Trạng thái"
                    name="status"
                    rules={[{ required: true, message: 'Hãy nhập giá dịch vụ!' }]}
                >
                    <Select defaultValue="all" style={{ width: '150px' }}>
                        <Select.Option value="all">Đang dùng</Select.Option>
                        <Select.Option value="available">Có sẵn</Select.Option>
                        <Select.Option value="occupied">Đã thuê</Select.Option>
                    </Select>
                </Form.Item>

                <Form.Item
                    label="Mô tả"
                    name="description"
                >
                    <Input.TextArea placeholder="Nội dung" allowClear />
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" className='bg-blue-500 text-white' htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}
