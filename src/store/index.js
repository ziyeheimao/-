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
    },
    ChatRecord: [] // 聊天记录
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
    },
    ChatRecord(state, value) {
      if (value) state.ChatRecord.push(value)
      else state.ChatRecord = []
    }
  },
  getters: {
    InnerSize: (state) => {
      return state.InnerSize
    },
    ChatRecord: (state) => {
      return state.ChatRecord
    }
  },

  actions: {
    AChatRecord: (context, data) => {
      context.commit('ChatRecord', data)
    },
  },

  modules: {
    demoName: {
      namespaced: true,
      ...demo
    }
  }
})

export default store