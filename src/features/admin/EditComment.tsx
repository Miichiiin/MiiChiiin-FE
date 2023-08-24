import { Button, DatePicker, Form, Input } from 'antd';

export const EditComment = () => {
    const onFinish = (values: any) => {
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    type FieldType = {
        name?: string;
        room_name?: string;
        email?: string;
        sdt: string,
        date: string,
        content: string,
        status: string
    };
    return (
        <div>
         
            <header className="flex justify-between items-center my-5 mx-3">
                <h2 className="text-2xl  text-blue-700">Sửa Comment</h2>
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
                    label="Tên khách hàng"
                    name="name"
                    rules={[{ required: true, message: 'Hãy nhập tên khách hàng!' }]}
                >
                    <Input allowClear/>
                </Form.Item>

                <Form.Item<FieldType>
                    label="Tên phòng"
                    name="room_name"
                    rules={[{ required: true, message: 'Hãy nhập tên phòng!' }]}
                >
                    <Input allowClear/>
                </Form.Item>

                <Form.Item<FieldType>
                    label="Email"
                    name="email"
                    rules={[{ required: true, message: 'Hãy nhập Email!' }]}
                >
                    <Input allowClear/>
                </Form.Item>

                <Form.Item<FieldType>
                    label="SDT"
                    name="sdt"
                    rules={[{ required: true, message: 'Hãy nhập Số điện thoại!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="RangePicker"
                    name="date"
                >
                    <DatePicker />
                </Form.Item>

                <Form.Item
                    label="Nội dung"
                    name="content"
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
