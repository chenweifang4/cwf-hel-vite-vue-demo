import { isMasterApp } from "hel-iso";
import { libReady } from "hel-lib-proxy";
import { CONFIG_SUB_APP_CWF_HEL_VITE_VUE3_DEMO_REMOTE } from "cwf-hel-vite-vue-demo-configs";

(async function () {
  const lib_properties = await import("./entrance/lib-properties");
  // 注意此处传递的是 default
  libReady(CONFIG_SUB_APP_CWF_HEL_VITE_VUE3_DEMO_REMOTE, lib_properties.default);

  // 非子应用时（即不是被别的模块触发载入的情况），自己挂载渲染节点，方便本地调试
  // 可根据项目实际情况控制是否载入 loadApp 文件
  if (isMasterApp()) {
    await import("./load-app");
  }
})().catch(console.error);
