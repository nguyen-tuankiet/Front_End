import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from "react-router-dom";
import routes from './routers/index.jsx';
import {AuthProvider} from "@/components/Context/AuthContext.jsx";

createRoot(document.getElementById('root')).render(
    <AuthProvider>
        <RouterProvider router={routes} />
    </AuthProvider>
    )
