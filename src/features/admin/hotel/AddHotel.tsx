import { useAddHotel_adminMutation } from '@/api/admin/hotel_admin';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, InputNumber, Select, Upload, message } from 'antd';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';

export const AddHotel = () => {
    const navigate = useNavigate()
    const [addHotel, { isLoading }] = useAddHotel_adminMutation()
    const [messageApi, contextHolder] = message.useMessage();

    const success = () => {
        messageApi.open({
            type: 'success',
            content: 'Add product successfully',
        });
    };
    const onFinish = (values: FieldType) => {
        addHotel(values).unwrap().then(() => navigate('/admin/hotelManagement'));

    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    type FieldType = {
        name: string,
        email: string,
        description: string,
        quantity_of_room: number,
        phone: string,
        star: number,
        quantity_floor: number,
        created_at: string,
        updated_at: string,
        status: number,
        id_city: number,
        name_cities: string,
        image_urls: string,
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
                <h2 className="text-2xl  text-blue-700">Thêm khách sạn</h2>
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
                    label="Tên Khách sạn"
                    name="name"
                    rules={[{ required: true, message: 'Hãy nhập tên khách sạn!' },
                    { whitespace: true, message: 'Không được để trống!' }]}
                >
                    <Input allowClear />
                </Form.Item>

                <Form.Item<FieldType>
                    label="Địa chỉ khách sạn"
                    name="name_cities"
                    rules={[{ required: true, message: 'Hãy nhập địa chỉ khách sạn!' },
                    { whitespace: true, message: 'Không được để trống!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item label="Ảnh" name="image_urls" getValueFromEvent={normFile}>
                    <Upload action="/upload.do" listType="picture-card">
                        <div>
                            <PlusOutlined />
                            <div style={{ marginTop: 8 }}>Upload</div>
                        </div>
                    </Upload>
                </Form.Item>

                <Form.Item<FieldType>
                    label="Email khách sạn"
                    name="email"
                    rules={[{ required: true, message: 'Hãy nhập email khách sạn!' },
                    { type: 'email', message: 'Email không đúng định dạng!' },
                    { whitespace: true, message: 'Không được để trống!' }
                    ]}

                >
                    <Input />
                </Form.Item>

                <Form.Item<FieldType>
                    label="Số lượng phòng"
                    name="quantity_of_room"
                    rules={[{ required: true, message: 'Hãy nhập số lượng phòng' }]}
                >
                    <InputNumber />
                </Form.Item>

                <Form.Item<FieldType>
                    label="Số lượng tầng"
                    name="quantity_floor"
                    rules={[{ required: true, message: 'Hãy nhập số lượng tầng' }]}
                >
                    <InputNumber />
                </Form.Item>
                <Form.Item<FieldType>
                    label="Số điện thoại"
                    name="phone"
                    rules={[{ required: true, message: 'Hãy nhập số điện thoại!' },
                    { whitespace: true, message: 'Không được để trống!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item<FieldType>
                    label="Số sao"
                    name="star"
                    rules={[{ required: true, message: 'Hãy nhập số sao!' }]}
                >
                    <InputNumber />
                </Form.Item>

                <Form.Item<FieldType>
                    label="Trạng thái"
                    name="status"
                >
                    <Select defaultValue="0" style={{ width: '150px' }}>
                        <Select.Option value="1">Đang dùng</Select.Option>
                        <Select.Option value="0">Có sẵn</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item<FieldType>
                    label="ID thành phố"
                    name="id_city"
                    rules={[{ required: true, message: 'Hãy nhập chọn id city!' }]}
                >
                    <Select defaultValue="0" style={{ width: '150px' }}>
                        <Select.Option value="1">City 1</Select.Option>
                        <Select.Option value="2">City 2</Select.Option>
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