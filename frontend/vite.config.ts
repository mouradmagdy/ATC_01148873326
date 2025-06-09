import path from "path";
// import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { createHtmlPlugin } from "vite-plugin-html";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    createHtmlPlugin({
      minify: true,
      inject: {
        data: {
          preloads: `
            <link rel="preload" href="%VITE_ASSET%/index-C3mvHoPg.js" as="script" />
            <link rel="preload" href="%VITE_ASSET%/index-KGJ1TAFP.css" as="style" />
            <link rel="prefetch" href="%VITE_ASSET%/Home-DX4li0Sg.js" as="script" />
            <link rel="prefetch" href="%VITE_ASSET%/Login-D4QNCZPr.js" as="script" />
          `,
        },
      },
    }),
  ],

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      treeshake: true,
    },
  },
});
