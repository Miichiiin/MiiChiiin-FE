
import { useGetCategory_adminQuery, useRemoveCategory_adminMutation } from "@/api/admin/category_admin";
import {
  Table,
  Divider,
  Radio,
  Input,
  Select,
  Button,
  message,
  
  
} from "antd";
import type { ColumnsType } from "antd/es/table";
import { useState } from "react";
import { Link } from "react-router-dom";

export const ManagerRoomType = () => {
  const {data: categoryData} = useGetCategory_adminQuery([]);
  const [removeCategory_admin] = useRemoveCategory_adminMutation();
  
  

  const [messageApi, contextHolder] = message.useMessage();
  const dataSource = categoryData?.map(({id,name,price,image,description,capacity,convenient,quantity_of_people,acreage,floor,status,likes,views,
    created_at,updated_at
  }: DataType) =>({
    key:id,
    name:name,
    price:price,
    image:image,
    description:description,
    capacity: capacity,
    convenient:convenient,
    quantity_of_people:quantity_of_people,
    acreage:acreage,
    floor:floor,
    status:status,
    likes:likes,
    views:views,
    created_at:created_at,
    updated_at:updated_at
  }))
  interface DataType {
    key:number
    id: string | number;
    name: string;
    description: string;
    capacity: string;
    convenient: string;
    image:string;
    quantity_of_people:number;
    price:number;
    acreage:number;
    floor:number;
    status: number | string;
    likes:number;
    views:number;
    created_at:string;
    updated_at:string;
  }

  const columns: ColumnsType<DataType> = [
    {
      title: "#",
      dataIndex: "key",
      key: "key",
      render: (_, record, index) => <span>{index + 1}</span>,
    },
    {
      title: "Tên loại phòng",
      dataIndex: "name",
      key: "name",
      
      render: (text:any,item:any) =>{
        return (
            <>
              <Link to={`/admin/updateroomtype/${item.key}`}>{text}</Link>
            </>
          )
        }
    },
    {
      title: "Hình ảnh",
      dataIndex: "image",
      key: "image",
      // render: (image) => <img src={image} alt="Hình ảnh" width="100" />,
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      key: "description",
      width:200,
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
    },
    {
      title: "Diện tích",
      dataIndex: "acreage",
      key: "acreage",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
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
      title: "Ngày tạo",
      dataIndex: "created_at",
      key: "created_at",
    },
    {
      title: "Ngày cập nhập",
      dataIndex: "updated_at",
      key: "updated_at",
    },
    
  ];

  const [searchText, setSearchText] = useState("");
  const [selectedRows, setSelectedRows] = useState<DataType[]>([]);
  const [selectionType, setSelectionType] = useState<'checkbox'>('checkbox');
  const [selectedStatus, setSelectedStatus] = useState<string | undefined>(undefined);
  const filteredData = dataSource ? dataSource
    .filter((item: DataType) =>
      item.name.toLowerCase().includes(searchText.toLowerCase())
    )
    .filter((item: DataType) =>
      selectedStatus === undefined ? true : item.status === selectedStatus
    ) : [];


  const confirmDelete = (id: number) => {
    const isConfirmed = window.confirm('Bạn có chắc chắn muốn xóa phòng này?');
    if (isConfirmed) {
        removeCategory_admin(id).unwrap().then(() => {
            setSelectedRows((prevSelectedRows) => prevSelectedRows.filter((row) => row.key !== id));
        });
    }
};
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
        <div className="text-lg font-semibold">Quản Lý Loại Phòng</div>
        <div className='flex items-center'>
          <Input.Search placeholder="Tìm kiếm" className="mr-4" allowClear onSearch={(value) => setSearchText(value)} />
          <Select
            showSearch
            style={{ width: 200 }}
            placeholder="Search to Select"
            optionFilterProp="children"
            filterOption={(input, option) => (option?.label ?? "").includes(input)}
            filterSort={(optionA, optionB) =>
              (optionA?.label ?? "").toLowerCase().localeCompare((optionB?.label ?? "").toLowerCase())
            }
            options={[
              {
                value: "0",
                label: "Tất cả",
              },
              {
                value: "1",
                label: "Không hiển thị",
              },
              {
                value: "2",
                label: "Hiển thị",
              },
            ]}
            onChange={(value) => {
              if (value === "0") {
                setSelectedStatus(undefined); // Xóa bộ lọc
              } else {
                setSelectedStatus(value); // Sử dụng giá trị trạng thái đã chọn
              }
            }}
          />
        </div>
        <button className="ml-2 px-2 py-2 bg-blue-500 text-white rounded-md">
          <Link to={`/admin/addroomtype`}>Thêm loại phòng</Link>
        </button>
      </div>
      <div>
          
             <Button type="primary" className='mx-5' danger
                onClick={() => {
                    selectedRows.forEach((row) => confirmDelete(row.key));
                }}
                disabled={selectedRows.length === 0}
            >Xóa</Button>
          <Button type="primary" danger className="ml-2 mt-1">
            <Link to={`/admin/updateroomtype`}>Sửa</Link>
          </Button>
        </div>

      <Radio.Group
        onChange={({ target: { value } }) => {
          setSelectionType(value);
        }}
        value={selectionType}
      ></Radio.Group>

      <Divider />
      <Table
        rowSelection={{
          type: selectionType,
          selectedRowKeys: selectedRows.map((row) => row.key), // Thêm dòng này
          onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
            setSelectedRows(selectedRows);
        },
        }}
        columns={columns}
        dataSource={filteredData}
        scroll={{ x: 2000 }}
       
      />
      
    </div>
  );
};
