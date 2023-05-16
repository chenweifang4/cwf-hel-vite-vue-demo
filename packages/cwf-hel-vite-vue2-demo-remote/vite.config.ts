import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue2'

import {
  CONFIG_ENV_DEVELOPMENT,
  CONFIG_ENV_LOCAL,
  getConfigHost,
  CONFIG_PATH_PREFIX,
  CONFIG_DEV_HOST_PORT,
  CONFIG_SUB_APP_CWF_HEL_VITE_VUE2_DEMO_REMOTE
} from 'cwf-hel-vite-vue-demo-configs'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const base =
    mode === CONFIG_ENV_DEVELOPMENT
      ? CONFIG_PATH_PREFIX[CONFIG_SUB_APP_CWF_HEL_VITE_VUE2_DEMO_REMOTE]
      : getConfigHost(CONFIG_SUB_APP_CWF_HEL_VITE_VUE2_DEMO_REMOTE, CONFIG_ENV_LOCAL)

  return {
    base,
    plugins: [vue()],
    server: {
      host: '0.0.0.0',
      port: CONFIG_DEV_HOST_PORT[CONFIG_SUB_APP_CWF_HEL_VITE_VUE2_DEMO_REMOTE]
    },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    }
  }
})
