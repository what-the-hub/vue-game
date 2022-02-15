import { ActionTree } from 'vuex'
import { Actions, EActionUser, EMutationUser, IStateUser } from '@/store/modules/user/typesUser'
import { RootStateInterface } from '@/store/types'
import { getCurrentUserScoreDB, updateUserScore } from '@/api/DBFirebaseHelpers'
import { state } from '@/store/modules/user/user'
import { IFirestoreScore } from '@/types'

export const actions: ActionTree<IStateUser, RootStateInterface> & Actions = {
  [EActionUser.SET_USER]: ({
    commit
  }, payload) => {
    commit(EMutationUser.SET_USER, payload)
  },
  [EActionUser.GET_DB_SCORE]: async ({
    commit
  }) => {
    const payload: IFirestoreScore[] | undefined = await getCurrentUserScoreDB(state.user?.uid!)
    console.log('FROM DB: ', payload)
    commit(EMutationUser.SET_DB_SCORE, payload)
  },
  [EActionUser.UPDATE_DB_SCORE]: async ({
    commit
    , dispatch
  }, payload) => {
    await updateUserScore(payload)
    await dispatch(EActionUser.GET_DB_SCORE)
  }
}
