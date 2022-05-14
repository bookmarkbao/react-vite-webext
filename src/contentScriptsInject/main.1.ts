// @ts-nocheck # 忽略全文
import { Ajax_Interceptor_Dx } from "~/const";

let reqApiResult = [];
const bucketStore = new Map();
const reqApiList = new Set();
// @ts-ignore
window.reqApiList = reqApiList;
// @ts-ignore
window.bucketStore = bucketStore;

// 命名空间
let ajax_interceptor_dx: Ajax_Interceptor_Dx = {
  settings: {
    ajaxInterceptor_switchOn: false,
    ajaxInterceptor_rules: []
  },
  originalXHR: window.XMLHttpRequest,
  myXHR: function() {
    const modifyResponse = () => {
      reqApiResult.push({
        responseText: this.responseText
      });

      const { hostname, pathname } = new URL(this.responseURL);
      const ajaxReqURL = hostname + pathname;
      reqApiList.add(ajaxReqURL);
      bucketStore.set(ajaxReqURL, this.responseText);
      // 去配置中查找，是否有符合条件的路由
      const arrList = (ajax_interceptor_dx.settings.ajaxInterceptor_rules || []);
      arrList.forEach((item: any) => {
        const {
          filterType = "normal",
          switchOn = true,
          match,
          overrideTxt = ""
        } = item;
        let matched = false;
        // 全局switchOn打开 ， 存在配置match
        if (switchOn && match) {
          // 判断filterType
          if (filterType === "normal" && this.responseURL.indexOf(match) > -1) {
            matched = true;
          } else if (filterType === "regex" && this.responseURL.match(new RegExp(match, "i"))) {
            matched = true;
          }
        }
        // 如果匹配成功，则进行结果修改
        if (matched) {
           console.log(`main.ts===matched`, matched, this)
          this.responseText = overrideTxt;
          this.response = overrideTxt;
        }
      });
    };
    // 正常采用原生请求 = 请求成功之后，由modify决定是否替换
    const xhr = new ajax_interceptor_dx.originalXHR();
    for (let attr in xhr) {
      if (attr === "onreadystatechange") {
        xhr.onreadystatechange = (...args) => {
          if (this.readyState === 4) {
            // 请求成功
            if (ajax_interceptor_dx.settings.ajaxInterceptor_switchOn) {
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
          if (ajax_interceptor_dx.settings.ajaxInterceptor_switchOn) {
            // 开启拦截
            console.log(`开启拦截============`)
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
            get: () => (this[`_${attr}`] === undefined ? xhr[attr] : this[`_${attr}`]),
            set: (val) => (this[`_${attr}`] = val),
            enumerable: true
          });
        } else {
          Object.defineProperty(this, attr, {
            get: () => xhr[attr],
            set: (val) => (xhr[attr] = val),
            enumerable: true
          });
        }
      }
    }
  },

  originalFetch: window.fetch.bind(window),
  myFetch: function(...args) {
    return ajax_interceptor_dx.originalFetch(...args).then((response) => {
      let txt = undefined;
      console.log(`myFetch ====`)

      const { hostname, pathname } = new URL(response.url);
      const ajaxReqURL = hostname + pathname;
      reqApiList.add(ajaxReqURL);
      ajax_interceptor_dx.settings.ajaxInterceptor_rules.forEach(({
                                                                    filterType = "normal",
                                                                    switchOn = true,
                                                                    match,
                                                                    overrideTxt = ""
                                                                  }) => {
        let matched = false;
        if (switchOn && match) {
          if (filterType === "normal" && response.url.indexOf(match) > -1) {
            matched = true;
          } else if (filterType === "regex" && response.url.match(new RegExp(match, "i"))) {
            matched = true;
          }
        }

        if (matched) {
          window.dispatchEvent(
            new CustomEvent("pageScript", {
              detail: { url: response.url, match }
            })
          );
          txt = overrideTxt;
        }
      });
      if (txt !== undefined) {
        // 走代理结果
        const stream = new ReadableStream({
          start(controller) {
            controller.enqueue(new TextEncoder().encode(txt));
            controller.close();
          }
        });

        const newResponse = new Response(stream, {
          headers: response.headers,
          status: response.status,
          statusText: response.statusText
        });
        const proxy = new Proxy(newResponse, {
          get: function(target, name) {
            switch (name) {
              case "ok":
              case "redirected":
              case "type":
              case "url":
              case "useFinalURL":
              case "body":
              case "bodyUsed":
                return response[name];
              default:
            }
            return target[name];
          }
        });

        for (let key in proxy) {
          if (typeof proxy[key] === "function") {
            proxy[key] = proxy[key].bind(newResponse);
          }
        }

        return proxy;
      } else {
        return response;
      }
    });
  }
};
const switchAjaxInterceptor = () => {
  const switchAjaxInterceptor = Boolean(localStorage.getItem("ajaxInterceptor_switchOn"));
  let ajaxInterceptor_rules = {};
  try {
    ajaxInterceptor_rules = JSON.parse(localStorage.getItem("ajaxInterceptor_rules"));
  } catch (error) {
    console.log("出错了");
  }
  console.log('main',switchAjaxInterceptor, ajaxInterceptor_rules)
  // 下面内容，切换拦截，菜又必要执行
  if (switchAjaxInterceptor) {
    console.log(`走代理啦====`, ajax_interceptor_dx.myXHR)
    ajax_interceptor_dx["settings"]["ajaxInterceptor_rules"] = ajaxInterceptor_rules;
    ajax_interceptor_dx["settings"]["ajaxInterceptor_switchOn"] = switchAjaxInterceptor;
    window.XMLHttpRequest = ajax_interceptor_dx.myXHR;
    window.fetch = ajax_interceptor_dx.myFetch;
  } else {
    console.log(`不走走代理啦====`)
    window.XMLHttpRequest = ajax_interceptor_dx.originalXHR;
    window.fetch = ajax_interceptor_dx.originalFetch;
  }
};

console.log('content script6666', window.XMLHttpRequest)
// 等待时机执行
window.addEventListener("autoExecuteEvent", function(params: any) {
  console.log(`autoExecuteEvent====等待时机执行`)
  switchAjaxInterceptor();
});

