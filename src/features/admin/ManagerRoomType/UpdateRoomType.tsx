import { useGetCategory_adminByIdQuery, useUpdateCategory_adminMutation } from "@/api/admin/category_admin";
import { useGetComfortQuery } from "@/api/admin/comfort_admin";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { Button, Form, Image, Input, Select, Skeleton, Spin, message } from "antd";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";


const UpdateRoomType = () => {
  const [selectedFile, setSelectedFile] = useState<File>();
  const navigate = useNavigate()
  const { id } = useParams()
  const { data, isLoading, isError } = useGetCategory_adminByIdQuery(id)
  const [form] = Form.useForm();

  useEffect(() => {
    if (data) {
      form.setFieldsValue({
        id: data.categoryRoom.id,
        name: data.categoryRoom.name,
        description: data.categoryRoom.description,
        quantity_of_people: data.categoryRoom.quantity_of_people,
        price: data.categoryRoom.price,
        status: data.categoryRoom.status,
        floor: data.categoryRoom.floor,
        acreage: data.categoryRoom.acreage,
        short_description: data.categoryRoom.short_description,
        comfort: data.comfort.map((item: any) => item.id)
      })
      const comfortIds = data?.comfort?.map((item: any) => item[0]?.id);
      // Cập nhật giá trị của form
      form.setFieldsValue({
        comfort: comfortIds,
      });
    }

  })

  const [updateCate] = useUpdateCategory_adminMutation()
  const [isImageChanged, setIsImageChanged] = useState(false);
  const [isUploading, setIsUploading] = useState(false)
  const { data: comforts } = useGetComfortQuery({})
  const onFinish = (values: any) => {
    const comfort = values.comfort
    const body = new FormData()
    if (id) {
      body.append('id', id);
    }
    body.append('name', values.name)
    body.append('description', values.description)
    body.append('quantity_of_people', values.quantity_of_people)
    body.append('price', values.price)
    body.append('status', values.status)
    body.append('floor', values.floor)
    body.append('acreage', values.acreage)
    comfort.forEach((item: any, index: any) => {
      body.append(`comfort[${index}]`, item);
    })
    if (isImageChanged) {
      body.append('image', selectedFile as File);
    } else {
      body.append('image', data?.categoryRoom?.image);
    }
    
    setIsUploading(true);
    message.loading({ content: 'Đang tải ảnh lên...', key: 'uploading', duration: 3 });
    updateCate(body)
      .unwrap()
      .then(() => {
        navigate("/admin/manageroomtype");
        message.success({ content: 'Cập nhật loại phòng thành công', key: 'uploading' });
      })
      .catch(() => {
        message.error({ content: 'Cập nhật loại phòng thất bại', key: 'uploading' });
      }).finally(() => {
        setIsUploading(false);
      })

  }
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;
    const selectedFiles = files as FileList;
    setSelectedFile(selectedFiles?.[0]);
    setIsImageChanged(true);
  };

  if (isLoading) {
    return <Skeleton active />
  }

  if (isError) {
    message.error('Tải dịch vụ thất bại')
  }
  return (
    <div>
      {isUploading && <Spin className='animate' />}
      <header className="flex justify-between items-center mb-5">
        <h2 className="text-lg font-bold text-orange-500">Cập nhật loại phòng: <span className='text-orange-900 font-semibold'>{data.categoryRoom.name}</span></h2>
        <button className="px-3 py-2 border hover:bg-orange-400 bg-orange-500 text-white rounded-md flex items-center" onClick={() => navigate("/admin/manageroomtype")}>
          <ArrowLeftOutlined className='pr-2' /> Quay lại
        </button>
      </header>

      <Form
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        labelCol={{ span: 6 }}
        layout="vertical"
        form={form}
      >
        <div className="flex justify-between space-x-4">
          <div className="w-1/2">
            <Form.Item
              label="Tên loại phòng"
              name="name"
              rules={
                [
                  { required: true, message: 'Vui lòng nhập tên loại phòng!' },
                  { whitespace: true, message: 'Vui lòng nhập tên loại phòng!' },
                  { max: 50, message: 'Vui lòng nhập tên nhỏ hơn 50 ký tự!' }
                ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Trạng thái"
              name="status"
              rules={[{ required: true, message: 'Vui lòng nhập trạng thái phòng!' }]}
            >
              <Select placeholder="Chọn trạng thái" >
                <Select.Option value={2}>Đang hoạt động</Select.Option>
                <Select.Option value={1}>Đang bảo trì</Select.Option>
                <Select.Option value={0}>Đang chờ</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item
              label="Tiện ích"
              name="comfort"
              rules={[{ required: true, message: 'Vui lòng nhập trạng thái phòng!' }]}

            >

              <Select placeholder="Chọn tiện tích" mode='multiple'>
                {comforts?.map((item: any) => (
                  <Select.Option key={item.id} value={item.id}>
                    {item.name}
                  </Select.Option>
                ))}
              </Select>

            </Form.Item>
            <Form.Item
              label="Mô tả"
              name="description"
              rules={[{ required: true, message: 'Vui lòng nhập mô tả!' },
              { whitespace: true, message: 'Không được để khoảng trắng!' }]}
            >
              <Input.TextArea />
            </Form.Item>
          </div>

          <div className='w-1/2'>
            <Form.Item
              label="Số tầng"
              name="floor"
              rules={[
                { required: true, message: 'Vui lòng nhập số tầng!' },

                { pattern: /^[0-9]+$/, message: 'Chỉ được nhập số!' },
              ]}
            >
              <Input className='w-full' />
            </Form.Item>
            <Form.Item
              label="Số người"
              name="quantity_of_people"
              rules={[{ required: true, message: 'Vui lòng nhập số người!' },
              { pattern: /^[0-9]+$/, message: 'Chỉ được nhập số!' },]}
            >
              <Input className='w-full' />
            </Form.Item>
            <Form.Item
              label="Giá"
              name="price"
              rules={[{ required: true, message: 'Vui lòng nhập giá phòng!' },
              { pattern: /^[0-9]+$/, message: 'Chỉ được nhập số!' },]}
            >
              <Input className='w-full' />
            </Form.Item>
            <Form.Item
              label="Diện tích"
              name="acreage"
              rules={[{ required: true, message: 'Vui lòng nhập diện tích!' },
              { pattern: /^[0-9]+$/, message: 'Chỉ được nhập số!' },
              ]}
            >
              <Input className='w-full' />
            </Form.Item>


            <Form.Item
              name="image"
              label="Upload"
            >
              <input type='file' onChange={handleChange} className="my-2" />
              <Image src={data?.categoryRoom?.image} width={100} height={100} alt="Current Image" />
            </Form.Item>
          </div>
        </div>


        <Form.Item >
          <Button type="primary" htmlType="submit" className=' bg-blue-600 text-white rounded-md'>
            Cập nhật phòng
          </Button>
        </Form.Item>
      </Form>

    </div>
  )
}

export default UpdateRoomType