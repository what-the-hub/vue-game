import { EActionUser } from '@/store/modules/user/typesUser'
import { getAuth, setPersistence, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, browserLocalPersistence } from 'firebase/auth'
import store from '../store'
import { StoreModuleEnum } from '@/store/types'

export async function firebaseCreateUser (email: string, password: string) {
  const auth = getAuth()
  try {
    await setPersistence(auth, browserLocalPersistence)
    await createUserWithEmailAndPassword(auth, email, password)
  } catch (error) {
    throw new Error(error.message)
  }
}

export async function firebaseAction (action: string, email: string, password: string) {
  const auth = getAuth()
  try {
    await setPersistence(auth, browserLocalPersistence)
    switch (action) {
      case 'authorisation':
        await signInWithEmailAndPassword(auth, email, password)
        break
      case 'register':
        await createUserWithEmailAndPassword(auth, email, password)
        break
      default: console.log('Something wrong')
    }
  } catch (error) {
    throw new Error(error.message)
  }
}

export function checkUser (): void {
  const auth = getAuth()
  onAuthStateChanged(auth, (user) => {
    if (user) {
      store.dispatch(
        `${StoreModuleEnum.userStore}/${EActionUser.SET_USER}`, user
      )
    } else {
      store.dispatch(
        `${StoreModuleEnum.userStore}/${EActionUser.SET_USER}`, null
      )
    }
  })
}

export async function logOut () {
  const auth = getAuth()
  try {
    await signOut(auth)
  } catch (error) {
    throw new Error(error.message)
  }
}
