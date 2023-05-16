import * as htmlparser2 from "htmlparser2";
import type { IAssetItem, IAssetItemAttrs } from "hel-types";

export function parseHtml(html: string) {
  let isHeadOpen = true;
  const headAssetList: IAssetItem[] = [];
  const bodyAssetList: IAssetItem[] = [];

  function pushAsssetItem(item: {
    data: { tag: string; attrs: IAssetItemAttrs; innerText: string };
    toHead: boolean;
  }) {
    const { data, toHead } = item;
    const list = toHead ? headAssetList : bodyAssetList;
    const itemVar: any = { ...data, append: true };
    list.push(itemVar);
  }

  const tagDataList: any = [];
  function recordTagOpen(tag: string, attrs: any) {
    if (tag === "script") {
      if (attrs.src && attrs.src.indexOf("vue@") > -1) {
        return;
      }
      // console.log("[parseHtml][recordTagOpen] attrs ", attrs, attrs.src);
      tagDataList.push({ data: { tag, attrs, innerText: "" }, toHead: isHeadOpen });
    }
    if (tag === "link" && attrs.rel !== "icon") {
      tagDataList.push({ data: { tag, attrs, innerText: "" }, toHead: isHeadOpen });
    }
  }
  function recordTagText(innerText: string) {
    const lastItem = tagDataList[tagDataList.length - 1];
    if (lastItem) {
      lastItem.innerText = lastItem.innerText + innerText;
    }
  }

  const parser = new htmlparser2.Parser({
    onopentag: recordTagOpen,
    ontext: recordTagText,
    onclosetag(tag) {
      if (tag === "head") isHeadOpen = false;
    },
  });
  parser.write(html);
  parser.end();

  tagDataList.forEach(pushAsssetItem);
  return {
    headAssetList,
    bodyAssetList,
  };
}
