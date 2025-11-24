/**
 * Theme Context Provider
 * Implements Context API pattern for global theme management
 */

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import type { Theme, ThemeContextValue } from "@/types";

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

const THEME_STORAGE_KEY = "wooclap-theme";

interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: Theme;
}

/**
 * ThemeProvider component
 * Manages theme state and persistence to localStorage
 * Applies theme class to document root for CSS variable cascade
 */
export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  defaultTheme = "light",
}) => {
  const [theme, setTheme] = useState<Theme>(() => {
    // Check localStorage and system preference
    const stored = localStorage.getItem(THEME_STORAGE_KEY) as Theme | null;
    if (stored) return stored;

    // Respect user's system preference
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      return "dark";
    }

    return defaultTheme;
  });

  // Apply theme class to document root
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  }, []);

  const value = useMemo<ThemeContextValue>(
    () => ({
      theme,
      toggleTheme,
      isDark: theme === "dark",
    }),
    [theme, toggleTheme]
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

/**
 * Custom hook for theme access
 * @throws Error if used outside ThemeProvider
 */
export const useTheme = (): ThemeContextValue => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
};
