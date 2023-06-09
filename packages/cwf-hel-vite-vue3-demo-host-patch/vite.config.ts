import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import {
  CONFIG_ENV_DEVELOPMENT,
  CONFIG_ENV_LOCAL,
  getConfigHost,
  CONFIG_PATH_PREFIX,
  CONFIG_DEV_HOST_PORT,
  CONFIG_SUB_APP_CWF_HEL_VITE_VUE3_DEMO_HOST_PATCH,
} from "cwf-hel-vite-vue-demo-configs";
import legacy from "@vitejs/plugin-legacy";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const base =
    mode === CONFIG_ENV_DEVELOPMENT
      ? CONFIG_PATH_PREFIX[CONFIG_SUB_APP_CWF_HEL_VITE_VUE3_DEMO_HOST_PATCH]
      : getConfigHost(CONFIG_SUB_APP_CWF_HEL_VITE_VUE3_DEMO_HOST_PATCH);

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
      port: CONFIG_DEV_HOST_PORT[CONFIG_SUB_APP_CWF_HEL_VITE_VUE3_DEMO_HOST_PATCH],
    },
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
  };
});
