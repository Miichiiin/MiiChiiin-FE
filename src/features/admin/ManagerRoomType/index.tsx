
import { useGetCategory_adminQuery, useRemoveCategory_adminMutation, useStatusCategory_adminMutation } from "@/api/admin/category_admin";
import {
  Table,
  Divider,
  Radio,
  Input,
  Select,
  Image,
  Popconfirm,
  message,
  Skeleton,
  Switch,

} from "antd";
import type { ColumnsType } from "antd/es/table";
import { useState } from "react";
import { AiOutlineTool } from "react-icons/ai";
import { BiTrash } from "react-icons/bi";
import { IoAddCircleOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";


export const ManagerRoomType = () => {
  const { data: categoryData, isLoading, isError } = useGetCategory_adminQuery();
  const [removeCategory_admin, { isLoading: isRemoving }] = useRemoveCategory_adminMutation();
  const [changeStatus] = useStatusCategory_adminMutation();
  const handleStatusChange = (record: any) => {
    const status = record.status
    if(status === 2){
      changeStatus({ id: record.key, status: 2 }).unwrap().then(() => {
        message.success("Cập nhật trạng thái thành công");
        navigate("/admin/manageroomtype");
      })
    } else if(status === 1){
      changeStatus({ id: record.key, status: 1 }).unwrap().then(() => {
        message.success("Cập nhật trạng thái thành công");
        navigate("/admin/manageroomtype");
      })
    }
  };
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 5,
  });
  const navigate = useNavigate()
  // phân quyền
  const dataPermission = localStorage.getItem('userAdmin')
  const currentUserPermissions = (dataPermission && JSON.parse(dataPermission).permissions) || [];
  const hasAddUserPermission = (permissions: any) => {
    return currentUserPermissions.includes(permissions);
  };



  const dataSource = categoryData?.map(({ id, name, price, image, description, capacity, convenient, quantity_of_people, acreage, floor, status, likes, views,
    created_at, updated_at
  }: DataType) => ({
    key: id,
    name: name,
    price: price,
    image: image,
    description: description,
    capacity: capacity,
    convenient: convenient,
    quantity_of_people: quantity_of_people,
    acreage: acreage,
    floor: floor,
    status: status,
    likes: likes,
    views: views,
    created_at: created_at,
    updated_at: updated_at
  }))
  interface DataType {
    key: number
    id: string | number;
    name: string;
    description: string;
    capacity: string;
    convenient: string;
    image: string;
    quantity_of_people: number;
    price: number;
    acreage: number;
    floor: number;
    status: number | string;
    likes: number;
    views: number;
    created_at: string;
    updated_at: string;
  }

  const columns: ColumnsType<DataType> = [
    {
      title: "ID",
      dataIndex: "key",
      key: "key",
      render: (_, __, index) => <span>{index + 1}</span>,
    },
    {
      title: "Tên loại phòng",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Hình ảnh",
      dataIndex: "image",
      key: "image",
      render: (image) => <Image src={image} width={100} height={100} />,
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Sức chứa",
      dataIndex: "quantity_of_people",
      key: "quantity_of_people",
    },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
      render: (price) => <span>{price.toLocaleString("vi-VN")} VNĐ</span>,
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (_,record) => {
        return <Switch
          className="bg-gray-500"
          checkedChildren=""
          unCheckedChildren=""
          defaultChecked={record.status === 2}
          onChange={() => handleStatusChange(record)}
        />
      }
    },
    {
      title: "Lượt thích",
      dataIndex: "likes",
      key: "likes",
    },
    {
      title: "Lượt xem",
      dataIndex: "views",
      key: "views",
    },
    {
      title: "Action",
      render: (_, record) => {
        return (
          <div className="flex items-center">
            {hasAddUserPermission('update category') && (
              <button className="mr-2 px-3 py-2 hover:bg-cyan-600 bg-cyan-500 text-white rounded-md text-lg" onClick={() => navigate(`/admin/updateroomtype/${record.key}`)}>
                <AiOutlineTool />
              </button>
            )}
            {hasAddUserPermission('delete category') && (
              <Popconfirm
                title="Xóa Khách sạn"
                description="Bạn có muốn xóa không??"
                onConfirm={() => {
                  removeCategory_admin(record.key).unwrap().then(() => {
                    message.success("Xóa thành công");
                  })
                }}
                okText="Có"
                cancelText="Không"
              >
                <button className="hidden bg-red-500 hover:bg-red-600 px-3 py-2 text-white rounded-md text-lg">
                  <BiTrash />
                </button>
              </Popconfirm>
            )}
          </div>
        )
      }
    }

  ];

  const [searchText, setSearchText] = useState("");
  const [selectionType, setSelectionType] = useState<'checkbox'>('checkbox');
  const [selectedStatus, setSelectedStatus] = useState<string | undefined>(undefined);

  const filteredData = dataSource ? dataSource
    .filter((item: DataType) =>
      item.name.toLowerCase().includes(searchText.toLowerCase())
    )
    .filter((item: DataType) =>
      selectedStatus === undefined ? true : item.status === selectedStatus
    ) : [];
  if (isLoading) {
    return <Skeleton active />;
  }
  if (isError) {
    return <div>Error</div>;
  }
  if (isRemoving) {
    message.loading({ content: 'Đang xóa ...', key: 'updatable', duration: 0.5 });
  }

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "16px",
        }}
      >
        <div className="text-lg font-bold text-orange-600">Quản Lý Loại Phòng</div>
        <div className='flex items-center'>
          <Input.Search placeholder="Tìm kiếm" className="mr-4" allowClear onSearch={(value) => setSearchText(value)} />
          <Select
            showSearch
            style={{ width: 200 }}
            placeholder="Lọc"
            defaultValue="all"
            optionFilterProp="children"
            filterOption={(input, option) => (option?.label ?? "").includes(input)}
            filterSort={(optionA, optionB) =>
              (optionA?.label ?? "").toLowerCase().localeCompare((optionB?.label ?? "").toLowerCase())
            }
            options={[
              {
                value: "all",
                label: "Tất cả",
              },
              {
                value: 1,
                label: "Ẩn",
              },
              {
                value: 2,
                label: "Hoạt động",
              }
            ]}
            onChange={(value) => {
              if (value === "all") {
                setSelectedStatus(undefined); // Xóa bộ lọc
              } else {
                setSelectedStatus(value); // Sử dụng giá trị trạng thái đã chọn
              }
            }}
          />
        </div>
        {hasAddUserPermission('add category') && (
          <button className="ml-2 px-3 py-2 hover:bg-blue-600 bg-blue-500 text-white rounded-md" onClick={() => navigate(`/admin/addroomtype`)}>
            <IoAddCircleOutline className="text-xl" />
          </button>
        )}
      </div>
      <Radio.Group
        onChange={({ target: { value } }) => {
          setSelectionType(value);
        }}
        value={selectionType}
      ></Radio.Group>

      <Divider />
      <Table
        columns={columns}
        dataSource={filteredData}
        scroll={{ x: 1000 }}
        pagination={{
          ...pagination,
          onChange: (page) => {
            setPagination({ ...pagination, current: page });
          },
        }}
      />

    </div>
  );
};
