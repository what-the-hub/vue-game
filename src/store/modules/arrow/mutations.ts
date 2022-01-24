import { MutationTree } from 'vuex'
import { EMutationArrow, IStateArrow, Mutations } from '@/store/modules/arrow/typesArrow'
import { arrowStore } from '@/store/modules/arrow/arrow'

export const mutations: MutationTree<IStateArrow> & Mutations = {
  [EMutationArrow.SET_DATA]: (state, payload) => {
    console.log('payload 2', payload)
    console.log(arrowStore.state)
    arrowStore.state = payload
    console.log(arrowStore.state, 'new state')
  }
}
