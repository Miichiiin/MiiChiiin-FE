import { createBrowserRouter, Navigate } from "react-router-dom";
import Index from "./components/Index";
import LayoutWebsite from "./components/LayoutPage";



export const router = createBrowserRouter([
    {
        path: "/", 
        element: (
            <div>
                <LayoutWebsite/>
            </div>
        ),
        children: [
            {
                index: true,
                element: <Navigate to="/homepage" /> ,
            },
            {
                path:"/homepage",
                element:<Index/>
            }
        ],
    },
    {
        path: "/admin",
        element: (
          <div></div>
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
        ],
    },
]);