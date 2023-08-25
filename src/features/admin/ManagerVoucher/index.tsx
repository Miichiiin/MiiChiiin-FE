import { nanoid } from "@reduxjs/toolkit";
import {Table,Divider,Radio,Input,Select,Button,Popconfirm,message,} from "antd";
  import type { ColumnsType } from "antd/es/table";
  import { useState } from "react";
  import { Link } from "react-router-dom";
  
  export const ManagerVouchers = () => {
    const [messageApi, contextHolder] = message.useMessage();
    interface DataType {
      key: string;
      name: string;
      img:string;
      code:string;
      type:string;
      discount:number;
      startday:string;
      endday:string;
      status:string;
      sortdesc: string;
      longdesc:string;
      quantity: number;
    }
  
    const columns: ColumnsType<DataType> = [
      {
        title: "#Stt",
        dataIndex: "key",
        key: "key",
        render: (text) => <a>{text}</a>,
      },
      {
        title: "Tên Voucher",
        dataIndex: "name",
        key: "name",
      },
      {
        title: "Hình ảnh",
        dataIndex: "img",
        key: "img",
      },
      {
        title: "Mô tả ngắn",
        dataIndex: "sortdesc",
        key: "sortdesc",
      },
      {
        title: "Loại voucher",
        dataIndex: "type",
        key: "type",
      },
      {
        title: "Mô tả dài",
        dataIndex: "longdesc",
        key: "longdesc",
      },
      {
        title: "Giá trị giảm",
        dataIndex: "discount",
        key: "discount",
      },
      {
        title: "Ngày bắt đầu",
        dataIndex: "startday",
        key: "startday",
      },
      {
        title: "Ngày kết thúc",
        dataIndex: "endday",
        key: "endday",
      },
      {
        title: "Số lượng",
        dataIndex: "quantity",
        key: "quantity",
      },
      {
        title: "Trạng thái",
        dataIndex: "status",
        key: "status",
      },
      {
        render: ({ key: id }: { key: number | string }) => (
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
            <Button type="primary" danger className="ml-2">
              <Link to={`/admin/updatevoucher`}>Sửa</Link>
            </Button>
          </div>
        ),
      },
    ];
  
    const data: DataType[] = [
      {
        key: "1",
        name: "voucher Da Nang",
        img:"loi 404",
        code:"DN123",
        type:"voucher",
        discount:30,
        startday:"24/8/2023",
        endday:"24/9/2023",
        status:"Van con",
        sortdesc:"Oke con de",
        longdesc:"Oke con de",
        quantity: 50
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
          <div className="text-lg font-semibold">Quản Lý Vouchers</div>
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
            <Link to={`/admin/addvoucher`}>Thêm Voucher</Link>
          </button>
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