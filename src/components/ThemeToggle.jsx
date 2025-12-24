import { useEffect, useState, createContext, useContext } from "react";
import { Sun, Moon } from "lucide-react";

// Create Theme Context
const ThemeContext = createContext({
  theme: "light",
  toggleTheme: () => {},
  isDarkMode: false,
});

// Custom hook to use theme
export function useTheme() {
  return useContext(ThemeContext);
}

// Theme Provider Component
export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    try {
      const savedTheme = localStorage.getItem("theme");
      if (savedTheme) return savedTheme;
      // Check system preference
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
      }
      return "light";
    } catch {
      return "light";
    }
  });

  useEffect(() => {
    try {
      const root = document.documentElement;
      if (theme === "dark") {
        root.classList.add("dark");
      } else {
        root.classList.remove("dark");
      }
      localStorage.setItem("theme", theme);
    } catch (e) {
      console.error("Error applying theme:", e);
    }
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === "light" ? "dark" : "light"));

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, isDarkMode: theme === "dark" }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className="h-8 w-8 flex items-center justify-center rounded-md hover:bg-muted transition-colors"
      title={theme === "light" ? "Chuyển sang chế độ tối" : "Chuyển sang chế độ sáng"}
    >
      {theme === "light" ? (
        <Sun className="w-5 h-5 text-amber-500" />
      ) : (
        <Moon className="w-5 h-5 text-blue-400" />
      )}
    </button>
  );
}
