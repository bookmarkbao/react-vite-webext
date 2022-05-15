/*
 * @Descripttion:
 * @Author: xiangjun02
 * @Date: 2022-04-02 00:53:11
 * @LastEditors: xiangjun02
 * @LastEditTime: 2022-04-20 00:51:47
 */
import { useState, useEffect } from "react";
import { Switch } from "antd";
import ReactJson from "react-json-view";
import "./Replacer.less";
import PropTypes from 'prop-types';

const Replacer = (props: any) => {
  const { placeholder, showLabel, label = "Replace With", defaultValue = "", set } = props;
  const [showJSONEditor, setShowJSONEditor] = useState(false);
  const [txt, setTxt] = useState(defaultValue);
  const [src, setSrc] = useState({});
  useEffect(() => {
    try {
      let src = JSON.parse(defaultValue);
      if (src && typeof src === "object") {
        setSrc(src);
      }
    } catch (e) {
    }
  },[]);

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
    setTxt(txt);
    // 更新缓存
    set("overrideTxt", txt);
  };

  const handleJSONEditorChange = ({ updated_src: src }: any) => {
    let txt = JSON.stringify(src);
    setTxt(txt);
    setSrc(src);
    // 更新缓存
    set("overrideTxt", txt);
  };
  const handleEditorSwitch = (showJSONEditor: boolean) => {
    setShowJSONEditor(showJSONEditor)
  };

  return (
    <>
      {showLabel && <div className="replace-with"> {label} </div>}
      <textarea
        className="overrideTxt"
        placeholder={placeholder}
        style={{ resize: "none" }}
        value={txt}
        onChange={e => handleOverrideTxtChange(e.target.value)}
      />
      <Switch style={{ marginTop: "6px" }} onChange={handleEditorSwitch} checkedChildren="JSON Editor"
              unCheckedChildren="JSON Editor" size="small" />
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
Replacer.propTypes =  {
  placeholder: PropTypes.string,
  showLabel: PropTypes.bool,
  label: PropTypes.string,
  defaultValue: PropTypes.string,
  updateAddBtnTop: PropTypes.func,
  set: PropTypes.func,
  index: PropTypes.number
}

export default Replacer
