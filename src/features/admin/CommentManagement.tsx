import { Table, Divider, Radio, Button, Select } from 'antd';
import Search from 'antd/es/input/Search';
import type { ColumnsType } from 'antd/es/table';
import { useState } from 'react';
import { Link } from 'react-router-dom';


export const CommentManagement = () => {
    interface DataType {
        key: string;
        room_name: string,
        name: string;
        content: string;
        email: string;
        date_comment: string;
        status: string,
    }

    const columns: ColumnsType<DataType> = [
        {
            title: 'Tên phòng',
            dataIndex: 'room_name',
            key: 'room_name',
            render: (text: any, item: any) => {
                return (
                    <>
                        <Link to={`/admin/editcomment/`}>{text}</Link>
                    </>
                )
            }
        },
        {
            title: 'Tên khách hàng',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Nội dung',
            dataIndex: 'content',
            key: 'content',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Ngày comment',
            dataIndex: 'date_comment',
            key: 'date_comment',
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
        },
    ];

    const data: DataType[] = [
        {
            key: '1',
            room_name: 'Phòng tình yêu',
            name: "John Brown",
            content: 'New York No. 1 Lake Park',
            email: "dsasgmail.com",
            date_comment: "15/08/2023",
            status: "đã duyệt"
        },
        {
            key: '3',
            room_name: 'Phòng tình yêu',
            name: "John Brown",
            content: 'New York No. 1 Lake Park',
            email: "dsasgmail.com",
            date_comment: "15/08/2023",
            status: "đã duyệt"
        },

    ];

    const rowSelection = {
        onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
        getCheckboxProps: (record: DataType) => ({
            disabled: record.name === 'Disabled User', // Column configuration not to be checked
            name: record.name,
        }),
    };
    const [selectionType, setSelectionType] = useState<'checkbox'>('checkbox');
    const onSearch = (value: string) => console.log(value);
    return (
        <div>
            <div className="flex justify-between items-center my-5 mx-3">
                <h2 className="text-2xl text-blue-700">Quản lý comment</h2>
                <Button className="bg-blue-400 text-white hover:bg-blue-700">
                    <Link to={'add_management'}>Thêm Comment</Link>
                </Button>
            </div>

            <div className="flex justify-between items-center my-5 mx-3">

                <Select
                    className='mr-[300px]'
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

                <Search
                    placeholder="Input search text"
                    onSearch={onSearch}
                    enterButton width={'35px'}

                />
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
