import { Outlet } from "react-router-dom";
import { BackToTop } from "@/components/ui/BackToTop";

const BlankLayout = () => { 
    return (
        <div className="app-root">
            <Outlet />
            <BackToTop />
        </div>
    )
}

export default BlankLayout;