import Vue from 'vue'
import Vuex from 'vuex'
import { arrowStore } from '@/store/modules/arrow/arrow'
import { scoreStore } from '@/store/modules/score/score'

Vue.use(Vuex)

export default new Vuex.Store({
  mutations: {
  },
  actions: {
  },
  getters: {

  },
  modules: {
    arrowStore,
    scoreStore
  }
})
