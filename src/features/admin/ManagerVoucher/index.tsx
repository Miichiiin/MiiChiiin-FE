
import { useGetVoucherQuery, useRemoveVoucherMutation } from "@/api/voucher";
import {Table,Divider,Radio,Input,Select,Button,Popconfirm,message,Pagination} from "antd";
  import type { ColumnsType } from "antd/es/table";
  import { useState } from "react";
  import { Link } from "react-router-dom";
  
  export const ManagerVouchers = () => {
    const [removeVoucher] = useRemoveVoucherMutation()
    const {data:voucherData} = useGetVoucherQuery({})

    const data = voucherData?.map(({id,name,slug,image,discount,start_at,expire_at,status,meta,description,quantity,created_at,updated_at} :DataType) =>({
      key:id,
      name:name,
      slug:slug,
      image:image,
      discount:discount,
      start_at:start_at,
      expire_at:expire_at,
      status:status,
      meta:meta,
      description:description,
      quantity:quantity,
      created_at:created_at,
      updated_at:updated_at
    }))
    const [messageApi, contextHolder] = message.useMessage();
    interface DataType {
      key:number,
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
      created_at:string;
      updated_at:string;
    }
  
    const columns: ColumnsType<DataType> = [
      {
        title: "#Stt",
        dataIndex: "key",
        key: "id",
        render: (_, record, index) => <span>{index + 1}</span>,
      },
      {
        title: "Tên Voucher",
        dataIndex: "name",
        key: "name",
        render: (text:any,item:any) =>{
          return (
              <>
                <Link to={`/admin/updatevoucher/${item.key}`}>{text}</Link>
              </>
            )
          }
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
        render: (image) => <img src={image} alt="Hình ảnh" width="100" />,
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
      {
        title: "created_at",
        dataIndex: "created_at",
        key: "created_at",
      },
      {
        title: "updated_at",
        dataIndex: "updated_at",
        key: "updated_at",
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
    const [selectedRows, setSelectedRows] = useState<DataType[]>([]);
    const [addressFilter, setAddressFilter] = useState<string | undefined>(undefined);

    const confirmDelete = (id: number) => {
      const isConfirmed = window.confirm('Bạn có chắc chắn muốn xóa khách sạn này?');
      if (isConfirmed) {
          removeVoucher(id).unwrap().then(() => {
              setSelectedRows((prevSelectedRows) => prevSelectedRows.filter((row) => row.key !== id));
          });
      }
  };
  const handleAddressFilterChange = (value: string) => {
    setAddressFilter(value);
};
  const filteredData = addressFilter ? data.filter((item: any) => item.name_cities.includes(addressFilter)) : data;
    console.log(filteredData);
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
              onChange={handleAddressFilterChange}
              value={addressFilter}
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
          
         <Button type="primary" className='mx-5' danger
                onClick={() => {
                    selectedRows.forEach((row) => confirmDelete(row.key));
                }}
                disabled={selectedRows.length === 0}
            >Xóa</Button>
            <Button type="primary" danger className="mt-2 ml-1">
              <Link to={`/admin/updatevoucher}`}>Sửa</Link>
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
            selectedRowKeys: selectedRows.map((row) => row.key), // Thêm dòng này
            onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
              console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
              setSelectedRows(selectedRows);
          },
          }}
          columns={columns}
          dataSource={data}
          scroll={{ x: 2000 }}
        />
        
      </div>
    );
  };