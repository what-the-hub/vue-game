import firebase from 'firebase/compat'
import { EActionUser, IUserDB } from '@/store/modules/user/typesUser'
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth'
import store from '../store'
import { StoreModuleEnum } from '@/store/types'

export async function firebaseCreateUser (email: string, password: string) {
  try {
    const resp = await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
    return { email: resp.user?.email, uid: resp.user?.uid }
  } catch (error) {
    throw new Error(error.message)
  }
}
export async function firebaseSignIn (email: string, password: string): Promise<IUserDB | undefined> {
  try {
    const resp = await firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
    // await setToken(resp)
    console.log('from resp: ', resp.user?.uid)
    return { email: resp.user?.email, uid: resp.user?.uid }
  } catch (error) {
    throw new Error(error.message)
  }
}

export async function newFirebaseSignIn (email: string, password: string) {
  const auth = getAuth()
  try {
    const persistence = firebase.auth.Auth.Persistence.LOCAL
    await firebase.auth().setPersistence(persistence)
    const resp = await signInWithEmailAndPassword(auth, email, password)
    console.log(resp)
    return { email: resp.user?.email, uid: resp.user?.uid }
  } catch (error) {
    throw new Error(error.message)
  }
}

// eslint-disable-next-line no-unused-vars
async function setToken (data: any) {
  const token = await data.user?.getIdToken()
  console.log('got token: ', token)
  await localStorage.setItem('token', token)
}

export async function checkLoggedUser () {
  const auth = firebase.auth()
  const user = auth.currentUser
  if (auth) {
    console.log('user', user)
  } else console.log('no user')
}

export function checkUser (): void {
  const auth = getAuth()
  onAuthStateChanged(auth, (user) => {
    if (user) {
      store.dispatch(
        `${StoreModuleEnum.userStore}/${EActionUser.CHECK_LOCAL_STORAGE_USER}`, user
      )
      console.log('in chage', user, store.state.userStore.user)
    } else {
      console.log('nothing')
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
