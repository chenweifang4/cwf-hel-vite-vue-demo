import { extname, join } from 'node:path';
import { accessSync, constants, readFileSync } from 'node:fs';
import http from 'http';
import httpProxy from 'http-proxy';

/**
 * @description 根据文件扩展名获取 Content-Type
 * @param   {string}  file_path  [file_path description]
 * @return  {[type]}             [return description]
 */
var getContentType = function (file_path) {
    var ext_name = extname(file_path);
    switch (ext_name) {
        case ".html":
            return "text/html";
        case ".css":
            return "text/css";
        case ".js":
            return "text/javascript";
        case ".json":
            return "application/json";
        case ".png":
            return "image/png";
        case ".jpg":
            return "image/jpg";
        default:
            return "application/octet-stream";
    }
};

var proxy = httpProxy.createProxyServer({});
var createServer = function (server_config) {
    var app_name = server_config.app_name, port = server_config.port, api_prefix = server_config.api_prefix, api_url = server_config.api_url;
    if (!port) {
        throw new Error("port is required!");
    }
    // 获取请求的文件路径
    var file_path;
    var app = http.createServer(function (req, res) {
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
            file_path = join(__dirname, "../../../".concat(app_name, "/dist"), (_c = req.url) === null || _c === void 0 ? void 0 : _c.replace("/".concat(app_name), ""))
                // 有些图片有加上指定后缀处理，这里需要截取
                .split("?")[0];
        }
        else {
            file_path = join(__dirname, "../../../".concat(app_name, "/dist"), "index.html");
        }
        try {
            accessSync(file_path, constants.F_OK);
            var data = readFileSync(file_path);
            var content_type = getContentType(file_path);
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

var helIgnoreVueHtmlTransfromPlugin = function (src) {
    return {
        name: "hel-ignore-vue-html-transform",
        transformIndexHtml: function (html) {
            html = html.replace("<script src=\"".concat(src, "\"></script>"), "<script data-helappend=\"0\" src=\"".concat(src, "\"></script>"));
            return html;
        },
    };
};

export { createServer, helIgnoreVueHtmlTransfromPlugin };
