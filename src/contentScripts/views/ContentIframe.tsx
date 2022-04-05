/*
 * @Descripttion:
 * @Author: xiangjun02
 * @Date: 2022-04-01 22:48:45
 * @LastEditors: xiangjun02
 * @LastEditTime: 2022-04-06 02:12:35
 */

export const ContentIframe = (props) => {
  const { show } = props;
  const iframeW = 850;
  const style = {
    height: "100%",
    width: `${iframeW}px`,
    minWidth: "1px",
    position: "fixed",
    top: "0px",
    right: "0px",
    let: "auto",
    bottom: "0px",
    zIndex: "99999",
    transform: show ? `translateX(0px)` : `translateX(${iframeW + 20}px)`,
    transition: `all 0.4s ease 0s`,
    boxShadow: `rgba(0, 0, 0, 0.12) 0px 0px 15px 2px`,
  };
  const src = chrome.extension.getURL("./dist/views/index.html");
  return (
    <iframe
      title="iframe"
      frameBorder="0"
      className="api-interceptor"
      src={src}
      style={style}
    />
  );
};

