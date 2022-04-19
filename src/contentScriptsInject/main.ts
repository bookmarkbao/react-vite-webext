
const isDebug = true
function log(){
  isDebug && console.log(...arguments)
}
let counter = 0;
function cLog(msg, action) {
  switch (action) {
    case "warning":
      console.log(`%c ${counter++} >> ${msg}`, "color: blue;font-size: 24px;");
      break;
    default:
      console.log(`%c ${counter++}>> ${msg}`, "color: blue;font-size: 24px;");
  }
}
let reqApiResult = []
// 命名空间
let ajax_interceptor_qoweifjqon = {
  settings: {
    ajaxInterceptor_switchOn: false,
    ajaxInterceptor_rules: [],
  },
  originalXHR: window.XMLHttpRequest,
  myXHR: function() {
    let pageScriptEventDispatched = false;
    const modifyResponse = () => {
      reqApiResult.push({
        responseText: this.responseText
      })

      // 去配置中查找，是否有符合条件的路由
      ajax_interceptor_qoweifjqon.settings.ajaxInterceptor_rules.forEach(({filterType = 'normal', switchOn = true, match, overrideTxt = ''}) => {
        let matched = false;
        // 全局switchOn打开 ， 存在配置match
        if (switchOn && match) {
          // 判断filterType
          if (filterType === 'normal' && this.responseURL.indexOf(match) > -1) {
            matched = true;
          } else if (filterType === 'regex' && this.responseURL.match(new RegExp(match, 'i'))) {
            matched = true;
          }
        }
        cLog("匹配结果")
        log("matched", matched)
        // 如果匹配成功，则进行结果修改
        if (matched) {
          this.responseText = overrideTxt;
          this.response = overrideTxt;
          if (!pageScriptEventDispatched) {
            window.dispatchEvent(new CustomEvent("pageScript", {
              detail: {url: this.responseURL, match}
            }));
            pageScriptEventDispatched = true;
          }
        }
      })
    }
    
    // 正常采用原生请求 = 请求成功之后，由modify决定是否替换
    const xhr = new ajax_interceptor_qoweifjqon.originalXHR;
    for (let attr in xhr) {
      if (attr === 'onreadystatechange') {
        xhr.onreadystatechange = (...args) => {
          if (this.readyState === 4) {
            // 请求成功
            if (ajax_interceptor_qoweifjqon.settings.ajaxInterceptor_switchOn) {
             
              // 开启拦截
              modifyResponse();
            }
          }
          this.onreadystatechange && this.onreadystatechange.apply(this, args);
        }
        continue;
      } else if (attr === 'onload') {
        xhr.onload = (...args) => {
          // 请求成功
          if (ajax_interceptor_qoweifjqon.settings.ajaxInterceptor_switchOn) {
            // 开启拦截
            modifyResponse();
          }
          this.onload && this.onload.apply(this, args);
        }
        continue;
      }
  
      if (typeof xhr[attr] === 'function') {
        this[attr] = xhr[attr].bind(xhr);
      } else {
        // responseText和response不是writeable的，但拦截时需要修改它，所以修改就存储在this[`_${attr}`]上
        if (attr === 'responseText' || attr === 'response') {
          Object.defineProperty(this, attr, {
            get: () => this[`_${attr}`] === undefined ? xhr[attr] : this[`_${attr}`],
            set: (val) => this[`_${attr}`] = val,
            enumerable: true
          });
        } else {
          Object.defineProperty(this, attr, {
            get: () => xhr[attr],
            set: (val) => xhr[attr] = val,
            enumerable: true
          });
        }
      }
    }
    // console.log('myXHR================================', xhr)
  },

  originalFetch: window.fetch.bind(window),
  myFetch: function(...args) {
    return ajax_interceptor_qoweifjqon.originalFetch(...args).then((response) => {
      let txt = undefined;
      ajax_interceptor_qoweifjqon.settings.ajaxInterceptor_rules.forEach(({filterType = 'normal', switchOn = true, match, overrideTxt = ''}) => {
        let matched = false;
        // cLog('myFetch XMLHttpRequest >> ')
        // log(response.url, match)
        // log('myFetch XMLHttpRequest matched>> ', response.url.indexOf(match) > -1)
        if (switchOn && match) {
          if (filterType === 'normal' && response.url.indexOf(match) > -1) {
            matched = true;
          } else if (filterType === 'regex' && response.url.match(new RegExp(match, 'i'))) {
            matched = true;
          }
        }

        if (matched) {
          window.dispatchEvent(new CustomEvent("pageScript", {
            detail: {url: response.url, match}
          }));
          // cLog('myFetch matched pageScript>>');
          // log({url: response.url, match})
          // cLog('myFetch matched txt>>')
          // log(JSON.parse(overrideTxt))
          txt = overrideTxt;
        }
      });
      if (txt !== undefined) { // 走代理结果
        const stream = new ReadableStream({
          start(controller) {
            // const bufView = new Uint8Array(new ArrayBuffer(txt.length));
            // for (var i = 0; i < txt.length; i++) {
            //   bufView[i] = txt.charCodeAt(i);
            // }
            controller.enqueue(new TextEncoder().encode(txt));
            controller.close();
          }
        });
  
        const newResponse = new Response(stream, {
          headers: response.headers,
          status: response.status,
          statusText: response.statusText,
        });
        const proxy = new Proxy(newResponse, {
          get: function(target, name){
            switch(name) {
              case 'ok':
              case 'redirected':
              case 'type':
              case 'url':
              case 'useFinalURL':
              case 'body':
              case 'bodyUsed':
                return response[name];
              default:
            }
            return target[name];
          }
        });
  
        for (let key in proxy) {
          if (typeof proxy[key] === 'function') {
            proxy[key] = proxy[key].bind(newResponse);
          }
        }
        // log('myFetch matched proxy>>', proxy)
        // log('myFetch matched txt>>', newResponse)

        // log('接口请求结果 response >>>', response)
        // log('代理请求结果 response >>>', proxy)
        
        return proxy;
      } else {
        return response;
      }
    });
  },
}

