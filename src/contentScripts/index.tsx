/*
 * @Descripttion:
 * @Author: xiangjun02
 * @Date: 2022-04-01 22:48:45
 * @LastEditors: xiangjun02
 * @LastEditTime: 2022-04-20 09:46:26
 */
/* eslint-disable no-console */
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { onMessage } from "webext-bridge";
import browser from "webextension-polyfill";
import { ContentApp } from "./views/ContentApp";
import { ContentIframe } from "./views/ContentIframe";
// import './views/injectScript'

// 执行代码注入
// import './views/ajaxInterceptor'

// import ContentApp from './views/Main'
// import ContentApp from './views/MainApp'
import "./style.css";

// Firefox `browser.tabs.executeScript()` requires scripts return a primitive value
(() => {
  // console.info("[vitesse-webext] Hello world from content script");

  // communication example: send previous tab title from background page
  onMessage("tab-prev", ({ data }) => {
    console.log(`[vitesse-webext-xiangjun] Navigate from page "${data}"`);
  });
  onMessage("get-todo-content", (data) => {
    console.log(`[get-todo-content] Navigate from page "${data}"`, data);
  });

  // mount component to context window
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
  // 接收来自iframe的触发
  chrome.runtime.onMessage.addListener((msg, sender) => {
    if (msg === "toggle") {
      window.setToggleIframe && window.setToggleIframe();
    }
  });
  const AppMain = () => {
    const [show, setShow] = useState(false);
    window.setToggleIframe = () => setShow(!show); // 永远是最新的
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
})();

