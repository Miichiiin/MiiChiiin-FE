
import { useGetVoucherQuery, useRemoveVoucherMutation } from "@/api/admin/voucher";
import { Table, Divider, Radio, Input, Select, Button, Popconfirm, message, Skeleton, } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

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
  const navigate = useNavigate()

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
        <div className="flex">
          {hasAddUserPermission("update voucher") && (
            <button className='mr-2 px-3 py-2 hover:bg-cyan-600 bg-cyan-500 text-white rounded-md' onClick={()=>navigate(`/admin/updatevoucher/${item.key}`)}>
              Sửa
            </button>
          )}
          {hasAddUserPermission("delete voucher") && (
            <Popconfirm
            title="Xóa Khách sạn"
            description="Bạn có muốn xóa không??"
            onConfirm={() => {
              remove(item.key).unwrap().then(() => {
                message.success("Xóa thành công");
              })
            }}
            okText="Có"
            cancelText="Không"
          >
            <button 
              className='mr-2 px-3 py-2 hover:bg-red-600 bg-red-500 text-white rounded-md'
            >
              Xóa
            </button>
          </Popconfirm>
            
          )}
          
        </div >
      ),
    },
  ];


  const [searchText, setSearchText] = useState("");
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
  if(isRemoveVoucher) return message.loading({content:'Đang xóa', key:'removeVoucher'});
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
        <div className="text-lg font-bold text-orange-500">Quản Lý Vouchers</div>
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
        <Button
            type="primary"
            style={{ background: "#FFD700", borderColor: "#FFD700", marginLeft: "350px" }}
          >
            <Link to={`/admin/phatvoucher`}>Phát Voucher</Link>
          </Button>
        {hasAddUserPermission('add voucher') && (
            <button className="ml-2 px-2 py-2 hover:bg-blue-600 bg-blue-500 text-white rounded-md" onClick={()=>navigate(`/admin/addvoucher`)}>
            Thêm Voucher
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