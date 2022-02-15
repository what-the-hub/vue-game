import { MutationTree } from 'vuex'
import {
  EMutationScore,
  IStateScore,
  Mutations
} from '@/store/modules/score/typesScore'

export const mutations: MutationTree<IStateScore> & Mutations = {
  [EMutationScore.SET_POINTS]: (state, payload) => {
    state.score += payload
  },
  [EMutationScore.SET_LAST_STYLE]: (state, payload) => {
    state.lastStyle = payload
  },
  [EMutationScore.RESET_SCORE]: (state) => {
    state.score = 0
  }
}
