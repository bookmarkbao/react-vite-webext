/*
 * @Descripttion:
 * @Author: xiangjun02
 * @Date: 2022-04-02 00:53:11
 * @LastEditors: xiangjun02
 * @LastEditTime: 2022-04-20 00:51:47
 */
import { Component } from "react";
import { Switch } from "antd";
import ReactJson from "react-json-view";
import "./Replacer.less";

interface ReplacerPropTypes  {
  placeholder?: string;
  showLabel?: boolean;
  label?: string;
  defaultValue?: string;
  updateAddBtnTop?: Function;
  set: Function;
  index?: number;
}

class Replacer extends Component<ReplacerPropTypes,any> {
  constructor(props: ReplacerPropTypes) {
    // @ts-ignore
    super();
    this.state = {
      showJSONEditor: false,
      txt: props.defaultValue,
      placeholder: props.placeholder || "",
      src: null,
      label: props.label || "Replace With",
      showLabel: props.showLabel === undefined
    };

    try {
      let src = JSON.parse(props.defaultValue || '');
      if (src && typeof src === "object") {
        this.setState({src: src})
      }
    } catch (e) {

    }
  }


  componentDidUpdate(prevProps: any, { showJSONEditor }: { showJSONEditor: boolean }) {
    if (showJSONEditor !== this.state.showJSONEditor) {
      // @ts-ignore
      this.props.updateAddBtnTop();
    }
  }

  handleOverrideTxtChange = (txt: any) => {
    let src;
    try {
      src = JSON.parse(txt);
      if (!(src && typeof src === "object")) {
        src = null;
      }
    } catch (e) {

    }
    this.setState({ txt, src });
    // 更新缓存
    this.props.set("overrideTxt", txt);
  };
  // @ts-ignore
  handleJSONEditorChange = ({ updated_src: src }) => {
    let txt = JSON.stringify(src);
    this.setState({ txt, src });
    // 更新缓存
    this.props.set("overrideTxt", txt);
  };
  // @ts-ignore
  handleEditorSwitch = showJSONEditor => {
    this.setState({ showJSONEditor });
  };


  render() {

    return (
      <>
        {this.state.showLabel && <div className="replace-with"> {this.state.label} </div>}
        <textarea
          className="overrideTxt"
          placeholder={this.state.placeholder}
          style={{ resize: "none" }}
          value={this.state.txt}
          onChange={e => this.handleOverrideTxtChange(e.target.value)}
        />
        <Switch style={{ marginTop: "6px" }} onChange={this.handleEditorSwitch} checkedChildren="JSON Editor"
                unCheckedChildren="JSON Editor" size="small" />
        {this.state.showJSONEditor && (
          this.state.src ?
            <div className="JSONEditor">
              <ReactJson
                name={false}
                collapsed
                collapseStringsAfterLength={12}
                src={this.state.src}
                onEdit={this.handleJSONEditorChange}
                onAdd={this.handleJSONEditorChange}
                onDelete={this.handleJSONEditorChange}
                displayDataTypes={false}
              />
            </div> : <div className="JSONEditor Invalid">Invalid JSON</div>
        )}
      </>
    );
  }
}

export default Replacer
