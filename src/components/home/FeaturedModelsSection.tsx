import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { featuredModels } from "@/lib/data";

export function FeaturedModelsSection() {
  return (
    <section className="py-20 lg:py-32">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-12"
        >
          <div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Nos Mannequins
            </h2>
            <p className="text-muted-foreground max-w-xl">
              Des talents uniques qui incarnent l'excellence et la beauté africaine
            </p>
          </div>
          <Button asChild variant="outline" className="shrink-0">
            <Link to="/models">
              Voir tous
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {featuredModels.slice(0, 6).map((model, index) => (
            <motion.div
              key={model.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Link
                to={`/models/${model.id}`}
                className="group block relative overflow-hidden rounded-lg aspect-[3/4] bg-muted"
              >
                <motion.div
                  className="w-full h-full"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                >
                  <img
                    src={model.imageUrl}
                    alt={model.name}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </motion.div>
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                
                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-1 rounded-full bg-accent/80 backdrop-blur-sm text-accent-foreground text-xs font-medium">
                        {model.level}
                      </span>
                      <span className="px-2 py-1 rounded-full bg-accent/80 backdrop-blur-sm text-accent-foreground text-xs font-medium">
                        {model.gender}
                      </span>
                    </div>
                    <h3 className="font-serif text-xl font-semibold text-foreground">
                      {model.name}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      {model.height} • {model.categories[0]}
                    </p>
                  </div>
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="px-6 py-3 rounded-full bg-primary text-primary-foreground font-medium text-sm">
                    Voir le profil
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
