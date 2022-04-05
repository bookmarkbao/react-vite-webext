/*
 * @Descripttion:
 * @Author: xiangjun02
 * @Date: 2022-04-05 12:54:03
 * @LastEditors: xiangjun02
 * @LastEditTime: 2022-04-05 14:40:55
 */
export const toggleIframe = () => {
  console.log("toggleIframe >> chrome.tabs.query");
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, "toggle");
  });
};

const utils = { toggleIframe };
export default utils;

