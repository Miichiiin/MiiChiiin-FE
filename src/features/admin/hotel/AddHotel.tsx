import { useAddHotel_adminMutation } from '@/api/admin/hotel_admin';
import { Button, Form, Input, InputNumber, Select, Upload, message } from 'antd';
import { useState } from 'react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';

export const AddHotel = () => {
    const navigate = useNavigate()
    const [selectedFile, setSelectedFile] = useState<File>();
    const [isUploading, setIsUploading] = useState(false)

    const [addHotel, { isLoading }] = useAddHotel_adminMutation()
    const onFinish = (values: any) => {
        const body = new FormData()
        body.append('name', values.name)
        body.append('address', values.address)
        body.append('email', values.email)
        body.append('phone', values.phone)
        body.append('description', values.description)
        body.append('star', values.star)
        body.append('quantity_of_room', values.quantity_of_room)
        body.append('quantity_floor', values.quantity_floor)
        body.append('status', values.status)
        body.append('id_city', values.id_city)
        body.append('image', selectedFile as File)
        setIsUploading(true);

        addHotel(body).unwrap().then(() =>{
            message.success({ content: 'Thêm khách sạn thành công', key: 'uploading' });
            navigate('/admin/hotelmanagement');
        }).catch(() => {
            message.error({ content: 'Thêm khách sạn thất bại', key: 'uploading' });
        }).finally(() => {
            setIsUploading(false);
        });
           

    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { files } = event.target
        const selectedFiles = files as FileList
        setSelectedFile(selectedFiles?.[0])
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
                        <Form.Item
                            name="image"
                            label="Upload"
                        >
                            <input type='file' onChange={handleChange} />
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
                                <Select.Option value={0}>Đang dùng</Select.Option>
                                <Select.Option value={1}>Có sẵn</Select.Option>
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