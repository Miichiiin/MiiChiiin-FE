import { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Divider, Radio, Button, Select, Image, Input } from 'antd';
import { Link } from 'react-router-dom';

export const ServiceManagement = () => {
  const [data, setData] = useState([]); 
  const [selectionType, setSelectionType] = useState<'checkbox'>('checkbox');

  useEffect(() => {
    
    axios.get('http://localhost:3000/services_admin') 
      .then((response) => {
        setData(response.data); 
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const columns = [
    {
      title: 'Tên dịch vụ',
      dataIndex: 'name',
      key: 'name',
      render: (text:any, item:any) => (
        <Link to={`/admin/editservice/${item.key}`}>{text}</Link>
      ),
    },
    {
      title: 'Giá dịch vụ',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Hình ảnh',
      dataIndex: 'image',
      key: 'image',
      render: (text:any) => <Image src={text} width={80} />,
    },
    {
        title: 'Số lượng',
        dataIndex: 'quantity',
        key: 'quantity',
        
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Mô tả',
      dataIndex: 'description',
      key: 'description',
    },
  ];

  const rowSelection = {
    onChange: (selectedRowKeys:any, selectedRows:any) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <div className="text-lg font-semibold">Quản lý dịch vụ</div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Input.Search placeholder="Tìm kiếm" style={{ marginRight: '8px' }} />
          <Select
            showSearch
            style={{ width: 200 }}
            placeholder="Search to Select"
            optionFilterProp="children"
            filterOption={(input, option) => (option?.label ?? '').includes(input)}
            filterSort={(optionA, optionB) =>
              (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
            }
            options={[
              {
                value: '1',
                label: 'Not Identified',
              },
              {
                value: '2',
                label: 'Closed',
              },
              {
                value: '3',
                label: 'Communicated',
              },
              {
                value: '4',
                label: 'Identified',
              },
              {
                value: '5',
                label: 'Resolved',
              },
              {
                value: '6',
                label: 'Cancelled',
              },
            ]}
          />
        </div>
        <Button className="ml-2 px-2 py-2 bg-blue-500 text-white rounded-md">
          <Link to="/admin/addservice">Thêm dịch vụ</Link>
        </Button>
      </div>

      <Button type="primary" className="mx-5" danger>
        Xóa
      </Button>
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
        />
      </div>
    </div>
  );
};
