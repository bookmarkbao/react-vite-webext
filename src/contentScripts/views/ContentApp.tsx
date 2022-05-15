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
import store from "~/store/store";

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

const refreshCurrentPage = () => {
  // @ts-ignore
  sendMessage("refresh-current-page", {
    type: "refresh",
    value: false
  });
};


export const ContentApp = (props: any) => {
  return (
    <div className="dxx-content">
      <Button onClick={() => {
        store.dispatch({type: 'switchBtn'})
      }
      }>toggleIframe</Button>
      <Button  type="primary" onClick={testClients}>
        connect.io test
      </Button>
      <Button type="primary" onClick={toggleSetIcon}>
        toggleSetIcon
      </Button>
      <Button onClick={refreshCurrentPage}>
        refreshCurrentPage
      </Button>
    </div>
  );
};


