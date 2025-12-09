import { useState, useEffect } from 'react';
import { db } from '@/integrations/firebase/client';
import { collection, onSnapshot, deleteDoc, doc } from 'firebase/firestore';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { PlusCircle, Edit, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/components/ui/use-toast";

const ModelsManagement = () => {
  const [models, setModels] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'models'), (snapshot) => {
      const modelsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setModels(modelsData);
    });

    // Cleanup listener on component unmount
    return () => unsubscribe();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce mannequin ?')) {
      try {
        await deleteDoc(doc(db, 'models', id));
        toast({ title: 'Mannequin supprimé', description: 'Le mannequin a été supprimé avec succès.' });
      } catch (error) {
        toast({ title: 'Erreur', description: 'Une erreur s\'est produite lors de la suppression du mannequin.', variant: 'destructive' });
      }
    }
  };

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Gestion des Mannequins</h1>
        <Link to="/admin/models/new">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Ajouter un mannequin
          </Button>
        </Link>
      </div>
      <div className="bg-white p-4 rounded-lg shadow">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Prénom</TableHead>
              <TableHead>Nom</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Téléphone</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {models.map(model => (
              <TableRow key={model.id}>
                <TableCell>{model.first_name}</TableCell>
                <TableCell>{model.last_name}</TableCell>
                <TableCell>{model.email}</TableCell>
                <TableCell>{model.phone}</TableCell>
                <TableCell>
                  <Badge variant={model.status === 'active' ? 'default' : 'secondary'}>
                    {model.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Link to={`/admin/models/edit/${model.id}`}>
                    <Button variant="ghost" size="icon">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Button variant="ghost" size="icon" onClick={() => handleDelete(model.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </AdminLayout>
  );
};

export default ModelsManagement;
