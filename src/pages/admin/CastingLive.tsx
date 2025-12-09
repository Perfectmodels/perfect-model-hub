import { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { 
  Play, Pause, RotateCcw, User, Clock, ChevronRight, 
  CheckCircle, AlertCircle, Users, Star, ArrowRight
} from "lucide-react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { supabase } from "@/integrations/supabase/client";

interface Candidate {
  id: string;
  first_name: string;
  last_name: string;
  passage_number: number | null;
  status: string | null;
  gender: string;
  height: string | null;
  photo_portrait_url: string | null;
}

interface JuryScore {
  application_id: string;
  overall: number | null;
}

const CastingLive = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timer, setTimer] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [scores, setScores] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    total: 0,
    evaluated: 0,
    averageScore: 0,
  });

  // Fetch candidates
  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const { data } = await supabase
          .from("casting_applications")
          .select("id, first_name, last_name, passage_number, status, gender, height, photo_portrait_url")
          .order("passage_number", { ascending: true, nullsFirst: false });

        if (data) {
          setCandidates(data);
          setStats(prev => ({ ...prev, total: data.length }));
        }

        // Fetch scores
        const { data: scoresData } = await supabase
          .from("jury_scores")
          .select("application_id, overall");

        if (scoresData) {
          const scoreMap: Record<string, number> = {};
          scoresData.forEach((s) => {
            if (s.overall !== null) {
              scoreMap[s.application_id] = s.overall;
            }
          });
          setScores(scoreMap);
          
          const evaluatedCount = Object.keys(scoreMap).length;
          const totalScore = Object.values(scoreMap).reduce((a, b) => a + b, 0);
          setStats(prev => ({
            ...prev,
            evaluated: evaluatedCount,
            averageScore: evaluatedCount > 0 ? totalScore / evaluatedCount : 0,
          }));
        }
      } catch (error) {
        console.error("Error fetching candidates:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCandidates();
  }, []);

  // Timer logic
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleNext = () => {
    if (currentIndex < candidates.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setTimer(0);
      setIsTimerRunning(false);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
      setTimer(0);
      setIsTimerRunning(false);
    }
  };

  const currentCandidate = candidates[currentIndex];
  const queue = candidates.slice(currentIndex + 1, currentIndex + 6);
  const progress = candidates.length > 0 ? ((currentIndex + 1) / candidates.length) * 100 : 0;

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-serif text-3xl font-bold text-foreground">
              Casting en Direct
            </h1>
            <p className="text-muted-foreground mt-1">
              Gérez le passage des candidats en temps réel
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-sm font-medium text-emerald-500">En cours</span>
          </div>
        </div>

        {/* Progress Bar */}
        <Card>
          <CardContent className="py-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Progression</span>
              <span className="text-sm font-medium text-foreground">
                {currentIndex + 1} / {candidates.length} candidats
              </span>
            </div>
            <Progress value={progress} className="h-2" />
          </CardContent>
        </Card>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Current Candidate */}
          <div className="lg:col-span-2">
            <Card className="h-full">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Candidat Actif</CardTitle>
                  <Badge variant="secondary" className="text-lg px-4 py-1">
                    N° {currentCandidate?.passage_number || "-"}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                {currentCandidate ? (
                  <div className="grid md:grid-cols-2 gap-8">
                    {/* Photo */}
                    <div className="aspect-[3/4] rounded-xl overflow-hidden bg-accent">
                      {currentCandidate.photo_portrait_url ? (
                        <img
                          src={currentCandidate.photo_portrait_url}
                          alt={`${currentCandidate.first_name} ${currentCandidate.last_name}`}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <User className="h-24 w-24 text-muted-foreground" />
                        </div>
                      )}
                    </div>

                    {/* Info */}
                    <div className="flex flex-col">
                      <h2 className="font-serif text-3xl font-bold text-foreground mb-2">
                        {currentCandidate.first_name} {currentCandidate.last_name}
                      </h2>
                      
                      <div className="flex gap-2 mb-6">
                        <Badge variant="outline">{currentCandidate.gender}</Badge>
                        {currentCandidate.height && (
                          <Badge variant="outline">{currentCandidate.height}</Badge>
                        )}
                      </div>

                      {/* Timer */}
                      <div className="mb-8">
                        <p className="text-sm text-muted-foreground mb-2">Chronomètre</p>
                        <div className="flex items-center gap-4">
                          <span className="font-mono text-5xl font-bold text-foreground">
                            {formatTime(timer)}
                          </span>
                        </div>
                        <div className="flex gap-2 mt-4">
                          <Button
                            size="sm"
                            variant={isTimerRunning ? "secondary" : "default"}
                            onClick={() => setIsTimerRunning(!isTimerRunning)}
                          >
                            {isTimerRunning ? (
                              <><Pause className="h-4 w-4 mr-2" /> Pause</>
                            ) : (
                              <><Play className="h-4 w-4 mr-2" /> Démarrer</>
                            )}
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setTimer(0)}
                          >
                            <RotateCcw className="h-4 w-4 mr-2" /> Reset
                          </Button>
                        </div>
                      </div>

                      {/* Score */}
                      {scores[currentCandidate.id] !== undefined && (
                        <div className="p-4 rounded-lg bg-emerald-500/10 mb-6">
                          <div className="flex items-center gap-2 mb-1">
                            <Star className="h-5 w-5 text-emerald-500" />
                            <span className="text-sm font-medium text-emerald-600">Note du Jury</span>
                          </div>
                          <span className="text-3xl font-bold text-emerald-600">
                            {scores[currentCandidate.id].toFixed(1)}/20
                          </span>
                        </div>
                      )}

                      {/* Navigation */}
                      <div className="flex gap-4 mt-auto">
                        <Button
                          variant="outline"
                          onClick={handlePrevious}
                          disabled={currentIndex === 0}
                          className="flex-1"
                        >
                          Précédent
                        </Button>
                        <Button
                          onClick={handleNext}
                          disabled={currentIndex === candidates.length - 1}
                          className="flex-1"
                        >
                          Suivant
                          <ChevronRight className="h-4 w-4 ml-2" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-16">
                    <User className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">Aucun candidat à afficher</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Statistiques</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 rounded-lg bg-accent/50">
                  <div className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Total candidats</span>
                  </div>
                  <span className="text-xl font-bold text-foreground">{stats.total}</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-accent/50">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-emerald-500" />
                    <span className="text-sm text-muted-foreground">Évalués</span>
                  </div>
                  <span className="text-xl font-bold text-foreground">{stats.evaluated}</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-accent/50">
                  <div className="flex items-center gap-2">
                    <Star className="h-5 w-5 text-amber-500" />
                    <span className="text-sm text-muted-foreground">Note moyenne</span>
                  </div>
                  <span className="text-xl font-bold text-foreground">
                    {stats.averageScore.toFixed(1)}
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Queue */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">File d'Attente</CardTitle>
                <CardDescription>Prochains candidats à passer</CardDescription>
              </CardHeader>
              <CardContent>
                {queue.length > 0 ? (
                  <div className="space-y-3">
                    {queue.map((candidate, index) => (
                      <motion.div
                        key={candidate.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center gap-3 p-3 rounded-lg bg-accent/50"
                      >
                        <Badge variant="outline" className="shrink-0">
                          {candidate.passage_number || "-"}
                        </Badge>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-foreground truncate">
                            {candidate.first_name} {candidate.last_name}
                          </p>
                        </div>
                        <ArrowRight className="h-4 w-4 text-muted-foreground shrink-0" />
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <p className="text-center text-muted-foreground py-4">
                    Plus de candidats en attente
                  </p>
                )}
              </CardContent>
            </Card>

            {/* Notifications */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-amber-500" />
                  Notifications
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-center text-muted-foreground py-4">
                  Aucune notification
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default CastingLive;
