import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from "react-router-dom";
import routes from './routers/index.jsx';
import {AuthProvider} from "@/components/Context/AuthContext.jsx";
import { ThemeProvider } from "@/components/ThemeToggle.jsx";
import { LanguageProvider } from "@/contexts/LanguageContext.jsx";

createRoot(document.getElementById('root')).render(
    <LanguageProvider>
        <ThemeProvider>
            <AuthProvider>
                <RouterProvider router={routes} />
            </AuthProvider>
        </ThemeProvider>
    </LanguageProvider>
)
