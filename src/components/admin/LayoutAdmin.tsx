import React, { useState } from 'react';
import {
    FileOutlined,
    TeamOutlined,
    UserOutlined,

} from '@ant-design/icons';
import { AiFillSignal,AiOutlineCreditCard} from "react-icons/ai";
import { BiSolidBed,BiHotel } from "react-icons/bi";
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { HeaderAdmin } from './Header';
import { Link, Outlet } from 'react-router-dom';
const { Content, Footer, Sider } = Layout;
type MenuItem = Required<MenuProps>['items'][number];
function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
    } as MenuItem;
}

const items: MenuItem[] = [
    getItem(<Link to={"statisticshotels"}>Thống kê theo chuỗi </Link>, '1', <AiFillSignal />),
    getItem(<Link to={"manageroomtype"}>Quản Lý Loại Phòng</Link>, '2', <BiSolidBed />),
    getItem(<Link to={"managervouchers"}>Quản lý Vouchers</Link>, '3', <AiOutlineCreditCard />),
    getItem(<Link to={"manageremployee"}>Quản lý Nhân Viên</Link>, '4',  <UserOutlined />),
    getItem(<Link to={"managerroom"}>Quản lý Phòng</Link>, '5',  <BiHotel />),
    getItem(<Link to={"managerfeedback"}>Quản lý Feedbacks</Link>, '6',  <UserOutlined />),
    
    getItem('Team', 'sub2', <TeamOutlined />, [getItem('Team 1', '6'), getItem('Team 2', '8')]),
    getItem('Files', '9', <FileOutlined />),
];
export const LayoutAdmin = () => {
    const [collapsed, setCollapsed] = useState(false);
    const {
      token: { colorBgContainer },
    } = theme.useToken();
    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                <div className="demo-logo-vertical my-5 ">
                    <img src="https://media.istockphoto.com/id/1256768065/vi/vec-to/logo-linh-v%E1%BA%ADt-esport-h%E1%BB%95-tr%E1%BA%AFng.jpg?s=612x612&w=is&k=20&c=_kzP2cuB-s76LYATE2I9RIGp_6vFeqs08PDQKa0EaoU=" alt="" className='rounded-full ' width={"100px"} />
                </div>
                <hr />
                <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} className='my-5'/>
            </Sider>
            <Layout>
              <HeaderAdmin/>
                <Content style={{ margin: '0 16px' }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>
                        <Link to="/admin">Thống kê</Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item></Breadcrumb.Item>
                        <Breadcrumb.Item></Breadcrumb.Item>
                    </Breadcrumb>
                    <div style={{ padding: 24, minHeight: 360, background: colorBgContainer }}>
                       <Outlet/>
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>Ant Design ©2023 Created by Ant UED</Footer>
            </Layout>
        </Layout>
    )
}