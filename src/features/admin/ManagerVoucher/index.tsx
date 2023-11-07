
import { useGetVoucherQuery, useRemoveVoucherMutation } from "@/api/admin/voucher";
import { Table, Divider, Radio, Input, Select, Button, Popconfirm, message, Skeleton, } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useState } from "react";
import { Link } from "react-router-dom";

interface DataType {
  key: number;
  id: string;
  name: string;
  slug: string;
  image: string;
  discount: number;
  start_at: string;
  expire_at: string;
  status: string | number;
  meta: string;
  description: string;
  quantity: number;
}
export const ManagerVouchers = () => {
  const [remove, {isLoading:isRemoveVoucher}] = useRemoveVoucherMutation()
  const {data:dataVoucher, isLoading:Loading, isError} = useGetVoucherQuery();
  const dataSource = dataVoucher?.map(({id,name,image,discount,start_at,expire_at,description,quantity,status}: DataType) => ({
    key:id,
    name,image,discount,start_at,expire_at,description,quantity,status
  }))
// xóa 
const confirmDelete = (id: number) => {
  const isConfirmed = window.confirm('Bạn có chắc chắn muốn xóa khách sạn này?');
  if (isConfirmed) {
    remove(id).unwrap().then(() => {
      setSelectedRows((prevSelectedRows) => prevSelectedRows.filter((row) => row.key !== id));
    });
  }
};
 // phân quyền
 const dataPermission = localStorage.getItem('userAdmin')
 const currentUserPermissions = (dataPermission && JSON.parse(dataPermission).permissions) || [];  
 const hasAddUserPermission = (permissions:any) => {
   return currentUserPermissions.includes(permissions);
 };


  const columns: ColumnsType<DataType> = [
    {
      title: "#Stt",
      dataIndex: "key",
      key: "key",
      // render: (_, record, index) => <span>{index + 1}</span>,
    },
    {
      title: "Tên Voucher",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Hình ảnh",
      dataIndex: "image",
      key: "image",
      render: (image) => <img src={image} alt="Hình ảnh" width="70" />,
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
      render: (_, record) => {
        let statusText = '';
        if (record.status === 2) {
            statusText = 'Hoạt động';
        } else if (record.status === 1) {
            statusText = 'Đã ẩn';
        } else if (record.status === 0) {
            statusText = 'Đang chờ';
        }

        return <span>{statusText}</span>;
    },
      
    },
    {
      title: "Thao tác",
      dataIndex: "action",
      key: "action",
      render: (_, item) => (
        <div className="flex space-x-2">
          {hasAddUserPermission("delete voucher") && (
            <Button loading={isRemoveVoucher}
              className='px-4 py-1 bg-red-600 hover:bg-red-700 text-white rounded-md'
              onClick={() => confirmDelete(item.key)}
            >
              Xóa
            </Button>
          )}
          {hasAddUserPermission("update voucher") && (
            <Button type="primary" className='bg-[#3b82f6]'>
              <Link to={`/admin/updatevoucher/${item.key}`}>Sửa</Link>
            </Button>
          )}
        </div >
      ),
    },
  ];


  const [searchText, setSearchText] = useState("");
  const [selectedRows, setSelectedRows] = useState<DataType[]>([]);
  const [selectionType, setSelectionType] = useState<'checkbox'>('checkbox');
  const [selectedStatus, setSelectedStatus] = useState<string | undefined>(undefined);
  const filteredData = dataSource ? dataSource
    .filter((item: DataType) =>
      item.name.toLowerCase().includes(searchText.toLowerCase())
    )
    .filter((item: DataType) =>
      selectedStatus === undefined ? true : item.status === selectedStatus
    ) : [];
  if (Loading) return <Skeleton active/>;
  if (isError) return <div>error...</div>;
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
                value: "all",
                label: "Tất cả",
              },
              {
                value: 1,
                label: "Đã ẩn",
              },
              {
                value: 2,
                label: "Hoạt động",
              },
              {
                value: 0,
                label: "Đang chờ",
              },
            ]}
            onChange={(value) => {
              if (value === "all") {
                setSelectedStatus(undefined); // Xóa bộ lọc
              } else {
                setSelectedStatus(value); // Sử dụng giá trị trạng thái đã chọn
              }
            }}
          />
        </div>
        {hasAddUserPermission('add voucher') && (
            <button className="ml-2 px-2 py-2 bg-blue-500 text-white rounded-md">
            <Link to={`/admin/addvoucher`}>Thêm Voucher</Link>
          </button>
        )}
      </div>
      <Radio.Group
        onChange={({ target: { value } }) => {
          setSelectionType(value);
        }}
        value={selectionType}
      ></Radio.Group>

      <Divider />
      <Table
        columns={columns}
        dataSource={filteredData}
      />
    </div>
  );
};