import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Eye, Check, X, Loader2, PlusCircle, Edit, Trash2 } from "lucide-react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { db } from "@/integrations/firebase/client";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { collection, query, where, orderBy, doc, updateDoc, deleteDoc, onSnapshot } from "firebase/firestore";

interface Application {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  gender: string;
  city: string | null;
  height: string | null;
  weight: string | null;
  status: string;
  created_at: any; // Can be a Timestamp
  experience: string | null;
  instagram: string | null;
}

const statusColors: Record<string, string> = {
  Nouveau: "bg-blue-100 text-blue-800",
  Présélectionné: "bg-amber-100 text-amber-800",
  Accepté: "bg-green-100 text-green-800",
  Refusé: "bg-red-100 text-red-800",
};

const CastingApplications = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    const applicationsCollection = collection(db, "casting_applications");
    let q = query(applicationsCollection, orderBy("created_at", "desc"));

    if (statusFilter !== "all") {
      q = query(q, where("status", "==", statusFilter));
    }

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const applicationsData = snapshot.docs.map(doc => ({ 
        id: doc.id, 
        ...doc.data(),
        // Convert Firebase Timestamp to a format that can be used by `new Date()`
        created_at: doc.data().created_at?.toDate ? doc.data().created_at.toDate().toISOString() : new Date().toISOString()
      } as Application));
      setApplications(applicationsData);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching applications:", error);
      toast({ title: "Erreur", description: "Impossible de charger les candidatures", variant: "destructive" });
      setLoading(false);
    });

    return () => unsubscribe();
  }, [statusFilter, toast]);

  const updateStatus = async (id: string, newStatus: string) => {
    try {
      const appDoc = doc(db, "casting_applications", id);
      await updateDoc(appDoc, { status: newStatus });
      toast({ title: "Statut mis à jour", description: `La candidature a été marquée comme ${newStatus}` });
      setSelectedApp(null);
    } catch (error) {
      toast({ title: "Erreur", description: "Impossible de mettre à jour le statut", variant: "destructive" });
    }
  };
  
  const handleDelete = async (id: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette candidature ?')) {
      try {
        await deleteDoc(doc(db, "casting_applications", id));
        toast({ title: 'Candidature supprimée', description: 'La candidature a été supprimée avec succès.' });
        setSelectedApp(null);
      } catch (error) {
        toast({ title: 'Erreur', description: 'Une erreur s\'est produite lors de la suppression.', variant: 'destructive' });
      }
    }
  };

  const filteredApplications = applications.filter((app) => 
    `${app.first_name} ${app.last_name}`.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="font-serif text-3xl font-bold">Candidatures Casting</h1>
            <p className="text-muted-foreground mt-1">{applications.length} candidature(s) au total</p>
          </div>
          <Button onClick={() => navigate('/admin/casting-applications/new')}>
            <PlusCircle className="mr-2 h-4 w-4" />Créer une candidature
          </Button>
        </div>

        <Card><CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Rechercher par nom..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-10" />
            </div>
            <div className="flex gap-2 flex-wrap">
              {["all", "Nouveau", "Présélectionné", "Accepté", "Refusé"].map((status) => (
                <Button key={status} variant={statusFilter === status ? "default" : "outline"} size="sm" onClick={() => setStatusFilter(status)}>
                  {status === "all" ? "Tous" : status}
                </Button>
              ))}
            </div>
          </div>
        </CardContent></Card>

        <Card><CardContent className="p-0">
            {loading ? <div className="flex items-center justify-center py-20"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div> : 
            filteredApplications.length === 0 ? <div className="text-center py-20"><p className="text-muted-foreground">Aucune candidature trouvée</p></div> : 
            <Table>
              <TableHeader><TableRow>
                  <TableHead>Nom</TableHead>
                  <TableHead>Genre</TableHead>
                  <TableHead>Téléphone</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
              </TableRow></TableHeader>
              <TableBody>
                {filteredApplications.map((app) => (
                  <TableRow key={app.id}>
                    <TableCell className="font-medium">{app.first_name} {app.last_name}</TableCell>
                    <TableCell>{app.gender}</TableCell>
                    <TableCell>{app.phone}</TableCell>
                    <TableCell>{format(new Date(app.created_at), "dd MMM yyyy", { locale: fr })}</TableCell>
                    <TableCell><Badge className={statusColors[app.status] || ""}>{app.status}</Badge></TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon" onClick={() => setSelectedApp(app)}><Eye className="h-4 w-4" /></Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>}
        </CardContent></Card>
      </div>

      <Dialog open={!!selectedApp} onOpenChange={() => setSelectedApp(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">{selectedApp && <>
          <DialogHeader><DialogTitle className="font-serif text-xl">{selectedApp.first_name} {selectedApp.last_name}</DialogTitle></DialogHeader>
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div><p className="text-sm text-muted-foreground">Email</p><p className="font-medium">{selectedApp.email}</p></div>
              <div><p className="text-sm text-muted-foreground">Téléphone</p><p className="font-medium">{selectedApp.phone}</p></div>
              <div><p className="text-sm text-muted-foreground">Genre</p><p className="font-medium">{selectedApp.gender}</p></div>
              <div><p className="text-sm text-muted-foreground">Ville</p><p className="font-medium">{selectedApp.city || "-"}</p></div>
              <div><p className="text-sm text-muted-foreground">Taille</p><p className="font-medium">{selectedApp.height || "-"} cm</p></div>
              <div><p className="text-sm text-muted-foreground">Poids</p><p className="font-medium">{selectedApp.weight || "-"} kg</p></div>
              <div><p className="text-sm text-muted-foreground">Expérience</p><p className="font-medium">{selectedApp.experience || "-"}</p></div>
              <div><p className="text-sm text-muted-foreground">Instagram</p><p className="font-medium">{selectedApp.instagram || "-"}</p></div>
            </div>

            <div className="flex gap-2 pt-4 border-t">
              <Button onClick={() => updateStatus(selectedApp.id, "Présélectionné")} variant="outline">Présélectionner</Button>
              <Button onClick={() => updateStatus(selectedApp.id, "Accepté")} className="bg-green-600 hover:bg-green-700"><Check className="h-4 w-4 mr-2" />Accepter</Button>
              <Button onClick={() => updateStatus(selectedApp.id, "Refusé")} variant="destructive"><X className="h-4 w-4 mr-2" />Refuser</Button>
            </div>
            
            <div className="flex justify-end gap-2 pt-4 border-t">
               <Button variant="outline" size="sm" onClick={() => {navigate(`/admin/casting-applications/edit/${selectedApp.id}`); setSelectedApp(null);}}><Edit className="h-4 w-4 mr-2"/>Modifier</Button>
               <Button variant="destructive" size="sm" onClick={() => handleDelete(selectedApp.id)}><Trash2 className="h-4 w-4 mr-2"/>Supprimer</Button>
            </div>
          </div></>}
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default CastingApplications;
