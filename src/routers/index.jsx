import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/HomePage";
import CategoryPage from "../pages/CategoryPage";
import ArticleDetailPage from "../pages/ArticleDetailPage";
import LoginPage from "../components/LoginAndRegister/LoginPage";
import MainLayout from "../layout/MainLayout";
import BlankLayout from "../layout/BlankLayout";
import RegisterPage from "@/components/LoginAndRegister/RegisterPage.jsx";

const routes = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            { index: true, element: <HomePage /> },
            { path: "trang-chu", element: <HomePage /> },
            { path: "danh-muc/:category", element: <CategoryPage /> },
            { path: "danh-muc/:category/:subcategory", element: <CategoryPage /> },
            { path: "bai-viet", element: <ArticleDetailPage /> }, 
            { path: "tim-kiem", element: <CategoryPage /> },
        ],
    },
    {
        path: "/",
        element: <BlankLayout />,
        children: [
            { path: "dang-nhap", element: <LoginPage /> },
            { path: "dang-ky", element: <RegisterPage /> },
        ],
    },
]);

export default routes;