import { ActionContext } from 'vuex'
import { RootStateInterface } from '@/store/types'
import firebase from 'firebase/compat'
import User = firebase.User;

export enum EMutationUser {
  // eslint-disable-next-line no-unused-vars
  SET_USER = 'SET_USER',
}

export enum EActionUser {
  // eslint-disable-next-line no-unused-vars
  SET_USER = 'SET_USER'
}

export enum EGetterUser {
  // eslint-disable-next-line no-unused-vars
  GET_USER_EMAIL= 'GET_USER_EMAIL'
}

export interface IStateUser {
  user: User | null
}

export type Mutations<S = IStateUser> = {
  [EMutationUser.SET_USER](state: S, payload: IStateUser['user']): void
}

export type AugmentedActionContext = {
  commit<K extends keyof Mutations>(
    key: K,
    payload?: Parameters<Mutations[K]>[1]
  ): ReturnType<Mutations[K]>
} & Omit<ActionContext<IStateUser, RootStateInterface>, 'commit'>

export interface Actions {
  [EActionUser.SET_USER](
    { commit }: AugmentedActionContext, payload: IStateUser['user']
  ): void,
}

export type Getters<S = IStateUser> = {
  [EGetterUser.GET_USER_EMAIL](state: S): string | null | undefined
}
