"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getContentType = void 0;
var node_path_1 = require("node:path");
/**
 * @description 根据文件扩展名获取 Content-Type
 * @param   {string}  file_path  [file_path description]
 * @return  {[type]}             [return description]
 */
var getContentType = function (file_path) {
    var ext_name = (0, node_path_1.extname)(file_path);
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
exports.getContentType = getContentType;
//# sourceMappingURL=tools.js.map