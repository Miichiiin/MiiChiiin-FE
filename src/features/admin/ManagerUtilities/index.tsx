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

export const ManagerUtilities = () => {
  const [messageApi, contextHolder] = message.useMessage();
  interface DataType {
    key: string;
    name: string;
    name_room: string;
    email: string;
    phone: number;
    date_comment: string;
    content: string;
    status: string;
  }

  const columns: ColumnsType<DataType> = [
    {
      title: "#Stt",
      dataIndex: "key",
      key: "key",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Tên khách hàng",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Tên Phòng",
      dataIndex: "name_room",
      key: "name_room",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Ngày comment",
      dataIndex: "date_comment",
      key: "date_comment",
    },
    {
      title: "Nội dung",
      dataIndex: "content",
      key: "content",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
    },
  ];

  const data: DataType[] = [
    {
      key: "1",
      name: "Viet Anh",
      name_room: "Phòng đôi",
      email: "va66221199@gmail.com",
      phone: 84346505992,
      date_comment: "12/3/2023",
      content: "abcxyz",
      status: "abcxyz",
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
        <div className="text-lg font-semibold">Quản Lý Utilities</div>
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
        <Button type="primary" className="ml-2 mt-1 bg-gray-500">
          <Link to={`/admin/addUtilities`}>Thêm</Link>
        </Button>
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
          <Link to={`/admin/updateUtilities`}>Sửa</Link>
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
