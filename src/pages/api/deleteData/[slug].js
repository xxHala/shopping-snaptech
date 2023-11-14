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

const deleteData = async (req, res) => {
  const { id, slug } = req.query;

  if (isValidSlug(slug)) {
    const db = admin.firestore();
    const collectionRef = db.collection(slug);

    try {
      await deleteDocument(collectionRef, id);
      res.status(200).json({ result: 'Document successfully deleted' });
    } catch (error) {
      res.status(500).json({ error: 'Error deleting document', details: error.message });
    }
  } else {
    res.status(400).json({ error: 'Invalid slug' });
  }
};

const isValidSlug = (slug) => ['category', 'product'].includes(slug);

const deleteDocument = async (collectionRef, id) => {
  const docRef = collectionRef.doc(id);
  await docRef.delete();
};

export default deleteData;
