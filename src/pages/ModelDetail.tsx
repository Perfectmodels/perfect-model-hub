import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Ruler, Award, Camera, MapPin } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { featuredModels } from "@/lib/data";

const ModelDetail = () => {
  const { id } = useParams();
  const model = featuredModels.find((m) => m.id === id);

  if (!model) {
    return (
      <Layout>
        <div className="container mx-auto px-4 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="font-serif text-3xl font-bold text-foreground mb-4">
              Mannequin non trouvé
            </h1>
            <p className="text-muted-foreground mb-8">
              Le profil que vous recherchez n'existe pas ou n'est plus disponible.
            </p>
            <Button asChild>
              <Link to="/models">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Retour aux mannequins
              </Link>
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Back Button */}
      <div className="container mx-auto px-4 lg:px-8 pt-8">
        <Button asChild variant="ghost" size="sm">
          <Link to="/models">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour
          </Link>
        </Button>
      </div>

      {/* Profile Section */}
      <section className="py-8 lg:py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-muted">
                <img
                  src={model.imageUrl}
                  alt={model.name}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
            </motion.div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="flex flex-col"
            >
              {/* Header */}
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <Badge variant="secondary">{model.level}</Badge>
                  <Badge variant="outline">{model.gender}</Badge>
                </div>
                <h1 className="font-serif text-4xl lg:text-5xl font-bold text-foreground mb-4">
                  {model.name}
                </h1>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>Libreville, Gabon</span>
                </div>
              </div>

              {/* Measurements */}
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-4">
                  <Ruler className="h-5 w-5 text-foreground" />
                  <h2 className="font-serif text-lg font-semibold text-foreground">Mensurations</h2>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="p-4 rounded-lg bg-card border border-border">
                    <p className="text-muted-foreground text-sm mb-1">Taille</p>
                    <p className="font-semibold text-foreground">{model.height}</p>
                  </div>
                  <div className="p-4 rounded-lg bg-card border border-border">
                    <p className="text-muted-foreground text-sm mb-1">Poitrine</p>
                    <p className="font-semibold text-foreground">{model.measurements.chest}</p>
                  </div>
                  <div className="p-4 rounded-lg bg-card border border-border">
                    <p className="text-muted-foreground text-sm mb-1">Tour de taille</p>
                    <p className="font-semibold text-foreground">{model.measurements.waist}</p>
                  </div>
                  <div className="p-4 rounded-lg bg-card border border-border">
                    <p className="text-muted-foreground text-sm mb-1">Hanches</p>
                    <p className="font-semibold text-foreground">{model.measurements.hips}</p>
                  </div>
                </div>
              </div>

              {/* Categories */}
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-4">
                  <Camera className="h-5 w-5 text-foreground" />
                  <h2 className="font-serif text-lg font-semibold text-foreground">Spécialités</h2>
                </div>
                <div className="flex flex-wrap gap-2">
                  {model.categories.map((category) => (
                    <Badge key={category} variant="secondary" className="text-sm">
                      {category}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Experience */}
              <div className="mb-8">
                <h2 className="font-serif text-lg font-semibold text-foreground mb-3">Expérience</h2>
                <p className="text-muted-foreground leading-relaxed">
                  {model.experience}
                </p>
              </div>

              {/* Distinctions */}
              {model.distinctions.length > 0 && (
                <div className="mb-8">
                  <div className="flex items-center gap-2 mb-4">
                    <Award className="h-5 w-5 text-foreground" />
                    <h2 className="font-serif text-lg font-semibold text-foreground">Distinctions</h2>
                  </div>
                  <div className="space-y-3">
                    {model.distinctions.map((distinction) => (
                      <div key={distinction.name} className="p-4 rounded-lg bg-card border border-border">
                        <p className="font-medium text-foreground mb-2">{distinction.name}</p>
                        <ul className="space-y-1">
                          {distinction.titles.map((title) => (
                            <li key={title} className="text-muted-foreground text-sm flex items-center gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                              {title}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* CTA */}
              <div className="mt-auto pt-6 border-t border-border">
                <Button asChild size="lg" className="w-full sm:w-auto">
                  <Link to={`/contact?model=${model.id}`}>
                    Réserver ce mannequin
                  </Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ModelDetail;
