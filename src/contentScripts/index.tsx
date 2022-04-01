/*
 * @Descripttion: 
 * @Author: xiangjun02
 * @Date: 2022-04-01 22:48:45
 * @LastEditors: xiangjun02
 * @LastEditTime: 2022-04-01 23:55:18
 */
/* eslint-disable no-console */
import React from "react";
import ReactDOM from "react-dom";
import { onMessage } from "webext-bridge";
import browser from "webextension-polyfill";
import { ContentApp } from "./views/ContentApp";
// import ContentApp from './views/Main'
// import ContentApp from './views/MainApp'
import './style.css'

// Firefox `browser.tabs.executeScript()` requires scripts return a primitive value
(() => {
  console.info("[vitesse-webext] Hello world from content script");

  // communication example: send previous tab title from background page
  onMessage("tab-prev", ({ data }) => {
    console.log(`[vitesse-webext] Navigate from page "${data}"`);
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

  ReactDOM.render(
    <React.StrictMode>
      <ContentApp />
    </React.StrictMode>,
    root
  );
})();
