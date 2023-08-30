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
import UpdateFeedBackPage from "./features/admin/ManagerFeedBacks/UpdateFeedBack";
import { CommentManagement } from "./features/admin/comment/CommentManagement";
import { EditComment } from "./features/admin/comment/EditComment";
import { ServiceManagement } from "./features/admin/service/ServiceManagement";
import { AddService } from "./features/admin/service/AddService";
import { BookingManagement } from "./features/admin/booking/BookingManagement";
import { UserManagement } from "./features/admin/user/UserManagement";
import { AddUser } from "./features/admin/user/AddUser";
import { HotelManagement } from "./features/admin/hotel/HotelManagement";
import { AddHotel } from "./features/admin/hotel/AddHotel";




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
            <LayoutAdmin />
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
                path: "commentmanagement",
                element: <CommentManagement />,
            },
            {
                path: "editcomment",
                element: <EditComment/>,
            },
            {
                path: "service",
                element: <ServiceManagement/>,
            },
            {
                path: "addservice",
                element: <AddService/>,
            },
            {
                path: "bookingmanagement",
                element: <BookingManagement/>,
            },
            {
                path: "usermanagement",
                element: <UserManagement/>,
            },
            {
                path: "adduser",
                element: <AddUser/>,
            },
            {
                path: "hotelmanagement",
                element: <HotelManagement/>,
            },
            {
                path: "addhotel",
                element: <AddHotel/>,
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
            {
                path:"updatefeedback",
                element:<UpdateFeedBackPage/>
            },
            
            
            
        ],
    },
]);