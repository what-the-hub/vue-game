import Vue from 'vue'
import Vuex from 'vuex'
import { arrowStore } from '@/store/modules/arrow/arrow'
import { scoreStore } from '@/store/modules/score/score'
import { userStore } from '@/store/modules/user/user'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    arrowStore,
    scoreStore,
    userStore
  }
})
