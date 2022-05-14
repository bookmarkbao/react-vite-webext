// @ts-nocheck # 忽略全文
/*
 * @Descripttion: 这部分代码，相当于content代码
 * @Author: xiangjun02
 * @Date: 2022-04-06 02:51:03
 * @LastEditors: xiangjun02
 * @LastEditTime: 2022-04-20 19:34:23
 */
import { send } from "connect.io";
// 读取某个配置想的所有文件
const files = ["test99.js", "main.js"];
const addScript = (src) => {
  // 在页面上插入script连接
  const script = document.createElement("script");
  script.setAttribute("type", "text/javascript");
  // 需要在web_accessible_resources中做相应配置
  script.setAttribute("src", chrome.extension.getURL(`pageScriptsInject/${src}`));
  return script;
};

let firstScript = null;
files.forEach((fileName, index) => {
  const script = addScript(fileName);
  if (index === 1) {
    firstScript = script;
  }
  document.documentElement.appendChild(script);
});

firstScript.addEventListener("load", () => {
    // 通知替换xhr
    const myEvent = new Event("autoExecuteEvent");
    console.log(`=====执行firstScript`);
    window.dispatchEvent(myEvent);
});


