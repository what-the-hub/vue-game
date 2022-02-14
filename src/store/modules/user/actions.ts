import { ActionTree } from 'vuex'
import { Actions, EActionUser, EMutationUser, IStateUser } from '@/store/modules/user/typesUser'
import { RootStateInterface } from '@/store/types'
import { getCurrentUser } from '@/api/DBFirebaseHelpers'
import { state } from '@/store/modules/user/user'
import { ICurrentUserDB } from '@/types'

export const actions: ActionTree<IStateUser, RootStateInterface> & Actions = {
  [EActionUser.SET_USER]: ({
    commit
  }, payload) => {
    commit(EMutationUser.SET_USER, payload)
  },
  [EActionUser.GET_DB_SCORE]: async ({
    commit
  }) => {
    const payload: ICurrentUserDB | undefined = await getCurrentUser(state.user?.uid!)
    console.log('FROM DB: ', payload)
    commit(EMutationUser.SET_DB_SCORE, payload?.scoreList)
  }
}
