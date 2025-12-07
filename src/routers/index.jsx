import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import HomePage from "../pages/HomePage";
import HealthPage from "../components/Health/HealthPage";
import LoginPage from "../components/Login/LoginPage";

const routes = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                index: true,
                element: <HomePage />,
            },
            {
                path: "trang-chu",
                element: <HomePage />,
            },
            {
                path: "danh-muc/suc-khoe",
                element: <HealthPage />,
            },
            {
                path: "dang-nhap",
                element: <LoginPage />,
            },
        ],
    },
]);

export default routes;