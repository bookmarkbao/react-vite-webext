/*
 * @Descripttion:
 * @Author: xiangjun02
 * @Date: 2022-04-01 22:48:45
 * @LastEditors: xiangjun02
 * @LastEditTime: 2022-04-20 09:21:37
 */
import { Button } from "antd";
import "./server";
import client from "~/contentScriptsInject/client";
import { sendMessage } from "webext-bridge";

const testClients = () => {
  client.send("open options", { type: "content", msg: "我是来自page content元素的哟 666" });
  console.log(`发送了open options`, "我是来自page content元素的哟 666");
};
const toggleSetIcon = () => {
  // @ts-ignore
  sendMessage("set-icon-browser-action", {
    type: "switchBtn",
    value: false
  });
};
export const ContentApp = (props: any) => {
  const { onToggle } = props;
  // @ts-ignore
  // const [icon, setIcon] = useEffect(true);
  return (
    <div className="dxx-content">
      <Button onClick={() => onToggle()}>toggleIframe</Button>
      <Button type="primary" onClick={testClients}>
        connect.io test
      </Button>
      <Button type="primary" onClick={toggleSetIcon}>
        toggleSetIcon
      </Button>
    </div>
  );
};


