import { doc, getDoc, collection, setDoc, query, where, onSnapshot, updateDoc, arrayUnion } from 'firebase/firestore'
import { db } from '@/main'
import { IFirestoreScore, IFirestoreUser, IFirestoreUserScore } from '@/types'

export async function getDB () {
  const docRef = doc(db, 'users', 'bJMUJTaOJg0AH0PH7ot1')
  const docSnap = await getDoc(docRef)
  console.log(db)
  if (docSnap.exists()) {
    console.log('Document data: ', docSnap.data())
  } else {
    console.log('Noooo')
  }
}

export async function addUser (data: IFirestoreUser) {
  const usersRef = collection(db, 'users')
  await setDoc(doc(usersRef, data.uid), {
    email: data.email,
    scoreList: []
  })
}

export async function checkAndUpdateUser (data: IFirestoreUserScore) {
  // console.log('Got this data in fb: ', uid, email)
  const usersRef = doc(db, 'users', data.userData.uid)
  const docSnap = await getDoc(usersRef)
  if (docSnap.exists()) {
    console.log('User exists ')
    await updateUserScore(data)
  } else {
    console.log('no document')
    await addUser(data.userData)
    await checkAndUpdateUser(data)
  }
}

export async function updateUserScore (data: IFirestoreUserScore) {
  const usersRef = doc(db, 'users', data.userData.uid)
  const newData: IFirestoreScore[] = [{
    date: data.scoreData.date,
    score: data.scoreData.score
  }]
  await updateDoc(usersRef, {
    scoreList: arrayUnion(...newData)
  })
}

export async function onChange () {
  const q = query(collection(db, 'users'), where('uid', '==', 'TESTNEWUSER123'))
  // eslint-disable-next-line no-unused-vars
  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    const myUsers: any[] = []
    querySnapshot.forEach((doc) => {
      myUsers.push(doc.data().email)
    })
    console.log('CURRENT USER: ', myUsers.join(', '))
  })
}
