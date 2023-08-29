import { createBrowserRouter, Navigate } from "react-router-dom";
import Login from "./features/webapp/auth/Login/login";
import ChooseRoom from "./features/webapp/booking/choose-room";
import ChooseService from "./features/webapp/booking/choose-service";



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
        path: "/choose-service",
        element: <ChooseService/>
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