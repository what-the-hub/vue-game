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
