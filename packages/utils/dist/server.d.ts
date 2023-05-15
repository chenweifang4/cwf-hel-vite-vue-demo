interface ServerConfig {
    app_name: string;
    port: number;
    api_prefix?: string;
    api_url?: string;
}
export declare const createServer: (server_config: ServerConfig) => void;
export {};
