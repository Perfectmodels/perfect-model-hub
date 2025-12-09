import { useEffect, useState } from "react";
import { Search, Plus, Loader2, Check, X } from "lucide-react";
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
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

interface Absence {
  id: string;
  model_id: string;
  model_name: string;
  date: string;
  reason: string | null;
  is_excused: boolean | null;
  notes: string | null;
}

interface Model {
  id: string;
  name: string;
}

const AbsencesManagement = () => {
  const [absences, setAbsences] = useState<Absence[]>([]);
  const [models, setModels] = useState<Model[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    model_id: "",
    model_name: "",
    date: new Date().toISOString().slice(0, 10),
    reason: "Non justifié",
    is_excused: false,
    notes: "",
  });

  const fetchData = async () => {
    try {
      const [absencesRes, modelsRes] = await Promise.all([
        supabase.from("absences").select("*").order("date", { ascending: false }),
        supabase.from("models").select("id, name").order("name"),
      ]);

      if (absencesRes.error) throw absencesRes.error;
      if (modelsRes.error) throw modelsRes.error;

      setAbsences(absencesRes.data || []);
      setModels(modelsRes.data || []);
    } catch (error) {
      console.error("Error fetching data:", error);
      toast({
        title: "Erreur",
        description: "Impossible de charger les données",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleModelChange = (modelId: string) => {
    const model = models.find((m) => m.id === modelId);
    setFormData({
      ...formData,
      model_id: modelId,
      model_name: model?.name || "",
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.model_id) {
      toast({
        title: "Erreur",
        description: "Veuillez sélectionner un mannequin",
        variant: "destructive",
      });
      return;
    }

    try {
      const { error } = await supabase.from("absences").insert([{
        model_id: formData.model_id,
        model_name: formData.model_name,
        date: formData.date,
        reason: formData.reason,
        is_excused: formData.is_excused,
        notes: formData.notes || null,
      }]);

      if (error) throw error;

      toast({ title: "Absence enregistrée" });
      setIsDialogOpen(false);
      resetForm();
      fetchData();
    } catch (error) {
      console.error("Error saving absence:", error);
      toast({
        title: "Erreur",
        description: "Impossible d'enregistrer l'absence",
        variant: "destructive",
      });
    }
  };

  const toggleExcused = async (id: string, currentValue: boolean) => {
    try {
      const { error } = await supabase
        .from("absences")
        .update({ is_excused: !currentValue })
        .eq("id", id);

      if (error) throw error;
      fetchData();
    } catch (error) {
      console.error("Error toggling excused:", error);
    }
  };

  const resetForm = () => {
    setFormData({
      model_id: "",
      model_name: "",
      date: new Date().toISOString().slice(0, 10),
      reason: "Non justifié",
      is_excused: false,
      notes: "",
    });
  };

  const filteredAbsences = absences.filter((absence) =>
    absence.model_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="font-serif text-3xl font-bold text-foreground">
              Absences
            </h1>
            <p className="text-muted-foreground mt-1">
              {absences.length} absence(s) enregistrée(s)
            </p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={(open) => {
            setIsDialogOpen(open);
            if (!open) resetForm();
          }}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Nouvelle absence
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Enregistrer une absence</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="model">Mannequin *</Label>
                  <Select
                    value={formData.model_id}
                    onValueChange={handleModelChange}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner un mannequin" />
                    </SelectTrigger>
                    <SelectContent>
                      {models.map((model) => (
                        <SelectItem key={model.id} value={model.id}>
                          {model.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="date">Date *</Label>
                    <Input
                      id="date"
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="reason">Raison</Label>
                    <Select
                      value={formData.reason}
                      onValueChange={(value) => setFormData({ ...formData, reason: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Non justifié">Non justifié</SelectItem>
                        <SelectItem value="Maladie">Maladie</SelectItem>
                        <SelectItem value="Personnel">Personnel</SelectItem>
                        <SelectItem value="Autre">Autre</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Switch
                    id="is_excused"
                    checked={formData.is_excused}
                    onCheckedChange={(checked) => setFormData({ ...formData, is_excused: checked })}
                  />
                  <Label htmlFor="is_excused">Excusé</Label>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes">Notes</Label>
                  <Textarea
                    id="notes"
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    placeholder="Notes additionnelles..."
                  />
                </div>

                <div className="flex justify-end gap-3 pt-4">
                  <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Annuler
                  </Button>
                  <Button type="submit">Enregistrer</Button>
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
                placeholder="Rechercher par nom..."
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
            ) : filteredAbsences.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-muted-foreground">Aucune absence trouvée</p>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Mannequin</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Raison</TableHead>
                    <TableHead>Excusé</TableHead>
                    <TableHead>Notes</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAbsences.map((absence) => (
                    <TableRow key={absence.id}>
                      <TableCell className="font-medium">{absence.model_name}</TableCell>
                      <TableCell>
                        {format(new Date(absence.date), "dd MMM yyyy", { locale: fr })}
                      </TableCell>
                      <TableCell>{absence.reason}</TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => toggleExcused(absence.id, absence.is_excused || false)}
                        >
                          {absence.is_excused ? (
                            <Check className="h-4 w-4 text-green-600" />
                          ) : (
                            <X className="h-4 w-4 text-red-600" />
                          )}
                        </Button>
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {absence.notes || "-"}
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

export default AbsencesManagement;
