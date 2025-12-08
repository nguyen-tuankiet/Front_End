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
        element: <MainLayout />,
        children: [
            { index: true, element: <HomePage /> },
            { path: "trang-chu", element: <HomePage /> },
            { path: "danh-muc/suc-khoe", element: <HealthPage /> },
            { path: "danh-muc/:category", element: <HealthPage /> },
            { path: "danh-muc/:category/:subcategory", element: <HealthPage /> },
            { path: "tim-kiem", element: <HealthPage /> },
        ],
    },
    {
        path: "/dang-nhap",
        element: <BlankLayout />,
        children: [
            { index: true, element: <LoginPage /> },
        ],
    },
]);

export default routes;