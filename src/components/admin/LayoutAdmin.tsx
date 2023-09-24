import React, { useState } from "react";
import { FileOutlined, TeamOutlined, UserOutlined } from "@ant-design/icons";
import { AiFillSignal, AiOutlineCreditCard } from "react-icons/ai";
import { BiSolidBed, BiHotel } from "react-icons/bi";
import type { MenuProps } from "antd";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import { HeaderAdmin } from "./Header";
import { Link, Outlet } from "react-router-dom";
import { BiCommentDetail } from "react-icons/bi";
import { MdMedicalServices } from "react-icons/md";
import { TbBrandBooking } from "react-icons/tb";
import { AiOutlineUser } from "react-icons/ai";
import { FaHotel } from "react-icons/fa";
const { Content, Footer, Sider } = Layout;
type MenuItem = Required<MenuProps>["items"][number];
function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

export const LayoutAdmin = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const users = [
    {
      token: "haha",
      admin: {
        id: 2,
        id_hotel: 1,
        name: "Augustus Mitchell",
        image: "https://via.placeholder.com/640x480.png/0055aa?text=enim",
        role: "",
        permissions: [
          'get banner',
          'add banner',
          'update banner',
          'get voucher',
          'add voucher',
          'get statisticshotels',
          'get manageroomtype',
          'get manageremployee',
          'get room',
          'get comfort',
          'get comment',
          'get service',
          'get booking',
          'get user',
          'get hotel',
          'get permission'
        ]
      },
    }
  ];

  // Lấy quyền hạn của người dùng hiện tại (lấy ví dụ từ người dùng đầu tiên trong danh sách)
  const currentUserPermissions = users.length > 0 ? users[0].admin.permissions : [];

  // Tạo menu dựa trên quyền hạn của người dùng
  const getMenuItems = () => {
    const menuItems = [];

    if (currentUserPermissions.includes('get statisticshotels')) {
      menuItems.push(
        getItem(
          <Link to={"statisticshotels"}>Thống kê theo chuỗi</Link>,
          "1",
          <AiFillSignal />
        )
      );
    }

    if (currentUserPermissions.includes('get manageroomtype')) {
      menuItems.push(
        getItem(
          <Link to={"manageroomtype"}>Quản Lý Loại Phòng</Link>,
          "2",
          <BiSolidBed />
        )
      );
    }

    if (currentUserPermissions.includes('get voucher')) {
      menuItems.push(
        getItem(
          <Link to={"managervouchers"}>Quản lý Vouchers</Link>,
          "3",
          <AiOutlineCreditCard />
        )
      );
    }

    if (currentUserPermissions.includes('get manageremployee')) {
      menuItems.push(
        getItem(
          <Link to={"manageremployee"}>Quản lý Nhân Viên</Link>,
          "4",
          <UserOutlined />
        )
      );
    }

    if (currentUserPermissions.includes('get room')) {
      menuItems.push(
        getItem(
          <Link to={"managerroom"}>Quản lý Phòng</Link>,
          "5",
          <BiHotel />
        )
      );
    }

    if (currentUserPermissions.includes('get comfort')) {
      menuItems.push(
        getItem(
          <Link to={"managerUtilities"}>Quản lý tiện ích</Link>,
          "6",
          <UserOutlined />
        )
      );
    }

    if (currentUserPermissions.includes('get comment')) {
      menuItems.push(
        getItem(
          <Link to={"commentmanagement"}>Quản lý comment</Link>,
          "7",
          <BiCommentDetail />
        )
      );
    }

    if (currentUserPermissions.includes('get service')) {
      menuItems.push(
        getItem(
          <Link to={"service"}>Quản lý dịch vụ</Link>,
          "8",
          <MdMedicalServices />
        )
      );
    }

    if (currentUserPermissions.includes('get booking')) {
      menuItems.push(
        getItem(
          <Link to={"bookingmanagement"}>Quản lý đặt phòng</Link>,
          "9",
          <TbBrandBooking />
        )
      );
    }

    if (currentUserPermissions.includes('get user')) {
      menuItems.push(
        getItem(
          <Link to={"usermanagement"}>Quản lý khách hàng</Link>,
          "10",
          <AiOutlineUser />
        )
      );
    }

    if (currentUserPermissions.includes('get hotel')) {
      menuItems.push(
        getItem(
          <Link to={"hotelmanagement"}>Quản lý khách sạn</Link>,
          "11",
          <FaHotel />
        )
      );
    }

    if (currentUserPermissions.includes('get permission')) {
      menuItems.push(
        getItem(
          <Link to={"indexPermission"}>Quản lý quyền</Link>,
          "12",
          <FaHotel />
        )
      );
    }

    return menuItems;
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className="flex flex-col items-center justify-center my-5 text-white">
          <Link to="admininfo" className="flex items-center">
            <img
              src="https://media.istockphoto.com/id/1256768065/vi/vec-to/logo-linh-v%E1%BA%ADt-esport-h%E1%BB%95-tr%E1%BA%AFng.jpg?s=612x612&w=is&k=20&c=_kzP2cuB-s76LYATE2I9RIGp_6vFeqs08PDQKa0EaoU="
              alt="Logo"
              className="rounded-full"
              width={100}
            />
          </Link>
        </div>
        <hr />
        <Menu
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={getMenuItems()}
          className="my-5"
        />
      </Sider>
      <Layout>
        <HeaderAdmin />
        <Content style={{ margin: "0 16px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>
              <Link to="/admin">Thống kê</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item></Breadcrumb.Item>
            <Breadcrumb.Item></Breadcrumb.Item>
          </Breadcrumb>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
            }}
          >
            <Outlet />
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Ant Design ©2023 Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};
