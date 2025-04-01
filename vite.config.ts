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
