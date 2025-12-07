import { Outlet } from "react-router-dom";
const BlankLayout = () => { 
    return (
        <div className="app-root">
            <Outlet />
        </div>
    )
}

export default BlankLayout;