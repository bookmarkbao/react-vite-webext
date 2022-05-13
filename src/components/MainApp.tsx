// @ts-nocheck # 忽略全文
import  { useState, useEffect } from "react";
import { Switch, Collapse, Button, Input, Select, Tooltip, Badge,  message, Divider, Space, Popconfirm } from "antd";
import { MinusCircleOutlined } from "@ant-design/icons";
import Replacer from "~/components/Replacer";
import * as types from "~/components/types";
import { toggleIframe } from "~/logic/utils";
import "./Main.less";
import client from "~/contentScriptsInject/client";
import { send } from "connect.io";
import { getCurrentTabId } from "~/utils";
const { Option } = Select;
const Panel = Collapse.Panel;
// import { createClient } from "connect.io";
// const clientInBackground = createClient({
//   namespace: "contentPage",
// });

const dateFormat = (fmt:string , date: any) => {
  let ret;
  const opt: any = {
    "Y+": date.getFullYear().toString(), // 年
    "m+": (date.getMonth() + 1).toString(), // 月
    "d+": date.getDate().toString(), // 日
    "H+": date.getHours().toString(), // 时
    "M+": date.getMinutes().toString(), // 分
    "s+": date.getSeconds().toString(), // 秒
    // 有其他格式化字符需求可以继续添加，必须转化成字符串
  };
  for (let k in opt) {
    ret = new RegExp("(" + k + ")").exec(fmt);
    if (ret) {
      fmt = fmt.replace(ret[1], ret[1].length == 1 ? opt[k] : opt[k].padStart(ret[1].length, "0"));
    }
  }
  return fmt;
};

console.log(`set MappApp.tsx`);
const set = (key: string, value: any) => {
  console.log(`set > `, key, value);
  // 数据同步过去
  try {
    chrome.runtime.sendMessage(chrome.runtime.id, {
      type: "ajaxInterceptor",
      to: "background",
      key,
      value,
    });
  } catch (error) {
    console.log("set >> ", error);
  }
};

const ImportJson = (props: any) => {
  const [overrideTxt, setOverrideText] = useState("");
  const onChangeReplace = (key: any, value: any) => {
    // console.log(key, value);
    setOverrideText(value);
  };
  const updateAddBtnTop = () => {};

  const saveAndReplaceContent = () => {
    try {
      const jsonData = JSON.parse(overrideTxt);
      if (jsonData[types.INTERCEPTO_RULES] === undefined) {
        message.error(`未配置${types.INTERCEPTO_RULES}参数，请检查`);
        return;
      }
      if (jsonData[types.SWITCH_ON] === undefined) {
        message.error(`未配置${types.SWITCH_ON}参数，请检查`);
        return;
      }
      props.onSave(overrideTxt);
    } catch (error) {
      message.error("无效的JSON格式");
    }
  };
  // @ts-ignore
  // @ts-ignore
  return (
    <div style={{ padding: `20px 20px` }}>
      <Button type="primary" onClick={saveAndReplaceContent}>
        保存并替换当前配置
      </Button>
      <Replacer placeholder="请粘贴合规的JSON配置" showLabel={false} label="JSON配置" defaultValue={overrideTxt} updateAddBtnTop={updateAddBtnTop} set={(key, value) => onChangeReplace(key, value)} />
    </div>
  );
};

