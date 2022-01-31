import { IStateArrow } from '@/store/modules/arrow/typesArrow'
import { actions } from '@/store/modules/arrow/actions'
import { mutations } from '@/store/modules/arrow/mutations'
import { Module } from 'vuex'
import { RootStateInterface } from '@/store/types'

export const state: IStateArrow = {
  arrowsData: []
}

export const arrowStore: Module<IStateArrow, RootStateInterface> = {
  namespaced: true,
  state,
  actions,
  mutations
}
