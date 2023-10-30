import { useGetHotel_adminsQuery, useRemoveHotel_adminMutation } from '@/api/admin/hotel_admin';
import { Table, Divider, Radio, Button, Select, Input, Image } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useState } from 'react';
import { Link } from 'react-router-dom';

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
    const { data: HotelData } = useGetHotel_adminsQuery({})
    console.log(HotelData);
    
    const [removeHotel] = useRemoveHotel_adminMutation({})

    const [searchText, setSearchText] = useState("");

    const data = HotelData?.map(({ id, name, email, description, quantity_of_room, star, phone, quantity_floor, created_at, updated_at, status, id_city, name_cities, image_urls }: DataType) => ({
        key: id,
        name,
        email,
        description,
        quantity_of_room,
        star,
        phone,
        quantity_floor,
        created_at,
        updated_at,
        status,
        id_city,
        name_cities,
        image_urls,
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
        created_at: string,
        updated_at: string,
        status: number,
        id_city: number,
        name_cities: string,
        image_urls: string,
    }

    const columns: ColumnsType<DataType> = [
        {
            title: 'ID',
            dataIndex: 'key',
        },
        {
            title: 'Tên khách sạn',
            dataIndex: 'name',
            key: 'name',
            render: (text: any, item: any) => {
                return (
                    <>
                        {hasAddUserPermission && (
                            <Link to={`/admin/updatehotel/${item.key}`}>{text}</Link>
                        )}
                    </>
                )
            }
        },
        {
            title: 'Tên thành phố',
            dataIndex: 'name_cities',
            key: 'name_cities',
        },
        {
            title: 'Số sao',
            dataIndex: 'star',
            key: 'star',
        },
        {
            title: 'Số tầng',
            dataIndex: 'quantity_floor',
            key: 'quantity_floor',
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'phone',
            key: 'phone',
        },
        {
            title: 'Số phòng',
            dataIndex: 'quantity_of_room',
            key: 'quantity_of_room',
        },
        {
            title: 'Mô tả',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'Ảnh',
            dataIndex: 'image_urls',
            key: 'image_urls',
            render: (text) => <Image src={text} width={50} />
        },
        {
            title: 'Email khách sạn',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
        },

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
                            <Select.Option key={item.key} value={item.name_cities}>
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
                        padding: 16px;
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
                />
            </div>
        </div>
    )
}
