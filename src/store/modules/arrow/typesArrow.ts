import { EDirection } from '@/types'
import { ActionContext } from 'vuex'
import { RootStateInterface } from '@/store/types'

export enum EMutationArrow {
  // eslint-disable-next-line no-unused-vars
  SET_DATA = 'SET_DATA',
  // eslint-disable-next-line no-unused-vars
  UPDATE_DATA = 'UPDATE_DATA'
}

export enum EActionArrow {
  // eslint-disable-next-line no-unused-vars
  ADD_DATA = 'ADD_DATA',
  // eslint-disable-next-line no-unused-vars
  DELETE_ARROW = 'DELETE_ARROW'
}

export enum EGetterArrow {
  // eslint-disable-next-line no-unused-vars
  GET_ARROWS = 'GET_ARROWS'
}

export interface IArrowData {
  id: number | null
  direction: EDirection | null
}

export interface IStateArrow {
  arrowsData: IArrowData[]
}

export type Mutations<S = IStateArrow> = {
  [EMutationArrow.SET_DATA](state: S, payload: IArrowData): void
  [EMutationArrow.UPDATE_DATA](state: S, payload: IArrowData): void
}

export type AugmentedActionContext = {
  commit<K extends keyof Mutations>(
    key: K,
    payload: Parameters<Mutations[K]>[1]
  ): ReturnType<Mutations[K]>
} & Omit<ActionContext<IStateArrow, RootStateInterface>, 'commit'>

export interface Actions {
  [EActionArrow.ADD_DATA]({ commit }: AugmentedActionContext): void,
  [EActionArrow.DELETE_ARROW]({ commit }: AugmentedActionContext, payload: IArrowData): void
}

export type Getters<S = IStateArrow> = {
  [EGetterArrow.GET_ARROWS](state: S): IArrowData[]
}
