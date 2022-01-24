import { MutationTree } from 'vuex'
import { EMutationArrow, IStateArrow, Mutations } from '@/store/modules/arrow/typesArrow'
import { arrowStore } from '@/store/modules/arrow/arrow'

export const mutations: MutationTree<IStateArrow> & Mutations = {
  [EMutationArrow.SET_DATA]: (state, payload) => {
    arrowStore.state = payload
  }
}
