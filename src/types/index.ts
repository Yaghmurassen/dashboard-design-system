/**
 * Type definitions for the application
 * Following strict TypeScript best practices
 */

export type Theme = "light" | "dark";

export interface ThemeContextValue {
  theme: Theme;
  toggleTheme: () => void;
  isDark: boolean;
}

export interface BaseComponentProps {
  className?: string;
  "aria-label"?: string;
}

export type Variant = "primary" | "secondary" | "tertiary";
export type Size = "sm" | "md" | "lg";
export type Status = "idle" | "loading" | "success" | "error";
