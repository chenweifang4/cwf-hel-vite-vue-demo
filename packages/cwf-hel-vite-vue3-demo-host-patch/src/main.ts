import { isMasterApp } from "hel-iso";
import { libReady } from "hel-lib-proxy";
import { CONFIG_SUB_APP_CWF_HEL_VITE_VUE3_DEMO_HOST_PATCH, CONFIG_SUB_APP_CWF_HEL_VITE_VUE3_DEMO_REMOTE, getConfigHost } from "cwf-hel-vite-vue3-demo-configs";

import { preFetchLib, bindVueRuntime } from "hel-micro";

(async function () {
  const lib_properties = await import("./entrance/lib-properties");
  // 注意此处传递的是 default
  libReady(CONFIG_SUB_APP_CWF_HEL_VITE_VUE3_DEMO_HOST_PATCH, lib_properties.default);

  const enable_custom = !!window.location.port;
  const host = getConfigHost(
    CONFIG_SUB_APP_CWF_HEL_VITE_VUE3_DEMO_REMOTE,
  ).replace(/\/$/, "");

  console.log('[cwf-hel-vite-vue3-demo-host-patch] enable_custom', enable_custom)
  console.log('[cwf-hel-vite-vue3-demo-host-patch] remote host', host)

  await preFetchLib(CONFIG_SUB_APP_CWF_HEL_VITE_VUE3_DEMO_REMOTE, {
    custom: {
      host,
      skipFetchHelMeta: true,
      enable: enable_custom,
    },
    hook: {
      beforeAppendAssetNode(passCtx) {
        debugger
        console.log('passCtx', passCtx)
        // const { url, setAssetUrl } = passCtx;
        // https://unpkg.com/remote-vue-project@1.0.6/hel_dist/css/27.aea1e7be.css
        // --->
        // https://cdn.jsdelivr.net/npm/remote-vue-project@1.0.6/hel_dist/css/27.aea1e7be.css
        // const jsdelivrUrl = url.replace('https://unpkg.com', 'https://cdn.jsdelivr.net/npm');
        // setAssetUrl(jsdelivrUrl);
      },
    },
  });

  // 非子应用时（即不是被别的模块触发载入的情况），自己挂载渲染节点，方便本地调试
  // 可根据项目实际情况控制是否载入 loadApp 文件
  if (isMasterApp()) {
    await import("./load-app");
  }
})().catch(console.error);
