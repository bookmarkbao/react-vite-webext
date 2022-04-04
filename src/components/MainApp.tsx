import React, { Component } from "react";
import { Switch, Collapse, Button, Input, Select, Badge, Tooltip } from "antd";

import { PlusCircleOutlined, MinusCircleOutlined } from "@ant-design/icons";
import Replacer from "~/components/Replacer";
import "./Main.less";
const { Option } = Select;
const Panel = Collapse.Panel;
const setting = {
  ajaxInterceptor_switchOn: true,
  ajaxInterceptor_rules: [
    {
      key: "0e2a7651-a2ab-407b-8fa8-e3dfd10b8f3a",
      label: "url1",
      match: "/cmsApi/mutability/queryProduct",
      overrideTxt:
        '{"status":"ok","traceId":"F8585DE442EF4372883170B397AB29FC","msg":"ok","code":0,"data":{"total":45,"page":1,"size":10,"preferredList":[{"skuId":"1374275","categoryName":"华北","skuName":"订单完成1天0，30，50，20","sellingPrice":"4.50","originalPrice":"11.00","beginTime":"2021-08-17 00:00:00","endTime":"2022-09-30 23:59:59","providerName":"LS-测试供方3-零库存","markingCode":"default","markingName":"","countWareSellNum":"637","skuImgUrl":["http://img1.uhome.longfor.com/image-09dc3775-6dbf-4316-b477-c1a038999e39.jpg"],"special":[],"detailUrl":"https://qam.uhome.longhu.net/shopping/details/1374275","countryFlag":true,"projectRangeList":[],"selectProjects":[],"rangeType":0,"countStock":0},{"skuId":"1374800","categoryName":"华北","skuName":"100销地，","sellingPrice":"1.00","originalPrice":"4.00","beginTime":"2022-01-07 00:00:00","endTime":"2022-12-31 23:59:59","providerName":"龙湖测试供方2","markingCode":"default","markingName":"","countWareSellNum":"508","skuImgUrl":["http://img1.uhome.longfor.com/image-3b415325-f5d7-4399-b00f-a240b44d6d39.jpg"],"special":[],"detailUrl":"https://qam.uhome.longhu.net/shopping/details/1374800","countryFlag":true,"projectRangeList":[],"selectProjects":[],"rangeType":3,"countStock":9999},{"skuId":"1375101","categoryName":"华北","skuName":"北京唐宁ces-项目","sellingPrice":"1.00","originalPrice":"1.00","beginTime":"2020-07-07 00:00:00","endTime":"2022-11-30 23:59:59","providerName":"LS-测试","markingCode":"default","markingName":"","countWareSellNum":"500","skuImgUrl":["http://img1.uhome.longfor.com/image-8cb23628-0865-4d3b-9809-b8ea9c912b9c.jpg"],"special":[],"detailUrl":"https://qam.uhome.longhu.net/shopping/details/1375101","countryFlag":true,"projectRangeList":[],"rangeType":2,"countStock":9999,"selectProjects":[{"id":"480058557245423616","name":"龙湖大厦"},{"id":"1535432247000000050","name":"唐宁ONE"},{"id":"1535432247000000168","name":"天琅"},{"id":"1535432247000000170","name":"选择项目"}]},{"skuId":"1374255","categoryName":"华北","skuName":"订单完成","sellingPrice":"1.50","originalPrice":"22.00","beginTime":"2021-08-17 00:00:00","endTime":"2022-09-30 23:59:59","providerName":"LS-测试供方3-全国","markingCode":"default","markingName":"","countWareSellNum":"490","skuImgUrl":["http://img1.uhome.longfor.com/image-44ac5bc6-d7e5-405a-ba13-69a6f9a8bc90.jpg"],"special":[],"detailUrl":"https://qam.uhome.longhu.net/shopping/details/1374255","countryFlag":true,"projectRangeList":[],"selectProjects":[],"rangeType":0,"countStock":9999},{"skuId":"1374358","categoryName":"华北","skuName":"订单完成-珑珠抵扣否","sellingPrice":"0.01","originalPrice":"11.00","beginTime":"2020-07-09 00:00:00","endTime":"2023-08-31 23:59:59","providerName":"LS-测试供方1","markingCode":"default","markingName":"","countWareSellNum":"410","skuImgUrl":["http://img1.uhome.longfor.com/image-6b9cb2cf-68de-459f-bfa0-41d9bc614941.jpg"],"special":[],"detailUrl":"https://qam.uhome.longhu.net/shopping/details/1374358","countryFlag":true,"projectRangeList":[],"selectProjects":[],"rangeType":0,"countStock":9999},{"skuId":"1374272","categoryName":"西南","skuName":"订单完成2天20，40，10，30","sellingPrice":"2.50","originalPrice":"11.00","beginTime":"2021-08-18 00:00:00","endTime":"2022-10-31 23:59:59","providerName":"多方分账-有所属物业（香醍溪岸）","markingCode":"default","markingName":"","countWareSellNum":"409","skuImgUrl":["http://img1.uhome.longfor.com/image-caa4e8d5-cfee-4c74-8452-b50738e1ef82.jpg"],"special":[],"detailUrl":"https://qam.uhome.longhu.net/shopping/details/1374272","countryFlag":true,"projectRangeList":[],"selectProjects":[],"rangeType":0,"countStock":9999},{"skuId":"1374061","categoryName":"单肩包","skuName":"进口量就","sellingPrice":"1.00","originalPrice":"1.00","beginTime":"2020-03-23 00:00:00","endTime":"2023-02-01 23:59:59","providerName":"多方分账NC--有属地（龙湖杭州分公司）","markingCode":"default","markingName":"","countWareSellNum":"397","skuImgUrl":["http://img1.uhome.longfor.com/image-cdc5b029-34fa-4417-86bb-9d293c8a6aee.jpg"],"special":[],"detailUrl":"https://qam.uhome.longhu.net/shopping/details/1374061","countryFlag":true,"projectRangeList":[],"selectProjects":[],"rangeType":0,"countStock":9999},{"skuId":"1374406","categoryName":"米/面","skuName":"供方1葵花油","sellingPrice":"0.10","originalPrice":"5.00","beginTime":"2021-08-26 00:00:00","endTime":"2024-12-31 23:59:59","providerName":"龙湖测试供方1","markingCode":"default","markingName":"","countWareSellNum":"395","skuImgUrl":["http://img1.uhome.longfor.com/image-b94f8edf-c665-491e-bfa8-2402286d8f18.jpg"],"special":[],"detailUrl":"https://qam.uhome.longhu.net/shopping/details/1374406","countryFlag":true,"projectRangeList":[],"selectProjects":[],"rangeType":0,"countStock":9999},{"skuId":"1374273","categoryName":"东北","skuName":"订单完成1天20，40，10，30","sellingPrice":"5.50","originalPrice":"11.00","beginTime":"2021-08-18 00:00:00","endTime":"2022-12-31 23:59:59","providerName":"多方分账-有所属物业（香醍溪岸）","markingCode":"default","markingName":"","countWareSellNum":"261","skuImgUrl":["http://img1.uhome.longfor.com/image-8c0d016e-d00d-4b26-a897-815c0572bed4.jpg"],"special":[],"detailUrl":"https://qam.uhome.longhu.net/shopping/details/1374273","countryFlag":true,"projectRangeList":[],"selectProjects":[],"rangeType":0,"countStock":9999},{"skuId":"1374801","categoryName":"休闲零食","skuName":"100给属地","sellingPrice":"32.00","originalPrice":"50.00","beginTime":"2022-01-10 00:00:00","endTime":"2023-12-31 23:59:59","providerName":"龙湖测试供方2","markingCode":"default","markingName":"","countWareSellNum":"250","skuImgUrl":["http://img1.uhome.longfor.com/image-f29c681b-1571-4baf-b8ca-25ce783a0161.png"],"special":[],"detailUrl":"https://qam.uhome.longhu.net/shopping/details/1374801","countryFlag":true,"projectRangeList":[{"id":"480058557245423616","name":"龙湖大厦"},{"id":"1535432247000000050","name":"唐宁ONE"},{"id":"1535432247000000170","name":"选择项目"}],"selectProjects":[],"rangeType":0,"countStock":9999}]},"timestamp":1648690463099}',
      switchOn: false,
    },
    {
      key: "a4c54de8-48d1-42f3-a8cc-4b139f876044",
      label: "url2",
      match: "/cmsApi/moduleContent/queryContentById",
      overrideTxt:
        '{"status":"ok","msg":"ok","code":0,"data":{"id":522877,"moduleNodeId":21450,"moduleMetaId":9,"contentName":"订单完成-珑珠抵扣否","enable":1,"dateEnable":0,"contentStatus":1,"associationType":0,"customerTag":0,"rangeType":2,"proType":"CmsPreferred","orderNo":1,"imageMainTitle":"订单完成-珑珠抵扣否","updateAt":"2022-03-31 13:00:01","imageUrl":"http://img1.uhome.longfor.com/image-6b9cb2cf-68de-459f-bfa0-41d9bc614941.jpg","proSelling":"0.01","proOriginal":"11.00","proIdentify":"","playerCount":"100","selectImageUrl":"http://img1.uhome.longfor.com/image-6b9cb2cf-68de-459f-bfa0-41d9bc614941.jpg","selectImageName":"订单完成-珑珠抵扣否","detailUrl":"https://qam.uhome.longhu.net/shopping/details/1374358","createdName":"王力鹏","contentExtendRespList":[],"selectProjects":[{"id":"480058557245423616","name":"龙湖大厦"},{"id":"1535432247000000050","name":"唐宁ONE"},{"id":"1535432247000000168","name":"天琅"},{"id":"1535432247000000170","name":"选择项目"}],"excludeProjects":[{"4":null,"id":"480058557245423616","name":"龙湖大厦"},{"id":"1535432247000000050","name":"唐宁ONE"},{"id":"1535432247000000168","name":"天琅"},{"id":"1535432247000000169","name":"排除项目"}]},"timestamp":1648705416480}',
      switchOn: false,
    },
    {
      key: "a3456cd2-917b-4956-9a69-f904a05524bd",
      label: "营销活动",
      match: "/cmsApi/marketing/activity/list",
      overrideTxt:
        '{"status":"ok","msg":"ok","code":0,"data":{"records":[{"id":"1509059123551318018","activityCode":"LZ0095","activityName":"测试123-可用活动","activityType":0,"activityStatus":2,"activityRange":"0","taskNo":"HY20220308000011","startTime":"2022-03-08 00:00:00","endTime":"2022-04-28 00:00:00","enable":1,"createName":"杨祎","createTime":"2022-03-30 14:45:06"},{"id":"1504442937320644609","activityCode":"LZ0094","activityName":"94","activityType":0,"activityStatus":3,"activityRange":"0","taskNo":"HY20220308000011","startTime":"2022-03-08 00:00:00","endTime":"2022-03-31 00:00:00","enable":1,"createName":"luxx","createTime":"2022-03-17 21:02:02"},{"id":"1504349973500067842","activityCode":"LZ0093","activityName":"93","activityType":0,"activityStatus":3,"activityRange":"0","taskNo":"HY20220308000011","startTime":"2022-03-08 00:00:00","endTime":"2022-03-31 00:00:00","enable":1,"createName":"luxx","createTime":"2022-03-17 14:52:37"},{"id":"1504334598586744834","activityCode":"LZ0092","activityName":"92","activityType":0,"activityStatus":3,"activityRange":"0","taskNo":"HY20220308000011","startTime":"2022-03-08 00:00:00","endTime":"2022-03-31 00:00:00","enable":1,"createName":"luxx","createTime":"2022-03-17 13:51:32"},{"id":"1504304325656559617","activityCode":"LZ0091","activityName":"91","activityType":0,"activityStatus":3,"activityRange":"0","taskNo":"HY20220308000011","startTime":"2022-03-08 00:00:00","endTime":"2022-03-31 00:00:00","enable":1,"createName":"luxx","createTime":"2022-03-17 11:51:14"},{"id":"1504297021657710594","activityCode":"LZ0090","activityName":"90","activityType":0,"activityStatus":3,"activityRange":"0","taskNo":"HY20220308000011","startTime":"2022-03-08 00:00:00","endTime":"2022-03-31 00:00:00","enable":1,"createName":"luxx","createTime":"2022-03-17 11:22:13"},{"id":"1504050444854755330","activityCode":"LZ0089","activityName":"89","activityType":0,"activityStatus":3,"activityRange":"0","taskNo":"HY20220308000011","startTime":"2022-03-08 00:00:00","endTime":"2022-03-31 00:00:00","enable":1,"createName":"luxx","createTime":"2022-03-16 19:02:24"},{"id":"1504011283301007361","activityCode":"LZ0088","activityName":"88","activityType":0,"activityStatus":3,"activityRange":"0","taskNo":"HY20220308000011","startTime":"2022-03-08 00:00:00","endTime":"2022-03-31 00:00:00","enable":1,"createName":"a-liushan","createTime":"2022-03-16 16:26:47"},{"id":"1503981613675360257","activityCode":"LZ0087","activityName":"87","activityType":0,"activityStatus":3,"activityRange":"0","taskNo":"HY20220308000011","startTime":"2022-03-08 00:00:00","endTime":"2022-03-31 00:00:00","enable":1,"createName":"a-liushan","createTime":"2022-03-16 14:28:53"},{"id":"1503945422783524865","activityCode":"LZ0086","activityName":"86","activityType":0,"activityStatus":3,"activityRange":"0","taskNo":"HY20220308000011","startTime":"2022-03-08 00:00:00","endTime":"2022-03-31 00:00:00","enable":1,"createName":"luxx","createTime":"2022-03-16 12:05:05"}],"total":101,"size":10,"current":1,"orders":[],"optimizeCountSql":true,"hitCount":false,"searchCount":true,"pages":11},"timestamp":1648795118537}',
      switchOn: false,
    },
    {
      filterType: "normal",
      key: "ba0484ad-16d3-4e91-a110-483ca292c36a",
      label: "编辑活动-校验",
      match: "/cmsApi/marketing/activity/validTask",
      overrideTxt:
        '{"status":"ok","msg":"ok","code":0,"data":{"success":true,"message":"该任务未生效-成功","taskInfo":{"taskNo":"HY20220308000011","status":"Opened","totalApplied":1000,"totalSuccess":191.45,"successNumbers":1195,"startTime":"2022-03-08 00:00:00","endTime":"2022-04-21 23:59:59"}},"timestamp":1748795300837}',
      switchOn: false,
    },
    {
      key: "47e80a07-ca66-49f8-a5fa-16c5dea20c9f",
      label: "编辑活动-query",
      match: "/cmsApi/marketing/activity/query/1509059123551318018",
      overrideTxt:
        '{"status":"ok","msg":"ok","code":0,"data":{"id":"1509059123551318018","activityCode":"LZ0095","activityName":"测试123-拦截","activityType":0,"activityStatus":1,"activityRange":"0","taskNo":"HY20220308000011","startTime":"2022-03-08 00:00:00","endTime":"2022-03-31 00:00:00","enable":1,"createName":"杨祎","createTime":"2022-03-30 14:45:06"},"timestamp":1648799787489}',
      switchOn: false,
    },
    {
      key: "16a562d7-1d5a-4533-8f66-d62b84d11377",
      label: "活动新建-校验",
      match: "/cmsApi/marketing/activity/validTask",
      overrideTxt:
        '{\n    "status": "ok",\n    "msg": "ok",\n    "code": 0,\n    "data": {\n        "success": true,\n        "message": "",\n        "taskInfo": {\n            "taskNo": "HY20220401000008",\n            "status": "Effective",\n            "totalApplied": 10000,\n            "totalSuccess": 0,\n            "successNumbers": 0,\n            "startTime": "2022-04-01 00:00:00",\n            "endTime": "2022-11-30 23:59:59"\n        }\n    },\n    "timestamp": 1648803122283\n}',
      switchOn: false,
    },
  ],
};

