import { createBrowserRouter, Navigate } from "react-router-dom";
import { LayoutAdmin } from "./components/admin/LayoutAdmin"; 
import { ManagerRoomType } from "./features/admin/ManageRoomType";
import AddRoomType from "./features/admin/ManageRoomType/AddManagerRoomType";
import UpdateRoomType from "./features/admin/ManageRoomType/UpdateRoomType";
import { ManagerVouchers } from "./features/admin/ManagerVoucher";
import AddVoucherPage from "./features/admin/ManagerVoucher/AddVoucher";
import UpdateVoucherPage from "./features/admin/ManagerVoucher/UpdateVoucher";


export const router = createBrowserRouter([
    {
        path: "/",
        element: (
            <div></div>
        ),
        children: [
            {
                index: true,
                element: <Navigate to="/homepage" />,
            },
        ],
    },
    {
        path: "/admin",
        element: (
          <LayoutAdmin/>
        ),
        children: [
            {
                index: true,
                element: <ManagerRoomType/>,
            },
            {
                path: "manageroomtype",
                element: <ManagerRoomType/>,
            },
            {
                path: "addroomtype",
                element: <AddRoomType/>,
            },
            {
                path: "updateroomtype",
                element: <UpdateRoomType/>,
            },
            {
                path:"managervouchers",
                element:<ManagerVouchers/>,
            },
            {
                path:"addvoucher",
                element:<AddVoucherPage/>
            },
            {
                path:"updatevoucher",
                element:<UpdateVoucherPage/>
            },
            
            
        ],
    },
]);