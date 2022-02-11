import { GetterTree } from 'vuex'
import { RootStateInterface } from '@/store/types'
import { EGetterUser, Getters, IStateUser } from '@/store/modules/user/typesUser'

export const getters: GetterTree<IStateUser, RootStateInterface> & Getters = {
  [EGetterUser.GET_USER_EMAIL] (state) {
    return state.user?.email
  },
  async [EGetterUser.GET_USER_DATA] (state) {
    const user = await state.user
    return await user?.uid
  }
}
