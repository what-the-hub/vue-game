import { MutationTree } from 'vuex'
import {
  EMutationUser,
  IStateUser,
  Mutations
} from '@/store/modules/user/typesUser'

export const mutations: MutationTree<IStateUser> & Mutations = {
  [EMutationUser.SET_USER]: (state, payload) => {
    state.user = payload
  },
  [EMutationUser.SET_DB_SCORE]: (state, payload) => {
    console.log(payload, 'payload')
    state.scoreFromDB = payload
  }
}
