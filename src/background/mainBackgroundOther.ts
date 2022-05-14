// @ts-nocheck # 忽略全文
import { sendMessage, onMessage } from "webext-bridge";
import browser, { Tabs } from "webextension-polyfill";

browser.runtime.onInstalled.addListener((): void => {
  // eslint-disable-next-line no-console
  console.log("Extension installed");
});

let previousTabId = 0;

// communication example: send previous tab title from background page
// see shim.d.ts for type declaration
browser.tabs.onActivated.addListener(async ({ tabId }) => {
  if (!previousTabId) {
    previousTabId = tabId;
    return;
  }

  let tab: Tabs.Tab;

  try {
    tab = await browser.tabs.get(previousTabId);
    previousTabId = tabId;
  } catch {
    return;
  }

  // eslint-disable-next-line no-console
  console.log("previous tab", tab);
  sendMessage(
    "tab-prev",
    { title: tab.title },
    { context: "content-script", tabId }
  );
  sendMessage(
    "get-todo-content",
    { code: "ok", msg: "保存成功", data: "get-todo >> onMessage", tabId },
    { context: "content-script", tabId }
  );
});

// sendMessage("get-todo-content", { title: tab.title }, { context: "content-script", tabId });
onMessage("get-todo", async () => {
  console.log("background >> get-todo");
  return { code: "ok", msg: "保存成功", data: "get-todo >> onMessage" };
});

// onMessage("get-current-tab", async () => {
//   try {
//     const tab = await browser.tabs.get(previousTabId);
//     return {
//       title: tab?.id,
//     };
//   } catch {
//     return {
//       title: undefined,
//     };
//   }
// });

// 接收iframe传来的信息，转发给content.js
// chrome.runtime.onMessage.addListener((msg, sender, callback) => {
browser.runtime.onMessage.addListener((msg, sender, callback) => {
  console.log("chrome.runtime.onMessage.addListener >>> ", msg);
  // 获取值
  chrome.storage.local.get(
    ["ajaxInterceptor_switchOn", "ajaxInterceptor_rules"],
    (result) => {
      if (result.hasOwnProperty("ajaxInterceptor_switchOn")) {
        callback && callback("ajaxInterceptor_switchOn");
        // if (result.ajaxInterceptor_switchOn) {
        //   chrome.browserAction.setIcon({path: "/images/16.png"});
        // } else {
        //   chrome.browserAction.setIcon({path: "/images/16_gray.png"});
        // }
      } else {
        callback && callback("nothing");
      }
    }
  );
  // 接收iframe传来的信息，转发给content.js
  chrome.runtime.onMessage.addListener((msg) => {
    if (msg.type === "ajaxInterceptor" && msg.to === "background") {
      // if (msg.key === "ajaxInterceptor_switchOn") {
      //   if (msg.value === true) {
      //     chrome.browserAction.setIcon({
      //       path: {
      //         16: "/images/16.png",
      //         32: "/images/32.png",
      //         48: "/images/48.png",
      //         128: "/images/128.png",
      //       },
      //     });
      //   } else {
      //     chrome.browserAction.setIcon({
      //       path: {
      //         16: "/images/16_gray.png",
      //         32: "/images/32_gray.png",
      //         48: "/images/48_gray.png",
      //         128: "/images/128_gray.png",
      //       },
      //     });
      //   }
      // }
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { ...msg, to: "content" });
      });
    }
  });
});
