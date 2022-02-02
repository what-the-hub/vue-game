import { MutationTree } from 'vuex'
import {
  EMutationScore,
  IStateScore,
  Mutations
} from '@/store/modules/score/typesScore'

export const mutations: MutationTree<IStateScore> & Mutations = {
  [EMutationScore.SET_POINTS]: (state, payload) => {
    state.score += payload
  }
}
