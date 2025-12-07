import { createBrowserRouter } from "react-router-dom";
import HealthPage from "../components/Health/HealthPage";
import App from "../App";
import LoginPage from "../components/Login/LoginPage";

const routes = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        children: [
            {
                path: "/trang-chu",
                element: <HealthPage/>,
            },
            {
                path: "/suc-khoe",
                element: <HealthPage/>,
            },
            {
                path: "/dang-nhap",
                element: <LoginPage/>,
            },
        ],
    },
]);

export default routes;