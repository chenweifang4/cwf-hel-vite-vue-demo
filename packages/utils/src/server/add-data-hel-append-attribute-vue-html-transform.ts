import { addDataHelappendAttribute, AddDataHelappendAttributeOptions } from "./tools";
export const addDataHelappendAttributeVueHtmlTransfromPlugin = (
  options: AddDataHelappendAttributeOptions
) => {
  return {
    name: "add-data-hel-append-attribute-vue-html-transform",
    transformIndexHtml(html: string) {
      html = addDataHelappendAttribute(html, options);
      return html;
    },
  };
};
