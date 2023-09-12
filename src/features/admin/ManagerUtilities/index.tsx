import { useGetComfortQuery, useRemoveComfortMutation } from "@/api/admin/comfort_admin";
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

  const [selectedStatus, setSelectedStatus] = useState<string | undefined>(undefined);
  const [searchText, setSearchText] = useState("");
  const [selectedRows, setSelectedRows] = useState<DataType[]>([]);
  const [selectionType, setSelectionType] = useState<'checkbox'>('checkbox');
  const { data: Ultilities } = useGetComfortQuery({});
  const [removeUtility] = useRemoveComfortMutation();

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
  //lấy dữ liệu từ api
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

  //lọc dữ liệu 
  const filteredData = data ? data
    .filter((item: DataType) =>
      item.name.toLowerCase().includes(searchText.toLowerCase())
    )
    .filter((item: DataType) =>
      selectedStatus === undefined ? true : item.status === selectedStatus
    ) : [];


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

  // Alert xác nhận xoá
  const confirmDelete = (id: number) => {
    const isConfirmed = window.confirm('Bạn có chắc chắn muốn xóa comment này?');
    if (isConfirmed) {
      removeUtility(id).unwrap().then(() => {
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
          {/*phần tìm kiếm và lọc */}
          <Input.Search placeholder="Tìm kiếm" className="mr-4" allowClear onSearch={(value) => setSearchText(value)} />
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
                value: "0",
                label: "Tất cả",
              },
              {
                value: "1",
                label: "Đang sử dụng",
              },
              {
                value: "2",
                label: "Có sẵn",
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
          {/*Nút Thêm */}
        </div>
        <Button type="primary" className="ml-2 mt-1 bg-gray-500">
          <Link to={`/admin/addUtilities`}>Thêm</Link>
        </Button>
      </div>
      {/*Nút Xoá */}
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
          selectedRowKeys: selectedRows.map((row) => row.key),
          onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
            setSelectedRows(selectedRows);
          },
        }}
        columns={columns}
        dataSource={filteredData}
      />
    </div>
  );
};
