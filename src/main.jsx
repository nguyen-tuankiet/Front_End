import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from "react-router-dom";
import routes from './routers/index.jsx';
import {AuthProvider} from "@/components/Context/AuthContext.jsx";
import { ThemeProvider } from "@/components/ThemeToggle.jsx";
import { LanguageProvider } from "@/contexts/LanguageContext.jsx";
import { FontSizeProvider } from "@/contexts/FontSizeContext.jsx";
import { CategoryProvider } from "@/contexts/CategoryContext.jsx";

createRoot(document.getElementById('root')).render(
    <LanguageProvider>
        <CategoryProvider>
            <ThemeProvider>
                <FontSizeProvider>
                    <AuthProvider>
                        <RouterProvider router={routes} />
                    </AuthProvider>
                </FontSizeProvider>
            </ThemeProvider>
        </CategoryProvider>
    </LanguageProvider>
)
