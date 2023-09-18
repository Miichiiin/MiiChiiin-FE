import { useGetBooking_adminQuery, useRemoveBooking_adminMutation } from '@/api/admin/booking_admin';
import { Table, Divider, Radio, Button, Select, Input } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useState } from 'react';
import { Link } from 'react-router-dom';


export const BookingManagement = () => {
    const {data: dataBooking} = useGetBooking_adminQuery({})
    const [removeBooking] = useRemoveBooking_adminMutation()
    const [searchText, setSearchText] = useState("");
    const [selectedRows, setSelectedRows] = useState<DataType[]>([]);
    const [selectionType, setSelectionType] = useState<'checkbox'>('checkbox');
    const [selectedStatus, setSelectedStatus] = useState<string | undefined>(undefined);

    const data = dataBooking?.map(({id, check_in,check_out,email,name,people_quantity,total_amount,status,cccd,nationality,id_user,phone,promotion,cart}:DataType) => ({
        key: id,
        check_in,
        check_out,
        email,
        name,
        people_quantity,
        total_amount,
        status,
        cccd,
        nationality,
        id_user,
        phone,
        promotion,
        cart
    }))
    interface DataType {
        key: number;
        id:number|string;
        check_in: string;
        check_out: string;
        email: string;
        name: string;
        people_quantity: number;
        total_amount: number;
        status: number|string
        cccd: string;
        nationality: string;
        id_user: number;
        phone: string;
        cart: [
            {
                id_cate: number;
                services: [number]
            }
        ]
        promotion: number
    }

    const columns: ColumnsType<DataType> = [
        {
            title: 'Tên khách hàng',
            dataIndex: 'name',
            key: 'name',
            render: (text: any, item: any) => {
                return (
                    <>
                        <Link to={`/admin/bookingmanagement/${item.key}/update`}>{text}</Link>
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
            title: 'Số điện thoại',
            dataIndex: 'phone',
            key: 'phone',
        },
        {
            title: 'Tổng tiền',
            dataIndex: 'total_amount',
            key: 'total_amount',
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
        },
        {
            title: 'Ngày đặt',
            dataIndex: 'check_in',
            key: 'check_in',
        },
        {
            title: 'Ngày trả',
            dataIndex: 'check_out',
            key: 'check_out',
        },
        {
            title: 'Số người',
            dataIndex: 'people_quantity',
            key: 'people_quantity',
        },
        {
            title: 'Số CCCD',
            dataIndex: 'cccd',
            key: 'cccd',
        },
        {
            title: 'Quốc tịch',
            dataIndex: 'nationality',
            key: 'nationality'
        },
        {
            title: 'Mã giảm giá',
            dataIndex: 'promotion',
            key: 'promotion'
        },
        {
            
        }
    ];
    // Xóa booking
    const confirmDelete = (id: number) => {
        const isConfirmed = window.confirm('Bạn có chắc chắn muốn xóa khách sạn này?');
        if (isConfirmed) {
            removeBooking(id).unwrap().then(() => {
                setSelectedRows((prevSelectedRows) => prevSelectedRows.filter((row) => row.key !== id));
            });
        }
    };
    //lọc dữ liệu
    const filteredData = data ? data
        .filter((item: DataType) =>
            item.name.toLowerCase().includes(searchText.toLowerCase())
        )
        .filter((item: DataType) =>
            selectedStatus === undefined ? true : item.status === selectedStatus
        ) : [];

    return (
        <div>
            <div className='flex justify-between items-center mb-4'>
                <div className="text-lg font-semibold">Quản lý đơn hàng</div>
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
                                value: 0,
                                label: "Tất cả",
                            },
                            {
                                value: 1,
                                label: "Không hiển thị",
                            },
                            {
                                value: 2,
                                label: "Hiển thị",
                            },
                        ]}
                        onChange={(value) => {
                            if (value === 0) {
                                setSelectedStatus(undefined); // Xóa bộ lọc
                            } else {
                                setSelectedStatus(value); // Sử dụng giá trị trạng thái đã chọn
                            }
                        }}
                    />
                </div>
                <button className="ml-2 px-2 py-2 bg-blue-500 text-white rounded-md"><Link to={'/admin/addbooking'}>Thêm booking</Link></button>
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
            <Button type="primary" className='mx-5' danger
                onClick={() => {
                    selectedRows.forEach((row) => confirmDelete(row.key));
                }}
                disabled={selectedRows.length === 0}
            >Xóa</Button>
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
                        selectedRowKeys: selectedRows.map((row) => row.key), // Thêm dòng này
                        onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
                            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
                            setSelectedRows(selectedRows);
                        },
                    }}
                    columns={columns}
                    dataSource={filteredData}
                    className="custom-table"
                />
            </div>
        </div>
    )
}
