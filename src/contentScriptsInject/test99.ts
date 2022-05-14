/*
 * @Descripttion:
 * @Author: xiangjun02
 * @Date: 2022-04-19 01:22:05
 * @LastEditors: xiangjun02
 * @LastEditTime: 2022-04-19 01:40:17
 */
// import { Ajax_Interceptor_Dx } from "~/const";

console.log("开启test99 === 通过自定义DOM事件来实现");
const testDebug = true;
// 第一种方式实验- 通过
// 支持window.postMessage 或 window.dispatchEvent(myEvent)
window.addEventListener("injectEvent", function(params: any) {
  const { key, value } = params.detail;
  // @ts-ignore
  ajax_interceptor_dx.settings[key] = value;
   // @ts-ignore
  console.log(`settings===update`,ajax_interceptor_dx.settings)
  if (typeof value === "string") {
    localStorage.setItem(key, value);
  } else {
    localStorage.setItem(key, JSON.stringify(value));
  }
});

// 第二种实验方式- 通过
let hiddenDiv = document.getElementById("myCustomEventDiv");
if (!hiddenDiv) {
  hiddenDiv = document.createElement("div");
  hiddenDiv.setAttribute("id", "myCustomEventDiv");
  hiddenDiv.style.display = "none";
  document.body.appendChild(hiddenDiv);
}
hiddenDiv.addEventListener("myCustomEvent", function() {
  // @ts-ignore
  const eventData = document.getElementById("myCustomEventDiv").innerText;
  testDebug && console.log("收到自定义事件消息：" + eventData);
});

// 第三种
window.addEventListener("message", (e) => {
  testDebug && console.log("postMessage", e);
});
console.log("开启test99 === 通过自定义DOM事件来实现");
