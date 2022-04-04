/*
 * @Descripttion: 
 * @Author: xiangjun02
 * @Date: 2022-04-01 22:48:45
 * @LastEditors: xiangjun02
 * @LastEditTime: 2022-04-04 00:42:28
 */
import { Button } from 'antd';
import './content'
export const ContentApp = () => {
  return <div className="dx-content">Hey!
    <Button type="primary">Primary Button</Button>
    <Button>Default Button</Button>
    <Button type="dashed">Dashed Button</Button>
    <br />
    <Button type="text">Text Button</Button>
    <Button type="link">Link Button</Button>
  </div>;
};
