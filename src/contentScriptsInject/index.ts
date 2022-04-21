/*
 * @Descripttion: 这部分代码，相当于content代码
 * @Author: xiangjun02
 * @Date: 2022-04-06 02:51:03
 * @LastEditors: xiangjun02
 * @LastEditTime: 2022-04-20 19:34:23
 */
// 读取某个配置想的所有文件

const files = ["test99.js", "main.js"];
import * as types from '../components/types'
const addScript = (src) => {
  // 在页面上插入script连接
  const script = document.createElement("script");
  script.setAttribute("type", "text/javascript");
  // 需要在web_accessible_resources中做相应配置
  script.setAttribute(
    "src",
    chrome.extension.getURL(`pageScriptsInject/${src}`)
  );
  return script;
};

let loadScript = null;
files.forEach((fileName, index) => {
  const script = addScript(fileName);
  if (index === 0) {
    loadScript = script;
  }
  document.documentElement.appendChild(script);
});

// 代码片段
window.dx001 = `contentScriptInject = index.js`;

function cLog(msg, action) {
  switch (action) {
    case "warning":
      console.log(`%c ${msg}`, "color: blue;font-size: 24px;");
      break;
    default:
      console.log(`%c ${msg}`, "color: blue;font-size: 24px;");
  }
}

window.cLog = cLog;
// 页面load后，加载配置信息
loadScript.addEventListener("load", () => {
  chrome.storage.local.get(
    ["ajaxInterceptor_switchOn", "ajaxInterceptor_rules"],
    (resultObj) => {
      cLog("index >> 页面load后，加载配置信息");
      console.log("script.addEventListener > load", resultObj);
      const result =  {
        [types.INTERCEPTO_RULES] : resultObj[types.INTERCEPTO_RULES],
        [types.SWITCH_ON] : resultObj[types.SWITCH_ON]
      };
      console.log("%c script.addEventListener>>>load", "color: blue;");
      console.log(result);
      if (result.hasOwnProperty("ajaxInterceptor_switchOn")) {
        postMessage({
          type: "ajaxInterceptor",
          to: "pageScript",
          key: "ajaxInterceptor_switchOn",
          value: result.ajaxInterceptor_switchOn,
        });
      }
      if (result.ajaxInterceptor_rules) {
        postMessage({
          type: "ajaxInterceptor",
          to: "pageScript",
          key: "ajaxInterceptor_rules",
          value: result.ajaxInterceptor_rules,
        });
      }
    }
  );
});

// ============ 以下为content内容 ============
let iframeLoaded = false;
// 接收background.js传来的信息，转发给pageScript
chrome.runtime.onMessage.addListener((msg) => {
  // cLog("index >> 接收background.js传来的信息，转发给pageScript ==== addListener");
  // console.log(`index.ts >> chrome.runtime.onMessage.addListener`, msg);
  if (msg.type === "ajaxInterceptor" && msg.to === "content") {
    if (msg.hasOwnProperty("iframeScriptLoaded")) {
      if (msg.iframeScriptLoaded) iframeLoaded = true;
    } else {
      postMessage({ ...msg, to: "pageScript" });
    }
  }
});


// 接收pageScript传来的信息，转发给iframe
window.addEventListener(
  "pageScript",
  (event) => {
    // cLog("index >> 接收pageScript传来的信息，转发给iframe ==== addEventListener");
    // console.log(`index.ts >> pageScript window.addEventListener`, event);
    if (iframeLoaded) {
      chrome.runtime.sendMessage({
        type: "ajaxInterceptor",
        to: "iframe",
        ...event.detail,
      });
    } else {
      let count = 0;
      const checktLoadedInterval = setInterval(() => {
        if (iframeLoaded) {
          clearInterval(checktLoadedInterval);
          chrome.runtime.sendMessage({
            type: "ajaxInterceptor",
            to: "iframe",
            ...event.detail,
          });
        }
        if (count++ > 500) {
          clearInterval(checktLoadedInterval);
        }
      }, 10);
    }
  },
  false
);

