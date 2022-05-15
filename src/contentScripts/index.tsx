// @ts-nocheck # 忽略全文
/*
 * @Descripttion:
 * @Author: xiangjun02
 * @Date: 2022-04-01 22:48:45
 * @LastEditors: xiangjun02
 * @LastEditTime: 2022-04-20 09:46:26
 */
import React, { useState } from "react";
import ReactDOM from "react-dom";
import browser from "webextension-polyfill";
// import { ContentApp } from "./views/ContentApp";
import { ContentIframe } from "./views/ContentIframe";
import store from "~/store/store";
import "./server";
import "./serverBridge";
import "./style.css";

const container = document.createElement("div");
container.setAttribute("id", "dxAjaxInterceptorRoot");

const root = document.createElement("div");
const styleEl = document.createElement("link");
const shadowDOM =
  container.attachShadow?.({ mode: __DEV__ ? "open" : "closed" }) ||
  container;
styleEl.setAttribute("rel", "stylesheet");
styleEl.setAttribute(
  "href",
  browser.runtime.getURL("dist/contentScripts/style.css")
);
shadowDOM.appendChild(styleEl);
shadowDOM.appendChild(root);
document.body.appendChild(container);


let setShowCall = () => {
};
const AppMain = () => {
  const [show, setShow] = useState(false);
  setShowCall = setShow;
  return (
    <>
      <ContentIframe show={show} />
      {false && <ContentApp onToggle={() => setShow(!show)} />}
    </>
  );
};
store.subscribe(() => {
  const rootDom = document.getElementById("dxAjaxInterceptorRoot")
  if(!rootDom) {
    document.body.appendChild(container);
  }
  console.log(1112222, store.getState());
  // setShow(store.getState().value)
  setShowCall(store.getState().value);
});

ReactDOM.render(
  <React.StrictMode>
    <AppMain />
  </React.StrictMode>,
  root
);
