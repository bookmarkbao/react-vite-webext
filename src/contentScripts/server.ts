/**
 * 内容脚本同时也是一个 Server 端，用来执行扩展程序发送过来的命令
 */

import { createServer } from "connect.io";
import store from "~/store/store";

const server = createServer();
console.log(`前端服务已经启动===111`);

/* istanbul ignore next */
/**
 * 将自己的 location 对象报告给后台
 * @param data
 * @param {Function} resolve
 */
export function onGetLocation(data: any, resolve: any) {
  // eslint-disable-next-line no-restricted-globals
  if (self === top) {
    // eslint-disable-next-line no-restricted-globals
    resolve(JSON.parse(JSON.stringify(location)));
  }
}

/**
 * 需要返回值时，参数resolve
 */
export function onTranslate(text: any, resolve: any) {
  //   st.query.text = getSelection().toString();
  //   st.safeTranslate();
  console.log("9999888888");
  store.dispatch({ type: 'switchOn' });
  // @ts-ignore
  resolve(window.document.title);
}

/**
 * content_script to injected_script
 * 第一种方法
 */
const testOne = (data: any) => {
  const myEvent = new CustomEvent("injectEvent", {
    detail: {
      ...data
    }
  });
  window.dispatchEvent(myEvent);
};

const textAutoExecuteXhr = () => {
  // 通知替换xhr
  const myEvent = new Event("autoExecuteEvent");
  console.log(`=====执行firstScript`);
  window.dispatchEvent(myEvent);
};

/**
 * content_script to injected_script
 * 第二种方法
 */
const customEvent = new CustomEvent("myCustomEvent");

// customEvent.initEvent('myCustomEvent', true, true);
function fireCustomEvent(data: any) {
  let hiddenDiv: HTMLElement = document.getElementById("myCustomEventDiv") as HTMLElement;
  hiddenDiv.innerText = data;
  hiddenDiv.dispatchEvent(customEvent);
}

/**
 * content_script to injected_script
 * 第三种方法
 */
const testPostMessage = () => {
  window.postMessage({
    type: "ajaxSwitchOn",
    value: true
  });
};


const openDebug = false;

/**
 * 数据保存到当前环境，同时保存到本地local。需要返回值
 */
export const saveToWin = (data: any, resolve: any) => {
  // @ts-ignore
  openDebug && fireCustomEvent("你好，我是普通JS！");
  openDebug && testPostMessage();
  openDebug && textAutoExecuteXhr();
  // console.log(`saveToWin`, data)
  testOne(data);
  resolve({ code: 0, msg: "同步成功" });
};


/**
 * 需要返回值时，参数resolve
 */
export function toggleIframe(text: any, resolve: any) {
  store.dispatch({ type: 'switchOn' });
  resolve({
    code: 0,
    siteTitle: window.document.title,
    server: "contentScript/server.ts"
  });
}


server.on("connect", (client) => {
  client.on("get location", onGetLocation);
  client.on("translate", onTranslate);
  client.on("toggle iframe", toggleIframe);
  client.on("update ajax interceptor", saveToWin);
});


export default server;
