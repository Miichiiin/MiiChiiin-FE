import React, { useState } from 'react';
import { Input, DatePicker, Select, Button, Form, message, Spin } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useAddVoucherMutation } from '@/api/admin/voucher';
import { format } from 'date-fns';
import dayjs from 'dayjs';

const { Option } = Select;

const AddVoucherPage = () => {
  const [addvoucher, { isLoading: isAddVoucher }] = useAddVoucherMutation()
  const navigate = useNavigate()
  const [form] = Form.useForm();
  const [selectedFile, setSelectedFile] = useState<File>();
  const [isUploading, setIsUploading] = useState(false)
  const handleSubmit = (values: any) => {
    if (values.start_at && !isNaN(new Date(values.start_at).getTime())) {
      values.start_at = format(new Date(values.start_at), 'yyyy-MM-dd');
    }
    if (values.expire_at && !isNaN(new Date(values.expire_at).getTime())) {
      values.expire_at = format(new Date(values.expire_at), 'yyyy-MM-dd');
    }
    const body = new FormData()
    body.append('name', values.name)
    if (selectedFile) {
      body.append('image', selectedFile as File);
    }
    else {
      message.error("Vui lòng chọn ảnh!")
    }
    body.append('slug', values.slug)
    body.append('meta', values.description)
    body.append('description', values.description)
    body.append('discount', values.discount)
    body.append('start_at', values.start_at)
    body.append('expire_at', values.expire_at)
    body.append('quantity', values.quantity)
    body.append('status', values.status)
    setIsUploading(true);
    message.loading({ content: 'Đang tải ảnh lên...', key: 'uploading', duration: 3 });
    addvoucher(body).unwrap().then(() => {
      navigate("/admin/managervouchers")
      message.success("Thêm thành công voucher!")
    })
  };
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target
    const selectedFiles = files as FileList
    setSelectedFile(selectedFiles?.[0])
  };
  return (
    <div>
      {isUploading && <Spin className='animate' />}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <div className="text-lg font-bold text-orange-500">Thêm Voucher</div>

        <button className="px-3 py-2 border hover:bg-orange-400 bg-orange-500 text-white rounded-md flex items-center" onClick={() => navigate(`/admin/managervouchers`)}>
          <ArrowLeftOutlined className='pr-2' /> Quay lại
        </button>
      </div>
      <Form
        form={form}
        onFinish={handleSubmit}
        encType="multipart/form-data"
        labelCol={{ span: 6 }}
        layout='vertical'
      >
        {/* Form fields on the left */}
        <div className="flex justify-between space-x-4">
          <div className="w-1/2 p-4 bg-white">
            <Form.Item
              label="Mã Voucher "
              name="slug"
              rules={[{ required: true, message: 'Vui lòng nhập mã voucher' },
              { whitespace: true, message: 'Không được để khoảng trắng!' },
              ]}>
              <Input />
            </Form.Item>
            <Form.Item label="Tên Voucher "
              name="name"
              rules={[{ required: true, message: 'Vui lòng nhập tên của bạn!' },
              { whitespace: true, message: 'Không được để khoảng trắng!' },]}>
              <Input />
            </Form.Item>
            <Form.Item
              label="Giảm giá"
              name="discount"
              rules={[{ required: true, message: 'Vui lòng nhập loại!' },
              { whitespace: true, message: 'Không được để khoảng trắng!' },
              { pattern: /^[0-9]+$/, message: 'Chỉ được nhập số!' },]}>
              <Input />
            </Form.Item>

            <Form.Item label="Status" name="status" rules={[{ required: true, message: 'Vui lòng nhập trạng thái' }]}>
              <Select placeholder="Chọn trạng thái">
                <Option value={1}>Ẩn</Option>
                <Option value={0}>Đang chờ</Option>
                <Option value={2}>Hoạt động</Option>
              </Select>
            </Form.Item>
            <Form.Item
              label="Mô tả "
              name="description"
              rules={[{ required: true, message: 'Vui lòng nhập mô tả dài!' },
              { whitespace: true, message: 'Không được để khoảng trắng!' },]}
            >
              <Input.TextArea />
            </Form.Item>
          </div>

          <div className="w-1/2 p-4">
            <Form.Item
              label="Ngày bắt đầu"
              name="start_at"
              rules={[{ required: true, message: 'Vui lòng nhập ngày bắt đầu!' }]}>
              <DatePicker
                className='w-full'
                disabledDate={(currentDate) => {
                  // Disable dates before the current date
                  return currentDate.isBefore(dayjs(), 'day');
                }} />
            </Form.Item>
            <Form.Item
              label="Ngày kết thúc"
              name="expire_at"
              rules={[{ required: true, message: 'Vui lòng nhập ngày kết thúc!' }]}>
              <DatePicker
                className='w-full'
                disabledDate={(currentDate) => {
                  // Disable dates before the current date
                  return currentDate.isBefore(dayjs(), 'day');
                }} />
            </Form.Item>
            <Form.Item
              label="Số lượng"
              name="quantity"
              rules={[{ required: true, message: 'Vui lòng nhập số lượng' },
              { whitespace: true, message: 'Không được để khoảng trắng!' },
              { pattern: /^[0-9]+$/, message: 'Chỉ được nhập số!' },
              ]}>
              <Input className='w-full' />
            </Form.Item>
            <Form.Item
              name="image"
              label="Upload"
            >
              <input type='file' onChange={handleChange} />
            </Form.Item>

          </div>
        </div>
        <Form.Item>
          <Button loading={isAddVoucher} type="primary" htmlType="submit" className=' bg-blue-600 text-white rounded-md'>Add Voucher</Button>
        </Form.Item>
      </Form>
    </div>

  );
};

export default AddVoucherPage;