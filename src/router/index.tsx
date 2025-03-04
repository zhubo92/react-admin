import {createBrowserRouter, Navigate} from "react-router-dom";
import Login from "@/views/login/index.tsx";
import NotFound from "@/views/NotFound.tsx";
import Layout from "@/layout";
import authLoader from "./authLoader.ts";
import Forbidden from "@/views/Forbidden.tsx";
import {lazy} from "react";
import lazyLoad from "./lazyLoad.tsx";

const router = createBrowserRouter([
    {
        id: "layout",
        element: <Layout />,
        loader: authLoader,
        children: [
            {path: "/welcome", element: lazyLoad(lazy(() => import("@/views/welcome")))},
            {path: "/dashboard", element: lazyLoad(lazy(() => import("@/views/dashboard")))},
            {path: "/userList", element: lazyLoad(lazy(() => import("@/views/user")))},
            {path: "/roleList", element: lazyLoad(lazy(() => import("@/views/role")))},
            {path: "/menuList", element: lazyLoad(lazy(() => import("@/views/menu")))},
            {path: "/deptList", element: lazyLoad(lazy(() => import("@/views/dept")))},
        ]
    },
    {path: "/", element: <Navigate to="/welcome" />},
    {path: "/login", element: <Login />},
    {path: "/403", element: <Forbidden />},
    {path: "/404", element: <NotFound />},
    {path: "*", element: <Navigate to="/404" />},
]);

export default router;
