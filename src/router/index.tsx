import {createBrowserRouter, Navigate} from "react-router-dom";
import Login from "../views/login/index.tsx";
import NotFound from "../views/NotFound.tsx";
import Welcome from "../views/welcome";
import Layout from "../layout";

const router = createBrowserRouter([
    {
        element: <Layout />,
        children: [
            {path: "/welcome", element: <Welcome />},
        ]
    },
    {path: "/", element: <Navigate to="/welcome" />},
    {path: "/login", element: <Login />},
    {path: "*", element: <NotFound />},
]);

export default router;
