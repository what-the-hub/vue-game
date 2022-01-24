import { ActionTree } from 'vuex'
import { Actions, EActionArrow, EMutationArrow, IStateArrow } from '@/store/modules/arrow/typesArrow'
import { RootStateInterface } from '@/store/types'

export const actions: ActionTree<IStateArrow, RootStateInterface> & Actions = {
  [EActionArrow.ADD_DATA]: ({ commit, dispatch }, payload) => {
    console.log('added', commit)
    const payloadData = payload
    commit(EMutationArrow.SET_DATA, payloadData)
  }
}
