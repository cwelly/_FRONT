import Vue from 'vue'
import Vuex from 'vuex'
import caseStore from "@/store/modules/caseStore";
import mapStore from "@/store/modules/mapStore";
import userStore from "@/store/modules/userStore";
import createPersistedState from "vuex-persistedstate";
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    
  },
  getters: {
  },
  mutations: {
    
    
  },
  actions: {
    
  },
  modules: {
    userStore,
    mapStore,
    caseStore,
  },
  plugins: [
    createPersistedState({
      // 브라우저 종료시 제거하기 위해 localStorage가 아닌 sessionStorage로 변경. (default: localStorage)
      storage: sessionStorage,
    }),
  ],
})
