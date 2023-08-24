import { PlusOutlined } from '@ant-design/icons';
import { Button, DatePicker, Form, Input, InputNumber, Select, Upload } from 'antd';

export const AddUser = () => {
    const onFinish = (values: any) => {
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    type FieldType = {
        name: string,
        email: string,
        image?: string,
        order?: string;
        sex?: string,
        birht_day?: string;
        address?: string;
        phone_number?: string,
        id_number?: string,
        nationality?: string;
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

                <Form.Item label="Ảnh" valuePropName="image" getValueFromEvent={normFile}>
                    <Upload action="/upload.do" listType="picture-card">
                        <div>
                            <PlusOutlined />
                            <div style={{ marginTop: 8 }}>Upload</div>
                        </div>
                    </Upload>
                </Form.Item>


                <Form.Item<FieldType>
                    label="Giới tính"
                    name="birht_day"
                >
                    <Select defaultValue="all" style={{ width: '150px' }}>
                        <Select.Option value="all">Nam</Select.Option>
                        <Select.Option value="available">Nữ</Select.Option>
                        <Select.Option value="occupied">Khác</Select.Option>
                    </Select>
                </Form.Item>

                <Form.Item
                    label="Ngày sinh"
                    name="date"
                >
                    <DatePicker />
                </Form.Item>

                <Form.Item<FieldType>
                    label="Địa chỉ"
                    name="address"
                >
                    <Input allowClear/>
                </Form.Item>

                <Form.Item<FieldType>
                    label="Sdt"
                    name="phone_number"
                >
                    <Input allowClear/>
                </Form.Item>

                <Form.Item<FieldType>
                    label="CCCD"
                    name="id_number"
                >
                    <Input allowClear/>
                </Form.Item>

                <Form.Item<FieldType>
                    label="Quốc tịch"
                    name="nationality"
                >
                    <Input allowClear/>
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
