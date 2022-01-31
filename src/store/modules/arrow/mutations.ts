import { MutationTree } from 'vuex'
import { EMutationArrow, IStateArrow, Mutations } from '@/store/modules/arrow/typesArrow'

export const mutations: MutationTree<IStateArrow> & Mutations = {
  [EMutationArrow.SET_DATA]: (state, payload) => {
    console.log(payload, 'payload')
    state.arrowsData?.push(payload)
    console.log('___ NEW: ', state.arrowsData)
  },
  [EMutationArrow.UPDATE_DATA]: (state, payload) => {
    console.log('_p', payload)
    state.arrowsData.shift()
    /*    state.arrowsData = state.arrowsData.filter(e => {
      return e.id !== payload.id && e.direction !== payload.direction
    }) */
  }
}
