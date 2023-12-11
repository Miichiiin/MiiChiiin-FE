import { useGetBooking_adminQuery, useRemoveBooking_adminMutation } from '@/api/admin/booking_admin';
import { Table, Divider, Radio, Select, Input, Space, Skeleton, message } from 'antd';
const { Search } = Input;
import type { ColumnsType } from 'antd/es/table';
import { useState } from 'react';
import dayjs from 'dayjs';
import 'dayjs/locale/vi';
import 'dayjs/plugin/utc';
import 'dayjs/plugin/timezone';
dayjs.locale('vi');
import { useNavigate } from 'react-router-dom';
import { IoAddCircleOutline } from 'react-icons/io5';
import { BiDetail, BiTrash } from "react-icons/bi";



export const BookingManagement = () => {
    const { data: dataBooking, isLoading, isError } = useGetBooking_adminQuery({})
    const [removeBooking, { isLoading: isRemoving, isSuccess: Success }] = useRemoveBooking_adminMutation()
    const [searchText, setSearchText] = useState("");
    const [selectionType, setSelectionType] = useState<'checkbox'>('checkbox');
    const [selectedStatus, setSelectedStatus] = useState<string | undefined>(undefined);
    const navigate = useNavigate()

    const data = dataBooking?.map(({ slug, id, check_in, check_out, email, name, people_quantity, total_amount, status, cccd, nationality, id_user, phone, promotion, cart }: DataType) => ({
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
        cart,
        slug
    }))
    interface DataType {
        slug: string;
        key: number;
        id: number | string;
        check_in: Date;
        check_out: Date;
        email: string;
        name: string;
        people_quantity: number;
        total_amount: number;
        status: number | string
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
            title: 'Mã đặt phòng',
            dataIndex: 'slug',
            key: 'slug',
        },
        {
            title: 'Tên khách hàng',
            dataIndex: 'name',
            key: 'name',
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

        // Modify the render functions for 'check_in' and 'check_out' columns

        {
            title: 'Ngày đặt',
            dataIndex: 'check_in',
            key: 'check_in',
            render: (_, record) => {
                const formattedDate = dayjs(record.check_in)
                    .format('DD/MM/YYYY'); // Remove .utc() and .local()
                return <span>{formattedDate}</span>;
            },
        },
        {
            title: 'Ngày trả',
            dataIndex: 'check_out',
            key: 'check_out',
            render: (_, record) => {
                const formattedDate = dayjs(record.check_out)
                    .format('DD/MM/YYYY'); // Remove .utc() and .local()
                return <span>{formattedDate}</span>;
            },
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            render: (_, record) => {
                let statusText = '';

                if (record.status === 2) {
                    statusText = 'Đã check in';
                } else if (record.status === 3) {
                    statusText = 'Đã thanh toán';
                } else if (record.status === 4) {
                    statusText = 'Hoàn thành';
                } else if (record.status === 1) {
                    statusText = 'Đã Huỷ';
                } else if (record.status === 0) {
                    statusText = 'Đang chờ';
                }

                return <span className='font-semibold'>{statusText}</span>;
            },
        },
        {
            title: "Hành động",
            key: "action",
            render: (_, record) => (
                <div>
                    <button className='px-3 py-2 hover:bg-emerald-600 bg-emerald-500 text-white rounded-md mr-2 text-lg' onClick={() => navigate(`/admin/detailbooking/${record.key}`)}>
                        <BiDetail /></button>
                    {hasAddUserPermission("delete booking") && (
                        <button className='hidden px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 hover:text-white text-lg' onClick={() => removeBooking(record.key)}><BiTrash /></button>
                    )}
                </div>



            )
        }
    ];
    //lọc dữ liệu

    const filteredData = data ? data
        .filter((item: DataType) =>
            item.name.toLowerCase().includes(searchText.toLowerCase())
        )
        .filter((item: DataType) =>
            selectedStatus === undefined ? true : item.status === selectedStatus
        ) : [];
    // phân quyền
    const dataPermission = localStorage.getItem('userAdmin')
    const currentUserPermissions = (dataPermission && JSON.parse(dataPermission).permissions) || [];
    const hasAddUserPermission = (permissions: any) => {
        return currentUserPermissions.includes(permissions);
    };
    if (isLoading) {
        return <Skeleton active />;
    }
    if (isError) {
        return <div>Có lỗi xảy ra khi tải thông tin dịch vụ.</div>;
    }
    if (isRemoving) {
        message.loading({ content: 'Đang xóa', key: 'removeBooking' })
    }
    if (Success) {
        message.success({ content: 'Xóa thành công', key: 'removeBooking' })
    }
    return (
        <div>
            <div className='flex justify-between items-center mb-4'>
                <div className="text-lg font-bold text-orange-500">Quản lý đơn hàng</div>
                <div className='flex items-center '>
                    <Space.Compact className='mx-2'>
                        <Search placeholder="Nhập vào để tìm kiếm" allowClear className='w-[250px]' onSearch={(value) => { setSearchText(value) }} />
                    </Space.Compact>
                    <div>
                        <Select
                            showSearch
                            className='w-[200px]'
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
                                    value: 0,
                                    label: "Đang chờ",
                                },
                                {
                                    value: 1,
                                    label: "Đã huỷ",
                                },
                                {
                                    value: 2,
                                    label: "Đã check in",
                                },
                                {
                                    value: 3,
                                    label: "Đã thanh toán",
                                },
                                {
                                    value: 4,
                                    label: "Hoàn thành",
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

                </div>
                {hasAddUserPermission("add booking") && (
                    <button className="px-3 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 flex items-center" onClick={() => navigate('/admin/addbooking')}>
                        <IoAddCircleOutline className="text-xl" /></button>
                )}
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
            <div className="bg-[#f4f4f4] rounded-md p-3">
                <Table
                    columns={columns}
                    dataSource={filteredData}
                    className="custom-table"
                />
            </div>
        </div>
    )
}
