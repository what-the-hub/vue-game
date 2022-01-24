import { EDirection } from '@/types'
import { ActionContext } from 'vuex'
import { RootStateInterface } from '@/store/types'

export enum EMutationArrow {
  // eslint-disable-next-line no-unused-vars
  SET_DATA = 'SET_DATA'
}

export enum EActionArrow {
  // eslint-disable-next-line no-unused-vars
  ADD_DATA = 'ADD_DATA'
}

export interface IStateArrow {
  id: number;
  direction: EDirection
}

export type Mutations<S = IStateArrow> = {
  [EMutationArrow.SET_DATA](state: S, payload: IStateArrow): void
}

export type AugmentedActionContext = {
  commit<K extends keyof Mutations>(
    key: K,
    payload: Parameters<Mutations[K]>[1]
  ): ReturnType<Mutations[K]>
} & Omit<ActionContext<IStateArrow, RootStateInterface>, 'commit'>

export interface Actions {
  [EActionArrow.ADD_DATA]({ commit }: AugmentedActionContext, payload: IStateArrow): void
}
