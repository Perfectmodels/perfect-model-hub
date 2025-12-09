import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Search, Eye, Check, X, Loader2, GripVertical } from "lucide-react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
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
import { collection, getDocs, query, orderBy, doc, updateDoc } from "firebase/firestore";
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

interface Application {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  birth_date: string | null;
  gender: string;
  city: string | null;
  nationality: string | null;
  height: string | null;
  weight: string | null;
  status: string;
  created_at: string;
  experience: string | null;
  instagram: string | null;
}

const columns = ["Nouveau", "Présélectionné", "Accepté", "Refusé"];

const Casting = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);
  const { toast } = useToast();

  const fetchApplications = async () => {
    try {
      const applicationsCollection = collection(db, "casting_applications");
      const q = query(applicationsCollection, orderBy("created_at", "desc"));
      const applicationsSnapshot = await getDocs(q);
      const applicationsData = applicationsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Application));
      setApplications(applicationsData || []);
    } catch (error) {
      console.error("Error fetching applications:", error);
      toast({
        title: "Erreur",
        description: "Impossible de charger les candidatures",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const onDragEnd = async (result: any) => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const newStatus = destination.droppableId;
    await updateStatus(draggableId, newStatus, true);
  };

  const updateStatus = async (id: string, newStatus: string, fromDrag: boolean = false) => {
    try {
      const appDoc = doc(db, "casting_applications", id);
      await updateDoc(appDoc, { status: newStatus });

      if (!fromDrag) {
          toast({
            title: "Statut mis à jour",
            description: `La candidature a été marquée comme ${newStatus}`,
          });
      }

      fetchApplications();
      setSelectedApp(null);
    } catch (error) {
      console.error("Error updating status:", error);
      toast({
        title: "Erreur",
        description: "Impossible de mettre à jour le statut",
        variant: "destructive",
      });
    }
  };

  const filteredApplications = applications.filter((app) => {
    const fullName = `${app.first_name} ${app.last_name}`.toLowerCase();
    return fullName.includes(searchQuery.toLowerCase());
  });

  return (
    <AdminLayout>
        <DragDropContext onDragEnd={onDragEnd}>
            <div className="space-y-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="font-serif text-3xl font-bold text-foreground">
                    Candidatures Casting
                    </h1>
                    <p className="text-muted-foreground mt-1">
                    {applications.length} candidature(s) au total
                    </p>
                </div>
                </div>

                {/* Filters */}
                <Card>
                <CardContent className="pt-6">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                        placeholder="Rechercher par nom..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                        />
                    </div>
                </CardContent>
                </Card>

                {/* Kanban Board */}
                {loading ? (
                    <div className="flex items-center justify-center py-20">
                        <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            {columns.map(column => (
                                <Droppable key={column} droppableId={column}>
                                    {(provided) => (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.droppableProps}
                                            className="bg-gray-100 p-4 rounded-lg"
                                        >
                                            <h2 className="font-semibold mb-4">{column} ({filteredApplications.filter(app => app.status === column).length})</h2>
                                            {filteredApplications.filter(app => app.status === column).map((app, index) => (
                                                <Draggable key={app.id} draggableId={app.id} index={index}>
                                                    {(provided) => (
                                                        <div
                                                            ref={provided.innerRef}
                                                            {...provided.draggableProps}
                                                            {...provided.dragHandleProps}
                                                            className="bg-white p-4 mb-4 rounded-md shadow-sm"
                                                        >
                                                            <div className="flex justify-between items-start">
                                                                <h3 className="font-medium">{app.first_name} {app.last_name}</h3>
                                                                <GripVertical className="h-4 w-4 text-gray-400" />
                                                            </div>
                                                            <p className="text-sm text-gray-500">{app.city}</p>
                                                            <Button variant="link" size="sm" onClick={() => setSelectedApp(app)} className="p-0 h-auto mt-2">Voir détails</Button>
                                                        </div>
                                                    )}
                                                </Draggable>
                                            ))}
                                            {provided.placeholder}
                                        </div>
                                    )}
                                </Droppable>
                            ))}
                        </div>
                )}
            </div>
        </DragDropContext>

        {/* Detail Modal */}
        <Dialog open={!!selectedApp} onOpenChange={() => setSelectedApp(null)}>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
                <DialogTitle className="font-serif text-xl">
                {selectedApp?.first_name} {selectedApp?.last_name}
                </DialogTitle>
            </DialogHeader>
            
            {selectedApp && (
                <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                    <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="font-medium">{selectedApp.email}</p>
                    </div>
                    <div>
                    <p className="text-sm text-muted-foreground">Téléphone</p>
                    <p className="font-medium">{selectedApp.phone}</p>
                    </div>
                    <div>
                    <p className="text-sm text-muted-foreground">Genre</p>
                    <p className="font-medium">{selectedApp.gender}</p>
                    </div>
                    <div>
                    <p className="text-sm text-muted-foreground">Ville</p>
                    <p className="font-medium">{selectedApp.city || "-"}</p>
                    </div>
                    <div>
                    <p className="text-sm text-muted-foreground">Taille</p>
                    <p className="font-medium">{selectedApp.height || "-"} cm</p>
                    </div>
                    <div>
                    <p className="text-sm text-muted-foreground">Poids</p>
                    <p className="font-medium">{selectedApp.weight || "-"} kg</p>
                    </div>
                    <div>
                    <p className="text-sm text-muted-foreground">Expérience</p>
                    <p className="font-medium">{selectedApp.experience || "-"}</p>
                    </div>
                    <div>
                    <p className="text-sm text-muted-foreground">Instagram</p>
                    <p className="font-medium">{selectedApp.instagram || "-"}</p>
                    </div>
                </div>

                <div className="flex gap-3 pt-4 border-t">
                    <Button
                    onClick={() => updateStatus(selectedApp.id, "Présélectionné")}
                    variant="outline"
                    className="flex-1"
                    >
                    Présélectionner
                    </Button>
                    <Button
                    onClick={() => updateStatus(selectedApp.id, "Accepté")}
                    className="flex-1 bg-green-600 hover:bg-green-700"
                    >
                    <Check className="h-4 w-4 mr-2" />
                    Accepter
                    </Button>
                    <Button
                    onClick={() => updateStatus(selectedApp.id, "Refusé")}
                    variant="destructive"
                    className="flex-1"
                    >
                    <X className="h-4 w-4 mr-2" />
                    Refuser
                    </Button>
                </div>
                </div>
            )}
            </DialogContent>
        </Dialog>
    </AdminLayout>
  );
};

export default Casting;
