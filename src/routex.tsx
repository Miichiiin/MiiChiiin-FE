import { createBrowserRouter, Navigate } from "react-router-dom";
import { LayoutAdmin } from "./components/admin/LayoutAdmin";
import { ManagerRoomType } from "./features/admin/ManagerRoomType";
import AddRoomType from "./features/admin/ManagerRoomType/AddRoomType";
import UpdateRoomType from "./features/admin/ManagerRoomType/UpdateRoomType";
import { ManagerVouchers } from "./features/admin/ManagerVoucher";
import AddVoucherPage from "./features/admin/ManagerVoucher/AddVoucher";
import UpdateVoucherPage from "./features/admin/ManagerVoucher/UpdateVoucher";
import { ManagerEmployee } from "./features/admin/ManagerEmployees";
import AddEmployeePage from "./features/admin/ManagerEmployees/AddEmployee";
import UpdateEmployeePage from "./features/admin/ManagerEmployees/UpdateEmployee";
import HotelChainStatistics from "./features/admin/HotelStatistics";

import UpdateRoomPage from "./features/admin/ManagerRooms/UpdateRoom";
import AddRoomPage from "./features/admin/ManagerRooms/AddRoom";
import { ManagerRoom } from "./features/admin/ManagerRooms";
import { ManagerUtilities } from "./features/admin/ManagerUtilities";
import UpdateFeedBackPage from "./features/admin/ManagerUtilities/UpdateUtilities";
import { CommentManagement } from "./features/admin/comment/CommentManagement";
import { EditComment } from "./features/admin/comment/EditComment";
import { ServiceManagement } from "./features/admin/service/ServiceManagement";
import { AddService } from "./features/admin/service/AddService";
import { BookingManagement } from "./features/admin/booking/BookingManagement";
import { UserManagement } from "./features/admin/user/UserManagement";
import { AddUser } from "./features/admin/user/AddUser";
import { HotelManagement } from "./features/admin/hotel/HotelManagement";
import { AddHotel } from "./features/admin/hotel/AddHotel";

import ChooseRoom from "./features/webapp/booking/choose-room";
import RoomTypes from "./features/webapp/hotels/rooms/typeofroom";
import ChooseService from "./features/webapp/booking/choose-service";
import Login from "./features/webapp/auth/Login/login";
import Register from "./features/webapp/auth/Register/register";
import DetailTypeofRoom from "./features/webapp/hotels/rooms/detail-typeofroom";
import Index from "./components/Index";
import LayoutWebsite from "./components/LayoutPage";
import New from "./features/webapp/New";
import HotelIntroduction from "./features/webapp/HotelIntroduction";
import BookingInformation from "./features/webapp/BookingInformation";
import HotelType from "./features/webapp/HotelType";
import AdminInfoPage from "./features/admin/ManagerInformationAdmin";
import Order from "./features/webapp/order";
import { UpdateService } from "./features/admin/service/updateService";
import UpdateHotel from "./features/admin/hotel/UpdateHotel";
import { SearchQuickHotel } from "./components/SearchQuickHotel";
import { SearchHotel } from "./features/webapp/booking/choose-room/searchHotel";
import UpdateUserPage from "./features/admin/user/UpdateUser";
import AddUtilities from "./features/admin/ManagerUtilities/AddUtilities";
import AddBooking from "./features/admin/booking/AddBooking";
import UpdateBooking from "./features/admin/booking/UpdateBooking";
import Permission from "./features/admin/Permission/Permission";
import IndexPremission from "./features/admin/Permission/IndexPremission";
import Promotion from "./features/webapp/Promotion";
import DetailBooking from "./features/admin/booking/DetailBooking";
import HotelStatistics from "./features/admin/HotelStatistics";
import HotelChainStatistic from "./features/admin/HotelChainStatistics";



