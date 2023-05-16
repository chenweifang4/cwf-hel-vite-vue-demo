import { createServer } from "cwf-hel-vite-vue-demo-utils";
import {
  CONFIG_PROD_HOST_PORT,
  CONFIG_SUB_APP_CWF_HEL_VITE_VUE3_DEMO_HOST_PATCH,
  CONFIG_HOST_LOCAL,
} from "cwf-hel-vite-vue-demo-configs";
const port = CONFIG_PROD_HOST_PORT[CONFIG_SUB_APP_CWF_HEL_VITE_VUE3_DEMO_HOST_PATCH];

createServer({
  app_name: CONFIG_SUB_APP_CWF_HEL_VITE_VUE3_DEMO_HOST_PATCH,
  port,
});
