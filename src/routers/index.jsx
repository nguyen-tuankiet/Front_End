import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/HomePage";
import CategoryPage from "../pages/CategoryPage";
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
            { path: "danh-muc/:category", element: <CategoryPage /> },
            { path: "danh-muc/:category/:subcategory", element: <CategoryPage /> },
            { path: "danh-muc/:category/bai-viet/:articleId", element: <ArticleDetailPage /> },
            { path: "tim-kiem", element: <CategoryPage /> },
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