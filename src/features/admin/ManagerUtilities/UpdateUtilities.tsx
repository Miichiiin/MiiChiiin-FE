import { useAddComfortMutation, useGetComfortByIdQuery, useUpdateComfortMutation } from '@/api/comfort';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, InputNumber, Select, Upload, message } from 'antd';
import { useEffect } from 'react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { useNavigate, useParams } from 'react-router-dom';

const { Option } = Select;

const UpdateUtilitiesPage = () => {
  const navigate = useNavigate()
  const [updateUtil, { isLoading }] = useUpdateComfortMutation()
  const [messageApi, contextHolder] = message.useMessage();
   
  const [form] = Form.useForm();
  const {id} = useParams<{id:string}>();
  const { data: Ultilities } = useGetComfortByIdQuery(id||"");

  useEffect(() => {
    form.setFieldsValue({
      name: Ultilities?.name,
      description: Ultilities?.description,
      deleted_at: Ultilities?.deleted_at,
      created_at: Ultilities?.created_at,
      updated_at: Ultilities?.updated_at,
      status: Ultilities?.status,
    })
  }, [Ultilities])

  const success = () => {
    messageApi.open({
      type: 'success',
      content: 'Update product successfully',
    });
  };

  type FieldType = {
    key: number;
    id: string | number;
    name: string;
    description: string;
    deleted_at: string;
    created_at: string;
    updated_at: string;
    status: string;
    alt: string;
  }
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  const onFinish = (values: FieldType) => {
    updateUtil({...values, id:id}).unwrap().then(() => navigate('/admin/managerutilities'));
  }

  return (
    <div>
      <header className="flex justify-between items-center my-5 mx-3">
        <h2 className="text-2xl  text-blue-700">Sửa tiện ích</h2>
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
        form = {form}
      >
        <Form.Item<FieldType>
          label="Tên tiện ích"
          name="name"
          rules={[{ required: true, message: 'Hãy nhập tên tiện ích!' },
          { whitespace: true, message: 'Không được để trống!' }]}
        >
          <Input allowClear />
        </Form.Item>

        <Form.Item<FieldType>
          label="deleted_at"
          name="deleted_at"
          rules={[]}>
          <Input disabled/>
        </Form.Item>

        <Form.Item<FieldType>
          label="created_at"
          name="created_at"
          rules={[]}
        >
          <Input disabled/>
        </Form.Item>

        <Form.Item<FieldType>
          label="updated_at"
          name="updated_at"
          rules={[]}
        >
          <Input disabled/>
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
              <AiOutlineLoading3Quarters className="animate-spin" />
            ) : (
              "Update product"
            )}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default UpdateUtilitiesPage;
