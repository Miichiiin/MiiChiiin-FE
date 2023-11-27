import { useAddUser_adminMutation } from '@/api/admin/admin_usermanage';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { Button, DatePicker, Form, Input, Radio, Select, Spin, message } from 'antd';
import { useState } from 'react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
export const AddUser = () => {
    const [addUser, { isLoading }] = useAddUser_adminMutation()
    const navigate = useNavigate()
    const [selectedFile, setSelectedFile] = useState<File>();
    const [isUploading, setIsUploading] = useState(false)
    const [selectedRange, setSelectedRange] = useState<any>();
    const handleRangeChange = (dates: any) => {
        setSelectedRange(dates?.toDate() || null);
    };

    const onFinish = (values: any) => {
        const body = new FormData()
        body.append('name', values.name)
        body.append('email', values.email)
        body.append('password', values.password)
        body.append('gender', values.gender)
        body.append('description', values.description)
        body.append('date', selectedRange.toISOString().slice(0, 10))
        body.append('phone', values.phone)
        body.append('address', values.address)
        body.append('cccd', values.cccd)
        body.append('nationality', values.nationality)
        body.append('image', selectedFile as File)
        setIsUploading(true);
        message.loading({ content: 'Đang tải ảnh lên...', key: 'uploading', duration: 3 });
        addUser(body).unwrap().then(() => {
            navigate("/admin/usermanagement")
            message.success({ content: 'Thêm khách hàng thành công', key: 'uploading' })
        }).catch(() => {
            message.error({ content: 'Thêm khách hàng thất bại', key: 'uploading' })
        }).finally(() => { setIsUploading(false) })
    };
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { files } = event.target
        const selectedFiles = files as FileList
        setSelectedFile(selectedFiles?.[0])
    };

    return (
        <div>
            {isUploading && <Spin className='animate' />}
            <header className="flex justify-between items-center mb-5">
                <h2 className="text-lg font-bold text-orange-500">Thêm khách hàng</h2>
                <button className="px-3 py-2 border hover:bg-orange-400 bg-orange-500 text-white rounded-md flex items-center" onClick={() => navigate(`/admin/usermanagement`)}>
                    <ArrowLeftOutlined className="pr-2" /> Quay lại
                </button>
            </header>
            <Form
                name="basic"
                labelCol={{ span: 8 }}
                layout='vertical'
                initialValues={{ remember: true }}
                onFinish={onFinish}
                autoComplete="off"
            >
                <div className='flex space-x-4'>
                    <div className='w-1/2'>
                        <Form.Item
                            label="Họ và tên"
                            name="name"
                            rules={[
                                { required: true, message: 'Hãy nhập tên dịch Tên!' },
                                { whitespace: true, message: 'Không được để trống!' },
                            ]}
                        >
                            <Input allowClear />
                        </Form.Item>

                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[{ required: true, message: 'Hãy nhập tên dịch Email!' },
                            { type: "email", message: 'Email không đúng định dạng' },
                            { whitespace: true, message: 'Không được để trống!' }
                            ]}
                        >
                            <Input allowClear />
                        </Form.Item>

                        <Form.Item label="Giới Tính" name="gender" rules={[{ required: true }]}>
                            <Radio.Group className="w-full">
                                <Radio value={0}>Nam</Radio>
                                <Radio value={1}>Nữ</Radio>
                                <Radio value={2}>Khác</Radio>
                            </Radio.Group>
                        </Form.Item>

                        <Form.Item
                            name="image"
                            label="Upload"
                        >
                            <input type='file' onChange={handleChange} />
                        </Form.Item>

                        <Form.Item
                            label="Trạng thái"
                            name="status"
                            rules={[{ required: true, message: 'Chọn trạng thái đi ' }]}
                        >
                            <Select placeholder="Chọn trạng thái" >
                                <Select.Option value={1}>Hoạt động</Select.Option>
                                <Select.Option value={0}>Chờ</Select.Option>
                            </Select>
                        </Form.Item>
                        <Form.Item label="Mô tả" name="description" rules={[
                            { required: true, message: 'Vui lòng nhập mật khẩu! ' },
                            { whitespace: true, message: 'Không được để trống!' }
                        ]}>
                            <Input.TextArea />
                        </Form.Item>
                    </div>

                    <div className='w-1/2'>
                        <Form.Item label="Mật khẩu" name="password"
                            rules={[
                                { required: true, message: 'Vui lòng nhập mật khẩu! ' },
                                { min: 6, message: "Mật khẩu chứa ít nhất 6 kí tự!" },
                                { whitespace: true, message: 'Không được để trống!' }
                            ]}>
                            <Input.Password />
                        </Form.Item>
                        <Form.Item
                            label="Ngày sinh"
                            name="date"
                            rules={[{ required: true, message: 'Hãy chọn ngày sinh!' }]}
                        >
                            <DatePicker format="DD-MM-YYYY" onChange={handleRangeChange} className='w-full cursor-pointer' placeholder="Chọn ngày và giờ" />
                        </Form.Item>
                        <Form.Item
                            label="Địa chỉ"
                            name="address"
                            rules={[{ required: true, message: 'Hãy nhập  địa chỉ!' },
                            { whitespace: true, message: 'Không được để trống!' }]}
                        >
                            <Input allowClear />
                        </Form.Item>
                        <Form.Item
                            label="Số điện thoại"
                            name="phone"
                            rules={[
                                { required: true, message: 'Hãy nhập số vào !' },
                                { whitespace: true, message: 'Không được để trống!' },
                                {
                                    pattern: /^0[0-9]*$/,
                                    message: 'Hãy nhập số đúng định dạng ',
                                },
                            ]}
                        >
                            <Input allowClear />
                        </Form.Item>

                        <Form.Item
                            label="Căn cước công dân"
                            name="cccd"
                            rules={[
                                { required: true, message: 'Hãy nhập!' },
                                { whitespace: true, message: 'Không được để trống!' },
                                {
                                    pattern: /^[0-9]*$/,
                                    message: 'Căn cước không có chữ',
                                },
                            ]}
                        >
                            <Input allowClear />
                        </Form.Item>

                        <Form.Item
                            label="Quốc tịch"
                            name="nationality"
                            rules={[{ required: true, message: 'Hãy nhập quốc tịch!' },
                            { whitespace: true, message: 'Không được để trống!' }]}
                        >
                            <Input allowClear />
                        </Form.Item>
                    </div>
                </div>

                <Form.Item>
                    <Button type="primary" className='bg-blue-500 text-white' htmlType="submit">
                        {isLoading ? (
                            <AiOutlineLoading3Quarters className="animate-spin" />
                        ) : (
                            "Thêm khách hàng"
                        )}
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}
// 