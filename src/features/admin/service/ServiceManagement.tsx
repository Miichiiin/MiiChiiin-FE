
import { useGetServices_AdminQuery } from "@/api/admin/service_admin";
import {
  Table,
  Divider,
  Radio,
  Button,
  Select,
  Input,
  Image,
  Popconfirm,
  Pagination,
} from "antd";
import type { ColumnsType } from "antd/es/table";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export const ServiceManagement = () => {
  const { data: visibleItems } = useGetServices_AdminQuery();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(5);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  interface DataType {
    key: string;
    name: string;
    quantity: number;
    price: number;
    status: string;
    image: string;
    description: string; // Thêm description vào DataType
  }

  const columns: ColumnsType<DataType> = [
    {
      title: "Stt",
      dataIndex: "id",
      key: "id", // Đổi từ 'id' thành 'key'
    },
    {
      title: "Tên dịch vụ",
      dataIndex: "name",
      key: "name",
      render: (text: any, item: any) => (
        <Link to={`/admin/updateservice/${item.id}`}>{text}</Link>
      ),
    },
    {
      title: "Giá dịch vụ",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Hình ảnh",
      dataIndex: "image",
      key: "image",
      render: (text: any) => <Image src={text} width={80} />,
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
      title: "Mô tả",
      dataIndex: "description",
      key: "description",
    },
  ];

  const [data, setData] = useState<DataType[]>([]);

  useEffect(() => {
    if (visibleItems) {
      const formattedData: DataType[] = visibleItems.map((item: any) => ({
        key: item.id,
        name: item.name,
        price: item.price,
        image: item.image,
        quantity: item.quantity,
        status: item.status,
        description: item.description,
      }));
      setData(formattedData);
    }
  }, [visibleItems]);

  useEffect(() => {
    if (visibleItems) {
      const startIndex = (currentPage - 1) * pageSize;
      const endIndex = startIndex + pageSize;

      const currentData = visibleItems.slice(startIndex, endIndex);

      setData(currentData);
    }
  }, [visibleItems, currentPage, pageSize]);

  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows
      );
    },
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
        <div className="text-lg font-semibold">Quản Lý Dịch Vụ</div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <Input.Search
            placeholder="Tìm kiếm"
            style={{ marginRight: "8px" }}
          />
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
          <Link to={`/admin/addservice`}>Thêm Dịch Vụ</Link>
        </button>
      </div>
      <div>
        <Popconfirm
          title="Xóa sản phẩm"
          description="Bạn có muốn xóa không??"
          onConfirm={() => {
            // Xử lý xóa sản phẩm ở đây
          }}
          okText="Có"
          cancelText="Không"
        >
          <Button danger>Xóa</Button>
        </Popconfirm>
      </div>
      <Radio.Group
        onChange={({ target: { value } }) => {
          setSelectionType(value);
        }}
        value={selectionType}
      ></Radio.Group>

      <Divider />
      <div className="table-container">
        <Table
          rowSelection={{
            type: selectionType,
            ...rowSelection,
          }}
          columns={columns}
          dataSource={data}
          className="custom-table"
          pagination={false} // Tắt phân trang mặc định của Table
        />
        <Pagination
          current={currentPage}
          total={visibleItems?.length || 0} 
          pageSize={pageSize}
          onChange={handlePageChange}
          showSizeChanger={false} 
          style={{ textAlign: "right", marginTop:"30px" }} 
        />
      </div>
    </div>
  );
};
