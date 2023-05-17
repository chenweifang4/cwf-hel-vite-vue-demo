import * as htmlparser2 from 'htmlparser2';

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise */


var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

var parseHtml = function (html) {
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
            // console.log("[parseHtml][recordTagOpen] attrs ", attrs, attrs.src);
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
};

export { parseHtml };
