import React from "react";
import { Switch, Collapse, Button, Input, Select } from "antd";
import { MinusCircleOutlined } from "@ant-design/icons";
import Replacer from "~/components/Replacer";
import { useSettingsStore, ajaxInterceptor_rules } from "./useSettingsStore.ts";
import { toggleIframe } from "~/logic/utils";
import "./Main.less";
const { Option } = Select;
const Panel = Collapse.Panel;

// if you need to state be preserved in `chrome.storage.sync` use useChromeStorageSync
export const MainApp = () => {
  const [settings, setSettings, isPersistent, error] = useSettingsStore();
  settings.init &&
    setSettings((prevState) => {
      return {
        ...prevState,
        init: false,
        ajaxInterceptor_rules,
      };
    });
  const saveTodo = async ({ key, value }) => {
    if (!chrome.storage) {
      console.log("不支持");
      return false;
    }
    chrome.storage.local.set({
      [key]: value,
      demo111: "demo111",
      demo222: "demo222",
      setting,
    });
  };
  const getTodoNew = async (key) => {
    if (!chrome.storage) {
      console.log("不支持");
      return false;
    }
    console.log("MainApp => getTodoNew", settings, isPersistent);
    chrome.storage.local.get(
      [key, "demo111", "demo333", "setting"],
      (result) => {
        console.log("getTodo>>", key, result);
      }
    );
  };
  const handleKeyDown = () => {};
  const handleLabelChange = (e, i) => {
    settings.ajaxInterceptor_rules[i].label = e.target.value;
    setSettings((prevState) => ({
      ...prevState,
    }));
  };
  const handleFilterTypeChange = (val, i) => {
    settings.ajaxInterceptor_rules[i].filterType = val;
    // 因为引用相同，所有深层修改，只需更新state即可
    setSettings((prevState) => ({
      ...prevState,
    }));
  };
  const handleMatchChange = (e, i) => {
    settings.ajaxInterceptor_rules[i].match = e.target.value;
    setSettings((prevState) => ({
      ...prevState,
    }));
  };
  const handleSingleSwitchChange = (switchOn, i) => {
    settings.ajaxInterceptor_rules[i].switchOn = switchOn;
    setSettings((prevState) => ({
      ...prevState,
    }));
  };
  const handleClickRemove = (e, i) => {
    e.stopPropagation();
    settings.ajaxInterceptor_rules.splice(i, 1);
    setSettings((prevState) => ({
      ...prevState,
    }));
  };
  const updateAddBtnTop = () => {
    console.log('updateAddBtnTop', 99999)
  };
  const onChangeReplace = (key, value, item, index) => {
    settings.ajaxInterceptor_rules[index] = {
      ...item,
      [key]: value
    }
    // console.log({
    //   ...item,
    //   key: value
    // })
    // console.log("onChangeReplace", key, value, item, index);
    setSettings((prevState) => ({...prevState}))
  };

  const renderPanelHeader = (item, index) => {
    const {
      filterType = "normal",
      match,
      label,
      overrideTxt,
      switchOn = true,
      key,
    } = item;
    return (
      <Panel
        key={key}
        header={
          <div
            className="panel-header"
            role="button"
            onKeyDown={handleKeyDown}
            tabIndex="0"
            onClick={(e) => e.stopPropagation()}
          >
            <Input.Group compact style={{ flex: 1, display: "flex" }}>
              <Input
                placeholder="name"
                style={{ width: "220px" }}
                defaultValue={label}
                onChange={(e) => handleLabelChange(e, index)}
              />
              <Select
                defaultValue={filterType}
                style={{ width: "120px" }}
                onChange={(e) => handleFilterTypeChange(e, index)}
              >
                <Option value="normal">normal</Option>
                <Option value="regex">regex</Option>
              </Select>
              <Input
                placeholder={
                  filterType === "normal" ? "eg: abc/get" : "eg: abc.*"
                }
                style={{ flex: 1 }}
                defaultValue={match}
                // onClick={e => e.stopPropagation()}
                onChange={(e) => handleMatchChange(e, index)}
              />
            </Input.Group>
            <Switch
              style={{ marginLeft: "10px", marginRight: "10px" }}
              size="small"
              defaultChecked={switchOn}
              onChange={(val) => handleSingleSwitchChange(item, index)}
            />
            <MinusCircleOutlined
              onClick={(e) => handleClickRemove(e, index)}
              style={{ fontSize: "18px", color: "#08c" }}
            />
          </div>
        }
      >
        <Replacer
          defaultValue={overrideTxt}
          updateAddBtnTop={updateAddBtnTop}
          index={index}
          set={(key, value)=>(onChangeReplace(key, value, item, index))}
        />
        {/* {this.state.interceptedRequests[match] && (
          <>
            <div className="intercepted-requests">Intercepted Requests:</div>
            <div className="intercepted">
              {this.state.interceptedRequests[match] &&
                this.state.interceptedRequests[match].map(({ url, num }) => (
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
        )} */}
      </Panel>
    );
  };
  const saveToBackgound = (key) => {
    switch (key) {
      case "save":
        saveTodo({
          key: "ajaxData",
          value: "test9999",
        });
        console.log("saveToBackgound");
        break;
      case "get":
        // this.getTodo();
        getTodoNew("ajaxData");
        console.log("getToBackgound");
        break;
      default:
    }
  };
  const renderContent = () => {
    return (
      <Collapse defaultActiveKey={["1"]} onChange={() => ({})}>
        {settings.ajaxInterceptor_rules.map((item, index) =>
          renderPanelHeader(item, index)
        )}
      </Collapse>
    );
  };
  return (
    <div>
      <Button type="danger" onClick={() => toggleIframe()}>
        隐藏Iframe
      </Button>

      <Button
        type="danger"
        onClick={() =>
          setSettings((prevState) => ({
            ...prevState,
            ajaxInterceptor_switchOn: false,
          }))
        }
      >
        关闭
      </Button>

      <Button
        type="danger"
        onClick={() =>
          setSettings((prevState) => ({
            ...prevState,
            ajaxInterceptor_switchOn: true,
          }))
        }
      >
        开启
      </Button>
      {settings.ajaxInterceptor_switchOn && renderContent()}
      <Button type="primary" onClick={() => saveToBackgound("save")}>
        数据保存到后台
      </Button>
      <Button type="danger" onClick={() => saveToBackgound("get")}>
        数据从后台获取
      </Button>
      <Switch
        style={{ marginLeft: "10px", marginRight: "10px" }}
        size="small"
        defaultChecked={setSettings.init}
        onChange={(val) =>
          setSettings((prevState) => ({
            ...prevState,
            init: true,
          }))
        }
      />
    </div>
  );
};

export default MainApp;

