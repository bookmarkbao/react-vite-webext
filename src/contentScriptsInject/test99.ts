/*
 * @Descripttion:
 * @Author: xiangjun02
 * @Date: 2022-04-19 01:22:05
 * @LastEditors: xiangjun02
 * @LastEditTime: 2022-04-19 01:40:17
 */
console.log('开启test99 === 通过自定义DOM事件来实现')
// 第一种方式实验- 通过
// 支持window.postMessage 或 window.dispatchEvent(myEvent)
window.addEventListener("injectEvent", function (params) {
    console.log(`test999 = injectEvent`,params);
})

// 第二种实验方式- 通过
let hiddenDiv = document.getElementById('myCustomEventDiv');
if(!hiddenDiv) {
	hiddenDiv = document.createElement('div');
	hiddenDiv.setAttribute('id','myCustomEventDiv' )
	hiddenDiv.style.display = 'none';
	document.body.appendChild(hiddenDiv);
}
hiddenDiv.addEventListener('myCustomEvent', function() {
	// @ts-ignore
    const eventData = document.getElementById('myCustomEventDiv').innerText;
	  console.log('收到自定义事件消息：' + eventData);
});

// 第三种
window.addEventListener("message",(e)=>{
	console.log('postMessage', e)
})
console.log('开启test99 === 通过自定义DOM事件来实现')
