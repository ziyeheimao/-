// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from '@/App'
import router from '@/router'
import '@/components/vant-ui'
import store from '@/store'
import api from '@/api' // 导入api接口
import PATH from '@/constants/pathConfig'
import {routerTo,goBack} from '@/utils/index'
import constants from '@/constants/commonType'
import 'lib-flexible/flexible'
import filters from './filters'
import FastClick from 'fastclick'


import Vant from 'vant';
import 'vant/lib/index.css';

Vue.use(Vant);


// FastClick.attach(document.body);
Vue.config.productionTip = false
Vue.prototype.$api = api; // 将api挂载到vue的原型上复制代码
Vue.prototype.$path=PATH;//路由地址常量
Vue.prototype.$routerTo = routerTo;
Vue.prototype.goBack = goBack;
/* eslint-disable no-new */
Vue.prototype.$constant = constants

Object.keys(filters).forEach(k => Vue.filter(k, filters[k])) // 调用过滤器

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})














