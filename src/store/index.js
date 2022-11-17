import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo: null,
    aptList:null,
  },
  getters: {
  },
  mutations: {
    SET_USERINFO(state, userinfo) {
      state.userInfo =userinfo;
    },
    SET_APTLIST(state, aptList) {
      state.aptList = aptList;
    }
  },
  actions: {
    
  },
  modules: {
  }
})
