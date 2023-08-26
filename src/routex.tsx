import { createBrowserRouter, Navigate } from "react-router-dom";
import { LayoutAdmin } from "./components/admin/LayoutAdmin"; 
import { ManagerRoomType } from "./features/admin/ManagerRoomType";
import AddRoomType from "./features/admin/ManagerRoomType/AddRoomType";
import UpdateRoomType from "./features/admin/ManagerRoomType/UpdateRoomType";
import { ManagerVouchers} from "./features/admin/ManagerVoucher";
import AddVoucherPage from "./features/admin/ManagerVoucher/AddVoucher";
import UpdateVoucherPage from "./features/admin/ManagerVoucher/UpdateVoucher";
import { ManagerEmployee } from "./features/admin/ManagerEmployees";
import AddEmployeePage from "./features/admin/ManagerEmployees/AddEmployee";
import UpdateEmployeePage from "./features/admin/ManagerEmployees/UpdateEmployee";
import HotelChainStatistics from "./features/admin/HotelStatistics";

import UpdateRoomPage from "./features/admin/ManagerRooms/UpdateRoom";
import AddRoomPage from "./features/admin/ManagerRooms/AddRoom";
import { ManagerRoom } from "./features/admin/ManagerRooms";
import { ManagerFeedBack } from "./features/admin/ManagerFeedBacks";



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
                element: <HotelChainStatistics/>,
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
            {
                path:"manageremployee",
                element:<ManagerEmployee/>
            },
            {
                path:"addemployee",
                element:<AddEmployeePage/>
            },
            {
                path:"updateemployee",
                element:<UpdateEmployeePage/>
            },
            {
                path:"statisticshotels",
                element:<HotelChainStatistics/>
            },
            {
                path:"managerroom",
                element:<ManagerRoom/>
            },
            {
                path:"addroom",
                element:<AddRoomPage/>
            },
            {
                path:"updateroom",
                element:<UpdateRoomPage/>
            },
            {
                path:"managerfeedback",
                element:<ManagerFeedBack/>
            },
            
            
            
        ],
    },
]);