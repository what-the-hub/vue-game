import { ActionTree } from 'vuex'
import { Actions, EActionUser, EMutationUser, IStateUser } from '@/store/modules/user/typesUser'
import { RootStateInterface } from '@/store/types'

export const actions: ActionTree<IStateUser, RootStateInterface> & Actions = {
  [EActionUser.SET_USER]: ({
    commit
  }, payload) => {
    commit(EMutationUser.SET_USER, payload)
  },
  [EActionUser.CHECK_LOCAL_STORAGE_USER]: ({
    commit
  }, payload) => {
    console.log('checked: ', payload)
    commit(EMutationUser.SET_LOCAL_STORAGE_USER, payload)
  }
}
