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
  
  export const ManagerRoom = () => {
    const [messageApi, contextHolder] = message.useMessage();
    interface DataType {
      key: string;
      name: string;
      room_type:string;
      status: string;
      capacity: string;
      price:number;
      price_dropped:number;
      convenient: string;
      sortdesc: string;
      longdesc:string;
      img:string;
    }
  
    const columns: ColumnsType<DataType> = [
      {
        title: "#Stt",
        dataIndex: "key",
        key: "key",
        render: (text) => <a>{text}</a>,
      },
      {
        title: "Tên phòng",
        dataIndex: "name",
        key: "name",
      },
      {
        title: "Tên loại phòng",
        dataIndex: "room_type",
        key: "room_type",
      },
      {
        title: "Trang thái",
        dataIndex: "status",
        key: "status",
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
      {
        title: "Giá gốc",
        dataIndex: "price",
        key: "price",
      },
      {
        title: "Giá đã giảm",
        dataIndex: "price_dropped",
        key: "price_dropped",
      },
      {
        title: "Mô tả ngắn",
        dataIndex: "sortdesc",
        key: "sortdesc",
      },
      {
        title: "Mô tả dài",
        dataIndex: "longdesc",
        key: "longdesc",
      },
      {
        title: "Ngày tạo",
        dataIndex: "date_created",
        key: "date_created",
      },
      
    ];
  
    const data: DataType[] = [
      {
        key: "1",
        name: "301",
        room_type:"Phòng đôi",
        status:"Còn phong",
        capacity:"2 người",
        price:300,
        price_dropped:199,
        convenient: "Bể bơi, Buffet sáng",
        sortdesc: "view biển",
        longdesc:"Có ghế tình yêu",
        img:"404",
      },
    ];
  
    const [searchText, setSearchText] = useState("");
  const [selectedRows, setSelectedRows] = useState<DataType[]>([]);
  const [selectionType, setSelectionType] = useState<'checkbox'>('checkbox');
  const [selectedStatus, setSelectedStatus] = useState<string | undefined>(undefined);
  const filteredData = data ? data
    .filter((item: DataType) =>
      item.name.toLowerCase().includes(searchText.toLowerCase())
    )
    .filter((item: DataType) =>
      selectedStatus === undefined ? true : item.status === selectedStatus
    ) : [];

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
          <div className="text-lg font-semibold">Quản Lý Phòng</div>
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
            <Link to={`/admin/addroom`}>Thêm phòng</Link>
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
              <Link to={`/admin/updateroom`}>Sửa</Link>
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
        />
      </div>
    );
  };
  