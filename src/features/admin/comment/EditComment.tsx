import { useGetRatingByIdQuery, useUpdateRatingMutation } from '@/api/admin/rates_admin';
import { Button, DatePicker, Form, Input, Select } from 'antd';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export const EditComment = () => {

    
    
    const onFinish = (values: FieldType) => {
       console.log(values);
       
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
                <h2 className="text-2xl  text-blue-700">Sửa Comment:  </h2>
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
                >
                    <Select defaultValue="0" style={{ width: '150px' }}>
                        <Select.Option value="1">Không hiển thi</Select.Option>
                        <Select.Option value="2">Hiển thị</Select.Option>
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
                </Form.Item>
            </Form>
        </div>
    )
}
