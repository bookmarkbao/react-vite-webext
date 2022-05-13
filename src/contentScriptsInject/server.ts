/**
 * 内容脚本同时也是一个 Server 端，用来执行扩展程序发送过来的命令
 */

import { createServer } from "connect.io";
// import st from "./st";
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
  console.log(window.document.title, 1234567)
  console.log(`66666`, text)
  resolve(window.document.title)
}

server.on("connect", (client) => {
  console.log(`前端connect`, 666666);
  client.on("get location", onGetLocation);
  client.on("translate", onTranslate);
});

export default server;
