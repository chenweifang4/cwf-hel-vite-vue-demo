import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue2";
import legacy from "@vitejs/plugin-legacy";

import {
  CONFIG_ENV_DEVELOPMENT,
  CONFIG_ENV_LOCAL,
  getConfigHost,
  CONFIG_PATH_PREFIX,
  CONFIG_DEV_HOST_PORT,
  CONFIG_SUB_APP_CWF_HEL_VITE_VUE2_DEMO_HOST_PATCH,
} from "cwf-hel-vite-vue-demo-configs";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const base =
    mode === CONFIG_ENV_DEVELOPMENT
      ? CONFIG_PATH_PREFIX[CONFIG_SUB_APP_CWF_HEL_VITE_VUE2_DEMO_HOST_PATCH]
      : getConfigHost(CONFIG_SUB_APP_CWF_HEL_VITE_VUE2_DEMO_HOST_PATCH, CONFIG_ENV_LOCAL);

  return {
    base,
    plugins: [
      vue(),
      legacy({
        targets: ["defaults", "not IE 11"],
      }),
    ],
    server: {
      host: "0.0.0.0",
      port: CONFIG_DEV_HOST_PORT[CONFIG_SUB_APP_CWF_HEL_VITE_VUE2_DEMO_HOST_PATCH],
    },
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
  };
});
