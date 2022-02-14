import { GetterTree } from 'vuex'
import { RootStateInterface } from '@/store/types'
import { EGetterUser, Getters, IStateUser } from '@/store/modules/user/typesUser'

export const getters: GetterTree<IStateUser, RootStateInterface> & Getters = {
  [EGetterUser.GET_USER_EMAIL] (state) {
    return state.user?.email
  },
  [EGetterUser.GET_USER_DATA] (state) {
    const user = state.user
    return {
      uid: user?.uid,
      email: user?.email
    }
  }
}
