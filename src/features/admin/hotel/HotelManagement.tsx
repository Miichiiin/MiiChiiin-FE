import { useGetHotel_adminsQuery, useRemoveHotel_adminMutation } from '@/api/admin/hotel_admin';
import { Table, Divider, Radio, Button, Select, Input, Popconfirm, message, Image } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const users = [
    {
     token: "haha",
     admin:{
       id: 2,
       id_hotel: 1,
       name: "Augustus Mitchell",
       image: "https://via.placeholder.com/640x480.png/0055aa?text=enim",
       role: "",
       permissions: [
         'add hotel',
         'update hotel',
         'delete hotel',
         'add voucher',
       ]
     },
    }
   
  ];
export const HotelManagement = () => {
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 5,
      });
    const { data: HotelData } = useGetHotel_adminsQuery({})
    console.log(HotelData);
    
    const [removeHotel] = useRemoveHotel_adminMutation({})
    const navigate = useNavigate();
    const [searchText, setSearchText] = useState("");

    const data = HotelData?.map(({ id, name,image, email, description, quantity_of_room, star, phone, quantity_floor, status, name_cities,address }: DataType) => ( {
        key: id,
        name,
        email,
        description,
        quantity_of_room,
        star,
        phone,
        quantity_floor,
        status,
        name_cities,
        address,
        image,
    }))
    
    
    interface DataType {
        key: number;
        id: string | number;
        name: string,
        email: string,
        description: string,
        quantity_of_room: number,
        phone: string,
        star: number,
        quantity_floor: number,
        status: number,
        name_cities: string,
        address: string,
        image: Array<object>
    }

    const columns: ColumnsType<DataType> = [
        {
            title: 'ID',
            dataIndex: 'key',
        },
        {
            title: 'Hotel',
            dataIndex: 'name',
            key: 'name',
            render: (text) => <span>{text.length > 5 ? `${text.slice(0, 5)}...` : text}</span>
        },
        {
            title: "Hình ảnh",
            dataIndex: "image",
            key: "image",
            render: (image) => <Image src={image[0].image} width={100} height={100} />,
          },
        {
            title: 'City',
            dataIndex: 'name_cities',
            key: 'name_cities',
            render: (text) => <span>{text.length > 5 ? `${text.slice(0, 5)}...` : text}</span>
        },
        {
            title: 'Star',
            dataIndex: 'star',
            key: 'star',
        },
        {
            title: 'Floor',
            dataIndex: 'quantity_floor',
            key: 'quantity_floor',
        },
        {
            title: 'SĐT',
            dataIndex: 'phone',
            key: 'phone',
            render: (text) => <span>{text.length > 10 ? `${text.slice(0, 5)}...` : text}</span>
        },
        {
            title: 'Rooms',
            dataIndex: 'quantity_of_room',
            key: 'quantity_of_room',
        },
        {
            title: 'Mô tả',
            dataIndex: 'description',
            key: 'description',
            render: (text) => <span>{text.length > 10 ? `${text.slice(0, 5)}...` : text}</span>
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
            render: (text) => <span>{text.length > 30 ? `${text.slice(0, 5)}...` : text}</span>
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_: any, item: any) => {
                return (
                    <>
                      {hasAddUserPermission && (
                        <div>
                          <Popconfirm
                            title="Xóa Khách sạn"
                            description="Bạn có muốn xóa không??"
                            onConfirm={() => {
                              removeHotel(item.key).unwrap().then(() => {
                                message.success("Xóa thành công");
                              })
                            }}
                            okText="Có"
                            cancelText="Không"
                          >
                            <Button danger>Xóa</Button>
                          </Popconfirm>
                          <Button className="mx-2 px-4 py-1 border border-blue-700 rounded" onClick={()=>navigate(`/admin/updatehotel/${item.key}`)}>Sửa</Button>
                        </div>
                      )}
                    </>
                  )
            }
        }
    ];
    const [selectionType, setSelectionType] = useState<'checkbox'>('checkbox');
    const [addressFilter, setAddressFilter] = useState<string | undefined>(undefined);

    const handleAddressFilterChange = (value: string) => {
        setAddressFilter(value);
    };

    const filteredData = data ? data.filter((item: DataType) => {
        const nameMatch = item.name.toLowerCase().includes(searchText.toLowerCase());
        const addressMatch = !addressFilter || item.name_cities.includes(addressFilter);
    
        return nameMatch && addressMatch;
    }) : [];
    // phân quyền
  const [hasAddUserPermission, setHasAddUserPermission] = useState(
    users[0].admin.permissions.includes("add hotel") &&
    users[0].admin.permissions.includes("update hotel") &&
    users[0].admin.permissions.includes("delete hotel")
  );
    return (
        <div>
            <div className='flex justify-between items-center mb-4'>
                <div className="text-lg font-semibold">Quản lý khách sạn</div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Input.Search placeholder="Tìm kiếm" className="mr-4" allowClear onSearch={(value) => setSearchText(value)} />
                    <Select
                        showSearch
                        style={{ width: 200 }}
                        placeholder="Lọc theo địa chỉ"
                        optionFilterProp="children"
                        onChange={handleAddressFilterChange}
                        value={addressFilter}
                    >
                        {data?.map((item: any) => (
                            <Select.Option key={item.id} value={item.name_cities}>
                                {item.name_cities}
                            </Select.Option>
                        ))}
                    </Select>
                </div>
                {
                    hasAddUserPermission && (
                        <button className="ml-2 px-2 py-2 bg-blue-500 text-white rounded-md"><Link to={'/admin/addhotel'}>Thêm khách sạn</Link></button>
                    )
                }
            </div>
            {/* Phần CSS tùy chỉnh cho bảng */}
            <style>
                {`
                    .table-container {
                        background-color: #f4f4f4;
                        border-radius: 8px;
                        padding: 12px;
                    }
                    `}
            </style>
            <Radio.Group
                onChange={({ target: { value } }) => {
                    setSelectionType(value);
                }}
                value={selectionType}
            >
            </Radio.Group>

            <Divider />
            <div className="table-container">
                <Table
                    columns={columns}
                    dataSource={filteredData}
                    className="custom-table"
                    pagination={{
                        ...pagination,
                        onChange: (page) => {
                          setPagination({ ...pagination, current: page });
                        },
                      }}
                />
            </div>
        </div>
    )
}
