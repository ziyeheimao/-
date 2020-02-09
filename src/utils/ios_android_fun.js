import { setCookie } from "@/config/mUtils";
import { Dialog } from 'vant';
import { routerTo, goBack } from '@/utils/index'
import PATH from '@/constants/pathConfig'
import store from '@/store'
import { Toast } from 'vant';

const u = navigator.userAgent;
const isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
const isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
const iOSFun = (type, callBack, position) => {
    // Toast(type + callBack)
    var params = { "callBack": callBack, type, position };
    var paramsStr = JSON.stringify(params);
    window.webkit.messageHandlers.showDialog.postMessage(paramsStr);
}
const androidFun = (type, callBack, position) => {
    var params = { "callBack": callBack, type, position };
    var paramsStr = JSON.stringify(params);
    androidProxy.showDialog(paramsStr);
}
const gotoNativeLogin = () => { // 通知移动端 token过期 返回登录页
    if (isiOS) {
        iOSFun(1);
    }
    if (isAndroid) {
        androidFun(1)
    }
}
const setToken = (callBack) => { // 获取token
    if (isiOS) {
        iOSFun(0, callBack);
    }
    if (isAndroid) {
        androidFun(0, callBack);
    }

    // window[callBack] = result => {
        
    //     let obj = JSON.parse(result);
    //     if (obj && obj.token) {
    //         setCookie("token", obj.token);
    //         store.commit("setUserInfo",obj)
    //         // document.querySelector(".a").innerHTML = result
    //     }
    // };
}
// 导航
const sdk = (position) => {
    if (isiOS) {
        iOSFun(2, "", position);
    }
    if (isAndroid) {
        androidFun(2, "", position);
    }
}
export { gotoNativeLogin, setToken, sdk }
