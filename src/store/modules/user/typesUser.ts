import { ActionContext } from 'vuex'
import { RootStateInterface } from '@/store/types'
import firebase from 'firebase/compat'
import User = firebase.User;

export enum EMutationUser {
  // eslint-disable-next-line no-unused-vars
  SET_USER = 'SET_USER',
  // eslint-disable-next-line no-unused-vars
  SET_LOCAL_STORAGE_USER = 'SET_LOCAL_STORAGE_USER'
}

export enum EActionUser {
  // eslint-disable-next-line no-unused-vars
  SET_USER = 'SET_USER',
  // eslint-disable-next-line no-unused-vars
  CHECK_LOCAL_STORAGE_USER = 'CHECK_LOCAL_STORAGE_USER'
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
  userDB: IUserDB | null,
  user: User | null
}

export type Mutations<S = IStateUser> = {
  [EMutationUser.SET_USER](state: S, payload: IUserDB): void,
  [EMutationUser.SET_LOCAL_STORAGE_USER](state: S, payload: IStateUser['user']): void
}

export type AugmentedActionContext = {
  commit<K extends keyof Mutations>(
    key: K,
    payload?: Parameters<Mutations[K]>[1]
  ): ReturnType<Mutations[K]>
} & Omit<ActionContext<IStateUser, RootStateInterface>, 'commit'>

export interface Actions {
  [EActionUser.SET_USER]({ commit }: AugmentedActionContext, payload: IUserDB): void,
  [EActionUser.CHECK_LOCAL_STORAGE_USER](
    { commit }: AugmentedActionContext, payload: IStateUser['user']
  ): void,
}

export type Getters<S = IStateUser> = {
  [EGetterUser.GET_USER_EMAIL](state: S): IUserDB['email']
}
