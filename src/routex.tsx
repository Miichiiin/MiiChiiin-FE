import { createBrowserRouter, Outlet, Navigate } from "react-router-dom";
import HomePage from "./features/product/page/HomePage";
import LayoutPage from "./components/LayoutPage";
import ProductDetail from "./features/product/page/ProductDetail";
import CartsPage from "./features/cart/page/CatePage";
import LayoutAdmin from "./components/admin/LayoutAdmin";
import ListPage from "./features/product/page/ListPage";
import AddPage from "./features/product/page/AddPage";
import EditPage from "./features/product/page/EditPage";
import SignUp from "./features/auth/page/Signup";
import SignIn from "./features/auth/page/Signin";


export const router = createBrowserRouter([
    {
        path: "/",
        element: (
            <LayoutPage/>
        ),
        children: [
            {
                index: true,
                element: <Navigate to="/homepage" />,
            },
            {
                path: "/homepage",
                element: <HomePage/>,
            },
            {
                path: "/products/:id",
                element:<ProductDetail/>,
            },
            {
                path:"carts",
                element: <CartsPage/>,
            },
            {
                path:"/signin",
                element: <SignIn/>,
            },
            {
                path:"/signup",
                element: <SignUp/>,
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
                element: <div>Dashboard</div>,
            },
            {
                path: "products",
                element: <ListPage/>,
            },
            {
                path: "products/add",
                element: <AddPage/>,
            },
            {
                path: "products/edit/:id",
                element: <EditPage/>,
            },
        ],
    },
]);