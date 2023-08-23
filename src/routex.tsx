import { createBrowserRouter, Navigate } from "react-router-dom";
import { LayoutAdmin } from "./components/admin/LayoutAdmin";
import { TableTHu } from "./features/admin/ThuTable";




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
                element: <Navigate to="dashboard" />,
            },
            {
                path: "dashboard",
                element: <TableTHu/>,
            },
        ],
    },
]);