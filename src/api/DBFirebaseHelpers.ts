import { doc, getDoc, collection, setDoc, query, where, onSnapshot } from 'firebase/firestore'
import { db } from '@/main'

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

export async function addUser () {
  const usersRef = collection(db, 'users')
  await setDoc(doc(usersRef, 'new user 2'), {
    email: 'new user 23 test',
    scoreList: [{
      date: 11111111112,
      score: 333
    },
    {
      date: 222,
      score: 111
    }
    ],
    uid: 'TESTNEWUSER123'
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
