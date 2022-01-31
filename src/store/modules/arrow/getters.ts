import { GetterTree } from 'vuex'
import { RootStateInterface } from '@/store/types'
import { EGetterArrow, IStateArrow, Getters } from '@/store/modules/arrow/typesArrow'

export const getters: GetterTree<IStateArrow, RootStateInterface> & Getters = {
  [EGetterArrow.GET_ARROWS] (state) {
    return state.arrowsData
  }
}
