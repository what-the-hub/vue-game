import { doc, getDoc, setDoc, updateDoc, arrayUnion } from 'firebase/firestore'
import { db } from '@/main'
import { IFirestoreScore, IFirestoreUserScore } from '@/types'

export async function getCurrentUserScoreDB (uid: string): Promise<IFirestoreScore[] | undefined> {
  try {
    const usersDocumentRef = doc(db, 'users', uid)
    const currentUserSnap = await getDoc(usersDocumentRef)
    if (currentUserSnap.exists()) {
      const { scoreList } = currentUserSnap.data()
      return scoreList as IFirestoreScore[] | []
    }
  } catch (e) {
    throw new Error(e.message)
  }
}

export async function addUserToDB (uid: string, email: string | null): Promise<void> {
  try {
    const usersDocumentRef = doc(db, 'users', uid)
    const currentUserSnap = await getDoc(usersDocumentRef)
    if (!currentUserSnap.exists()) {
      await setDoc(usersDocumentRef, {
        email: email,
        scoreList: []
      })
    }
  } catch (e) {
    throw new Error(e.message)
  }
}

export async function updateUserScore (data: IFirestoreUserScore): Promise<void> {
  try {
    const usersDocumentRef = doc(db, 'users', data.userData.uid as string)
    const newData: IFirestoreScore[] = [{
      date: data.scoreData.date,
      score: data.scoreData.score
    }]
    await updateDoc(usersDocumentRef, {
      scoreList: arrayUnion(...newData)
    })
  } catch (e) {
    throw new Error(e.message)
  }
}
