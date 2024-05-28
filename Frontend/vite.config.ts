import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/",
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      // Proxying API calls to SerpApi
      "/search": {
        target: "https://serpapi.com",
        changeOrigin: true, // necessary for virtual hosted sites
        rewrite: (path) => path.replace(/^\/search/, ""),
        secure: false, // if you are using https, you might set this to true
      },
    },
  },
});
