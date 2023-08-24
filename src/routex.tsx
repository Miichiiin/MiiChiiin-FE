import { createBrowserRouter, Navigate } from "react-router-dom";
import { LayoutAdmin } from "./components/admin/LayoutAdmin";
import { CommentManagement } from "./features/admin/CommentManagement";
import { EditComment } from "./features/admin/EditComment";




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
        ],
    },
]);