// if you need to state be preserved in `chrome.storage.sync` use useChromeStorageSync
export const MainApp = () => {
  // const [settings, setSettings, isPersistent, error] = useSettingsStore();
  const [interceptedRequests, setInterceptedRequests] = useState({});
  const [ajaxInterceptorRules, setAjaxInterceptorRules] = useState([]);
  const [ajaxInterceptorSwitchOn, setAjaxInterceptorSwitchOn] = useState(false);
  const [visible, setVisible] = useState(true);
  const [configVisible, setConfigVisible] = useState(false);
  const updateAddBtnTop = () => {
    console.log("updateAddBtnTop", 99999);
  };
  const onChangeReplace = (key, value, item, index) => {
    ajaxInterceptorRules[index] = {
      ...item,
      [key]: value,
    };
    forceUpdateDebouce(types.INTERCEPTO_RULES, ajaxInterceptorRules);
  };

  // 保存数据. 如果value有值，则是key => value， 否则是对象
  const saveChromeStorageLocal = (opt, value = undefined) => {
    if (!chrome.storage) {
      console.log("不支持");
      return false;
    }
    console.log(`数据更新`);
    console.log(opt, value);
    chrome.storage.local.set(value !== undefined ? { [opt]: value } : { ...opt });
    if (value === undefined) {
      // 对象
      set(types.INTERCEPTO_RULES, opt[types.INTERCEPTO_RULES]); // 数据同步过去
      set(types.SWITCH_ON, opt[types.SWITCH_ON]);
    } else {
      set(opt, value); // 数据同步过去
    }
  };

  const downloadJSON = (name) => {
    const prefix = dateFormat("YYYY-mm-dd HH:MM:ss", new Date());
    const data = JSON.stringify({
      [types.INTERCEPTO_RULES]: ajaxInterceptorRules,
      [types.SWITCH_ON]: ajaxInterceptorSwitchOn,
    });
    var urlObject = window.URL || window.webkitURL || window;
    var export_blob = new Blob([data]);
    var createA = document.createElementNS("http://www.w3.org/1999/xhtml", "a");
    createA.href = urlObject.createObjectURL(export_blob);
    createA.download = `${prefix}-${name}.json`;
    var ev = document.createEvent("MouseEvents");
    ev.initMouseEvent("click", true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
    createA.dispatchEvent(ev);
  };

  // 读取数据
  const getChromeStorageLocal = () => {
    return new Promise((resolve, reject) => {
      if (!chrome.storage) {
        reject(new Error("不支持"));
      }
      chrome.storage.local.get([types.SWITCH_ON, types.INTERCEPTO_RULES], (result) => {
        resolve(result);
      });
    });
  };

  const setSettingsData = async (options = null) => {
    const settings = options || (await getChromeStorageLocal());
    // init: false, showAvatar: true, showHistory: false, ajaxInterceptor_switchOn: true, ajaxInterceptor_rules
    const { init, showAvatar, showHistory, ajaxInterceptor_switchOn, ajaxInterceptor_rules } = settings;
    // console.log(`ajaxInterceptor_rules`, ajaxInterceptor_rules);
    setAjaxInterceptorRules(ajaxInterceptor_rules || []);
    setAjaxInterceptorSwitchOn(ajaxInterceptor_switchOn);
  };

  // 性能优化：内容编辑上
  let forceUpdateTimeout = null;
  const forceUpdateDebouce = (key, value) => {
    clearTimeout(forceUpdateTimeout);
    forceUpdateTimeout = setTimeout(() => {
      saveChromeStorageLocal(key, value);
    }, 1000);
  };

  // useEffect(() => {
  //    saveChromeStorageLocal(); //更新数据
  // }, [ajaxInterceptorSwitchOn])

  // 请求一次
  useEffect(() => {
    console.log(`useEffect 请求一次：`);
    setSettingsData();
  }, []);

  const renderInterceptorInfo = (match) => {
    return (
      <>
        <div className="intercepted-requests">Intercepted Requests:</div>
        <div className="intercepted">
          {interceptedRequests[match]?.map(({ url, num }) => (
            <Tooltip placement="top" title={url} key={url}>
              <Badge
                count={num}
                style={{
                  backgroundColor: "#fff",
                  color: "#999",
                  boxShadow: "0 0 0 1px #d9d9d9 inset",
                  marginTop: "-3px",
                  marginRight: "4px",
                }}
              />
              <span className="url">{url}</span>
            </Tooltip>
          ))}
        </div>
      </>
    );
  };

  // ajaxInterceptor_rules下属性的修改
  const handleCommonChange = (keyName, value, i, debounced = false) => {
    ajaxInterceptorRules[i][keyName] = value;
    // 编辑性能优化
    if (debounced) {
      forceUpdateDebouce(types.INTERCEPTO_RULES, ajaxInterceptorRules);
    } else {
      saveChromeStorageLocal(types.INTERCEPTO_RULES, ajaxInterceptorRules); //更新数据
    }
  };

  const renderPanelHeader = (item, index) => {
    const { filterType = "normal", match, label, overrideTxt, switchOn = true, key } = item;
    return (
      <Panel
        key={key}
        header={
          <div className="panel-header" role="button" tabIndex="0" onClick={(e) => e.stopPropagation()}>
            <Input.Group compact style={{ flex: 1, display: "flex" }}>
              <Input placeholder="name" style={{ width: "220px" }} defaultValue={label} onChange={(e) => handleCommonChange("label", e.target.value, index)} />
              <Select defaultValue={filterType} style={{ width: "120px" }} onChange={(e) => handleCommonChange("filterType", e, index, false)}>
                <Option value="normal">normal</Option>
                <Option value="regex">regex</Option>
              </Select>
              <Input
                placeholder={filterType === "normal" ? "eg: abc/get" : "eg: abc.*"}
                style={{ flex: 1 }}
                defaultValue={match}
                // onClick={e => e.stopPropagation()}
                onChange={(e) => handleCommonChange("match", e.target.value, index)}
              />
            </Input.Group>
            <Switch style={{ marginLeft: "10px", marginRight: "10px" }} size="small" defaultChecked={switchOn} onChange={(val) => handleCommonChange("switchOn", val, index, false)} />
            <Popconfirm
              placement="topLeft"
              title="确定删除吗？"
              onConfirm={() => {
                const indexOf = ajaxInterceptorRules.findIndex((item) => item.key === key);
                ajaxInterceptorRules.splice(indexOf);
                setAjaxInterceptorRules([...ajaxInterceptorRules]);
                saveChromeStorageLocal(types.INTERCEPTO_RULES, ajaxInterceptorRules);
              }}
              okText="确定"
              cancelText="取消"
            >
              <MinusCircleOutlined style={{ fontSize: "18px", color: "#08c" }} />
            </Popconfirm>
          </div>
        }
      >
        <Replacer defaultValue={overrideTxt} updateAddBtnTop={updateAddBtnTop} index={index} set={(key, value) => onChangeReplace(key, value, item, index)} />
        {renderInterceptorInfo(item, match)}
      </Panel>
    );
  };
  const test = async () => {
    const result = await getChromeStorageLocal();
    console.log("test setting", result);
  };
  const renderContent = () => {
    const listRulesFilter = visible ? ajaxInterceptorRules.filter((item) => item.switchOn) : ajaxInterceptorRules;
    return (
      <div style={{ padding: `0 20px` }}>
        <Collapse defaultActiveKey={["1"]} onChange={() => ({})}>
          {listRulesFilter.map((item, index) => renderPanelHeader(item, index))}
        </Collapse>
      </div>
    );
  };

  const buildUUID = () => {
    var dt = new Date().getTime();
    var uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
      var r = (dt + Math.random() * 16) % 16 | 0;
      dt = Math.floor(dt / 16);
      return (c == "x" ? r : (r & 0x3) | 0x8).toString(16);
    });
    return uuid;
  };

  const testClients = () => {
    client.send("open options", { type: "iframe", msg: "我来自iframe" });
    console.log(`发送了open options`, "我是来自iframe的哟");
  };

  const testSendToContext = async () => {
    const tabId = await getCurrentTabId();
    console.log(`send testSendToContext 9999`, tabId);
    // client.send( 'get translate result' , this.query , true )
    send({
      id: await getCurrentTabId(),
      name: "translate",
      data: { name: 'hell12345' },
      needResponse : true
    }).then(res=>{
      console.log(res, '这是返回值')
    }).catch( ()=> null ); // 获取出错时仍然让此状态成功，只是值是 null，表示没有权限获取;
    // clientInBackground.send("openContent", { type: "iframe", msg: "我来自iframeContent to content" });
  };

  const addItem = () => {
    const arr = [...ajaxInterceptorRules];
    arr.push({ match: "", label: `url${ajaxInterceptorRules.length + 1}`, switchOn: true, key: buildUUID() });
    setAjaxInterceptorRules(arr);
    saveChromeStorageLocal(types.INTERCEPTO_RULES, arr); // 更新数据
  };
  return (
    <div>
      <div
        style={{
          padding: `16px 16px`,
          background: `rgb(190, 200, 200)`,
        }}
      >
        <Space>
          <Button size="small" type="primary" onClick={() => toggleIframe()}>
            隐藏
          </Button>
          <Switch
            checked={ajaxInterceptorSwitchOn}
            defaultChecked={ajaxInterceptorSwitchOn}
            checkedChildren="开启Ajax拦截"
            unCheckedChildren="关闭Ajax拦截"
            onChange={(val) => {
              setAjaxInterceptorSwitchOn(val);
              saveChromeStorageLocal(types.SWITCH_ON, val);
            }}
          />
          <Switch
            checked={visible}
            defaultChecked={visible}
            checkedChildren="API"
            unCheckedChildren="API"
            onChange={(val) => {
              setVisible(val);
            }}
          />
          <Switch
            checked={configVisible}
            defaultChecked={configVisible}
            checkedChildren="配置"
            unCheckedChildren="配置"
            onChange={(val) => {
              setConfigVisible(val);
            }}
          />
        </Space>
      </div>
      {configVisible ? (
        <>
          <Divider orientation="left">数据配置项</Divider>
          <ImportJson
            onSave={(txt) => {
              const txtToJson = JSON.parse(txt);
              saveChromeStorageLocal(txtToJson);
              setAjaxInterceptorRules(txtToJson[types.INTERCEPTO_RULES]);
              setAjaxInterceptorSwitchOn(true);
              message.success("保存成功");
            }}
          />
        </>
      ) : (
        <>
          <Divider orientation="left">拦截接口配置</Divider>
          {ajaxInterceptorSwitchOn && renderContent()}
          <div style={{ padding: `20px 20px` }}>
            <Space>
              <Button type="primary" onClick={() => addItem()}>
                新增
              </Button>
              <Button type="primary" onClick={testClients}>
                测试数据发送
              </Button>
              <Button type="primary" onClick={testSendToContext}>
                testSendToContext
              </Button>
              <Button
                type="primary"
                onClick={() => {
                  downloadJSON("ajax-interceptor");
                }}
              >
                下载当前配置文件
              </Button>
            </Space>
          </div>
        </>
      )}

      {/* <Button type="primary" onClick={() => test("setting")}>
        数据从后台获取
      </Button>
      <Button type="danger" onClick={setTestData}>
        设置初始数据
      </Button> */}
    </div>
  );
};

export default MainApp;