export default class Main extends Component {
  constructor() {
    super();
    console.log(1234);
  }
  //   普通函数，箭头函数能修正this指向问题，方便在混合中使用
  log() {
    console.log(...arguments);
  }

  state = {
    interceptedRequests: {},
  };

  componentDidMount() {
    this.updateAddBtnTop_interval();
  }

  updateAddBtnTop = () => {
    let curCollapseWrapperHeight = this.collapseWrapperRef
      ? this.collapseWrapperRef.offsetHeight
      : 0;
    if (this.collapseWrapperHeight !== curCollapseWrapperHeight) {
      this.collapseWrapperHeight = curCollapseWrapperHeight;
      clearTimeout(this.updateAddBtnTopDebounceTimeout);
      this.updateAddBtnTopDebounceTimeout = setTimeout(() => {
        this.addBtnRef.style.top = `${curCollapseWrapperHeight + 30}px`;
      }, 50);
    }
  };

  // 计算按钮位置
  updateAddBtnTop_interval = ({ timeout = 1000, interval = 50 } = {}) => {
    const i = setInterval(this.updateAddBtnTop, interval);
    setTimeout(() => {
      clearInterval(i);
    }, timeout);
  };

  set = (key, value) => {
    // 发送给background.js
    this.log("set 发送给background", key, value);
    // chrome.runtime.sendMessage(chrome.runtime.id, {
    //   type: "ajaxInterceptor",
    //   to: "background",
    //   key,
    //   value,
    // });
    // chrome.storage && chrome.storage.local.set({ [key]: value });
  };

