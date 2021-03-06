import { MutationTree } from 'vuex'
import { EMutationArrow, IStateArrow, Mutations } from '@/store/modules/arrow/typesArrow'

export const mutations: MutationTree<IStateArrow> & Mutations = {
  [EMutationArrow.SET_DATA]: (state, payload) => {
    state.arrowsData.push(payload)
  },
  [EMutationArrow.REMOVE_ARROW]: (state) => {
    state.arrowsData.shift()
  }
}
