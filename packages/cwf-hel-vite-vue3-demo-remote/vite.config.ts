import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import {
  CONFIG_ENV_DEVELOPMENT,
  CONFIG_ENV_LOCAL,
  getConfigHost,
  CONFIG_PATH_PREFIX,
  CONFIG_DEV_HOST_PORT,
  CONFIG_SUB_APP_CWF_HEL_VITE_VUE3_DEMO_REMOTE,
} from "cwf-hel-vite-vue-demo-configs";
import legacy from "@vitejs/plugin-legacy";
import viteCDNPlugin from "vite-plugin-cdn-import";
import { addDataHelappendAttributeVueHtmlTransfromPlugin } from "cwf-hel-vite-vue-demo-utils";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const base =
    mode === CONFIG_ENV_DEVELOPMENT
      ? CONFIG_PATH_PREFIX[CONFIG_SUB_APP_CWF_HEL_VITE_VUE3_DEMO_REMOTE]
      : getConfigHost(CONFIG_SUB_APP_CWF_HEL_VITE_VUE3_DEMO_REMOTE, CONFIG_ENV_LOCAL);

  return {
    base,
    plugins: [
      vue(),
      legacy({
        targets: ["defaults", "not IE 11"],
      }),
      viteCDNPlugin({
        // 需要 CDN 加速的模块
        modules: [
          {
            name: "vue",
            var: "Vue",
            // path: "",
            path: `https://unpkg.com/vue@3.2.27/dist/vue.runtime.global.prod.js`,
          },
        ],
      }),
      addDataHelappendAttributeVueHtmlTransfromPlugin({
        urls: [`https://unpkg.com/vue@3.2.27/dist/vue.runtime.global.prod.js`],
        value: 0,
      }),
    ],
    server: {
      host: "0.0.0.0",
      port: CONFIG_DEV_HOST_PORT[CONFIG_SUB_APP_CWF_HEL_VITE_VUE3_DEMO_REMOTE],
    },
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
    build: {
      sourcemap: true,
      rollupOptions: {
        external: ["vue"],
      },
    },
  };
});
