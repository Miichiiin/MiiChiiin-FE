import { Table, Divider, Radio, Button, Select, Input, Image } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useState } from 'react';
import { Link } from 'react-router-dom';


export const UserManagement = () => {
    interface DataType {
        key: string;
        name: string,
        email: string,
        image?: string,
        order: string;
        sex?: string,
        birht_day?: string;
        address?: string;
        phone_number?: string,
        id_number?: string,
        nationality?: string;

    }

    const columns: ColumnsType<DataType> = [
        {
            title: 'Tên tên khách hàng',
            dataIndex: 'name',
            key: 'name',
            render: (text: any, item: any) => {
                return (
                    <>
                        <Link to={`/admin/edituser/`}>{text}</Link>
                    </>
                )
            }
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Ảnh',
            dataIndex: 'image',
            key: 'image',
            render: (text) => <Image src={text} width={50} />
        },
        {
            title: 'Đơn hàng',
            dataIndex: 'order',
            key: 'order',
        },
        {
            title: 'Giới tính',
            dataIndex: 'sex',
            key: 'sex',
        },
        {
            title: 'Ngày sinh',
            dataIndex: 'birht_day',
            key: 'birht_day',
        },
        {
            title: 'Địa chỉ',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'phone_number',
            key: 'phone_number',
        },
        {
            title: 'CCCD',
            dataIndex: 'id_number',
            key: 'id_number',
        },
        {
            title: 'Quốc tịch',
            dataIndex: 'nationality',
            key: 'nationality',
        },
    ];

    const data: DataType[] = [
        {
            key: '1',
            name: "Nguyễn Văn Luân",
            email: "luan@gmail.com",
            image: "https://media.istockphoto.com/id/1256768065/vi/vec-to/logo-linh-v%E1%BA%ADt-esport-h%E1%BB%95-tr%E1%BA%AFng.jpg?s=612x612&w=is&k=20&c=_kzP2cuB-s76LYATE2I9RIGp_6vFeqs08PDQKa0EaoU=",
            order: "6",
            sex: "nam",
            birht_day: "21/08/2003",
            address: "Hà nội",
            phone_number: "0989898986",
            id_number: "001203054585",
            nationality: "Việt Nam"
        },

    ];

    const rowSelection = {
        onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },

    };
    const [selectionType, setSelectionType] = useState<'checkbox'>('checkbox');
    // const onSearch = (value: string) => console.log(value);
    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <div className="text-lg font-semibold">Quản lý khách hàng</div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Input.Search placeholder="Tìm kiếm" style={{ marginRight: '8px' }} />
                    <Select
                        showSearch
                        style={{ width: 200 }}
                        placeholder="Search to Select"
                        optionFilterProp="children"
                        filterOption={(input, option) => (option?.label ?? '').includes(input)}
                        filterSort={(optionA, optionB) =>
                            (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                        }
                        options={[
                            {
                                value: '1',
                                label: 'Not Identified',
                            },
                            {
                                value: '2',
                                label: 'Closed',
                            },
                            {
                                value: '3',
                                label: 'Communicated',
                            },
                            {
                                value: '4',
                                label: 'Identified',
                            },
                            {
                                value: '5',
                                label: 'Resolved',
                            },
                            {
                                value: '6',
                                label: 'Cancelled',
                            },
                        ]}
                    />
                </div>
                <button className="ml-2 px-2 py-2 bg-blue-500 text-white rounded-md"><Link to={'/admin/adduser'}>Thêm khách hàng</Link></button>
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
                    dataSource={data}
                    className="custom-table"
                />
            </div>
        </div>
    )
}
