import { createBrowserRouter } from "react-router-dom";
import { lazy, Suspense } from "react";
import LoadingSpinner from "../components/ui/LoadingSpinner";

// Layouts - không lazy load vì cần render ngay
import MainLayout from "../layout/MainLayout";
import BlankLayout from "../layout/BlankLayout";
import ProfilePage from "../pages/ProfilePage";
import {GoldPrice} from "@/components/extensions/GoldPrice.jsx";

// Lazy load các pages
const HomePage = lazy(() => import("../pages/HomePage"));
const CategoryPage = lazy(() => import("../pages/CategoryPage"));
const ArticleDetailPage = lazy(() => import("../pages/ArticleDetailPage"));
const SearchPage = lazy(() => import("../pages/SearchPage"));
const AdvertisingPage = lazy(() => import("../pages/AdvertisingPage"));
const OrderPage = lazy(() => import("../pages/OrderPage"));
const ContactPage = lazy(() => import("../pages/ContactPage"));

// Lazy load auth pages
const LoginPage = lazy(() => import("../components/LoginAndRegister/LoginPage"));
const RegisterPage = lazy(() => import("@/components/LoginAndRegister/RegisterPage.jsx"));

// Lazy load extensions
const Weather = lazy(() => 
  import("@/components/extensions/Weather.jsx").then(module => ({ default: module.Weather }))
);
const ExchangeRate = lazy(() => 
  import("@/components/extensions/ExchangeRate.jsx").then(module => ({ default: module.ExchangeRate }))
);

// Wrapper component để thêm Suspense cho lazy components
const LazyComponent = ({ children, fallback }) => (
  <Suspense fallback={fallback || <LoadingSpinner />}>
    {children}
  </Suspense>
);

const routes = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            { index: true, element: <LazyComponent><HomePage /></LazyComponent> },
            { path: "trang-chu", element: <LazyComponent><HomePage /></LazyComponent> },
            { path: "danh-muc/:category", element: <LazyComponent><CategoryPage /></LazyComponent> },
            { path: "danh-muc/:category/:subcategory", element: <LazyComponent><CategoryPage /></LazyComponent> },
            { path: "bai-viet", element: <LazyComponent><ArticleDetailPage /></LazyComponent> },
            { path: "bai-viet/:articleId", element: <LazyComponent><ArticleDetailPage /></LazyComponent> },
            { path: "tim-kiem", element: <LazyComponent><SearchPage /></LazyComponent> },
            { path: "quang-cao", element: <LazyComponent><AdvertisingPage /></LazyComponent> },
            { path: "dat-bao", element: <LazyComponent><OrderPage /></LazyComponent> },
            { path: "lien-he", element: <LazyComponent><ContactPage /></LazyComponent> },
            { path: "ho-so", element:  <LazyComponent><ProfilePage /></LazyComponent> },
            { path: "tien-ich/thoi-tiet", element: <LazyComponent><Weather /></LazyComponent> },
            { path: "tien-ich/ty-gia", element: <LazyComponent><ExchangeRate /></LazyComponent> },
            { path: "tien-ich/gia-vang", element: <LazyComponent><GoldPrice /></LazyComponent> },
        ],
    },
    {
        path: "/",
        element: <BlankLayout />,
        children: [
            { path: "dang-nhap", element: <LazyComponent><LoginPage /></LazyComponent> },
            { path: "dang-ky", element: <LazyComponent><RegisterPage /></LazyComponent> },
        ],
    },
]);

export default routes;