/**
 * App Root Component
 * Wraps application with necessary providers
 * Following React composition pattern
 */

import { ThemeProvider } from "@/contexts";
import Dashboard from "@/components/organisms/Dashboard/Dashboard";

export default function App() {
  return (
    <ThemeProvider defaultTheme="light">
      <Dashboard />
    </ThemeProvider>
  );
}
