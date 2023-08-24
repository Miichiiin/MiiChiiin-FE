import { Table, Divider, Radio, Button, Select, Image, Input } from 'antd';
// import Search from 'antd/es/input/Search';
import type { ColumnsType } from 'antd/es/table';
import { useState } from 'react';
import { Link } from 'react-router-dom';


export const ServiceManagement = () => {
    interface DataType {
        key: string;
        name_service: string,
        price: string;
        image: string;
        status: string,
        description: string,
    }

    const columns: ColumnsType<DataType> = [
        {
            title: 'Tên dịch vụ',
            dataIndex: 'name_service',
            key: 'name_service',
            render: (text: any, item: any) => {
                return (
                    <>
                        <Link to={`/admin/editservice/`}>{text}</Link>
                    </>
                )
            }
        },
        {
            title: 'Giá dịch vụ',
            dataIndex: 'price',
            key: 'price',
        },
        {
            title: 'Hình ảnh',
            dataIndex: 'image',
            key: 'image',
            render: (text) => <Image src={text} width={80} />
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
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
            name_service: 'Phòng tình yêu',
            price: "John Brown",
            image: "https://media.istockphoto.com/id/1256768065/vi/vec-to/logo-linh-v%E1%BA%ADt-esport-h%E1%BB%95-tr%E1%BA%AFng.jpg?s=612x612&w=is&k=20&c=_kzP2cuB-s76LYATE2I9RIGp_6vFeqs08PDQKa0EaoU=",
            status: "đã duyệt",
            description: "...",
        },
        {
            key: '2',
            name_service: 'Phòng tình yêu',
            price: "John Brown",
            image: "https://media.istockphoto.com/id/1256768065/vi/vec-to/logo-linh-v%E1%BA%ADt-esport-h%E1%BB%95-tr%E1%BA%AFng.jpg?s=612x612&w=is&k=20&c=_kzP2cuB-s76LYATE2I9RIGp_6vFeqs08PDQKa0EaoU=",
            status: "đã duyệt",
            description: "...",
        },

    ];

    const rowSelection = {
        onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
    
    };
    const [selectionType, setSelectionType] = useState<'checkbox'>('checkbox');
    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <div className="text-lg font-semibold">Quản lý dịch vụ</div>
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
                <button className="ml-2 px-2 py-2 bg-blue-500 text-white rounded-md"><Link to={'/admin/addservice'}>Thêm dịch vụ</Link></button>
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
