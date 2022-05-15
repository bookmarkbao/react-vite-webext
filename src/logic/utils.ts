/*
 * @Descripttion:
 * @Author: xiangjun02
 * @Date: 2022-04-05 12:54:03
 * @LastEditors: xiangjun02
 * @LastEditTime: 2022-04-05 21:34:06
 */

export const toggleIframe = () => {

};

export const insertScript = () => {
  const script = document.createElement('script');
  script.setAttribute('type', 'text/javascript');
  script.setAttribute('src', chrome.extension.getURL('pageScripts/main.js'));
  document.documentElement.appendChild(script);
}

const utils = { toggleIframe };
export default utils;

