import React, { useState } from "react";
import { UserOutlined } from "@ant-design/icons";
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
  const userAdminLocal = localStorage.getItem('userAdmin')
  const idLC = userAdminLocal ? JSON.parse(userAdminLocal)?.id : null;
  console.log("user",userAdminLocal);
  let imageLC = ""
 if(userAdminLocal) {
  const data = JSON.parse(userAdminLocal);
  imageLC = data.image; 
  // id = data.id,
 }

  // Lấy quyền hạn của người dùng hiện tại (lấy ví dụ từ người dùng đầu tiên trong danh sách)
  const currentUserPermissions = (userAdminLocal && JSON.parse(userAdminLocal).permissions) || [];
  
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

    if (currentUserPermissions.includes('get category')) {
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

    if (currentUserPermissions.includes('get admin')) {
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

    if (currentUserPermissions.includes('get rate')) {
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
          <Link to={`admininfo/${idLC}`} className="flex items-center">
            <img
              src={imageLC}
              alt="Logo"
              className="rounded-full w-[100px] h-[100px]"
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