  forceUpdateDebouce = () => {
    clearTimeout(this.forceUpdateTimeout);
    this.forceUpdateTimeout = setTimeout(() => {
      this.forceUpdate();
    }, 1000);
  };

  handleSingleSwitchChange = (switchOn, i) => {
    setting.ajaxInterceptor_rules[i].switchOn = switchOn;
    this.set("ajaxInterceptor_rules", setting.ajaxInterceptor_rules);

    // 这么搞主要是为了能实时同步setting.ajaxInterceptor_rules，并且让性能好一点
    this.forceUpdateDebouce();
  };

  handleFilterTypeChange = (val, i) => {
    setting.ajaxInterceptor_rules[i].filterType = val;
    this.set("ajaxInterceptor_rules", setting.ajaxInterceptor_rules);

    this.forceUpdate();
  };

  handleMatchChange = (e, i) => {
    setting.ajaxInterceptor_rules[i].match = e.target.value;
    this.set("ajaxInterceptor_rules", setting.ajaxInterceptor_rules);

    this.forceUpdateDebouce();
  };

  handleLabelChange = (e, i) => {
    setting.ajaxInterceptor_rules[i].label = e.target.value;
    this.set("ajaxInterceptor_rules", setting.ajaxInterceptor_rules);

    this.forceUpdateDebouce();
  };

