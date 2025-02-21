import {createBrowserRouter} from "react-router-dom";
import Login from "../views/login/index.tsx";

const router = createBrowserRouter([
    {path: "/", element: <Login />  }
]);

export default router;