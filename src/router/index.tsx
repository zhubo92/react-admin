import {createBrowserRouter, Navigate} from "react-router-dom";
import Login from "../views/login/index.tsx";
import NotFound from "../views/NotFound.tsx";
import Welcome from "../views/welcome";
import Layout from "../layout";
import Dashboard from "../views/dashboard";
import User from "../views/user";
import Role from "../views/role";
import Menu from "../views/menu";
import Dept from "../views/dept";

const router = createBrowserRouter([
    {
        element: <Layout />,
        children: [
            {path: "/welcome", element: <Welcome />},
            {path: "/dashboard", element: <Dashboard />},
            {path: "/user", element: <User />},
            {path: "/role", element: <Role />},
            {path: "/menu", element: <Menu />},
            {path: "/dept", element: <Dept />},
        ]
    },
    {path: "/", element: <Navigate to="/welcome" />},
    {path: "/login", element: <Login />},
    {path: "*", element: <NotFound />},
]);

export default router;
