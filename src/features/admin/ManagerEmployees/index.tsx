
import { useGetAdmin_AdminQuery, useRemoveAdmin_AdminMutation } from "@/api/admin/admin_admin";
import { Table, Divider, Radio, Input, Select, Button } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useState } from "react";
import { Link } from "react-router-dom";

export const ManagerEmployee = () => {
  const { data: emploData } = useGetAdmin_AdminQuery({})
  const [removeEployee] = useRemoveAdmin_AdminMutation()
  const dataSource = emploData?.map(({ id, name, id_role, email, password, image, description, gender, date, address, status, phone }: DataType) => ({
    key: id,
    id_role,
    name,
    email,
    password,
    image,
    description,
    gender,
    date,
    address,
    status,
    phone
  }))

  interface DataType {
    key: number;
    id: string | number;
    id_role: number;
    name: string;
    email: string;
    password: number | string;
    image: string;
    description: string;
    // national:string;
    // position:string;
    gender: string;
    date: string;
    address: string;
    phone: number;
    status: number | string;
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
      render: (text: any, item: any) => {
        return (
          <>
            <Link to={`/admin/updateemployee/${item.key}`}>{text}</Link>
          </>
        )
      }
    },
    {
      title: "Hình ảnh",
      dataIndex: "image",
      key: "image",
      render: (image) => <img src={image} alt="Hình ảnh" width="100" />,
    },

    {
      title: "Giới tính",
      dataIndex: "gender",
      key: "gender",
    },
    {
      title: "Ngày sinh",
      dataIndex: "date",
      key: "date",
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

  const confirmDelete = (id: number) => {
    const isConfirmed = window.confirm('Bạn có chắc chắn muốn xóa khách sạn này?');
    if (isConfirmed) {
      removeEployee(id).unwrap().then(() => {
        setSelectedRows((prevSelectedRows) => prevSelectedRows.filter((row) => row.key !== id));
      });
    }
  };
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
                value: "0",
                label: "Tất cả",
              },
              {
                value: "1",
                label: "Không hiển thị",
              },
              {
                value: "2",
                label: "Hiển thị",
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
        </div>
        <button className="ml-2 px-2 py-2 bg-blue-500 text-white rounded-md">
          <Link to={`/admin/addemployee`}>Thêm Nhân Viên</Link>
        </button>
      </div>
      <div>

        <Button type="primary" className='mx-5' danger
          onClick={() => {
            selectedRows.forEach((row) => confirmDelete(row.key));
          }}
          disabled={selectedRows.length === 0}
        >Xóa</Button>

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
          selectedRowKeys: selectedRows.map((row) => row.key), // Thêm dòng này
          onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
            setSelectedRows(selectedRows);
          },
        }}
        columns={columns}
        dataSource={filteredData}
        scroll={{ x: 1500 }}
      />
    </div>
  );
};