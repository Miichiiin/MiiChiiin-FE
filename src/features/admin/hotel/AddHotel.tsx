import { useAddHotel_adminMutation } from '@/api/admin/hotel_admin';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, InputNumber, Select, Upload, message } from 'antd';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';

export const AddHotel = () => {
    const navigate = useNavigate()
    const [addHotel, { isLoading }] = useAddHotel_adminMutation()
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
    return (
        <div>

            <header className="flex justify-between items-center my-5 mx-3">
                <h2 className="text-2xl  text-blue-700">Thêm khách sạn</h2>
            </header>
            <Form
                name="basic"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <div className='flex justify-center'>
                    <div className='w-[500px] p-4 bg-white mr-4'>
                        <Form.Item
                            label="Tên Khách sạn"
                            name="name"
                            rules={[{ required: true, message: 'Hãy nhập tên khách sạn!' },
                            { whitespace: true, message: 'Không được để trống!' }]}
                        >
                            <Input allowClear />
                        </Form.Item>

                        <Form.Item
                            label="Địa chỉ khách sạn"
                            name="address"
                            rules={[{ required: true, message: 'Hãy nhập địa chỉ khách sạn!' },
                            { whitespace: true, message: 'Không được để trống!' }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Email khách sạn"
                            name="email"
                            rules={[{ required: true, message: 'Hãy nhập email khách sạn!' },
                            { type: 'email', message: 'Email không đúng định dạng!' },
                            { whitespace: true, message: 'Không được để trống!' }
                            ]}

                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Số điện thoại"
                            name="phone"
                            rules={[{ required: true, message: 'Hãy nhập số điện thoại!' },
                            { whitespace: true, message: 'Không được để trống!' }]}
                        >
                            <Input />
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
                    <div className='w-[500px] p-4 bg-white mr-4'>
                        <Form.Item
                            label="Số sao"
                            name="star"
                            rules={[{ required: true, message: 'Hãy nhập số sao!' }]}
                        >
                            <InputNumber />
                        </Form.Item>
                        <Form.Item
                            label="Số lượng phòng"
                            name="quantity_of_room"
                            rules={[{ required: true, message: 'Hãy nhập số lượng phòng' }]}
                        >
                            <InputNumber />
                        </Form.Item>

                        <Form.Item
                            label="Số lượng tầng"
                            name="quantity_floor"
                            rules={[{ required: true, message: 'Hãy nhập số lượng tầng' }]}
                        >
                            <InputNumber />
                        </Form.Item>
                        <Form.Item
                            label="Trạng thái"
                            name="status"
                        >
                            <Select placeholder="Chọn trạng thái" style={{ width: '150px' }}>
                                <Select.Option value={1}>Đang dùng</Select.Option>
                                <Select.Option value={0}>Có sẵn</Select.Option>
                            </Select>
                        </Form.Item>
                        <Form.Item
                            label="ID thành phố"
                            name="id_city"
                            rules={[{ required: true, message: 'Hãy nhập chọn id city!' }]}
                        >
                            <Select defaultValue="0" style={{ width: '150px' }}>
                                <Select.Option value="1">City 1</Select.Option>
                                <Select.Option value="2">City 2</Select.Option>
                            </Select>
                        </Form.Item>
                    </div>
                </div>
                <Form.Item>
                    <Button type="primary" className='bg-blue-500 text-white' htmlType="submit" >
                        {isLoading ? (
                            <AiOutlineLoading3Quarters className="animate-spin" />
                        ) : (
                            "Add new hotel"
                        )}
                    </Button>
                    <Button danger className='mx-2' onClick={() => navigate("/admin/hotelmanagement")}>Quay lại</Button>
                </Form.Item>
            </Form>
        </div>
    )
}