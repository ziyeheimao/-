/** Created by guangqiang on 2018-06-29 10:26:46 */

import Vue from 'vue'
import Vuex from 'vuex'
import demo from './modules/demo/demo'
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    userId: null,
    loginSuccess: null,
    token: null,
    longitude: null,
    latitude: null,
    changeNetwork: true,
    InnerSize: {
      width: 0,
      height: 0
    }
  },

  mutations: {
    setUserInfo(state, userInfo) {
      state.userId = userInfo.userId;
      state.longitude = userInfo.longitude;
      state.latitude = userInfo.latitude;
    },
    changeNetwork(state, boolean) {
      state.changeNetwork = boolean;
    },
    InnerSize(state, value) {
      state.InnerSize = value;
    }
  },
  getters: {
    InnerSize: (state) => {
      return state.InnerSize
    }
  },

  modules: {
    demoName: {
      namespaced: true,
      ...demo
    }
  }
})

export default store