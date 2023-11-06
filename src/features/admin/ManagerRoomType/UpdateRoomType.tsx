import { useGetCategory_adminByIdQuery, useUpdateCategory_adminMutation } from "@/api/admin/category_admin";
import { Button, Form, Image, Input, InputNumber, Select, Skeleton, Spin, message } from "antd";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";


const UpdateRoomType = () => {
  const [selectedFile, setSelectedFile] = useState<File>();
  const navigate = useNavigate()
  const { id } = useParams()
  const { data, isLoading, isError } = useGetCategory_adminByIdQuery(id)
  const [updateCate] = useUpdateCategory_adminMutation()
  const [isImageChanged, setIsImageChanged] = useState(false);
  const [isUploading, setIsUploading] = useState(false)

  const onFinish = (values: any) => {
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
    body.append('short_description', values.short_description)
    if (isImageChanged) {
      body.append('image', selectedFile as File);
    } else {
      body.append('image', data?.image);
    }
    setIsUploading(true);
    message.loading({ content: 'Đang tải ảnh lên...', key: 'uploading', duration: 6 });
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
      <header className="flex justify-between items-center my-5 mx-3">
        <h2 className="text-2xl ">Cập nhật dịch vụ: <span className='text-blue-700 font-semibold'>{data?.name}</span></h2>
      </header>

      <Form
        name="basic"
        initialValues={data}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 1000 }}
      >
        <div className="">
          <Form.Item
            label="Tên loại phòng"
            name="name"
            rules={[{ required: true, message: 'Vui lòng nhập tên loại phòng!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="image"
            label="Upload"
          >
            <Image src={data?.image} width={100} height={100} alt="Current Image" />
            <input type='file' onChange={handleChange} />
          </Form.Item>


          <Form.Item
            label="Mô tả"
            name="description"
            rules={[{ required: true, message: 'Vui lòng nhập mô tả!' }]}
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item
            label="Mô tả ngắn"
            name="short_description"
            rules={[{ required: true, message: 'Vui lòng nhập mô tả ngắn!' }]}
          >
            <Input.TextArea />
          </Form.Item>

          <Form.Item
            label="Số tầng"
            name="floor"
            rules={[{ required: true, message: 'Vui lòng nhập số tầng!' }]}
          >
            <InputNumber />
          </Form.Item>
          <Form.Item
            label="Số người"
            name="quantity_of_people"
            rules={[{ required: true, message: 'Vui lòng nhập số người!' }]}
          >
            <InputNumber />
          </Form.Item>
          <Form.Item
            label="Giá"
            name="price"
            rules={[{ required: true, message: 'Vui lòng nhập giá phòng!' }]}
          >
            <InputNumber />
          </Form.Item>
          <Form.Item
            label="Diện tích"
            name="acreage"
            rules={[{ required: true, message: 'Vui lòng nhập diện tích!' }]}
          >
            <InputNumber />
          </Form.Item>
          <Form.Item
            label="Trạng thái phòng"
            name="status"
            rules={[{ required: true, message: 'Vui lòng nhập trạng thái phòng!' }]}
          >
            <Select placeholder="Chọn trạng thái">
            <Select.Option value={2}>Đang hoạt động</Select.Option>
            <Select.Option value={1}>Đang bảo trì</Select.Option>
            <Select.Option value={0}>Đang chờ</Select.Option>
          </Select>
          </Form.Item>
        </div>


        <Form.Item >
          <Button type="primary" htmlType="submit" className=' bg-blue-600 text-white rounded-md'>
            Cập nhật phòng
          </Button>
          <Button type="primary" danger className='mx-2' onClick={() => navigate("/admin/manageroomtype")}>
            Quay lại
          </Button>
        </Form.Item>
      </Form>

    </div>
  )
}

export default UpdateRoomType