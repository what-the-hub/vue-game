import { IStateScore } from '@/store/modules/score/typesScore'
import { actions } from '@/store/modules/score/actions'
import { mutations } from '@/store/modules/score/mutations'
import { getters } from '@/store/modules/score/getters'
import { Module } from 'vuex'
import { RootStateInterface } from '@/store/types'

export const state: IStateScore = {
  score: 0
}

export const scoreStore: Module<IStateScore, RootStateInterface> = {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
}
