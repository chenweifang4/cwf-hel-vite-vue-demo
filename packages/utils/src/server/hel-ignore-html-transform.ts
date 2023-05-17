export const helIgnoreVueHtmlTransfromPlugin = (src: string) => {
  return {
    name: "hel-ignore-vue-html-transform",
    transformIndexHtml(html: string) {
      html = html.replace(
        `<script src="${src}"></script>`,
        `<script data-helappend="0" src="${src}"></script>`
      );
      return html;
    },
  };
};
