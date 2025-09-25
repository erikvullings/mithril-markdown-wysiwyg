import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import postcss from 'rollup-plugin-postcss';
import dts from 'rollup-plugin-dts';

export default [
  {
    input: 'src/index.ts',
    output: [
      {
        file: 'dist/index.js',
        format: 'cjs',
        sourcemap: true,
      },
      {
        file: 'dist/index.esm.js',
        format: 'esm',
        sourcemap: true,
      },
    ],
    external: ['mithril', 'meiosis-setup'],
    plugins: [
      resolve(),
      commonjs(),
      typescript({
        tsconfig: './tsconfig.json',
      }),
      postcss({
        extract: true,
        minimize: true,
      }),
    ],
  },
  {
    input: 'src/types-only.ts',
    output: {
      file: 'dist/index.d.ts',
      format: 'esm',
    },
    external: ['mithril', 'meiosis-setup'],
    plugins: [dts()],
  },
];