/*
 * @Descripttion:
 * @Author: xiangjun02
 * @Date: 2022-04-04 00:41:45
 * @LastEditors: xiangjun02
 * @LastEditTime: 2022-04-05 13:27:50
 */
// let iframeLoaded = false;

let show = false;
let iframe = document.createElement("iframe");;
let iframeFn = () => {
  show = !show;
  iframe.style.setProperty(
    "transform",
    show ? "translateX(0)" : `translateX(${iframeW + 20}px)`,
    "important"
  );
};
const iframeW = 850
// const iframeW = 320;
let initFinished = true
// 只在最顶层页面嵌入iframe
if (window.self === window.top && !initFinished) {
  initFinished = true
  document.onreadystatechange = () => {
    if (document.readyState === "complete") {
      // iframe = document.createElement("iframe");
      iframe.className = "api-interceptor";
      iframe.style.setProperty("height", "100%", "important");
      iframe.style.setProperty("width", `${iframeW}px`, "important");
      iframe.style.setProperty("min-width", "1px", "important");
      iframe.style.setProperty("position", "fixed", "important");
      iframe.style.setProperty("top", "0", "important");
      iframe.style.setProperty("right", "0", "important");
      iframe.style.setProperty("left", "auto", "important");
      iframe.style.setProperty("bottom", "auto", "important");
      iframe.style.setProperty("z-index", "9999999999999", "important");
      iframe.style.setProperty(
        "transform",
        `translateX(${iframeW + 20}px)`,
        "important"
      );
      iframe.style.setProperty("transition", "all .4s", "important");
      iframe.style.setProperty(
        "box-shadow",
        "0 0 15px 2px rgba(0,0,0,0.12)",
        "important"
      );
      iframe.frameBorder = "none";
      iframe.src = chrome.extension.getURL("./dist/views/index.html");
      document.body.appendChild(iframe);
      // iframeFn()

      chrome.runtime.onMessage.addListener((msg) => {
        if (msg === 'toggle') {
          iframeFn()
        }
        return true;
      });
    }
  };
}

// 接收background.js传来的信息，转发给pageScript
// chrome.runtime.onMessage.addListener(msg => {
//   console.log("接收background.js传来的信息，转发给pageScript >>", msg)
//   if (msg.type === 'ajaxInterceptor' && msg.to === 'content') {
//     if (msg.hasOwnProperty('iframeScriptLoaded')) {
//       if (msg.iframeScriptLoaded) iframeLoaded = true;
//     } else {
//       postMessage({...msg, to: 'pageScript'});
//     }
//   }
// });

// 接收pageScript传来的信息，转发给iframe
// window.addEventListener("pageScript", function(event) {
//   console.log("接收pageScript传来的信息，转发给iframe >> ", msg)
//   if (iframeLoaded) {
//     chrome.runtime.sendMessage({type: 'ajaxInterceptor', to: 'iframe', ...event.detail});
//   } else {
//     let count = 0;
//     const checktLoadedInterval = setInterval(() => {
//       if (iframeLoaded) {
//         clearInterval(checktLoadedInterval);
//         chrome.runtime.sendMessage({type: 'ajaxInterceptor', to: 'iframe', ...event.detail});
//       }
//       if (count ++ > 500) {
//         clearInterval(checktLoadedInterval);
//       }
//     }, 10);
//   }
// }, false);
//eslint-disable-next-line
export default { iframeFn, iframe };

