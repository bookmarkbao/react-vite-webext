/*
 * @Descripttion:
 * @Author: xiangjun02
 * @Date: 2022-04-02 00:53:11
 * @LastEditors: xiangjun02
 * @LastEditTime: 2022-04-20 00:51:47
 */
import { useState, useEffect } from "react";
import { Switch, Input } from "antd";
import ReactJson from "react-json-view";
import "./Replacer.less";
import PropTypes from "prop-types";

const txtFormat = (text: string) => {
  try {
    const txt = JSON.parse(text);
    return JSON.stringify(txt, null, "\t");
  } catch (e) {
    return text;
  }
};
const Replacer = (props: any) => {
  const { placeholder, showLabel, label = "Replace With", defaultValue = "", set } = props;
  const [showJSONEditor, setShowJSONEditor] = useState(false);
  const [txt, setTxt] = useState(txtFormat(defaultValue));
  const [src, setSrc] = useState();
  const [showMaxRows, setShowMaxRows] = useState(false);
  useEffect(() => {
    try {
      let src = JSON.parse(defaultValue);
      if (src && typeof src === "object") {
        setSrc(src);
      }
    } catch (e) {
    }
  }, []);


  const handleOverrideTxtChange = (txt: string) => {
    let src;
    try {
      src = JSON.parse(txt);
      if (!(src && typeof src === "object")) {
        src = null;
      }
      setSrc(src);
    } catch (e) {

    }
    setTxt(txtFormat(txt));
    // 更新缓存
    set("overrideTxt", txt);
  };

  const handleJSONEditorChange = ({ updated_src: src }: any) => {
    let txt = JSON.stringify(src);
    setTxt(txtFormat(txt));
    setSrc(src);
    // 更新缓存
    set("overrideTxt", txt);
  };
  const handleEditorSwitch = (showJSONEditor: boolean) => {
    setShowJSONEditor(showJSONEditor);
  };

  return (
    <>
      {showLabel && <div className="replace-with"> {label} </div>}
      <Input.TextArea
        placeholder={placeholder}
        value={txt}
        autoSize={{ minRows: 2, maxRows: showMaxRows ? 999 : 6 }}
        onChange={e => handleOverrideTxtChange(e.target.value)}
      />

      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Switch style={{ marginTop: "6px" }} onChange={handleEditorSwitch} checkedChildren="JSON Editor"
                unCheckedChildren="JSON Editor" size="small" />
        <a onClick={() => {
          setShowMaxRows(!showMaxRows);
        }}>
          {showMaxRows ? "收起" : "展开"}
        </a>
      </div>

      {showJSONEditor && (src ?
          <div className="JSONEditor">
            <ReactJson
              name={false}
              collapsed
              collapseStringsAfterLength={12}
              src={src}
              onEdit={handleJSONEditorChange}
              onAdd={handleJSONEditorChange}
              onDelete={handleJSONEditorChange}
              displayDataTypes={false}
            />
          </div> : <div className="JSONEditor Invalid">Invalid JSON</div>
      )}
    </>
  );
};
Replacer.propTypes = {
  placeholder: PropTypes.string,
  showLabel: PropTypes.bool,
  label: PropTypes.string,
  defaultValue: PropTypes.string,
  updateAddBtnTop: PropTypes.func,
  set: PropTypes.func,
  index: PropTypes.number
};

export default Replacer;
