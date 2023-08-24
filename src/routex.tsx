import { createBrowserRouter, Navigate } from "react-router-dom";
import { LayoutAdmin } from "./components/admin/LayoutAdmin"; 
import { ManagerRoomType } from "./features/admin/ManageRoomType";
import AddRoomType from "./features/admin/AddManagerRoomType";
import UpdateRoomType from "./features/admin/UpdateRoomType";


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
            }
            
            
        ],
    },
]);