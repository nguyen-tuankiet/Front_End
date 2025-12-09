import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/HomePage";
import HealthPage from "../components/Health/HealthPage";
import ArticleDetailPage from "../pages/ArticleDetailPage";
import LoginPage from "../components/Login/LoginPage";
import MainLayout from "../layout/MainLayout";
import BlankLayout from "../layout/BlankLayout";

const routes = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            { index: true, element: <HomePage /> },
            { path: "trang-chu", element: <HomePage /> },
            // Category list pages
            { path: "danh-muc/suc-khoe", element: <HealthPage /> },
            { path: "danh-muc/:category", element: <HealthPage /> },
            { path: "danh-muc/:category/:subcategory", element: <HealthPage /> },
            // Article detail page - riêng biệt
            { path: "danh-muc/:category/bai-viet/:articleId", element: <ArticleDetailPage /> },
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