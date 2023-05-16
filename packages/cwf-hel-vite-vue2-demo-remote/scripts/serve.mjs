import { createServer } from "cwf-hel-vite-vue-demo-utils";
import {
  CONFIG_PROD_HOST_PORT,
  CONFIG_SUB_APP_CWF_HEL_VITE_VUE2_DEMO_REMOTE,
  CONFIG_HOST_LOCAL,
} from "cwf-hel-vite-vue-demo-configs";
const port = CONFIG_PROD_HOST_PORT[CONFIG_SUB_APP_CWF_HEL_VITE_VUE2_DEMO_REMOTE];

createServer({
  app_name: CONFIG_SUB_APP_CWF_HEL_VITE_VUE2_DEMO_REMOTE,
  port,
});
