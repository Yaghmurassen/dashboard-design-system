import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath, URL } from "node:url";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
      "@/components": fileURLToPath(
        new URL("./src/components", import.meta.url)
      ),
      "@/hooks": fileURLToPath(new URL("./src/hooks", import.meta.url)),
      "@/contexts": fileURLToPath(new URL("./src/contexts", import.meta.url)),
      "@/types": fileURLToPath(new URL("./src/types", import.meta.url)),
      "@/styles": fileURLToPath(new URL("./src/styles", import.meta.url)),
    },
  },

  css: {
    modules: {
      localsConvention: "camelCaseOnly",
      generateScopedName: "[name]__[local]___[hash:base64:5]",
    },
    preprocessorOptions: {
      scss: {
        // Use modern Sass API
        api: "modern-compiler",
        // Make tokens available globally without @use in every file
        additionalData: `@use "@/styles/tokens.scss" as *;`,
      },
    },
  },

  // Optimize build
  build: {
    target: "esnext",
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom"],
        },
      },
    },
  },

  // Dev server config
  server: {
    port: 3000,
    open: true,
  },
});
