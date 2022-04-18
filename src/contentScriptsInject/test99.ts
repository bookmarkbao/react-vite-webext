/*
 * @Descripttion: 
 * @Author: xiangjun02
 * @Date: 2022-04-19 01:22:05
 * @LastEditors: xiangjun02
 * @LastEditTime: 2022-04-19 01:40:17
 */


const test99 = () => {
    console.log('test99');
}

test99();

function log(){
    console.log(...arguments);
}
window.log = log;

// 定义全局函数
log('无颜色 %c 这是test999定义的全局函数', 'color:red;')