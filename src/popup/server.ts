/**
 * @files 用于处理其他页面发送过来的命令
 */
import { createServer } from "connect.io";
console.log('启动了connect.io===background')
const server = createServer();
/**
 * 复制文本到剪切板
 * @param {String} text
 */
export function onCopy(text:any) {
  // ga("send", "event", "复制文本");
  console.log(text, 12345678)
}

server.on("connect", (client) => {
  client.on("openPopup", onCopy);
});
export default server;
