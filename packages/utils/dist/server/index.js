'use strict';

var node_path = require('node:path');
var node_fs = require('node:fs');
var http = require('http');
var httpProxy = require('http-proxy');

/**
 * @description 根据文件扩展名获取 Content-Type
 * @param   {string}  file_path  [file_path description]
 * @return  {[type]}             [return description]
 */
var getContentType = function (file_path) {
    var ext_name = node_path.extname(file_path);
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
var addDataHelappendAttribute = function (html, options) {
    var urls = options.urls, _a = options.value, value = _a === void 0 ? 0 : _a;
    var urlArray = Array.isArray(urls) ? urls : [urls];
    var regex = /(<link[^>]*rel="(?:stylesheet|modulepreload)"[^>]*href="([^"]+)")[^>]*>|(<script[^>]*src="([^"]+)")[^>]*>/gi;
    // /(<link[^>]*rel="(?:stylesheet|modulepreload)"[^>]*href="([^"]+)")[^>]*>|(<script[^>]*type="module"[^>]*src="([^"]+)")[^>]*>|(<script[^>]*nomodule[^>]*src="([^"]+)")[^>]*>/gi;
    var result = html.replace(regex, function (match, linkOpen, linkHref, scriptOpen, scriptSrc) {
        var href = linkHref || scriptSrc;
        if (href && urlArray.some(function (url) { return href.includes(url); })) {
            var tag = linkOpen || scriptOpen;
            return "".concat(tag, " data-helappend=\"").concat(value, "\">");
        }
        else {
            return match;
        }
    });
    return result;
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
            file_path = node_path.join(__dirname, "../../../".concat(app_name, "/dist"), (_c = req.url) === null || _c === void 0 ? void 0 : _c.replace("/".concat(app_name), ""))
                // 有些图片有加上指定后缀处理，这里需要截取
                .split("?")[0];
        }
        else {
            file_path = node_path.join(__dirname, "../../../".concat(app_name, "/dist"), "index.html");
        }
        try {
            node_fs.accessSync(file_path, node_fs.constants.F_OK);
            var data = node_fs.readFileSync(file_path);
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

var addDataHelappendAttributeVueHtmlTransfromPlugin = function (options) {
    return {
        name: "add-data-hel-append-attribute-vue-html-transform",
        transformIndexHtml: function (html) {
            html = addDataHelappendAttribute(html, options);
            return html;
        },
    };
};

exports.addDataHelappendAttributeVueHtmlTransfromPlugin = addDataHelappendAttributeVueHtmlTransfromPlugin;
exports.createServer = createServer;
