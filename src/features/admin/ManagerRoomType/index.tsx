import {
  Table,
  Divider,
  Radio,
  Input,
  Select,
  Button,
  Popconfirm,
  message,
} from "antd";
import type { ColumnsType } from "antd/es/table";
import { useState } from "react";
import { Link } from "react-router-dom";

export const ManagerRoomType = () => {
  const [messageApi, contextHolder] = message.useMessage();
  interface DataType {
    key: string;
    name: string;
    description: string;
    capacity: string;
    convenient: string;
  }

  const columns: ColumnsType<DataType> = [
    {
      title: "#Stt",
      dataIndex: "key",
      key: "key",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Tên loại phòng",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Hình ảnh",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Sức chứa",
      dataIndex: "capacity",
      key: "capacity",
    },
    {
      title: "Tiện nghi",
      dataIndex: "convenient",
      key: "convenient",
    },
    
  ];

  const data: DataType[] = [
    {
      key: "1",
      name: "John Brown",
      description: "oke con de",
      capacity: "Oke con de",
      convenient: "New York No. 1 Lake Park",
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
    getCheckboxProps: (record: DataType) => ({
      disabled: record.name === "Disabled User", // Column configuration not to be checked
      name: record.name,
    }),
  };
  const [selectionType, setSelectionType] = useState<"checkbox">("checkbox");
  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "16px",
        }}
      >
        <div className="text-lg font-semibold">Quản Lý Loại Phòng</div>
        <div style={{ display: "flex", alignItems: "center" }}>
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
        <button className="ml-2 px-2 py-2 bg-blue-500 text-white rounded-md">
          <Link to={`/admin/addroomtype`}>Thêm loại phòng</Link>
        </button>
      </div>
      <div>
          <Popconfirm
            title="Xóa sản phẩm"
            description="Bạn có muốn xóa không??"
            onConfirm={() => {
              // removeProduct(id)
              //   .unwrap()
              //   .then(() => {
              //     messageApi.open({
              //       type: "success",
              //       content: "Xóa sản phẩm thành công",
              //     });
              //   });
            }}
            okText="Có"
            cancelText="Không"
          >
            <Button danger>Xóa</Button>
          </Popconfirm>
          <Button type="primary" danger className="ml-2 mt-1">
            <Link to={`/admin/updateroomtype`}>Sửa</Link>
          </Button>
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
          ...rowSelection,
        }}
        columns={columns}
        dataSource={data}
      />
    </div>
  );
};
