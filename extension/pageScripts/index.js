/*
 * @Descripttion: 这部分代码，相当于content代码
 * @Author: xiangjun02
 * @Date: 2022-04-06 02:51:03
 * @LastEditors: xiangjun02
 * @LastEditTime: 2022-04-19 00:34:35
 */
// 在页面上插入代码
const script = document.createElement('script');
script.setAttribute('type', 'text/javascript');
// eslint-disable-next-line no-undef
script.setAttribute('src', chrome.extension.getURL('pageScriptsInject/main.js'));
document.documentElement.appendChild(script);
script.addEventListener('load', () => {
  // 从content向网页发出的通信
  // eslint-disable-next-line no-undef
  chrome.storage.local.get(['settings','ajaxInterceptor_switchOn', 'ajaxInterceptor_rules'], (resultObj) => {
    const result = resultObj.settings || {}
    console.log('script.addEventListener>>>load', result);
    if (result.hasOwnProperty('ajaxInterceptor_switchOn')) {
      postMessage({type: 'ajaxInterceptor', to: 'pageScript', key: 'ajaxInterceptor_switchOn', value: result.ajaxInterceptor_switchOn});
    }
    if (result.ajaxInterceptor_rules) {
      postMessage({type: 'ajaxInterceptor', to: 'pageScript', key: 'ajaxInterceptor_rules', value: result.ajaxInterceptor_rules});
    }
  });
});



// ============ 以下为content内容 ============
let iframeLoaded = false;
// 接收background.js传来的信息，转发给pageScript
// eslint-disable-next-line no-undef
chrome.runtime.onMessage.addListener((msg) => {
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
  function (event) {
    if (iframeLoaded) {
      // eslint-disable-next-line no-undef
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
          // eslint-disable-next-line no-undef
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

window.love = '123456love'
