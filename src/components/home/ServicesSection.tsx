import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Users, UserPlus, Sparkles, Camera, GraduationCap, Palette, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { services } from "@/lib/data";

const iconMap: Record<string, React.ReactNode> = {
  Users: <Users className="h-6 w-6" />,
  UserPlus: <UserPlus className="h-6 w-6" />,
  Sparkles: <Sparkles className="h-6 w-6" />,
  Camera: <Camera className="h-6 w-6" />,
  GraduationCap: <GraduationCap className="h-6 w-6" />,
  Palette: <Palette className="h-6 w-6" />,
};

export function ServicesSection() {
  return (
    <section className="py-20 lg:py-32 bg-card">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Nos Services
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Un accompagnement complet pour vos projets mode et événementiel
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group p-8 rounded-xl border border-border bg-background hover:border-primary/50 hover:shadow-lg transition-all duration-300"
            >
              <div className="h-14 w-14 rounded-xl bg-accent flex items-center justify-center text-foreground mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                {iconMap[service.icon]}
              </div>
              <h3 className="font-serif text-xl font-semibold text-foreground mb-3">
                {service.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                {service.description}
              </p>
              <Link
                to={`/services/${service.slug}`}
                className="inline-flex items-center text-sm font-medium text-foreground hover:text-primary transition-colors"
              >
                En savoir plus
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <Button asChild size="lg">
            <Link to="/contact">
              Demander un devis
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
