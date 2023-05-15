import { join } from "node:path";
import { accessSync, constants, readFileSync } from "node:fs";
import http from "http";
import httpProxy from "http-proxy";
import { getContentType } from "./tools";

const proxy = httpProxy.createProxyServer({});

interface ServerConfig {
  app_name: string;
  port: number;
  api_prefix?: string;
  api_url?: string;
}

export const createServer = (server_config: ServerConfig) => {
  const { app_name, port, api_prefix, api_url } = server_config;
  if (!port) {
    throw new Error("port is required!");
  }

  // 获取请求的文件路径
  let file_path: any;

  const app = http.createServer((req: http.IncomingMessage, res: http.ServerResponse) => {
    // 设置允许跨域请求的响应头
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "*");
    res.setHeader("Access-Control-Allow-Headers", "*");

    // FIXME: Response to preflight request doesn't pass access control check: It does not have HTTP ok status.
    if (req.method === "OPTIONS") {
      // 处理预检请求
      res.writeHead(200);
      res.end();
      return;
    }

    if (api_prefix && api_url && req.url?.startsWith(api_prefix)) {
      proxy.web(req, res, {
        target: api_url,
        changeOrigin: true,
      });
      return;
    } else if (req.url?.startsWith(`/${app_name}/assets`)) {
      file_path = join(__dirname, `../../${app_name}/dist`, req.url?.replace(`/${app_name}`, ""))
        // 有些图片有加上指定后缀处理，这里需要截取
        .split("?")[0];
    } else {
      file_path = join(__dirname, `../../${app_name}/dist`, "index.html");
    }

    try {
      accessSync(file_path, constants.F_OK);
      const data = readFileSync(file_path);
      const content_type = getContentType(file_path);
      // 设置响应头
      res.setHeader("Content-Type", content_type);
      // 返回文件内容
      res.end(data);
    } catch (error) {
      console.error(error);
    }
  });

  // 启动服务器
  app.listen(port, () => {
    console.log(`Server:${app_name.toUpperCase()}   ➜  http://localhost:${port}`);
  });
};
