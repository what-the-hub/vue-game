// import { IArrowData } from '@/types'

import { IStateArrow } from '@/store/modules/arrow/typesArrow'
import { actions } from '@/store/modules/arrow/actions'
import { mutations } from '@/store/modules/arrow/mutations'
import { EDirection } from '@/types'
import { Module } from 'vuex'
import { RootStateInterface } from '@/store/types'

export const state: IStateArrow = {
  id: 0,
  direction: EDirection.Right
}

export const arrowStore: Module<IStateArrow, RootStateInterface> = {
  namespaced: true,
  state,
  actions,
  mutations
}
/* export default {
  namespaced: true,
  state: {
    directions: ['ss']
  },
  mutations: {
    add (state: any) {
      state.direction = 'sssss'
    }
  },
  actions: {
    add ({ commit }: { commit: Function }) {
      commit('add')
    }
  }
} */
