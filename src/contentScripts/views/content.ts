/*
 * @Descripttion: 
 * @Author: xiangjun02
 * @Date: 2022-04-04 00:41:45
 * @LastEditors: xiangjun02
 * @LastEditTime: 2022-04-04 18:28:42
 */


let iframe;
// const iframeW = 850
const iframeW = 320
// 只在最顶层页面嵌入iframe
if (window.self === window.top) {
  document.onreadystatechange = () => {
    if (document.readyState === 'complete') {
      iframe = document.createElement('iframe'); 
      iframe.className = "api-interceptor";
      iframe.style.setProperty('height', '100%', 'important');
      iframe.style.setProperty('width', `${iframeW}px`, 'important');
      iframe.style.setProperty('min-width', '1px', 'important');
      iframe.style.setProperty('position', 'fixed', 'important');
      iframe.style.setProperty('top', '0', 'important');
      iframe.style.setProperty('right', '0', 'important');
      iframe.style.setProperty('left', 'auto', 'important');
      iframe.style.setProperty('bottom', 'auto', 'important');
      iframe.style.setProperty('z-index', '9999999999999', 'important');
      iframe.style.setProperty('transform', `translateX(${iframeW+20}px)`, 'important');
      iframe.style.setProperty('transition', 'all .4s', 'important');
      iframe.style.setProperty('box-shadow', '0 0 15px 2px rgba(0,0,0,0.12)', 'important');
      iframe.frameBorder = "none"; 
      iframe.src = chrome.extension.getURL("./dist/views/index.html")
      document.body.appendChild(iframe);
      let show = true;
      iframe.style.setProperty('transform', show ? 'translateX(0)' : `translateX(${iframeW+20}px)`, 'important');
    }
  }
}