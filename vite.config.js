import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  appType: "mpa",
  root: resolve(__dirname, "src"),
  publicDir: resolve(__dirname, "public"),
  envDir: __dirname,
  base: "./",
  server: {
    port: 5173,
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        changeOrigin: true,
      },
    },
  },
  build: {
    outDir: resolve(__dirname, "dist"),
    emptyOutDir: true,
    minify: "esbuild",
    rollupOptions: {
      input: {
        index: resolve(__dirname, "src/index.html"),
        services: resolve(__dirname, "src/services.html"),
        cases: resolve(__dirname, "src/cases.html"),
        contacts: resolve(__dirname, "src/contacts.html"),
        portfolio: resolve(__dirname, "src/portfolio.html"),
      },
    },
  },
});
