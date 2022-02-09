
import { IStateArrow } from '@/store/modules/arrow/typesArrow'
import { IStateScore } from '@/store/modules/score/typesScore'
import { IStateUser } from '@/store/modules/user/typesUser'

export interface RootStateInterface {
  arrowStore: IStateArrow,
  scoreStore: IStateScore,
  userStore: IStateUser
}
export enum StoreModuleEnum {
  // eslint-disable-next-line no-unused-vars
  arrowStore = 'arrowStore',
  // eslint-disable-next-line no-unused-vars
  scoreStore = 'scoreStore',
  // eslint-disable-next-line no-unused-vars
  userStore = 'userStore'
}
