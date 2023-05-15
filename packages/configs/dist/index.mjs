var _a, _b, _c, _d, _e;
var CONFIG_SUB_APP_CWF_HEL_VITE_VUE3_DEMO_REMOTE = "cwf-hel-vite-vue3-demo-remote";
var CONFIG_SUB_APP_CWF_HEL_VITE_VUE3_DEMO_HOST = "cwf-hel-vite-vue3-demo-host";
var CONFIG_DEV_HOST_PORT = (_a = {},
    _a[CONFIG_SUB_APP_CWF_HEL_VITE_VUE3_DEMO_REMOTE] = 8177,
    _a[CONFIG_SUB_APP_CWF_HEL_VITE_VUE3_DEMO_HOST] = 8178,
    _a);
var CONFIG_PROD_HOST_PORT = (_b = {},
    _b[CONFIG_SUB_APP_CWF_HEL_VITE_VUE3_DEMO_REMOTE] = 61536,
    _b[CONFIG_SUB_APP_CWF_HEL_VITE_VUE3_DEMO_HOST] = 61537,
    _b);
var CONFIG_PATH_PREFIX = (_c = {},
    _c[CONFIG_SUB_APP_CWF_HEL_VITE_VUE3_DEMO_REMOTE] = "/" + CONFIG_SUB_APP_CWF_HEL_VITE_VUE3_DEMO_REMOTE,
    _c[CONFIG_SUB_APP_CWF_HEL_VITE_VUE3_DEMO_HOST] = "/" + CONFIG_SUB_APP_CWF_HEL_VITE_VUE3_DEMO_HOST,
    _c);
var CONFIG_ENV_DEVELOPMENT = "development";
var CONFIG_ENV_LOC = "loc";
var CONFIG_ENV_LOCAL = "local";
var CONFIG_HOST_LOCAL = "//localhost:";
var COFNIG_ENV = (_d = {},
    _d[CONFIG_ENV_DEVELOPMENT] = CONFIG_ENV_DEVELOPMENT,
    _d[CONFIG_ENV_LOC] = CONFIG_ENV_LOCAL,
    _d[CONFIG_ENV_LOCAL] = CONFIG_ENV_LOCAL,
    _d);
var COFNIG_HOST = (_e = {},
    _e[CONFIG_ENV_DEVELOPMENT] = CONFIG_HOST_LOCAL,
    _e[CONFIG_ENV_LOC] = CONFIG_HOST_LOCAL,
    _e[CONFIG_ENV_LOCAL] = CONFIG_HOST_LOCAL,
    _e);
var getConfigHost = function (package_name, env) {
    if (!package_name) {
        throw new Error("`package_name` is required!");
    }
    if (env === CONFIG_ENV_DEVELOPMENT) {
        return (COFNIG_HOST[CONFIG_ENV_DEVELOPMENT] +
            CONFIG_DEV_HOST_PORT[package_name] +
            CONFIG_PATH_PREFIX[package_name] +
            "/");
    }
    if (!env || !COFNIG_HOST[env] || [CONFIG_ENV_LOC, CONFIG_ENV_LOCAL].includes(env)) {
        return (COFNIG_HOST[CONFIG_ENV_LOCAL] +
            CONFIG_PROD_HOST_PORT[package_name] +
            CONFIG_PATH_PREFIX[package_name] +
            "/");
    }
    return COFNIG_HOST[env] + CONFIG_PATH_PREFIX[package_name];
};

export { COFNIG_ENV, COFNIG_HOST, CONFIG_DEV_HOST_PORT, CONFIG_ENV_DEVELOPMENT, CONFIG_ENV_LOC, CONFIG_ENV_LOCAL, CONFIG_HOST_LOCAL, CONFIG_PATH_PREFIX, CONFIG_PROD_HOST_PORT, CONFIG_SUB_APP_CWF_HEL_VITE_VUE3_DEMO_HOST, CONFIG_SUB_APP_CWF_HEL_VITE_VUE3_DEMO_REMOTE, getConfigHost };
