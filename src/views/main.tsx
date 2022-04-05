/*
 * @Descripttion: 
 * @Author: xiangjun02
 * @Date: 2022-04-04 00:51:22
 * @LastEditors: xiangjun02
 * @LastEditTime: 2022-04-05 21:26:39
 */
import "../styles";
import React from "react";
import ReactDOM from "react-dom";
import MainConent from "~/components/MainApp";
// import JsonViewDemos from "~/components/JsonViewDemos";

ReactDOM.render(
  <React.StrictMode>
    {/* <JsonViewDemos/> */}
    <MainConent />
  </React.StrictMode>,
  document.getElementById("root")
);
