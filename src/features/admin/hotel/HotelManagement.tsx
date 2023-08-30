import { Table, Divider, Radio, Button, Select, Input, Image } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useState } from 'react';
import { Link } from 'react-router-dom';


export const HotelManagement = () => {
    interface DataType {
        key: string;
        name_hotel: string,
        address: string,
        image: string,
        email: string,
        hotel_staff_number: number,
        room_number: number,
        description: string,

    }

    const columns: ColumnsType<DataType> = [
        {
            title: 'Tên tên khách hàng',
            dataIndex: 'name_hotel',
            key: 'name_hotel',
            render: (text: any, item: any) => {
                return (
                    <>
                        <Link to={`/admin/edituser/`}>{text}</Link>
                    </>
                )
            }
        },
        {
            title: 'Địa chỉ',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'Ảnh',
            dataIndex: 'image',
            key: 'image',
            render: (text) => <Image src={text} width={50} />
        },
        {
            title: 'Email khách sạn',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Số nhân viên khách sạn',
            dataIndex: 'hotel_staff_number',
            key: 'hotel_staff_number',
        },
        {
            title: 'Số phòng',
            dataIndex: 'room_number',
            key: 'room_number',
        },
        {
            title: 'Mô tả',
            dataIndex: 'description',
            key: 'description',
        },
    ];

    const data: DataType[] = [
        {
            key: '1',
            name_hotel: "Khách sạn Phú Quốc",
            address: "Phú Quốc",
            image: "https://media.istockphoto.com/id/1256768065/vi/vec-to/logo-linh-v%E1%BA%ADt-esport-h%E1%BB%95-tr%E1%BA%AFng.jpg?s=612x612&w=is&k=20&c=_kzP2cuB-s76LYATE2I9RIGp_6vFeqs08PDQKa0EaoU=",
            email: "phuquoc@gmail.com",
            hotel_staff_number: 20,
            room_number: 15,
            description: "......",
        },
        {
            key: '2',
            name_hotel: "Khách sạn Phú Quốc",
            address: "Hà Nội",
            image: "https://media.istockphoto.com/id/1256768065/vi/vec-to/logo-linh-v%E1%BA%ADt-esport-h%E1%BB%95-tr%E1%BA%AFng.jpg?s=612x612&w=is&k=20&c=_kzP2cuB-s76LYATE2I9RIGp_6vFeqs08PDQKa0EaoU=",
            email: "phuquoc@gmail.com",
            hotel_staff_number: 20,
            room_number: 15,
            description: "......",
        },

    ];

    const rowSelection = {
        onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },

    };
    const [selectionType, setSelectionType] = useState<'checkbox'>('checkbox');
    // const onSearch = (value: string) => console.log(value);

    const [addressFilter, setAddressFilter] = useState<string | undefined>(undefined);

    const handleAddressFilterChange = (value: string) => {
        setAddressFilter(value);
    };

    const filteredData = addressFilter ? data.filter(item => item.address.includes(addressFilter)) : data;
    console.log(filteredData);

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <div className="text-lg font-semibold">Quản lý khách sạn</div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Input.Search placeholder="Tìm kiếm" style={{ marginRight: '8px' }} />
                    <Select
                        showSearch
                        style={{ width: 200 }}
                        placeholder="Lọc theo địa chỉ"
                        optionFilterProp="children"
                        onChange={handleAddressFilterChange}
                        value={addressFilter}
                    >
                         <Select.Option>
                        </Select.Option>
                        {data.map(item => (
                            <Select.Option key={item.key} value={item.address}>
                                {item.address}
                            </Select.Option>
                        ))}
                    </Select>
                </div>
                <button className="ml-2 px-2 py-2 bg-blue-500 text-white rounded-md"><Link to={'/admin/addhotel'}>Thêm khách sạn</Link></button>
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
            <Button type="primary" className='mx-5' danger>Xóa</Button>
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
                    rowSelection={{
                        type: selectionType,
                        ...rowSelection,
                    }}
                    columns={columns}
                    dataSource={filteredData}
                    className="custom-table"
                />
            </div>
        </div>
    )
}
