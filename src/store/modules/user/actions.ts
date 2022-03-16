import { ActionTree } from 'vuex'
import {
  Actions,
  EActionUser,
  EGetterUser,
  EMutationUser,
  IStateUser
} from '@/store/modules/user/typesUser'
import { RootStateInterface } from '@/store/types'
import { getCurrentUserScoreDB, updateUserScore } from '@/api/DBFirebaseHelpers'
import { state } from '@/store/modules/user/user'
import { IFirestoreScore, IFirestoreUserScore } from '@/types'

export const actions: ActionTree<IStateUser, RootStateInterface> & Actions = {
  [EActionUser.SET_USER]: ({
    commit
  }, payload) => {
    commit(EMutationUser.SET_USER, payload)
  },
  [EActionUser.GET_DB_SCORE]: async ({
    commit
  }) => {
    if (state.user) {
      const payload: IFirestoreScore[] | undefined = await getCurrentUserScoreDB(state.user.uid)
      commit(EMutationUser.SET_DB_SCORE, payload)
    } else throw new Error('There are no authorised users')
  },
  [EActionUser.UPDATE_DB_SCORE]: async ({
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    commit
    , dispatch, getters
  }, payload) => {
    const gameData: IFirestoreUserScore = {
      userData: getters[`${EGetterUser.GET_USER_DATA}`],
      scoreData: {
        date: Date.now(),
        score: payload
      }
    }
    await updateUserScore(gameData)
    await dispatch(EActionUser.GET_DB_SCORE)
  }
}
