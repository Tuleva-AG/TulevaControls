import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import dts from "rollup-plugin-dts";
import external from "rollup-plugin-peer-deps-external";

import autoprefixer from "autoprefixer";
import postcss from "rollup-plugin-postcss";

export default [
  {
    input: "src/index.ts",
    output: [
      {
        file: "dist/cjs/index.js",
        format: "cjs",
        sourcemap: false,
      },
      {
        file: "dist/esm/index.js",
        format: "esm",
        sourcemap: false,
        name: "@tuleva-ag/tuleva-controls-test",
      },
    ],
    plugins: [
      postcss({
        extract: false,
        writeDefinitions: true,
        modules: true,
        namedExports: true,
        plugins: [autoprefixer()],
      }),
      external(),
      resolve(),
      commonjs(),
      typescript({ tsconfig: "./tsconfig.json" }),
    ],
  },
  {
    input: "dist/esm/index.d.ts",
    output: [{ file: "dist/index.d.ts", format: "esm" }],
    plugins: [dts()],
  },
];
