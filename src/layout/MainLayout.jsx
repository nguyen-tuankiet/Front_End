import { Outlet } from "react-router-dom";
import Footer from "../components/Footer/Footer";
import { Header } from "../components/header";
import ChatBot from "../components/ChatBot";
import { BackToTop } from "@/components/ui/BackToTop";
import GlobalShortcuts from "@/routers/GlobalShortcuts.jsx";

const MainLayout = () => {
    return (
        <div className="app-root">
            <GlobalShortcuts />
            <Header />
            <div className="app-content">
                <Outlet />
            </div>
            <Footer />
            <BackToTop />
            <ChatBot />
        </div>
    )
}

export default MainLayout;