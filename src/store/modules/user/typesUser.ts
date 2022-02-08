import { ActionContext } from 'vuex'
import { RootStateInterface } from '@/store/types'
import firebase from 'firebase/compat'
import User = firebase.User;

export enum EMutationUser {
  // eslint-disable-next-line no-unused-vars
  SET_USER = 'SET_USER'
}

export enum EActionUser {
  // eslint-disable-next-line no-unused-vars
  SET_USER = 'SET_USER'
}

export enum EGetterUser {

}

export interface IStateUser {
  userDB: User | null
}

export type Mutations<S = IStateUser> = {
  [EMutationUser.SET_USER](state: S, payload: User): void,
}

export type AugmentedActionContext = {
  commit<K extends keyof Mutations>(
    key: K,
    payload?: Parameters<Mutations[K]>[1]
  ): ReturnType<Mutations[K]>
} & Omit<ActionContext<IStateUser, RootStateInterface>, 'commit'>

export interface Actions {
  [EActionUser.SET_USER]({ commit }: AugmentedActionContext, payload: User): void,
}
