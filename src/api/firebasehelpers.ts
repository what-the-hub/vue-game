import firebase from 'firebase/compat'

export async function firebaseCreateUser (email: string, password: string) {
  try {
    const resp = await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
    console.log(resp, 'yes')
  } catch (error) {
    alert(error.message)
  }
}
export async function firebaseSignIn (email: string, password: string) {
  try {
    const resp = await firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
    console.log(resp, 'yes')
  } catch (error) {
    alert(error.message)
  }
}
