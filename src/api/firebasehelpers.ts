import firebase from 'firebase/compat'
import { IUserDB } from '@/store/modules/user/typesUser'

export async function firebaseCreateUser (email: string, password: string) {
  try {
    const resp = await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
    console.log(resp, 'Created new user')
  } catch (error) {
    alert(error.message)
  }
}
export async function firebaseSignIn (email: string, password: string): Promise<IUserDB | undefined> {
  try {
    const resp = await firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
    return { email: resp.user?.email, uid: resp.user?.uid }
  } catch (error) {
    alert(error.message)
  }
}
