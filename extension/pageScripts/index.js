// 在页面上插入代码
const script = document.createElement('script');
script.setAttribute('type', 'text/javascript');
// eslint-disable-next-line no-undef
script.setAttribute('src', chrome.extension.getURL('pageScripts/main.js'));
document.documentElement.appendChild(script);

script.addEventListener('load', () => {
  // eslint-disable-next-line no-undef
  chrome.storage.local.get(['ajaxInterceptor_switchOn', 'ajaxInterceptor_rules'], (result) => {
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