import { doc, getDoc, collection, setDoc, query, where, onSnapshot, updateDoc, arrayUnion } from 'firebase/firestore'
import { db } from '@/main'
import { IFirestoreScore, IFirestoreUser, IFirestoreUserScore } from '@/types'

export async function getCurrentUserScoreDB (uid: string): Promise<IFirestoreScore[] | undefined> {
  try {
    const docRef = doc(db, 'users', uid)
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
      console.log('Document data: ', docSnap.data())
      const { scoreList } = docSnap.data()
      return scoreList as IFirestoreScore[] | []
    }
  } catch (e) {
    throw new Error(e.message)
  }
}

export async function addUser (data: IFirestoreUser): Promise<void> {
  try {
    const usersRef = collection(db, 'users')
    await setDoc(doc(usersRef, data.uid), {
      email: data.email,
      scoreList: []
    })
  } catch (e) {
    throw new Error(e.message)
  }
}

export async function checkAndUpdateUser (data: IFirestoreUserScore) {
  // console.log('Got this data in fb: ', uid, email)
  const usersRef = doc(db, 'users', data.userData.uid as string)
  const docSnap = await getDoc(usersRef)
  if (docSnap.exists()) {
    await updateUserScore(data)
  } else {
    await addUser(data.userData)
    await checkAndUpdateUser(data)
  }
}

export async function updateUserScore (data: IFirestoreUserScore): Promise<void> {
  try {
    const usersRef = doc(db, 'users', data.userData.uid as string)
    const newData: IFirestoreScore[] = [{
      date: data.scoreData.date,
      score: data.scoreData.score
    }]
    await updateDoc(usersRef, {
      scoreList: arrayUnion(...newData)
    })
  } catch (e) {
    throw new Error(e.message)
  }
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
