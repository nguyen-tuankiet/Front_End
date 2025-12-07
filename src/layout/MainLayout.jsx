import { Outlet } from "react-router-dom";
import Footer from "../components/Footer/Footer";
import { Header } from "../components/header";

const MainLayout = () => {
    return (
        <div className="app-root">
            <Header />
            <div className="app-content">
                <Outlet />
            </div>
            <Footer />
        </div>
    )
}

export default MainLayout;