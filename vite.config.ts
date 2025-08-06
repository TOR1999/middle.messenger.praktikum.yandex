import { defineConfig } from "vite";
import handlebars from "vite-plugin-handlebars";
import Unfonts from "unplugin-fonts/vite";

export default defineConfig({
  publicDir: "public",
  build: {
    outDir: "static",
  },
  server: {
    host: "localhost",
    port: 3000,
    proxy: {
      "/api": {
        target: "https://ya-praktikum.tech",
        changeOrigin: true,
        configure: (proxy) => {
          proxy.on("proxyRes", (proxyRes) => {
            const cookies = proxyRes.headers["set-cookie"];
            if (cookies) {
              proxyRes.headers["set-cookie"] = cookies.map((cookie) =>
                cookie
                  .replace(/;\s*Secure/i, "")
                  .replace(/;\s*SameSite=None/i, "")
                  .replace(/domain=[^;]+/i, "domain=localhost"),
              );
            }
          });
        },
      },
    },
  },
  plugins: [
    handlebars(),
    Unfonts({
      custom: {
        families: [
          {
            name: "Inter",
            local: "Inter",
            src: "./assets/fonts/*.ttf",
          },
        ],
        display: "auto",
        preload: true,
        injectTo: "body",
      },
    }),
  ],
});
