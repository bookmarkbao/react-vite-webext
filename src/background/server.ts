/**
 * @files 用于处理其他页面发送过来的命令
 */
import { createServer, send } from "connect.io";
import { getCurrentTabId } from "~/utils";
console.log("启动了connect.io===background");
const server = createServer();

export const testSendToContext = async () => {
  const tabId = await getCurrentTabId();
  console.log(`send testSendToContext 9999`, tabId);
  send({
    id: await getCurrentTabId(),
    name: "translate",
    data: { name: 'hello' }
  });
  // clientInBackground.send("openContent", { type: "iframe", msg: "我来自iframeContent to content" });
};

/**
 * 复制文本到剪切板
 * @param {String} text
 */
export function onCopy(text: any) {
  // ga("send", "event", "复制文本");
  console.log(text, 9999);
  testSendToContext();
}

server.on("connect", (client) => {
  console.log(`background-server req 999`);
  client.on("get translate result", onCopy);
  client.on("play", onCopy);
  client.on("copy", onCopy);
  client.on("open options", onCopy);
  client.on("ga", onCopy);
});
export default server;
