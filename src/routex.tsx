import { createBrowserRouter, Navigate } from "react-router-dom";
import ChooseRoom from "./features/webapp/booking/choose-room";
import RoomTypes from "./features/webapp/hotels/rooms/roomtypes";
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
        path: '/hotels/rooms/roomtypes',
        element: <RoomTypes/>
    },
    {
        path: "/choose-service",
        element: <ChooseService/>
    },
    {
        path: "/choose-room",
        element: <ChooseRoom/>
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