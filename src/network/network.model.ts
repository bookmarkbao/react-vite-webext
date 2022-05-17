import { VConsoleModel } from "./model";
import { VConsoleNetworkRequestItem } from "./requestItem";
import { XHRProxy } from "./xhr.proxy";
import { FetchProxy } from "./fetch.proxy";
import { BeaconProxy } from "./beacon.proxy";

/**
 * Network Store
 */
// export const requestList = writable<{ [id: string]: VConsoleNetworkRequestItem }>({});
export const requestList: Map<string, VConsoleNetworkRequestItem> = new Map();

export const ajaxInterceptorBucket = {
  // 存放我收集的接口
  switchOn: false,
  ajaxInterceptor_rules: [],
};

export const proxyBucket = new Proxy(ajaxInterceptorBucket, {
  set(target: T, key: string, value: any) {
    // console.log(`proxyBucket set===`, key, value);
    if (key === "switchOn") {
      // 存入本地
      localStorage.setItem(key, value);
    }
    Reflect.set(target, key, value);
    return true;
  },
  get(target: T, key: string) {
    // console.log(`proxyBucket get===`, key);
    if (key === "switchOn") {
      // 存入本地
      return localStorage.getItem(key);
    } else if (key === "ajaxInterceptor_rules") {
      // 过滤掉为打开的接口
      return Reflect.get(target, key).filter((item) => item.switchOn);
    }
    return Reflect.get(target, key);
  },
});

window.addEventListener("injectContentEvent", function (params: any) {
  const { key, value } = params.detail;
  // console.log(`proxyBucket injectContentEvent===`, params);
  switch (key) {
    case "ajaxInterceptor_switchOn":
      proxyBucket.switchOn = value;
      break;
    case "ajaxInterceptor_rules":
      proxyBucket.ajaxInterceptor_rules = value;
      break;
    default:
  }
});

/**
 * Network Model
 */
export class VConsoleNetworkModel extends VConsoleModel {
  public maxNetworkNumber: number = 1000;
  protected itemCounter: number = 0;
  protected mockStatus: boolean = false;
  protected interceptorTypes: string[] = ["xhr", "fetch"];

  constructor() {
    super();
    this.mockStatus = true;
    this.mockXHR();
    this.mockFetch();
    this.mockSendBeacon();
  }

  public unMock() {
    this.mockStatus = false;
    // recover original functions
    if (window.hasOwnProperty("XMLHttpRequest")) {
      window.XMLHttpRequest = XHRProxy.origXMLHttpRequest;
    }
    if (window.hasOwnProperty("fetch")) {
      window.fetch = FetchProxy.origFetch;
    }
    if (!!window.navigator.sendBeacon) {
      window.navigator.sendBeacon = BeaconProxy.origSendBeacon;
    }
  }

  public clearLog() {
    // remove list
    requestList.clear();
  }

  /**
   * Add or update a request item by request ID.
   * 新增：如果该接口启用interceptor，则读取本地结果进行
   */
  public updateRequest(id: string, data: VConsoleNetworkRequestItem, callback?: any) {
    id = data.url;
    // console.log(JSON.parse(JSON.stringify(data)));
    // console.log(`proxyBucket`, data.url);
    const reqItem = requestList.get(id); // 从map中获取id值
    if (!!reqItem) {
      // 更新内容
      // force re-assign to ensure that the value is updated
      const item = reqItem;
      for (let key in data) {
        item[key] = data[key];
      }
      data = item;
    }
     // 更新map值
     requestList.set(id, data); 

     // 4状态时，判断是否启用赋值
    if (data.readyState !== 4) return;
    
    const interceptorItem = this.interceptorHandler(data, callback);
    if(!interceptorItem) return

    // 处理赋值 === 这个值对象应用不一样
    callback && callback({
      _switchOn: true, 
      _response: interceptorItem.overrideTxt || ""
    })
  }

  // 判断当前的match是否在包含在url中
  protected interceptorHandler(data: VConsoleNetworkRequestItem, callback?: any) {
    // console.log(proxyBucket.switchOn)
    // 是否需要判断
    if (!proxyBucket.switchOn) return false;
    // 首先，必须是xhr，活着fetch请求
    if (!this.interceptorTypes.includes(data.requestType)) return false;

    // 判断match是否匹配data中的url
    const item = proxyBucket.ajaxInterceptor_rules.find((item) => data.url.includes(item.match));
    if (!item) return false; // 不存在
    return item;
  }

  public output() {
    console.log("=====中间被拦截，已经不能修改了", requestList.keys());
  }

  public getKeys() {
    return Array.from(requestList.keys());
  }

  public getData(key: string) {
    return requestList.get(key);
  }

  /**
   * mock XMLHttpRequest
   * @private
   */
  private mockXHR() {
    this.mockStatus = true;
    if (!window.hasOwnProperty("XMLHttpRequest")) {
      return;
    }
    window.XMLHttpRequest = XHRProxy.create((item: VConsoleNetworkRequestItem, callback?: any) => {
      this.updateRequest(item.id, item, callback);
    });
  }

  /**
   * mock fetch request
   * @private
   */
  private mockFetch() {
    if (!window.hasOwnProperty("fetch")) {
      return;
    }
    window.fetch = FetchProxy.create((item: VConsoleNetworkRequestItem) => {
      this.updateRequest(item.id, item);
    });
  }

  /**
   * mock navigator.sendBeacon
   * @private
   */
  private mockSendBeacon() {
    if (!window.navigator.sendBeacon) {
      return;
    }
    window.navigator.sendBeacon = BeaconProxy.create((item: VConsoleNetworkRequestItem) => {
      this.updateRequest(item.id, item, callback);
    });
  }
} // END class

export default VConsoleNetworkModel;
