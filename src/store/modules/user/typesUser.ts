import { ActionContext } from 'vuex'
import { RootStateInterface } from '@/store/types'
import firebase from 'firebase/compat'
import User = firebase.User
import { IFirestoreScore, IFirestoreUser } from '@/types'

export enum EMutationUser {
  // eslint-disable-next-line no-unused-vars
  SET_USER = 'SET_USER',
  // eslint-disable-next-line no-unused-vars
  SET_DB_SCORE = 'SET_DB_SCORE',
}

export enum EActionUser {
  // eslint-disable-next-line no-unused-vars
  SET_USER = 'SET_USER',
  // eslint-disable-next-line no-unused-vars
  GET_DB_SCORE = 'GET_DB_SCORE',
  // eslint-disable-next-line no-unused-vars
  UPDATE_DB_SCORE = 'UPDATE_DB_SCORE',
}

export enum EGetterUser {
  // eslint-disable-next-line no-unused-vars
  GET_USER_EMAIL= 'GET_USER_EMAIL',
  // eslint-disable-next-line no-unused-vars
  GET_USER_DATA= 'GET_USER_DATA'
}

export interface IStateUser {
  user: User | null,
  scoreFromDB: IFirestoreScore[] | []
}

export type Mutations<S = IStateUser> = {
  [EMutationUser.SET_USER](state: S, payload: IStateUser['user']): void,
  [EMutationUser.SET_DB_SCORE](state: S, payload: IFirestoreScore[] | []): void
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
  [EActionUser.GET_DB_SCORE](
    { commit }: AugmentedActionContext, payload: any
  ): Promise<void>,
  [EActionUser.UPDATE_DB_SCORE](
    { commit, dispatch }: AugmentedActionContext, payload: number
  ): Promise<void>,
}

export type Getters<S = IStateUser> = {
  [EGetterUser.GET_USER_EMAIL](state: S): string | null | undefined,
  [EGetterUser.GET_USER_DATA](state: S): IFirestoreUser | null
}
