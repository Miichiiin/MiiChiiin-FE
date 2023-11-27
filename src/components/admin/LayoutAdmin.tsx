import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { UserOutlined } from "@ant-design/icons";
import { AiFillSignal, AiOutlineCreditCard } from "react-icons/ai";
import { BiSolidBed, BiHotel } from "react-icons/bi";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import { HeaderAdmin } from "./Header";
import { Link, Outlet } from "react-router-dom";
import { BiCommentDetail } from "react-icons/bi";
import { MdMedicalServices } from "react-icons/md";
import { TbBrandBooking } from "react-icons/tb";
import { AiOutlineUser } from "react-icons/ai";
import { FaHotel } from "react-icons/fa";
const { Content, Footer, Sider } = Layout;
function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  content?: string,
  url?: string,
  children?: string
) {
  return {
    key,
    icon,
    content,
    children,
    label,
    url,
  };
}

export const LayoutAdmin = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const userAdminLocal = localStorage.getItem("userAdmin");

  let imageLC = "";

  if (userAdminLocal) {
    const data = JSON.parse(userAdminLocal);
    imageLC = data.image;
  }

  // Lấy quyền hạn của người dùng hiện tại (lấy ví dụ từ người dùng đầu tiên trong danh sách)
  const currentUserPermissions =
    (userAdminLocal && JSON.parse(userAdminLocal).permissions) || [];
  const getMenuItems = () => {
    const menuItems = [];

    if (currentUserPermissions.includes("add statictical chain")) {
      menuItems.push(
        getItem(
          <Link to={"HotelChainStatistics"}>Thống kê theo chuỗi</Link>,
          "1",
          <AiFillSignal />,
          "Thống kê theo chuỗi",
          "statisticshotels"
        )
      );
    }
    if (currentUserPermissions.includes("get statictical hotel")) {
      menuItems.push(
        getItem(
          <Link to={"statisticshotels"}>Thống kê khách sạn</Link>,
          "1",
          <AiFillSignal />,
          "Thống kê khách sạn",
          "statisticshotels"
        )
      );
    }

    if (currentUserPermissions.includes("get category")) {
      menuItems.push(
        getItem(
          <Link to={"manageroomtype"}>Quản Lý Loại Phòng</Link>,
          "2",
          <BiSolidBed />,
          "Quản Lý Loại Phòng",
          "manageroomtype"
        )
      );
    }

    if (currentUserPermissions.includes("get voucher")) {
      menuItems.push(
        getItem(
          <Link to={"managervouchers"}>Quản lý Vouchers</Link>,
          "3",
          <AiOutlineCreditCard />,
          "Quản lý Vouchers",
          "managervouchers"
        )
      );
    }

    if (currentUserPermissions.includes("get admin")) {
      menuItems.push(
        getItem(
          <Link to={"manageremployee"}>Quản lý Nhân Viên</Link>,
          "4",
          <UserOutlined />,
          "Quản lý Nhân Viên",
          "manageremployee"
        )
      );
    }

    if (currentUserPermissions.includes("get room")) {
      menuItems.push(
        getItem(
          <Link to={"managerroom"}>Quản lý Phòng</Link>,
          "5",
          <BiHotel />,
          "Quản lý Phòng",
          "managerroom"
        )
      );
    }

    if (currentUserPermissions.includes("get comfort")) {
      menuItems.push(
        getItem(
          <Link to={"managerUtilities"}>Quản lý tiện ích</Link>,
          "6",
          <UserOutlined />,
          "Quản lý tiện ích",
          "managerUtilities"
        )
      );
    }

    if (currentUserPermissions.includes("get rate")) {
      menuItems.push(
        getItem(
          <Link to={"commentmanagement"}>Quản lý comment</Link>,
          "7",
          <BiCommentDetail />,
          "Quản lý comment",
          "commentmanagement"
        )
      );
    }

    if (currentUserPermissions.includes("get service")) {
      menuItems.push(
        getItem(
          <Link to={"service"}>Quản lý dịch vụ</Link>,
          "8",
          <MdMedicalServices />,
          "Quản lý dịch vụ",
          "service"
        )
      );
    }

    if (currentUserPermissions.includes("get booking")) {
      menuItems.push(
        getItem(
          <Link to={"bookingmanagement"}>Quản lý đặt phòng</Link>,
          "9",
          <TbBrandBooking />,
          "Quản lý đặt phòng",
          "bookingmanagement"
        )
      );
    }

    if (currentUserPermissions.includes("get user")) {
      menuItems.push(
        getItem(
          <Link to={"usermanagement"}>Quản lý khách hàng</Link>,
          "10",
          <AiOutlineUser />,
          "Quản lý khách hàng",
          "usermanagement"
        )
      );
    }

    if (currentUserPermissions.includes("get hotel")) {
      menuItems.push(
        getItem(
          <Link to={"hotelmanagement"}>Quản lý khách sạn</Link>,
          "11",
          <FaHotel />,
          "Quản lý khách sạn",
          "hotelmanagement"
        )
      );
    }

    if (currentUserPermissions.includes("get permission")) {
      menuItems.push(
        getItem(
          <Link to={"indexPermission"}>Quản lý quyền</Link>,
          "12",
          <FaHotel />,
          "Quản lý quyền",
          "indexPermission"
        )
      );
    }

    return menuItems;
  };

  const getCurrentBreadcrumb = () => {
    // Tách đoạn đường dẫn thành các phần từ, loại bỏ các phần tử rỗng (có thể xuất hiện do các dấu '/' liên tiếp)
    const pathSnippets = location.pathname.split("/").filter((i) => i);
    const menuItems = getMenuItems();
    // Tạo mảng Breadcrumb bằng cách duyệt qua từng đoạn đường dẫn
    return pathSnippets.map((path, index) => {
      // tạo url
      const url = `${pathSnippets.slice(0, index + 1).join("/")}`;
      // Tìm mục trong menu có đường dẫn trùng với URL đã tạo
      const formattedPath =
        index === 0
          ? path.charAt(0).toUpperCase() + path.slice(1).toLowerCase()
          : path;

      const menuItem = menuItems.find(
        (item: any) => item.url === formattedPath
      );
      return (
        <Breadcrumb.Item key={url}>
          {menuItem ? (
            <span>{menuItem?.content}</span>
          ) : (
            <span> {formattedPath}</span>
          )}
        </Breadcrumb.Item>
      );
    });
  };

  useEffect(() => {
    if (!localStorage.getItem("tokenAdmin")) navigate("/error/401");
  }, []);

  const getLogoContent = () => {
    if (collapsed) {
      return (
        <div onClick={() => navigate("/admin")}>
          <div className="my-8 flex justify-center items-center cursor-pointer">
            <img
              src={
                "https://res.cloudinary.com/chuoi2taps/image/upload/v1700834002/icon_r97yb5.png"
              }
              alt="Logo"
              className="w-[50px]"
            />
          </div>

          {/* <h1 className="text-center text-md mb-4 text-orange-100 italic font-semibold ">
            The Michii
          </h1> */}
        </div>
      );
    } else {
      return (
        <>
          <div
            className="flex items-center justify-center my-3 cursor-pointer"
            onClick={() => navigate("/admin")}
          >
            <img
              src={
                "https://res.cloudinary.com/chuoi2taps/image/upload/v1700834002/icon_r97yb5.png"
              }
              alt="Logo"
              className="w-[50px]"
            />
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
