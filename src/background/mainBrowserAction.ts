// @ts-nocheck # 忽略全文
import { sendMessage, onMessage } from "webext-bridge";
import browser from "webextension-polyfill";
import { getCurrentTabId } from "~/utils";
import { send } from "connect.io";

browser.browserAction.onClicked.addListener(async (tab) => {
  const tabId = await getCurrentTabId();
  // sendMessage(
  //   "toggle iframe",
  //   { code: "ok", msg: "我是向军", data: "get-todo >> onMessage" },
  //   { context: "content-script", tabId }
  // );
  //
  send({
    id: await getCurrentTabId(),
    name: "toggle iframe",
    data: { name: "hello" }
  });
});

interface IconAction {
  type: string;
  value: boolean;
}

let switchIcon = false
onMessage("set-icon-browser-action", (action: IconAction) => {
  console.log("set-icon-browser-action", action);
  // switchIcon = action.value
  switchIcon = !switchIcon
  if (switchIcon) {
    browser.browserAction.setIcon({
      path: {
        16: "/assets/rocket.png",
        32: "/assets/rocket.png",
        48: "/assets/rocket.png",
        128: "/assets/rocket.png"
      }
    });
  } else {
    browser.browserAction.setIcon({
      path: {
        16: "/assets/rocket-gray.png",
        32: "/assets/rocket-gray.png",
        48: "/assets/rocket-gray.png",
        128: "/assets/rocket-gray.png"
      }
    });
  }
});


// 监听刷新页面
onMessage("refresh-current-page",async ()=>{
  const tabId = await getCurrentTabId()
  browser.tabs
    .executeScript(tabId, {
      code: ``,
      runAt: "document_end",
    })
    .then(() => {
      browser.tabs.reload(tabId)
    })
})

chrome.storage.local.get(["ajaxInterceptor_switchOn", "ajaxInterceptor_rules"], (result) => {
  if (result.hasOwnProperty("ajaxInterceptor_switchOn")) {
    if (result.ajaxInterceptor_switchOn) {
      // chrome.browserAction.setIcon({path: "/images/16.png"});
    } else {
      // chrome.browserAction.setIcon({path: "/images/16_gray.png"});
    }
  }
});
