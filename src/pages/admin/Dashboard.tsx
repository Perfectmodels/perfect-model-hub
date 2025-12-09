import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Users, UserCheck, CreditCard, CalendarX, ArrowUpRight } from "lucide-react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";

interface Stats {
  totalModels: number;
  pendingApplications: number;
  monthlyPayments: number;
  totalAbsences: number;
}

const Dashboard = () => {
  const [stats, setStats] = useState<Stats>({
    totalModels: 0,
    pendingApplications: 0,
    monthlyPayments: 0,
    totalAbsences: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Fetch models count
        const { count: modelsCount } = await supabase
          .from("models")
          .select("*", { count: "exact", head: true });

        // Fetch pending applications
        const { count: applicationsCount } = await supabase
          .from("casting_applications")
          .select("*", { count: "exact", head: true })
          .eq("status", "Nouveau");

        // Fetch current month payments
        const currentMonth = new Date().toISOString().slice(0, 7);
        const { data: payments } = await supabase
          .from("payments")
          .select("amount")
          .eq("month", currentMonth)
          .eq("status", "Payé");

        const totalPayments = payments?.reduce((sum, p) => sum + Number(p.amount), 0) || 0;

        // Fetch absences count
        const { count: absencesCount } = await supabase
          .from("absences")
          .select("*", { count: "exact", head: true });

        setStats({
          totalModels: modelsCount || 0,
          pendingApplications: applicationsCount || 0,
          monthlyPayments: totalPayments,
          totalAbsences: absencesCount || 0,
        });
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const statCards = [
    {
      title: "Mannequins",
      value: stats.totalModels,
      icon: Users,
      href: "/admin/models",
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      title: "Candidatures en attente",
      value: stats.pendingApplications,
      icon: UserCheck,
      href: "/admin/casting",
      color: "text-amber-600",
      bg: "bg-amber-50",
    },
    {
      title: "Paiements du mois",
      value: `${stats.monthlyPayments.toLocaleString()} FCFA`,
      icon: CreditCard,
      href: "/admin/payments",
      color: "text-green-600",
      bg: "bg-green-50",
    },
    {
      title: "Absences",
      value: stats.totalAbsences,
      icon: CalendarX,
      href: "/admin/absences",
      color: "text-red-600",
      bg: "bg-red-50",
    },
  ];

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="font-serif text-3xl font-bold text-foreground">
            Tableau de bord
          </h1>
          <p className="text-muted-foreground mt-1">
            Vue d'ensemble de l'activité de l'agence
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {statCards.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <Link to={stat.href}>
                <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      {stat.title}
                    </CardTitle>
                    <div className={`p-2 rounded-lg ${stat.bg}`}>
                      <stat.icon className={`h-5 w-5 ${stat.color}`} />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-foreground">
                        {loading ? "-" : stat.value}
                      </span>
                      <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Actions rapides</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Link
                to="/admin/casting"
                className="flex items-center justify-between p-3 rounded-lg bg-accent hover:bg-accent/80 transition-colors"
              >
                <span className="font-medium">Voir les nouvelles candidatures</span>
                <ArrowUpRight className="h-4 w-4" />
              </Link>
              <Link
                to="/admin/models"
                className="flex items-center justify-between p-3 rounded-lg bg-accent hover:bg-accent/80 transition-colors"
              >
                <span className="font-medium">Gérer les mannequins</span>
                <ArrowUpRight className="h-4 w-4" />
              </Link>
              <Link
                to="/admin/payments"
                className="flex items-center justify-between p-3 rounded-lg bg-accent hover:bg-accent/80 transition-colors"
              >
                <span className="font-medium">Enregistrer un paiement</span>
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Informations</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                Bienvenue dans le panneau d'administration de Perfect Models Management.
                Utilisez le menu de gauche pour naviguer entre les différentes sections
                et gérer les candidatures, mannequins, paiements et absences.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
