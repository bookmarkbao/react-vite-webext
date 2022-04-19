/*
 * @Descripttion:
 * @Author: xiangjun02
 * @Date: 2022-04-04 00:26:09
 * @LastEditors: xiangjun02
 * @LastEditTime: 2022-04-19 15:33:20
 */
import { isFirefox, isForbiddenUrl } from "~/env";
import browser from "webextension-polyfill";


// Firefox fetch files from cache instead of reloading changes from disk,
// hmr will not work as Chromium based browser
browser.webNavigation.onCommitted.addListener(({ tabId, frameId, url }) => {
  // Filter out non main window events.
  if (frameId !== 0) return;

  if (isForbiddenUrl(url)) return;

  // inject the latest scripts
  // browser.tabs
  //   .executeScript(tabId, {
  //     file: `${isFirefox ? "" : "."}/pageScripts/index.js`,
  //     runAt: "document_end",
  //   })
  //   .catch((error) => console.error(error));
  browser.tabs
    .executeScript(tabId, {
      file: `${isFirefox ? "" : "."}/pageScriptsInject/index.js`,
      runAt: "document_end",
    })
    .catch((error) => console.error(error));
  browser.tabs
    .executeScript(tabId, {
      file: `${isFirefox ? "" : "."}/dist/contentScripts/index.global.js`,
      runAt: "document_end",
    })
    .catch((error) => console.error(error));
});

