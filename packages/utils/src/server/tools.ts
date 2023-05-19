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

export interface AddDataHelappendAttributeOptions {
  urls: string | string[];
  value?: number; // 0, 1
}

export const addDataHelappendAttribute = (
  html: string,
  options: AddDataHelappendAttributeOptions
): string => {
  const { urls, value = 0 } = options;
  const urlArray = Array.isArray(urls) ? urls : [urls];
  const regex =
    /(<link[^>]*rel="(?:stylesheet|modulepreload)"[^>]*href="([^"]+)")[^>]*>|(<script[^>]*src="([^"]+)")[^>]*>/gi;

  // /(<link[^>]*rel="(?:stylesheet|modulepreload)"[^>]*href="([^"]+)")[^>]*>|(<script[^>]*type="module"[^>]*src="([^"]+)")[^>]*>|(<script[^>]*nomodule[^>]*src="([^"]+)")[^>]*>/gi;
  const result = html.replace(regex, (match, linkOpen, linkHref, scriptOpen, scriptSrc) => {
    const href = linkHref || scriptSrc;
    if (href && urlArray.some((url: string) => href.includes(url))) {
      const tag = linkOpen || scriptOpen;
      return `${tag} data-helappend="${value}">`;
    } else {
      return match;
    }
  });
  return result;
};
