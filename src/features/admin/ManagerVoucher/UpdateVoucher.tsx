import  { useEffect, useState } from 'react';
import { Input, DatePicker, InputNumber, Select, Button, Image, Form ,message} from 'antd';
import { CloudUploadOutlined, ArrowLeftOutlined} from '@ant-design/icons';
import { Link ,useNavigate,useParams} from 'react-router-dom';
import { useGetVoucherByIdQuery, useUpdateVoucherMutation } from '@/api/admin/voucher';
import { format } from 'date-fns';
import dayjs from 'dayjs';

const { Option } = Select;

const UpdateVoucherPage = () => {

  const navigate = useNavigate()
  const {id} = useParams<{id:string}>()
  const {data:voucherData} = useGetVoucherByIdQuery(id||"")
  const [updateVoucher, {isLoading:isUpdateVoucher}] = useUpdateVoucherMutation()
  const [form] = Form.useForm();
  const [selectedFile, setSelectedFile] = useState<File>();
  const [isImageChanged, setIsImageChanged] = useState(false);

  useEffect(() =>{
    form.setFieldsValue({
      name:voucherData?.name,
      slug:voucherData?.slug,
      // image:voucherData?.image,
      quantity:voucherData?.quantity,
      discount:voucherData?.discount,
      start_at:dayjs(voucherData?.start_at).tz('Asia/Ho_Chi_Minh'),
      expire_at:dayjs(voucherData?.expire_at).tz('Asia/Ho_Chi_Minh'),
      status:voucherData?.status,
      meta:voucherData?.meta,
      description:voucherData?.description
    })
  },[voucherData])
  
  const onFinish = (values:any) => {
    if (values.start_at && !isNaN(new Date(values.start_at).getTime())) {
      values.start_at = format(new Date(values.start_at), 'yyyy-MM-dd');
    }
    if (values.expire_at && !isNaN(new Date(values.expire_at).getTime())) {
      values.expire_at = format(new Date(values.expire_at), 'yyyy-MM-dd');
    }
    const body = new FormData()
    if (id) {
      body.append('id', id);
    }
    body.append('name', values.name)
    body.append('slug', values.slug)
    body.append('image', values.image)
    body.append('quantity', values.quantity)
    body.append('discount', values.discount)
    body.append('start_at', values.start_at)
    body.append('expire_at', values.expire_at)
    body.append('status', values.status)
    body.append('meta', values.meta)
    body.append('description', values.description)
    if (isImageChanged) {
      body.append('image', selectedFile as File);
    } else {
      body.append('image', voucherData?.image);
    }
    console.log('body', body);
      updateVoucher(body).unwrap().then(() =>{
      navigate("/admin/managervouchers")
      message.success('Update khách hàng thành công!');

    })
    console.log('Form values:', values);
  };

  const handleChange = (event:React.ChangeEvent<HTMLInputElement>  ) => {
    const {files} = event.target
     const selectedFiles = files as FileList
     setSelectedFile(selectedFiles?.[0])
     setIsImageChanged(true);
   };
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
};
  type FieldType = {
      id: string | number,
      name: string,
      slug:string,
      image:string,
      quantity:number,
      discount:number,
      start_at:string,
      expire_at:string
      status:number
      meta: string
      description: string
      created_at:string,
      updated_at:string
  }
  return (
    <div>
     
     <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
      <div className="text-lg font-semibold">Update Voucher</div>
        
        <Button className="ml-2 px-3 pb-3 bg-red-500 text-white rounded-md">
              <Link to={`/admin/managervouchers`}>
                <ArrowLeftOutlined /> Quay lại
              </Link>
        </Button>
      </div>
        <Form
            form={form}
            layout="vertical"
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            className="flex"
        >
            {/* Form fields on the left */}
          <div className="w-1/2 p-4 bg-white">
            <Form.Item<FieldType> 
              label="Mã Voucher " 
              name="slug" 
              rules={[{ required: true, message: 'Please enter voucher code' }]}>
              <Input />
            </Form.Item>
            <Form.Item<FieldType> 
              label="Tên Voucher " 
              name="name" 
              rules={[{ required: true, message: 'Please enter voucher name' }]}>
              <Input />
            </Form.Item>
            {/* <Form.Item<FieldType> 
              label="Loại Type" 
              name="discount" 
              rules={[{ required: true, message: 'Please select voucher type' }]}>
              <Select>
                <Option value="discount">30</Option>
                <Option value="freebie">10</Option>
              </Select>
            </Form.Item> */}
            <Form.Item<FieldType> 
              label="Mô tả ngắn" 
              name="meta">
              <Input.TextArea rows={2} />
            </Form.Item>
            <Form.Item<FieldType> 
              label="Mô tả dài" 
              name="description">
              <Input.TextArea rows={4} />
            </Form.Item>
            <Form.Item label="Discount Value" name="discount" rules={[{ required: true, message: 'Please enter discount value' }]}>
              <InputNumber min={0} />
            </Form.Item>
          </div>

          {/* Form fields on the right */}
          <div className="w-1/2 p-4">
          
            <Form.Item<FieldType> 
              label="Start Date" 
              name="start_at" 
              rules={[{ required: true, message: 'Please select start date' }]}>
              <DatePicker />
            </Form.Item>
            <Form.Item<FieldType> 
              label="End Date" 
              name="expire_at" 
              rules={[{ required: true, message: 'Please select end date' }]}>
              <DatePicker />
            </Form.Item>
            <Form.Item<FieldType> 
              label="Quantity" 
              name="quantity" 
              rules={[{ required: true, message: 'Please enter quantity' }]}>
              <InputNumber min={1} />
            </Form.Item>
            <Form.Item<FieldType> 
              label="Status" 
              name="status" 
              rules={[{ required: true, message: 'Please select status' }]}>
              <Select>
                <Option value="active">Active</Option>
                <Option value="inactive">Inactive</Option>
              </Select>
            </Form.Item>
            <Form.Item
                name="imagem"
                label="Upload"
              >
                <input type='file' onChange={handleChange}/>
                <div className='w-[150px] mt-5'>
                  <Image src={voucherData?.image} />
                </div>
              </Form.Item>
            <Form.Item>
              <Button loading={isUpdateVoucher} type="primary" htmlType="submit" className=' bg-blue-600 text-white rounded-md'>Update Voucher</Button>
            </Form.Item>
          </div>
      </Form>
    </div>
    
  );
};

export default UpdateVoucherPage;