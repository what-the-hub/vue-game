import { MutationTree } from 'vuex'
import {
  EMutationUser,
  IStateUser,
  Mutations
} from '@/store/modules/user/typesUser'

export const mutations: MutationTree<IStateUser> & Mutations = {
  [EMutationUser.SET_USER]: (state, payload) => {
    state.userDB = payload
  },
  [EMutationUser.SET_LOCAL_STORAGE_USER]: (state, payload) => {
    state.user = payload
    console.log('new state', state.user)
  }
}