  handleClickAdd = () => {
    // setting.ajaxInterceptor_rules.push({
    //   match: "",
    //   label: `url${setting.ajaxInterceptor_rules.length + 1}`,
    //   switchOn: true,
    //   key: buildUUID(),
    // });
    this.log("handleClickAdd", "新增接口");
    this.forceUpdate(this.updateAddBtnTop_interval);
  };

  handleClickRemove = (e, i) => {
    e.stopPropagation();
    const { interceptedRequests } = this.state;
    const match = setting.ajaxInterceptor_rules[i].match;
    const label = setting.ajaxInterceptor_rules[i].label;

    setting.ajaxInterceptor_rules = [
      ...setting.ajaxInterceptor_rules.slice(0, i),
      ...setting.ajaxInterceptor_rules.slice(i + 1),
    ];
    this.set("ajaxInterceptor_rules", setting.ajaxInterceptor_rules);

    delete interceptedRequests[match];
    delete interceptedRequests[label];
    this.setState({ interceptedRequests }, this.updateAddBtnTop_interval);
  };

  handleCollaseChange = ({ timeout = 1200, interval = 50 }) => {
    this.updateAddBtnTop_interval();
  };

  handleSwitchChange = () => {
    setting.ajaxInterceptor_switchOn = !setting.ajaxInterceptor_switchOn;
    this.set("ajaxInterceptor_switchOn", setting.ajaxInterceptor_switchOn);
    this.forceUpdate();
  };

