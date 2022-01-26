import { GetterTree } from 'vuex'
import { RootStateInterface } from '@/store/types'
import { IStateScore, Getters, EGetterScore } from '@/store/modules/score/typesScore'

export const getters: GetterTree<IStateScore, RootStateInterface> & Getters = {
  [EGetterScore.GET_SCORE] (state): number {
    return state.score
  }
}
