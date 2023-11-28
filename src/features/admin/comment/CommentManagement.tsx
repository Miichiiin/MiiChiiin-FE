
import { useGetRatingQuery } from '@/api/admin/rates_admin';
import { Table, Divider, Radio, Select, Input, Skeleton, Switch } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';
import 'dayjs/locale/vi';
import 'dayjs/plugin/utc';
import 'dayjs/plugin/timezone';
dayjs.locale('vi');
import { useState } from 'react';


export const CommentManagement = () => {
    const { data: commentData, isLoading, isError } = useGetRatingQuery({});
    const [searchText, setSearchText] = useState("");
    const [selectionType, setSelectionType] = useState<'checkbox'>('checkbox');
    const [selectedStatus, setSelectedStatus] = useState<string | undefined>(undefined);

    const data = commentData?.map(({ id, id_user, id_category, content, rating, status, deleted_at, created_at, updated_at, user_name, name_category }: DataType) => ({
        key: id,
        name_category,
        content,
        id_user,
        created_at,
        updated_at,
        user_name,
        status,
        rating,
        deleted_at,
        id_category,
    }));
    //lọc dữ liệu
    const filteredData = data ? data
        .filter((item: DataType) =>
            item.user_name.toLowerCase().includes(searchText.toLowerCase())
        )
        .filter((item: DataType) =>
            selectedStatus === undefined ? true : item.status === selectedStatus
        ) : [];
    interface DataType {
        key: number;
        id: string | number;
        id_user: string;
        id_category: string;
        content: string;
        rating: string;
        status: string | number;
        deleted_at: string;
        created_at: string;
        updated_at: string;
        user_name: string;
        name_category: string;
    }

    const columns: ColumnsType<DataType> = [
        {
            title: 'ID',
            dataIndex: 'key',
        },
        {
            title: 'Tên người dùng',
            dataIndex: 'user_name',
            key: 'user_name',
        },
        {
            title: 'Tên loại phòng',
            dataIndex: 'name_category',
            key: 'name_category',
        },
        {
            title: 'Nội dung',
            dataIndex: 'content',
            key: 'content',
        },
        {
            title: 'Đánh giá',
            dataIndex: 'rating',
            key: 'rating',
        },
        {
            title: 'Ngày đánh giá',
            dataIndex: 'created_at',
            key: 'created_at',
            render: (_, record) => {
                const formattedDate = dayjs(record.created_at)
                    .format('DD/MM/YYYY HH:mm:ss')
                return <span>{formattedDate}</span>;
            },
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            render: (_, record) => {
                return <Switch className="bg-gray-500" checkedChildren="Hoạt động" unCheckedChildren="Đang chờ" defaultChecked={record.status === 2} />
            }
        },
    ];

    if (isLoading) {
        return <Skeleton active />;
    }
    if (isError) {
        return <div>Có lỗi xảy ra khi tải dữ liệu</div>;
    }

    return (
        <div>
            <div className='flex justify-between items-center mb-4'>
                <div className="text-lg font-bold text-orange-500">Quản lý Comment</div>
                <div className='flex items-center'>
                    <Input.Search placeholder="Tìm kiếm" className="mr-4" allowClear onSearch={(value) => setSearchText(value)} />
                    <Select
                        showSearch
                        style={{ width: 200 }}
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
                                label: "Đã ẩn",
                            },
                            {
                                value: 2,
                                label: "Xác nhận",
                            },
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
