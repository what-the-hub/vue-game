import { doc, getDoc, collection, setDoc, updateDoc, arrayUnion } from 'firebase/firestore'
import { db } from '@/main'
import { IFirestoreScore, IFirestoreUserScore } from '@/types'

export async function getCurrentUserScoreDB (uid: string): Promise<IFirestoreScore[] | undefined> {
  try {
    const docRef = doc(db, 'users', uid)
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
      const { scoreList } = docSnap.data()
      return scoreList as IFirestoreScore[] | []
    }
  } catch (e) {
    throw new Error(e.message)
  }
}

export async function addUserToDB (uid: string, email: string | null): Promise<void> {
  try {
    const usersRef = collection(db, 'users')
    await setDoc(doc(usersRef, uid), {
      email: email,
      scoreList: []
    })
  } catch (e) {
    throw new Error(e.message)
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
