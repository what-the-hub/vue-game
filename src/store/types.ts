
import { IStateArrow } from '@/store/modules/arrow/typesArrow'

export interface RootStateInterface {
  arrowStore: IStateArrow
}
export enum StoreModuleEnum {
  // eslint-disable-next-line no-unused-vars
  arrowStore = 'arrowStore'
}
