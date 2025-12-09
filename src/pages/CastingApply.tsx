import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, User, Ruler, Camera, Send } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const CastingApply = () => {
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    birthDate: "",
    gender: "",
    city: "",
    nationality: "",
    height: "",
    weight: "",
    chest: "",
    waist: "",
    hips: "",
    shoeSize: "",
    eyeColor: "",
    hairColor: "",
    experience: "",
    instagram: "",
    portfolioLink: "",
    motivation: "",
  });

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    toast({
      title: "Candidature envoyée !",
      description: "Nous avons bien reçu votre candidature. Nous vous recontacterons prochainement.",
    });
    
    setIsSubmitting(false);
    setStep(4);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 lg:px-8 py-12">
        {/* Back Button */}
        <Button asChild variant="ghost" size="sm" className="mb-8">
          <Link to="/casting">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour
          </Link>
        </Button>

        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Formulaire de candidature
            </h1>
            <p className="text-muted-foreground">
              Remplissez ce formulaire pour postuler au casting
            </p>
          </motion.div>

          {/* Progress Steps */}
          {step < 4 && (
            <div className="flex items-center justify-center gap-2 mb-12">
              {[1, 2, 3].map((s) => (
                <div key={s} className="flex items-center">
                  <div
                    className={`h-10 w-10 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                      s === step
                        ? "bg-primary text-primary-foreground"
                        : s < step
                        ? "bg-primary/20 text-primary"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {s === 1 && <User className="h-5 w-5" />}
                    {s === 2 && <Ruler className="h-5 w-5" />}
                    {s === 3 && <Camera className="h-5 w-5" />}
                  </div>
                  {s < 3 && (
                    <div
                      className={`w-16 h-1 mx-2 rounded ${
                        s < step ? "bg-primary/20" : "bg-muted"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Form */}
          <motion.form
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            onSubmit={handleSubmit}
            className="bg-card border border-border rounded-2xl p-8"
          >
            {/* Step 1: Personal Info */}
            {step === 1 && (
              <div className="space-y-6">
                <h2 className="font-serif text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Informations personnelles
                </h2>
                
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">Prénom *</Label>
                    <Input
                      id="firstName"
                      value={formData.firstName}
                      onChange={(e) => handleChange("firstName", e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Nom *</Label>
                    <Input
                      id="lastName"
                      value={formData.lastName}
                      onChange={(e) => handleChange("lastName", e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleChange("email", e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Téléphone *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleChange("phone", e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="birthDate">Date de naissance *</Label>
                    <Input
                      id="birthDate"
                      type="date"
                      value={formData.birthDate}
                      onChange={(e) => handleChange("birthDate", e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="gender">Genre *</Label>
                    <Select value={formData.gender} onValueChange={(value) => handleChange("gender", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionnez" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Femme">Femme</SelectItem>
                        <SelectItem value="Homme">Homme</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">Ville *</Label>
                    <Input
                      id="city"
                      value={formData.city}
                      onChange={(e) => handleChange("city", e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="nationality">Nationalité *</Label>
                    <Input
                      id="nationality"
                      value={formData.nationality}
                      onChange={(e) => handleChange("nationality", e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="flex justify-end pt-4">
                  <Button type="button" onClick={() => setStep(2)}>
                    Continuer
                  </Button>
                </div>
              </div>
            )}

            {/* Step 2: Measurements */}
            {step === 2 && (
              <div className="space-y-6">
                <h2 className="font-serif text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
                  <Ruler className="h-5 w-5" />
                  Mensurations
                </h2>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="height">Taille (cm) *</Label>
                    <Input
                      id="height"
                      type="number"
                      value={formData.height}
                      onChange={(e) => handleChange("height", e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="weight">Poids (kg) *</Label>
                    <Input
                      id="weight"
                      type="number"
                      value={formData.weight}
                      onChange={(e) => handleChange("weight", e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="chest">Tour de poitrine (cm)</Label>
                    <Input
                      id="chest"
                      type="number"
                      value={formData.chest}
                      onChange={(e) => handleChange("chest", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="waist">Tour de taille (cm)</Label>
                    <Input
                      id="waist"
                      type="number"
                      value={formData.waist}
                      onChange={(e) => handleChange("waist", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="hips">Tour de hanches (cm)</Label>
                    <Input
                      id="hips"
                      type="number"
                      value={formData.hips}
                      onChange={(e) => handleChange("hips", e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="shoeSize">Pointure</Label>
                    <Input
                      id="shoeSize"
                      type="number"
                      value={formData.shoeSize}
                      onChange={(e) => handleChange("shoeSize", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="eyeColor">Couleur des yeux</Label>
                    <Input
                      id="eyeColor"
                      value={formData.eyeColor}
                      onChange={(e) => handleChange("eyeColor", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="hairColor">Couleur des cheveux</Label>
                    <Input
                      id="hairColor"
                      value={formData.hairColor}
                      onChange={(e) => handleChange("hairColor", e.target.value)}
                    />
                  </div>
                </div>

                <div className="flex justify-between pt-4">
                  <Button type="button" variant="outline" onClick={() => setStep(1)}>
                    Retour
                  </Button>
                  <Button type="button" onClick={() => setStep(3)}>
                    Continuer
                  </Button>
                </div>
              </div>
            )}

            {/* Step 3: Experience */}
            {step === 3 && (
              <div className="space-y-6">
                <h2 className="font-serif text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
                  <Camera className="h-5 w-5" />
                  Expérience & Motivation
                </h2>

                <div className="space-y-2">
                  <Label htmlFor="experience">Expérience en mannequinat *</Label>
                  <Select value={formData.experience} onValueChange={(value) => handleChange("experience", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionnez votre niveau" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">Aucune expérience</SelectItem>
                      <SelectItem value="beginner">Débutant (moins d'1 an)</SelectItem>
                      <SelectItem value="intermediate">Intermédiaire (1-3 ans)</SelectItem>
                      <SelectItem value="experienced">Expérimenté (plus de 3 ans)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="instagram">Instagram</Label>
                    <Input
                      id="instagram"
                      placeholder="@votre_compte"
                      value={formData.instagram}
                      onChange={(e) => handleChange("instagram", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="portfolioLink">Lien portfolio</Label>
                    <Input
                      id="portfolioLink"
                      type="url"
                      placeholder="https://"
                      value={formData.portfolioLink}
                      onChange={(e) => handleChange("portfolioLink", e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="motivation">Pourquoi souhaitez-vous devenir mannequin ?</Label>
                  <Textarea
                    id="motivation"
                    rows={4}
                    value={formData.motivation}
                    onChange={(e) => handleChange("motivation", e.target.value)}
                    placeholder="Parlez-nous de votre motivation..."
                  />
                </div>

                <div className="flex justify-between pt-4">
                  <Button type="button" variant="outline" onClick={() => setStep(2)}>
                    Retour
                  </Button>
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? (
                      "Envoi en cours..."
                    ) : (
                      <>
                        Envoyer ma candidature
                        <Send className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </div>
              </div>
            )}

            {/* Success Step */}
            {step === 4 && (
              <div className="text-center py-8">
                <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                  <Send className="h-10 w-10 text-primary" />
                </div>
                <h2 className="font-serif text-2xl font-bold text-foreground mb-4">
                  Candidature envoyée !
                </h2>
                <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                  Merci pour votre candidature. Notre équipe l'examinera attentivement et vous contactera prochainement.
                </p>
                <Button asChild>
                  <Link to="/">Retour à l'accueil</Link>
                </Button>
              </div>
            )}
          </motion.form>
        </div>
      </div>
    </Layout>
  );
};

export default CastingApply;
