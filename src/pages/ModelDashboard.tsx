import { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  User, Camera, Calendar, GraduationCap, CreditCard, 
  CalendarX, MessageSquare, Bell, ArrowUpRight, Upload,
  CheckCircle, Clock, Image
} from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";

interface ModelProfile {
  id: string;
  name: string;
  email: string | null;
  phone: string | null;
  gender: string;
  height: string | null;
  level: string | null;
  image_url: string | null;
  categories: string[] | null;
  chest: string | null;
  waist: string | null;
  hips: string | null;
  shoe_size: string | null;
}

interface Payment {
  id: string;
  month: string;
  amount: number;
  status: string | null;
  payment_date: string | null;
}

interface Absence {
  id: string;
  date: string;
  reason: string | null;
  is_excused: boolean | null;
}

const ModelDashboard = () => {
  const { user, loading: authLoading } = useAuth();
  const [profile, setProfile] = useState<ModelProfile | null>(null);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [absences, setAbsences] = useState<Absence[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchModelData = async () => {
      if (!user) return;

      try {
        // Fetch model profile linked to this user
        const { data: modelData } = await supabase
          .from("models")
          .select("*")
          .eq("user_id", user.id)
          .single();

        if (modelData) {
          setProfile(modelData);

          // Fetch payments
          const { data: paymentsData } = await supabase
            .from("payments")
            .select("*")
            .eq("model_id", modelData.id)
            .order("month", { ascending: false })
            .limit(6);

          setPayments(paymentsData || []);

          // Fetch absences
          const { data: absencesData } = await supabase
            .from("absences")
            .select("*")
            .eq("model_id", modelData.id)
            .order("date", { ascending: false })
            .limit(5);

          setAbsences(absencesData || []);
        }
      } catch (error) {
        console.error("Error fetching model data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (!authLoading) {
      fetchModelData();
    }
  }, [user, authLoading]);

  if (authLoading || loading) {
    return (
      <Layout>
        <div className="min-h-[60vh] flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </Layout>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!profile) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-20 text-center">
          <User className="h-16 w-16 text-muted-foreground mx-auto mb-6" />
          <h1 className="font-serif text-3xl font-bold text-foreground mb-4">
            Profil non trouvé
          </h1>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">
            Votre compte n'est pas encore lié à un profil mannequin. 
            Contactez l'administration pour plus d'informations.
          </p>
          <Button asChild>
            <Link to="/contact">Nous contacter</Link>
          </Button>
        </div>
      </Layout>
    );
  }

  const trainingProgress = 45; // Placeholder for training progress
  const completedModules = 3;
  const totalModules = 6;

  return (
    <Layout>
      <div className="container mx-auto px-4 lg:px-8 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="font-serif text-3xl font-bold text-foreground mb-2">
            Bienvenue, {profile.name}
          </h1>
          <p className="text-muted-foreground">
            Gérez votre profil et suivez votre carrière
          </p>
        </motion.div>

        {/* Profile Overview */}
        <div className="grid lg:grid-cols-3 gap-8 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-1"
          >
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  <div className="relative mb-4">
                    {profile.image_url ? (
                      <img
                        src={profile.image_url}
                        alt={profile.name}
                        className="h-32 w-32 rounded-full object-cover"
                      />
                    ) : (
                      <div className="h-32 w-32 rounded-full bg-accent flex items-center justify-center">
                        <User className="h-16 w-16 text-muted-foreground" />
                      </div>
                    )}
                    <Button
                      size="icon"
                      variant="secondary"
                      className="absolute bottom-0 right-0 h-8 w-8 rounded-full"
                    >
                      <Camera className="h-4 w-4" />
                    </Button>
                  </div>
                  <h2 className="font-serif text-xl font-semibold text-foreground mb-1">
                    {profile.name}
                  </h2>
                  <Badge variant="secondary" className="mb-4">
                    {profile.level || "Débutant"}
                  </Badge>
                  
                  <div className="w-full space-y-3 text-left">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Taille</span>
                      <span className="font-medium text-foreground">{profile.height || "-"}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Genre</span>
                      <span className="font-medium text-foreground">{profile.gender}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Pointure</span>
                      <span className="font-medium text-foreground">{profile.shoe_size || "-"}</span>
                    </div>
                  </div>

                  <Button className="w-full mt-6" variant="outline">
                    Modifier le profil
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2"
          >
            <Tabs defaultValue="portfolio" className="h-full">
              <TabsList className="mb-4">
                <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
                <TabsTrigger value="bookings">Réservations</TabsTrigger>
                <TabsTrigger value="messages">Messages</TabsTrigger>
              </TabsList>

              <TabsContent value="portfolio" className="mt-0">
                <Card className="h-full">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>Mon Portfolio</CardTitle>
                        <CardDescription>Gérez vos photos de book</CardDescription>
                      </div>
                      <Button size="sm">
                        <Upload className="h-4 w-4 mr-2" />
                        Ajouter
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-3 gap-4">
                      {/* Placeholder images */}
                      {[1, 2, 3, 4, 5, 6].map((i) => (
                        <div
                          key={i}
                          className="aspect-[3/4] rounded-lg bg-accent flex items-center justify-center"
                        >
                          <Image className="h-8 w-8 text-muted-foreground" />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="bookings" className="mt-0">
                <Card className="h-full">
                  <CardHeader>
                    <CardTitle>Historique des Réservations</CardTitle>
                    <CardDescription>Vos bookings passés et à venir</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <p className="text-center text-muted-foreground py-8">
                        Aucune réservation pour le moment
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="messages" className="mt-0">
                <Card className="h-full">
                  <CardHeader>
                    <CardTitle>Messagerie</CardTitle>
                    <CardDescription>Échangez avec l'administration</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-center text-muted-foreground py-8">
                      Aucun message
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>

        {/* Training Progress */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-8"
        >
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <GraduationCap className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle>Progression de la Formation</CardTitle>
                    <CardDescription>{completedModules} modules sur {totalModules} complétés</CardDescription>
                  </div>
                </div>
                <Button asChild variant="outline" size="sm">
                  <Link to="/classroom">
                    Continuer
                    <ArrowUpRight className="h-4 w-4 ml-2" />
                  </Link>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Progress value={trainingProgress} className="h-2" />
              <div className="grid sm:grid-cols-3 gap-4 mt-6">
                {[
                  { name: "Introduction", status: "completed" },
                  { name: "Techniques de Défilé", status: "completed" },
                  { name: "Poses & Expressions", status: "completed" },
                  { name: "Nutrition & Bien-être", status: "current" },
                  { name: "Gestion de Carrière", status: "locked" },
                  { name: "Photographie", status: "locked" },
                ].map((module) => (
                  <div
                    key={module.name}
                    className={`flex items-center gap-2 p-3 rounded-lg ${
                      module.status === "completed"
                        ? "bg-emerald-500/10"
                        : module.status === "current"
                        ? "bg-primary/10"
                        : "bg-muted"
                    }`}
                  >
                    {module.status === "completed" ? (
                      <CheckCircle className="h-4 w-4 text-emerald-500 shrink-0" />
                    ) : module.status === "current" ? (
                      <Clock className="h-4 w-4 text-primary shrink-0" />
                    ) : (
                      <div className="h-4 w-4 rounded-full border-2 border-muted-foreground/30 shrink-0" />
                    )}
                    <span className={`text-sm ${module.status === "locked" ? "text-muted-foreground" : "text-foreground"}`}>
                      {module.name}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Financial & Absences */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Payments */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-emerald-500/10">
                    <CreditCard className="h-5 w-5 text-emerald-500" />
                  </div>
                  <div>
                    <CardTitle>Historique des Paiements</CardTitle>
                    <CardDescription>Vos cotisations mensuelles</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {payments.length > 0 ? (
                  <div className="space-y-3">
                    {payments.map((payment) => (
                      <div
                        key={payment.id}
                        className="flex items-center justify-between p-3 rounded-lg bg-accent/50"
                      >
                        <div>
                          <p className="font-medium text-foreground">{payment.month}</p>
                          <p className="text-sm text-muted-foreground">
                            {payment.amount.toLocaleString()} FCFA
                          </p>
                        </div>
                        <Badge variant={payment.status === "Payé" ? "default" : "secondary"}>
                          {payment.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-center text-muted-foreground py-8">
                    Aucun paiement enregistré
                  </p>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Absences */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-red-500/10">
                    <CalendarX className="h-5 w-5 text-red-500" />
                  </div>
                  <div>
                    <CardTitle>Mes Absences</CardTitle>
                    <CardDescription>Suivi des absences enregistrées</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {absences.length > 0 ? (
                  <div className="space-y-3">
                    {absences.map((absence) => (
                      <div
                        key={absence.id}
                        className="flex items-center justify-between p-3 rounded-lg bg-accent/50"
                      >
                        <div>
                          <p className="font-medium text-foreground">{absence.date}</p>
                          <p className="text-sm text-muted-foreground">
                            {absence.reason || "Non spécifié"}
                          </p>
                        </div>
                        <Badge variant={absence.is_excused ? "default" : "destructive"}>
                          {absence.is_excused ? "Excusée" : "Non excusée"}
                        </Badge>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-center text-muted-foreground py-8">
                    Aucune absence enregistrée
                  </p>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
};

export default ModelDashboard;
