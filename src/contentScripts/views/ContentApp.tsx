/*
 * @Descripttion:
 * @Author: xiangjun02
 * @Date: 2022-04-01 22:48:45
 * @LastEditors: xiangjun02
 * @LastEditTime: 2022-04-05 14:11:56
 */
import { Button } from "antd";
export const ContentApp = (props) => {
  const { onToggle } = props;
  return (
    <div className="dxx-content">
      Hey!
      <Button type="primary" onClick={() => onToggle()}>
        Primary Button
      </Button>
      <Button onClick={() => onToggle()}>toggleIframe</Button>
      <Button type="dashed">Dashed Button</Button>
      <br />
      <Button type="text">Text Button</Button>
      <Button type="link">Link Button</Button>
    </div>
  );
};

