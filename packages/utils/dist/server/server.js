"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createServer = void 0;
var node_path_1 = require("node:path");
var node_fs_1 = require("node:fs");
var http_1 = __importDefault(require("http"));
var http_proxy_1 = __importDefault(require("http-proxy"));
var tools_1 = require("./tools");
var proxy = http_proxy_1.default.createProxyServer({});
var createServer = function (server_config) {
    var app_name = server_config.app_name, port = server_config.port, api_prefix = server_config.api_prefix, api_url = server_config.api_url;
    if (!port) {
        throw new Error("port is required!");
    }
    // 获取请求的文件路径
    var file_path;
    var app = http_1.default.createServer(function (req, res) {
        var _a, _b, _c;
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
        if (api_prefix && api_url && ((_a = req.url) === null || _a === void 0 ? void 0 : _a.startsWith(api_prefix))) {
            proxy.web(req, res, {
                target: api_url,
                changeOrigin: true,
            });
            return;
        }
        else if ((_b = req.url) === null || _b === void 0 ? void 0 : _b.startsWith("/".concat(app_name, "/assets"))) {
            file_path = (0, node_path_1.join)(__dirname, "../../../".concat(app_name, "/dist"), (_c = req.url) === null || _c === void 0 ? void 0 : _c.replace("/".concat(app_name), ""))
                // 有些图片有加上指定后缀处理，这里需要截取
                .split("?")[0];
        }
        else {
            file_path = (0, node_path_1.join)(__dirname, "../../../".concat(app_name, "/dist"), "index.html");
        }
        try {
            (0, node_fs_1.accessSync)(file_path, node_fs_1.constants.F_OK);
            var data = (0, node_fs_1.readFileSync)(file_path);
            var content_type = (0, tools_1.getContentType)(file_path);
            // 设置响应头
            res.setHeader("Content-Type", content_type);
            // 返回文件内容
            res.end(data);
        }
        catch (error) {
            console.error(error);
        }
    });
    // 启动服务器
    app.listen(port, function () {
        console.log("Server:".concat(app_name.toUpperCase(), "   \u279C  http://localhost:").concat(port));
    });
};
exports.createServer = createServer;
//# sourceMappingURL=server.js.map