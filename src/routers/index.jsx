import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import HomePage from "../pages/HomePage";
import HealthPage from "../components/Health/HealthPage";
import LoginPage from "../components/Login/LoginPage";
import MainLayout from "../layout/MainLayout";
import { BaggageClaim } from "lucide-react";
import BlankLayout from "../layout/BlankLayout";

const routes = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout/>,
        children: [
            { path: "/trang-chu", element: <HealthPage/>},
            { path: "/suc-khoe", element: <HealthPage/>},
        ],
    },
    {
        path: "/dang-nhap",
        element: <BlankLayout/>,
        children: [
            { path: "/dang-nhap", element: <LoginPage/>},
        ],
    },
]);

export default routes;