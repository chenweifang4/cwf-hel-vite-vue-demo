"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseHtml = void 0;
var htmlparser2 = __importStar(require("htmlparser2"));
function parseHtml(html) {
    var isHeadOpen = true;
    var headAssetList = [];
    var bodyAssetList = [];
    function pushAsssetItem(item) {
        var data = item.data, toHead = item.toHead;
        var list = toHead ? headAssetList : bodyAssetList;
        var itemVar = __assign(__assign({}, data), { append: true });
        list.push(itemVar);
    }
    var tagDataList = [];
    function recordTagOpen(tag, attrs) {
        if (tag === "script") {
            // if (attrs.src && attrs.src.indexOf("vue@") > -1) {
            //   return;
            // }
            console.log("[parseHtml][recordTagOpen] attrs ", attrs, attrs.src);
            tagDataList.push({ data: { tag: tag, attrs: attrs, innerText: "" }, toHead: isHeadOpen });
        }
        if (tag === "link" && attrs.rel !== "icon") {
            tagDataList.push({ data: { tag: tag, attrs: attrs, innerText: "" }, toHead: isHeadOpen });
        }
    }
    function recordTagText(innerText) {
        var lastItem = tagDataList[tagDataList.length - 1];
        if (lastItem) {
            lastItem.innerText = lastItem.innerText + innerText;
        }
    }
    var parser = new htmlparser2.Parser({
        onopentag: recordTagOpen,
        ontext: recordTagText,
        onclosetag: function (tag) {
            if (tag === "head")
                isHeadOpen = false;
        },
    });
    parser.write(html);
    parser.end();
    tagDataList.forEach(pushAsssetItem);
    return {
        headAssetList: headAssetList,
        bodyAssetList: bodyAssetList,
    };
}
exports.parseHtml = parseHtml;
//# sourceMappingURL=hel-patch.js.map