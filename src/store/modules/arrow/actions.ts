import { ActionTree } from 'vuex'
import {
  Actions,
  EActionArrow,
  EMutationArrow,
  IArrowData,
  IStateArrow
} from '@/store/modules/arrow/typesArrow'
import { RootStateInterface } from '@/store/types'
import { getDirection } from '@/store/helpers'
import { state } from '@/store/modules/arrow/arrow'

export const actions: ActionTree<IStateArrow, RootStateInterface> & Actions = {
  [EActionArrow.ADD_DATA]: ({
    commit
  }) => {
    console.log('___ old: ', state.arrowsData)
    const payload: IArrowData = {
      id: Date.now(),
      direction: getDirection()
    }
    commit(EMutationArrow.SET_DATA, payload)
  }
}
