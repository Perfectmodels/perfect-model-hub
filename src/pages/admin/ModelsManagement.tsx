import { useEffect, useState } from "react";
import { Search, Plus, Edit, Trash2, Loader2 } from "lucide-react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
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
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface Model {
  id: string;
  name: string;
  email: string | null;
  phone: string | null;
  gender: string;
  height: string | null;
  level: string | null;
  image_url: string | null;
  is_public: boolean | null;
  categories: string[] | null;
}

const ModelsManagement = () => {
  const [models, setModels] = useState<Model[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingModel, setEditingModel] = useState<Model | null>(null);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    gender: "Femme",
    height: "",
    level: "Débutant",
    image_url: "",
    is_public: false,
    experience: "",
  });

  const fetchModels = async () => {
    try {
      const { data, error } = await supabase
        .from("models")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setModels(data || []);
    } catch (error) {
      console.error("Error fetching models:", error);
      toast({
        title: "Erreur",
        description: "Impossible de charger les mannequins",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchModels();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (editingModel) {
        const { error } = await supabase
          .from("models")
          .update(formData)
          .eq("id", editingModel.id);

        if (error) throw error;
        toast({ title: "Mannequin mis à jour" });
      } else {
        const { error } = await supabase
          .from("models")
          .insert([formData]);

        if (error) throw error;
        toast({ title: "Mannequin ajouté" });
      }

      setIsDialogOpen(false);
      setEditingModel(null);
      resetForm();
      fetchModels();
    } catch (error) {
      console.error("Error saving model:", error);
      toast({
        title: "Erreur",
        description: "Impossible de sauvegarder le mannequin",
        variant: "destructive",
      });
    }
  };

  const handleEdit = (model: Model) => {
    setEditingModel(model);
    setFormData({
      name: model.name,
      email: model.email || "",
      phone: model.phone || "",
      gender: model.gender,
      height: model.height || "",
      level: model.level || "Débutant",
      image_url: model.image_url || "",
      is_public: model.is_public || false,
      experience: "",
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer ce mannequin ?")) return;

    try {
      const { error } = await supabase
        .from("models")
        .delete()
        .eq("id", id);

      if (error) throw error;
      toast({ title: "Mannequin supprimé" });
      fetchModels();
    } catch (error) {
      console.error("Error deleting model:", error);
      toast({
        title: "Erreur",
        description: "Impossible de supprimer le mannequin",
        variant: "destructive",
      });
    }
  };

  const togglePublic = async (id: string, currentValue: boolean) => {
    try {
      const { error } = await supabase
        .from("models")
        .update({ is_public: !currentValue })
        .eq("id", id);

      if (error) throw error;
      fetchModels();
    } catch (error) {
      console.error("Error toggling public:", error);
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      gender: "Femme",
      height: "",
      level: "Débutant",
      image_url: "",
      is_public: false,
      experience: "",
    });
  };

  const filteredModels = models.filter((model) =>
    model.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="font-serif text-3xl font-bold text-foreground">
              Mannequins
            </h1>
            <p className="text-muted-foreground mt-1">
              {models.length} mannequin(s) enregistré(s)
            </p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={(open) => {
            setIsDialogOpen(open);
            if (!open) {
              setEditingModel(null);
              resetForm();
            }
          }}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Ajouter
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  {editingModel ? "Modifier le mannequin" : "Ajouter un mannequin"}
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nom complet *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="gender">Genre *</Label>
                    <Select
                      value={formData.gender}
                      onValueChange={(value) => setFormData({ ...formData, gender: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Femme">Femme</SelectItem>
                        <SelectItem value="Homme">Homme</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Téléphone</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="height">Taille</Label>
                    <Input
                      id="height"
                      placeholder="1m75"
                      value={formData.height}
                      onChange={(e) => setFormData({ ...formData, height: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="level">Niveau</Label>
                    <Select
                      value={formData.level}
                      onValueChange={(value) => setFormData({ ...formData, level: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Débutant">Débutant</SelectItem>
                        <SelectItem value="Intermédiaire">Intermédiaire</SelectItem>
                        <SelectItem value="Pro">Pro</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="image_url">URL de la photo</Label>
                  <Input
                    id="image_url"
                    type="url"
                    placeholder="https://..."
                    value={formData.image_url}
                    onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                  />
                </div>

                <div className="flex items-center gap-2">
                  <Switch
                    id="is_public"
                    checked={formData.is_public}
                    onCheckedChange={(checked) => setFormData({ ...formData, is_public: checked })}
                  />
                  <Label htmlFor="is_public">Profil public</Label>
                </div>

                <div className="flex justify-end gap-3 pt-4">
                  <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Annuler
                  </Button>
                  <Button type="submit">
                    {editingModel ? "Mettre à jour" : "Ajouter"}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Search */}
        <Card>
          <CardContent className="pt-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher un mannequin..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        {/* Table */}
        <Card>
          <CardContent className="p-0">
            {loading ? (
              <div className="flex items-center justify-center py-20">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : filteredModels.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-muted-foreground">Aucun mannequin trouvé</p>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Photo</TableHead>
                    <TableHead>Nom</TableHead>
                    <TableHead>Genre</TableHead>
                    <TableHead>Taille</TableHead>
                    <TableHead>Niveau</TableHead>
                    <TableHead>Public</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredModels.map((model) => (
                    <TableRow key={model.id}>
                      <TableCell>
                        {model.image_url ? (
                          <img
                            src={model.image_url}
                            alt={model.name}
                            className="h-10 w-10 rounded-full object-cover"
                          />
                        ) : (
                          <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                            <span className="text-sm font-medium">
                              {model.name.charAt(0)}
                            </span>
                          </div>
                        )}
                      </TableCell>
                      <TableCell className="font-medium">{model.name}</TableCell>
                      <TableCell>{model.gender}</TableCell>
                      <TableCell>{model.height || "-"}</TableCell>
                      <TableCell>
                        <Badge variant="secondary">{model.level}</Badge>
                      </TableCell>
                      <TableCell>
                        <Switch
                          checked={model.is_public || false}
                          onCheckedChange={() => togglePublic(model.id, model.is_public || false)}
                        />
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleEdit(model)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDelete(model.id)}
                          >
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default ModelsManagement;
