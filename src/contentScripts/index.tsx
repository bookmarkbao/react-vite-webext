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
import { ContentApp } from "./views/ContentApp";
import { ContentIframe } from "./views/ContentIframe";
import "./server";
import "./style.css";

const container = document.createElement("div");
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
const AppMain = () => {
  const [show, setShow] = useState(false);
  console.log(`appMain`, show)
  return (
    <>
      <ContentIframe show={show} />
      <ContentApp onToggle={() => setShow(!show)} />
    </>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <AppMain />
  </React.StrictMode>,
  root
);
