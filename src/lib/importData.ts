import { rtdb } from "@/integrations/firebase/client";
import { ref, set, push } from "firebase/database";
import { MANNEQUINS_DATA } from "@/lib/mannequins.data";

export const importMannequinsToFirebase = async () => {
  const mannequinsRef = ref(rtdb, 'mannequins');
  let successCount = 0;
  let errorCount = 0;

  for (const mannequin of MANNEQUINS_DATA) {
    try {
      // Create a new unique key for each mannequin
      const newMannequinRef = push(mannequinsRef);
      await set(newMannequinRef, {
        name: mannequin.nom,
        username: mannequin.username,
        password_hash: mannequin.password,
        level: mannequin.niveau,
        gender: mannequin.genre,
        is_public: mannequin.public,
        location: mannequin.location,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      });
      successCount++;
      console.log(`✅ Imported: ${mannequin.nom}`);
    } catch (e) {
      console.error(`❌ Error importing ${mannequin.nom}:`, e);
      errorCount++;
    }
  }

  return { successCount, errorCount, total: MANNEQUINS_DATA.length };
};

export const clearAllMannequins = async () => {
  try {
    const mannequinsRef = ref(rtdb, 'mannequins');
    await set(mannequinsRef, null);
    console.log("✅ All mannequins cleared");
    return true;
  } catch (e) {
    console.error("❌ Error clearing mannequins:", e);
    return false;
  }
};
