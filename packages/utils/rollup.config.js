const typescript = require("@rollup/plugin-typescript");

module.exports = [
  {
    input: "src/server/index.ts",
    output: {
      file: "dist/server/index.js",
      format: "cjs",
    },
    plugins: [
      typescript({
        tsconfig: "src/server/tsconfig.json",
        declarationDir: "dist/server/types",
      }),
    ],
  },
  {
    input: "src/server/index.ts",
    output: {
      file: "dist/server/index.mjs",
      format: "es",
    },
    plugins: [
      typescript({
        tsconfig: "src/server/tsconfig.json",
        declarationDir: "dist/server/types",
      }),
    ],
  },
  {
    input: "src/client/index.ts",
    output: {
      file: "dist/client/index.js",
      format: "cjs",
    },
    plugins: [
      typescript({
        tsconfig: "src/client/tsconfig.json",
        declarationDir: "dist/client/types",
      }),
    ],
  },
  {
    input: "src/client/index.ts",
    output: {
      file: "dist/client/index.mjs",
      format: "es",
    },
    plugins: [
      typescript({
        tsconfig: "src/client/tsconfig.json",
        declarationDir: "dist/client/types",
      }),
    ],
  },
];
