/*
 * @Descripttion:
 * @Author: xiangjun02
 * @Date: 2022-04-01 22:48:45
 * @LastEditors: xiangjun02
 * @LastEditTime: 2022-04-20 09:21:37
 */
import { Button } from "antd";
export const ContentApp = (props) => {
  const { onToggle } = props;
  return (
    <div className="dxx-content">
      <Button onClick={() => onToggle()}>toggleIframe</Button>
    </div>
  );
};

