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
import { LayoutProfile } from "./features/webapp/profileUser/component/layoutProfile";
import MyOrder from "./features/webapp/profileUser/component/myOrder";
import ProfileUsre from "./features/webapp/profileUser/component/profileUsre";
import HotelChainStatistic from "./features/admin/HotelChainStatistics";
import LoginAdmin from "./features/webapp/LoginAdmin/Login";
import AddPermission from "./features/admin/Permission/AddPermission";
import BookingSuccess from "./features/webapp/order";
import MyWallet from "./features/webapp/profileUser/component/myWallet";
import Error403 from "./err/Error403";
import Error401 from "./err/Error401";
import PhatVoucher from "./features/admin/ManagerVoucher/PhatVoucher";


// chặn link admin
const dataPermission = localStorage.getItem('userAdmin')
const currentUserPermissions = (dataPermission && JSON.parse(dataPermission).permissions) || [];
const hasAddUserPermission = (permissions: any) => {
  return currentUserPermissions.includes(permissions);
};
// chặn link user
const dataLogin = localStorage.getItem("token");

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
        path: "/booking/:hotel/:date/:roomNumber/:selectedServices/:people",
        element: <BookingInformation />
      },
      {
        path: "order/:slug/:status",
        element: <Order />
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
        element: <SearchQuickHotel />
      },
      {
        path: '/searchHotel',
        element: <SearchHotel />
      },
      {
        path: '/promotion',
        element: <Promotion />
      },
      {
        path: "/loginadmin",
        element: <LoginAdmin />
      }
    ],
  },

  {
    path: "/profileUser",
    element: dataLogin ? (
      <LayoutProfile />
    ) : (
      <Error401 />
    ),
    children: [
      {
        index: true,
        element: <ProfileUsre />,
      },
      {
        path: "myorder",
        element: <MyOrder />,
      },
      {
        path: "mywallet",
        element: <MyWallet />,
      }

    ],
  },
  {
    path: "/order",
    element: <BookingSuccess />
  },
  {
    path: "/admin/*",
    element: <LayoutAdmin />,
    children: [
      {
        index: true,
        element: hasAddUserPermission("add statictical chain") ? (
          <HotelChainStatistic />
        ) : (
          < HotelChainStatistics />
        ),
      },
      {
        path: "commentmanagement",
        element: hasAddUserPermission("get rate") ? (
          <CommentManagement />
        ) : (
          <Error403 />
        ),
      },
      {
        path: "editcomment/:id",
        element: hasAddUserPermission("update rate") ? (
          <EditComment />
        ) : (
          <Error403 />
        ),
      },
      {
        path: "service",
        element: hasAddUserPermission("get service") ? (
          <ServiceManagement />
        ) : (
          <Error403 />
        ),
      },
      {
        path: "addservice",
        element: hasAddUserPermission("add service") ? (
          <AddService />
        ) : (
          <Error403 />
        ),
      },
      {
        path: "updateservice/:id",
        element: hasAddUserPermission("update service") ? (
          <UpdateService />
        ) : (
          <Error403 />
        ),
      },
      {
        path: "bookingmanagement",
        element: hasAddUserPermission("get booking") ? (
          <BookingManagement />
        ) : (
          <Error403 />
        ),
      },
      {
        path: "bookingmanagement/:id/update",
        element: hasAddUserPermission("get booking") ? (
          <BookingManagement />
        ) : (
          <Error403 />
        ),

      },
      {
        path: "addbooking",
        element: hasAddUserPermission("add booking") ? (
          <AddBooking />
        ) : (
          <Error403 />
        ),
      },
      {
        path: "updatebooking/:id",
        element: hasAddUserPermission("update booking") ? (
          <UpdateBooking />
        ) : (
          <Error403 />
        ),
      },
      {
        path: "detailbooking/:id",
        element: hasAddUserPermission("get booking") ? (
          <DetailBooking />
        ) : (
          <Error403 />
        ),
      },
      {
        path: "usermanagement",
        element: hasAddUserPermission("get user") ? (
          <UserManagement />
        ) : (
          <Error403 />
        ),
      },
      {
        path: "adduser",
        element: hasAddUserPermission("add user") ? (
          <AddUser />
        ) : (
          <Error403 />
        ),
      },

      {
        path: "updateuser/:id",
        element: hasAddUserPermission("update user") ? (
          <UpdateUserPage />
        ) : (
          <Error403 />
        ),
      },
      {
        path: "hotelmanagement",
        element: hasAddUserPermission("get hotel") ? (
          <HotelManagement />
        ) : (
          <Error403 />
        ),
      },
      {
        path: "addhotel",
        element: hasAddUserPermission("add hotel") ? (
          <AddHotel />
        ) : (
          <Error403 />
        ),
      },
      {
        path: "updatehotel/:id",
        element: hasAddUserPermission("update hotel") ? (
          <UpdateHotel />
        ) : (
          <Error403 />
        ),
      },
      {
        path: "manageroomtype",
        element: hasAddUserPermission("get category") ? (
          <ManagerRoomType />
        ) : (
          <Error403 />
        ),
      },
      {
        path: "addroomtype",
        element: hasAddUserPermission("add category") ? (
          <AddRoomType />
        ) : (
          <Error403 />
        ),
      },
      {
        path: "updateroomtype/:id",
        element: hasAddUserPermission("update category") ? (
          <UpdateRoomType />
        ) : (
          <Error403 />
        ),
      },
      {
        path: "managervouchers",
        element: hasAddUserPermission("get voucher") ? (
          <ManagerVouchers />
        ) : (
          <Error403 />
        ),
      },
      {
        path: "addvoucher",
        element: hasAddUserPermission("add voucher") ? (
          <AddVoucherPage />
        ) : (
          <Error403 />
        ),
      },
      {
        path: "phatvoucher",
        element: hasAddUserPermission("get voucher") ? (
          <PhatVoucher />
        ) : (
          <Error403 />
        ),
      },
      {
        path: "updatevoucher/:id",
        element: hasAddUserPermission("update voucher") ? (
          <UpdateVoucherPage />
        ) : (
          <Error403 />
        ),
      },
      {
        path: "manageremployee",
        element: hasAddUserPermission("get admin") ? (
          <ManagerEmployee />
        ) : (
          <Error403 />
        ),
      },
      {
        path: "addemployee",
        element:
          hasAddUserPermission("add admin") ? (
            <AddEmployeePage />
          ) : (
            <Error403 />
          ),
      },
      {
        path: "updateemployee/:id",
        element: hasAddUserPermission("update admin") ? (
          <UpdateEmployeePage />
        ) : (
          <Error403 />
        ),
      },
      {
        path: "statisticshotels",
        element: hasAddUserPermission("get statictical hotel") ? (
          <HotelChainStatistics />
        ) : (
          <Error403 />
        ),
      },
      {
        path: "managerroom",
        element: hasAddUserPermission("get room") ? (
          <ManagerRoom />
        ) : (
          <Error403 />
        ),
      },
      {
        path: "addroom",
        element: hasAddUserPermission("add room") ? (
          <AddRoomPage />
        ) : (
          <Error403 />
        ),
      },
      {
        path: "updateroom/:id",
        element: hasAddUserPermission("update room") ? (
          <UpdateRoomPage />
        ) : (
          <Error403 />
        ),
      },
      {
        path: "managerutilities",
        element: hasAddUserPermission("get comfort") ? (
          <ManagerUtilities />
        ) : (
          <Error403 />
        ),
      },
      {
        path: "updateUtilities/:id",
        element: hasAddUserPermission("update comfort") ? (
          <UpdateFeedBackPage />
        ) : (
          <Error403 />
        ),
      },
      {
        path: "addUtilities",
        element: hasAddUserPermission("add comfort") ? (
          <AddUtilities />
        ) : (
          <Error403 />
        ),

      },
      {
        path: "admininfo/:id", // chưa có quyền get
        element: <AdminInfoPage />
      },

      {
        path: "permission/:id",
        element: hasAddUserPermission("update permission") ? (
          <Permission />
        ) : (
          <Error403 />
        ),
      },
      {
        path: "indexpermission",
        element: hasAddUserPermission("get permission") ? (
          <IndexPremission />
        ) : (
          <Error403 />
        ),
      },
      {
        path: "addpermission",
        element: hasAddUserPermission("add permission") ? (
          <AddPermission />
        ) : (
          <Error403 />
        ),
      },
      {
        path: "HotelChainStatistics",
        element: hasAddUserPermission("add statictical chain") ? (
          <HotelChainStatistic />
        ) : (
          <Error403 />
        ),
      },


    ],
  },
  {
    path: "/error",
    children: [
      {
        path: "401",
        element: <Error401 />
      }
    ]
  }
]);