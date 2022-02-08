import { ActionContext } from 'vuex'
import { RootStateInterface } from '@/store/types'

export enum EMutationUser {
  // eslint-disable-next-line no-unused-vars
  SET_USER = 'SET_USER'
}

export enum EActionUser {
  // eslint-disable-next-line no-unused-vars
  SET_USER = 'SET_USER'
}

export enum EGetterUser {
  // eslint-disable-next-line no-unused-vars
  GET_USER_EMAIL= 'GET_USER_EMAIL'
}

export interface IUserDB {
  email: string | null | undefined
  uid: string | undefined
}

export interface IStateUser {
  userDB: IUserDB | null
}

export type Mutations<S = IStateUser> = {
  [EMutationUser.SET_USER](state: S, payload: IUserDB): void,
}

export type AugmentedActionContext = {
  commit<K extends keyof Mutations>(
    key: K,
    payload?: Parameters<Mutations[K]>[1]
  ): ReturnType<Mutations[K]>
} & Omit<ActionContext<IStateUser, RootStateInterface>, 'commit'>

export interface Actions {
  [EActionUser.SET_USER]({ commit }: AugmentedActionContext, payload: IUserDB): void,
}

export type Getters<S = IStateUser> = {
  [EGetterUser.GET_USER_EMAIL](state: S): IUserDB['email']
}
