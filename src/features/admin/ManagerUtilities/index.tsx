import { useGetComfortQuery, useRemoveComfortMutation } from "@/api/comfort";
import {
  Table,
  Divider,
  Radio,
  Input,
  Select,
  Button,
  Popconfirm,
  message,
  Image,
} from "antd";
import type { ColumnsType } from "antd/es/table";
import { useState } from "react";
import { Link } from "react-router-dom";

export const ManagerUtilities = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const { data: Ultilities } = useGetComfortQuery({});
  const [removeUltil] = useRemoveComfortMutation();
  interface DataType {
    key: number;
    id: string | number;
    name: string;
    description: string;
    deleted_at: string;
    created_at: string;
    updated_at: string;
    status: string;
    alt: string;
  }

  const data = Ultilities?.map(({ id, name, description, deleted_at, created_at, updated_at, status, alt }: DataType) => ({
    key: id,
    name,
    description,
    deleted_at,
    created_at,
    updated_at,
    status,
    alt
  }))

  const columns: ColumnsType<DataType> = [
    {
      title: "#",
      dataIndex: "key",
    },
    {
      title: "Tên tiện ích",
      dataIndex: "name",
      key: "name",
      render: (text, item) => <Link to={`/admin/updateUtilities/${item.key}`}>{text}</Link>
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Ngày tạo",
      dataIndex: "created_at",
      key: "created_at",
    },
    {
      title: "Ngày cập nhật",
      dataIndex: "updated_at",
      key: "updated_at",
    },
    {
      title: "Ngày xóa",
      dataIndex: "deleted_at",
      key: "deleted_at",
    },
    {
      title: "Trang thái",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Icon",
      dataIndex: "alt",
      key: "alt",
      render: (text) => <Image src={text} alt="" width="50px" height="50px" />
    },
  ];

  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows
      );
    },
  };
  const [selectedRows, setSelectedRows] = useState<DataType[]>([]);
  const [selectionType, setSelectionType] = useState<'checkbox'>('checkbox');

  const confirmDelete = (id: number) => {
    const isConfirmed = window.confirm('Bạn có chắc chắn muốn xóa tiện ích này?');
    if (isConfirmed) {
      removeUltil(id).unwrap().then(() => {
        setSelectedRows((prevSelectedRows) => prevSelectedRows.filter((row) => row.key !== id));
      });
    }
  };
  return (
    <div>
      <div
        className='flex justify-between items-center mb-4'
      >
        <div className="text-lg font-semibold">Quản Lý Utilities</div>
        <div className="flex items-center">
          <Input.Search placeholder="Tìm kiếm" style={{ marginRight: "8px" }} />
          <Select
            showSearch
            style={{ width: 200 }}
            placeholder="Search to Select"
            optionFilterProp="children"
            filterOption={(input, option) =>
              (option?.label ?? "").includes(input)
            }
            filterSort={(optionA, optionB) =>
              (optionA?.label ?? "")
                .toLowerCase()
                .localeCompare((optionB?.label ?? "").toLowerCase())
            }
            options={[
              {
                value: "1",
                label: "Not Identified",
              },
              {
                value: "2",
                label: "Closed",
              },
              {
                value: "3",
                label: "Communicated",
              },
              {
                value: "4",
                label: "Identified",
              },
              {
                value: "5",
                label: "Resolved",
              },
              {
                value: "6",
                label: "Cancelled",
              },
            ]}
          />
        </div>
        <Button type="primary" className="ml-2 mt-1 bg-gray-500">
          <Link to={`/admin/addUtilities`}>Thêm</Link>
        </Button>
      </div>
      <div>
        <Button type="primary" className='' danger
          onClick={() => {
            selectedRows.forEach((row) => confirmDelete(row.key));
          }}
          disabled={selectedRows.length === 0}
        >Xóa</Button>
      </div>

      <Radio.Group
        onChange={({ target: { value } }) => {
          setSelectionType(value);
        }}
        value={selectionType}
      ></Radio.Group>

      <Divider />
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
        dataSource={data}
      />
    </div>
  );
};
