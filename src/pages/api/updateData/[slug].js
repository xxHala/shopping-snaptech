import admin from 'firebase-admin';
import serviceAccount from 'src/service-account.json';

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      ...serviceAccount,
      privateKey: serviceAccount.private_key.replace(/\\n/g, '\n'),
    }),
  });
}

const handleDocumentUpdate = async (req, res, slug, collectionRef) => {
  const { body } = req;

  const documentData = body;
  const docId = documentData.id; // Assuming the id is passed in the request body

  try {
    const docRef = collectionRef.doc(docId);

    const doc = await docRef.get();

    if (doc.exists) {
      await docRef.update(documentData);
      res.status(200).json({ result: 'Document updated successfully', id: docId });
    } else {
      res.status(404).json({ error: 'Document not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error updating document', details: error.message });
  }
};

const update = async (req, res) => {
  if (req.method === 'POST' && req.body) {
    const { query: { slug } } = req;

    if (['category', 'product'].includes(slug)) {
      const db = admin.firestore();
      const collectionRef = db.collection(slug);

      await handleDocumentUpdate(req, res, slug, collectionRef);
    } else {
      res.status(400).json({ error: 'Invalid update request' });
    }
  } else {
    res.status(404).json({ error: 'Invalid request method or missing request body' });
  }
};

export default update;
