/*
 * @Descripttion:
 * @Author: xiangjun02
 * @Date: 2022-04-05 21:33:25
 * @LastEditors: xiangjun02
 * @LastEditTime: 2022-04-06 02:01:45
 */
function log() {
  console.log("react>>>", ...arguments);
}

const initTest = {
  ajaxInterceptor_switchOn: true,
  ajaxInterceptor_rules: [
    {
      key: "dc8c1ac5-bf95-4588-ac30-0e6977aceb02",
      label: "url9",
      match: "/sugrec",
      overrideTxt:
        '{\n    "q": "测试",\n    "p": false,\n    "g": [\n        {\n            "type": "sug",\n            "sa": "s_1",\n            "q": "测试抑郁程度的问卷"\n        },\n        {\n            "type": "sug",\n            "sa": "s_2",\n            "q": "测试工程师"\n        },\n        {\n            "type": "sug",\n            "sa": "s_3",\n            "q": "测试人格"\n        },\n        {\n            "type": "sug",\n            "sa": "s_4",\n            "q": "测试怀孕的试纸图片一深一浅"\n        },\n        {\n            "type": "sug",\n            "sa": "s_5",\n            "q": "测试怀孕的试纸怎么看"\n        },\n        {\n            "type": "sug",\n            "sa": "s_6",\n            "q": "测试用例模板和例子"\n        },\n        {\n            "type": "sug",\n            "sa": "s_7",\n            "q": "测试怀孕什么时候最准确"\n        },\n        {\n            "type": "sug",\n            "sa": "s_8",\n            "q": "测试网速"\n        },\n        {\n            "type": "sug",\n            "sa": "s_9",\n            "q": "测试用例"\n        },\n        {\n            "type": "sug",\n            "sa": "s_10",\n            "q": "测试怀孕最早几天可以查出来"\n        }\n    ],\n    "slid": "102820935623092",\n    "queryid": "0xe5d83dd57e1b4"\n}',
      switchOn: true,
    },
  ],
};
// 命名空间
let ajax_interceptor_qoweifjqon = {
  settings: {
    ajaxInterceptor_switchOn: false,
    ajaxInterceptor_rules: [],
    ...initTest,
  },
  originalXHR: window.XMLHttpRequest,
  myXHR: function () {
    let pageScriptEventDispatched = false;
    const modifyResponse = () => {
      ajax_interceptor_qoweifjqon.settings.ajaxInterceptor_rules.forEach(
        ({
          filterType = "normal",
          switchOn = true,
          match,
          overrideTxt = "",
        }) => {
          let matched = false;
          log("myXHR modifyResponse >> ", this.responseURL, match);
          if (switchOn && match) {
            if (
              filterType === "normal" &&
              this.responseURL.indexOf(match) > -1
            ) {
              matched = true;
            } else if (
              filterType === "regex" &&
              this.responseURL.match(new RegExp(match, "i"))
            ) {
              matched = true;
            }
          }
          if (matched) {
            this.responseText = overrideTxt;
            this.response = overrideTxt;

            if (!pageScriptEventDispatched) {
              window.dispatchEvent(
                new CustomEvent("pageScript", {
                  detail: { url: this.responseURL, match },
                })
              );
              pageScriptEventDispatched = true;
            }
          }
        }
      );
    };

    const xhr = new ajax_interceptor_qoweifjqon.originalXHR();
    for (let attr in xhr) {
      if (attr === "onreadystatechange") {
        xhr.onreadystatechange = (...args) => {
          if (this.readyState == 4) {
            // 请求成功
            if (ajax_interceptor_qoweifjqon.settings.ajaxInterceptor_switchOn) {
              // 开启拦截
              modifyResponse();
            }
          }
          this.onreadystatechange && this.onreadystatechange.apply(this, args);
        };
        continue;
      } else if (attr === "onload") {
        xhr.onload = (...args) => {
          // 请求成功
          if (ajax_interceptor_qoweifjqon.settings.ajaxInterceptor_switchOn) {
            // 开启拦截
            modifyResponse();
          }
          this.onload && this.onload.apply(this, args);
        };
        continue;
      }

      if (typeof xhr[attr] === "function") {
        this[attr] = xhr[attr].bind(xhr);
      } else {
        // responseText和response不是writeable的，但拦截时需要修改它，所以修改就存储在this[`_${attr}`]上
        if (attr === "responseText" || attr === "response") {
          Object.defineProperty(this, attr, {
            get: () =>
              this[`_${attr}`] == undefined ? xhr[attr] : this[`_${attr}`],
            set: (val) => (this[`_${attr}`] = val),
            enumerable: true,
          });
        } else {
          Object.defineProperty(this, attr, {
            get: () => xhr[attr],
            set: (val) => (xhr[attr] = val),
            enumerable: true,
          });
        }
      }
    }
  },

  originalFetch: window.fetch.bind(window),
  myFetch: function (...args) {
    return ajax_interceptor_qoweifjqon
      .originalFetch(...args)
      .then((response) => {
        let txt = undefined;
        ajax_interceptor_qoweifjqon.settings.ajaxInterceptor_rules.forEach(
          ({
            filterType = "normal",
            switchOn = true,
            match,
            overrideTxt = "",
          }) => {
            let matched = false;
            // log('myFetch XMLHttpRequest >> ', response.url, match)
            // log('myFetch XMLHttpRequest matched>> ', response.url.indexOf(match) > -1)
            if (switchOn && match) {
              if (filterType === "normal" && response.url.indexOf(match) > -1) {
                matched = true;
              } else if (
                filterType === "regex" &&
                response.url.match(new RegExp(match, "i"))
              ) {
                matched = true;
              }
            }

            if (matched) {
              window.dispatchEvent(
                new CustomEvent("pageScript", {
                  detail: { url: response.url, match },
                })
              );
              log("myFetch matched pageScript>>", { url: response.url, match });
              log("myFetch matched txt>>", JSON.parse(overrideTxt));
              txt = overrideTxt;
            }
          }
        );

        if (txt !== undefined) {
          // 走代理结果
          const stream = new ReadableStream({
            start(controller) {
              // const bufView = new Uint8Array(new ArrayBuffer(txt.length));
              // for (var i = 0; i < txt.length; i++) {
              //   bufView[i] = txt.charCodeAt(i);
              // }
              controller.enqueue(new TextEncoder().encode(txt));
              controller.close();
            },
          });

          const newResponse = new Response(stream, {
            headers: response.headers,
            status: response.status,
            statusText: response.statusText,
          });
          const proxy = new Proxy(newResponse, {
            get: function (target, name) {
              switch (name) {
                case "ok":
                case "redirected":
                case "type":
                case "url":
                case "useFinalURL":
                case "body":
                case "bodyUsed":
                  return response[name];
              }
              return target[name];
            },
          });

          for (let key in proxy) {
            if (typeof proxy[key] === "function") {
              proxy[key] = proxy[key].bind(newResponse);
            }
          }
          log("myFetch matched proxy>>", proxy);
          log("myFetch matched txt>>", newResponse);

          return proxy;
        } else {
          return response;
        }
      });
  },
};
console.log("ajax_interceptor_qoweifjqon start", ajax_interceptor_qoweifjqon);
// 从background，iframe过来的信息，更新内容
window.addEventListener(
  "message",
  function (event) {
    const data = event.data;
    console.log("react window.addEventListener >> message", data);
    if (data.type === "ajaxInterceptor" && data.to === "pageScript") {
      ajax_interceptor_qoweifjqon.settings[data.key] = data.value;
    }
    console.log("ajax_interceptor_qoweifjqon >>", ajax_interceptor_qoweifjqon);
    window.xiangjun9999 = 'xiangjun9999'
    if (ajax_interceptor_qoweifjqon.settings.ajaxInterceptor_switchOn) {
      console.log("myXHR > window.XMLHttpRequest", window.XMLHttpRequest);
      console.log("myFetch > window.fetch", window.fetch);
      window.XMLHttpRequest = ajax_interceptor_qoweifjqon.myXHR;
      window.fetch = ajax_interceptor_qoweifjqon.myFetch;
    } else {
      window.XMLHttpRequest = ajax_interceptor_qoweifjqon.originalXHR;
      window.fetch = ajax_interceptor_qoweifjqon.originalFetch;
      console.log("originalXHR > window.XMLHttpRequest", window.XMLHttpRequest);
      console.log("originalFetch > window.fetch", window.fetch);
    }
  },
  false
);

// ============ 以下为content内容 ============
let iframeLoaded = false;
// 接收background.js传来的信息，转发给pageScript
chrome.runtime.onMessage.addListener((msg) => {
  if (msg.type === "ajaxInterceptor" && msg.to === "content") {
    if (msg.hasOwnProperty("iframeScriptLoaded")) {
      if (msg.iframeScriptLoaded) iframeLoaded = true;
    } else {
      postMessage({ ...msg, to: "pageScript" });
    }
  }
});

// 接收pageScript传来的信息，转发给iframe
window.addEventListener(
  "pageScript",
  function (event) {
    if (iframeLoaded) {
      chrome.runtime.sendMessage({
        type: "ajaxInterceptor",
        to: "iframe",
        ...event.detail,
      });
    } else {
      let count = 0;
      const checktLoadedInterval = setInterval(() => {
        if (iframeLoaded) {
          clearInterval(checktLoadedInterval);
          chrome.runtime.sendMessage({
            type: "ajaxInterceptor",
            to: "iframe",
            ...event.detail,
          });
        }
        if (count++ > 500) {
          clearInterval(checktLoadedInterval);
        }
      }, 10);
    }
  },
  false
);

