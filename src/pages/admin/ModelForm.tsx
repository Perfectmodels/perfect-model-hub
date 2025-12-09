import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { db } from '@/integrations/firebase/client';
import { doc, getDoc, addDoc, updateDoc, collection } from 'firebase/firestore';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/components/ui/use-toast';

const ModelForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    status: 'draft'
  });

  useEffect(() => {
    if (id) {
      const fetchModel = async () => {
        const docRef = doc(db, 'models', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setFormData(docSnap.data());
        }
      };
      fetchModel();
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
    try {
      if (id) {
        const docRef = doc(db, 'models', id);
        await updateDoc(docRef, formData);
        toast({ title: 'Mannequin mis à jour', description: 'Le mannequin a été mis à jour avec succès.' });
      } else {
        await addDoc(collection(db, 'models'), formData);
        toast({ title: 'Mannequin créé', description: 'Le mannequin a été créé avec succès.' });
      }
      navigate('/admin/models');
    } catch (error) {
      toast({ title: 'Erreur', description: 'Une erreur s\'est produite.', variant: 'destructive' });
    }
  };

  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold mb-6">{id ? 'Modifier' : 'Créer'} un mannequin</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow space-y-4">
        <div>
          <Label htmlFor="first_name">Prénom</Label>
          <Input id="first_name" name="first_name" value={formData.first_name} onChange={handleChange} />
        </div>
        <div>
          <Label htmlFor="last_name">Nom</Label>
          <Input id="last_name" name="last_name" value={formData.last_name} onChange={handleChange} />
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} />
        </div>
        <div>
          <Label htmlFor="phone">Téléphone</Label>
          <Input id="phone" name="phone" value={formData.phone} onChange={handleChange} />
        </div>
        <div>
          <Label htmlFor="status">Statut</Label>
          <Select name="status" value={formData.status} onValueChange={(value) => handleSelectChange('status', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Sélectionner un statut" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="draft">Brouillon</SelectItem>
              <SelectItem value="active">Actif</SelectItem>
              <SelectItem value="archived">Archivé</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex justify-end gap-2">
          <Button type="button" variant="outline" onClick={() => navigate('/admin/models')}>Annuler</Button>
          <Button type="submit">{id ? 'Mettre à jour' : 'Créer'}</Button>
        </div>
      </form>
    </AdminLayout>
  );
};

export default ModelForm;
