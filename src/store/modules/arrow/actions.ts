import { ActionTree } from 'vuex'
import {
  Actions,
  EActionArrow,
  EMutationArrow,
  IArrowData,
  IStateArrow
} from '@/store/modules/arrow/typesArrow'
import { RootStateInterface } from '@/store/types'
import { getDirection } from '@/helpers/getDirectionHelper'

export const actions: ActionTree<IStateArrow, RootStateInterface> & Actions = {
  [EActionArrow.ADD_DATA]: ({
    commit
  }) => {
    const payload: IArrowData = {
      id: Date.now(),
      direction: getDirection()
    }
    commit(EMutationArrow.SET_DATA, payload)
  },
  [EActionArrow.DELETE_ARROW]: ({
    commit
  }) => {
    commit(EMutationArrow.REMOVE_ARROW)
  }
}
