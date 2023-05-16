export declare const CONFIG_SUB_APP_CWF_HEL_VITE_VUE3_DEMO_REMOTE = "cwf-hel-vite-vue3-demo-remote";
export declare const CONFIG_SUB_APP_CWF_HEL_VITE_VUE3_DEMO_HOST = "cwf-hel-vite-vue3-demo-host";
export declare const CONFIG_SUB_APP_CWF_HEL_VITE_VUE3_DEMO_HOST_PATCH = "cwf-hel-vite-vue3-demo-host-patch";
export declare const CONFIG_SUB_APP_CWF_HEL_VITE_VUE2_DEMO_REMOTE = "cwf-hel-vite-vue2-demo-remote";
export declare const CONFIG_SUB_APP_CWF_HEL_VITE_VUE2_DEMO_HOST = "cwf-hel-vite-vue2-demo-host";
export declare const CONFIG_DEV_HOST_PORT: {
    "cwf-hel-vite-vue3-demo-remote": number;
    "cwf-hel-vite-vue3-demo-host": number;
    "cwf-hel-vite-vue3-demo-host-patch": number;
    "cwf-hel-vite-vue2-demo-remote": number;
    "cwf-hel-vite-vue2-demo-host": number;
};
export declare const CONFIG_PROD_HOST_PORT: {
    "cwf-hel-vite-vue3-demo-remote": number;
    "cwf-hel-vite-vue3-demo-host": number;
    "cwf-hel-vite-vue3-demo-host-patch": number;
    "cwf-hel-vite-vue2-demo-remote": number;
    "cwf-hel-vite-vue2-demo-host": number;
};
export declare const CONFIG_PATH_PREFIX: {
    "cwf-hel-vite-vue3-demo-remote": string;
    "cwf-hel-vite-vue3-demo-host": string;
    "cwf-hel-vite-vue3-demo-host-patch": string;
    "cwf-hel-vite-vue2-demo-remote": string;
    "cwf-hel-vite-vue2-demo-host": string;
};
export declare const CONFIG_ENV_DEVELOPMENT = "development";
export declare const CONFIG_ENV_LOC = "loc";
export declare const CONFIG_ENV_LOCAL = "local";
export declare const CONFIG_HOST_LOCAL = "//localhost:";
export declare const COFNIG_ENV: {
    development: string;
    loc: string;
    local: string;
};
export declare const COFNIG_HOST: {
    development: string;
    loc: string;
    local: string;
};
export declare const getConfigHost: (package_name: keyof typeof CONFIG_DEV_HOST_PORT, env?: keyof typeof COFNIG_ENV) => string;
