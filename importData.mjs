import admin from "firebase-admin";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const serviceAccount = require("./serviceAccountKey.json");
const data = require("./data.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

const importData = async () => {
  for (const collectionName in data) {
    const collectionData = data[collectionName];
    const collectionRef = db.collection(collectionName);

    if (Array.isArray(collectionData)) {
      for (const docData of collectionData) {
        if (docData.id) {
          await collectionRef.doc(docData.id).set(docData);
        } else {
          await collectionRef.add(docData);
        }
      }
      console.log(`Successfully imported ${collectionData.length} documents into ${collectionName}`);
    } else if (typeof collectionData === 'object' && collectionData !== null) {
      // Handle single objects by using the collection name as the document ID
      await collectionRef.doc(collectionName).set(collectionData);
      console.log(`Successfully imported single document into ${collectionName}`);
    }
  }
};

importData().catch(console.error);
