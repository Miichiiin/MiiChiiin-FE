

import { useGetRatingByIdQuery, useUpdateRatingMutation } from '@/api/admin/rates_admin';
import { Button, DatePicker, Form, Input, Select } from 'antd';
import { useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

export const EditComment = () => {

    const [form] = Form.useForm();
    const {id} = useParams<{ id: string }>();
    const {data: commentData} = useGetRatingByIdQuery(id||"");

    const [updateComment] = useUpdateRatingMutation();
    const navigate = useNavigate()
    useEffect(() => {
        form.setFieldsValue({
            id: commentData?.id,
            id_user: commentData?.id_user,
            id_category: commentData?.id_category,
            user_name: commentData?.user_name,
            name_category: commentData?.name_category,
            content: commentData?.content,
            rating: commentData?.rating,
            created_at: commentData?.created_at,
            updated_at: commentData?.updated_at,
            deleted_at: commentData?.deleted_at,
            status: commentData?.status
        })
    }, [commentData])
    
    const onFinish = (values: FieldType) => {
       updateComment({...values, id: id}).unwrap().then(() => navigate('/admin/commentmanagement'))
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    type FieldType = {
        id: string | number;
        id_user: string;
        id_category: string;
        content: string;
        rating: string;
        status: string;
        deleted_at: string;
        created_at: string;
        updated_at: string;
        user_name: string;
        name_category: string;
    };
    return (
        <div>
            <header className="flex justify-between items-center my-5 mx-3">
                <h2 className="text-2xl  text-blue-700">Sửa Comment:  <span className='font-semibold'>{commentData?.user_name}</span></h2>
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
                form={form}
            >
                <Form.Item<FieldType>
                    label="Tên khách hàng"
                    name="user_name"
                    rules={[{ required: true, message: 'Hãy nhập tên khách hàng!' }]}
                >
                    <Input allowClear />
                </Form.Item>

                <Form.Item<FieldType>
                    label="Tên loại phòng"
                    name="name_category"
                    rules={[{ required: true, message: 'Hãy nhập tên phòng!' }]}
                >
                    <Input allowClear />
                </Form.Item>

                <Form.Item<FieldType>
                    label="Điểm đánh giá"
                    name="rating"
                    rules={[{ required: true, message: 'Hãy nhập Số điện thoại!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Trạng thái"
                    name="status"
                    rules={[{ required: true, message: 'Hãy nhập trạng thái!' }]}
                >
                    <Select placeholder="Chọn trạng thái" style={{ width: '150px' }}>
                        <Select.Option value="0">Chờ</Select.Option>
                        <Select.Option value="1">Ẩn</Select.Option>
                        <Select.Option value="2">Xác nhận</Select.Option>
                    </Select>
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
                    <Button type='primary' danger className='mx-2'>
                        <Link to="/admin/commentmanagement">Quay lại</Link>
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}
