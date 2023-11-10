import { useGetHotel_adminByIdQuery, useUpdateHotel_adminMutation } from '@/api/admin/hotel_admin';
import { Button, Form, Image, Input, InputNumber, Select, Spin, message } from 'antd';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateHotel = () => {
    const navigate = useNavigate()
    const [updateHotel, { isLoading }] = useUpdateHotel_adminMutation()
    const [selectedFiles, setSelectedFiles] = useState<File[]>();
    const [isImageChanged, setIsImageChanged] = useState(false);
    const onFinish = (values: any) => {
        const body = new FormData()
        if (id) {
            body.append('id', id);
        }
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
        // Lặp qua danh sách các tệp ảnh và thêm chúng vào FormData
        if(isImageChanged){
            if (selectedFiles) {
                selectedFiles.forEach((file, index) => {
                    body.append(`images[${index}]`, file);
                  });
            }
        }
        else{
            body.append('image', data?.image)
        }
        

        updateHotel(body).unwrap().then(() => {
            message.success({ content: 'Sửa khách sạn thành công', key: 'uploading' });
            navigate('/admin/hotelmanagement');
        }).catch(() => {
            message.error({ content: 'Sửa khách sạn thất bại', key: 'uploading' });
        })
    };
    const { id } = useParams<{ id: string }>()
    const { data } = useGetHotel_adminByIdQuery(id)
    const hotelData = data?.[0]
    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { files } = event.target;
        const selectedFiles = files as FileList;
        // Tạo một mảng mới để lưu trữ tệp đã chọn
        const filesArray: File[] = Array.from(selectedFiles);
        // Ghi đè mảng selectedFiles bằng các tệp mới
        setSelectedFiles(filesArray);
        setIsImageChanged(true);
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
                            name="image"
                            label="Upload"
                        >
                            <input type='file' multiple onChange={handleChange} />
                            <Image src={hotelData?.image[0]?.image} width={100} height={100} className='mt-4 '/>
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
                            label="Số sao"
                            name="star"
                            rules={[{ required: true, message: 'Hãy nhập số sao!' }]}
                        >
                            <InputNumber />
                        </Form.Item>

                        <Form.Item
                            label="Trạng thái"
                            name="status"
                        >
                            <Select placeholder="Chọn trạng thái" style={{ width: '150px' }}>
                                <Select.Option value={1}>Còn</Select.Option>
                                <Select.Option value={0}>Hết</Select.Option>
                            </Select>
                        </Form.Item>
                        <Form.Item
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
                    <Button danger className="mx-2" onClick={() => navigate("/admin/hotelmanagement")}>Quay lại</Button>
                </Form.Item>

            </Form>
        </div>
    )
}

export default UpdateHotel