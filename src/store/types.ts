
import { IStateArrow } from '@/store/modules/arrow/typesArrow'
import { IStateScore } from '@/store/modules/score/typesScore'

export interface RootStateInterface {
  arrowStore: IStateArrow,
  scoreStore: IStateScore
}
export enum StoreModuleEnum {
  // eslint-disable-next-line no-unused-vars
  arrowStore = 'arrowStore',
  // eslint-disable-next-line no-unused-vars
  scoreStore = 'scoreStore'
}
