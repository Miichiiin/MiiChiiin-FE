import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
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
  const location = useLocation();
  const navigate = useNavigate()
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const userAdminLocal = localStorage.getItem('userAdmin')
  let imageLC = ""
  if (userAdminLocal) {
    const data = JSON.parse(userAdminLocal);
    imageLC = data.image;
  }

  // Lấy quyền hạn của người dùng hiện tại (lấy ví dụ từ người dùng đầu tiên trong danh sách)
  const currentUserPermissions = (userAdminLocal && JSON.parse(userAdminLocal).permissions) || [];
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

  const getCurrentBreadcrumb = () => {
    // Tách đoạn đường dẫn thành các phần từ, loại bỏ các phần tử rỗng (có thể xuất hiện do các dấu '/' liên tiếp)
    const pathSnippets = location.pathname.split('/').filter((i) => i);
    const menuItems = getMenuItems();
    // Tạo mảng Breadcrumb bằng cách duyệt qua từng đoạn đường dẫn
    return pathSnippets.map((path, index) => {
      // tạo url
      const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
      // Tìm mục trong menu có đường dẫn trùng với URL đã tạo
      const menuItem = menuItems.find((item:any) => item.path === url);
      // Định dạng lại đoạn đường dẫn: nếu là đoạn đầu tiên, viết hoa chữ cái đầu và chuyển phần còn lại thành chữ thường
      const formattedPath =
        index === 0 ? path.charAt(0).toUpperCase() + path.slice(1).toLowerCase() : path;
      return (
        <Breadcrumb.Item key={url}>
          {menuItem ? <Link to={url}>{formattedPath}</Link> : <span>{formattedPath}</span>}
        </Breadcrumb.Item>
      );
    });
  };
  
  useEffect(() => {
    if (!localStorage.getItem('tokenAdmin'))
      navigate('/error/401')
  }, [])

  const getLogoContent = () => {
    if (collapsed) {
      return (
        <div className="text-center my-8 flex justify-center items-center cursor-pointer" onClick={()=>navigate("/admin")}>
          <img
            src={
              'https://res.cloudinary.com/dzqywzres/image/upload/v1700062478/u7kzl2ufmmbe66o9kivw.png'
            }
            alt="Logo"
            className="w-full"
          />
        </div>
      );
    } else {
      return (
        <>
          <div className="flex items-center justify-center my-3 cursor-pointer" onClick={()=>navigate("/admin")}>
            <img src={'https://res.cloudinary.com/dzqywzres/image/upload/v1700062478/u7kzl2ufmmbe66o9kivw.png'}
              alt="Logo"
              className="w-[50px]"/>
            <h1 className="text-center text-lg text-orange-100 italic font-semibold ">
              The Michii
            </h1>
          </div>
          <div>
            <p className="text-center text-[10px] text-orange-100 mb-2 italic font-semibold">
              Dừng chân tại đây, để bắt đầu một hành trình đáng nhớ
            </p>
          </div>
        </>
      );
    }
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        
      >
        {getLogoContent()}
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
            {getCurrentBreadcrumb()}
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
