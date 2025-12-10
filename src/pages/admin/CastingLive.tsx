import { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { 
  Play, Pause, RotateCcw, User, ChevronRight, 
  CheckCircle, Users, Star, ArrowRight, Send
} from "lucide-react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { db } from "@/integrations/firebase/client";
import { collection, query, orderBy, onSnapshot, doc, setDoc, serverTimestamp } from "firebase/firestore";
import { useAuth } from "@/contexts/AuthContext";

// Interfaces
interface Candidate {
  id: string;
  first_name: string;
  last_name: string;
  passage_number: number | null;
  gender: string;
  height: string | null;
  photo_portrait_url: string | null;
}

interface JuryScore {
  jury_id: string;
  jury_name: string;
  criteria: Record<string, number>;
  comment: string;
  overall: number;
  created_at: any;
}

// Score Submission Form Component
const ScoreForm = ({ candidateId, juryId, juryName, onScoreSubmit }) => {
  const [scores, setScores] = useState({ walk: 5, presence: 5, potential: 5 });
  const [comment, setComment] = useState("");
  const { toast } = useToast();

  const handleScoreChange = (name, value) => {
    setScores(prev => ({ ...prev, [name]: value[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const overall = (scores.walk + scores.presence + scores.potential) / 3;
    const scoreData = {
      jury_id: juryId,
      jury_name: juryName,
      criteria: scores,
      comment,
      overall,
      created_at: serverTimestamp()
    };

    try {
      const scoreDocRef = doc(db, `casting_applications/${candidateId}/jury_scores`, juryId);
      await setDoc(scoreDocRef, scoreData);
      toast({ title: "Note enregistrée", description: "Votre évaluation a été soumise avec succès." });
      onScoreSubmit();
    } catch (error) {
      console.error("Error submitting score:", error);
      toast({ title: "Erreur", description: "Impossible de soumettre la note.", variant: "destructive" });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 pt-4">
        <div className="space-y-4">
            <div>
                <Label>Démarche : {scores.walk}/10</Label>
                <Slider name="walk" value={[scores.walk]} onValueChange={(v) => handleScoreChange("walk", v)} max={10} step={1} />
            </div>
            <div>
                <Label>Présence : {scores.presence}/10</Label>
                <Slider name="presence" value={[scores.presence]} onValueChange={(v) => handleScoreChange("presence", v)} max={10} step={1} />
            </div>
            <div>
                <Label>Potentiel : {scores.potential}/10</Label>
                <Slider name="potential" value={[scores.potential]} onValueChange={(v) => handleScoreChange("potential", v)} max={10} step={1} />
            </div>
            <div>
                <Label>Commentaires</Label>
                <Textarea value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Ajoutez vos remarques..." />
            </div>
        </div>
        <Button type="submit" className="w-full"><Send className="h-4 w-4 mr-2"/>Soumettre l'évaluation</Button>
    </form>
  );
};

const CastingLive = () => {
  const { user } = useAuth();
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timer, setTimer] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [allScores, setAllScores] = useState<Record<string, JuryScore[]>>({});
  const [loading, setLoading] = useState(true);

  // Real-time data fetching
  useEffect(() => {
    setLoading(true);
    const q = query(collection(db, "casting_applications"), orderBy("passage_number"));
    
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const candidatesData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Candidate));
      setCandidates(candidatesData);
      setLoading(false);

      // Subscribe to scores for each candidate
      candidatesData.forEach(candidate => {
        const scoresCollectionRef = collection(db, `casting_applications/${candidate.id}/jury_scores`);
        onSnapshot(scoresCollectionRef, (scoresSnapshot) => {
          const scoresData = scoresSnapshot.docs.map(doc => ({ ...doc.data() } as JuryScore));
          setAllScores(prev => ({ ...prev, [candidate.id]: scoresData }));
        });
      });
    }, (error) => {
      console.error("Error fetching candidates:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Timer logic
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerRunning) {
      interval = setInterval(() => setTimer((prev) => prev + 1), 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning]);

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
  const currentScores = currentCandidate ? allScores[currentCandidate.id] || [] : [];
  const averageScore = currentScores.length > 0 ? currentScores.reduce((acc, s) => acc + s.overall, 0) / currentScores.length : 0;

  const allScoresArray = Object.values(allScores).flat();
  const stats = {
      total: candidates.length,
      evaluated: candidates.filter(c => allScores[c.id] && allScores[c.id].length > 0).length,
      averageScore: allScoresArray.length > 0 ? (allScoresArray.reduce((acc, s) => acc + s.overall, 0) / allScoresArray.length) : 0
  }

  return (
    <AdminLayout>
      <div className="space-y-8">
         {/* Header and Progress */}
        <div className="flex items-center justify-between">
            <h1 className="font-serif text-3xl font-bold">Casting en Direct</h1>
            <div className="flex items-center gap-2"><div className="h-3 w-3 rounded-full bg-emerald-500 animate-pulse" /> <span className="text-sm font-medium text-emerald-500">En cours</span></div>
        </div>
        <Card><CardContent className="py-4">
            <div className="flex items-center justify-between mb-2"><span className="text-sm text-muted-foreground">Progression</span><span className="text-sm font-medium">{currentIndex + 1} / {candidates.length}</span></div>
            <Progress value={candidates.length > 0 ? ((currentIndex + 1) / candidates.length) * 100 : 0} className="h-2" />
        </CardContent></Card>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2"><Card className="h-full">
            <CardHeader><div className="flex items-center justify-between"><CardTitle>Candidat Actif</CardTitle><Badge variant="secondary" className="text-lg px-4 py-1">N° {currentCandidate?.passage_number || "-"}</Badge></div></CardHeader>
            <CardContent>{currentCandidate ? <div className="grid md:grid-cols-2 gap-8">
                <div className="aspect-[3/4] rounded-xl overflow-hidden bg-accent flex items-center justify-center">
                    {currentCandidate.photo_portrait_url ? <img src={currentCandidate.photo_portrait_url} alt={`${currentCandidate.first_name}`} className="w-full h-full object-cover"/> : <User className="h-24 w-24 text-muted-foreground" />}
                </div>
                <div>
                    <h2 className="font-serif text-3xl font-bold mb-2">{currentCandidate.first_name} {currentCandidate.last_name}</h2>
                    <div className="flex gap-2 mb-6"><Badge variant="outline">{currentCandidate.gender}</Badge>{currentCandidate.height && <Badge variant="outline">{currentCandidate.height} cm</Badge>}</div>
                    
                    {/* Timer */}
                    <div className="mb-6"><p className="text-sm text-muted-foreground mb-2">Chronomètre</p>
                        <div className="flex items-center gap-4"><span className="font-mono text-5xl font-bold">{new Date(timer * 1000).toISOString().substr(14, 5)}</span></div>
                        <div className="flex gap-2 mt-4">
                            <Button size="sm" variant={isTimerRunning ? "secondary" : "default"} onClick={() => setIsTimerRunning(!isTimerRunning)}>{isTimerRunning ? <><Pause className="h-4 w-4 mr-2" /> Pause</> : <><Play className="h-4 w-4 mr-2" /> Démarrer</>}</Button>
                            <Button size="sm" variant="outline" onClick={() => setTimer(0)}><RotateCcw className="h-4 w-4 mr-2" /> Reset</Button>
                        </div>
                    </div>

                    {/* Average Score */}
                    {averageScore > 0 && <div className="p-4 rounded-lg bg-emerald-500/10 mb-6">
                        <div className="flex items-center gap-2 mb-1"><Star className="h-5 w-5 text-emerald-500" /><span className="text-sm font-medium text-emerald-600">Note Moyenne du Jury</span></div>
                        <span className="text-3xl font-bold text-emerald-600">{averageScore.toFixed(1)}/10</span>
                    </div>}

                    {/* Navigation */}
                    <div className="flex gap-4 mt-auto">
                        <Button variant="outline" onClick={handlePrevious} disabled={currentIndex === 0} className="flex-1">Précédent</Button>
                        <Button onClick={handleNext} disabled={currentIndex === candidates.length - 1} className="flex-1">Suivant<ChevronRight className="h-4 w-4 ml-2" /></Button>
                    </div>
                </div>
            </div> : <div className="text-center py-16"><User className="h-16 w-16 text-muted-foreground mx-auto mb-4" /><p className="text-muted-foreground">Aucun candidat à afficher</p></div>}</CardContent>
          </Card></div>

          <div className="space-y-6">
             {/* Jury Scoring Form */}
             {currentCandidate && user &&
                <Card>
                    <CardHeader><CardTitle>Évaluation du Jury</CardTitle><CardDescription>Notez le candidat sur les critères ci-dessous.</CardDescription></CardHeader>
                    <CardContent>
                        <ScoreForm candidateId={currentCandidate.id} juryId={user.uid} juryName={user.displayName || user.email} onScoreSubmit={() => {}} />
                    </CardContent>
                </Card>
             }
            {/* Stats */}
            <Card>
              <CardHeader><CardTitle>Statistiques</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 rounded-lg bg-accent/50"><div className="flex items-center gap-2"><Users className="h-5 w-5 text-muted-foreground" /><span className="text-sm text-muted-foreground">Total</span></div><span className="text-xl font-bold">{stats.total}</span></div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-accent/50"><div className="flex items-center gap-2"><CheckCircle className="h-5 w-5 text-emerald-500" /><span className="text-sm text-muted-foreground">Évalués</span></div><span className="text-xl font-bold">{stats.evaluated}</span></div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-accent/50"><div className="flex items-center gap-2"><Star className="h-5 w-5 text-amber-500" /><span className="text-sm text-muted-foreground">Note Moyenne</span></div><span className="text-xl font-bold">{stats.averageScore.toFixed(1)}</span></div>
              </CardContent>
            </Card>

             {/* Other Jury Scores */}
            <Card>
                <CardHeader><CardTitle>Notes des autres jurys</CardTitle></CardHeader>
                <CardContent>
                {currentScores.length > 0 ? <div className="space-y-3">
                    {currentScores.map(score => (
                        <div key={score.jury_id} className="flex items-center justify-between p-2 rounded-lg bg-accent/50">
                            <span className="text-sm font-medium">{score.jury_name}</span>
                            <span className="text-sm font-bold"><Star className="h-4 w-4 inline-block mr-1 text-amber-400"/>{score.overall.toFixed(1)}</span>
                        </div>
                    ))}
                </div> : <p className="text-center text-sm text-muted-foreground py-4">Aucune note pour ce candidat.</p>}
                </CardContent>
            </Card>

          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default CastingLive;
