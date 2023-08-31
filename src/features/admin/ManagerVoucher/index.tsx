
import {Table,Divider,Radio,Input,Select,Button,Popconfirm,message,} from "antd";
  import type { ColumnsType } from "antd/es/table";
  import { useState } from "react";
  import { Link } from "react-router-dom";
  
  export const ManagerVouchers = () => {
    const [messageApi, contextHolder] = message.useMessage();
    interface DataType {
      id: string;
      name: string;
      slug:string;
      image:string;
      discount:number;
      start_at:string;
      expire_at:string;
      status:string;
      meta: string;
      description:string;
      quantity: number;
    }
  
    const columns: ColumnsType<DataType> = [
      {
        title: "#Stt",
        dataIndex: "id",
        key: "id",
        render: (text) => <a>{text}</a>,
      },
      {
        title: "Tên Voucher",
        dataIndex: "name",
        key: "name",
      },
      {
        title: "slug",
        dataIndex: "slug",
        key: "slug",
      },
      {
        title: "Hình ảnh",
        dataIndex: "image",
        key: "image",
      },
      {
        title: "Mô tả ngắn",
        dataIndex: "meta",
        key: "meta",
      },
      {
        title: "Mô tả dài",
        dataIndex: "description",
        key: "description",
      },
      {
        title: "Giá trị giảm",
        dataIndex: "discount",
        key: "discount",
      },
      {
        title: "Ngày bắt đầu",
        dataIndex: "start_at",
        key: "start_at",
      },
      {
        title: "Ngày kết thúc",
        dataIndex: "expire_at",
        key: "expire_at",
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
    
    ];
  
    const data: DataType[] = [
      {
        id: "1",
        name: "voucher Da Nang",
        slug:"Quiz.",
        image:"loi 404",
        discount:30,
        start_at:"24/8/2023",
        expire_at:"24/9/2023",
        status:"Van con",
        meta:"Oke con de",
        description:"Oke con de",
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
            <Button type="primary" danger className="mt-2 ml-1">
              <Link to={`/admin/updatevoucher`}>Sửa</Link>
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