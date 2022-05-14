import {  onMessage } from "webext-bridge";

onMessage("get-todo-content",(res)=>{
    console.log("get-todo-content", res)
})
onMessage("toggle iframe",(res)=>{
    console.log("toggle iframe", res)
})

