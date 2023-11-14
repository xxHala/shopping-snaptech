
import admin from 'firebase-admin';
import serviceAccount from 'src/service-account.json';

// Initialize Firebase Admin SDK
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      ...serviceAccount,
      privateKey: serviceAccount.private_key.replace(/\\n/g, '\n'),
    }),
  });
}
const get = async (req, res) => {
  const { slug, category } = req.query

  let db = admin.firestore()

  const collectionRef = db.collection(slug)

  collectionRef
    .get()
    .then(snapshot => {
      const result = []
      if (snapshot.empty) {
        console.log('No documents found.')
        res.json({ result: [] })
      }

      if (category && slug === 'product') {
        snapshot.forEach(doc => {
          if (doc.data().category === category) {
            result.push({ id: doc.id, ...doc.data() })
          }
        })
      } else {
        snapshot.forEach(doc => {
          result.push({ id: doc.id, ...doc.data() })
        })
      }

      res.status(200).json({ result })
    })
    .catch(err => {
      console.error('Error getting documents', err)
    })
}

// export default authMiddleware(add)
export default get
