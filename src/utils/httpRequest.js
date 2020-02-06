

/**
 * axios封装
 * 请求拦截、响应拦截、错误统一处理
 */
import {
    baseUrl
} from '@/config/env'
import axios from 'axios';
import router from '../router';
import store from '@/store/index';
import { removeCookie, getCookie, setCookie } from '@/config/mUtils'
import { Toast } from 'vant';
import { gotoNativeLogin, setToken } from "@/utils/ios_android_fun";

/** 
 * 提示函数 
 * 禁止点击蒙层、显示一秒后关闭
 */
const tip = msg => {
    Toast({
        message: msg,
        duration: 1000,
        forbidClick: true
    });
}


/** 
 * 请求失败后的错误统一处理 
 * @param {Number} status 请求失败的状态码
 */
const errorHandle = (status, other) => {
    // 状态码判断
    switch (status) {
        // 401: 未登录状态，跳转登录页
        case 401:
            toLogin();
            break;
        // 403 token过期
        // 清除token并跳转登录页
        case 403:
            tip('登录过期，请重新登录');
            removeCookie('token');
            setTimeout(() => {
                gotoNativeLogin();
            }, 1000);
            break;
        // 404请求不存在
        case 404:
            tip('请求的资源不存在');
            break;
        default:
            console.log(other);
    }
}

// 创建axios实例
var http = axios.create({ timeout: 1000 * 12 });
// 设置post请求头
http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
/** 
 * 请求拦截器 
 * 每次请求前，如果存在token则在请求头中携带token 
 */
http.interceptors.request.use(
    config => {
        // 登录流程控制中，根据本地是否存在token判断用户的登录情况        
        // 但是即使token存在，也有可能token是过期的，所以在每次的请求头中携带token        
        // 后台根据携带的token判断用户的登录情况，并返回给我们对应的状态码        
        // 而后我们可以在响应拦截器中，根据状态码进行一些统一的操作。
        // removeCookie('token');
        // setToken("token")
        const token = getCookie('token');
        token && (config.headers['token'] = token);
        return config;
    },
    error => Promise.error(error))

// 响应拦截器
http.interceptors.response.use(
    // 请求成功
    res => res.status === 200 ? Promise.resolve(res) : Promise.reject(res),
    // 请求失败
    error => {
        const { response } = error;
        if (response) {
            // 请求已发出，但是不在2xx的范围 
            errorHandle(response.status, response.data.message);
            return Promise.reject(response);
        } else {
            // 处理断网的情况
            // eg:请求超时或断网时，更新state的network状态
            // network状态在app.vue中控制着一个全局的断网提示组件的显示隐藏
            // 关于断网组件中的刷新重新获取数据，会在断网组件中说明
            store.commit('changeNetwork', false);
        }
    });

/**
* 封装get方法
* @param url
* @param data
* @returns {Promise}
*/

export function get(url, params = {}) {
    return new Promise((resolve, reject) => {
        try {
            setToken("callBack");
            window["callBack"] = result => {
                let obj = JSON.parse(result);
                setCookie("token", obj.token);
                store.commit("setUserInfo", obj)
                http.get(baseUrl + url, {
                    params: params
                })
                    .then(response => {
                        if (response.data.code == 1100) {
                            removeCookie('token');
                            gotoNativeLogin();
                            return !1
                        }
                        resolve(response.data);
                    })
                    .catch(err => {
                        reject(err)
                    })
            };
        }
        catch (err) {
            // setCookie("token", "46be7fd3-4ffe-4b05-a5f8-2f147f935ecb");
            http.get(baseUrl + url, {
                params: params
            })
                .then(response => {
                    if (response.data.code == 1100) {
                        removeCookie('token');
                        gotoNativeLogin();
                        return !1
                    }
                    resolve(response.data);
                })
                .catch(err => {
                    reject(err)
                })
        }


    })
}


/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function post(url, data = {}) {
    return new Promise((resolve, reject) => {

        try {
            setToken("callBack");
            window["callBack"] = result => {
                let obj = JSON.parse(result);
                setCookie("token", obj.token);
                store.commit("setUserInfo", obj)
                http.post(baseUrl + url, data)
                .then(response => {
                    if (response.data.code == 1100) {
                        removeCookie('token');
                        gotoNativeLogin();
                        return !1
                    }
                    resolve(response.data);
                }, err => {
                    reject(err)
                })
            };
        }
        catch (err) {
            // setCookie("token", "46be7fd3-4ffe-4b05-a5f8-2f147f935ecb");
            http.post(baseUrl + url, data)
                .then(response => {
                    if (response.data.code == 1100) {
                        removeCookie('token');
                        gotoNativeLogin();
                        return !1
                    }
                    resolve(response.data);
                }, err => {
                    reject(err)
                })
        }
     
    })
}

/**
* 封装patch请求
* @param url
* @param data
* @returns {Promise}
*/

export function patch(url, data = {}) {
    return new Promise((resolve, reject) => {

        try {
            setToken("callBack");
            window["callBack"] = result => {
                let obj = JSON.parse(result);
                setCookie("token", obj.token);
                store.commit("setUserInfo", obj)
                http.post(baseUrl + url, data)
                .then(response => {
                    if (response.data.code == 1100) {
                        removeCookie('token');
                        gotoNativeLogin();
                        return !1
                    }
                    resolve(response.data);
                }, err => {
                    reject(err)
                })
            };
        }
        catch (err) {
            // setCookie("token", "46be7fd3-4ffe-4b05-a5f8-2f147f935ecb");
            http.patch(baseUrl + url, data)
                .then(response => {
                    if (response.data.code == 1100) {
                        removeCookie('token');
                        gotoNativeLogin();
                        return !1
                    }
                    resolve(response.data);
                }, err => {
                    reject(err)
                })
        }

    })
}

/**
* 封装put请求
* @param url
* @param data
* @returns {Promise}
*/

export function put(url, data = {}) {
    return new Promise((resolve, reject) => {

        try {
            setToken("callBack");
            window["callBack"] = result => {
                let obj = JSON.parse(result);
                setCookie("token", obj.token);
                store.commit("setUserInfo", obj)
                http.post(baseUrl + url, data)
                .then(response => {
                    if (response.data.code == 1100) {
                        removeCookie('token');
                        gotoNativeLogin();
                        return !1
                    }
                    resolve(response.data);
                }, err => {
                    reject(err)
                })
            };
        }
        catch (err) {
            // setCookie("token", "46be7fd3-4ffe-4b05-a5f8-2f147f935ecb");
            http.put(baseUrl + url, data)
                .then(response => {
                    if (response.data.code == 1100) {
                        removeCookie('token');
                        gotoNativeLogin();
                        return !1
                    }
                    resolve(response.data);
                }, err => {
                    reject(err)
                })
        }

    })
}