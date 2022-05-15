// @ts-nocheck # 忽略全文
/*
 * @Descripttion:
 * @Author: xiangjun02
 * @Date: 2022-04-04 00:51:12
 * @LastEditors: xiangjun02
 * @LastEditTime: 2022-04-05 23:14:27
 */
import './server';
// only on dev mode
if (import.meta.hot) {
  // @ts-expect-error for background HMR
  import("/@vite/client");
  // load latest content script
  import("./contentScriptHMR");
}

// import("./mainBackgroundOther")
import("./mainBrowserAction")
