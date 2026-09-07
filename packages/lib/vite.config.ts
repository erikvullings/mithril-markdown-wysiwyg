import { defineConfig } from "vite";

export default defineConfig(({ mode }) => {
  const isUmdMin = mode === "umd-min";

  return {
    build: {
      // `pnpm clean` already removes dist/ before build:types + build:bundle run,
      // so Vite must never empty it again here or it wipes the generated .d.ts files.
      emptyOutDir: false,
      minify: isUmdMin ? "terser" : false,
      lib: {
        entry: "src/index.ts",
        name: "MithrilMarkdownWYSIWYG",
        cssFileName: "index",
        formats: isUmdMin ? ["umd"] : ["es", "cjs", "umd"],
        fileName: (format) => {
          if (isUmdMin) {
            return "index.umd.min.js";
          }
          if (format === "es") {
            return "index.esm.js";
          }
          if (format === "cjs") {
            return "index.js";
          }
          return "index.umd.js";
        },
      },
      cssCodeSplit: false,
      rollupOptions: {
        external: ["mithril", "meiosis-setup"],
        output: {
          globals: {
            mithril: "m",
          },
          exports: "named",
        },
      },
      terserOptions: isUmdMin
        ? {
          compress: {
            drop_console: true,
            drop_debugger: true,
          },
          mangle: {
            reserved: ["MarkdownEditor"],
          },
        }
        : undefined,
    },
  };
});
