import { useGetHotel_adminsQuery, useRemoveHotel_adminMutation } from '@/api/admin/hotel_admin';
import { Table, Divider, Radio, Select, Input, Popconfirm, message, Image, Skeleton } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useState } from 'react';
import { AiOutlineTool } from 'react-icons/ai';
import { BiTrash } from 'react-icons/bi';
import { IoAddCircleOutline } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';


export const HotelManagement = () => {
    const [pagination, setPagination] = useState({ current: 1, pageSize: 5 });
    const { data: HotelData, isLoading, isError } = useGetHotel_adminsQuery({});
    const [removeHotel, {isLoading:isRemoving}] = useRemoveHotel_adminMutation({})
    const navigate = useNavigate();
    const [searchText, setSearchText] = useState("");

    const data = HotelData?.map(({ id, name, image, email, description, quantity_of_room, star, phone, quantity_floor, status, name_cities, address }: DataType) => ({
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
        status: number | string,
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
            render: (text) => <span>{text.length > 10 ? `${text.slice(0, 20)}...` : text}</span>
        },
        {
            title: "Hình ảnh",
            dataIndex: "image",
            key: "image",
            render: (image) => <Image src={image[0]?.image} width={100} height={100} />,
        },
        {
            title: 'City',
            dataIndex: 'name_cities',
            key: 'name_cities',
            render: (text) => <span>{text.length > 5 ? `${text.slice(0, 10)}...` : text}</span>
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
            render: (_, record) => {
                let statusText = '';

                if (record.status === 2) {
                    statusText = 'Hoạt động';
                } else if (record.status === 1) {
                    statusText = 'Đã ẩn';
                } else if (record.status === 0) {
                    statusText = 'Đang chờ';
                }

                return <span>{statusText}</span>;
            },
        },
        {
            title: 'Action',
            key: 'action',
            render: (_: any, item: any) => {
                return (
                    <>
                        <div>
                            {hasAddUserPermission("update hotel") && (
                                <button className="mr-2 px-3 py-2 hover:bg-cyan-600 bg-cyan-500 text-white rounded-md" onClick={() => navigate(`/admin/updatehotel/${item.key}`)}><AiOutlineTool className="text-lg" /></button>
                            )}
                            {hasAddUserPermission("delete hotel") && (
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
                                    <button className="hidden mr-2 px-3 py-2 hover:bg-red-600 bg-red-500 text-white rounded-md" ><BiTrash className="text-lg" /></button>
                                </Popconfirm>
                            )}

                        </div>

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
    const dataPermission = localStorage.getItem('userAdmin')
    const currentUserPermissions = (dataPermission && JSON.parse(dataPermission).permissions) || [];
    const hasAddUserPermission = (permissions: any) => {
        return currentUserPermissions.includes(permissions);
    };
    if (isLoading) return <Skeleton active />
    if (isError) return <div>Error</div>
    if (isRemoving) {
        message.loading({ content: 'Loading...', key: 'updatable', duration: 1 })
    }
    return (
        <div>
            <div className='flex justify-between items-center mb-4'>
                <div className="text-lg font-bold text-orange-500">Quản lý khách sạn</div>
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
                    hasAddUserPermission("add hotel") && (
                        <button className="px-3 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600" onClick={() => navigate('/admin/addhotel')}><IoAddCircleOutline className="text-xl" /></button>
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
                    scroll={{ x: 1500 }}
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
