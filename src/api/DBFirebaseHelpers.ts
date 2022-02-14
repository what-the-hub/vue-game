import { doc, getDoc, collection, setDoc, query, where, onSnapshot, updateDoc, arrayUnion } from 'firebase/firestore'
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

export async function addUser (uid: string, email: string) {
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

export async function checkUser (uid: string, email: string) {
  console.log('Got this data in fb: ', uid, email)
  const usersRef = doc(db, 'users', uid)
  const docSnap = await getDoc(usersRef)
  if (docSnap.exists()) {
    console.log('Documents data: ', docSnap.data())
  } else {
    console.log('no document')
  }
}

export async function updateUserDB () {
  const usersRef = doc(db, 'users', 'new user 2')
  const newData = [{
    date: 999,
    score: 999
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