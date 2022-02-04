import { ActionTree } from 'vuex'
import { Actions, EActionScore, EMutationScore, IStateScore } from '@/store/modules/score/typesScore'
import { RootStateInterface } from '@/store/types'

export const actions: ActionTree<IStateScore, RootStateInterface> & Actions = {
  [EActionScore.SET_POINTS]: ({
    commit
  }, payload) => {
    commit(EMutationScore.SET_POINTS, payload)
  },
  [EActionScore.SET_LAST_STYLE]: ({
    commit
  }, payload) => {
    commit(EMutationScore.SET_LAST_STYLE, payload)
  }
}
