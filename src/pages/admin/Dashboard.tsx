import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  Users, UserCheck, MessageSquare, CreditCard, CalendarX, 
  ArrowUpRight, Newspaper, Settings, Calendar, Palette,
  Circle, Bell, Clock
} from "lucide-react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { formatDistanceToNow } from "date-fns";
import { fr } from "date-fns/locale";

interface Stats {
  totalModels: number;
  pendingApplications: number;
  newBookings: number;
  newMessages: number;
}

interface Activity {
  id: string;
  type: "application" | "model" | "payment" | "message";
  message: string;
  createdAt: string;
  link: string;
}

const Dashboard = () => {
  const [stats, setStats] = useState<Stats>({
    totalModels: 0,
    pendingApplications: 0,
    newBookings: 0,
    newMessages: 0,
  });
  const [activities, setActivities] = useState<Activity[]>([]);
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

        setStats({
          totalModels: modelsCount || 0,
          pendingApplications: applicationsCount || 0,
          newBookings: 0, // Placeholder - would need a bookings table
          newMessages: 0, // Placeholder - would need a messages table
        });

        // Fetch recent activities (recent applications)
        const { data: recentApps } = await supabase
          .from("casting_applications")
          .select("id, first_name, last_name, created_at")
          .order("created_at", { ascending: false })
          .limit(5);

        const recentActivities: Activity[] = (recentApps || []).map((app) => ({
          id: app.id,
          type: "application" as const,
          message: `Nouvelle candidature de ${app.first_name} ${app.last_name}`,
          createdAt: app.created_at || new Date().toISOString(),
          link: "/admin/casting",
        }));

        setActivities(recentActivities);
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
      title: "Nouvelles Candidatures",
      value: stats.pendingApplications,
      icon: UserCheck,
      href: "/admin/casting",
      color: "text-amber-500",
      bg: "bg-amber-500/10",
    },
    {
      title: "Nouveaux Bookings",
      value: stats.newBookings,
      icon: Calendar,
      href: "/admin/bookings",
      color: "text-blue-500",
      bg: "bg-blue-500/10",
    },
    {
      title: "Nouveaux Messages",
      value: stats.newMessages,
      icon: MessageSquare,
      href: "/admin/messages",
      color: "text-purple-500",
      bg: "bg-purple-500/10",
    },
    {
      title: "Total Mannequins",
      value: stats.totalModels,
      icon: Users,
      href: "/admin/models",
      color: "text-emerald-500",
      bg: "bg-emerald-500/10",
    },
  ];

  const quickAccessCards = [
    { title: "Gérer les Mannequins", href: "/admin/models", icon: Users },
    { title: "Gérer le Magazine", href: "/admin/magazine", icon: Newspaper },
    { title: "Direction Artistique", href: "/admin/artistic", icon: Palette },
    { title: "Comptabilité", href: "/admin/payments", icon: CreditCard },
  ];

  const siteManagementCards = [
    { title: "Contenu de l'Agence", href: "/admin/agency", description: "Textes, services, chronologie" },
    { title: "Événements PFD", href: "/admin/fashion-day", description: "Perfect Fashion Day" },
    { title: "Gérer les Actualités", href: "/admin/news", description: "News de la page d'accueil" },
    { title: "Paramètres Généraux", href: "/admin/settings", description: "Contact, logos, API" },
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
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {statCards.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <Link to={stat.href}>
                <Card className="hover:shadow-lg transition-shadow cursor-pointer group">
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
                      <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Quick Access */}
        <div>
          <h2 className="font-serif text-xl font-semibold text-foreground mb-4">
            Accès Rapides
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {quickAccessCards.map((card, index) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
              >
                <Link to={card.href}>
                  <Card className="hover:shadow-lg hover:border-primary/50 transition-all cursor-pointer group h-full">
                    <CardContent className="flex items-center gap-4 p-6">
                      <div className="p-3 rounded-xl bg-accent group-hover:bg-primary transition-colors">
                        <card.icon className="h-6 w-6 text-foreground group-hover:text-primary-foreground transition-colors" />
                      </div>
                      <span className="font-medium text-foreground">{card.title}</span>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Site Management */}
        <div>
          <h2 className="font-serif text-xl font-semibold text-foreground mb-4">
            Gestion du Site
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {siteManagementCards.map((card, index) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
              >
                <Link to={card.href}>
                  <Card className="hover:shadow-lg hover:border-primary/50 transition-all cursor-pointer h-full">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-medium text-foreground">{card.title}</h3>
                        <Settings className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <p className="text-sm text-muted-foreground">{card.description}</p>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Activity Widgets */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Live Activity */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Circle className="h-3 w-3 fill-emerald-500 text-emerald-500 animate-pulse" />
                Activité en Direct
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 rounded-lg bg-accent/50">
                  <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center">
                    <span className="text-primary-foreground text-sm font-medium">A</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">Admin</p>
                    <p className="text-xs text-muted-foreground">Administrateur • En ligne</p>
                  </div>
                  <Circle className="h-2 w-2 fill-emerald-500 text-emerald-500" />
                </div>
                <p className="text-center text-sm text-muted-foreground py-4">
                  Pas d'autre utilisateur connecté
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Recent Notifications */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Notifications Récentes
              </CardTitle>
            </CardHeader>
            <CardContent>
              {activities.length > 0 ? (
                <div className="space-y-3">
                  {activities.map((activity) => (
                    <Link
                      key={activity.id}
                      to={activity.link}
                      className="flex items-start gap-3 p-3 rounded-lg hover:bg-accent transition-colors"
                    >
                      <div className="p-2 rounded-lg bg-amber-500/10">
                        <UserCheck className="h-4 w-4 text-amber-500" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground truncate">
                          {activity.message}
                        </p>
                        <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                          <Clock className="h-3 w-3" />
                          {formatDistanceToNow(new Date(activity.createdAt), { 
                            addSuffix: true, 
                            locale: fr 
                          })}
                        </p>
                      </div>
                      <ArrowUpRight className="h-4 w-4 text-muted-foreground shrink-0" />
                    </Link>
                  ))}
                </div>
              ) : (
                <p className="text-center text-sm text-muted-foreground py-8">
                  Aucune notification récente
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
