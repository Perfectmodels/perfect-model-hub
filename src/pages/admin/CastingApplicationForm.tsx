import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { db } from '@/integrations/firebase/client';
import { doc, getDoc, addDoc, updateDoc, collection, serverTimestamp } from 'firebase/firestore';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/components/ui/use-toast';
import { Card, CardContent } from '@/components/ui/card';

const CastingApplicationForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    birth_date: '',
    gender: '',
    city: '',
    nationality: '',
    height: '',
    weight: '',
    experience: '',
    instagram: '',
    status: 'Nouveau',
  });

  useEffect(() => {
    if (id) {
      const fetchApplication = async () => {
        setLoading(true);
        try {
          const docRef = doc(db, 'casting_applications', id);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const data = docSnap.data();
            // Ensure all fields are strings for the form
            Object.keys(data).forEach(key => {
              if (data[key] === null || data[key] === undefined) {
                data[key] = '';
              }
            });
            setFormData(data);
          }
        } catch (error) {
          toast({ title: 'Erreur', description: 'Impossible de charger les données de la candidature.', variant: 'destructive' });
        }
        setLoading(false);
      };
      fetchApplication();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const dataToSubmit = {
      ...formData,
      height: Number(formData.height) || 0,
      weight: Number(formData.weight) || 0,
    };

    try {
      if (id) {
        const docRef = doc(db, 'casting_applications', id);
        await updateDoc(docRef, {
          ...dataToSubmit,
          updated_at: serverTimestamp()
        });
        toast({ title: 'Candidature mise à jour', description: 'La candidature a été mise à jour avec succès.' });
      } else {
        await addDoc(collection(db, 'casting_applications'), {
          ...dataToSubmit,
          created_at: serverTimestamp(),
          updated_at: serverTimestamp()
        });
        toast({ title: 'Candidature créée', description: 'La candidature a été créée avec succès.' });
      }
      navigate('/admin/casting-applications');
    } catch (error) {
        console.error("Submit error:", error);
      toast({ title: 'Erreur', description: `Une erreur s\'est produite: ${error.message}`, variant: 'destructive' });
    }
    setLoading(false);
  };

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">{id ? 'Modifier' : 'Créer'} une Candidature</h1>
        <Button type="button" variant="outline" onClick={() => navigate('/admin/casting-applications')}>
            Annuler
        </Button>
      </div>
      <form onSubmit={handleSubmit}>
        <Card>
            <CardContent className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <Label htmlFor="first_name">Prénom</Label>
                        <Input id="first_name" name="first_name" value={formData.first_name} onChange={handleChange} required />
                    </div>
                    <div>
                        <Label htmlFor="last_name">Nom</Label>
                        <Input id="last_name" name="last_name" value={formData.last_name} onChange={handleChange} required />
                    </div>
                    <div>
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required/>
                    </div>
                    <div>
                        <Label htmlFor="phone">Téléphone</Label>
                        <Input id="phone" name="phone" value={formData.phone} onChange={handleChange} />
                    </div>
                     <div>
                        <Label htmlFor="gender">Genre</Label>
                        <Select name="gender" value={formData.gender} onValueChange={(value) => handleSelectChange('gender', value)}>
                            <SelectTrigger><SelectValue placeholder="Sélectionner..." /></SelectTrigger>
                            <SelectContent>
                            <SelectItem value="male">Homme</SelectItem>
                            <SelectItem value="female">Femme</SelectItem>
                            <SelectItem value="other">Autre</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div>
                        <Label htmlFor="city">Ville</Label>
                        <Input id="city" name="city" value={formData.city} onChange={handleChange} />
                    </div>
                    <div>
                        <Label htmlFor="height">Taille (cm)</Label>
                        <Input id="height" name="height" type="number" value={formData.height} onChange={handleChange} />
                    </div>
                    <div>
                        <Label htmlFor="weight">Poids (kg)</Label>
                        <Input id="weight" name="weight" type="number" value={formData.weight} onChange={handleChange} />
                    </div>
                     <div>
                        <Label htmlFor="status">Statut</Label>
                        <Select name="status" value={formData.status} onValueChange={(value) => handleSelectChange('status', value)}>
                            <SelectTrigger><SelectValue placeholder="Sélectionner un statut" /></SelectTrigger>
                            <SelectContent>
                            <SelectItem value="Nouveau">Nouveau</SelectItem>
                            <SelectItem value="Présélectionné">Présélectionné</SelectItem>
                            <SelectItem value="Accepté">Accepté</SelectItem>
                            <SelectItem value="Refusé">Refusé</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                     <div>
                        <Label htmlFor="experience">Expérience</Label>
                        <Textarea id="experience" name="experience" value={formData.experience} onChange={handleChange} />
                    </div>
                </div>
                 <div className="flex justify-end gap-2">
                    <Button type="submit" disabled={loading}>{loading ? 'Enregistrement...' : (id ? 'Mettre à jour' : 'Créer')}</Button>
                </div>
            </CardContent>
        </Card>
      </form>
    </AdminLayout>
  );
};

export default CastingApplicationForm;
