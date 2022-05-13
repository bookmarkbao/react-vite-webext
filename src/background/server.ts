/**
 * @files 用于处理其他页面发送过来的命令
 */
import { createServer } from "connect.io";
import chromeCall from "chrome-call";
console.log('启动了connect.io===background')
const server = createServer();

/**
 * 复制文本到剪切板
 * @param {String} text
 */
export function onCopy(text) {
  // ga("send", "event", "复制文本");
  console.log(text, 9999)
}

server.on("connect", (client) => {
  console.log(`background-server req 999`)
  client.on("get translate result", onCopy);
  client.on("play", onCopy);
  client.on("copy", onCopy);
  client.on("open options", onCopy);
  client.on("ga", onCopy);
});
export default server;