window.addEventListener("message", function(event) {
  const data = event.data;
  if (data.type === 'ajaxInterceptor' && data.to === 'pageScript') {
    ajax_interceptor_qoweifjqon.settings[data.key] = data.value;
  }
  // console.log('react-ajax-interceptor >> message', ajax_interceptor_qoweifjqon.settings)

  if (ajax_interceptor_qoweifjqon.settings.ajaxInterceptor_switchOn) {
    window.XMLHttpRequest = ajax_interceptor_qoweifjqon.myXHR;
    window.fetch = ajax_interceptor_qoweifjqon.myFetch;
  } else {
    window.XMLHttpRequest = ajax_interceptor_qoweifjqon.originalXHR;
    window.fetch = ajax_interceptor_qoweifjqon.originalFetch;
  }
}, false);


// 从background，iframe过来的信息，更新内容
window.addEventListener(
  "message",
  function (event) {
    const data = event.data;
    // console.log("从background，iframe过来的信息，更新内容 >> message", data);
    if (data.type === "ajaxInterceptor" && data.to === "pageScript") {
      ajax_interceptor_qoweifjqon.settings[data.key] = data.value;
    }
    if (ajax_interceptor_qoweifjqon.settings.ajaxInterceptor_switchOn) {
      window.XMLHttpRequest = ajax_interceptor_qoweifjqon.myXHR;
      window.fetch = ajax_interceptor_qoweifjqon.myFetch;
    } else {
      window.XMLHttpRequest = ajax_interceptor_qoweifjqon.originalXHR;
      window.fetch = ajax_interceptor_qoweifjqon.originalFetch;
    }
  },
  false
);
