import { ActionContext } from 'vuex'
import { RootStateInterface } from '@/store/types'

export enum EMutationScore {
  // eslint-disable-next-line no-unused-vars
  SET_POINTS = 'SET_POINTS',
  // eslint-disable-next-line no-unused-vars
  SET_LAST_STYLE = 'SET_LAST_STYLE'
}

export enum EActionScore {
  // eslint-disable-next-line no-unused-vars
  SET_POINTS = 'SET_POINTS',
  // eslint-disable-next-line no-unused-vars
  SET_LAST_STYLE = 'SET_LAST_STYLE'
}

export enum EGetterScore {
  // eslint-disable-next-line no-unused-vars
  GET_SCORE = 'GET_SCORE'
}

export interface IStateScore {
  score: number,
  lastStyle: string
}

export type Mutations<S = IStateScore> = {
  [EMutationScore.SET_POINTS](state: S, payload: number): void,
  [EMutationScore.SET_LAST_STYLE](state: S, payload: string): void
}

export type AugmentedActionContext = {
  commit<K extends keyof Mutations>(
    key: K,
    payload: Parameters<Mutations[K]>[1]
  ): ReturnType<Mutations[K]>
} & Omit<ActionContext<IStateScore, RootStateInterface>, 'commit'>

export interface Actions {
  [EActionScore.SET_POINTS]({ commit }: AugmentedActionContext, payload: number): void,
  [EActionScore.SET_LAST_STYLE]({ commit }: AugmentedActionContext, payload: string): void
}

export type Getters<S = IStateScore> = {
  [EGetterScore.GET_SCORE](state: S): number
}
