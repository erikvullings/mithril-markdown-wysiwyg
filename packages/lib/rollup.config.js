import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import postcss from "rollup-plugin-postcss";
import dts from "rollup-plugin-dts";
import terser from "@rollup/plugin-terser";

const isProduction = process.env.NODE_ENV === "production";

export default [
  // ES Modules and CommonJS builds
  {
    input: "src/index.ts",
    output: [
      {
        file: "dist/index.js",
        format: "cjs",
        sourcemap: true,
        exports: "named",
      },
      {
        file: "dist/index.esm.js",
        format: "esm",
        sourcemap: true,
      },
    ],
    external: ["mithril", "meiosis-setup"],
    plugins: [
      resolve(),
      commonjs(),
      typescript({
        tsconfig: "./tsconfig.json",
      }),
      postcss({
        extract: true,
        minimize: isProduction,
      }),
    ],
  },

  // UMD build for CDNs (includes mithril as external global)
  {
    input: "src/index.ts",
    output: {
      file: "dist/index.umd.js",
      format: "umd",
      name: "MithrilMarkdownWYSIWYG",
      sourcemap: true,
      globals: {
        mithril: "m",
      },
    },
    external: ["mithril"],
    plugins: [
      resolve(),
      commonjs(),
      typescript({
        tsconfig: "./tsconfig.json",
      }),
      postcss({
        extract: false, // Inline CSS in UMD build
        minimize: true,
      }),
    ],
  },

  // UMD minified build for CDNs
  {
    input: "src/index.ts",
    output: {
      file: "dist/index.umd.min.js",
      format: "umd",
      name: "MithrilMarkdownWYSIWYG",
      sourcemap: true,
      globals: {
        mithril: "m",
      },
    },
    external: ["mithril"],
    plugins: [
      resolve(),
      commonjs(),
      typescript({
        tsconfig: "./tsconfig.json",
      }),
      postcss({
        extract: false, // Inline CSS in UMD build
        minimize: true,
      }),
      terser({
        compress: {
          drop_console: true,
          drop_debugger: true,
        },
        mangle: {
          reserved: ["MarkdownEditor"],
        },
      }),
    ],
  },

  // TypeScript declaration files
  {
    input: "src/types-only.ts",
    output: {
      file: "dist/index.d.ts",
      format: "esm",
    },
    external: ["mithril", "meiosis-setup"],
    plugins: [dts()],
  },
];
