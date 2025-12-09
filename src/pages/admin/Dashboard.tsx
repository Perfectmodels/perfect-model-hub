import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { 
  Users, UserCheck, Briefcase, DollarSign, Bell, Clock, ArrowUpRight,
  UserPlus, Plus, FileText, CreditCard
} from "lucide-react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { db } from "@/integrations/firebase/client";
import { collection, query, where, onSnapshot, orderBy, limit } from "firebase/firestore";
import { format, formatDistanceToNow } from "date-fns";
import { fr } from "date-fns/locale";

interface Stats {
  totalModels: number;
  pendingApplications: number;
  activeCastings: number;
  monthlyRevenue: number;
}

interface Activity {
  id: string;
  type: "application" | "model" | "message";
  message: string;
  createdAt: string;
  link: string;
}

const Dashboard = () => {
  const [stats, setStats] = useState<Stats>({ totalModels: 0, pendingApplications: 0, activeCastings: 0, monthlyRevenue: 0 });
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    
    // Collections references
    const modelsCollection = collection(db, "models");
    const applicationsCollection = collection(db, "casting_applications");
    const paymentsCollection = collection(db, "monthlyPayments");
    const castingsCollection = collection(db, "castings");
    const messagesCollection = collection(db, "contactMessages");

    // --- Real-time Stats Listeners ---
    const unsubModels = onSnapshot(modelsCollection, snap => setStats(prev => ({ ...prev, totalModels: snap.size })));
    const unsubApps = onSnapshot(query(applicationsCollection, where("status", "==", "Nouveau")), snap => setStats(prev => ({ ...prev, pendingApplications: snap.size })));
    const unsubCastings = onSnapshot(query(castingsCollection, where("status", "==", "Ouvert")), snap => setStats(prev => ({ ...prev, activeCastings: snap.size })));

    const now = new Date();
    const currentMonth = format(now, "yyyy-MM");
    const revenueQuery = query(paymentsCollection, where("month", "==", currentMonth), where("status", "==", "Payé"));
    const unsubRevenue = onSnapshot(revenueQuery, snap => {
      const totalRevenue = snap.docs.reduce((sum, doc) => sum + doc.data().amount, 0);
      setStats(prev => ({ ...prev, monthlyRevenue: totalRevenue }));
    });

    // --- Real-time Recent Activities Listener ---
    const recentAppsQuery = query(applicationsCollection, orderBy("created_at", "desc"), limit(5));
    const unsubRecentApps = onSnapshot(recentAppsQuery, (snapshot) => {
        const recentApps: Activity[] = snapshot.docs.map(doc => ({
            id: doc.id,
            type: "application",
            message: `Nvl. candidature: ${doc.data().first_name} ${doc.data().last_name}`,
            createdAt: doc.data().created_at?.toDate()?.toISOString() || new Date().toISOString(),
            link: `/admin/casting-applications`,
        }));
        // You can combine with other activity types here if needed
        setActivities(recentApps);
        setLoading(false);
    });
    
    // Cleanup listeners on component unmount
    return () => {
      unsubModels();
      unsubApps();
      unsubCastings();
      unsubRevenue();
      unsubRecentApps();
    };
  }, []);

  const statCards = [
    { title: "Mannequins", value: stats.totalModels, icon: Users, href: "/admin/models", color: "text-blue-500", bg: "bg-blue-500/10" },
    { title: "Candidatures", value: stats.pendingApplications, icon: UserCheck, href: "/admin/casting", color: "text-amber-500", bg: "bg-amber-500/10" },
    { title: "Castings Ouverts", value: stats.activeCastings, icon: Briefcase, href: "/admin/casting", color: "text-indigo-500", bg: "bg-indigo-500/10" },
    { title: "Revenus du Mois", value: `${stats.monthlyRevenue.toFixed(2)} €`, icon: DollarSign, href: "/admin/payments", color: "text-green-500", bg: "bg-green-500/10" },
  ];

  const quickActions = [
    { title: "Nouveau Mannequin", href: "/admin/models/new", icon: UserPlus },
    { title: "Nouveau Casting", href: "/admin/casting/new", icon: Plus },
    { title: "Candidatures", href: "/admin/casting", icon: FileText },
    { title: "Gérer les Finances", href: "/admin/payments", icon: CreditCard },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
            <h1 className="font-serif text-3xl font-bold">Tableau de bord</h1>
            <p className="text-muted-foreground mt-1">Vue d'ensemble de l'activité de votre agence.</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {statCards.map(stat => (
            <Card key={stat.title} className="hover:shadow-md transition-shadow"><Link to={stat.href}>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
                  <div className={`p-2 rounded-lg ${stat.bg}`}><stat.icon className={`h-5 w-5 ${stat.color}`} /></div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{loading ? "..." : stat.value}</div>
                  <p className="text-xs text-muted-foreground">Voir les détails</p>
                </CardContent>
            </Link></Card>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map(action => <Link to={action.href} key={action.title}><div className="group flex items-center gap-4 p-4 rounded-lg border hover:shadow-md transition-all"><div className="p-3 rounded-lg bg-muted"><action.icon className="h-6 w-6" /></div><span className="font-semibold">{action.title}</span></div></Link>)}
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader><CardTitle className="text-lg flex items-center gap-2"><Bell className="h-5 w-5" />Activité Récente</CardTitle></CardHeader>
            <CardContent>
              {loading ? <p className="text-center text-sm text-muted-foreground py-8">Chargement...</p> : activities.length > 0 ? <div className="space-y-2">
                  {activities.map(activity => (
                    <Link key={activity.id} to={activity.link} className="block p-3 rounded-md hover:bg-accent">
                      <div className="flex items-start gap-3">
                        <div className="p-2 rounded-full bg-muted"><UserCheck className="h-4 w-4 text-amber-500"/></div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">{activity.message}</p>
                          <p className="text-xs text-muted-foreground flex items-center gap-1.5 mt-1"><Clock className="h-3 w-3" />{formatDistanceToNow(new Date(activity.createdAt), { addSuffix: true, locale: fr })}</p>
                        </div>
                        <ArrowUpRight className="h-4 w-4 text-muted-foreground shrink-0 mt-1" />
                      </div>
                    </Link>
                  ))}
                </div> : <p className="text-center text-sm text-muted-foreground py-8">Aucune activité récente.</p>}
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle className="text-lg flex items-center gap-2"><Briefcase className="h-5 w-5" />Prochains Castings</CardTitle></CardHeader>
            <CardContent>
                <div className="text-center text-sm text-muted-foreground py-8"><p>La gestion des castings sera bientôt disponible.</p><Link to="/admin/casting/new"><Button variant="outline" size="sm" className="mt-4">Créer un casting</Button></Link></div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
