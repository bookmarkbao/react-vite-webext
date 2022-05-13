/**
 * 内容脚本同时也是一个 Server 端，用来执行扩展程序发送过来的命令
 */

import { createServer } from "connect.io";
// import st from "./st";
const server = createServer();

/* istanbul ignore next */
/**
 * 将自己的 location 对象报告给后台
 * @param data
 * @param {Function} resolve
 */
export function onGetLocation(data, resolve) {
  if (self === top) {
    resolve(JSON.parse(JSON.stringify(location)));
  }
}

/**
 * 接收到翻译命令时，翻译网页上的拖蓝
 */
export function onTranslate() {
//   st.query.text = getSelection().toString();
//   st.safeTranslate();
}

server.on("connect", (client) => {
  client.on("get location", onGetLocation);
  client.on("translate", onTranslate);
});

export default server;
