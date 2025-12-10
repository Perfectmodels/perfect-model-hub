import { useState, useEffect } from 'react';
import { ref, onValue, off } from 'firebase/database';
import { rtdb } from '@/integrations/firebase/client';

export interface FirebaseModel {
  id: string;
  name: string;
  gender: string;
  level?: string | null;
  height?: string | null;
  image_url?: string | null;
  is_public?: boolean | null;
  categories?: string[] | null;
  experience?: string | null;
  location?: string | null;
  chest?: string | null;
  waist?: string | null;
  hips?: string | null;
  shoe_size?: string | null;
  age?: number | null;
}

export const useFirebaseModels = () => {
  const [models, setModels] = useState<FirebaseModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const modelsRef = ref(rtdb, 'mannequins');

    const handleData = (snapshot: any) => {
      try {
        const data = snapshot.val();
        if (data) {
          const modelsArray: FirebaseModel[] = Object.entries(data).map(([key, value]) => {
            const modelData = value as Record<string, any>;
            return {
              id: key,
              name: modelData.name || 'Sans nom',
              gender: modelData.gender || 'Non spécifié',
              level: modelData.level,
              height: modelData.height,
              image_url: modelData.image_url,
              is_public: modelData.is_public,
              categories: modelData.categories,
              experience: modelData.experience,
              location: modelData.location,
              chest: modelData.chest,
              waist: modelData.waist,
              hips: modelData.hips,
              shoe_size: modelData.shoe_size,
              age: modelData.age,
            };
          });
          // Filter only public models
          const publicModels = modelsArray.filter(m => m.is_public !== false);
          setModels(publicModels);
        } else {
          setModels([]);
        }
        setLoading(false);
      } catch (err) {
        console.error('Error parsing Firebase data:', err);
        setError('Erreur lors du chargement des données');
        setLoading(false);
      }
    };

    const handleError = (err: Error) => {
      console.error('Firebase RTDB error:', err);
      setError('Erreur de connexion à Firebase');
      setLoading(false);
    };

    onValue(modelsRef, handleData, handleError);

    return () => {
      off(modelsRef);
    };
  }, []);

  return { models, loading, error };
};
