/*
 * @Descripttion: 
 * @Author: xiangjun02
 * @Date: 2022-04-08 10:40:27
 * @LastEditors: xiangjun02
 * @LastEditTime: 2022-04-19 01:00:53
 */
// 在页面上插入代码
const script = document.createElement('script');
script.setAttribute('type', 'text/javascript');
// eslint-disable-next-line no-undef
script.setAttribute('src', chrome.extension.getURL('pageScriptsInject/main.js'));
// script.setAttribute('src', chrome.extension.getURL('pageScripts/inject.js'));
document.documentElement.appendChild(script);
