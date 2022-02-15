import { EActionUser } from '@/store/modules/user/typesUser'
import {
  getAuth,
  setPersistence,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  browserLocalPersistence
} from 'firebase/auth'
import store from '../store'
import { StoreModuleEnum } from '@/store/types'
import { addUserToDB } from '@/api/DBFirebaseHelpers'

export async function firebaseAction (
  action: string, email: string, password: string
): Promise<void> {
  const auth = getAuth()
  try {
    await setPersistence(auth, browserLocalPersistence)
    let user
    switch (action) {
      case 'authorisation':
        user = await signInWithEmailAndPassword(auth, email, password)
        break
      case 'registration':
        user = await createUserWithEmailAndPassword(auth, email, password)
        break
      default:
        console.log('Something wrong')
    }
    if (user) {
      await addUserToDB(user.user.uid, user.user.email)
    }
  } catch (error) {
    throw new Error(error.message)
  }
}

export function checkUser (): void {
  onAuthStateChanged(getAuth(), async (user) => {
    if (user) {
      await store.dispatch(
        `${StoreModuleEnum.userStore}/${EActionUser.SET_USER}`, user
      )
    } else {
      await store.dispatch(
        `${StoreModuleEnum.userStore}/${EActionUser.SET_USER}`, null
      )
    }
  })
}

export async function logOut (): Promise<void> {
  try {
    await signOut(getAuth())
  } catch (error) {
    throw new Error(error.message)
  }
}

export async function isAnyUserLoggedIn (): Promise<boolean> {
  try {
    await new Promise((resolve, reject) => {
      getAuth().onAuthStateChanged(
        user => {
          if (user) {
            resolve(user)
          } else {
            // eslint-disable-next-line prefer-promise-reject-errors
            reject()
          }
        }
      )
    }
    )
    return true
  } catch (error) {
    return false
  }
}