export const router = createBrowserRouter([
    {
        path: "/",
        element: (
            <div>
                <LayoutWebsite />
            </div>
        ),
        children: [
            {
                index: true,
                element: <Navigate to="/homepage" />,
            },
            {
                path: "/homepage",
                element: <Index />
            },
            {
                path: "/hotel/:id",
                element: <HotelIntroduction />
            },
            {
                path: "/hoteltype",
                element: <HotelType />
            },
            {
                path: "/new",
                element: <New />
            },
            {
                path: "/booking/:hotel/:date/:roomNumber/:selectedServices/",
                element: <BookingInformation />
            },
            {
                path:"order",
                element:<Order/>
            },
            {
                path: '/hotel/:id/rooms/roomtypes',
                element: <RoomTypes />
            },
            {
                path: '/hotel/:idHotel/rooms/detail/:idRoom',
                element: <DetailTypeofRoom />
            },
            {
                path: "/choose-service/:nameHotel/:date/:numberRoom/:numberPeople",
                element: <ChooseService />
            },
            {
                path: "/choose-room/:nameHotel/:date/:numberRoom/:numberPeople",
                element: <ChooseRoom />
              },
            {
                path: '/register',
                element: <Register />
            },
            {
                path: '/login',
                element: <Login />
            },
            {
                path: '/search',
                element: <SearchQuickHotel/>
            },
            {
                path: '/searchHotel',
                element: <SearchHotel/>
            },
            {
                path: '/promotion',
                element: <Promotion/>
            }
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
                element: <HotelStatistics/>,
            },
            {
                path: "manageroomtype",
                element: <ManagerRoomType />,
            },
            {
                path: "commentmanagement",
                element: <CommentManagement />,
            },
            {
                path: "editcomment/:id",
                element: <EditComment />,
            },
            {
                path: "service",
                element: <ServiceManagement />,
            },
            {
                path: "addservice",
                element: <AddService />,
            },
            {
                path: "updateservice/:id",
                element: <UpdateService/>,
            },
            {
                path: "bookingmanagement",
                element: <BookingManagement />,
            },
            {
                path: "bookingmanagement/:id/update",
                element: <BookingManagement />,
            },
            {
                path: "addbooking",
                element: <AddBooking />,
            },
            {
                path: "updatebooking/:id",
                element: <UpdateBooking/>
            },
            {
                path: "detailbooking/:id",
                element: <DetailBooking />,
            },
            {
                path: "usermanagement",
                element: <UserManagement />,
            },
            {
                path: "adduser",
                element: <AddUser />,
            },
            
            {
                path: "updateuser/:id",
                element: <UpdateUserPage />,
            },
            {
                path: "hotelmanagement",
                element: <HotelManagement />,
            },
            {
                path: "addhotel",
                element: <AddHotel />,
            },
            {
                path: "updatehotel/:id",
                element: <UpdateHotel/>
            },
            {
                path: "addroomtype",
                element: <AddRoomType />,
            },
            {
                path: "updateroomtype/:id",
                element: <UpdateRoomType />,
            },
            {
                path: "managervouchers",
                element: <ManagerVouchers />,
            },
            {
                path: "addvoucher",
                element: <AddVoucherPage />
            },
            {
                path: "updatevoucher/:id",
                element: <UpdateVoucherPage />
            },
            {
                path: "manageremployee",
                element: <ManagerEmployee />
            },
            {
                path: "addemployee",
                element: <AddEmployeePage />
            },
            {
                path: "updateemployee/:id",
                element: <UpdateEmployeePage />
            },
            {
                path: "statisticshotels",
                element: <HotelChainStatistics />
            },
            {
                path: "managerroom",
                element: <ManagerRoom />
            },
            {
                path: "addroom",
                element: <AddRoomPage />
            },
            {
                path: "updateroom",
                element: <UpdateRoomPage />
            },
            {
                path: "managerutilities",
                element: <ManagerUtilities />
            },
            {
                path: "updateUtilities/:id",
                element: <UpdateFeedBackPage />
            },
            {
                path: "addUtilities",
                element: <AddUtilities/>
            },
            {
                path: "admininfo",
                element:<AdminInfoPage/>
            },

            {
                path: "permission/:id",
                element:<Permission/>
            },
            {
                path:"indexPermission",
                element:<IndexPremission/>
            },
            {
                path:"HotelChainStatistics",
                element:<HotelChainStatistic/>
            }

        ],
    },
]);