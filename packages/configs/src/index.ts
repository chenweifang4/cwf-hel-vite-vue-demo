export const CONFIG_SUB_APP_CWF_HEL_VITE_VUE3_DEMO_REMOTE = "cwf-hel-vite-vue3-demo-remote";
export const CONFIG_SUB_APP_CWF_HEL_VITE_VUE3_DEMO_HOST = "cwf-hel-vite-vue3-demo-host";

export const CONFIG_DEV_HOST_PORT = {
  [CONFIG_SUB_APP_CWF_HEL_VITE_VUE3_DEMO_REMOTE]: 8177,
  [CONFIG_SUB_APP_CWF_HEL_VITE_VUE3_DEMO_HOST]: 8178,
};

export const CONFIG_PROD_HOST_PORT = {
  [CONFIG_SUB_APP_CWF_HEL_VITE_VUE3_DEMO_REMOTE]: 61536,
  [CONFIG_SUB_APP_CWF_HEL_VITE_VUE3_DEMO_HOST]: 61537,
};

export const CONFIG_PATH_PREFIX = {
  [CONFIG_SUB_APP_CWF_HEL_VITE_VUE3_DEMO_REMOTE]: "/" + CONFIG_SUB_APP_CWF_HEL_VITE_VUE3_DEMO_REMOTE,
  [CONFIG_SUB_APP_CWF_HEL_VITE_VUE3_DEMO_HOST]: "/" + CONFIG_SUB_APP_CWF_HEL_VITE_VUE3_DEMO_HOST,
};

export const CONFIG_ENV_DEVELOPMENT = "development";
export const CONFIG_ENV_LOC = "loc";
export const CONFIG_ENV_LOCAL = "local";

export const CONFIG_HOST_LOCAL = "//localhost:";

export const COFNIG_ENV = {
  [CONFIG_ENV_DEVELOPMENT]: CONFIG_ENV_DEVELOPMENT,
  [CONFIG_ENV_LOC]: CONFIG_ENV_LOCAL,
  [CONFIG_ENV_LOCAL]: CONFIG_ENV_LOCAL,
};

export const COFNIG_HOST = {
  [CONFIG_ENV_DEVELOPMENT]: CONFIG_HOST_LOCAL,
  [CONFIG_ENV_LOC]: CONFIG_HOST_LOCAL,
  [CONFIG_ENV_LOCAL]: CONFIG_HOST_LOCAL,
};

export const getConfigHost = (
  package_name: keyof typeof CONFIG_DEV_HOST_PORT,
  env?: keyof typeof COFNIG_ENV
): string => {
  if (!package_name) {
    throw new Error("`package_name` is required!");
  }

  if (env === CONFIG_ENV_DEVELOPMENT) {
    return (
      COFNIG_HOST[CONFIG_ENV_DEVELOPMENT] +
      CONFIG_DEV_HOST_PORT[package_name] +
      CONFIG_PATH_PREFIX[package_name] +
      "/"
    );
  }

  if (!env || !COFNIG_HOST[env] || [CONFIG_ENV_LOC, CONFIG_ENV_LOCAL].includes(env)) {
    return (
      COFNIG_HOST[CONFIG_ENV_LOCAL] +
      CONFIG_PROD_HOST_PORT[package_name] +
      CONFIG_PATH_PREFIX[package_name] +
      "/"
    );
  }

  return COFNIG_HOST[env] + CONFIG_PATH_PREFIX[package_name];
};
