/**
 * Utilitaires de test réutilisables
 */

import { ReactElement } from "react";
import { render, RenderOptions } from "@testing-library/react";
import { ThemeProvider } from "@/contexts/ThemeContext";

// Wrapper personnalisé avec les providers nécessaires
const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return <ThemeProvider>{children}</ThemeProvider>;
};

// Fonction de render personnalisée
const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">
) => render(ui, { wrapper: AllTheProviders, ...options });

// Ré-exporte tout
export * from "@testing-library/react";
export { customRender as render };
