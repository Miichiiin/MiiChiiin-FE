import { nanoid } from "@reduxjs/toolkit";
import {Table,Divider,Radio,Input,Select,Button,Popconfirm,message,} from "antd";
  import type { ColumnsType } from "antd/es/table";
  import { useState } from "react";
  import { Link } from "react-router-dom";
  
  export const ManagerEmployee = () => {
    const [messageApi, contextHolder] = message.useMessage();
    interface DataType {
      key: string;
      name: string;
      img:string;
      national:string;
      position:string;
      id_card:number;
      gender:string;
      date_of_birth:string;
      address: string;
      email:string;
      phone: number;

    }
  
    const columns: ColumnsType<DataType> = [
      {
        title: "#Stt",
        dataIndex: "key",
        key: "key",
        render: (text) => <a>{text}</a>,
      },
      {
        title: "Tên nhân viên",
        dataIndex: "name",
        key: "name",
      },
      {
        title: "Hình ảnh",
        dataIndex: "img",
        key: "img",
      },
      {
        title: "Căn cước",
        dataIndex: "id_card",
        key: "id_card",
      },
      {
        title: "Quốc tịch",
        dataIndex: "national",
        key: "national",
      },
      {
        title: "Giới tính",
        dataIndex: "gender",
        key: "gender",
      },
      {
        title: "Ngày sinh",
        dataIndex: "date_of_birth",
        key: "date_of_birth",
      },
      {
        title: "Chức vụ",
        dataIndex: "position",
        key: "position",
      },
      {
        title: "Địa chỉ",
        dataIndex: "address",
        key: "address",
      },
      {
        title: "Sđt",
        dataIndex: "phone",
        key: "phone",
      },
      {
        title: "Email",
        dataIndex: "email",
        key: "email",
      },
    ];
  
    const data: DataType[] = [
      {
        key: "1",
        name: "Nguyen Viet Anh",
        img:"404",
        national:"Viet Nam",
        position:"Nhan vien",
        id_card:123456,
        gender:"Nam",
        date_of_birth:"01/09/2003",
        address: "Dan Nang",
        email:"va6622@gmail.com",
        phone:+84346505993,
      
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
          <div className="text-lg font-semibold">Quản Lý Nhân Viên</div>
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
            <Link to={`/admin/addemployee`}>Thêm Nhân Viên</Link>
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
            <Button type="primary" danger className="mt-1 ml-1">
              <Link to={`/admin/updateemployee`}>Sửa</Link>
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