import { useGetHotel_adminByIdQuery, useUpdateHotel_adminMutation } from '@/api/admin/hotel_admin';
import { Button, Form, Input, InputNumber, Select, Spin, Upload, message } from 'antd';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateHotel = () => {
    const navigate = useNavigate()
    const [updateHotel, {isLoading}] = useUpdateHotel_adminMutation()

    const onFinish = (values: FieldType) => {
        updateHotel({ ...values, id: id }).unwrap().then(() => navigate('/admin/hotelManagement'));
    };
    const { id } = useParams<{ id: string }>()
    const { data: hotelData } = useGetHotel_adminByIdQuery(id)
    console.log(hotelData);
    
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
            address: hotelData?.address,
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
        address: string,
        image_urls: string,
    };
    return (
        <div>

            <header className="flex justify-between items-center my-5 mx-3">
                <h2 className="text-xl font-semibold ">Sửa khách sạn : <span className='text-2xl font-semibold text-blue-800'>{hotelData?.name}</span></h2>
            </header>
            <Form
                name="basic"
                initialValues={hotelData}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                form={form}
            >
                <div className='flex justify-center '>
                <div className='w-[500px] p-4 bg-white mr-4'>
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
                    name="address"
                    rules={[{ required: true, message: 'Hãy nhập địa chỉ khách sạn!' },
                    { whitespace: true, message: 'Không được để trống!' }]}
                >
                    <Input />
                </Form.Item>

                {/* <Form.Item label="Ảnh" name="image_urls" getValueFromEvent={normFile}>
                    <Upload action="/upload.do" listType="picture-card">
                        <div>
                            <PlusOutlined />
                            <div style={{ marginTop: 8 }}>Upload</div>
                        </div>
                    </Upload>
                </Form.Item> */}

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
                    label="Số điện thoại"
                    name="phone"
                    rules={[{ required: true, message: 'Hãy nhập số điện thoại!' },
                    { whitespace: true, message: 'Không được để trống!' }]}
                >
                    <Input/>
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
                    <Select placeholder="Chọn trạng thái" style={{ width: '150px' }}>
                        <Select.Option value={1}>Còn</Select.Option>
                        <Select.Option value={0}>Hết</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item<FieldType>
                    label="ID thành phố"
                    name="id_city"
                    rules={[{ required: true, message: 'Hãy nhập chọn id city!' }]}
                >
                    <Select placeholder="Chọn thành phố" style={{ width: '150px' }}>
                        <Select.Option value={1}>{hotelData?.name_cities}</Select.Option>
                    </Select>
                </Form.Item>
                </div>
                </div>


                <Form.Item>
                    <Button type="primary" className='bg-blue-500 text-white' htmlType="submit">
                        {isLoading ? (
                            <Spin />
                        ) : (
                            "Update"
                        )}
                    </Button>
                    <Button danger className="mx-2" onClick={()=>navigate("/admin/hotelmanagement")}>Quay lại</Button>  
                </Form.Item>
                
            </Form>
        </div>
    )
}

export default UpdateHotel