import { createBrowserRouter, Navigate } from "react-router-dom";
import Login from "./features/webapp/auth/Login/login";
import Register from "./features/webapp/auth/Register/register";



export const router = createBrowserRouter([
    {
        path: "/",
        element: (
            <div>Layout</div>
        ),
        children: [
            {
                index: true,
                element: <Navigate to="/homepage" />,
            },
        ],
    },
    {
        path: '/login',
        element: <Login/>
    },
    {
        path: '/register',
        element: <Register/>
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