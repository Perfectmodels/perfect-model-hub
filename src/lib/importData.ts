
import { db, rtdb } from "@/integrations/firebase/client";
import { collection, addDoc } from "firebase/firestore";
import { ref, set } from "firebase/database";
import { MANNEQUINS_DATA } from "@/lib/mannequins.data";

export const importMannequinsData = async () => {
  const firestoreCollection = collection(db, "mannequins");

  for (const mannequin of MANNEQUINS_DATA) {
    try {
      // Import to Firestore
      const docRef = await addDoc(firestoreCollection, mannequin);
      console.log("Document written with ID: ", docRef.id);

      // Import to Realtime Database
      const rtdbRef = ref(rtdb, 'mannequins/' + docRef.id);
      await set(rtdbRef, mannequin);
      console.log("Data saved to Realtime Database for ID: ", docRef.id);

    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }
};
