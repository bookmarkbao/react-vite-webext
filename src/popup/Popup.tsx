/*
 * @Descripttion:
 * @Author: xiangjun02
 * @Date: 2022-04-01 22:48:45
 * @LastEditors: xiangjun02
 * @LastEditTime: 2022-04-05 14:43:10
 */
import "antd/dist/antd.css";
import { Button } from "antd";
import { sendMessage } from "webext-bridge";
import { toggleIframe } from "~/logic/utils";
export const Popup = () => {
  const getTodo = async () => {
    console.log("getTodo>>", sendMessage);
    const result = await sendMessage("get-todo");
    console.log("getTodo >> sendMessage >> result", result);
  };
  return (
    <div>
      Hey i am daxiang!
      <Button type="primary" onClick={() => getTodo()}>
        get-todo
      </Button>
      <Button type="primary" onClick={() => toggleIframe()}>
        toggleIframe
      </Button>
    </div>
  );
};

