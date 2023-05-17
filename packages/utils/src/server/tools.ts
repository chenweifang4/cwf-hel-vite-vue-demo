import { extname } from "node:path";

/**
 * @description 根据文件扩展名获取 Content-Type
 * @param   {string}  file_path  [file_path description]
 * @return  {[type]}             [return description]
 */
export const getContentType = (file_path: string) => {
  const ext_name = extname(file_path);
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
