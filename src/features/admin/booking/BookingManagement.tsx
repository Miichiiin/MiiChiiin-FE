import { Table, Divider, Radio, Button, Select, Input } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useState } from 'react';
import { Link } from 'react-router-dom';


export const BookingManagement = () => {
    interface DataType {
        key: string;
        customer_name: string,
        room_name: string,
        guest_number: number;
        total_money: number;
        payment_methods: string,
        extra_service: string,
        status: string,
        booking_date: string;
        checkin_date: string;
        checkout_date: string;
    }

    const columns: ColumnsType<DataType> = [
        {
            title: 'Tên tên khách hàng',
            dataIndex: 'customer_name',
            key: 'customer_name',
            render: (text: any, item: any) => {
                return (
                    <>
                        <Link to={`/admin/editservice/`}>{text}</Link>
                    </>
                )
            }
        },
        {
            title: 'Tên phòng',
            dataIndex: 'room_name',
            key: 'room_name',
        },
        {
            title: 'Số khách',
            dataIndex: 'guest_number',
            key: 'guest_number',
        },
        {
            title: 'Phương thức thanh toán',
            dataIndex: 'payment_methods',
            key: 'payment_methods',
        },
        {
            title: 'Dịch vụ thêm',
            dataIndex: 'extra_service',
            key: 'extra_service',
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
        },
        {
            title: 'Ngày đặt phòng',
            dataIndex: 'booking_date',
            key: 'booking_date',
        },
        {
            title: 'Ngày nhận phòng',
            dataIndex: 'checkin_date',
            key: 'checkin_date',
        },
        {
            title: 'Ngày trả phòng',
            dataIndex: 'checkout_date',
            key: 'checkout_date',
        },
    ];

    const data: DataType[] = [
        {
            key: '1',
            customer_name: "Nguyễn Văn Ad",
            room_name: "402",
            guest_number: 4,
            total_money: 19000000,
            payment_methods: "chuyển khoản",
            extra_service: "Bữa trưa tại khách sạn",
            status: "đã thanh toán",
            booking_date: "19/08/2023",
            checkin_date: "20/08/2023",
            checkout_date: "22/08/2023"
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
                <div className="text-lg font-semibold">Quản lý đơn hàng</div>
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
                <div></div>
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
