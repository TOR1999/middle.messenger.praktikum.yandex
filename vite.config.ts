import { defineConfig } from "vite";
import handlebars from "vite-plugin-handlebars";

export default defineConfig({
  publicDir: "public",
  build: {
    outDir: "static",
  },
  server: {
    host: "localhost",
    port: 3000,
  },
  plugins: [handlebars()],
});
