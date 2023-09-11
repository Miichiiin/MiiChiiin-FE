import { useGetHotel_adminByIdQuery, useUpdateHotel_adminMutation } from '@/api/hotel_admin';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, InputNumber, Select, Spin, Upload, message } from 'antd';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateHotel = () => {
    const [messageApi, contextHolder] = message.useMessage();

    const success = () => {
        messageApi.open({
            type: 'success',
            content: 'Update product successfully',
        });
    };

    const navigate = useNavigate()
    const [updateHotel, {isLoading}] = useUpdateHotel_adminMutation()

    const onFinish = (values: FieldType) => {
        updateHotel({ ...values, id: id }).unwrap().then(() => navigate('/admin/hotelManagement'));
    };
    const { id } = useParams<{ id: string }>()
    const { data: hotelData } = useGetHotel_adminByIdQuery(id || "")

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };
    const [form] = Form.useForm();
    useEffect(() => {
        form.setFieldsValue({
            name: hotelData?.name,
            email: hotelData?.email,
            description: hotelData?.description,
            quantity_of_room: hotelData?.quantity_of_room,
            phone: hotelData?.phone,
            star: hotelData?.star,
            quantity_floor: hotelData?.quantity_floor,
            created_at: hotelData?.created_at,
            updated_at: hotelData?.updated_at,
            status: hotelData?.status,
            id_city: hotelData?.id_city,
            name_cities: hotelData?.name_cities,
            image_urls: hotelData?.image_urls,
        })
    }, [hotelData])
    type FieldType = {
        id: string | number,
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
                <h2 className="text-2xl  text-blue-700">Sửa khách sạn : <span className='font-semibold'>{hotelData?.name}</span></h2>
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
                form={form}
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
                        <Select.Option value="2">Có sẵn</Select.Option>
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
                            <Spin />
                        ) : (
                            "Update"
                        )}
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default UpdateHotel