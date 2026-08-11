import { defineConfig } from "vite";

export default defineConfig({
  base: "./",
  server: {
    port: 3325,
    open: true,
  },
  build: {
    outDir: "../../docs",
    emptyOutDir: true,
  },
});
