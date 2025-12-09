import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Search, Filter } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { featuredModels } from "@/lib/data";

const Models = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [genderFilter, setGenderFilter] = useState<string>("all");
  const [levelFilter, setLevelFilter] = useState<string>("all");

  const filteredModels = featuredModels.filter((model) => {
    const matchesSearch = model.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesGender = genderFilter === "all" || model.gender === genderFilter;
    const matchesLevel = levelFilter === "all" || model.level === levelFilter;
    return matchesSearch && matchesGender && matchesLevel && model.isPublic;
  });

  return (
    <Layout>
      {/* Hero */}
      <section className="pt-12 pb-8 lg:pt-20 lg:pb-12 bg-card border-b border-border">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-4">
              Nos Mannequins
            </h1>
            <p className="text-muted-foreground text-lg">
              Découvrez les talents qui font la fierté de Perfect Models Management
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-6 border-b border-border sticky top-20 z-40 bg-background/80 backdrop-blur-md">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher un mannequin..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="flex flex-wrap gap-2">
              <div className="flex items-center gap-2 bg-muted rounded-lg p-1">
                {["all", "Femme", "Homme"].map((gender) => (
                  <Button
                    key={gender}
                    variant={genderFilter === gender ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setGenderFilter(gender)}
                    className="text-sm"
                  >
                    {gender === "all" ? "Tous" : gender === "Femme" ? "Femmes" : "Hommes"}
                  </Button>
                ))}
              </div>
              
              <div className="flex items-center gap-2 bg-muted rounded-lg p-1">
                {["all", "Pro", "Débutant"].map((level) => (
                  <Button
                    key={level}
                    variant={levelFilter === level ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setLevelFilter(level)}
                    className="text-sm"
                  >
                    {level === "all" ? "Niveaux" : level}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Models Grid */}
      <section className="py-12 lg:py-20">
        <div className="container mx-auto px-4 lg:px-8">
          {filteredModels.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredModels.map((model, index) => (
                <motion.div
                  key={model.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.05 }}
                >
                  <Link
                    to={`/models/${model.id}`}
                    className="group block relative overflow-hidden rounded-xl aspect-[3/4] bg-muted"
                  >
                    <img
                      src={model.imageUrl}
                      alt={model.name}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                    
                    {/* Content */}
                    <div className="absolute bottom-0 left-0 right-0 p-5">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-1 rounded-full bg-accent/80 backdrop-blur-sm text-accent-foreground text-xs font-medium">
                            {model.level}
                          </span>
                          <span className="px-2 py-1 rounded-full bg-accent/80 backdrop-blur-sm text-accent-foreground text-xs font-medium">
                            {model.gender}
                          </span>
                        </div>
                        <h3 className="font-serif text-lg font-semibold text-foreground">
                          {model.name}
                        </h3>
                        <div className="flex items-center gap-3 text-muted-foreground text-sm">
                          <span>{model.height}</span>
                          <span className="w-1 h-1 rounded-full bg-muted-foreground" />
                          <span>{model.categories[0]}</span>
                        </div>
                      </div>
                    </div>

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="px-5 py-2.5 rounded-full bg-primary text-primary-foreground font-medium text-sm shadow-lg">
                        Voir le profil
                      </span>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <Filter className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-serif text-xl font-semibold text-foreground mb-2">
                Aucun mannequin trouvé
              </h3>
              <p className="text-muted-foreground">
                Essayez de modifier vos critères de recherche
              </p>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Models;
