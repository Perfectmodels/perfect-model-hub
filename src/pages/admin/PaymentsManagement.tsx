import { useEffect, useState } from "react";
import { Search, Plus, Loader2 } from "lucide-react";
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
import { db } from "@/integrations/firebase/client";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { collection, getDocs, addDoc, query, orderBy } from "firebase/firestore";

interface Payment {
  id: string;
  model_id: string;
  model_name: string;
  amount: number;
  month: string;
  payment_date: string | null;
  method: string | null;
  status: string | null;
  category: string | null;
}

interface Model {
  id: string;
  name: string;
}

const statusColors: Record<string, string> = {
  "Payé": "bg-green-100 text-green-800",
  "En attente": "bg-amber-100 text-amber-800",
  "En retard": "bg-red-100 text-red-800",
};

const PaymentsManagement = () => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [models, setModels] = useState<Model[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    model_id: "",
    model_name: "",
    amount: "",
    month: new Date().toISOString().slice(0, 7),
    payment_date: new Date().toISOString().slice(0, 10),
    method: "Espèces",
    status: "Payé",
    category: "Cotisation mensuelle",
  });

  const fetchData = async () => {
    try {
        const paymentsQuery = query(collection(db, "payments"), orderBy("created_at", "desc"));
        const modelsQuery = query(collection(db, "models"), orderBy("name"));

        const [paymentsSnapshot, modelsSnapshot] = await Promise.all([
            getDocs(paymentsQuery),
            getDocs(modelsQuery),
        ]);

        const paymentsData = paymentsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Payment));
        const modelsData = modelsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Model));

        setPayments(paymentsData || []);
        setModels(modelsData || []);
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
      await addDoc(collection(db, "payments"), {
        model_id: formData.model_id,
        model_name: formData.model_name,
        amount: parseFloat(formData.amount),
        month: formData.month,
        payment_date: formData.payment_date,
        method: formData.method,
        status: formData.status,
        category: formData.category,
        created_at: new Date().toISOString(),
      });

      toast({ title: "Paiement enregistré" });
      setIsDialogOpen(false);
      resetForm();
      fetchData();
    } catch (error) {
      console.error("Error saving payment:", error);
      toast({
        title: "Erreur",
        description: "Impossible d'enregistrer le paiement",
        variant: "destructive",
      });
    }
  };

  const resetForm = () => {
    setFormData({
      model_id: "",
      model_name: "",
      amount: "",
      month: new Date().toISOString().slice(0, 7),
      payment_date: new Date().toISOString().slice(0, 10),
      method: "Espèces",
      status: "Payé",
      category: "Cotisation mensuelle",
    });
  };

  const filteredPayments = payments.filter((payment) =>
    payment.model_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalAmount = filteredPayments
    .filter((p) => p.status === "Payé")
    .reduce((sum, p) => sum + Number(p.amount), 0);

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="font-serif text-3xl font-bold text-foreground">
              Paiements
            </h1>
            <p className="text-muted-foreground mt-1">
              Total encaissé: {totalAmount.toLocaleString()} FCFA
            </p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={(open) => {
            setIsDialogOpen(open);
            if (!open) resetForm();
          }}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Nouveau paiement
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Enregistrer un paiement</DialogTitle>
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
                    <Label htmlFor="amount">Montant (FCFA) *</Label>
                    <Input
                      id="amount"
                      type="number"
                      value={formData.amount}
                      onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="month">Mois *</Label>
                    <Input
                      id="month"
                      type="month"
                      value={formData.month}
                      onChange={(e) => setFormData({ ...formData, month: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="payment_date">Date de paiement</Label>
                    <Input
                      id="payment_date"
                      type="date"
                      value={formData.payment_date}
                      onChange={(e) => setFormData({ ...formData, payment_date: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="method">Méthode</Label>
                    <Select
                      value={formData.method}
                      onValueChange={(value) => setFormData({ ...formData, method: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Espèces">Espèces</SelectItem>
                        <SelectItem value="Virement">Virement</SelectItem>
                        <SelectItem value="Mobile Money">Mobile Money</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="status">Statut</Label>
                    <Select
                      value={formData.status}
                      onValueChange={(value) => setFormData({ ...formData, status: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Payé">Payé</SelectItem>
                        <SelectItem value="En attente">En attente</SelectItem>
                        <SelectItem value="En retard">En retard</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category">Catégorie</Label>
                    <Select
                      value={formData.category}
                      onValueChange={(value) => setFormData({ ...formData, category: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Cotisation mensuelle">Cotisation mensuelle</SelectItem>
                        <SelectItem value="Frais d'inscription">Frais d'inscription</SelectItem>
                        <SelectItem value="Formation">Formation</SelectItem>
                        <SelectItem value="Autre">Autre</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
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
            ) : filteredPayments.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-muted-foreground">Aucun paiement trouvé</p>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Mannequin</TableHead>
                    <TableHead>Montant</TableHead>
                    <TableHead>Mois</TableHead>
                    <TableHead>Méthode</TableHead>
                    <TableHead>Catégorie</TableHead>
                    <TableHead>Statut</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPayments.map((payment) => (
                    <TableRow key={payment.id}>
                      <TableCell className="font-medium">{payment.model_name}</TableCell>
                      <TableCell>{Number(payment.amount).toLocaleString()} FCFA</TableCell>
                      <TableCell>{payment.month}</TableCell>
                      <TableCell>{payment.method}</TableCell>
                      <TableCell>{payment.category}</TableCell>
                      <TableCell>
                        <Badge className={statusColors[payment.status || ""] || ""}>
                          {payment.status}
                        </Badge>
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

export default PaymentsManagement;
