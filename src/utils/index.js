/** Created by guangqiang on 2018-06-29 18:10:51 */

import { RegExpr } from './regex'
import { _array } from './arrayExtension'
import { deepClone } from './deepClone'
import * as _string from './stringExtension'
import * as formatTime from './formatTime'
import * as math from './math'
import router from '@/router';

const strToH5 = function (val) {
  val = val.replace(/\n/g, '<p/>') // 换行替换
  // val = val.replace(/《《/g, '<h4>') // 标题替换
  // val = val.replace(/》》/g, '</h4>') // 标题替换

  // val = val.replace(/@@/g, '<pre><code>') // 代码块替换
  // val = val.replace(/##/g, '</code></pre>') // 代码块替换
  return val
}

const clone = (obj) => {
  let newObj = {}
  for (let k in obj) {
    newObj[k] = obj[k]
  }
  return newObj
}
const getDate = () => {
  var curDate = new Date();
  // var curYear =curDate.getFullYear();  //获取完整的年份(4位,1970-????)
  // var curMonth = curDate.getMonth()+1;  //获取当前月份(0-11,0代表1月)
  // var curDay = curDate.getDate();       //获取当前日(1-31)
  // var curWeekDay = curDate.getDay();    //获取当前星期X(0-6,0代表星期天)
  var curHour = curDate.getHours();      //获取当前小时数(0-23)
  var curMinute = curDate.getMinutes();   // 获取当前分钟数(0-59)
  // var curSec =curDate.getSeconds();      //获取当前秒数(0-59)
  var Current= curHour + ':' + curMinute
  return Current;
}

const routerTo = (path, query) => {
  router.push({
    path,
    query
  })
}
const goBack = () => {
  window.history.length > 1 ? router.go(-1) : router.push('/')
}
const scrollToTop = (element, to, duration) => {
  if (duration <= 0) return;
  const diff = to - element.scrollTop;
  const perTick = diff / duration * 10;
  this.timer = setTimeout(() => {
    element.scrollTop += perTick;
    if (element.scrollTop === to) return;
    scrollToTop(element, to, duration - 10);
  }, 10);
}
const offset = (element) => {
  let offest = {
    top: 0,
    left: 0
  };

  let _position;
  const getOffset = (node, init) => {
    // 非Element 终止递归
    if (node.nodeType !== 1) {
      return;
    }
    _position = window.getComputedStyle(node)['position'];

    // position=static: 继续递归父节点
    if (typeof (init) === 'undefined' && _position === 'static') {
      getOffset(node.parentNode);
      return;
    }
    offest.top = node.offsetTop + offest.top - node.scrollTop;
    offest.left = node.offsetLeft + offest.left - node.scrollLeft;

    // position = fixed: 获取值后退出递归
    if (_position === 'fixed') {
        return;
    }

    getOffset(node.parentNode);
  }
  getOffset(element, true);

  return offest;

  // 递归获取 offset, 可以考虑使用 getBoundingClientRect

}

export { math, RegExpr, _array, toast, deepClone, _string, formatTime, routerTo, goBack, scrollToTop, offset, clone, strToH5, getDate }


