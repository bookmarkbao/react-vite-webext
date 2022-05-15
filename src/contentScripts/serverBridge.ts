import {  onMessage } from "webext-bridge";
import store from "~/store/store";
onMessage("get-todo-content",(res)=>{
    console.log("get-todo-content", res)
})
onMessage("toggle iframe", (res) => {
   store.dispatch({ type: 'switchOn' });
});
