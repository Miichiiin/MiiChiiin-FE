
import { useGetRatingQuery, useRemoveRatingMutation } from '@/api/rates_admin';
import { Table, Divider, Radio, Button, Select, Input } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useState } from 'react';
import { Link } from 'react-router-dom';
const { Column } = Table;

export const CommentManagement = () => {
    const { data: commentData } = useGetRatingQuery({});
    const [removeComment] = useRemoveRatingMutation();
    const [searchText, setSearchText] = useState("");
    const [selectedRows, setSelectedRows] = useState<DataType[]>([]);
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
        status: string;
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
            render: (text: any, item: any) => {
                return (
                    <>
                        <Link to={`/admin/editcomment/${item.key}`}>{text}</Link>
                    </>
                )
            }
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
        },
        {
            title: 'Ngày cập nhật',
            dataIndex: 'updated_at',
            key: 'updated_at',
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
        },
    ];


    const rowSelection = {
        onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
    };
    const confirmDelete = (id: number) => {
        const isConfirmed = window.confirm('Bạn có chắc chắn muốn xóa comment này?');
        if (isConfirmed) {
            removeComment(id).unwrap().then(() => {
                setSelectedRows((prevSelectedRows) => prevSelectedRows.filter((row) => row.key !== id));
            });
        }
    };

    return (
        <div>
            <div className='flex justify-between items-center mb-4'>
                <div className="text-lg font-semibold">Quản lý Comment</div>
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
                                value: "0",
                                label: "Tất cả",
                            },
                            {
                                value: "1",
                                label: "Không hiển thị",
                            },
                            {
                                value: "2",
                                label: "Hiển thị",
                            },
                        ]}
                        onChange={(value) => {
                            if (value === "0") {
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
