import { createBrowserRouter, Navigate } from "react-router-dom";
import { LayoutAdmin } from "./components/admin/LayoutAdmin";
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
                element: <Navigate to="dashboard" />,
            },
            {
                path: "dashboard",
                element: <div>Dashboard</div>,
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
        ],
    },
]);