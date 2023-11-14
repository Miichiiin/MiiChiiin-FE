import { useEffect, useState } from "react";
import { Button, Form, Input, Transfer, message, DatePicker } from "antd";
import { useForm } from "antd/es/form/Form";
import { TransferDirection } from "antd/es/transfer";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useGetVoucherQuery } from "@/api/admin/voucher";

interface RecordType {
  key: string;
  title: string;
  slug: string;
  chosen: boolean;
  guard_name: string;
}
const PhatVoucher = () => {

  const [targetKeys, setTargetKeys] = useState<string[]>([]);
  const [sourceData, setSourceData] = useState<RecordType[]>([]);
  const [form] = useForm();
  // const [addRole] = useAddRole1Mutation1();
  const {data:voucherData} = useGetVoucherQuery() 

  // Lưu danh sách các quyền đã chọn
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);
  useEffect(() => {
    if (voucherData) {
      // Tạo mảng sourceData từ perData
        const sourceDataArray: RecordType[] = voucherData.map((item: any) => ({
        key: item.id.toString(),
        title: item.name,
        guard_name: "admins",
        chosen: targetKeys.includes(item.id.toString()),
      }));
      // Cập nhật trạng thái sourceData
      setSourceData(sourceDataArray);
    }
  }, [voucherData, targetKeys]);

  // Hàm xử lý việc thêm quyền
  const handleAddPermissions = () => {
    const newTargetKeys = [...targetKeys, ...selectedPermissions];
    setTargetKeys(newTargetKeys);
    const updatedSourceData = sourceData.map((item) => ({
      ...item,
      chosen: newTargetKeys.includes(item.key),
    }));
    setSourceData(updatedSourceData);
    setSelectedPermissions([]); // Đặt lại danh sách các quyền đã chọn
  };

  const onFinish = (values: any) => {
    const numericTargetKeys = targetKeys.map(Number);
    values.guard_name = "admins";
    values.permissions = numericTargetKeys;
    // Gửi dữ liệu cập nhật lên máy chủ, bao gồm 'guard_name' và 'permissions'
    // addRole(values).unwrap().then(() => {
    //   console.log("values thêm:", values);
    //   navigate("/admin/indexPermission");
    //   message.success('Thêm chức vụ thành công!');
    // });
  };
  // search
  const handleSearch = (dir: TransferDirection, value: string) => {
    console.log("search:", dir, value);
  };
  return (
    <div className="">
      <div className="flex items-center justify-between text-lg font-semibold bg-yellow-500 text-white border rounded p-4 shadow-lg">
        <span>Phát Voucher</span>
        <Button className="ml-2 px-3 pb-3 bg-red-500 text-white rounded-md">
          <Link to={`/admin/managervouchers`} className="items-center flex">
            <ArrowLeftOutlined className="pr-2" /> Quay lại
          </Link>
        </Button>
      </div>
      <div className="mt-4">
    
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Form.Item
            label="Chọn Voucher "
            name="name"
            className=" text-2xl font-bold"
          >
            <DatePicker
          className=" justify-between"
          picker="month"
          onChange={(date: any, dateString: any) => console.log(dateString)}
        />
          </Form.Item>
          <Transfer
            dataSource={sourceData}
            targetKeys={targetKeys}
            onChange={setTargetKeys} // Sử dụng hàm setTargetKeys để cập nhật targetKeys
            render={(item) => item.title}
            oneWay={true}
            pagination
            showSearch
            onSearch={handleSearch}
            // Thêm một chức năng chọn để lưu danh sách quyền đã chọn
            onSelectChange={(selectedKeys) => {
              setSelectedPermissions(selectedKeys);
            }}
            listStyle={{
              width: "500px",
              height: "420px",
            }}
          />
          <br />
          <div className="flex space-x-[875px] items-center">
            
            <Button
              className="bg-gray-500 text-white"
              onClick={handleAddPermissions}
            >
              Phát Voucher
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default PhatVoucher;
