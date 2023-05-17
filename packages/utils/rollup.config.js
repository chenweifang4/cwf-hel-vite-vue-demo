const typescript = require("@rollup/plugin-typescript");

module.exports = [
  {
    input: "src/index.ts",
    output: {
      file: "dist/index.js",
      format: "cjs",
    },
    plugins: [typescript()],
  },
  {
    input: "src/index.ts",
    output: {
      file: "dist/index.mjs",
      format: "es",
    },
    plugins: [typescript()],
  },
];
