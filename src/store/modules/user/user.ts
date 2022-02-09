import { actions } from '@/store/modules/user/actions'
import { mutations } from '@/store/modules/user/mutations'
import { getters } from '@/store/modules/user/getters'
import { Module } from 'vuex'
import { RootStateInterface } from '@/store/types'
import { IStateUser } from '@/store/modules/user/typesUser'

export const state: IStateUser = {
  userDB: null
}

export const userStore: Module<IStateUser, RootStateInterface> = {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
}
