import { useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { importMannequinsToFirebase, clearAllMannequins } from "@/lib/importData";
import { MANNEQUINS_DATA } from "@/lib/mannequins.data";
import { Upload, Trash2, Loader2, Database, CheckCircle, XCircle } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const ImportData = () => {
  const { toast } = useToast();
  const [importing, setImporting] = useState(false);
  const [clearing, setClearing] = useState(false);
  const [result, setResult] = useState<{ successCount: number; errorCount: number; total: number } | null>(null);

  const handleImport = async () => {
    setImporting(true);
    setResult(null);
    
    try {
      const importResult = await importMannequinsToFirebase();
      setResult(importResult);
      
      toast({
        title: "Import terminé",
        description: `${importResult.successCount}/${importResult.total} mannequins importés avec succès.`,
      });
    } catch (error) {
      console.error("Import error:", error);
      toast({
        title: "Erreur",
        description: "Une erreur s'est produite lors de l'import.",
        variant: "destructive",
      });
    } finally {
      setImporting(false);
    }
  };

  const handleClear = async () => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer tous les mannequins ?")) {
      return;
    }
    
    setClearing(true);
    
    try {
      await clearAllMannequins();
      setResult(null);
      toast({
        title: "Données effacées",
        description: "Tous les mannequins ont été supprimés.",
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de supprimer les données.",
        variant: "destructive",
      });
    } finally {
      setClearing(false);
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="font-serif text-3xl font-bold text-foreground">Import des Données</h1>
          <p className="text-muted-foreground mt-1">
            Gérez l'importation des mannequins vers Firebase
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Import Card */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Database className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <CardTitle>Données à importer</CardTitle>
                  <CardDescription>{MANNEQUINS_DATA.length} mannequins prêts</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="max-h-60 overflow-y-auto space-y-2 border rounded-lg p-3 bg-muted/30">
                {MANNEQUINS_DATA.map((m, i) => (
                  <div key={i} className="flex items-center justify-between text-sm py-1 border-b border-border/50 last:border-0">
                    <span className="font-medium">{m.nom}</span>
                    <span className={`px-2 py-0.5 rounded text-xs ${m.niveau === 'Pro' ? 'bg-primary/20 text-primary' : 'bg-muted text-muted-foreground'}`}>
                      {m.niveau}
                    </span>
                  </div>
                ))}
              </div>
              
              <Button 
                onClick={handleImport} 
                disabled={importing}
                className="w-full"
              >
                {importing ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Import en cours...
                  </>
                ) : (
                  <>
                    <Upload className="h-4 w-4 mr-2" />
                    Importer vers Firebase
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Result Card */}
          <Card>
            <CardHeader>
              <CardTitle>Résultat de l'import</CardTitle>
              <CardDescription>Statut de la dernière opération</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {result ? (
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="flex-1">
                      <div className="flex justify-between text-sm mb-2">
                        <span>Progression</span>
                        <span>{result.successCount}/{result.total}</span>
                      </div>
                      <Progress value={(result.successCount / result.total) * 100} />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-lg bg-emerald-500/10 flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-emerald-500" />
                      <div>
                        <p className="text-2xl font-bold text-emerald-500">{result.successCount}</p>
                        <p className="text-xs text-muted-foreground">Réussis</p>
                      </div>
                    </div>
                    <div className="p-4 rounded-lg bg-red-500/10 flex items-center gap-3">
                      <XCircle className="h-5 w-5 text-red-500" />
                      <div>
                        <p className="text-2xl font-bold text-red-500">{result.errorCount}</p>
                        <p className="text-xs text-muted-foreground">Erreurs</p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <Database className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Lancez un import pour voir les résultats</p>
                </div>
              )}

              <Button 
                variant="destructive" 
                onClick={handleClear} 
                disabled={clearing}
                className="w-full"
              >
                {clearing ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Suppression...
                  </>
                ) : (
                  <>
                    <Trash2 className="h-4 w-4 mr-2" />
                    Effacer toutes les données
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};

export default ImportData;
