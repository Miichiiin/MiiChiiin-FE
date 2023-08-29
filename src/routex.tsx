import { createBrowserRouter, Navigate } from "react-router-dom";
import Index from "./components/Index";
import LayoutWebsite from "./components/LayoutPage";
import New from "./features/webapp/New";
import HotelIntroduction from "./features/webapp/HotelIntroduction";
import BookingInformation from "./features/webapp/BookingInformation";



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
            },
            {
                path:"/hotel",
                element:<HotelIntroduction/>
            },
            {
                path:"/new",
                element:<New/>
            },
            {
                path:"/booking",
                element:<BookingInformation/>
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