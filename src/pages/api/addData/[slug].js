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

  try {
    const docRef = await collectionRef.add(documentData);

    res.status(200).json({ result: 'Document created successfully', id: docRef.id });
  } catch (error) {
    res.status(500).json({ error: 'Error creating document', details: error.message });
  }
};

const add = async (req, res) => {
  if (req.method === 'POST' && req.body) {
    const { query: { slug } } = req;

    if (['category', 'product'].includes(slug)) {
      const db = admin.firestore();
      const collectionRef = db.collection(slug);

      await handleDocumentUpdate(req, res, slug, collectionRef);
    } else {
      res.status(400).json({ error: 'Invalid add request' });
    }
  } else {
    res.status(404).json({ error: 'Invalid request method or missing request body' });
  }
};

export default add;
