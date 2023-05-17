const typescript = require("@rollup/plugin-typescript").default;
const helDevUtils = require("hel-dev-utils");
const pkg = require("./package.json");
const path = require("path");

const cst = helDevUtils.cst;
const resolvePath = (name) => path.join(process.cwd(), name);
const lib_types_path = resolvePath("/src/entrance/lib-types.ts");

const plugins = [typescript()];

module.exports = [
  {
    input: lib_types_path,
    plugins,
    output: {
      format: "esm",
      name: pkg.appGroupName,
      file: `${cst.HEL_PROXY_DIR}_es/entry.js`,
    },
  },
  {
    input: lib_types_path,
    plugins,
    output: {
      format: "umd",
      name: pkg.appGroupName,
      file: `${cst.HEL_PROXY_DIR}/entry.js`,
    },
  },
];
