/**
 * @description 根据文件扩展名获取 Content-Type
 * @param   {string}  file_path  [file_path description]
 * @return  {[type]}             [return description]
 */
export declare const getContentType: (file_path: string) => "text/html" | "text/css" | "text/javascript" | "application/json" | "image/png" | "image/jpg" | "application/octet-stream";
export interface AddDataHelappendAttributeOptions {
    urls: string | string[];
    value?: number;
}
export declare const addDataHelappendAttribute: (html: string, options: AddDataHelappendAttributeOptions) => string;