  handleKeyDown() {
    this.log("handleKeyDown > ");
  }
  callback(key) {
    this.log("Panel callback >>", key);
  }
  renderPanelHeader(
    { filterType = "normal", match, label, overrideTxt, switchOn = true, key },
    index
  ) {
    return (
      <Panel
        key={key}
        header={
          <div
            className="panel-header"
            role="button"
            onKeyDown={this.handleKeyDown}
            tabIndex="0"
            onClick={(e) => e.stopPropagation()}
          >
            <Input.Group compact style={{ flex: 1, display: "flex" }}>
              <Input
                placeholder="name"
                style={{ width: "220px" }}
                defaultValue={label}
                onChange={(e) => this.handleLabelChange(e, i)}
              />
              <Select
                defaultValue={filterType}
                style={{ width: "120px" }}
                onChange={(e) => this.handleFilterTypeChange(e, i)}
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
                onChange={(e) => this.handleMatchChange(e, i)}
              />
            </Input.Group>
            <Switch
              style={{ marginLeft: "10px", marginRight: "10px" }}
              size="small"
              defaultChecked={switchOn}
              onChange={(val) => this.handleSingleSwitchChange(val, i)}
            />
            <MinusCircleOutlined style={{ fontSize: "18px", color: "#08c" }} />
          </div>
        }
      >
        <Replacer
          defaultValue={overrideTxt}
          updateAddBtnTop={this.updateAddBtnTop}
          index={index}
          set={this.set}
        />
        {this.state.interceptedRequests[match] && (
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
        )}
      </Panel>
    );
  }
  async getTodo() {
    // 'devtools' | 'background' | 'popup' | 'options' | 'content-script' | 'window'
    const key = 'test9999'
    const value = 'xiangjun999'
    chrome.runtime.sendMessage(chrome.runtime.id, {
      type: "ajaxInterceptor",
      to: "background",
      key,
      value,
    },(result)=>{
      console.log('result 8888 >', result);
    });
  }
  saveToBackgound(key) {
    switch (key) {
      case "save":
        console.log("saveToBackgound", this.state);
        break;
      case "get":
        this.getTodo();
        console.log("getToBackgound", this.state);
        break;
      default:
    }
  }
  render() {
    return (
      <div>
        <Collapse defaultActiveKey={["1"]} onChange={this.callback.bind(this)}>
          {setting.ajaxInterceptor_rules.map((item, index) =>
            this.renderPanelHeader(item, index)
          )}
        </Collapse>
        <Button
          type="primary"
          onClick={this.saveToBackgound.bind(this, "save")}
        >
          数据保存到后台
        </Button>
        <Button type="danger" onClick={this.saveToBackgound.bind(this, "get")}>
          数据从后台获取
        </Button>
      </div>
    );
  }
}

